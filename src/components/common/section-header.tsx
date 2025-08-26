import Link from "next/link";
import Text from "../ui/text";

interface Props {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  textClassName?: string;
}

const SectionHeader: React.FC<Props> = ({
  sectionHeading = "text-section-title",
  categorySlug,
  className = "pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8",
  textClassName = "",
}) => {
  return (
    <div className={`flex items-center justify-center -mt-2 ${className}`}>
      <Text className={textClassName} variant="mediumHeading">
        {sectionHeading}
      </Text>
    </div>
  );
};

export default SectionHeader;
