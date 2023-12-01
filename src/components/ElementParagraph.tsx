import { memo } from "react";

interface IProps {
  text?: string;
}

const ElementParagraph = ({ text }: IProps) => {
  return (
    <p>{text || 'paragraph'}</p>
  )
}

export default memo(ElementParagraph)