

import React from "react";
import Image from "next/image";
import { AiTwotoneFire } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Right from './right'
import CountdownTimer from "./CountdownTimer"
import Container from "../shared/Container";
const Banner1 = () => {
  const router = useRouter();

  return (
    <Container >
      <div className="grid md:grid-cols-3 mt-24  md:mt-28 justify-center grid-cols-1 md:gap-4">
        <div className="col-span-2 h-full flex flex-col gap-y-4 ">
          
    
        <div
  className="w-full h-fit md:mt-5 rounded-primary relative flex flex-col gap-y-8 lg:px-22 lg:py-[80px] md:pt-8 pb-0"
  style={{
    backgroundImage: "url(/assets/home/banner/dots.svg), linear-gradient(to top right, #ef4444, #ef4444)", // ترتیب صحیح: تصویر پس‌زمینه و سپس گرادیانت  
    backgroundSize: "cover", // تنظیم اندازه پس‌زمینه
    backgroundPosition: "center", // تنظیم موقعیت تصویر پس‌زمینه
  }}
>
  {/* محتویات دیگر اینجا */}
        <Image
          src="/assets/home/banner/model1.png"
          alt="model"
          height={872}
          width={500}
          className="lg:absolute bottom-0 right-0 order-2 lg:w-[500px] lg:ml-0 md:ml-auto  "
        />
        <div className="md:grid md:grid-cols-5 gap-4">
  <div className="md:col-span-3 hidden md:flex p-4">
  </div>
  <div className="md:col-span-2 flex flex-col gap-4 p-4">
  <h1 className="md:text-6xl text-white font-nozha text-6xl w-full text-right">
  نقل و حلوای {" "}
  <span className="md:text-6xl text-black" >ناب</span>
   
  <br/>
  </h1>
  <h1 className="md:text-3xl font-nozha text-4xl w-full text-right ">

   طعمی از جنس {" "}
   <span className="text-white" >اصالت</span>
   {" "}  و 
    <span className="text-white" > لذت خالص </span>
   
   
    </h1>
  <p className="flex flex-row gap-x-0.5 items-center text-right justify-start md:text-md text-black">
    در این فصل، طعمی ماندگار را تجربه کنید
    <AiTwotoneFire className="text-[#ffa384] w-6 h-6 drop-shadow" />
  </p>
  <button
    className="px-8 py-4 border border-black justify-start rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mt-4"
    onClick={() => router.push("/")}
  >
    شروع تجربه شیرین شما
  </button>
  </div>
</div>

</div>
<div className="bg-blue-100 rounded-primary h-full hidden md:flex flex-col gap-y-4 md:flex-row justify-between items-center md:p-6 p-2 rtl">
  <h1 className="md:text-3xl hidden md:flex text-4xl font-nozha text-right leading-tight">
    تا پایان 
  </h1>
  

  <CountdownTimer targetDate="2025-02-31T23:59:59" />
  <h1 className="text-3xl  font-nozha text-right leading-tight">
  {"  "} 
 به مناسبت افتتاح فروشگاه  
  </h1>
    <span className="text-pink-800 text-4xl font-nozha">ارسال رایگان به سراسر کشور</span>
</div>


      </div> 
  <div className=" flex flex-col w-full  pt-4 gap-4">
   <Right />
  </div>
</div>
</Container>

  );
};

export default Banner1;
