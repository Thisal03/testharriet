import Container from "@/components/common/container";
import PageHeader from "@/components/common/page-header";
import { PRIVACYPOLICY_METADATA } from "@/lib/metadata.pages";
import { ContentWithSidebar } from "@/components/common/content-with-sidebar";
import InnerHeader from "@/components/layout/header/inner-header";
import { privacyPolicy } from "@/settings/privacy-settings";

export const metadata = PRIVACYPOLICY_METADATA;

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <InnerHeader />
      <PageHeader pageHeader="Privacy Policy" pageSubHeader="" />
      <Container>
        <ContentWithSidebar items={privacyPolicy} />
      </Container>
    </div>
  );
}
