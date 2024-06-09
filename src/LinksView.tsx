import { useContext } from "react";
import { JsonObject, JsonValue } from "./types";
import { HrefContext } from "./HrefContext";

export interface LinksProps {
  entity: JsonObject;
}

function LinksView({ entity }: LinksProps) {

  if (!("_links" in entity)) {
    return <></>
  }

  const _links = entity._links;
  if (Array.isArray(_links)) {
    return <></>
  } else if (_links === null
    || typeof _links === "boolean"
    || typeof _links === "number"
    || typeof _links === "string") {
    return <></>
  }

  return (<div className="links">
    {Object.keys(_links).map(rel => {
      const link = _links[rel];
      if (Array.isArray(link)) {
        return link.map(l => LinkView(rel, l))
        } else {
        return LinkView(rel, link);
      }
    })}
  </div>);

}

function LinkView(rel: string, link: JsonValue) {

  const { setHref } = useContext(HrefContext);

  if (Array.isArray(link)) {
    return <></>
  } else if (link === null
    || typeof link === "boolean"
    || typeof link === "number"
    || typeof link === "string") {
    return <></>
  }

  if (!("href" in link)) {
    return <></>;
  }

  const href = String(link.href);
  const title = "title" in link ? String(link.title) : rel;

  return (
    <button onClick={() => setHref(href)}>{title}</button>
  );
}

export default LinksView;
