import HeaderLanding from "@/components/layout/header/landing-header";
import HeroSlider from "./_components/hero-slider";
import Container from "@/components/common/container";
import SectionHeader from "@/components/common/section-header";
import CategoryBlockIcon from "./_components/category-block";
import { categoryReworkGrid } from "@/framework/basic-rest/static/collection";
import { bannerDataContemporary } from "@/framework/basic-rest/static/banner";
import SaleBannerGrid from "./_components/sale-banner-grid";
import { brandsTimer } from "@/framework/basic-rest/static/brands";
import { collectionContemporaryData } from "@/framework/basic-rest/static/collection";
import BrandsBlock from "./_components/brands-block";
import HighlightBanners from "./_components/highlight-banners";
import CollectionsBlock from "./_components/collections-block";
import Subscription from "../components/common/subscription";
import RecentProductFeed from "./_components/recent-product-feed";
import NewArrivalsProductFeed from "./_components/new-arrivals-product-feed";
import TrendingProductFeed from "./_components/trending-product-feed";
import RecentProducts from "./product/[slug]/_components/recent-products";
import BestSellersBlock from "./_components/best-sellers-block";

export default function Home() {
  return (
    <main>
      <HeaderLanding />
      <HeroSlider
        variantRounded="default"
        variant="fullWidth"
        className="!mb-12 !md:mb-14 !xl:mb-[60px]"
      />
      <Container className="border-b-2 border-muted">
        <BestSellersBlock />
        <SectionHeader sectionHeading="Browse Categories" />

        <CategoryBlockIcon
          categories={categoryReworkGrid}
          className="mb-12 md:mb-14 xl:mb-16"
        />

        <SaleBannerGrid
          data={bannerDataContemporary}
          className="mb-12 md:mb-14 xl:mb-16"
        />

        <NewArrivalsProductFeed />

        <BrandsBlock
          sectionHeading="Top Brands"
          className="mb-12 md:mb-14 xl:mb-16"
          brands={brandsTimer}
        />
        <TrendingProductFeed />
        <HighlightBanners />
        <CollectionsBlock
          variant="trendy"
          data={collectionContemporaryData}
          sectionHeading="Trending Collections"
        />
        <RecentProductFeed />
        <RecentProducts />
        <Subscription className="mb-12 md:mb-14 xl:mb-16" />
      </Container>
    </main>
  );
}
