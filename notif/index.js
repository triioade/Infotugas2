import axios from "axios";
import OneSignal from "onesignal-node";

// 1. Config OneSignal
const client = new OneSignal.Client(
  process.env.ONESIGNAL_APP_ID,
  process.env.ONESIGNAL_API_KEY
);

// 2. Simpan ID tugas terakhir
let lastTaskId = null;

// 3. Fungsi cek API dosen
async function checkTasks() {
  try {
    const res = await axios.get("https://url-api-dosen.com/tasks");
    const tasks = res.data;

    if (!Array.isArray(tasks) || tasks.length === 0) {
      console.log("Tidak ada tugas.");
      return;
    }

    const latestTask = tasks[0]; // anggap data terbaru ada di index 0

    if (lastTaskId !== latestTask.taskId) {
      lastTaskId = latestTask.taskId;

      console.log("Tugas baru terdeteksi:", latestTask.title);

      // Kirim notif ke OneSignal
      await client.createNotification({
        contents: { en: `Tugas baru: ${latestTask.title}` },
        included_segments: ["All"] // kirim ke semua user
      });

      console.log("Notifikasi terkirim!");
    }
  } catch (err) {
    console.error("Error cek API:", err.message);
  }
}

// 4. Jalankan setiap 1 menit
setInterval(checkTasks, 60 * 1000);
console.log("Polling service berjalan...");
    