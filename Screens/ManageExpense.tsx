import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { NameRoute, RootStackParamList } from "../App";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { useAppContext } from "../store/expenses-context";

type IManageExpense = NativeStackScreenProps<
  RootStackParamList,
  NameRoute.MANAGE_EXPENSE
>;

const ManageExpense: React.FC<IManageExpense> = ({ navigation, route }) => {
  const editedExpenseId = route.params?.expenseId;

  const { deleteExpense, isLoading } = useAppContext();

  const isEditing = !!editedExpenseId;

  const deleteExpenseHandler = () => {
    deleteExpense(editedExpenseId as string);
    navigation.goBack();
  };

  // if (isLoading) {
  //   return <LoadingOverlay />;
  // }

  return (
    <View style={styles.container}>
      {/*  */}
      <ExpenseForm
        isEditing={isEditing}
        editedExpenseId={editedExpenseId ?? ""}
      />
      {/*  */}

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
