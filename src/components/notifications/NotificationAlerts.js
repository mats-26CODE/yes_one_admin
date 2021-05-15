import toast, { useToasterStore } from "react-hot-toast";

//-> toast notification
export const notifySuccess = () =>
  toast("Yay, Updated Successfully!", {
    icon: "👏",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
export const notifyError = () =>
  toast("Oh no!, Update Failed!", {
    icon: "😔",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });

export const notifyMissingName = () =>
  toast("Oh no! Enter a full name", {
    icon: "⚠️",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });

export const notifyDynamicError = ({ message }) =>
  toast(`${message}`, {
    icon: "😔",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });

export const notifyDynamicSuccess = ({ message }) =>
  toast(`${message}`, {
    icon: "👏",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });

export const notifyingLoading = ({message}) =>
  toast.promise({
    // message: `${message}`,
    loading: 'Saving.....',
    success: <b>Settings saved!</b>,
    error: <b>Could not save.</b>,
  });
