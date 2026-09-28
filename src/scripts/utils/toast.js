import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
  duration: 2500,
  position: { x: "right", y: "bottom" },
  ripple: false,
  dismissible: true,
  types: [
    {
      type: "success",
      background: "#16a34a",
    },
    {
      type: "info",
      background: "#2563eb",
      icon: false,
    },
    {
      type: "error",
      background: "#dc2626",
      duration: 4000,
    },
  ],
});

//Fungsi untuk menampilkan toast sukses
export function showSuccess(message) {
  notyf.success(message);
}

//Fungsi untuk menampilkan toast informasi
export function showInfo(message) {
  notyf.open({ type: "info", message });
}

//Fungsi untuk menampilkan toast error
export function showError(message) {
  notyf.error(message);
}
