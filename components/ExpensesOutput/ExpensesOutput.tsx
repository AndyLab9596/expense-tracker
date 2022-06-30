import React from "react";
import { View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const DUMMY_EXPENSES: IExpense[] = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2022-06-30"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.99,
    date: new Date("2021-06-29"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "Some books",
    amount: 45.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "macbook",
    amount: 95.99,
    date: new Date("2022-05-25"),
  },
];

export interface IExpense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

export interface IExpensesOutput {
  expenses: IExpense[];
  expensePeriod: string;
}

const ExpensesOutput: React.FC<IExpensesOutput> = ({
  expenses,
  expensePeriod,
}) => {
  return (
    <View>
      {/* Summary */}
      <ExpensesSummary
        expenses={DUMMY_EXPENSES}
        //   expenses={expenses}
        periodName={expensePeriod}
      />
      {/* List */}
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;
