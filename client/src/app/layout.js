import Auth from "./auth";
import Session from "./session";
import Providers from "./providers";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "@/utils/ThemeContext";
import LoadingIndicator from "@/components/shared/loading/LoadingIndicator";

export const metadata = {
  metadataBase: new URL("https://noglenab.com"),
  title: "نقل و حلوا پزی ناب - خرید نقل ارومیه با بهترین کیفیت",
  description:
    "نقل و حلوا پزی ناب، عرضه‌کننده نقل ارومیه اصل و تازه با طعم‌های متنوع و سنتی. خرید آنلاین نقل ارومیه با بهترین کیفیت و ارسال سریع به سراسر کشور.",
  openGraph: {
    title: "نقل و حلوا پزی ناب - خرید نقل ارومیه با بهترین کیفیت",
    description:
      "نقل و حلوا پزی ناب، عرضه‌کننده نقل ارومیه اصل و تازه با طعم‌های متنوع و سنتی. خرید آنلاین نقل ارومیه با بهترین کیفیت و ارسال سریع به سراسر کشور.",
    url: "https://noglenab.com",
    siteName: "نقل و حلوا پزی ناب",
    images: "https://noglenab.com/images/og-halwa.jpg", // لینک تصویر مربوطه را وارد کن
    locale: "fa_IR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@noglenab",
    title: "نقل و حلوا پزی ناب - خرید نقل ارومیه با بهترین کیفیت",
    description:
      "نقل و حلوا پزی ناب، عرضه‌کننده نقل ارومیه اصل و تازه با طعم‌های متنوع و سنتی. خرید آنلاین نقل ارومیه با بهترین کیفیت و ارسال سریع به سراسر کشور.",
    image: "https://noglenab.com/images/og-halwa.jpg" // لینک تصویر مربوطه را وارد کن
  }
  };
  
export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Providers>
          <Session>
            <ThemeProvider>
            <LoadingIndicator />
              <Auth>{children}</Auth>
            </ThemeProvider>
          </Session>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
