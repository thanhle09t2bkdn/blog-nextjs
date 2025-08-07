import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { cn } from "@/lib/utils";

type Props = {
  isNoLine?: boolean;
};

const Footer = ({ isNoLine = true }: Props) => {
  return (
    <footer
      className={cn(
        "border-blue-800 pt-5 pb-10 max-w-[90%] md:max-w-[1200px] px-0 md:px-5 xl:px-0 w-full text-white mx-auto",
        isNoLine ? "border-none mt-5" : "border-t-[1px] mt-20"
      )}
    >
      <div className="flex justify-between items-center md:items-start gap-10 flex-col md:flex-row">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="uppercase font-bold text-sm text-blue-500">
            Contact Us
          </p>
          <div className="flex items-center gap-4">
            <Phone className="w-4 h-4 text-blue-500" />
            <span className="text-sm">+62 81234567890</span>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="w-4 h-4 text-blue-500" />
            <span className="text-sm">info@company.com</span>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="uppercase font-bold text-sm text-blue-500">
            Newsletter
          </p>
          <div className="flex items-center gap-2 text-black">
            <Input placeholder="Enter your email" className="w-[200px]" />
            <Button className="rounded-full bg-blue-700 text-sm">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
