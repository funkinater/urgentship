import type { Metadata } from "next";
import { Geist, Geist_Mono, Mulish } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "UrgentShip",
  description: "Welcome to UrgentShip Delivery Service",
};

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} ${mulish.variable} antialiased`}
//       >
//         {children}

//           <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=6bec6d35-b6f6-4049-8326-095ff39bbb53"> </script>

//       </body>
//     </html>
//   );
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mulish.variable} antialiased`}
      >
        {children}

        <Script
          id="ze-snippet"
          src="https://static.zdassets.com/ekr/snippet.js?key=6bec6d35-b6f6-4049-8326-095ff39bbb53"
          strategy="afterInteractive" // loads after hydration
        />
      </body>
    </html>
  );
}
