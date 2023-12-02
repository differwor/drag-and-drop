import { useContext } from "react";
import { componentMap } from "./constants";
import { ElementContext } from "./contexts/element.context";

const Consumer = () => {
  const { elements } = useContext(ElementContext);
  return (
    <div style={{ width: "100%", textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {
        !!elements.length &&
        elements.map((e, i) => {
          const ELementComponent = componentMap[e.component];
          return <ELementComponent key={i} {...e.props} />
        })
      }
    </div>
  )
}

export default Consumer;