import { items, columns, dropResult, dropResultSame } from "./mockData";
import {
  normalizeColumns,
  onDragItemEnd,
  onDeleteItem,
  moveColumns,
  updateColumnsOrder,
  convertArrayToObject,
  slideColumns,
} from "./columnUtils";
import { Column } from "@/interfaces/Columns";

const mockColumns = normalizeColumns(items, columns as unknown as Column[]);
const mockArrColumns = Object.values(mockColumns);

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

    onDragItemEnd(dropResult, normalisezCols);

    expect(setColumns).toHaveBeenCalledTimes(1);
  });

  it("should handle drag end correctly on same box", () => {
    const result = normalizeColumns(items, columns as unknown as Column[]);
    const setColumns = jest.fn();

    onDragItemEnd(dropResultSame, normalisezCols);

    expect(setColumns).toHaveBeenCalledTimes(1);
  });

  it("set columns is not called", () => {
    const result = normalizeColumns(items, columns as unknown as Column[]);
    const setColumns = jest.fn();

    onDragItemEnd({} as any, normalisezCols);

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

    expect(columns.column1.items).toEqual([{ id: "item2" }]);
  });
});

describe("moveColumns", () => {
  it("should move the column from the source index to the destination index", () => {
    const result = moveColumns(0, 2, mockColumns);
    expect(result[2].id).toBe("1");
    expect(result[0].id).toBe("2");
    expect(result[1].id).toBe("3");
  });
});

describe("updateColumnsOrder", () => {
  it("should update the order and stateOrder of each column and its items", () => {
    const result = updateColumnsOrder(mockArrColumns);
    result.forEach((column, index) => {
      expect(column.order).toBe(index + 1);
      column.items.forEach((item) => {
        expect(item.stateOrder).toBe((index + 1).toString());
      });
    });
  });
});

describe("convertArrayToObject", () => {
  it("should convert an array of columns to an object", () => {
    const result = convertArrayToObject(mockArrColumns);
    expect(result).toEqual({
      1: { id: "1", order: 1, items: [{ id: "item1", stateOrder: "1" }] },
      2: { id: "2", order: 2, items: [{ id: "item2", stateOrder: "2" }] },
      3: { id: "3", order: 3, items: [{ id: "item3", stateOrder: "3" }] },
    });
  });
});

describe("slideColumns", () => {
  it("should move the column from the source index to the destination index", () => {
    const result = slideColumns(0, 2, mockColumns);
    expect(result[2].id).toBe("1");
    expect(result[0].id).toBe("2");
    expect(result[1].id).toBe("3");
  });
});
