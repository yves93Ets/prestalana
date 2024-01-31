export interface ItemForm {
  task: string;
  stateOrder: string;
}

export interface ItemDelete {
  columnId: string;
  itemId: string;
}

export interface ItemUpdate {
  id: string;
  stateOrder: string;
}

export interface Item extends ItemForm {
  id: string;
}
