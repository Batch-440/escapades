import classes from "./Modal.module.scss";
import { FC } from "react";

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
  return (
    <div className={classes.backgroundGrey}>
      <div className={`${classes.Modal} ${isOpen ? classes.Modal__open : ""}`}>
        <h1 className={classes.Modal__title}>{title}</h1>
        <h2 className={classes.Modal__subtitle}>{description}</h2>
        <div className={classes.Modal__buttons}>
          <button
            className={classes.Modal__buttons__buttonCancel}
            onClick={() => setIsOpen(false)}
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
