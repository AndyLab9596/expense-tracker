import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useAppContext } from "../store/expenses-context";

const AllExpenses = () => {
  const { expenses } = useAppContext();
  return (
    <ExpensesOutput
      expenses={expenses}
      expensePeriod="Total"
      fallbackText="No registered expenses found"
    />
  );
};

export default AllExpenses;
