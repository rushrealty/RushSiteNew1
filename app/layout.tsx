import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LocalBusinessSchema from "../components/LocalBusinessSchema";
import Script from "next/script";
import GoogleAnalytics from '@/components/GoogleAnalytics';

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700"],
});

// PWA Viewport settings
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#171717',
};

export const metadata: Metadata = {
  // Base URL for all relative URLs
  metadataBase: new URL('https://rushhome.com'),
  
  // PWA Manifest
  manifest: '/manifest.json',
  
  // Apple PWA settings
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Rush Home',
  },
  
  // Default page metadata
  title: "Your Home. Sold. Guaranteed. | Rush Home Team",
  description: "Get an instant cash offer on your Delaware home. Buy your next home before selling. No showings, no stress, your timeline.",
  
  // Additional SEO
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-180x180.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          id="google-maps-loader"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=\`https://maps.\${c}apis.com/maps/api/js?\`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Re-referencing: "+l):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
              key: "AIzaSyCr7oXHFPoN5UsFynxNcR6w_G2YfJ-FE2w",
              v: "weekly",
            });`
          }}
        />
        <Script id="fub-pixel" strategy="afterInteractive">
          {`
            (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function() {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"), (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i; e.parentNode.insertBefore(t,e);}) (window,"https://widgetbe.com/agent",document,"widgetTracker"); window.widgetTracker("create", "WT-BQSFVIEG"); window.widgetTracker("send", "pageview");
          `}
        </Script>
        {/* QuickBuy Lead Identification */}
        <Script
          id="quickbuy-lead-id"
          src="https://rushhome.quickbuyoffer.com/condorscripts/0119bb16b3e840e7800312cbdb8da4c4.js?v=3072"
          strategy="afterInteractive"
        />
        {/* iHomeFinder IDX */}
        <Script
          id="ihf-kestrel"
          src="https://kestrel.idxhome.com/ihf-kestrel.js"
          strategy="beforeInteractive"
        />
        <Script
          id="ihf-kestrel-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.ihfKestrel = window.ihfKestrel || {};
              ihfKestrel.config = {
                platform: "custom",
                activationToken: "4060aca8-a116-467b-a7f0-9ba3dd49aebb",
              };
            `
          }}
        />
      </head>
      <body className={`${montserrat.variable} ${playfair.variable} font-sans antialiased bg-white text-gray-900`}>
        <GoogleAnalytics />
        <LocalBusinessSchema />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
