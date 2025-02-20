import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // استفاده از next/router برای نسخه‌های قبل از 13

const LoadingIndicator = () => {
  const [loading, setLoading] = useState(false); // وضعیت لودینگ
  const router = useRouter();

  useEffect(() => {
    if (!router) return; // بررسی اینکه router موجود است
    const handleRouteChangeStart = () => {
      setLoading(true); // شروع لودینگ
    };

    const handleRouteChangeComplete = () => {
      setLoading(false); // پایان لودینگ
    };

    const handleRouteChangeError = () => {
      setLoading(false); // در صورت بروز خطا
    };

    // ثبت رویدادها
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    // پاک کردن رویدادها هنگام unmount
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]); // اجرای این کد بعد از بارگذاری router

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loader-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="loading-text">صبر کنید ...</div>
          </div>
        </div>
      )}
      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.6);
        }

        .loading-content {
          background: white;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .loader-dots {
          display: flex;
          justify-content: space-evenly;
          margin-bottom: 10px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #4caf50;
          animation: dotAnimation 0.6s infinite alternate;
        }

        .dot:nth-child(1) {
          animation-delay: 0s;
        }

        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        .dot:nth-child(4) {
          animation-delay: 0.6s;
        }

        @keyframes dotAnimation {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }

        .loading-text {
          color: #555;
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default LoadingIndicator;
