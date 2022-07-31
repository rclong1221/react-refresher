import ExpenseItem from "./components/ExpenseItem";

function App() {
    const expenses = [
        {
            date: new Date(2021, 12, 21),
            title: 'Car Insurance',
            amount: 294.67
        },
        {
            date: new Date(2021, 12, 21),
            title: 'Groceries',
            amount: 15.91
        },
        {
            date: new Date(2021, 12, 21),
            title: 'Movie',
            amount: 5.23
        },
    ]
    return (
        <div>
            <h2>H2</h2>
            <ExpenseItem 
                date={expenses[0].date}
                title={expenses[0].title}
                amount={expenses[0].amount}
            ></ExpenseItem>
            <ExpenseItem 
                date={expenses[1].date}
                title={expenses[1].title}
                amount={expenses[1].amount}
            ></ExpenseItem>
            <ExpenseItem 
                date={expenses[2].date}
                title={expenses[2].title}
                amount={expenses[2].amount}
            ></ExpenseItem>
        </div>
    )
}

export default App;