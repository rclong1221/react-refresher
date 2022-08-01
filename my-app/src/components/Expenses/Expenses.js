import React, { useState } from 'react';

import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';

import './Expenses.css';
import ExpensesFilter from './ExpensesFilter';

function Expenses(props) {
    const [year, setYear] = useState('2022');

    function onFilterHandler(yr) {
        setYear(yr);
    }

    const filteredExpenses = props.items.filter(expense => {
        return expense.date.getFullYear().toString() === year;
    });

    const mappedExpenses = filteredExpenses.map((expense) => { return (
        <ExpenseItem 
        key={expense.id}
        date={expense.date}
        title={expense.title}
        amount={expense.amount}
    ></ExpenseItem>
    )});

    const noExpenses = <p>No expenses found.</p>;

    return (
        <Card className="expenses">
            <ExpensesFilter onFilterHandler={onFilterHandler}></ExpensesFilter>
            {filteredExpenses.length === 0 ? noExpenses : mappedExpenses}
        </Card>
    )
}

export default Expenses;