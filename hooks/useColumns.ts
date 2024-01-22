import { ColumnsActions } from "@/lib/slices/columns/columnsSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { shallowEqual } from "react-redux";

const useColumns = () => {
  const dispatch = useAppDispatch();

  const setColumnsInStore = () => dispatch(ColumnsActions.buildColumns());
  const getColumns = useAppSelector(
    ({ columnsState }) => columnsState.columns,
    shallowEqual
  );

  return {
    setColumnsInStore,
    getColumns,
  };
};

export default useColumns;
