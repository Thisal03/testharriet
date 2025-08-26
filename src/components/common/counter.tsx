import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";

type CounterProps = {
  quantity: number;
  onDecrement: (e: any) => void;
  onIncrement: (e: any) => void;
  disableIncrement?: boolean;
  disableDecrement?: boolean;
  variant?: "default" | "dark";
  className?: string;
};

const Counter: React.FC<CounterProps> = ({
  quantity,
  onDecrement,
  onIncrement,
  disableIncrement = false,
  disableDecrement = false,
  variant = "default",
}) => {
  const size = variant !== "dark" ? "10px" : "10px";

  const quantityClass = cn(
    "font-semibold flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default flex-shrink-0",
    {
      "text-xs text-heading w-10 md:w-16 xl:w-20": variant === "default",
      "text-xs text-white w-6 md:w-8": variant === "dark",
    }
  );

  return (
    <div
      className={cn(
        "group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0",
        {
          "border h-9 md:h-10 border-gray-300": variant === "default",
          "h-7 shadow-navigation bg-heading": variant === "dark",
        }
      )}
    >
      <button
        onClick={onDecrement}
        className={cn(
          "flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none",
          {
            "w-8 md:w-10 text-heading border-e border-gray-300 hover:text-white hover:bg-heading":
              variant === "default",
            "w-6 md:w-7 text-white bg-heading hover:bg-gray-600 focus:outline-none":
              variant === "dark",
          }
        )}
        disabled={disableDecrement}
        id="buttondecrement"
        title="decrement"
      >
        <MinusIcon width={size} />
      </button>

      <span className={quantityClass}>{quantity}</span>

      <button
        onClick={onIncrement}
        className={cn(
          "flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none",
          {
            "w-8 md:w-10 text-heading border-s border-gray-300 hover:text-white hover:bg-heading":
              variant === "default",
            "w-6 md:w-7 text-white bg-heading hover:bg-gray-600 focus:outline-none":
              variant === "dark",
          }
        )}
        disabled={disableIncrement}
        id="buttonincrement"
        title="increment"
      >
        <PlusIcon width={size} height={size} />
      </button>
    </div>
  );
};

export default Counter;
