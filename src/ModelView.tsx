import CollectionModelView from "./CollectionModelView";
import EntityModelView from "./EntityModelView";
import { CollectionModel, EntityModel } from "./types";

export interface ModelProps {
  model: EntityModel | CollectionModel;
  setHref: (href: string) => void;
}

function ModelView({ model, setHref }: ModelProps) {

  if ("_embedded" in model) {
    const _embedded = model._embedded;
    return (<>
      {Object.keys(_embedded).map(name => {
        const models = _embedded[name];
        return (
          <CollectionModelView key={name} name={name} models={models} setHref={setHref} />
        );
      })}
    </>)
  } else {
    return (<EntityModelView model={model} setHref={setHref} />);
  }

}

export default ModelView;
