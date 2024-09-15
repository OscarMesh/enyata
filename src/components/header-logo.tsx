import { Scan } from "lucide-react";
import Link from "next/link";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="border-r-2 flex items-center pr-6 text-cyan-600 font-bold lg:text-[1.5rem]">
        SCAN
        <Scan className="text-black" />
        PP
      </div>
    </Link>
  );
};
