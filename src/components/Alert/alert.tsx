import React from "react";

interface AlertCardProps {
  open: boolean;
  message: string | null;
  onClose: () => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ open, message, onClose }) => {
  if (!open || !message) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-fade-in-up min-w-[300px]">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Peringatan</h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">{message}</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;