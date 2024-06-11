import { useContext } from "react";
import { HrefContext } from "./HrefContext";
import { CollectionModel, EntityModel, Link } from "./types";

export interface LinksProps {
  entity: EntityModel | CollectionModel;
}

function LinksView({ entity }: LinksProps) {

  if (!("_links" in entity)) {
    return <></>
  }

  const _links = entity._links;
  if (_links === undefined) {
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

function LinkView(rel: string, link: Link) {

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
