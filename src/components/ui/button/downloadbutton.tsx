import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";

const DownloadButton: React.FC = () => {
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop" | "other">("other");
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) setPlatform("ios");
    else if (/android/.test(ua)) setPlatform("android");
    else if (/win|mac|linux/.test(ua)) setPlatform("desktop");

    // cek apakah PWA sudah terinstal
    const checkStandalone = () =>
      (window.matchMedia("(display-mode: standalone)").matches) ||
      (window.navigator as any).standalone === true;

    if (checkStandalone()) {
      setIsInstalled(true);
    }
  }, []);

  const handleClick = () => {
    if (platform === "ios" && !isInstalled) {
      alert("👉 Tambahkan ke Home Screen melalui Safari untuk instalasi PWA.");
    } else if (platform === "android") {
      window.location.href = "https://drive.google.com/drive/folders/1Ai_y8tIV8YdaOd7okWZa_IhpPJ0hyx6d"; 
    } else if (platform === "desktop") {
      alert("🌐 Gunakan versi web di browser desktop.");
    }
  };

  // sembunyikan tombol di desktop
  if (platform === "desktop" || platform === "other") return null;

  return (
    <button
      onClick={handleClick}
      disabled={platform === "ios" && isInstalled}
      className={`
        flex items-center gap-3 px-3 py-2 font-medium rounded-lg text-theme-sm
        transition-colors
        ${isInstalled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"}
      `}
    >
      <Download
        size={20}
        className={`fill-gray-500 transition-colors
          ${isInstalled
            ? "opacity-50"
            : "group-hover:fill-gray-700 dark:group-hover:fill-gray-300"}`}
      />
      {platform === "android" && "Download APK"}
      {platform === "ios" && (isInstalled ? "Installed" : "Install via Safari")}
    </button>
  );
};

export default DownloadButton;
