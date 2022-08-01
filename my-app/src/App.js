import React, { useState } from 'react';

import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

const DUMMY_DATA = [
    {   
        id: 'e1',
        date: new Date(2021, 12, 21),
        title: 'Car Insurance',
        amount: 294.67
    },
    {
        id: 'e2',
        date: new Date(2021, 12, 21),
        title: 'Groceries',
        amount: 15.91
    },
    {
        id: 'e3',
        date: new Date(2021, 12, 21),
        title: 'Movie',
        amount: 5.23
    },
]

function App() {
    const [expenses, setExpenses] = useState(DUMMY_DATA);

    function addExpenseHandler(expense) {
        setExpenses(
            (prev) => { 
                return [expense, ...prev]; 
            }
        );
    };

    return (
        <div>
            <NewExpense addExpenseHandler={addExpenseHandler}/>
            <Expenses items={expenses}></Expenses>
        </div>
    );
}

export default App;