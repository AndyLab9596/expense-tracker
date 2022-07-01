import ActionTypes from "./actionTypes";
import { IExpensesInitialValue } from "./expenses-context";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

type ExpensesPayload = {
  [ActionTypes.ADD]: undefined;
  [ActionTypes.UPDATE]: undefined;
  [ActionTypes.DELETE]: undefined;
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
      };
    }

    case ActionTypes.UPDATE: {
      return {
        ...state,
      };
    }

    case ActionTypes.DELETE: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default expensesReducer;
