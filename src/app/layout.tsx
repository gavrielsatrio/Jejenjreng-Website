import { Metadata } from "next";
import { StoreProvider } from "@/components/StoreProvider";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Jejenjreng Website',
    description: 'Sampaikanlah dariku, walau hanya satu ayat'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body>{children}</body>
      </StoreProvider>
    </html>
  );
}