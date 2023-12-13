import CoverCard from "@/components/HomeBanner/HomeBanner";
import home from "@/assets/home.jpg";

const Home = () => {
  return (
    <>
      <CoverCard
        imageUrl={`url(${home})`}
        text={"Your next trip is waiting for you"}
      />
    </>
  );
};

export default Home;
