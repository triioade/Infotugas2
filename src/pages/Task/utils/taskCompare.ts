import { Task } from "../types";

export const isTaskListDifferent = (
  a: Task[],
  b: Task[]
): boolean => {
  if (a.length !== b.length) return true;

  return a.some((task, i) => task.taskId !== b[i]?.taskId);
};
