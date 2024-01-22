export interface Item {
  id: string;
  task: string;
  stateOrder: string;
}

export interface Column {
  name: string;
  items: Item[];
  order: number;
}

export interface Columns {
  [key: string]: Column;
}
