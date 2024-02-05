import { items, columns, dropResult, dropResultSame } from "./mockData";
import { normalizeColumns, onDragEnd, onDeleteItem } from "./columnUitls";
import { Column } from "@/interfaces/Columns";

const mockColumns = normalizeColumns(items, columns as unknown as Column[]);

describe("normalizeColumns", () => {
  it("should normalize columns correctly", () => {
    const orders = ["1", "2", "3"];
    orders.forEach((order) => {
      const length = items.filter((item) => {
        return item.stateOrder === order;
      }).length;
      expect(mockColumns[order].items.length).toBe(length);
    });
  });
});

describe("onDragEnd", () => {
  const normalisezCols = normalizeColumns(
    items,
    columns as unknown as Column[]
  );
  const setColumns = jest.fn();

  it("should handle drag end correctly", () => {
    const result = normalizeColumns(items, columns as unknown as Column[]);
    const setColumns = jest.fn();

    onDragEnd(dropResult, normalisezCols);

    expect(setColumns).toHaveBeenCalledTimes(1);
  });

  it("should handle drag end correctly on same box", () => {
    const result = normalizeColumns(items, columns as unknown as Column[]);
    const setColumns = jest.fn();

    onDragEnd(dropResultSame, normalisezCols);

    expect(setColumns).toHaveBeenCalledTimes(1);
  });

  it("set columns is not called", () => {
    const result = normalizeColumns(items, columns as unknown as Column[]);
    const setColumns = jest.fn();

    onDragEnd({} as any, normalisezCols);

    expect(setColumns).toHaveBeenCalledTimes(0);
  });
});

describe("onDeleteItem", () => {
  it("should remove the selected item from the column", () => {
    const columns = {
      column1: {
        items: [{ id: "item1" }, { id: "item2" }],
      },
    };
    const selected = { columnId: "column1", itemId: "item1" };
    const updatedCols = onDeleteItem(selected, mockColumns);

    expect(updatedCols.column1.items).toEqual([{ id: "item2" }]);
  });
});
