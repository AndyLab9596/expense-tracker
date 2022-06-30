import { FlatList, ListRenderItemInfo, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { IExpense, IExpensesOutput } from "./ExpensesOutput";

interface IExpensesList {
  expenses: IExpensesOutput["expenses"];
}

const expenseItem = (data: ListRenderItemInfo<IExpense>) => {
  return <ExpenseItem item={data.item} />;
};

const ExpensesList: React.FC<IExpensesList> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(data) => data.id}
      renderItem={expenseItem}
    />
  );
};

export default ExpensesList;
