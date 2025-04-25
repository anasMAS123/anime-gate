import { CartItem, useCart } from "@/context/Cart";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface Props {
  element: CartItem;
}

const CartElement = ({ element }: Props) => {
  const {
    item: { id, name, type, anime, image, price, quantity },
    orderQuantity,
  } = element;
  const { cart, setCart } = useCart();

  const IncreaseQuantity = () => {
    if (orderQuantity === parseInt(quantity)) {
      toast("cannot add more of this item right now .");
      return;
    }
    const newCart = cart.map((element) =>
      element.item.id === id
        ? {
            ...element,
            orderQuantity:
              orderQuantity < parseInt(quantity)
                ? orderQuantity + 1
                : orderQuantity,
          }
        : element
    );
    setCart(newCart);
  };
  const DecreaseQuantity = () => {
    if (orderQuantity === 1) return;
    const newCart = cart.map((element) =>
      element.item.id === id
        ? {
            ...element,
            orderQuantity:
              orderQuantity > 1 ? orderQuantity - 1 : orderQuantity,
          }
        : element
    );
    setCart(newCart);
  };

  const DeleteItem = () => {
    const newCart = cart.filter((element) => element.item.id !== id);
    setCart(newCart);
  };

  return (
    <li className="w-full h-[150px] border border-solid border-[var(--third-color)] flex gap-4 items-center overflow-hidden">
      <div>
        <img
          src={image}
          alt={name}
          className="h-full w-[150px] border-solid border-r border-[var(--third-color)]"
        />
      </div>
      <div className="flex flex-col gap-[1px] text-xl">
        <span>Name : {name}</span>
        <span>Type : {type}</span>
        <span>Anime : {anime}</span>
        <span>Total Price :{parseFloat(price) * orderQuantity}</span>
      </div>
      <div className="flex flex-col items-center gap-2 ml-auto  p-[6px]">
        <span>order quantity:</span>
        <div className="flex flex-row gap-2">
          <PlusCircle className="cursor-pointer" onClick={IncreaseQuantity} />
          {orderQuantity}
          <MinusCircle className="cursor-pointer" onClick={DecreaseQuantity} />
        </div>
        <span>Delete:</span>
        <Trash className="cursor-pointer" onClick={DeleteItem} />
      </div>
    </li>
  );
};

export default CartElement;
