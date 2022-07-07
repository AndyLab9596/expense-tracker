import { IExpense } from "../components/ExpensesOutput/ExpensesOutput";
import ActionTypes from "./actionTypes";
import { IExpensesInitialValue, TAddExpenseProps } from "./expenses-context";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? { type: Key }
  : { type: Key; payload: M[Key] };
};

type ExpensesPayload = {
  [ActionTypes.ADD]: IExpense;
  [ActionTypes.UPDATE]: {
    id: string,
    updatedExpense: IExpense
  };
  [ActionTypes.DELETE]: {
    id: string,
  };
};

type ExpensesAction = ActionMap<ExpensesPayload>[keyof ExpensesPayload];
type ActionsReducer = ExpensesAction;

const expensesReducer = (
  state: IExpensesInitialValue,
  action: ActionsReducer
) => {
  switch (action.type) {
    case ActionTypes.ADD: {
      return {
        ...state,
        expenses: [...state.expenses, action.payload]
      };
    }

    case ActionTypes.DELETE: {
      return {
        ...state,
        expenses: [...state.expenses].filter((expense) => expense.id !== action.payload.id)
      };
    }

    case ActionTypes.UPDATE: {
      const cloneExpenses = [...state.expenses];
      const indexExpense = cloneExpenses.findIndex((expense) => expense.id === action.payload.id)
      const expenseFound = cloneExpenses[indexExpense];
      // const updatedItem = { ...expenseFound, ...action.payload.updatedExpense }
      cloneExpenses[indexExpense] = action.payload.updatedExpense
      return {
        ...state,
        expenses: cloneExpenses,
      };
    }

    default:
      return state;
  }
};

export default expensesReducer;
