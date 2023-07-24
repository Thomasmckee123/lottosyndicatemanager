import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [countRoundTwo, setCountRoundTwo] = useState(10)
  const [text, setText] = useState("");

  useEffect(() => {
    console.log(`test${countRoundTwo}`);
  }, [countRoundTwo, count]);

  const handleInputChange = (event) => {
    setText(event.target.value);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setCountRoundTwo((countRoundTwo) => countRoundTwo + 20)}>
          round two count is {countRoundTwo}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <input type="text" value={text} onChange={handleInputChange} />
      <p>{text}</p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}


export default App
