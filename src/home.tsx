import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropArea from "./components/DropArea";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DragProvider from "./contexts/drag.context";

const Home = () => {
  return (
    <div className="home">
      <DndProvider backend={HTML5Backend}>
        <DragProvider>
          <Navbar />
          <Sidebar components={['ElementButton', 'ElementParagraph']} />
          <DropArea />
        </DragProvider>
      </DndProvider>
    </div>
  )
}

export default Home;