import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Task } from "../types";
import { fetchTasksApi } from "../services/taskService";
import { dedupeTasks } from "../utils/taskDedupe";

const CACHE_KEY = "cachedTasks";
const CACHE_TIME_KEY = "cachedTime";
const CACHE_DURATION = 5 * 60 * 1000; // 5 mnt

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async (token: string) => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
      const now = Date.now();
      let initialDataShown = false;

// cek cache
      if (
        cachedData &&
        cachedTime &&
        now - Number(cachedTime) < CACHE_DURATION
      ) {
        setTasks(JSON.parse(cachedData));
        initialDataShown = true;
      } else {
        setLoading(true);
      }

        //  fetch data baru
      const rawData = await fetchTasksApi(token);
      const newData = dedupeTasks(rawData);

      const oldData = cachedData ? JSON.parse(cachedData) : [];
      const isDifferent =
        JSON.stringify(newData) !== JSON.stringify(oldData);

      // update klo beda
      if (isDifferent) {
        if (initialDataShown) setTasks([]);
        setLoading(true);

        setTimeout(() => {
          setTasks(newData);
          setLoading(false);
        }, 500);

        localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      } else {
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
        if (!initialDataShown) setTasks(newData);
        setLoading(false);
      }
    } catch (err: any) {
      console.error("❌ Error fetching:", err);

      if (err.response?.status === 401) {
        toast.error("Sesi login berakhir, silakan login ulang", {
          id: "token-expired",
        });
        localStorage.removeItem("token");
      } else {
        toast.error("Gagal memuat daftar tugas", {
          id: "fetch-error",
        });
      }

      const fallback = localStorage.getItem(CACHE_KEY);
      if (fallback) setTasks(JSON.parse(fallback));
      else setTasks([]);

      setLoading(false);
    }
  }, []);

  return {
    tasks,
    loading,
    fetchTasks,
    setTasks,
  };
};
