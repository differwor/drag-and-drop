import { memo } from "react";
import useMousePosition from "../hooks/useMousePosition"

const MousePosition = () => {
  const { x, y } = useMousePosition();
  return (
    <p>
      Mouse: ({x}, {y})
    </p>
  )
}

export default memo(MousePosition);