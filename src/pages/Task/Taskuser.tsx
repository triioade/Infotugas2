import { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDot } from "react-loading-indicators";
import { parseISO, differenceInMilliseconds } from "date-fns";
import toast from "react-hot-toast";
import PullToRefresh from "pulltorefreshjs";
import { App } from "@capacitor/app";
import type { PluginListenerHandle } from "@capacitor/core";

interface Task {
  taskId: string;
  title: string;
  matkul: string;
  link: string;
  deadline: string;
  status: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

// helper task doble / dupe
const dedupeTasks = (tasks: Task[]): Task[] => {
  const map = new Map<string, Task>();

  tasks.forEach((task) => {
    if (map.has(task.taskId)) {
      console.warn("⚠️ Duplicate task detected:", task.taskId);
    }
    map.set(task.taskId, task);
  });

  return Array.from(map.values());
};

// Komponen Countdown
function Countdown({ deadline }: { deadline: string }) {
  const [timeLeft, setTimeLeft] = useState(
    differenceInMilliseconds(parseISO(deadline), new Date())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(differenceInMilliseconds(parseISO(deadline), new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  if (timeLeft <= 0) {
    return <span className="text-red-500 text-xs">Deadline passed</span>;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <span className="text-xs text-red-600">
      {days}d {hours}h {minutes}m {seconds}s left
    </span>
  );
}

export default function TaskPage() {
  useEffect(() => {
    const msg = localStorage.getItem("loginSuccess");
    const fullname = localStorage.getItem("fullname");
    if (msg && fullname) {
      toast.success(`Login Berhasil, Hai ${fullname}👋`, {
        id: "login-success",
        style: {
          background: "var(--color-brand-500, #2563eb)",
          color: "#fff",
          borderRadius: "0.75rem",
          fontWeight: 500,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "280px",
        },
        iconTheme: {
          primary: "var(--color-brand-500, #2563eb)",
          secondary: "#fff",
        },
        className: "dark:bg-brand-500 dark:text-white",
      });

      localStorage.removeItem("loginSuccess");
    }
  }, []);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchTasks(token);
    }
  }, []);

  const CACHE_KEY = "cachedTasks";
  const CACHE_TIME_KEY = "cachedTime";
  const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

const fetchTasks = async (token: string) => {
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    const now = Date.now();
    let initialDataShown = false;


    if (
      cachedData &&
      cachedTime &&
      now - Number(cachedTime) < CACHE_DURATION
    ) {
      setTasks(dedupeTasks(JSON.parse(cachedData)));
      initialDataShown = true;
    } else {
      setLoading(true);
    }

    const res = await axios.get(`${API_URL}/task`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const rawData = res.data.data || [];
    const newData = dedupeTasks(rawData);

    const oldData = cachedData ? JSON.parse(cachedData) : [];
    const isDifferent =
      JSON.stringify(newData) !== JSON.stringify(oldData);


    if (isDifferent) {
      console.log("✅ Data Berubah");

      if (initialDataShown) setTasks([]);
      setLoading(true);

      setTimeout(() => {
        setTasks(newData);
        setLoading(false);
      }, 700);


      localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    } 

    else {
      console.log(" Data Tidak Berubah");

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
      toast.error("Gagal memuat daftar tugas", { id: "fetch-error" });
    }

    const fallback = localStorage.getItem(CACHE_KEY);
    if (fallback) setTasks(dedupeTasks(JSON.parse(fallback)));
    else setTasks([]);

    setLoading(false);
  }
};


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
    let listenerHandle: PluginListenerHandle;

    const setupListener = async () => {
      listenerHandle = await App.addListener("resume", () => {
        console.log("App resumed");
        const token = localStorage.getItem("token");
        if (token) fetchTasks(token);
      });
    };

    setupListener();

    return () => {
      if (listenerHandle) listenerHandle.remove();
    };
  }, []);

  const handleChangeStatus = (taskId: string, currentStatus: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.taskId === taskId ? { ...task, status: !currentStatus } : task
      )
    );

    const token = localStorage.getItem("token");
    axios
      .post(
        `${API_URL}/task/status/${taskId}`,
        { status: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .catch((err: any) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.taskId === taskId ? { ...task, status: currentStatus } : task
          )
        );

        if (err.response?.status === 401) {
          toast.error("Sesi login berakhir, silakan login ulang", {
            id: "token-expired",
          });
          localStorage.removeItem("token");
        } else {
          toast.error("Gagal mengubah status tugas", {
            id: "status-error",
          });
        }
      });
  };

  const doneCount = tasks.filter((t) => t.status).length;
  const progress =
    tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-950 dark:text-white">
        Daftar Tugas
      </h1>

      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex justify-between items-center">
        Progress
        <span className="text-sm text-blue-600">
          {doneCount} dari {tasks.length} tugas selesai ({progress}%)
        </span>
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <ThreeDot
            color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]}
            text="LOADING"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {!loading && tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.taskId}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-5 flex flex-col gap-2 animate-fade-in-up"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                  {task.matkul}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Deadline:{" "}
                  {new Date(task.deadline).toLocaleDateString("id-ID", {
                    timeZone: "UTC",
                  })}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {task.title}
              </h3>
              <a
                href={task.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline break-all text-sm"
              >
                {task.link}
              </a>
              <div className="flex justify-between  items-center mt-2">
                <Countdown deadline={task.deadline} />
              </div>
              <div className="mt-3 grid">
                <button
                  className={`px-3 py-2 w-full rounded text-xs font-semibold transition-all duration-200 ${
                    task.status
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={() => handleChangeStatus(task.taskId, task.status)}
                >
                  {task.status ? "Sudah Dikerjakan" : "Tandai Selesai"}
                </button>
              </div>
            </div>
          ))
        ) : !loading ? (
          <div className="text-gray-500 dark:text-gray-400 col-span-full">
            Tidak ada tugas tersedia.
          </div>
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
