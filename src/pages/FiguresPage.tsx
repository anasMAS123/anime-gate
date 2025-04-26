import ProductsCarousel from "@/components/ProductsCarousel";
import Spinner from "@/components/Spinner";
import { getFiguresRows } from "@/utils/supabaseQueries";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const FiguresPage = () => {
  //change the title
  useEffect(() => {
    document.title = "ANIME-GATE - FIGURES";
  }, []);
  const { data, isLoading, error } = useQuery({
    queryKey: ["t-shirts"],
    queryFn: () => getFiguresRows(),
  });
  return (
    <div className="pad-content min-h-[calc(100vh-100px)] bg-[var(--white-color)] relative ">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          "something went wrong"
        ) : (
          <div className="relative">
            <h2 className="absolute -left-[50px] -top-[120px] text-4xl lg:text-8xl">
              Figures
            </h2>

            <ProductsCarousel data={data?.products ?? null} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FiguresPage;
