import { ReactNode } from "react";
export interface ItemForm {
  task: string;
  stateOrder: string;
}
export interface Item extends ItemForm {
  id: string;
}

export interface Column {
  name: string;
  items: Item[];
  order: number;
}

export interface Columns {
  [key: string]: Column;
}

export interface ProviderProps {
  children: ReactNode;
}
