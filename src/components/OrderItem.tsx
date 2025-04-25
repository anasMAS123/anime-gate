interface Props {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  purchase_list: {
    productName: string;
    orderQuantity: number;
  }[];
  overAllPrice: number;
  status: string;
  created_at: Date;
}
const OrderItem = ({ data }: { data: Props }) => {
  const {
    id,
    user_id: userId,
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phone,
    address,
    purchase_list: purchaseList,
    overAllPrice,
    status,
    created_at: createAt,
  } = data;
  return (
    <div className="w-[80%] max-sm:h-[600px] sm:h-[400px] border-2 border-solid border-[var(--sec-color)] rounded-xl p-6 flex flex-col gap-2 text-xl">
      <span className="">Name : {`${firstName} ${lastName}`}</span>
      <span>Email : {email}</span>
      <span>Active Phone Number : {phone}</span>
      <span>Current Address : {address}</span>
      <span>You orderd at {new Date(createAt).toLocaleString()}</span>
      <span>
        current status :{" "}
        <span className="text-[var(--white-color)] bg-[var(--sec-color)] px-1 py-1 rounded-lg animate-pulse">
          {status}...
        </span>
      </span>
      <ul>
        <span className="font-bold">Order:</span>
        {purchaseList.map((item, i) => (
          <li key={i} className="font-semibold">
            {item.productName} X {item.orderQuantity}
          </li>
        ))}
      </ul>
      <span className="mt-auto font-bold">
        The total price : {overAllPrice} EG
      </span>
    </div>
  );
};

export default OrderItem;
