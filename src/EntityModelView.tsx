import React from "react";
import { HrefContext } from "./HrefContext";
import LinksView from "./LinksView";
import { EntityModel, JsonObject } from "./types";

export interface EntityModelProps {
  model: EntityModel;
  setHref: (href: string) => void;
}

function EntityModelView({ model, setHref }: EntityModelProps) {
  return (
    <table className="table table-striped">
      <tbody>
        {Object.keys(model).map(propName => (propName.startsWith("_") ? (<React.Fragment key={propName}></React.Fragment>) : (
          <tr key={propName}>
            <th>{propName}</th>
            <td style={{ whiteSpace: "pre-wrap" }}>{String((model as JsonObject)[propName])}</td>
          </tr>
        )))}
      </tbody>
      <tfoot>
        <td colSpan={2}>
          <HrefContext.Provider value={{ setHref }}>
            <LinksView entity={model} />
          </HrefContext.Provider>
        </td>
      </tfoot>
    </table>
  );
}

export default EntityModelView;
