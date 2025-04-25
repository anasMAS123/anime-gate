import Gallary from "@/components/Gallary";
import { ArrowDown } from "lucide-react";
import { NavLink } from "react-router";

const HomePage = () => {
  return (
    <div className="pad-content min-h-[calc(100vh-100px)] bg-[var(--white-color)]">
      <div className=" pt-[50px] flex flex-col lg:flex-row  justify-between items-center max-lg:gap-12 ">
        <span className="text-center lg:text-left text-6xl font-medium sm:w-[400px] md:w-[600px] lg:w-[800px] bg-[var(--main-color)] p-4 rounded-xl">
          This is{" "}
          <span className="text-[var(--sec-color)] shadow-2xl  tracking-wide">
            Anime-Gate
          </span>{" "}
          , your Gate for all anime products that you want . We have T-shirts
          ,figures and more , you can see our products by going to{" "}
          <span className="relative">
            <span className="underline text-[var(--third-color)] group">
              <NavLink to="/products">
                OurProducts{" "}
                <ArrowDown className="w-[50px] h-[50px] inline group-hover:animate-[var(--animate-custom-arrow)] " />
              </NavLink>
            </span>
          </span>
        </span>
        <div className="relative">
          <Gallary />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
