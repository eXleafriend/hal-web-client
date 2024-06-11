import { HrefContext } from "./HrefContext";
import LinksView from "./LinksView";
import { EntityModel, JsonObject } from "./types";

export interface CollectionModelProps {
  name: string;
  models: EntityModel[];
  setHref: (href: string) => void;
}

function CollectionModelView({ name, models, setHref }: CollectionModelProps) {
  const propNames = [] as string[];
  models.forEach(model => {
    Object.keys(model).forEach(propName => {
      console.log("propName: " + propName)
      if (!(propName.startsWith("_")) && propNames.indexOf(propName) === -1) {
        propNames.push(propName);
      }
    });
  });
  console.log("propNames: " + propNames)
  return (<>
    <h2>{name}</h2>
    <table className="table table-striped">
      <thead>
        <tr>
          {propNames.map(propName => (
            <th key={propName}>{propName}</th>
          ))}
          <th>Links</th>
        </tr>
      </thead>
      <tbody>
        {models.map((model, i) => {
          return (<tr key={i}>
            {propNames.map(propName => (
              <td key={propName} style={{ whiteSpace: "pre-wrap" }}>{String((model as JsonObject)[propName])}</td>
            ))}
            <td>
              <HrefContext.Provider value={{ setHref }}>
                <LinksView entity={model} />
              </HrefContext.Provider>
            </td>
          </tr>);
        })}
      </tbody>

    </table>
  </>);
}

export default CollectionModelView;
