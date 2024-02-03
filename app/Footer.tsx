import { Cormorant_Garamond as FontStyle } from "next/font/google";
import { Copyright as CopyrightBtn } from "lucide-react";

const font = FontStyle({
  weight: ["400"],
  subsets: ["latin"],
});

export default async function Footer() {
  return (
    <div className="w-full p-4">
      <div className="flex justify-between ">
        <span className={`${font.className} text-2xl contents`}>
          since 2016
          <CopyrightBtn
            size={40}
            className="onHover btn-rounded bg-white-to-gray"
          />
        </span>
      </div>
    </div>
  );
}
