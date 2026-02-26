"use client";

import HeroSection from "@/src/app/(landing)/components/hero-section";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const ReasonsSection = dynamic(
  () => import("@/src/app/(landing)/components/reasons-section"),
  { ssr: true },
);

const GetAheadSection = dynamic(
  () => import("@/src/app/(landing)/components/get-ahead-section"),
  { ssr: true },
);

const ValuePropositionSection = dynamic(
  () => import("@/src/app/(landing)/components/value-proposition-section"),
  { ssr: true },
);

const OurPlansSection = dynamic(
  () => import("@/src/app/(landing)/components/our-plans-section"),
  { ssr: true },
);

const ContactSection = dynamic(
  () => import("@/src/app/(landing)/components/contact-section"),
  { ssr: true },
);

const FAQSection = dynamic(
  () => import("@/src/app/(landing)/components/faq-section"),
  { ssr: true },
);

export default function LandingPageContent() {
  useEffect(() => {
    const sectionId = sessionStorage.getItem("scrollToSection");
    if (sectionId) {
      sessionStorage.removeItem("scrollToSection");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <ReasonsSection />
      <GetAheadSection />
      <ValuePropositionSection />
      <OurPlansSection />
      <ContactSection />
      <FAQSection />
    </>
  );
}
