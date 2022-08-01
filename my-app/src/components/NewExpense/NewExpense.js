import React, { useState } from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

function NewExpense(props) {
    const [isEditing, setIsEditing] = useState(false);

    function onSaveExpense(newExpenseData) {
        props.addExpenseHandler(newExpenseData);
        setIsEditing(false);
    }

    function startEditingHandler() {
        setIsEditing(true);
    }

    function onCancelHandler() {
        setIsEditing(false);
    }

    return (
        <div className="new-expense">
            { 
                isEditing ? <ExpenseForm onSaveExpense={onSaveExpense} onCancelHandler={onCancelHandler}></ExpenseForm> 
                : <button onClick={startEditingHandler}>Add New Expense</button>
            }
        </div>
    )
}

export default NewExpense;