import {useState} from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <main>
             <div className="hello bg-red-500">
                <h1>React App</h1>
                <p>Counter: {count}</p>
                <button onClick={() => setCount(count + 1)}>Increment</button>
                <button onClick={() => setCount(count - 1)}>Decrement</button>
             </div>
        </main>
    )
}

export default App
