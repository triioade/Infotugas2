import { Task } from "../types";

export const dedupeTasks = (tasks: Task[]): Task[] => {
  const map = new Map<string, Task>();
  tasks.forEach(t => map.set(t.taskId, t));
  return Array.from(map.values());
};
