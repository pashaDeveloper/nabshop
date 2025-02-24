"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const LoadingIndicator = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname(); // مسیر فعلی صفحه

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 500); 

    return () => clearTimeout(timeout); 
  }, [pathname]); 

  if (!loading) return null; 

  return (
    <div className="loading-overlay">
      <div className="loading-content flex flex-col items-center justify-center ">
        <Image src="/logo.png" width={80} height={80} alt="Logo" priority />
        <p>نقل و حلوای ناب</p>
        <div className="loader-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>

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
          border-radius: 12px;
          padding: 25px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .loader-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin: 10px 0;
        }

        .dot {
          width: 12px;
          height: 12px;
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
            transform: scale(0.8);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        .loading-text {
          color: #555;
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default LoadingIndicator;
