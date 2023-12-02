import { FC, memo, useContext, useEffect } from "react"
import { useDrag } from "react-dnd";
import { componentArray, componentMap, TComponent } from "../constants";
import { DragContext } from "../contexts/drag.context";

interface IProps {
  components: TComponent[]
}

const Sidebar = ({ components }: IProps) => {
  return (
    <div className="sidebar">
      {components.map((component, i) => {
        const ELementComponent = componentMap[component];
        const propsComponent = componentArray.filter(e => e.component === component, {});
        return <DragItem key={i} Element={ELementComponent} typeComponent={component} props={propsComponent[0].props} />;
      })}
    </div>
  )
}

const DragItem = ({ Element, typeComponent, props }: { Element: FC, typeComponent: string, props: any }) => {
  const { setDragging } = useContext(DragContext);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: typeComponent,
    item: { component: typeComponent, props: props },
    options: {
      dropEffect: 'copy',
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  useEffect(() => {
    setDragging(isDragging ? typeComponent : '');
    // eslint-disable-next-line
  }, [isDragging])
  return (
    <div
      ref={drag}
      className="drag-item"
      style={{
        opacity: isDragging ? 0.2 : 1,
        cursor: 'move',
      }}
    >
      <div style={{ pointerEvents: 'none' }}>
        <Element />
      </div>
    </div>
  )
}

export default memo(Sidebar)