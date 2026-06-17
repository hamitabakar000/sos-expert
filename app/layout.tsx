import type { Metadata } from "next";
import { Toaster } from "sonner";
import { SosAssistant } from "@/components/sos-assistant";
import { ThemeInitializer } from "@/components/theme-initializer";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOS Expert",
  description:
    "Plateforme intelligente de mise en relation experts-clients avec IA neuro-symbolique et crowdsourcing structure."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-color-theme="blue" data-mode="light" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeInitializer />
        {children}
        <SosAssistant />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
