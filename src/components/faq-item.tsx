import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type TProps = {
  number: number;
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
  borderRight?: boolean;
};

export const FaqItem = ({
  number,
  title,
  description,
  borderRight = false,
  isOpen,
  onToggle,
}: TProps) => {
  return (
    <div
      className={cn(
        "border-gray-15 h-max w-full border-b p-5 md:p-10 lg:px-12 transition-all duration-500 ease-in-out",
        {
          "border-r": borderRight,
        },
      )}
    >
      <div
        className={cn("flex cursor-pointer items-center gap-2 justify-between", {
          "text-green-70": isOpen,
        })}
        onClick={onToggle}
      >
        <div className="flex items-center justify-center space-x-4">
          <span className="from-gray-15 to-gray-15/0 flex min-w-[50px] min-h-[50px] md:min-w-[62px] md:min-h-[62px] items-center justify-center rounded-md bg-gradient-to-b text-xl md:text-2xl font-bold">
            {number.toString().padStart(2, "0")}
          </span>
          <h3 className="text-lg font-medium xl:text-xl">{title}</h3>
        </div>
        <button className="transition-colors hover:text-white">
          <X
            className={cn(
              "h-5 w-5 transition-transform duration-200",
              !isOpen ? "rotate-45" : "rotate-0",
            )}
          />
        </button>
      </div>

      {/* Animated content container */}

      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className=" lg:px-4 pt-6 pb-4">
          <div className="text-gray-90 leading-relaxed xl:text-[18px]">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
