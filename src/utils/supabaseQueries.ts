import { createClerkSupabaseClient } from "./supabaseClerkClient";
import { supabase } from "../../supabaseClient";
import { CartItem } from "@/context/Cart";
import { FormProps } from "@/pages/ProfilePage";
import { OrderObject, SessionType } from "@/pages/CartPage";
//create cart for the new users
export const newUserCart = async (session: SessionType) => {
  const client = createClerkSupabaseClient(session);
  const id = session?.user?.id;
  //be sure not to make duplication
  const { data: userCart, error: userCartError } = await client
    .from("carts")
    .select("cart")
    .eq("user_id", id);

  if (userCart && userCart?.length > 1) return;
  const { data, error } = await client
    .from("carts")
    .upsert([
      {
        user_id: id,
        cart: [],
        email: session?.user?.primaryEmailAddress?.emailAddress,
      },
    ])
    .select();
  if (error) throw new Error(error.message);

  console.log(data);

  return { data, error };
};
//get all rows
export const getAllRows = async (session: SessionType) => {
  if (!session) return;
  const { data: products, error } = await supabase.from("products").select("*");

  return { products, error };
};
//get all T-shirts rows
export const getTshirtsRows = async () => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("type", "t-shirt");

  return { products, error };
};
//get all Figures rows
export const getFiguresRows = async () => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("type", "figure");

  return { products, error };
};
//get  the cart
export const getUserCart = async (session: SessionType) => {
  const client = createClerkSupabaseClient(session);

  const { data, error } = await client.from("carts").select();

  if (error) throw new Error("something went wrong with profile data fetching");

  return { data, error };
};

// insert a cart

export const insertCart = async (session: SessionType, newCart: CartItem[]) => {
  const client = createClerkSupabaseClient(session);
  const id = session?.user?.id;
  const { data, error } = await client
    .from("carts")
    .update({ cart: newCart })
    .eq("user_id", id)
    .select();
  if (error) throw new Error("failed to update the cart");

  return data;
};
//get profile info
export const getProfileinfo = async (session: SessionType) => {
  const client = createClerkSupabaseClient(session);
  const id = session?.user?.id;

  const { data, error } = await client
    .from("carts")
    .select("first_name , last_name , email , phone_number , address")
    .eq("user_id", id);

  if (error) throw new Error("cannot fetch profile info");

  return { data, error };
};

//update profile info
export const updateInfo = async (
  session: SessionType,
  infoObject: FormProps
) => {
  const { firstName, lastName, email, phone, address } = infoObject;
  const client = createClerkSupabaseClient(session);
  const id = session?.user?.id;
  const { data, error } = await client
    .from("carts")
    .update({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phone,
      address,
    })
    .eq("user_id", id)
    .select();

  if (error) throw new Error("the profile data is not updated ");

  return { data, error };
};

// order your cart
export const submitOrder = async (
  session: SessionType,
  orderObj: OrderObject
) => {
  const client = createClerkSupabaseClient(session);
  const id = session?.user?.id;
  const { firstName, lastName, email, phone, address, purchaseList } = orderObj;
  const amounts = purchaseList.map((element) => {
    return {
      productName: element.productName,
      orderQuantity: element.orderQuantity,
    };
  });
  const productNames = amounts.map((element) => element.productName);

  const { data, error } = await client
    .from("orders")
    .insert([
      {
        user_id: id,
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phone,
        address,
        purchase_list: purchaseList,
        overAllPrice: purchaseList
          .map((element) => element.totalProductPrice)
          .reduce((acc, current) => acc + current, 0),
      },
    ])
    .select();

  if (error) throw new Error("the order is failed");

  // retrieve the ordered items columns
  const { data: targetedProducts, error: readingError } = await client
    .from("products")
    .select("name,quantity")
    .in("name", productNames);
  if (readingError) throw new Error("cannot retrieve from the database");

  //
  const finalObjectArray = targetedProducts.map((element, i) => {
    return {
      ...element,
      orderd: amounts.filter(
        (amountItem) => amountItem.productName === element.name
      )[0].orderQuantity,
    };
  });
  for (const item of finalObjectArray) {
    console.log(item.name);
    if (item.quantity < item.orderd)
      throw new Error(
        `${item.name} has ${item.quantity} in the stock while you order ${item.orderd}`
      );
    const { data: updatingTheDataBase, error: updatingError } = await client
      .from("products")
      .update({ quantity: item.quantity - item.orderd })
      .eq("name", item.name)
      .select();
    if (updatingError) throw new Error("error happened , updationg failed");
  }

  return { data, error };
};

//get my orders

export const myOrders = async (session: SessionType) => {
  const client = createClerkSupabaseClient(session);

  const { data: orders, error } = await client.from("orders").select("*");
  if (error) throw new Error(error.message);

  return { orders, error };
};
