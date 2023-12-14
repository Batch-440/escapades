import { FC } from "react";
import classes from "./HomeBanner.module.scss";

interface HomeBannerProps {
  imageUrl: string;
  text: string;
}

const HomeBanner: FC<HomeBannerProps> = ({ imageUrl, text }) => {
  return (
    <div className={classes.HomeBanner} style={{ backgroundImage: imageUrl }}>
      <h1 className={classes.HomeBanner__title}>{text}</h1>
    </div>
  );
};

export default HomeBanner;
