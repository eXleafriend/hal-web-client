import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import ModelView from './ModelView';
import { CollectionModel, EntityModel } from './types';

function App() {

  const [baseUrl, _setBaseUrl] = useState(localStorage.getItem("baseUrl"));
  const [baseUrlEnabled, setBaseUrlEnabled] = useState(false);

  const [href, setHref] = useState(baseUrl);
  const [model, setModel] = useState(undefined as (EntityModel | CollectionModel | undefined));

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

  useEffect(() => {
    if (href === null) {
      return;
    }
    fetch(href).then(response => {
      response.json().then(setModel);
    });
  }, [href]);

  return (
    <>
      <div>
        <input type="text" placeholder="http://localhost:8080" value={baseUrl || ""} onChange={e => setBaseUrl(e.target.value)} />
      </div>
      <form>
        <button disabled={!baseUrlEnabled}>Call</button>
      </form>
      {model === undefined ? (<></>) : (<ModelView model={model} setHref={setHref} />)}
    </>
  )
}

export default App
