import { useEffect, useState } from 'react'
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
    </>
  )
}

export default App
