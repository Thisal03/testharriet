import Container from "@/components/common/container";
import { cn } from "@/lib/utils";
import WidgetLink from "./widget-link";

interface WidgetsProps {
  widgets: {
    id: number;
    widgetTitle?: string;
    lists: any;
    isCompanyIntroduction?: boolean;
    logo?: any;
  }[];

  variant?: "contemporary";
}

const Widgets: React.FC<WidgetsProps> = ({ widgets, variant }) => {
  return (
    <Container>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-9 xl:gap-5  pb-9 mt-10 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24 lg:mb-0.5 2xl:mb-0 3xl:-mb-1",
          {
            "xl:grid-cols-4 justify-items-center": variant !== "contemporary",
            "xl:grid-cols-6 justify-items-cneter": variant === "contemporary",
          }
        )}
      >
        {widgets?.map((widget) => (
          <WidgetLink
            key={`footer-widget--key${widget.id}`}
            data={widget}
            className="pb-3 md:pb-0"
            variant="contemporary"
          />
        ))}
      </div>
    </Container>
  );
};

export default Widgets;
