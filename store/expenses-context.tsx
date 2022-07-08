import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { IExpense } from "../components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "../data/DUMMY_DATA";
import {
  fetchExpenses,
  firebaseDeleteExpense,
  firebaseUpdateExpense,
  storeExpense,
} from "../utils/http";
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
  updateExpense: (id: string, expense: Omit<IExpense, "id">) => void;
  setExpenses: (expenses: IExpense[]) => void;
  isLoading: boolean;
}

const expensesInitialValue: IExpensesInitialValue = {
  expenses: [],
  addExpense: ({ description, amount, date }: TAddExpenseProps) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (id: string, expense: Omit<IExpense, "id">) => {},
  setExpenses: (expenses: IExpense[]) => {},
  isLoading: false,
};

const ExpensesContext =
  createContext<IExpensesInitialValue>(expensesInitialValue);

const ExpensesContextProvider = ({ children }: IContextProvider) => {
  const [state, dispatch] = useReducer(expensesReducer, expensesInitialValue);

  const addExpense = async (expenseData: TAddExpenseProps) => {
    try {
      dispatch({ type: ActionTypes.FETCHING });
      await storeExpense(expenseData);
    } catch (error) {
    } finally {
      dispatch({ type: ActionTypes.FINISH_FETCHING });
    }
  };

  const deleteExpense = async (id: IExpense["id"]) => {
    try {
      dispatch({ type: ActionTypes.FETCHING });
      await firebaseDeleteExpense(id);
    } catch (error) {
    } finally {
      dispatch({ type: ActionTypes.FINISH_FETCHING });
    }
  };

  const updateExpense = async (id: string, expense: Omit<IExpense, "id">) => {

    try {
      dispatch({ type: ActionTypes.FETCHING });
      await firebaseUpdateExpense(id, expense);
    } catch (error) {
    } finally {
      dispatch({ type: ActionTypes.FINISH_FETCHING });
    }
  };

  const setExpenses = (expenses: IExpense[]) => {
    dispatch({
      type: ActionTypes.SET,
      payload: {
        expenses,
      },
    });
  };

  useEffect(() => {
    const getExpenses = async () => {
      const expenses = await fetchExpenses();
      setExpenses(expenses);
    };
    getExpenses();
  }, [state.isLoading]);

  return (
    <ExpensesContext.Provider
      value={{
        ...state,
        addExpense,
        deleteExpense,
        updateExpense,
        setExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(ExpensesContext);
};

export { ExpensesContextProvider, expensesInitialValue };
