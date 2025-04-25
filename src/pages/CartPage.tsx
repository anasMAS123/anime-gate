import CartElement from "@/components/CartElement";
import { useCart } from "@/context/Cart";
import { getProfileinfo, submitOrder } from "@/utils/supabaseQueries";
import { useSession } from "@clerk/clerk-react";
import { SignedInSessionResource } from "@clerk/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
export type OrderObject = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  address: string;
  purchaseList: {
    productName: string;
    orderQuantity: number;
    totalProductPrice: number;
  }[];
};
export type SessionType = SignedInSessionResource | null | undefined;
const CartPage = () => {
  const { session } = useSession();
  const { cart, setCart } = useCart();
  //get total cart price
  const overAllPrice = cart
    .map((element) => parseFloat(element.item.price) * element.orderQuantity)
    .reduce((acc, cur) => acc + cur, 0);

  //get user profile data
  const { data, error, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileinfo(session),
    enabled: !!session, //suuuuuuuuuuuuupeeeeeeeer important
  });
  const userInfo = data?.data[0];
  const orderObject: OrderObject = {
    firstName: userInfo?.first_name,
    lastName: userInfo?.last_name,
    email: userInfo?.email,
    phone: userInfo?.phone_number,
    address: userInfo?.address,
    purchaseList: cart.map((element, i) => {
      return {
        productName: element.item.name,
        orderQuantity: element.orderQuantity,
        totalProductPrice:
          element.orderQuantity * parseFloat(element.item.price),
      };
    }),
  };
  //mutation
  const mutation = useMutation({
    mutationFn: (orderObj: OrderObject) => submitOrder(session, orderObj),
    mutationKey: ["order"],
    onSuccess: () => {
      toast.success("The order has been sent successfully.");
      setCart([]);
    },
    onError: (error) => {
      toast.error("something went wrong please try again");
      toast.error("please complete your profile data");
      console.log(error.message);
    },
  });

  const handleOrder = () => {
    mutation.mutate(orderObject);
  };
  return (
    <div className="pad-content min-h-[calc(100vh-100px)] bg-[var(--white-color)] flex flex-col">
      <ul className="pt-[20px] flex flex-col gap-4">
        {cart.length > 0 ? (
          cart.map((element, i) => <CartElement element={element} key={i} />)
        ) : (
          <span className="text-4xl">there is no items in your cart .</span>
        )}
      </ul>
      {cart.length > 0 && (
        <>
          <span className="ml-auto text-xl mt-[30px]">
            Total:{overAllPrice} EG
          </span>
          <button
            onClick={handleOrder}
            className="ml-auto mt-[30px] text-2xl bg-[var(--sec-color)] text-white py-[18px] px-[25px] rounded-2xl cursor-pointer hover:bg-[var(--main-color)] transition all"
          >
            Buy
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
