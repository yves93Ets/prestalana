import { shallowEqual } from "react-redux";

import { ColumnsActions } from "@/lib/slices/columns/columnsSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { ItemDelete, ItemForm } from "@/interfaces/Items";

const useColumns = () => {
  const dispatch = useAppDispatch();

  const deleteItem = (body: ItemDelete) => {
    dispatch(ColumnsActions.deleteItem(body));
  };
  const setColumnsInStore = () => dispatch(ColumnsActions.buildColumns());
  const addNewItem = (body: ItemForm) => {
    dispatch(ColumnsActions.createItem(body));
  };

  const getColumns = useAppSelector(
    ({ columnsState }) => columnsState.columns,
    shallowEqual
  );

  return {
    setColumnsInStore,
    getColumns,
    addNewItem,
    deleteItem,
  };
};

export default useColumns;
