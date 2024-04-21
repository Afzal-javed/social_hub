import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { ProvidersTheme } from "@/components/Provider/Providers";
import Providers from "@/redux/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ProvidersTheme>
            <ToastContainer />
            {children}
          </ProvidersTheme>
        </Providers>
      </body>
    </html>
  );
}
