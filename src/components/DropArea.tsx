import { memo, useState } from "react"
import { useDrop } from "react-dnd";
import { componentArray, componentMap, TComponent } from "../constants";

const DropArea = () => {
  const [elements, setElement] = useState<any[]>([]);
  const [focus, setFocus] = useState<TComponent>();
  const [{ isActive }, drop] = useDrop(() => ({
    accept: componentArray.map(e => e.component),
    drop(_item: unknown, monitor) {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }
      setElement([...elements, _item]);
    },
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  }),
  [elements])
  console.log(focus, isActive)
  return (
    <div className="drop-area">
      <div className="drop-box" ref={drop}>
        {
          elements.map((e, i) => {
            const ELementComponent = componentMap[e.component];
            return (
              <div key={i} style={{padding: '8px'}} onClick={() => e.component !== focus && setFocus(e.component)}>
                <div style={{ pointerEvents: 'none' }}>
                  <ELementComponent />
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="edit-box">

      </div>
    </div>
  )
}

export default memo(DropArea);