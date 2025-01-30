import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = new Date(targetDate) - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-wrap rounded-xl items-center justify-center w-max mx-auto p-3  count-down-main bg-indigo-50 rtl">
      {Object.entries(timeLeft).map(([key, value], index) => (
        <React.Fragment key={key}>
          <div className="timer">
            <div className="rounded-xl py-2 flex items-center justify-center flex-col aspect-square px-1 w-16 sm:w-20">
              <h3 className="countdown-element font-manrope font-semibold text-xl text-indigo-600 text-center">
                {value.toString().padStart(2, "0")}
              </h3>
              <p className="text-lg font-Cormorant font-normal text-indigo-600 text-center w-full">
                {key === "days"
                  ? "روز"
                  : key === "hours"
                  ? "ساعت"
                  : key === "minutes"
                  ? "دقیقه"
                  : "ثانیه"}
              </p>
            </div>
          </div>
          {index < Object.entries(timeLeft).length - 1 && (
            <h3 className="font-manrope font-semibold text-2xl text-indigo-600">
              :
            </h3>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CountdownTimer;
