import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

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
        className={`${inter.className}  text-base tracking-[0.1px] antialiased text-black-100`}
      >
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            duration: 5000,
            style: {
              fontSize: "14px",
              lineHeight: "20px",
              borderRadius: "5px",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
