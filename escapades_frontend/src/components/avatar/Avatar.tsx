import { FC } from "react";
import classes from "./Avatar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface AvatarProps {
  url: string;
  onClick?: () => void;
}

const Avatar: FC<AvatarProps> = ({ url, onClick }) => {
  return url ? (
    <img className={classes.Avatar} src={url} onClick={onClick} />
  ) : (
    <div className={classes.DefaultImgContainer} onClick={onClick}>
      <FontAwesomeIcon icon={faUser} className={classes.DefaultImg} />
    </div>
  );
};

export default Avatar;
