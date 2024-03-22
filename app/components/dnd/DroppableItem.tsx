import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Column } from "@/interfaces/Columns";

interface DroppableItemProps {
  handleSelect: (columnId: string, itemId: string) => void;
  columnId: string;
  column: Column;
  itemId: string;
}
export function DroppableItem({
  handleSelect,
  columnId,
  column,
  itemId,
}: DroppableItemProps) {
  return (
    <Droppable droppableId={columnId} key={columnId}>
      {(provided, snapshot) => (
        <>
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`lg:max-w-56 xl:max-w-56
            min-h-[150px]
            lg:min-h-[500px]
            xl:min-h-[500px]
            rounded-lg p-2
            ${snapshot.isDraggingOver ? "bg-gray-500" : "bg-gray-400"}
             `}
          >
            {column.items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    onClick={() => handleSelect(columnId, item.id)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`
                              select-none py-2 mb-2 
                              min-h-[30px]
                              text-center  ${
                                snapshot.isDragging
                                  ? "bg-gray-100"
                                  : "bg-gray-200"
                              } ${provided.draggableProps.style}
                              ${itemId === item.id && "bg-gray-500"}`}
                  >
                    <div>{item.task}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </>
      )}
    </Droppable>
  );
}
