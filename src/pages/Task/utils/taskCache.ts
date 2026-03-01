import { Task } from "../types";

const CACHE_KEY = "cachedTasks";
const CACHE_TIME_KEY = "cachedTime";
const CACHE_DURATION = 5 * 60 * 1000;

export const loadTaskCache = () => {
  const data = localStorage.getItem(CACHE_KEY);
  const time = localStorage.getItem(CACHE_TIME_KEY);

  if (!data || !time) return null;
  if (Date.now() - Number(time) > CACHE_DURATION) return null;

  return JSON.parse(data) as Task[];
};

export const saveTaskCache = (tasks: Task[]) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(tasks));
  localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
};
