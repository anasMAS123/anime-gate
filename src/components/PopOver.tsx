import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NavLink } from "react-router";
interface Category {
  title: string;
  image: string;
}
interface Props {
  title: string;
  content: Category[];
}
const PopOver = ({ title, content }: Props) => {
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer font-bold text-lg shadow-2xl text-black  p-2 rounded-md hover:bg-[var(--main-color)] hover:text-white transition-all ">
        {title}
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex gap-4">
          {content.map((item, i) => (
            <NavLink to={`/products/${item.title}`} key={i}>
              <div className="flex flex-col gap-4">
                <img
                  src={`/${item.image}`}
                  alt={item.title}
                  width={140}
                  height={140}
                />
                <span>{item.title.toUpperCase()}</span>
              </div>
            </NavLink>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopOver;
