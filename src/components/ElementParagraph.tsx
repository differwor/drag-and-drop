import { memo } from "react";

export interface IParagraphProps {
  text?: string;
}

const ElementParagraph = ({ text }: IParagraphProps) => {
  return (
    <p style={{ margin: '8px' }}>{text || 'paragraph'}</p>
  )
}

export default memo(ElementParagraph)