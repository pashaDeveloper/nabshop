

import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <section className="fixed top-0 left-0 h-screen w-screen overflow-hidden flex justify-center items-center bg-white z-50">
      <Image
        src="/loading.png"
        alt="loading"
        height={540}
        width={960}
        className="max-w-full h-[250px] w-full object-contain"
      />
    </section>
  );
};

export default Loading;
