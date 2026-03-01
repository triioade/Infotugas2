"use client";
import { useState } from "react";

const absenData = [
  { no: 1, nim: "241011450455", nama: "ADITYA PRATAMA PUTRA" },
  { no: 2, nim: "241011450420", nama: "AFRIZAL FAIZ DWIYANTORO" },
  { no: 3, nim: "241011450589", nama: "AMANDA SALSABILA" },
  { no: 4, nim: "241011450178", nama: "AMIN UDIN" },
  { no: 5, nim: "241011450409", nama: "ANANDA LUKMAN RAMADHAN" },
  { no: 6, nim: "241011450218", nama: "ARYA DEWA TILAGA" },
  { no: 7, nim: "241011450011", nama: "BAYU PANJIBUWONO" },
  { no: 8, nim: "241011450468", nama: "BAYU SAPUTRA" },
  { no: 9, nim: "231011450736", nama: "DALPA KHOIRUN NISA" },
  { no: 10, nim: "241011403016", nama: "DESVIONA NURFATWA" },
  { no: 11, nim: "241011450655", nama: "DWI KURNIASIH" },
  { no: 12, nim: "241011450372", nama: "FAAYAKHUN RAMADHAN" },
  { no: 13, nim: "241011450224", nama: "GUGUN BAHTIAR" },
  { no: 14, nim: "241011450012", nama: "HADFINA SYAHIDA" },
  { no: 15, nim: "241011450249", nama: "INAS CAHYANINGSIH" },
  { no: 16, nim: "241011450008", nama: "MUHAMMAD NAUFAL QUSHOYYI RUSDIYANTO" },
  { no: 17, nim: "241011450614", nama: "MUHAMMAD RAYHAN FADLAN FAHREZI" },
  { no: 18, nim: "241011450208", nama: "NANDINI ANGGRAENI" },
  { no: 19, nim: "241011450259", nama: "RAFLI ALDIANSYAH MORA" },
  { no: 20, nim: "241011450007", nama: "RIKA AMELIA" },
  { no: 21, nim: "241011450677", nama: "RINANGKU DUAN LINGGAR SUWANDI" },
  { no: 22, nim: "241011450598", nama: "RIZKY ALIYUDIN" },
  { no: 23, nim: "241011450381", nama: "RIZKY MAULANA PUTRA" },
  { no: 24, nim: "241011450354", nama: "SALMAN HABIB SIDIK" },
  { no: 25, nim: "241011450009", nama: "SHERLI MARSELINA" },
  { no: 26, nim: "241011450239", nama: "SOPIAN HENDRAWAN" },
  { no: 27, nim: "241011450004", nama: "TRIO ADE PAMUNGKAS" },
  { no: 28, nim: "241011450305", nama: "ZULFI RAMDZANI" },
];

const revisiData = [

  { no: 1, nim: "221011400661", nama: "DYADRA TSAAFIEK PINDHO RESI", matkul: "Statistika" },
  { no: 2, nim: "221011400916", nama: "FIRMAN ABADI LAIA", matkul: "Statistika" },
  { no: 3, nim: "221011401308", nama: "KEIMAL REYYAN PUTRATAMA AZSA", matkul: "Statistika" },
  { no: 4, nim: "221011400035", nama: "RAFLY RAMANDHA KUSUMA", matkul: "Statistika" },

  { no: 5, nim: "221011400237", nama: "RAFI BASTHARA", matkul: "Aljabar Linear" },
  { no: 6, nim: "201011401848", nama: "YANUAR LUTHFI", matkul: "Aljabar Linear" },

  { no: 7, nim: "221011400656", nama: "ARYA ZAHRAN ZIDUHU", matkul: "Struktur Data" },
  { no: 8, nim: "211011450107", nama: "TEGUH RIYANTO", matkul: "Struktur Data" },
  { no: 9, nim: "221011402201", nama: "ZULIANDRA RAHMAN", matkul: "Struktur Data" },

  
  { no: 10, nim: "221011401973", nama: "DANIEL ALVIN FAGA STEVANUS", matkul: "Algoritma & Pemrograman" },
  { no: 11, nim: "221011400632", nama: "MUHAMMAD BARA AKSAYETH", matkul: "Algoritma & Pemrograman" },
  { no: 12, nim: "221011402685", nama: "RAHMAT SODIKIN", matkul: "Algoritma & Pemrograman" },
  { no: 13, nim: "221011400633", nama: "TITO SHADAM FATWIANDIKA HUSEIN", matkul: "Algoritma & Pemrograman" },

 
  { no: 14, nim: "211011401945", nama: "MUHAMMAD IKHWAN SUPARMAN", matkul: "Jaringan Komputer" },
  { no: 15, nim: "221011402777", nama: "RESTU AJI", matkul: "Jaringan Komputer" },
  { no: 16, nim: "211011450088", nama: "ROBBY AZUKRUF", matkul: "Jaringan Komputer" },
  { no: 17, nim: "211011450063", nama: "SHAFLY FAWWAZ FADHLULLAH", matkul: "Jaringan Komputer" },

  { no: 18, nim: "221011401148", nama: "DZIKRI ATTARIQ SAMAYAKI", matkul: "Sistem Berkas" },
  { no: 19, nim: "221011402032", nama: "MUHAMMAD RAMZY", matkul: "Sistem Berkas" },

];

export default function AbsenPage() {
  const [activeTab, setActiveTab] = useState<"absen" | "revisi">("absen");

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-950 dark:text-white animate-fade-in-up">
        Halaman Absen
      </h1>

        {/* switch */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("absen")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === "absen"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          Daftar Absen
        </button>
        <button
          onClick={() => setActiveTab("revisi")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === "revisi"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          Daftar Revisi
        </button>
      </div>

      {/* mahasiswa ori*/}
      {activeTab === "absen" && (
        <div className="animate-fade-in-up overflow-auto rounded shadow border border-gray-300 dark:border-gray-600 max-w-3xl ml-0">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-2 border">No</th>
                <th className="p-2 border">NIM</th>
                <th className="p-2 border">Nama</th>
              </tr>
            </thead>
            <tbody>
              {absenData.map((mhs) => (
                <tr
                  key={mhs.nim}
                  className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-2 border">{mhs.no}</td>
                  <td className="p-2 border">{mhs.nim}</td>
                  <td className="p-2 border">{mhs.nama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* revisi */}
      {activeTab === "revisi" && (
        <div className="animate-fade-in-up overflow-auto rounded shadow border border-gray-300 dark:border-gray-600 max-w-3xl ml-0">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-2 border">No</th>
                <th className="p-2 border">NIM</th>
                <th className="p-2 border">Nama</th>
                        <th className="p-2 border">Matkul revisi</th>
              </tr>
            </thead>
            <tbody>
              {revisiData.map((rev) => (
                <tr
                  key={rev.nim}
                  className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-2 border">{rev.no}</td>
                  <td className="p-2 border">{rev.nim}</td>
                  <td className="p-2 border">{rev.nama}</td>
                  <td className="p-2 border">{rev.matkul}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
