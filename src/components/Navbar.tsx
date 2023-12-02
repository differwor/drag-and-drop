import { memo, useContext } from "react"
import { Link } from "react-router-dom";
import { ElementContext } from "../contexts/element.context";

const Navbar = () => {
  const { undo, redo, clear, elements } = useContext(ElementContext);
  const save = (elements: any[]) => {
    localStorage.setItem('elements', elements.map((e: any) => JSON.stringify(e)).join('|-|-|'));
    alert('Saved successfully!')
  }
  return (
    <div className="navbar">
      <button onClick={clear}>Clear</button>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      <button onClick={() => save(elements)}>Save</button>
      <Link to='/consumer'>
        <button>View</button>
      </Link>
    </div>
  )
}

export default memo(Navbar)