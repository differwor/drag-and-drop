import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Consumer from './consumer';
import Home from './home';
import ElementProvider from './contexts/element.context';

function App() {
  return (
    <ElementProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/consumer" element={<Consumer />} />
        </Routes>
      </BrowserRouter>
    </ElementProvider>
  );
}

export default App;
