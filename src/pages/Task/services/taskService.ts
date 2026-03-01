import axios from "axios";
import { Task } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTasksApi = async (token: string): Promise<Task[]> => {
  const res = await axios.get(`${API_URL}/task`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data as Task[];
};
