import Container from "@/components/common/container";
import PageHeader from "@/components/common/page-header";
import { RETURNSEXCHANGES_METADATA } from "@/lib/metadata.pages";
import { ContentWithSidebar } from "@/components/common/content-with-sidebar";
import InnerHeader from "@/components/layout/header/inner-header";
import { returnexchange } from "@/settings/returnexchange-settings";

export const metadata = RETURNSEXCHANGES_METADATA;

export default function ReturnsExchangePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <InnerHeader />
      <PageHeader pageHeader="Returns & Exchange" pageSubHeader="" />
      <Container>
        <ContentWithSidebar items={returnexchange} />
      </Container>
    </div>
  );
}
