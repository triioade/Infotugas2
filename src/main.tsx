import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

import OneSignal from "onesignal-cordova-plugin";

const initOneSignal = () => {
  try {
    OneSignal.initialize("f523ed46-9a99-46f6-8e00-34123d09140f");

    OneSignal.Notifications.requestPermission(true).then((accepted: boolean) => {
      console.log("User accepted notifications:", accepted);
    });

    OneSignal.Notifications.addEventListener("click", (event: any) => {
      console.log("Notification opened:", event);
    });

    OneSignal.Notifications.addEventListener("foregroundWillDisplay", (event: any) => {
      console.log("Notification received in foreground:", event);
      // event.preventDefault();
    });

    console.log("✅ OneSignal initialized");
  } catch (err) {
  
  }
};

if ((window as any).Capacitor?.getPlatform?.() !== "web") {
  initOneSignal();
}

// Render React App
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <App />
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>
);

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/service-worker.js")

//   });
// }
