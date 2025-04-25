import OrderItem from "@/components/OrderItem";
import Spinner from "@/components/Spinner";
import { myOrders } from "@/utils/supabaseQueries";
import { useSession } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

const HistoryPage = () => {
  const { session } = useSession();
  const { data, error, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => myOrders(session),
    enabled: !!session,
  });
  console.log(data);

  return (
    <div className="pad-content min-h-[calc(100vh-100px)] bg-[var(--white-color)] flex flex-col py-10 ">
      {isLoading ? (
        <div className="flex justify-center items-center h-[calc(100vh-100px)]">
          <Spinner />
        </div>
      ) : (
        <>
          <p className="text-center text-4xl">Your Purchase History</p>
          <ul className="mt-[50px] flex flex-col-reverse gap-6 justify-center items-center ">
            {data?.orders?.map((item, i) => (
              <OrderItem key={i} data={item} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default HistoryPage;
