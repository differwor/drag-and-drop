import { memo } from "react";

interface IProps {
  label?: string;
  message?: string;
}

const ElementButton = ({ label, message }: IProps) => {
  return (
    <button onClick={() => alert(message || "Empty!")}>{label || 'Button'}</button>
  )
}

export default memo(ElementButton)