import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';

import './ExpensesList.css';

function ExpensesList(props) {
    const noExpenses = (
    <Card className='no-expense-item'>
        <div className='no-expense-item__description'>
            <h2>No expenses found.</h2>
        </div>
    </Card>);

    if (props.items.length === 0) {
        return noExpenses;
    }

    return (
        props.items.map((expense) => { 
            return (
                <ExpenseItem 
                    key={expense.id}
                    date={expense.date}
                    title={expense.title}
                    amount={expense.amount}
                ></ExpenseItem>
            )
        })
    );
}

export default ExpensesList;