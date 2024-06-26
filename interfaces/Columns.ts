import { Item } from "./Items";

export interface DBColumn {
  id: string;
  name: string;
  order: number;
}

export interface Column extends DBColumn {
  items: Item[];
}

export interface Columns {
  [key: string]: Column;
}
