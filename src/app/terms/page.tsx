import Container from "@/components/common/container";
import PageHeader from "@/components/common/page-header";
import { termsAndServices } from "@/settings/terms-settings";
import { TERMSCONDITIONS_METADATA } from "@/lib/metadata.pages";
import { ContentWithSidebar } from "@/components/common/content-with-sidebar";
import InnerHeader from "@/components/layout/header/inner-header";

export const metadata = TERMSCONDITIONS_METADATA;

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <InnerHeader />
      <PageHeader pageHeader="Terms of Service" pageSubHeader="" />
      <Container>
        <ContentWithSidebar items={termsAndServices} />
      </Container>
    </div>
  );
}
