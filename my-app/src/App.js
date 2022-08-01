import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

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
            <NewExpense />
            <Expenses items={expenses}></Expenses>
        </div>
    );
}

export default App;