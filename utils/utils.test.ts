import { items, columns, dropResult, dropResultSame } from "./mockData";
import { normalizeColumns, onDragEnd } from "./utils";
import { Column, Item } from "@/interfaces/interface";

describe("normalizeColumns", () => {
  it("should normalize columns correctly", () => {
    const result = normalizeColumns(items, columns as unknown as Column[]);
    const orders = ["1", "2", "3"];
    orders.forEach((order) => {
      const length = items.filter((item) => {
        return item.stateOrder === order;
      }).length;
      expect(result[order].items.length).toBe(length);
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

    onDragEnd(dropResult, normalisezCols, setColumns);

    expect(setColumns).toHaveBeenCalledTimes(1);
  });

  it("should handle drag end correctly on same box", () => {
    const result = normalizeColumns(items, columns as unknown as Column[]);
    const setColumns = jest.fn();

    onDragEnd(dropResultSame, normalisezCols, setColumns);

    expect(setColumns).toHaveBeenCalledTimes(1);
  });

  it("set columns is not called", () => {
    const result = normalizeColumns(items, columns as unknown as Column[]);
    const setColumns = jest.fn();

    onDragEnd({} as any, normalisezCols, setColumns);

    expect(setColumns).toHaveBeenCalledTimes(0);
  });
});
