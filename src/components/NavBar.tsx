import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useSession,
} from "@clerk/clerk-react";
import { NavLink } from "react-router";
import PopOver from "./PopOver";
import { Menu, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/Cart";
import { useState } from "react";
import { useNotify } from "@/context/HistoryNotify";

const NavBar = () => {
  const { session } = useSession();
  const { cart } = useCart();
  const { notify, setNotify } = useNotify();
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div className="flex justify-between gap-12 items-center h-[100px] border-b-1  border-gray-300 pad-content">
        <NavLink to="/">
          <img src="/logo.png" alt="logo" width={100} height={100} />
        </NavLink>
        <div className="flex items-center gap-4 max-sm:hidden">
          <PopOver
            title="products"
            content={[
              { title: "figures", image: "figure.jpg" },
              { title: "t-shirts", image: "main_pic.jpeg" },
            ]}
          />

          {session && (
            <>
              <NavLink
                onClick={() => setNotify(false)}
                to={"/history"}
                className="relative font-bold text-lg shadow-2xl text-black  p-2 rounded-md hover:bg-[var(--main-color)] hover:text-white transition-all "
              >
                {notify && (
                  <div className=" -top-[5px] absolute w-[10px] h-[10px] rounded-full bg-red-500 animate-pulse"></div>
                )}
                <h2>Purchase history</h2>
              </NavLink>
              <NavLink
                to={"/profile"}
                className="font-bold text-lg shadow-2xl text-black  p-2 rounded-md hover:bg-[var(--main-color)] hover:text-white transition-all "
              >
                <h2>Profile</h2>
              </NavLink>
            </>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <div className="p-3">
            <Menu
              className="sm:hidden"
              onClick={() => setMenu((prevState) => !prevState)}
            />
            {menu && (
              <ul className="flex flex-col gap-2 absolute bg-white p-4 z-20">
                <NavLink
                  to="/products/t-shirts"
                  className="hover:bg-[var(--main-color)]"
                  onClick={() => setMenu(false)}
                >
                  T-shirts
                </NavLink>
                <NavLink
                  to="/products/figures"
                  className="hover:bg-[var(--main-color)]"
                  onClick={() => setMenu(false)}
                >
                  Figures
                </NavLink>
                {session && (
                  <>
                    <NavLink
                      to="/history"
                      className="hover:bg-[var(--main-color)]"
                      onClick={() => setMenu(false)}
                    >
                      Purchase History
                    </NavLink>
                    <NavLink
                      to="/profile"
                      className="hover:bg-[var(--main-color)]"
                      onClick={() => setMenu(false)}
                    >
                      Profile
                    </NavLink>
                  </>
                )}
              </ul>
            )}
          </div>
          {session && (
            <NavLink to={"/cart"}>
              <div className="relative">
                {cart.length > 0 && (
                  <span className="absolute flex justify-center items-center  bg-red-400 w-[20px] h-[20px] rounded-full -right-[5px] -top-[10px]">
                    {cart.length}
                  </span>
                )}
                <ShoppingCart />
              </div>
            </NavLink>
          )}
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
