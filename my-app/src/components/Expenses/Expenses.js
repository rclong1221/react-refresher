import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';

import './Expenses.css';

function Expenses(props) {
    console.log(props.items);
    return (
        <Card className="expenses">
            {props.items.map((expense) => { return (
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