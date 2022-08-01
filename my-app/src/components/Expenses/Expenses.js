import React, { useState } from 'react';


import Card from '../UI/Card';

import './Expenses.css';
import ExpensesChart from './ExpensesChart';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';

function Expenses(props) {
    const [year, setYear] = useState('2022');

    function onFilterHandler(yr) {
        setYear(yr);
    }

    const filteredExpenses = props.items.filter(expense => {
        return expense.date.getFullYear().toString() === year;
    });

    return (
        <Card className="expenses">
            <ExpensesFilter onFilterHandler={onFilterHandler}></ExpensesFilter>
            <ExpensesChart expenses={filteredExpenses}></ExpensesChart>
            <ExpensesList items={filteredExpenses}></ExpensesList>
        </Card>
    )
}

export default Expenses;