import { CarouselItem } from "@/components/ui/carousel";
import { useCart } from "@/context/Cart";
import { useSession } from "@clerk/clerk-react";
import { toast } from "sonner";

interface Props {
  [key: string]: string;
}
const CarouselProductItem = ({ item }: { item: Props }) => {
  const { session } = useSession();
  const { id, name, image, anime, price, type, quantity } = item;
  const { cart, setCart } = useCart()!;
  return (
    <CarouselItem className=" sm:basis-full md:basis-1/2 lg:basis-1/3 ">
      <div className="h-[500px] flex flex-col justify-between">
        <div>
          <img src={image} alt={name} className="h-[300px]" />
          <h2>Name : {name}</h2>
          <h3>Type:{type}</h3>
          <h3>anime : {anime}</h3>
          <h3>price :{price} EG</h3>
        </div>
        <button
          onClick={() => {
            setCart((cart) => {
              const duplication: boolean = cart?.some(
                (cartItem) => cartItem.item?.id.toString() === id.toString()
              );
              if (duplication) return cart;
              return [...cart, { item, orderQuantity: 1 }];
            });
            toast.success("the item has been added to the cart");
          }}
          disabled={
            !session ||
            cart?.some(
              (cartItem) => cartItem.item?.id.toString() === id.toString()
            )
          }
          className={`${
            session && parseInt(quantity)
              ? cart?.some(
                  (cartItem) => cartItem.item?.id.toString() === id.toString()
                )
                ? "bg-gray-500"
                : "bg-[var(--sec-color)] cursor-pointer hover:bg-[var(--main-color)] transition-all"
              : "bg-gray-500"
          } text-[var(--white-color)] px-[4px] py-[2px] rounded-md`}
        >
          {session
            ? parseInt(quantity)
              ? cart?.some(
                  (cartItem) => cartItem.item?.id.toString() === id.toString()
                )
                ? "Added to the cart"
                : "Add to Cart"
              : "Out Of Stock!"
            : "sign in first"}
        </button>
      </div>
    </CarouselItem>
  );
};

export default CarouselProductItem;
