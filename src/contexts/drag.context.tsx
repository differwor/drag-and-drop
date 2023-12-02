import { createContext, useState } from 'react';

interface IContextValue {
  dragging: string;
  setDragging: (arg: string) => void;
}

export const DragContext = createContext<IContextValue>({
  dragging: '',
  setDragging: () => {},
});

const DragProvider = ({ children }: { children: React.ReactNode }) => {
  const [dragging, setDragging] = useState<string>('');

  return (
    <DragContext.Provider
      value={{ dragging, setDragging }}
    >
      {children}
    </DragContext.Provider>
  );
};

export default DragProvider;
