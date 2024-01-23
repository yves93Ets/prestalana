import { shallowEqual } from "react-redux";

import { ColumnsActions } from "@/lib/slices/columns/columnsSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { ItemForm } from "@/interfaces/interface";

const useColumns = () => {
  const dispatch = useAppDispatch();

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
  };
};

export default useColumns;
