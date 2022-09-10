import { useEffect } from "react";
import { createPortal } from "react-dom";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ModalProps = {
  open: boolean;
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
  title: string;
};

export default function Modal({ open, title, onClose, children }: ModalProps) {
  useEffect(() => {
    if (open) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
  }, [open]);

  return createPortal(
    <div className="modal">
      <button className="close" onClick={onClose}>
        <FontAwesomeIcon
          icon={faClose}
          width={50}
          height={50}
          accentHeight={50}
        />
      </button>
      <h2>{title}</h2>
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById("modals") as HTMLElement
  );
}
