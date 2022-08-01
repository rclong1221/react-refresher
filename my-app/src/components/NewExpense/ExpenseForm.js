import React, { useState } from 'react';

import './ExpenseForm.css';

function ExpenseForm(props) {
    const [userInput, setUserInput] = useState({
        enteredTitle: '',
        enteredAmount: '',
        enteredDate: ''
    });

    function titleChangeHandler(e) {
        setUserInput((prevInput) => {
            return {
                ...prevInput,
                enteredTitle: e.target.value
            }
        });
    }

    function amountChangeHandler(e) {
        setUserInput((prevInput) => {
            return {
                ...prevInput,
                enteredAmount: e.target.value
            }
        });
    }

    function dateChangeHandler(e) {
        setUserInput((prevInput) => {
            return {
                ...prevInput,
                enteredDate: e.target.value
            }
        });
    }

    function submitHandler(e) {
        e.preventDefault();
        props.onSaveExpense({
            id: 'e' + Math.random(),
            title: userInput.enteredTitle,
            amount: parseFloat(userInput.enteredAmount),
            date: new Date(userInput.enteredDate)
        });
        setUserInput({
            enteredTitle: '',
            enteredAmount: '',
            enteredDate: ''
        });
    }

    function onCancelHandler() {
        props.onCancelHandler();
    }

    return (
        <form>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label>Title</label>
                    <input type='text' onChange={titleChangeHandler} value={userInput.enteredTitle}></input>
                </div>
                <div className='new-expense__control'>
                    <label>Amount</label>
                    <input type='number' min='0.01' step='0.01' onChange={amountChangeHandler} value={userInput.enteredAmount}></input>
                </div>
                <div className='new-expense__control'>
                    <label>Date</label>
                    <input type='date' min='2019-01-01' max='2025-01-01' onChange={dateChangeHandler} value={userInput.enteredDate}></input>
                </div>
            </div>
            <div className='new-expense__actions'>
                <button type='button' onClick={onCancelHandler}>Cancel</button>
                <button type='submit' onClick={submitHandler}>Add Expense</button>
            </div>
        </form>
    );
}

export default ExpenseForm;