import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { useAppContext } from "../../store/expenses-context";
import { IExpense } from "../ExpensesOutput/ExpensesOutput";
import Button from "../UI/Button";
import Input from "./Input";
import { getFormatterDate } from "../../utils/date";
import { GlobalStyles } from "../../constants/styles";

interface IExpenseForm {
  isEditing: boolean;
  editedExpenseId: string;
}

interface IInputChangedHandlerProps {
  inputIdentifier: "amount" | "date" | "description";
  enteredAmount: string;
}

const ExpenseForm: React.FC<IExpenseForm> = ({
  isEditing,
  editedExpenseId,
}) => {
  const navigation = useNavigation();

  const { expenses, addExpense, updateExpense } = useAppContext();

  const initialValue = expenses.find(
    (expense) => expense.id === editedExpenseId
  ) as IExpense;

  // const [inputvalues, setInputValues] = useState({
  //   amount: editedExpenseId ? initialValue.amount.toString() : "",
  //   date: editedExpenseId ? getFormatterDate(new Date(initialValue.date)) : "",
  //   description: editedExpenseId ? initialValue.description : "",
  // });

  // When ever you fetch a input, it's always a string even input number
  const [inputs, setInputs] = useState({
    amount: {
      value: editedExpenseId ? initialValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: editedExpenseId
        ? getFormatterDate(new Date(initialValue.date))
        : "",
      isValid: true,
    },
    description: {
      value: editedExpenseId ? initialValue.description : "",
      isValid: true,
    },
  });

  const inputChangedHandler = (
    inputIdentifier: "amount" | "date" | "description",
    enteredAmount: string
  ) => {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredAmount, isValid: true },
      };
    });
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    // validation
    const amountIsvalid =
      !isNaN(+inputs.amount.value) && +inputs.amount.value > 0;
    //
    const dateInput =
      typeof inputs.date.value === "string"
        ? new Date(inputs.date.value).toString()
        : inputs.date.value;
    const dateIsValid = dateInput !== "Invalid Date";
    //
    const descriptionIsValid = inputs.description.value.trim().length > 0;

    if (!amountIsvalid && !dateIsValid && !descriptionIsValid) {
      // show feedback
      // Alert.alert("Invalid input", "Please check your input values");
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsvalid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
        };
      });
      return;
    }

    if (isEditing) {
      updateExpense({
        id: editedExpenseId,
        description: inputs?.description.value,
        amount: +inputs?.amount.value,
        date: new Date(inputs?.date.value),
      });
    } else {
      addExpense({
        description: inputs?.description.value,
        amount: +inputs?.amount.value,
        date: new Date(inputs?.date.value),
      });
    }
    navigation.goBack();
  };

  const formIsInValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            // onChangeText: inputChangedHandler.bind(this, 'amount')
            onChangeText: (text) => inputChangedHandler("amount", text),
            // two-ways binding
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
        />
        <Input
          label="Date"
          textInputConfig={{
            keyboardType: "default",
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (text) => inputChangedHandler("date", text),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          keyboardType: "default",
          multiline: true,
          autoCorrect: false, // default is true
          autoCapitalize: "sentences", // default is sentences,
          onChangeText: (text) => inputChangedHandler("description", text),
          value: inputs.description.value,
        }}
        invalid={!inputs.description.isValid}
      />
      {formIsInValid && (
        <Text style={styles.errorText}>Invalide input values - please check your entered data!</Text>
      )}
      <View style={styles.topButtonContainer}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button mode="normal" onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  topButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
