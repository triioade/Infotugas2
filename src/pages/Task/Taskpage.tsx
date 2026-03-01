import { useEffect } from "react";
import toast from "react-hot-toast";
import PullToRefresh from "pulltorefreshjs";
import { App } from "@capacitor/app";
import type { PluginListenerHandle } from "@capacitor/core";
import { ThreeDot } from "react-loading-indicators";

import { useTasks } from "./hooks/useTasks";
import TaskCard from "./components/taskCard";
import TaskProgress from "./components/taskProgress";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function TaskPage() {
  const { tasks, loading, fetchTasks, setTasks } = useTasks();

  useEffect(() => {
    const msg = localStorage.getItem("loginSuccess");
    const fullname = localStorage.getItem("fullname");

    if (msg && fullname) {
      toast.success(`Login Berhasil, Hai ${fullname} 👋`, {
        id: "login-success",
      });
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchTasks(token);
  }, []);

  useEffect(() => {
    PullToRefresh.init({
      mainElement: "body",
      onRefresh() {
        const token = localStorage.getItem("token");
        if (token) return fetchTasks(token);
      },
    });

    return () => PullToRefresh.destroyAll();
  }, []);

  useEffect(() => {
    let listener: PluginListenerHandle;

    const setup = async () => {
      listener = await App.addListener("resume", () => {
        const token = localStorage.getItem("token");
        if (token) fetchTasks(token);
      });
    };

    setup().catch(() => {});
    return () => {
      listener?.remove();
    };
  }, []);

  const handleChangeStatus = (taskId: string, currentStatus: boolean) => {
    setTasks((prev) =>
      prev.map((t) => (t.taskId === taskId ? { ...t, status: !currentStatus } : t))
    );

    const token = localStorage.getItem("token");
    axios
      .post(
        `${API_URL}/task/status/${taskId}`,
        { status: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .catch(() => {
        setTasks((prev) =>
          prev.map((t) => (t.taskId === taskId ? { ...t, status: currentStatus } : t))
        );
        toast.error("Gagal mengubah status tugas");
      });
  };

  const doneCount = tasks.filter((t) => t.status).length;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-950 dark:text-white">
        Daftar Tugas
      </h1>

      <TaskProgress done={doneCount} total={tasks.length} />

      {loading && (
        <div className="flex justify-center py-10">
          <ThreeDot />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {!loading && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.taskId} task={task} onToggleStatus={handleChangeStatus} />
          ))
        ) : !loading ? (
          <div className="text-gray-500 col-span-full">Tidak ada tugas tersedia.</div>
        ) : null}
      </div>

            <style>
        {`
          .animate-fade-in-up {
            animation: fadeInUp 0.3s ease;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
