import { showToast } from "nextjs-toast-notify";

export const successToast = (message: string) => {
  showToast.success(message, {
    duration: 5000,
    position: "top-center",
    transition: "bounceIn",
    sound: true,
    progress: true,
  });
};

export const errorToast = (message: string) => {
  showToast.error(message, {
    duration: 5000,
    position: "top-center",
    transition: "bounceIn",
    sound: true,
    progress: true,
  });
};
