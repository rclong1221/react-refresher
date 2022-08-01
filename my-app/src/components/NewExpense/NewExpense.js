import React from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

function NewExpense(props) {
    function onSaveExpense(newExpenseData) {
        props.addExpenseHandler(newExpenseData);
    }

    return (
        <div className="new-expense">
            <ExpenseForm onSaveExpense={onSaveExpense}></ExpenseForm>
        </div>
    )
}

export default NewExpense;