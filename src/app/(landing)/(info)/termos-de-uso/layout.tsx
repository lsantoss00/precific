import { termosOfUseJsonLd } from "@/src/scripts/json-ld/";
import Script from "next/script";

export default function TermsOfUseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="termos-of-use-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(termosOfUseJsonLd),
        }}
      />
      {children}
    </>
  );
}
