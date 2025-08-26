"use client";
import React from "react";
import { FaTape } from "react-icons/fa";
import { ImageContainer } from "@/components/ui/image-carousel";
import { useSizeChartQuery } from "@/framework/basic-rest/product/get-product-size-chart";

const SizeChart = ({ productId }: { productId: string | number }) => {
  const { data: productSizeChart } = useSizeChartQuery(productId);
  if (!productSizeChart?.file_url?.url) return null;

  return (
    <ImageContainer
      image={{
        url: productSizeChart?.file_url.url,
        title: "Size Chart",
      }}
      alt={"Size Chart"}
      showImageControls
    >
      <span className="text-[#161616] cursor-pointer text-sm font-bold flex pt-1">
        <FaTape className="size-5" />
        <span className="ml-2 hover:underline">Size chart</span>
      </span>
    </ImageContainer>
  );
};

export default SizeChart;
