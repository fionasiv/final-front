import Swal from "sweetalert2";

export const SwalToast = Swal.mixin({
  toast: true,
  position: "top-end",
  customClass: {
    popup: "colored-toast",
  },
  timer: 3000,
  timerProgressBar: true,
});

export const SwalToastWithButtons = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: true,
  showCancelButton: true,
  confirmButtonColor: "#36ad38",
  cancelButtonColor: "#d33",
  confirmButtonText: "כן",
  cancelButtonText: "לא",
});

export const SwalToastWithoutTimer = Swal.mixin({
  toast: true,
  position: "top-end",
  customClass: {
    popup: "colored-toast",
  },
  timerProgressBar: false,
});