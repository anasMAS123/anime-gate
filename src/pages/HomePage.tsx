import Gallary from "@/components/Gallary";
import { useEffect } from "react";

const HomePage = () => {
  //change the title
  useEffect(() => {
    document.title = "ANIME-GATE - HOME";
  }, []);
  return (
    <div className="pad-content min-h-[calc(100vh-100px)] bg-[var(--white-color)]">
      <div className=" pt-[50px] flex flex-col lg:flex-row  justify-between items-center max-lg:gap-12 lg:gap-16  ">
        <span className="text-center lg:text-left text-6xl font-medium sm:w-[400px] md:w-[600px] lg:w-[800px] bg-[var(--main-color)] p-4 rounded-xl">
          This is{" "}
          <span className="text-[var(--sec-color)] shadow-2xl  tracking-wide">
            Anime-Gate
          </span>{" "}
          , your Gate for all anime products that you want . We have
          high-quality T-shirts ,awesome figures , Fast shipping and perfect
          gifts !
        </span>
        <div className="relative">
          <Gallary />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
