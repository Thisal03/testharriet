"use client";

import { Card, CardContent } from "@/components/ui/card";

interface AddressSummaryProps {
  title: string;
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    note?: string;
  };
  showEmail?: boolean;
}

export const AddressSummary = ({
  title,
  data,
  showEmail = false,
}: AddressSummaryProps) => {
  return (
    <Card className="mb-6">
      <CardContent>
        <div className="flex flex-col space-y-4 lg:space-y-5">
          <div className="flex justify-start items-center border-b border-[#F4F0F0] pb-3">
            <span className="pr-3 text-sm font-semibold text-black">
              {title}
            </span>
            {showEmail && (
              <span className="text-sm text-gray-400">
                {data.firstName} {data.lastName}
              </span>
            )}
          </div>

          {showEmail && data.email && (
            <div className="flex items-center mb-1">
              <span className="pr-2 text-sm font-medium text-black md:pr-2">
                Email:
              </span>
              <span className="text-sm text-gray-400">{data.email}</span>
            </div>
          )}

          {data.phone && (
            <div className="flex items-center mb-1">
              <span className="pr-2 text-sm font-medium text-black md:pr-2">
                Phone:
              </span>
              <span className="text-sm text-gray-400">{data.phone}</span>
            </div>
          )}

          {data.firstName && (
            <div className="flex items-center mb-1">
              <span className="pr-2 text-sm font-medium text-black md:pr-2">
                Name:
              </span>
              <span className="text-sm text-gray-400">
                {data.firstName} {data.lastName}
              </span>
            </div>
          )}

          <div className="flex flex-col items-start mb-1 md:flex-row">
            <span className="mb-1 text-sm font-medium text-black md:mb-0 md:mr-2">
              Address:
            </span>
            <span className="text-sm text-gray-400">
              {data.address}, {data.city}, {data.state}, {data.country},{" "}
              {data.zipCode}
            </span>
          </div>

          {data.note && (
            <div className="flex flex-col items-start mb-1 md:flex-row">
              <span className="mb-1 text-sm font-medium text-black md:mb-0 md:mr-2">
                Note:
              </span>
              <span className="text-sm text-gray-400">{data.note}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
