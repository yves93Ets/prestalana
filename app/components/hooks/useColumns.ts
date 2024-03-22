import { shallowEqual } from "react-redux";

import { ColumnsActions } from "@/lib/slices/columns/columnsSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { ItemDelete, ItemForm } from "@/interfaces/Items";
import { DropResult } from "@hello-pangea/dnd";

const useColumns = () => {
  const dispatch = useAppDispatch();

  const deleteItem = (body: ItemDelete) => {
    dispatch(ColumnsActions.deleteItem(body));
  };
  const setColumnsInStore = () => dispatch(ColumnsActions.buildColumns());

  const addNewItem = (body: ItemForm) =>
    dispatch(ColumnsActions.createItem(body));

  const updateStateOrder = (body: DropResult) =>
    dispatch(ColumnsActions.updateItem(body));

  const columns = useAppSelector(
    ({ columnsState }) => columnsState.columns,
    shallowEqual
  );

  return {
    setColumnsInStore,
    columns,
    addNewItem,
    deleteItem,
    updateStateOrder,
  };
};

export default useColumns;
