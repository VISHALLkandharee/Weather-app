import React from "react";
import useWeatherQuery from "./UseWeatherQuery";
import { getWeatherImage, getTimeOfDay } from "../utils/weatherImages";

const WeatherCard = ({ city, deg }) => {
  const { data, isLoading, isError, error } = useWeatherQuery({ city });

  const currentHour = new Date().getHours();
  let currentItem =
    data?.weatherData?.list?.find(
      (item) => new Date(item.dt_txt).getHours() === currentHour
    ) || data?.weatherData?.list?.[0];

  const weatherIcon = currentItem?.weather?.[0]?.icon;
  const timeOfDay = getTimeOfDay(currentItem?.dt_txt || Date.now());
  const weatherImageSrc = getWeatherImage(weatherIcon, timeOfDay);

  const temp =
    deg === "celcius"
      ? currentItem?.main?.temp
      : (currentItem?.main?.temp * 9) / 5 + 32;
  const feelsLike =
    deg === "celcius"
      ? currentItem?.main?.feels_like
      : (currentItem?.main?.feels_like * 9) / 5 + 32;

  if (isLoading) return <div className="w-full text-center py-4">Loading...</div>;

  if (isError)
    return (
      <div className="w-full text-center py-4 text-red-500">
        {error.message}
      </div>
    );

  return (
    <div className="font-medium flex flex-col h-full w-full md:w-1/2 gap-4">
      {/* Header */}
      <div className="text-xs sm:text-sm flex justify-between items-center">
        <div className="font-semibold">Current Weather</div>
        <span className="text-[11px] sm:text-xs opacity-80">
          {new Date().toLocaleTimeString()}
        </span>
      </div>

      {/* Main temperature + description */}
      <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="p-2 w-24 h-24 sm:w-28 sm:h-28 bg-white/10 rounded-2xl flex items-center justify-center">
          <img
            className="w-full h-full object-contain"
            src={weatherImageSrc}
            alt={`${currentItem?.weather?.[0]?.description || "weather"} icon`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-2 sm:gap-3">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-semibold">
              {Number.isFinite(temp) ? Math.floor(temp) : "–"}
            </div>
            <span className="text-3xl sm:text-4xl lg:text-5xl">
              {deg === "celcius" ? "°C" : "°F"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <p className="text-base sm:text-lg capitalize">
              {currentItem?.weather?.[0]?.description || "Clear"}
            </p>
            <div className="text-xs sm:text-sm opacity-80">
              Feels like{" "}
              <span className="ml-1 font-medium">
                {Number.isFinite(feelsLike)
                  ? Math.floor(feelsLike) + "°"
                  : "–"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expected temp text */}
      <div className="text-xs sm:text-sm leading-relaxed bg-black/5 dark:bg-white/5 rounded-xl px-3 py-2">
        The maximum temperature will be{" "}
        <span className="font-semibold">
          {currentItem?.main?.temp_max ?? "–"}
        </span>{" "}
        approximately.
        {currentItem?.main?.temp_max < 20 && (
          <span className="ml-1 text-blue-700 dark:text-blue-300">
            Be active, it is cold out there.
          </span>
        )}
        {currentItem?.main?.temp_max > 40 && (
          <span className="ml-1 text-red-700 dark:text-red-300">
            Be careful, it is hot out there.
          </span>
        )}
      </div>

      {/* Metrics grid */}
      <div className="mt-auto grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
        <div className="text-center p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:translate-y-1 transition-transform">
          <div className="uppercase tracking-wide opacity-70">Wind</div>
          <span className="block mt-1 text-sm sm:text-base font-semibold">
            {Number.isFinite(currentItem?.wind?.speed)
              ? (currentItem.wind.speed * 3.6).toFixed(1)
              : "–"}{" "}
            <span className="text-[11px] opacity-70">km/h</span>
          </span>
        </div>

        <div className="text-center p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:translate-y-1 transition-transform">
          <div className="uppercase tracking-wide opacity-70">Humidity</div>
          <span className="block mt-1 text-sm sm:text-base font-semibold">
            {currentItem?.main?.humidity ?? "–"}{" "}
            <span className="text-[11px] opacity-70">%</span>
          </span>
        </div>

        <div className="text-center p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:translate-y-1 transition-transform">
          <div className="uppercase tracking-wide opacity-70">Visibility</div>
          <span className="block mt-1 text-sm sm:text-base font-semibold">
            {Number.isFinite(currentItem?.visibility)
              ? (currentItem.visibility / 1000).toFixed(1)
              : "–"}{" "}
            <span className="text-[11px] opacity-70">km</span>
          </span>
        </div>

        <div className="text-center p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:translate-y-1 transition-transform">
          <div className="uppercase tracking-wide opacity-70">Pressure</div>
          <span className="block mt-1 text-sm sm:text-base font-semibold">
            {currentItem?.main?.pressure ?? "–"}{" "}
            <span className="text-[11px] opacity-70">mb</span>
          </span>
        </div>

        <div className="text-center p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:translate-y-1 transition-transform col-span-2 sm:col-span-1">
          <div className="uppercase tracking-wide opacity-70">Sea level</div>
          <span className="block mt-1 text-sm sm:text-base font-semibold">
            {currentItem?.main?.sea_level ?? "N/A"}{" "}
            <span className="text-[11px] opacity-70">hPa</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
