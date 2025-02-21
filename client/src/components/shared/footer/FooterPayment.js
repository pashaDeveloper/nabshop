
// import Image from "next/image";
import React from "react";
import Image from 'next/image'
import Enamad from "./Enamad";

const FooterPayment = () => {
  const methods = [
    {
      id: 1,
      name: "ویزا",
      logo: "/assets/payment-methods/visa.svg",
    },
    {
      id: 2,
      name: "مسترکارت",
      logo: "/assets/payment-methods/mastercard.svg",
    },
    {
      id: 3,
      name: "پیپال",
      logo: "/assets/payment-methods/paypal.svg",
    },
    {
      id: 4,
      name: "جیپی",
      logo: "/assets/payment-methods/gpay.svg",
    },
  ];

  // function toBase64(str) {
  //   return btoa(unescape(encodeURIComponent(str)));
  // }

  // function shimmer(width, height) {
  //   return `https://placehold.co/${width}x${height}.svg`;
  // }

  return (
    <section>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-lg"> روش های پرداخت</h2>
        <div className="flex flex-row flex-wrap gap-1.5">
          {methods.map(({ id, name, logo }) => (
            <span key={id}>
                <Image
                  src={logo}
                  alt={name}
                  width={50}
                  height={29}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
            </span>
          ))}
         <Enamad />
        </div>
        
      </div>
    </section>
  );
};

export default FooterPayment;
