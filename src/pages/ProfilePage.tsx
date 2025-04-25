import { getProfileinfo, updateInfo } from "@/utils/supabaseQueries";
import { useSession, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
export interface FormProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  address: string;
}
const ProfilePage = () => {
  const queryClient = useQueryClient();
  const { session } = useSession();
  //get user email
  const { user } = useUser();
  const userEmailAddress: string =
    user?.primaryEmailAddress?.emailAddress ?? "";
  console.log(userEmailAddress);
  //using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormProps>();
  //get user profile data
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileinfo(session),
    enabled: !!session, //suuuuuuuuuuuuupeeeeeeeer important
  });

  useEffect(() => {
    if (!isLoading && data?.data[0]?.first_name) {
      const { first_name, last_name, phone_number, address, email } =
        data?.data[0] ?? {};
      setValue("firstName", first_name);
      setValue("lastName", last_name);
      setValue("phone", phone_number);
      setValue("address", address);
      setValue("email", userEmailAddress);
    }
  }, [isLoading, data, setValue, userEmailAddress]);

  // useMutation
  const mutation = useMutation({
    mutationFn: (profileData: FormProps) => updateInfo(session, profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("the data is updated successfully");
    },
    onError: () => {
      toast.error("the profile data is not updated");
    },
  });

  //submit the form
  const submitTheForm: SubmitHandler<FormProps> = (profileData: FormProps) => {
    mutation.mutate(profileData);
  };

  return (
    <div className="pad-content min-h-[calc(100vh-100px)] bg-[var(--white-color)] relative ">
      <form
        onSubmit={handleSubmit(submitTheForm)}
        className="w-[70%] mx-auto py-[60px] flex flex-col"
      >
        <h2 className="text-3xl py-[20px]">Profile Information </h2>
        <h3 className="text-xl py-[20px]">
          this information is used to contact you and deliver your order{" "}
        </h3>
        <div className="flex flex-row gap-[8px]">
          <div className="flex flex-col gap-[2px] basis-1/2">
            <label>First Name :</label>
            <input
              {...register("firstName", { required: true, maxLength: 30 })}
              className="border border-[var(--third-color)] px-3 py-2"
            />
            {errors?.firstName?.type === "required" && (
              <span className="text-red-500">The First Name Is Required</span>
            )}
          </div>
          <div className="flex flex-col gap-[2px] basis-1/2">
            <label>Last Name :</label>
            <input
              {...register("lastName", { required: true, maxLength: 30 })}
              className="border border-[var(--third-color)] px-3 py-2"
            />
            {errors?.lastName?.type === "required" && (
              <span className="text-red-500">The Last Name Is Required</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[2px] basis-1/2">
          <label>Email :</label>
          <input
            defaultValue={userEmailAddress}
            readOnly
            {...register("email", { required: true })}
            className="border border-[var(--third-color)] px-3 py-2 bg-gray-400"
          />
        </div>
        <div className="flex flex-col gap-[2px] basis-1/2">
          <label>Phone Number :</label>
          <input
            type="number"
            {...register("phone", { required: true, maxLength: 15 })}
            className="border border-[var(--third-color)] px-3 py-2"
          />
          {errors?.phone?.type === "required" && (
            <span className="text-red-500">The Phone Number Is Required</span>
          )}
        </div>
        <div className="flex flex-col gap-[2px] basis-1/2">
          <label>Address :</label>
          <input
            {...register("address", { required: true, maxLength: 200 })}
            className="border border-[var(--third-color)] px-3 py-2"
          />
          {errors?.address && (
            <span className="text-red-500">The Address Is Required</span>
          )}
        </div>
        <button
          className={`py-[18px] px-[25px] rounded-lg bg-[var(--sec-color)] text-white mt-[20px] ml-auto ${
            isLoading && "bg-gray-400"
          }`}
          disabled={isLoading}
        >
          Update My Info
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
