import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [baseUrl, _setBaseUrl] = useState(localStorage.getItem("baseUrl"));
  const [baseUrlEnabled, setBaseUrlEnabled] = useState(false);

  function setBaseUrl(_baseUrl: string): void {
    localStorage.setItem("baseUrl", _baseUrl);
    _setBaseUrl(_baseUrl);
  }

  useEffect(() => {
    if (baseUrl === null) {
      setBaseUrlEnabled(false);
      return;
    }
    fetch(baseUrl).then(response => {
      if (100 <= response.status && response.status < 400) {
        setBaseUrlEnabled(true);
      } else {
        setBaseUrlEnabled(false);
      }
    });
  }, [baseUrl]);

  return (
    <>
      <div>
        <input type="text" placeholder="http://localhost:8080" value={baseUrl || ""} onChange={e => setBaseUrl(e.target.value)} />
      </div>
      <form>
        <button disabled={!baseUrlEnabled}>Call</button>
      </form>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
