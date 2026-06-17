export function register() {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") return;
  if (!("serviceWorker" in navigator)) return;

  const script = document.createElement("script");
  script.src = "/register-sw.js";
  script.defer = true;
  document.head.appendChild(script);
}
