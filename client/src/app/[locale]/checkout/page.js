"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useCreatePaymentMutation } from "@/services/payment/paymentApi";
import Link from "next/link";

const Checkout = () => {
  const { session, user } = useSelector((state) => state.auth);
  const cartItems = session?.cart || user?.cart || [];

  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardholder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  const [warning, setWarning] = useState(false);
  const [step, setStep] = useState(1);

  const [createPayment, { isLoading, data, error }] = useCreatePaymentMutation();

  useEffect(() => {
    if (isLoading) toast.loading("در حال انتقال به درگاه پرداخت...", { id: "createPayment" });
    if (data) {
      toast.success(data?.description, { id: "createPayment" });
      window.open(data?.url, "_blank");
    }
    if (error?.data) toast.error(error?.data?.description, { id: "createPayment" });
  }, [isLoading, data, error]);

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handleNextStep = () => {
    if (step === 1 && cartItems.length === 0) {
      setWarning(true);
    } else if (step === 2 && !address) {
      setWarning(true);
    } else if (step === 3 && Object.values(paymentDetails).some((val) => val === "")) {
      setWarning(true);
    } else {
      setWarning(false);
      setStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <div className="checkout-panel flex flex-col pt-36 justify-center items-center bg-white shadow-lg max-w-[940px] w-full mx-auto h-screen">
      <h2 className="title text-2xl text-[#2e2e2e] mb-2"> تسویه حساب </h2>
      
      <div className="panel-body p-8 flex-1 w-full">
        {/* Progress Bar */}
        <div className="progress-bar flex mb-12 justify-between">
          {["لیست خرید", "آدرس و نحوه ارسال", "پرداخت", "تکمیل اطلاعات"].map(
            (stepName, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className={`step w-6 h-6 rounded-full border-4 ${index < step ? "bg-[#f62f5e]" : "bg-[#efefef]"}`} />
                <span className="text-sm">{stepName}</span>
              </div>
            )
          )}
        </div>

        {/* Step 1: Cart Items */}
        {step === 1 && (
          <div>
            <h3>لیست خرید</h3>
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.price}
                  </li>
                ))}
              </ul>
            ) : (
              <p>هیچ کالایی در سبد خرید وجود ندارد.</p>
            )}
          </div>
        )}

        {/* Step 2: Address and Shipping */}
        {step === 2 && (
          <div>
            <h3>آدرس و نحوه ارسال</h3>
            <input
              type="text"
              placeholder="آدرس خود را وارد کنید"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`w-full h-12 p-4 border border-[#e1e1e1] rounded text-[#2e2e2e] ${warning && !address ? "border-[#f62f5e]" : ""}`}
            />
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div>
            <h3>پرداخت</h3>
            <div className="payment-method flex mb-16 justify-between flex-wrap">
              <label
                onClick={() => handlePaymentChange("card")}
                className={`method card flex flex-col w-full sm:w-[382px] h-[122px] pt-5 cursor-pointer border-1 ${paymentMethod === "card" ? "border-[#f62f5e]" : "border-transparent"} rounded bg-[#f9f9f9] justify-center items-center mb-6 sm:mb-0`}
              >
                <div className="card-logos flex w-[150px] justify-between">
                  <img src="img/visa_logo.png" alt="Visa Logo" />
                  <img src="img/mastercard_logo.png" alt="MasterCard Logo" />
                </div>
                <div className="radio-input mt-5">
                  <input
                    id="card"
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => handlePaymentChange("card")}
                  />
                  پرداخت با کارت اعتباری
                </div>
              </label>

              <label
                onClick={() => handlePaymentChange("paypal")}
                className={`method paypal flex flex-col w-full sm:w-[382px] h-[122px] pt-5 cursor-pointer border-1 ${paymentMethod === "paypal" ? "border-[#f62f5e]" : "border-transparent"} rounded bg-[#f9f9f9] justify-center items-center`}
              >
                <img src="img/paypal_logo.png" alt="PayPal Logo" />
                <div className="radio-input mt-5">
                  <input
                    id="paypal"
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "paypal"}
                    onChange={() => handlePaymentChange("paypal")}
                  />
                  پرداخت با پی‌پال
                </div>
              </label>
            </div>

            {/* Card Details */}
            <div className="input-fields flex flex-wrap justify-between">
              <div className="column-1 w-full sm:w-[382px] mb-8 sm:mb-0">
                <label htmlFor="cardholder" className="text-[#b4b4b4]">نام دارنده کارت</label>
                <input
                  type="text"
                  id="cardholder"
                  value={paymentDetails.cardholder}
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, cardholder: e.target.value })
                  }
                  className={`w-full h-12 p-4 border border-[#e1e1e1] rounded text-[#2e2e2e] ${warning && !paymentDetails.cardholder ? "border-[#f62f5e]" : ""}`}
                />
                <div className="small-inputs flex justify-between mt-5">
                  <div className="w-[182px]">
                    <label htmlFor="date" className="text-[#b4b4b4]">تاریخ انقضا</label>
                    <input
                      type="text"
                      id="date"
                      value={paymentDetails.expiryDate}
                      onChange={(e) =>
                        setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })
                      }
                      placeholder="MM / YY"
                      className={`w-full h-12 p-4 border border-[#e1e1e1] rounded text-[#2e2e2e] ${warning && !paymentDetails.expiryDate ? "border-[#f62f5e]" : ""}`}
                    />
                  </div>
                  <div className="w-[182px]">
                    <label htmlFor="verification" className="text-[#b4b4b4]">CVV / CVC *</label>
                    <input
                      type="password"
                      id="verification"
                      value={paymentDetails.cvv}
                      onChange={(e) =>
                        setPaymentDetails({ ...paymentDetails, cvv: e.target.value })
                      }
                      className={`w-full h-12 p-4 border border-[#e1e1e1] rounded text-[#2e2e2e] ${warning && !paymentDetails.cvv ? "border-[#f62f5e]" : ""}`}
                    />
                  </div>
                </div>
              </div>

              <div className="column-2 w-full sm:w-[382px]">
                <label htmlFor="cardnumber" className="text-[#b4b4b4]">شماره کارت</label>
                <input
                  type="password"
                  id="cardnumber"
                  value={paymentDetails.cardNumber}
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })
                  }
                  className={`w-full h-12 p-4 border border-[#e1e1e1] rounded text-[#2e2e2e] ${warning && !paymentDetails.cardNumber ? "border-[#f62f5e]" : ""}`}
                />
                <span className="info text-[#2e2e2e] opacity-50 text-xs mt-12 block">
                  * CVV یا CVC کد امنیتی کارت شما است که سه رقم جدا از شماره
                  کارت در پشت آن قرار دارد.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Completion */}
        {step === 4 && (
          <div>
            <h3>تکمیل اطلاعات</h3>
            {/* Additional form or confirmation details */}
            <p>مراحل پرداخت تکمیل شده است.</p>
          </div>
        )}
      </div>

      <div className="panel-footer flex w-full h-[96px] px-5 absolute bottom-0 justify-between items-center bg-white border-t border-[#e1e1e1]">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="back w-[150px] h-[48px] rounded bg-[#f62f5e] text-white text-sm font-bold"
          >
            مرحله قبلی
          </button>
        )}
        {step !== 4 && (
          <button
            onClick={handleNextStep}
            className="next w-[150px] h-[48px] rounded bg-[#f62f5e] text-white text-sm font-bold"
          >
            مرحله بعدی
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
