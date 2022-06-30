import React from "react";
import { Text, View } from "react-native";
import { IExpensesOutput } from "./ExpensesOutput";

interface IExpensesSummary {
  periodName: string;
  expenses: IExpensesOutput["expenses"];
}

const ExpensesSummary: React.FC<IExpensesSummary> = ({
  expenses,
  periodName,
}) => {
  const expensesSum = expenses?.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum?.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;
