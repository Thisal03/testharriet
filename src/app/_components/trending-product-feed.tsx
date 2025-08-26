"use client";
import SectionHeader from "@/components/common/section-header";
import ProductsBlock from "@/components/product/products-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBestSellerProductsQuery } from "@/framework/basic-rest/product/get-all-best-seller-products";
import { useOnSaleProductsQuery } from "@/framework/basic-rest/tabs/get-all-onselling-products";
import { useTagProductsQuery } from "@/framework/basic-rest/tag/fetch-tag";

const TAB_CONFIG = [
  { slug: "trendingallcollection", label: "All Collection" },
  { slug: "onsale", label: "On Sale" },
  { slug: "bestsellers", label: "Best Sellers" },
  { slug: "featured", label: "Featured" },
] as const;

const TrendingProductFeed = () => {
  const defaultTab = TAB_CONFIG[0].slug;

  return (
    <div>
      <SectionHeader sectionHeading="Trending Products" />

      <Tabs defaultValue={defaultTab} className="w-full mt-4">
        <div className="relative h-10 overflow-x-auto overflow-y-hidden w-full flex justify-start lg:justify-center sm:h-14 scrollbar-none">
          <TabsList className="absolute flex items-center justify-start lg:justify-center p-0 border-b  rounded-none bg-background scrollbar-none">
            {TAB_CONFIG.map((section) => (
              <TabsTrigger
                key={section.slug}
                value={section.slug}
                className="rounded-none text-muted-foreground transition-all bg-background data-[state=active]:shadow-none border-0 border-b-[5px] border-muted data-[state=active]:border-[#FEE271] data-[state=active]:text-primary data-[state=active]:bg-background data-[state=active]:font-semibold text-sm sm:text-base h-10 sm:h-14 px-3 sm:px-4 lg:px-6 py-4 hover:text-primary"
              >
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {TAB_CONFIG.map((section) => (
          <TabsContent key={section.slug} value={section.slug} className="">
            <TabSection slug={section.slug} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TrendingProductFeed;

const TabSection = ({ slug }: { slug: string }) => {
  if (slug === "onsale") {
    return <OnSaleTab />;
  }

  if (slug === "bestsellers") {
    return <BestSellersTab />;
  }

  return <TagProductsTab slug={slug} />;
};

const OnSaleTab = () => {
  const { data, isLoading, error } = useOnSaleProductsQuery();

  return (
    <ProductsBlock
      sectionHeading=""
      products={data}
      loading={isLoading}
      error={error?.message}
      type="gridTrendy"
      showDiscount
    />
  );
};

const BestSellersTab = () => {
  const { data, isLoading, error } = useBestSellerProductsQuery({
    limit: 10,
  });

  return (
    <ProductsBlock
      sectionHeading=""
      products={data?.pages.flatMap((page) => page.products)}
      loading={isLoading}
      error={error?.message}
      type="gridTrendy"
    />
  );
};

const TagProductsTab = ({ slug }: { slug: string }) => {
  const { data, isLoading, error } = useTagProductsQuery({ slug }, 1, 10);

  return (
    <ProductsBlock
      sectionHeading=""
      products={data?.products}
      loading={isLoading}
      error={error?.message}
      type="gridTrendy"
      showHotTag={slug === "trendingallcollection" || slug === "bestsellers"}
      showFeaturedTag={slug === "featured"}
    />
  );
};
