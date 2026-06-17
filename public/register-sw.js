(function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", function onLoad() {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch(function onRegistrationError(error) {
        console.error("[PWA] Service worker registration failed:", error);
      });
  });
})();
