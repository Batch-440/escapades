import CoverCard from "@/components/HomeImg/CoverImg";
import home from "@/assets/home.jpg";

const Home = () => {
  return (
    <>
      <CoverCard
        url={`url(${home})`}
        text={"Your next trip is waiting for you"}
      />
    </>
  );
};

export default Home;
