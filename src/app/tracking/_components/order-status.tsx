import React from "react";

function ProgressDot({ isActive }: { isActive: boolean }) {
  return (
    <>
      <div
        className={` bg-zinc-300 dark:bg-zinc-600 h-0.5 ${
          isActive ? "bg-blue-500" : ""
        }`}
      ></div>
      <div
        className={`rounded-full p-2 mx-auto ${
          isActive ? "bg-blue-500" : "bg-zinc-300 dark:bg-zinc-600"
        } text-white`}
      >
        {/* SVG remains unchanged */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </>
  );
}

export default function OrderStatus({ orderStatus }: { orderStatus: string }) {
  const statuses = ["processing", "shipped", "completed"];
  const activeIndex = statuses.indexOf(orderStatus);

  return (
    <div className="p-5 mb-4 text-center rounded-lg shadow-md">
      <div className="flex items-center max-w-3xl mx-auto md:flex-row md:justify-between px-7">
        {statuses.map((step, index) => (
          <div
            key={step}
            className={`flex items-center justify-between ${
              index !== statuses.length - 1 ? "w-full" : ""
            }`}
          >
            <ProgressDot isActive={index <= activeIndex} />
            {index !== statuses.length - 1 && (
              <div
                className={`w-full bg-zinc-300 dark:bg-zinc-600 h-0.5 ${
                  index < activeIndex ? "bg-blue-500" : ""
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between max-w-3xl mx-auto mt-2 font-semibold">
        {statuses.map((step) => (
          <span key={step} className="uppercase">
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}
