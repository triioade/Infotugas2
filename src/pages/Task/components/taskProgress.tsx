interface Props {
  done: number;
  total: number;
}

export default function TaskProgress({ done, total }: Props) {
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <>
      <h2 className="text-lg font-semibold flex justify-between">
        Progress
        <span className="text-sm text-blue-600">
          {done} dari {total} ({progress}%)
        </span>
      </h2>

      <div className="w-full bg-gray-200 h-2.5 rounded-full mb-6">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
}
