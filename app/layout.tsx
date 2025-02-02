import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "300"],
});

export const metadata = {
  title: {
    template: "%s - Medpharm Consult",
    default: "Welcome - Medpharm Consult",
  },
  description: "Consult top medical professionals effortlessly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} text-base tracking-[0.1px] antialiased text-black-100`}
      >
        <Toaster
          position="top-center"
          gutter={12}
          containerClassName="mt-2"
          toastOptions={{
            duration: 4000,
            className: "text-sm rounded-5 ",
          }}
        />
        {children}
      </body>
    </html>
  );
}
