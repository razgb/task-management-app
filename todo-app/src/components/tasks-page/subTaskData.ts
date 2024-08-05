export type SubTaskType = {
  title: string;
  completed: boolean;
  position: number;
  id: string;
};

const subTasksData: SubTaskType[] = [
  {
    title: "Set up project structure",
    completed: false,
    position: 0,
    id: "firebaseId-1",
  },
  {
    title: "Design component hierarchy",
    completed: true,
    position: 1,
    id: "firebaseId-2",
  },
  {
    title: "Implement state management",
    completed: false,
    position: 2,
    id: "firebaseId-3",
  },
  {
    title: "Create responsive layout",
    completed: true,
    position: 3,
    id: "firebaseId-4",
  },
  {
    title: "Set up API integration",
    completed: false,
    position: 4,
    id: "firebaseId-5",
  },
];

export { subTasksData };
