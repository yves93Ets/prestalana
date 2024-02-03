import { Item } from "./Items";

export interface Column {
  id: string;
  name: string;
  items: Item[];
  order: number;
}

export interface Columns {
  [key: string]: Column;
}
