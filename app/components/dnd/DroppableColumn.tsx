import { Draggable, Droppable, DroppableProvided } from "@hello-pangea/dnd";
import { Row, Col, Dropdown } from "react-bootstrap";
import { Trash } from "lucide-react";

import { ItemDelete } from "@/interfaces/Items";
import useColumns from "@/app/components/hooks/useColumns";
import { RenameColumnAction } from "@/app/components/column";

import { DroppableItem } from "./";
import { deleteColumn } from "../../column/column-actions";

interface DroppableColumnProps {
  selected: ItemDelete;
  setSelected: Function;
}
export function DroppableColumn({
  selected,
  setSelected,
}: DroppableColumnProps) {
  const { columns, deleteItem, setColumnsInStore } = useColumns();

  const handleSelect = (columnId: string, itemId: string) => {
    const self = selected.columnId === columnId && selected.itemId === itemId;
    if (self) return setSelected({ columnId: "", itemId: "" });

    setSelected({ columnId, itemId });
  };

  const handleDeleteColumn = async (id: string) => {
    await deleteColumn(id);
    setColumnsInStore();
  };

  const handleDelete = () => {
    deleteItem(selected);
    setSelected({ columnId: "", itemId: "" });
  };

  return (
    <Droppable
      droppableId="board"
      key={"board"}
      type="COLUMN"
      direction="horizontal"
      isCombineEnabled={true}
    >
      {(provided: DroppableProvided) => (
        <Row
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="justify-evenly"
        >
          {Object.entries(columns).map(([columnId, column], index) => (
            <Draggable key={column.id} draggableId={column.id} index={index}>
              {(provided) => (
                <Col
                  xs={12}
                  md={12}
                  lg="auto"
                  xl="auto"
                  className="md:w-56 w-56 sm:w-full rounded-lg min-w-[200px]"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                >
                  <h3
                    {...provided.dragHandleProps}
                    className="rounded-lg p-2 my-2 flex justify-between"
                  >
                    {column.name}
                    <span className="cursor-pointer">
                      {selected.columnId === columnId ? (
                        <Trash
                          onClick={handleDelete}
                          size={32}
                          className="btn-rounded onHover !bg-gray-500"
                        />
                      ) : (
                        <Dropdown>
                          <Dropdown.Toggle as="span" className="hide-toggle">
                            ...
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              as="div"
                              className=" dropdown-button"
                              onClick={() => handleDeleteColumn(column.id)}
                            >
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="div"
                              className=" dropdown-button"
                            >
                              <RenameColumnAction
                                id={column.id}
                                title={column.name}
                              />
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </span>
                  </h3>
                  <DroppableItem
                    columnId={columnId}
                    column={column}
                    itemId={selected.itemId}
                    handleSelect={handleSelect}
                  />
                </Col>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Row>
      )}
    </Droppable>
  );
}
