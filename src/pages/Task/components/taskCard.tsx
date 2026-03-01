import { Task } from "../types";
import Countdown from "../components/countdown";

interface Props {
  task: Task;
  onToggleStatus: (id: string, status: boolean) => void;
}

export default function TaskCard({ task, onToggleStatus }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-5 shadow">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold text-blue-600">
          {task.matkul}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(task.deadline).toLocaleDateString("id-ID")}
        </span>
      </div>

      <h3 className="font-bold">{task.title}</h3>

      <a
        href={task.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 text-sm break-all"
      >
        {task.link}
      </a>

      <div className="mt-2">
        <Countdown deadline={task.deadline} />
      </div>

      <button
        className={`mt-3 w-full py-2 rounded text-xs font-semibold ${
          task.status
            ? "bg-green-500 text-white"
            : "bg-gray-300 hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => onToggleStatus(task.taskId, task.status)}
      >
        {task.status ? "Sudah Dikerjakan" : "Tandai Selesai"}
      </button>
    </div>
  );
}
