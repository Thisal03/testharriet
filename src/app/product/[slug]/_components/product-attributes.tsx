import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  title: string;
  attributes: string[];
  active: string;
  onClick: (option: string, title: string) => void;
  stockQty: {
    [option: string]: number;
  };
  isOutStock?: boolean;
  isOptionAvailable?: (option: string) => boolean;
}

export const ProductAttributes: React.FC<Props> = ({
  className = "mb-4",
  title,
  attributes,
  active,
  onClick,
  stockQty,
  isOutStock,
  isOptionAvailable,
}) => {
  const isOutOfStock = (option: string) =>
    isOutStock || stockQty[option] === 0 || stockQty[option] === undefined;

  const isOptionDisabled = (option: string) => {
    if (isOptionAvailable) {
      return !isOptionAvailable(option);
    }
    return isOutOfStock(option);
  };

  return (
    <div className={className}>
      <h3 className="text-base md:text-md text-heading font-semibold mb-2.5 capitalize">
        {title}
      </h3>

      <ul className="flex flex-wrap color-options ltr:-mr-3 rtl:-ml-3">
        {attributes.map((option, id) => (
          <li
            className={cn(
              "cursor-pointer rounded border w-auto px-3 md:w-auto h-9 md:h-9 mb-2 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-[12px] uppercase font-semibold transition duration-200 ease-in-out",
              option === active ? "bg-black text-white" : "option-default",
              isOptionDisabled(option)
                ? "opacity-90 cursor-not-allowed hover:cursor-not-allowed bg-muted text-black/80 relative"
                : ""
            )}
            key={id}
            onClick={
              isOptionDisabled(option) ? undefined : () => onClick(option, title)
            }
          >
            {title == "colo" ? (
              <span
                className="block w-full h-full rounded"
                style={{ backgroundColor: option }}
              />
            ) : (
              option
            )}
            {isOptionDisabled(option) && (
              <span className="absolute rounded w-[1px] h-full bg-[#35353594] transform rotate-45 origin-center"></span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
