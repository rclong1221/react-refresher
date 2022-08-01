import Expenses from "./components/Expenses";

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
            <Expenses items={expenses}></Expenses>
        </div>
    )
}

export default App;