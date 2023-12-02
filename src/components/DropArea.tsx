import { memo, useContext, useMemo, useState } from "react"
import { useDrop } from "react-dnd";
import { componentArray, componentMap } from "../constants";
import { DragContext } from "../contexts/drag.context";
import { ElementContext } from "../contexts/element.context";
import { IButtonProps } from "./ElementButton";
import { IParagraphProps } from "./ElementParagraph";
import MousePosition from "./MousePosition";

const DropArea = () => {
  const { elements, setElements } = useContext(ElementContext);
  const { dragging } = useContext(DragContext);
  const [focus, setFocus] = useState<any>();
  const [{ isActive }, drop] = useDrop(() => ({
    accept: componentArray.map(e => e.component),
    drop(_item: any, monitor) {
      const didDrop = monitor.didDrop()
      if (didDrop && !isActive) return;
      setElements([...elements, { id: 'id' + Math.random(), ..._item }]);
    },
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  }),
    [elements]);
  const ListDropElements = elements.map((e, i) => {
    const ELementComponent = componentMap[e.component];
    return (
      <div key={i} onClick={() => e?.id !== focus?.id && setFocus(e)}>
        <div style={{ pointerEvents: 'none' }}>
          <ELementComponent {...e.props} />
        </div>
      </div>
    )
  });
  const elementsChangingHandler = (id: string, newProps: any) => {
    setElements(elements.map(e => e.id === id ? { ...e, props: newProps } : e));
    setFocus({ ...focus, props: newProps });
  }
  const editor = useMemo(() => {
    switch (focus?.component) {
      case 'ElementButton':
        return <ElementButtonEditor props={focus.props} setProps={newProps => elementsChangingHandler(focus?.id, newProps)} />

      case 'ElementParagraph':
        return <ElementParagraphEditor props={focus.props} setProps={newProps => elementsChangingHandler(focus?.id, newProps)} />
    }
    // eslint-disable-next-line
  }, [focus]); 
  return (
    <div className="drop-area">
      <div className="info">
        <MousePosition />
        <p>Dragging: {dragging}</p>
        <p>Instances: {elements?.length}</p>
        <p>Config: {JSON.stringify(focus)}</p>
      </div>
      <div className="drop-box" ref={drop}>
        {ListDropElements}
      </div>
      <div className="edit-box">
        {editor}
      </div>
    </div>
  )
}

const ElementButtonEditor = ({ props, setProps }: { props: IButtonProps, setProps: (props: IButtonProps) => void }) => {
  return (
    <div style={{ margin: '8px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'start' }}>
      <label>Button label</label>
      <input type='text' value={props?.label || ""} onChange={e => setProps({ ...props, label: e.target.value })} />
      <label>Alert message</label>
      <input type='text' value={props?.message || ""} onChange={e => setProps({ ...props, message: e.target.value })} />
    </div>
  )
}

const ElementParagraphEditor = ({ props, setProps }: { props: IParagraphProps, setProps: (props: IParagraphProps) => void }) => {
  return (
    <div style={{ margin: '8px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'start' }}>
      <label>Text paragraph</label>
      <input type='text' value={props?.text || ""} onChange={e => setProps({ text: e.target.value })} />
    </div>
  )
}

export default memo(DropArea);