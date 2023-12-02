import { memo } from "react";

export interface IButtonProps {
  label?: string;
  message?: string;
}

const ElementButton = ({ label, message }: IButtonProps) => {
  return (
    <button style={{ margin: '8px' }} onClick={() => alert(message || "Empty!")}>{label || 'Button'}</button>
  )
}

export default memo(ElementButton)