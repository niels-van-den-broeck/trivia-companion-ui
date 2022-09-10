import { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (open) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
  }, [open]);

  return createPortal(
    <div className="modal">
      <button className="close" onClick={onClose}>
        x
      </button>
      {children}
    </div>,
    document.getElementById("modals") as HTMLElement
  );
}
