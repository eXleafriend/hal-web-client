import { useEffect, useState } from 'react';
import './App.css';
import { JsonObject, Link, LinkRelation } from './types';
import LinksView from './LinksView';
import { HrefContext } from './HrefContext';

function readLink(rel: LinkRelation): (object: object) => Link | undefined {
  return object => {
    const href = "href" in object && typeof object.href === "string" ? object.href : undefined;
    if (href === undefined) {
      return undefined;
    }
    const title = "title" in object && typeof object.title === "string" ? object.title : undefined;
    return {
      rel,
      href,
      title,
    };
  };
}

function App() {

  const [baseUrl, _setBaseUrl] = useState(localStorage.getItem("baseUrl"));
  const [baseUrlEnabled, setBaseUrlEnabled] = useState(false);

  const [href, setHref] = useState(baseUrl);
  const [, set_links] = useState([] as (Link | undefined)[]);
  const [_body, set_body] = useState(undefined as (JsonObject | undefined));
  const [_embedded, set_embedded] = useState(undefined as ({ [key: string]: object[] } | undefined));

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
      response.json().then(json => {
        const _links = [] as (Link | undefined)[];
        if ("_links" in json) {
          Object.keys(json._links).forEach(rel => {
            const item = json._links[rel];
            if (Array.isArray(item)) {
              _links.push(...item.map(readLink(rel)));
            } else {
              _links.push(readLink(rel)(item));
            }
          });
        }
        set_links(_links);

        if ("_embedded" in json) {
          set_embedded(json._embedded);
        } else {
          set_body(json);
        }
      });
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
      {_embedded === undefined ? <></> : Object.keys(_embedded).map(key => {
        const items = _embedded[key];
        return (
          <>
            <div>{key}</div>
            {items.map(item => {
              const i = { ...item };
              if ("_links" in i) {
                delete i._links;
              }
              return (
                <div>{JSON.stringify(i)}</div>
              );
            })}
          </>
        );
      })}
      <HrefContext.Provider value={{ setHref }}>
        <LinksView entity={_body || {}} />
      </HrefContext.Provider>
    </>
  )
}

export default App
