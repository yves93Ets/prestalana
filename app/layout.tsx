import { Inter } from "next/font/google";
import {
  StoreProviderWithSession,
  SessionProvider,
} from "./components/Provider";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./Header";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} layout`}>
        <SessionProvider>
          <StoreProviderWithSession>
            <Header />
            {children}
            <div>Footer</div>
          </StoreProviderWithSession>
        </SessionProvider>
      </body>
    </html>
  );
}
