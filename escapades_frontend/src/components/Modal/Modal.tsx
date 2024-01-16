import classes from "./Modal.module.scss";
import { FC, useEffect, useRef, useState } from "react";

interface ModalProps {
  title: string;
  description: string;
  setIsOpen: (a: boolean) => void;
  onConfirm: () => void;
  isOpen: boolean;
}

const Modal: FC<ModalProps> = ({
  setIsOpen,
  onConfirm,
  title,
  description,
  isOpen,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setModalVisible(true);
    } else {
      const timeout = setTimeout(() => {
        setModalVisible(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!modalVisible) {
      const timeout = setTimeout(() => {
        setIsOpen(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [modalVisible, setIsOpen]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModalVisible(false);
    }
  };

  return (
    <div className={classes.backgroundGrey} onClick={handleOverlayClick}>
      <div
        className={`${classes.Modal} ${
          modalVisible ? classes.Modal__open : ""
        }`}
        ref={modalRef}
      >
        <h1 className={classes.Modal__title}>{title}</h1>
        <h2 className={classes.Modal__subtitle}>{description}</h2>
        <div className={classes.Modal__buttons}>
          <button
            className={classes.Modal__buttons__buttonCancel}
            onClick={() => setModalVisible(false)}
          >
            No
          </button>
          <button
            className={classes.Modal__buttons__buttonConfirm}
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
