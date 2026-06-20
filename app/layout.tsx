import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Marcin Sufa — AI-native Frontend Engineer",
    template: "%s · Marcin Sufa",
  },
  description:
    "Senior frontend engineer and indie builder. I take products from first pixel to production — and orchestrate a fleet of AI agents to ship at the pace of a whole team.",
  keywords: [
    "Marcin Sufa",
    "frontend engineer",
    "AI engineer",
    "Vue",
    "React",
    "Next.js",
    "Claude Code",
    "multi-agent",
    "Warsaw",
  ],
  authors: [{ name: "Marcin Sufa", url: siteUrl }],
  creator: "Marcin Sufa",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Marcin Sufa — AI-native Frontend Engineer",
    description:
      "Senior frontend engineer and indie builder who orchestrates a fleet of AI agents to ship at the pace of a whole team.",
    siteName: "Marcin Sufa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcin Sufa — AI-native Frontend Engineer",
    description:
      "Senior frontend engineer and indie builder who orchestrates a fleet of AI agents to ship at the pace of a whole team.",
    creator: "@smolexander",
  },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#131019" },
    { media: "(prefers-color-scheme: light)", color: "#f4f0e8" },
  ],
};

/**
 * Applies the persisted theme before first paint to avoid a flash.
 * Dark is the default (no class); light adds `theme-light` to <html>.
 */
const noFlashThemeScript = `(function(){try{var t=localStorage.getItem('ms-theme');if(t==='light'){document.documentElement.classList.add('theme-light');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
