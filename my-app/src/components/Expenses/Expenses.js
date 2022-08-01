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

    return (
        <Card className="expenses">
            <ExpensesFilter onFilterHandler={onFilterHandler}></ExpensesFilter>
            {filteredExpenses.map((expense) => { return (
                <ExpenseItem 
                key={expense.id}
                date={expense.date}
                title={expense.title}
                amount={expense.amount}
            ></ExpenseItem>
            )})}
        </Card>
    )
}

export default Expenses;