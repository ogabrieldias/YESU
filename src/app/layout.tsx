import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";


export const metadata: Metadata = {
  title: {
    default: "YESU Brasil | Mobilidade Elétrica Premium",
    template: "%s | YESU Brasil",
  },
  description:
    "YESU Brasil — líder em mobilidade elétrica no Brasil. Scooters e veículos elétricos premium com tecnologia de ponta. Economize até 90% em combustível e reduza emissões.",
  keywords: [
    "scooter elétrica",
    "mobilidade elétrica",
    "veículo elétrico Brasil",
    "YESU",
    "economia combustível",
    "scooter elétrica preço",
    "moto elétrica Brasil",
  ],
  authors: [{ name: "YESU Brasil" }],
  creator: "YESU Brasil",
  publisher: "YESU Brasil",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://yesubrasil.com.br",
    siteName: "YESU Brasil",
    title: "YESU Brasil | Mobilidade Elétrica Premium",
    description:
      "Scooters e veículos elétricos premium. Economize até 90% em combustível. Tecnologia de ponta, design futurista.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "YESU Brasil — Mobilidade Elétrica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YESU Brasil | Mobilidade Elétrica Premium",
    description: "Scooters e veículos elétricos premium. Economize até 90% em combustível.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://yesubrasil.com.br",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "YESU Brasil",
              url: "https://yesubrasil.com.br",
              logo: "https://yesubrasil.com.br/images/logo.png",
              description: "Especialistas em mobilidade elétrica. Scooters e veículos elétricos premium.",
              sameAs: ["https://instagram.com/yesubrasil", "https://wa.me/5500000000000"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                availableLanguage: "Portuguese",
              },
            }),
          }}
        />
      </head>
      <body className="bg-void text-white overflow-x-hidden">
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
