'use client';

import { Suspense } from 'react';
import NotFoundSection from "@/components/not-found-section";
import NotFoundMonitorTrigger from "@/components/404-monitor-trigger";

export default function NotFound() {
  return (
    <Suspense fallback={null}>
      <NotFoundMonitorTrigger />
      <NotFoundSection />
    </Suspense>
  );
}
