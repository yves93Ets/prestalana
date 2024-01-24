import { DropResult } from "@hello-pangea/dnd";

export const items = [
  {
    id: "65ae86d03e631f8cca199ec9",
    task: "First task",
    stateOrder: "1",
  },
  {
    id: "65ae86ff3e631f8cca199eca",
    task: "Second task",
    stateOrder: "2",
  },
  {
    id: "65af160eccdeb503a01a9d9d",
    task: "run",
    stateOrder: "2",
  },
];

export const columns = [
  {
    id: "65ae866c3e631f8cca199ec5",
    name: "Requested",
    order: 1,
  },
  {
    id: "65ae869f3e631f8cca199ec6",
    name: "To do",
    order: 2,
  },
  {
    id: "65ae86ab3e631f8cca199ec7",
    name: "In progress",
    order: 3,
  },
];

export const dropResult = {
  draggableId: "65ae86d03e631f8cca199ec9",
  type: "DEFAULT",
  source: {
    index: 0,
    droppableId: "1",
  },
  reason: "DROP",
  mode: "FLUID",
  destination: {
    droppableId: "2",
    index: 3,
  },
  combine: null,
} as DropResult;

export const dropResultSame = {
  draggableId: "65ae86ff3e631f8cca199eca",
  type: "DEFAULT",
  source: {
    index: 0,
    droppableId: "2",
  },
  reason: "DROP",
  mode: "FLUID",
  destination: {
    droppableId: "2",
    index: 3,
  },
  combine: null,
} as DropResult;
