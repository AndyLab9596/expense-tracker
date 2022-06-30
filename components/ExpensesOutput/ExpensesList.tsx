import { FlatList, ListRenderItemInfo, Text } from "react-native";
import { IExpense, IExpensesOutput } from "./ExpensesOutput";

interface IExpensesList {
  expenses: IExpensesOutput["expenses"];
}

const expenseItem = (data: ListRenderItemInfo<IExpense>) => {
  return <Text>{data.item.description}</Text>;
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
