import SectionHeader from "@/components/common/section-header";
import CollectionCard from "./collection-card";

interface Props {
  data: {
    id: number;
    slug: string;
    image: string;
  }[];
  className?: string;
  variant?: "default" | "modern" | "trendy";
  sectionHeading?: string;
}

const CollectionBlock = ({
  data,
  className = "mb-12 md:mb-14 xl:mb-16 lg:pt-1 xl:pt-0",
  variant = "default",
  sectionHeading,
}: Props) => {
  return (
    <div>
      {sectionHeading && <SectionHeader sectionHeading={sectionHeading} />}
      <div
        className={`${className} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 xl:gap-7`}
      >
        {data?.slice(0, 3)?.map((item, index) => (
          <CollectionCard key={index} collection={item} variant={variant} />
        ))}
      </div>
    </div>
  );
};

export default CollectionBlock;
