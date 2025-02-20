import Auth from "./auth";
import Session from "./session";
import Providers from "./providers";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL("https://noglenab.com"),
  title: "نقل و حلوا پزی ناب - بهترین حلوا در شهر",
  description:
    "نقل و حلوا پزی ناب ارائه‌دهنده بهترین و خوشمزه‌ترین حلواهای تازه با طعم‌های متنوع و اصیل. تجربه‌ای شیرین و لذیذ برای تمام سلیقه‌ها. به ما اعتماد کنید برای خرید حلواهای خوشمزه و تازه.",
  openGraph: {
    title: "نقل و حلوا پزی ناب - بهترین حلوا در شهر",
    description:
      "نقل و حلوا پزی ناب ارائه‌دهنده بهترین و خوشمزه‌ترین حلواهای تازه با طعم‌های متنوع و اصیل. تجربه‌ای شیرین و لذیذ برای تمام سلیقه‌ها. به ما اعتماد کنید برای خرید حلواهای خوشمزه و تازه.",
    url: "https://noglenab.com",
    siteName: "نقل و حلوا پزی ناب",
    images:
      "https://noglenab.com/images/og-halwa.jpg", // لینک تصویر مربوطه را وارد کن
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@noglenab",
    title: "نقل و حلوا پزی ناب - بهترین حلوا در شهر",
    description:
      "نقل و حلوا پزی ناب ارائه‌دهنده بهترین و خوشمزه‌ترین حلواهای تازه با طعم‌های متنوع و اصیل. تجربه‌ای شیرین و لذیذ برای تمام سلیقه‌ها. به ما اعتماد کنید برای خرید حلواهای خوشمزه و تازه.",
    image:
      "https://noglenab.com/images/og-halwa.jpg", // لینک تصویر مربوطه را وارد کن
  },
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Providers>
          <Auth>{children}</Auth>
          <Session>{children}</Session>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
