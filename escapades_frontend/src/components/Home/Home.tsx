import classes from "./Home.module.scss";
import home from "../../assets/home.jpg"

export default function Home() {
  return (
    <div>
      <img className={classes.HomeImg} src={home}></img>
      <h1 className={classes.MainTitle}>Your next trip is waiting for you</h1>
    </div>
  )
}
