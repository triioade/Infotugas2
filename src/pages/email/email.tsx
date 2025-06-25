import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;

interface DecodedToken {
  username: string;
  role: string;
  fullname: string;
  prodi?: string[];
}

const schedule = [
  {
    kode: "22ILK0013",
    matkul: "ALGORITMA DAN PEMROGRAMAN I",
    dosen: "NURHASANAH",
    kelas: "01TPLE001",
    hari: "Sabtu",
    waktu: "07.40 - 09.20",
    ruang: "V.101",
    mulai: "3 Mar 2025",
    selesai: "25 Jul 2025",
  },
  {
    kode: "22PAM0052",
    matkul: "BASIC ACADEMIC ENGLISH",
    dosen: "DARMAWATI",
    kelas: "01TPLE001",
    hari: "Sabtu",
    waktu: "09.20 - 11.00",
    ruang: "V.101",
    mulai: "3 Mar 2025",
    selesai: "25 Jul 2025",
  },
  {
    kode: "22ILK0022",
    matkul: "PENGANTAR TEKNOLOGI INFORMASI",
    dosen: "MOCHAMAD ADHARI ADIGUNA",
    kelas: "01TPLE001",
    hari: "Sabtu",
    waktu: "11.00 - 13.50",
    ruang: "V.101",
    mulai: "3 Mar 2025",
    selesai: "25 Jul 2025",
  },
  {
    kode: "22TIF0013",
    matkul: "KALKULUS I",
    dosen: "DEDE HANDAYANI",
    kelas: "01TPLE001",
    hari: "Sabtu",
    waktu: "16.00 - 17.40",
    ruang: "V.101",
    mulai: "3 Mar 2025",
    selesai: "25 Jul 2025",
  },
  {
    kode: "22TIF0023",
    matkul: "LOGIKA INFORMATIKA",
    dosen: "MUNAWAROH",
    kelas: "01TPLE001",
    hari: "Sabtu",
    waktu: "07.40 - 09.20",
    ruang: "V.101",
    mulai: "3 Mar 2025",
    selesai: "25 Jul 2025",
  },
  {
    kode: "22PAM0022",
    matkul: "PENDIDIKAN PANCASILA",
    dosen: "MOHADIB",
    kelas: "01TPLE001",
    hari: "Sabtu",
    waktu: "09.20 - 11.00",
    ruang: "V.101",
    mulai: "3 Mar 2025",
    selesai: "25 Jul 2025",
  },
  {
    kode: "22TIF0033",
    matkul: "FISIKA DASAR",
    dosen: "TITA PUSPITASARI",
    kelas: "01TPLE001",
    hari: "Sabtu",
    waktu: "11.00 - 13.50",
    ruang: "V.101",
    mulai: "3 Mar 2025",
    selesai: "25 Jul 2025",
  },
  {
    kode: "22PAM0012",
    matkul: "PENDIDIKAN AGAMA",
    dosen: "SRI WAHYUNI",
    kelas: "01TPLE001",
    hari: "Sabtu",
    waktu: "13.50 - 15.30",
    ruang: "V.101",
    mulai: "3 Mar 2025",
    selesai: "25 Jul 2025",
  },
];

export default function ProfileAndSchedulePage() {
  const token = Cookies.get("token");
  const decoded: DecodedToken = token
    ? jwtDecode<DecodedToken>(token)
    : ({} as DecodedToken);

  const defaultEmail = Cookies.get("email") || "";
  const defaultNim = decoded?.username || "";

  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [nim] = useState(defaultNim);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!email) {
      setMessage({ type: "error", text: "Email tidak boleh kosong." });
      return;
    }
    if (!validateEmail(email)) {
      setMessage({ type: "error", text: "Format email tidak valid." });
      return;
    }
    setLoading(true);
    try {
      console.log("URL API:", `${API_URL}/auth/update_email`);

      await axios.put(
        `${API_URL}/auth/update_email`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage({ type: "success", text: "Email berhasil diperbarui!" });
      Cookies.set("email", email);
      setEmail("");
      setShowChangeEmail(false);
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Gagal memperbarui email.",
      });
    }
    setLoading(false);
  };

  const getProdiName = (prodiCode: string) => {
    const mapping: Record<string, string> = {
      "55201": "Teknik Informatika",
    };
    return mapping[prodiCode] || prodiCode;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-950 dark:text-white animate-fade-in-up">
        Profil dan Jadwal
      </h1>

      {/* Profil */}
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-6 mb-10 animate-fade-in-up">
        <h2 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-300">
          Profil Mahasiswa
        </h2>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>NIM:</strong> {decoded.username}
          </p>
          <p>
            <strong>Nama Lengkap:</strong> {decoded.fullname}
          </p>
          <p>
            <strong>Prodi:</strong> {getProdiName(decoded.prodi?.[0] || "")}
          </p>
          <p>
            <strong>Role:</strong> {decoded.role}
          </p>
        </div>

        <button
          onClick={() => setShowChangeEmail(!showChangeEmail)}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          {showChangeEmail ? "Tutup Form Ubah Email" : "Ubah Email Notifikasi"}
        </button>

        {showChangeEmail && (
          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-4 animate-fade-in-up"
          >
            <div></div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Baru
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                placeholder="contoh@email.com"
              />
            </div>
            {message && (
              <div
                className={`text-sm rounded px-3 py-2 ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-200 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Mengirim..." : "Perbarui Email"}
            </button>
          </form>
        )}
      </div>

      {/* Jadwal */}
      <div className="animate-fade-in-up">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Jadwal Kuliah
        </h2>
        <div className="overflow-auto rounded shadow border border-gray-300 dark:border-gray-600">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-2 border">Kode</th>
                <th className="p-2 border">Mata Kuliah</th>
                <th className="p-2 border hidden md:table-cell">Dosen</th>
                <th className="p-2 border hidden md:table-cell">Kelas</th>
                <th className="p-2 border hidden md:table-cell">Hari</th>
                <th className="p-2 border ">Waktu</th>
                <th className="p-2 border hidden md:table-cell">Ruang</th>
                <th className="p-2 border hidden md:table-cell">Tanggal</th>
              </tr>
            </thead>

            <tbody>
              {schedule.map((item, index) => (
                <tr key={index} className="border-t dark:border-gray-700">
                  <td className="p-2 border">{item.kode}</td>
                  <td className="p-2 border">{item.matkul}</td>
                  <td className="p-2 border hidden md:table-cell">
                    {item.dosen}
                  </td>
                  <td className="p-2 border hidden md:table-cell">
                    {item.kelas}
                  </td>
                  <td className="p-2 border hidden md:table-cell">
                    {item.hari}
                  </td>
                  <td className="p-2 border ">
                    {item.waktu}
                  </td>
                  <td className="p-2 border hidden md:table-cell">
                    {item.ruang}
                  </td>
                  <td className="p-2 border hidden md:table-cell">
                    {item.mulai} - {item.selesai}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
