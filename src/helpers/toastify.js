import { toast, Bounce } from "react-toastify";
import "../styles/toastStyles.css";
export const success = (message) => {
  toast.success(message, {
    className: "custom-toast-container",
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
