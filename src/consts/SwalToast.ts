import Swal from "sweetalert2";

export const SwalToast = Swal.mixin({
    toast: true,
    position: 'top-end',
    customClass: {
      popup: 'colored-toast',
    },
    timer: 3000,
    timerProgressBar: true,
  })