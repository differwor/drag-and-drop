import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import DropArea from './components/DropArea';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Navbar />
        <Sidebar components={['ElementButton', 'ElementParagraph']} />
        <DropArea />
      </DndProvider>
    </div>
  );
}

export default App;
