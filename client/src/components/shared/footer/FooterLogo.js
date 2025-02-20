import React from "react";
import FooterPayment from "./FooterPayment";

const FooterLogo = () => {
  return (
    <section>
      <article className="flex md:flex-col md:justify-normal md:items-start flex-row justify-between items-center gap-y-4">
        {/* <Logo /> */}
    
        <div className=" block">
          <FooterPayment />
        </div>
      </article>
    </section>
  );
};

export default FooterLogo;
