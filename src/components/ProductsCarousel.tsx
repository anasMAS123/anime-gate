import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarouselProductItem from "./CarouselProductItem";
export interface Product {
  [key: string]: string;
}
export type Props = Product[] | null;
const ProductsCarousel = ({ data }: { data: Props }) => {
  return (
    <Carousel
      className=" mt-[30px]"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="w-[300px] md:w-[650px] lg:w-[800px]">
        {data?.map((item, i) => (
          <CarouselProductItem key={i} item={item} />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProductsCarousel;
