import Image from "next/image";
import { Product } from "@/framework/basic-rest/types";
import LearnMoreSection from "./learn-more-section";

export const SpecialSection = ({ data }: { data?: Product }) => {
  return (
    <>
      <div className="pt-1">
        <div className="flex flex-row justify-between pb-2 md:flex-row">
          <span className="text-[#161616] md:text-[15px] text-[13.5px] font-bold">
            What makes Harriet special
          </span>
          <LearnMoreSection data={data} />
        </div>

        <div className="flex justify-between md:gap-x-4 gap-x-3 md:mr-4 tablet:justify-evenly tablet:gap-x-4">
          {/* Feature Box 1 */}
          <div
            className={`relative h-[105px] cursor-pointer overflow-hidden rounded-2xl p-3 bg-[#FEF7E2] text-xs font-medium ${
              !data?.categories?.some((c) => c.name === "Avurudu Collection")
                ? "w-1/3"
                : "w-1/2"
            }`}
          >
            <div className="absolute w-20 h-20 -right-3 top-7 tablet:right-0">
              <Image
                src="https://images.harrietshopping.com/front-web/icons/orginal-product.svg"
                alt="100% Original Products"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <span className="text-[#161616] font-semibold md:text-sm text-[11.5px]">
              100% Original Products
            </span>
          </div>

          {/* Feature Box 2 */}
          {!data?.categories?.some((c) => c.name === "Avurudu Collection") && (
            <div className="bg-[#E8F5E9] relative h-[105px] w-1/3 cursor-pointer overflow-hidden rounded-2xl p-3 text-xs font-medium">
              <div className="absolute w-16 h-16 -right-3 top-12 md:top-7 tablet:right-0 opacity-60">
                <Image
                  src="https://images.harrietshopping.com/front-web/icons/7-day-return-exchange.svg"
                  alt="7 Day Return/Exchange"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span className="text-[#161616] font-semibold md:text-sm text-[11.5px]">
                7 Day Return / Exchange
                <span className="text-[#A40F0F]">*</span>
              </span>
            </div>
          )}

          {/* Feature Box 3 */}
          <div
            className={`bg-[#FBE9E7] relative h-[105px] cursor-pointer overflow-hidden rounded-2xl p-3 text-xs font-medium ${
              !data?.categories?.some((c) => c.name === "Avurudu Collection")
                ? "w-1/3"
                : "w-1/2"
            }`}
          >
            <div className="absolute w-20 h-20 -right-3 top-7 tablet:right-0">
              <Image
                src="https://images.harrietshopping.com/front-web/icons/safe-payment.svg"
                alt="Secure Payments"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <span className="text-[#161616] font-semibold md:text-sm text-[11.5px]">
              Secure Payments
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
