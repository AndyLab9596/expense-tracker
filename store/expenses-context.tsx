import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import { IExpense } from "../components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "../data/DUMMY_DATA";
import expensesReducer from "./expenses-reducer";

interface IContextProvider {
  children: ReactNode;
}

type TAddExpenseProps = Omit<IExpense, "id">;

export interface IExpensesInitialValue {
  expenses: IExpense[];
  addExpense: ({ description, amount, date }: TAddExpenseProps) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (
    id: string,
    { description, amount, date }: TAddExpenseProps
  ) => void;
}

const expensesInitialValue: IExpensesInitialValue = {
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
};

const ExpensesContext =
  createContext<IExpensesInitialValue>(expensesInitialValue);

const ExpensesContextProvider = ({ children }: IContextProvider) => {
  const [state, dispatch] = useReducer(expensesReducer, expensesInitialValue);

  return (
    <ExpensesContext.Provider value={{ ...state }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(ExpensesContext);
};

export { ExpensesContextProvider, expensesInitialValue };
