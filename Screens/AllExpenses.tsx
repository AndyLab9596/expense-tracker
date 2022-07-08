import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { useAppContext } from "../store/expenses-context";

const AllExpenses = () => {
  const { expenses, isLoading } = useAppContext();

  // if (isLoading) {
  //   return <LoadingOverlay />;
  // }

  return (
    <ExpensesOutput
      expenses={expenses}
      expensePeriod="Total"
      fallbackText="No registered expenses found"
    />
  );
};

export default AllExpenses;
