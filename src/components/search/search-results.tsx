import { useSearchQuery } from "@/framework/basic-rest/product/use-search";
import { useRouter } from "next/navigation";
import { SyntheticEvent } from "react";
import SearchProduct, { SearchProductSkeleton } from "./search-product";
import { Button } from "../ui/button";
import { NotFoundItem } from "../not-found-section";

export const SearchResults = ({
  debouncedSearch,
  setOpen,
  onClear,
}: {
  debouncedSearch: string;
  setOpen: (state: boolean) => void;
  onClear: () => void;
}) => {
  const router = useRouter();

  const { data, isLoading, isError } = useSearchQuery({
    searchText: debouncedSearch,
    limit: 10,
    minPrice: undefined,
    maxPrice: undefined,
    sortOption: "",
  });

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!debouncedSearch.trim()) return;

    router.push(`/search?q=${encodeURIComponent(debouncedSearch)}`);
    setOpen(false);

    try {
      import("react-facebook-pixel")
        .then((module) => module.default)
        .then((ReactPixel) => {
          ReactPixel.track("Search", { search_string: debouncedSearch });
        });
    } catch (error) {
      console.error("Facebook Pixel tracking failed:", error);
    }
  };

  if (!debouncedSearch) return null;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 p-5">
        {Array.from({ length: 5 }).map((_, id) => (
          <SearchProductSkeleton key={`skeleton-${id}`} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col p-5 text-center items-center justify-center h-full min-h-[70vh]">
        <p>Error loading search results. Please try again.</p>
      </div>
    );
  }

  if (!data?.pages.length) {
    return (
      <div className="flex flex-col p-5 text-center items-center justify-center h-full min-h-[70vh]">
        <p>No results found for &quot;{debouncedSearch}&quot;</p>
      </div>
    );
  }

  // Sort products to show in-stock items first
  const sortedProducts = [...data.pages[0].products].sort((a, b) => {
    if (a.stock_status === "instock" && b.stock_status !== "instock") return -1;
    if (a.stock_status !== "instock" && b.stock_status === "instock") return 1;
    return 0;
  });

  return (
    <>
      {sortedProducts.slice(0, 5).map((item) => (
        <div
          className="relative border-b border-gray-150 last:border-b-0 pt-2 pb-safe"
          onClick={onClear}
          key={`product-${item.id}`}
        >
          <SearchProduct item={item} />
        </div>
      ))}
      {!sortedProducts.length && (
        <NotFoundItem
          title="No search results found"
          subtitle="Try searching with different keywords or filters."
          className="mt-10"
        />
      )}
      {sortedProducts.length > 5 && (
        <div className="flex justify-end w-full p-3">
          <Button onClick={handleSearch} className="w-full p-6">
            View More Products
          </Button>
        </div>
      )}
    </>
  );
};
