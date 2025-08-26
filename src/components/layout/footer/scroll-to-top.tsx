"use client";
import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollToTop = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      onClick={handleScrollToTop}
      className="text-sm font-semibold flex items-center gap-2 leading-[19px] text-[#212121] cursor-pointer"
    >
      <p>Scroll to top</p>
      <AiOutlineArrowUp />
    </div>
  );
};

export default ScrollToTop;
