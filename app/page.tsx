import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Experience } from "@/components/sections/experience";
import { Work } from "@/components/sections/work";
import { Philosophy } from "@/components/sections/philosophy";
import { Loop } from "@/components/sections/loop";
import { Stack } from "@/components/sections/stack";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/site-footer";
import { socials } from "@/lib/content";
import { siteUrl } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Marcin Sufa",
  url: siteUrl,
  jobTitle: "Senior Frontend Engineer",
  worksFor: { "@type": "Organization", name: "Sysdyne" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Warsaw",
    addressCountry: "PL",
  },
  email: `mailto:${socials.email}`,
  sameAs: [socials.x, socials.github, socials.linkedin, socials.exovault],
};

export default function Home() {
  return (
    <>
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <SiteNav />
      <main id="top">
        <Hero />
        <Marquee />
        <Experience />
        <Work />
        <Philosophy />
        <Loop />
        <Stack />
        <About />
        <Contact />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
