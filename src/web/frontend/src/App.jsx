import {useEffect, useState} from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        fetch('/is-alive').then(res => res.json()).then((e) => {
            setMsg(JSON.stringify(e));
        }).catch(e => {
            setMsg(JSON.stringify(e));
        })
    }, []);
    return (
        <main>
             <div>
                <h1>React App</h1>
                <p>Counter: {count}</p>
                <button onClick={() => setCount(count + 1)}>Increment</button>
                <button onClick={() => setCount(count - 1)}>Decrement</button>
                <p>{msg}</p>
             </div>
        </main>
    )
}

export default App
