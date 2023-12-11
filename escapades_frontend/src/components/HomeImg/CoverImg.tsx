import { FC } from "react";
import classes from "./CoverCard.module.scss";

type CoverCardProps = {
  url: string;
  text: string;
};

const CoverCard: FC<CoverCardProps> = ({ url, text }) => {
  return (
    <>
      <div className={classes.imgContainer} style={{ backgroundImage: url }}>
        <h1 className={classes.imgContainer__title}>{text}</h1>
      </div>
    </>
  );
};

export default CoverCard;
