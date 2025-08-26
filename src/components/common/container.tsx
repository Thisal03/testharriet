import { cn } from "@/lib/utils";
import { JSX } from "react";

interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  clean?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  as: Component = "div",
  clean = false,
}) => {
  return (
    <Component
      className={cn(!clean && "mx-auto 2xl:container px-4 md:px-10", className)}
    >
      {children}
    </Component>
  );
};

export default Container;
