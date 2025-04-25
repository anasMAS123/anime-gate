import { getUserCart, insertCart, newUserCart } from "@/utils/supabaseQueries";
import { useSession } from "@clerk/clerk-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
export type CartItem = {
  item: {
    [key: string]: string;
  };
  orderQuantity: number;
};
interface Props {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}
const Cart = createContext<Props | null>(null);

function CartProvider({ children }: { children: ReactElement }) {
  const { session } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [initialized, setInitialized] = useState(false);
  //create user cart for the first time
  const createCartMutation = useMutation({
    mutationFn: () => newUserCart(session),

    onSuccess: () => {
      setCart([]);
      setInitialized(true);
      toast.success("the cart is created successfully");
    },
  });
  //get the cart
  const { data, isLoading, error } = useQuery({
    queryKey: ["carts"],
    queryFn: () => getUserCart(session),
    enabled: !!session,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      return;
    }
    if (!session) return;
    //setting the cart for the first time
    if (!data?.data[0]?.cart) {
      createCartMutation.mutate();
    } else if (data?.data[0].cart && !isLoading && !initialized) {
      setCart(data.data[0].cart);
      toast.success("the cart has been loaded successfully");
      setInitialized(true);
    }
  }, [data, isLoading, session]);

  //mutation function which we use to update data
  const mutation = useMutation({
    mutationFn: (newCart: CartItem[]) => insertCart(session, newCart),
  });

  // run mutatuin function everytime the cart is change
  useEffect(() => {
    if (initialized && session) {
      mutation.mutate(cart);
      if (!mutation.error) toast.success("the cart is updated successfully");
      else {
        toast.error("the item is not added");
        setCart((cart) => cart.filter((item, i) => i !== cart.length - 1));
      }
    }
  }, [cart, initialized, session]);

  return <Cart.Provider value={{ cart, setCart }}>{children}</Cart.Provider>;
}

function useCart() {
  const context = useContext(Cart);
  if (!context) {
    throw new Error("that context is used out of its previlage");
  }
  return context;
}

export { CartProvider, useCart };
