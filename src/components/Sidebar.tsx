import { FC, memo } from "react"
import { useDrag } from "react-dnd";
import { componentArray, componentMap, TComponent } from "../constants";

interface IProps {
  components: TComponent[]
}

const Sidebar = ({ components }: IProps) => {
  return (
    <div className="sidebar">
      {components.map((component, i) => {
        const ELementComponent = componentMap[component];
        const props = componentArray.filter(e => e.component === component, {});
        return <DragItem key={i} Element={ELementComponent} typeComponent={component} props={props[0]} />;
      })}
    </div>
  )
}

const DragItem = ({ Element, typeComponent, props }: { Element: FC, typeComponent: string, props: any }) => {
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

  return (
    <div
      ref={drag}
      className="drag-item"
      style={{
        opacity: isDragging ? 0.2 : 1,
        cursor: 'move',
      }}
    >
      <Element />
    </div>
  )
}

export default memo(Sidebar)