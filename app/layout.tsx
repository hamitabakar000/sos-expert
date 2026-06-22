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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var c=localStorage.getItem("sos_color_theme")||"blue";var m=localStorage.getItem("sos_theme_mode")||"light";document.documentElement.dataset.colorTheme=c;document.documentElement.dataset.mode=m;}catch(e){}})();`
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeInitializer />
        {children}
        <SosAssistant />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
