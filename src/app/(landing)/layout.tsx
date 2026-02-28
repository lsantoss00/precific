import Footer from "@/src/app/(landing)/components/footer";
import Header from "@/src/app/(landing)/components/header";
import Column from "@/src/components/core/column";
import { websiteJsonLd } from "@/src/scripts/json-ld/";
import Script from "next/script";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Column className="w-full min-h-screen overflow-x-hidden">
      <Script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
      />
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </Column>
  );
}
