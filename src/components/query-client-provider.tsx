"use client";
import { getQueryClient } from "@/lib/services/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

const ReactQueryClientProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
