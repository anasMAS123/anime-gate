import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

const DarkToggle = () => {
  const [dark, setDark] = useState<boolean>(false);
  return (
    <Toggle
      onClick={() => {
        document.body.classList.toggle("dark");
        console.log(dark);
        setDark((prev) => !prev);
      }}
    >
      {dark ? <Sun className="text-yellow-400" /> : <Moon />}
    </Toggle>
  );
};

export default DarkToggle;
