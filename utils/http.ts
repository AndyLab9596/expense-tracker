import axios from "axios"
import { IExpense } from "../components/ExpensesOutput/ExpensesOutput";

const BACKEND_URL = 'https://expenses-tracker-32db1-default-rtdb.asia-southeast1.firebasedatabase.app';

const storeExpense = async (expenseData: Omit<IExpense, 'id'>) => {
    await axios.post(`${BACKEND_URL}/expenses.json`, expenseData);
    // const response = await axios.post(`${BACKEND_URL}/expenses.json`, expenseData);
    // const id = response.data.name;
    // return id
}

const fetchExpenses = async () => {
    const response = await axios.get(`${BACKEND_URL}/expenses.json`);

    const expenses: IExpense[] = [];

    for (const key in response.data) {
        const expenseObj: IExpense = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };

        expenses.push(expenseObj);
    }

    return expenses;
}

const firebaseUpdateExpense = (id: string, expenseData: Omit<IExpense, 'id'>) => {
    return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
}

const firebaseDeleteExpense = (id: string) => {
    return axios.delete(`${BACKEND_URL}/expenses/${id}.json`)
}

export {
    storeExpense,
    fetchExpenses,
    firebaseUpdateExpense,
    firebaseDeleteExpense
}