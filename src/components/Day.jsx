import React from "react";
import defaultWeatherImg from "../assets/MostlySunnyDay.svg";

const Day = ({ dateLabel, dayLabel, temp, iconSrc }) => {
  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: "short",
  });

  return (
    <li className="flex-1 min-w-[110px] max-w-[140px]">
      <div className="flex flex-col justify-between gap-2 w-full h-28 sm:h-32 bg-[#60edef] rounded-md px-2 py-2 text-black">
        <div className="flex justify-between text-xs sm:text-sm font-medium">
          <span>{dateLabel ?? "--"}</span>
          <span>{dayLabel === todayLabel ? "Today" : dayLabel}</span>
        </div>

        <div className="flex items-center gap-2">
          <img
            src={iconSrc || defaultWeatherImg}
            alt="weather icon"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
          <span className="text-base sm:text-lg font-semibold">
            {Number.isFinite(temp) ? Math.round(temp) + "°" : "--"}
          </span>
        </div>
      </div>
    </li>
  );
};

export default Day;
