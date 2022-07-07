import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useAppContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";

const RecentExpense = () => {
  const { expenses } = useAppContext();

  const recentExpenses = expenses.filter((epense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return epense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensePeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
};

export default RecentExpense;
