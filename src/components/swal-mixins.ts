import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark";
export const DefaultToast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
export const UpdateToast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: true,
  showCancelButton: true,
  confirmButtonColor: "green",
  confirmButtonText: "Update",
});
