import { FC } from "react";
import ElementButton from "./components/ElementButton";
import ElementParagraph from "./components/ElementParagraph";


export const componentMap: { [key: string]: FC } = {
  'ElementButton': ElementButton,
  'ElementParagraph': ElementParagraph,
};

export type TComponent = 'ElementButton' | 'ElementParagraph';
export const componentArray = [
  {
    component: 'ElementButton',
    props: {
      label: "",
      message: ""
    }
  }, 
  {
    component: 'ElementParagraph',
    props: {
      text: ""
    }
  }
];