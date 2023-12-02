import { createContext, useState } from 'react';

interface IContextValue {
  elements: any[];
  setElements: (arg: any[]) => void;
  undo: () => void,
  redo: () => void,
  clear: () => void
}

export const ElementContext = createContext<IContextValue>({
  elements: [],
  setElements: () => {},
  undo: () => {},
  redo: () => {},
  clear: () => {}
});

const ElementProvider = ({ children }: { children: React.ReactNode }) => {
  const localElements = localStorage.getItem('elements');
  const presentElements = localElements ? localElements.split('|-|-|').map((e: any) => JSON.parse(e)) : [];
  const [past, setPast] = useState<any[]>([]);
  const [present, setPresent] = useState<any>(presentElements || []);
  const [future, setFuture] = useState<any[]>([]);

  const undo = () => {
    if (past.length === 0) return;
    const newPast = [...past];
    const newPresent = newPast.pop();

    setPast(newPast);
    setFuture([present, ...future]);
    setPresent(newPresent);
  };

  const redo = () => {
    if (future.length === 0) return;
    const newFuture = [...future];
    const newPresent = newFuture.shift();

    setPast([...past, present]);
    setFuture(newFuture);
    setPresent(newPresent);
  };

  const clear = () => {
    updatePresent([]);
  }

  const updatePresent = (newState: any) => {
    setPast([...past, present]);
    setPresent(newState);
    setFuture([]);
  };

  return (
    <ElementContext.Provider
      value={{ elements: present, setElements: updatePresent, undo, redo, clear }}
    >
      {children}
    </ElementContext.Provider>
  );
};

export default ElementProvider;
