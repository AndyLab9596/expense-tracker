import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useAppContext } from "../../store/expenses-context";
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
  //
  {
    id: "e6",
    description: "Monitor",
    amount: 88,
    date: new Date("2022-06-30"),
  },
  {
    id: "e7",
    description: "Mouse",
    amount: 5.99,
    date: new Date("2021-06-29"),
  },
  {
    id: "e8",
    description: "Mangoes",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e9",
    description: "mouse pad",
    amount: 45.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e10",
    description: "IMac",
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
  fallbackText: string;
}

const ExpensesOutput: React.FC<IExpensesOutput> = ({
  expenses,
  expensePeriod,
  fallbackText,
}) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      {/* Summary */}
      <ExpensesSummary
        expenses={expenses}
        //   expenses={expenses}
        periodName={expensePeriod}
      />
      {/* List */}
      {/* <ExpensesList expenses={expenses} /> */}
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
