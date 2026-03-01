import { Task } from "../types";

export const calculateProgress = (tasks: Task[]) => {
  const done = tasks.filter(t => t.status).length;
  const total = tasks.length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  return { done, total, percent };
};
