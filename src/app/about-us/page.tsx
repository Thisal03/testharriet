import Container from "@/components/common/container";
import { ABOUT_US_METADATA } from "@/lib/metadata.pages";
import InnerHeader from "@/components/layout/header/inner-header";
import Image from "next/image";

export const metadata = ABOUT_US_METADATA;

const ABOUT_CONTENT = [
  {
    icon: "https://images.harrietshopping.com/front-web/icons/about-icon6.png",
    title: "Best Deals",
    description:
      "Keep up with the latest trends with amazing deals and offers for clothing, shoes and accessories from leading brands.",
  },
  {
    icon: "https://images.harrietshopping.com/front-web/icons/about-icon5.png",
    title: "Serve with Heart",
    description:
      "A one-of-a-kind customer experience that's driven by a true love for fashion and a passion for serving our customers.",
  },
  {
    icon: "https://images.harrietshopping.com/front-web/icons/about-icon4.png",
    title: "24/7 Support",
    description:
      "Reach out to our team for expert support and assistance with any queries or concerns you may have.",
  },
  {
    icon: "https://images.harrietshopping.com/front-web/icons/about-icon3.png",
    title: "Best Quality",
    description:
      "Discover high-quality clothing and branded accessories that will leave you feeling like a runway model 24/7.",
  },
  {
    icon: "https://images.harrietshopping.com/front-web/icons/about-icon2.png",
    title: "Originality",
    description:
      "We exclusively feature solo brands and guarantee authenticity, originality and uniqueness with all our products.",
  },
  {
    icon: "https://images.harrietshopping.com/front-web/icons/about-icon1.png",
    title: "Fast Delivery",
    description:
      "Shop from the comfort of your home and get your style wardrobe delivered with a few simple clicks.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <InnerHeader />
      <Container>
        {/* Hero Banner - optimized with priority loading */}
        <div className="flex justify-center items-center py-4 md:py-8">
          <Image
            src="https://images.harrietshopping.com/front-web/images/cover/about-us.png"
            width={950}
            height={620}
            priority
            className="w-full max-w-[950px] h-auto object-contain"
            alt="About Us Banner"
          />
        </div>

        {/* Brand Introduction Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 px-4 md:px-12 lg:px-24 gap-8 py-8 md:py-12">
          <div className="flex flex-col items-center md:items-start space-y-6">
            <div className="w-full max-w-[450px] h-auto">
              <Image
                src="https://images.harrietshopping.com/front-web/images/logos/logo-1.png"
                width={450}
                height={100}
                className="w-full h-auto"
                alt="Harriet Logo"
                priority
              />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
              #StyleEveryYou
            </h2>

            <p className="text-center md:text-left text-gray-700 leading-relaxed">
              Harriet is Sri Lanka&apos;s largest marketplace dedicated to
              fashion and beauty, showcasing local brands to a global audience.
              Despite Sri Lanka&apos;s prominence in South Asia&apos;s apparel
              export market, its local brands remain unrecognized worldwide.
            </p>
          </div>

          {/* Video Section - fixed with proper aspect ratio */}
          <div className="hidden md:block relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              controls
            >
              <source
                src="https://images.harrietshopping.com/front-web/videos/about-us.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* About Content Section */}
        <section className="mx-4 md:mx-12 lg:mx-40 py-8 md:py-12 space-y-6 text-gray-700 leading-relaxed">
          <p className="text-justify md:text-center">
            At Harriet, we aim to build a fashion community driven by
            creativity, passion and an unadulterated love for all things
            fashion. There is an opportunity to create a holistic platform that
            embodies the true essence of fashion in Sri Lanka – from the latest
            styles and trends, both traditional and modern.
          </p>
          <p className="text-justify md:text-center">
            Our goal is to turn Harriet into a jack-of-all-trades in the fashion
            world, the go-to platform for anyone on the hunt for the latest and
            trendiest items of clothing, shoes and accessories. In doing so, we
            aim to launch Sri Lanka&apos;s fashion industry on an international
            level, giving solo local brands the opportunity to reach a global
            audience. As a company, we aim to provide our customers with a
            shopping experience that&apos;s personal, empowering and unique –
            shop Harriet and style every you.
          </p>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 lg:py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-heading mb-2">
              Key Features of Our Shopping Experience
            </h2>
            <p className="text-muted-foreground">
              Discover the benefits of our minimalist approach to online
              shopping
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 md:mx-12 lg:mx-40">
            {ABOUT_CONTENT.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border-2 transition-all hover:-rotate-1 hover:shadow-md ${
                  index % 3 !== 1 ? "bg-gray-50" : ""
                }`}
              >
                <div className="w-8 h-8 relative mb-4">
                  <Image
                    src={feature.icon}
                    fill
                    className="object-contain"
                    alt={`${feature.title} icon`}
                  />
                </div>
                <h3 className="text-lg font-semibold text-heading mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
