import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import { IExpense } from "../components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "../data/DUMMY_DATA";
import ActionTypes from "./actionTypes";
import expensesReducer from "./expenses-reducer";

interface IContextProvider {
  children: ReactNode;
}

export type TAddExpenseProps = Omit<IExpense, "id">;
export interface IUpdateExpenseProps {
  id: string;
  expense: IExpense;
}
export interface IExpensesInitialValue {
  expenses: IExpense[];
  addExpense: ({ description, amount, date }: TAddExpenseProps) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (expense: IExpense) => void;
}

const expensesInitialValue: IExpensesInitialValue = {
  expenses: DUMMY_EXPENSES,
  addExpense: ({ description, amount, date }: TAddExpenseProps) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (expense: IExpense) => {},
};

const ExpensesContext =
  createContext<IExpensesInitialValue>(expensesInitialValue);

const ExpensesContextProvider = ({ children }: IContextProvider) => {
  const [state, dispatch] = useReducer(expensesReducer, expensesInitialValue);

  const addExpense = (expenseData: TAddExpenseProps) => {
    dispatch({
      type: ActionTypes.ADD,
      payload: {
        amount: expenseData.amount,
        date: expenseData.date,
        description: expenseData.description,
        id: new Date().getTime().toString(),
      },
    });
  };

  const deleteExpense = (id: IExpense["id"]) => {
    dispatch({
      type: ActionTypes.DELETE,
      payload: {
        id,
      },
    });
  };

  const updateExpense = (expense: IExpense) => {
    dispatch({
      type: ActionTypes.UPDATE,
      payload: {
        id: expense.id,
        updatedExpense: expense,
      },
    });
  };

  return (
    <ExpensesContext.Provider
      value={{ ...state, addExpense, deleteExpense, updateExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(ExpensesContext);
};

export { ExpensesContextProvider, expensesInitialValue };
