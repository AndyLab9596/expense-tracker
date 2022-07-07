import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NameRoute, RootStackParamList } from "../App";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useAppContext } from "../store/expenses-context";

type IManageExpense = NativeStackScreenProps<
  RootStackParamList,
  NameRoute.MANAGE_EXPENSE
>;

const ManageExpense: React.FC<IManageExpense> = ({ navigation, route }) => {
  const editedExpenseId = route.params?.expenseId;

  const { deleteExpense, addExpense, updateExpense } = useAppContext();

  const isEditing = !!editedExpenseId;

  const deleteExpenseHandler = () => {
    deleteExpense(editedExpenseId as string);
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = () => {
    if (isEditing) {
      updateExpense({
        id: "e1",
        expense: {
          id: "e1",
          description: "Test",
          amount: 19.99,
          date: new Date("2022-07-07"),
        },
      });
    } else {
      addExpense({
        description: "Test",
        amount: 19.99,
        date: new Date("2022-07-07"),
      });
    }
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      <View style={styles.topButtonContainer}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button mode="normal" onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
