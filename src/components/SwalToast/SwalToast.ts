import Swal from "sweetalert2";

export const SwalToast = Swal.mixin({
  toast: true,
  position: "top-end",
  customClass: {
    popup: "colored-toast",
  },
  timer: 4000,
  timerProgressBar: true,
  showConfirmButton: false
});

export const SwalToastWithButtons = Swal.mixin({
  position: "center",
  customClass: {
    popup: "colored-toast",
  },
  reverseButtons: true,
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
