import { Quicksand as FontStyle } from "next/font/google";
import {
  StoreProviderWithSession,
  SessionProvider,
} from "./components/Provider";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./Header";
import Footer from "./Footer";

const font = FontStyle({ subsets: ["latin"] });

export const metadata = {
  title: "Prestalana",
  description:
    "Passwordless Authentication System using Nextjs 14, nodemailer and NextAUTH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className={`${font.className} layout`}>
        <SessionProvider>
          <StoreProviderWithSession>
            <Header />
            {children}
            <Footer />
          </StoreProviderWithSession>
        </SessionProvider>
      </body>
    </html>
  );
}
