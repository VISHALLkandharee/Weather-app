import React, { useState, useMemo } from "react";
import WeatherCard from "./components/WeatherCard";
import Day from "./components/Day";
import useWeatherQuery from "./components/UseWeatherQuery";
import { getWeatherImage, getTimeOfDay } from "./utils/weatherImages";
import Chart from "./components/Chart";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const App = () => {
  const [cityName, setCityName] = useState("");
  const [selectedCity, setSelectedCity] = useState("sindh");
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "Light";
  });
  const [degree, setDegree] = useState("celcius");

  const handleSearch = () => {
    if (cityName.trim()) setSelectedCity(cityName.trim());
  };

  const { data, isLoading, isError } = useWeatherQuery({ city: selectedCity });

  const dailySummaries = useMemo(() => {
    const list = data?.weatherData?.list || [];
    if (!list.length) return [];

    const byDate = new Map();
    for (const item of list) {
      const date = new Date(item.dt_txt);
      const key = date.toISOString().slice(0, 10); // YYYY-MM-DD
      const temp = item?.main?.temp;
      const icon = item?.weather?.[0]?.icon;
      if (!byDate.has(key)) {
        byDate.set(key, { max: temp, icon, sample: item });
      } else {
        const prev = byDate.get(key);
        if (temp > prev.max) {
          byDate.set(key, { max: temp, icon, sample: item });
        }
      }
    }

    const result = Array.from(byDate.entries()).map(([key, info]) => {
      const d = new Date(key);
      const dayLabel =
        days[d.getDay() === 0 ? 6 : d.getDay() - 1] ||
        d.toLocaleDateString(undefined, { weekday: "short" });
      const dateLabel = d.getDate();
      const timeOfDay = getTimeOfDay(info.sample?.dt_txt || Date.now());
      const iconSrc = info.icon
        ? getWeatherImage(info.icon, timeOfDay)
        : undefined;
      return { key, dayLabel, dateLabel, temp: info.max, iconSrc };
    });

    return result.slice(0, 5);
  }, [data]);

  const isDark = theme === "Dark";

  return (
    <div
      className={`min-h-screen w-full px-4 py-4 font-medium
      ${
        isDark
          ? "bg-gradient-to-b from-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-b from-blue-300 to-blue-100 text-black"
      }`}
    >
      {/* Top bar */}
      <div
        id="TopBar"
        className="w-full max-w-5xl mx-auto p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-xl"
      >
        {/* Search */}
        <div
          id="SearchConatiner"
          className="flex-1 bg-white/80 text-black p-2 px-4 flex items-center gap-2 rounded-xl"
        >
          <input
            className="flex-1 bg-transparent focus:outline-none text-sm sm:text-base"
            type="search"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Search city"
          />
          <button
            onClick={handleSearch}
            className="cursor-pointer text-gray-600 hover:text-gray-800"
          >
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </div>

        {/* Toggles */}
        <div
          id="toggleBtns"
          className="flex gap-3 justify-between md:justify-end"
        >
          <button className="text-black py-2 px-4 bg-[#f9f9f9] rounded-xl">
            <select
              name="Theme"
              id="Theme"
              onChange={(e) => {
                setTheme(e.target.value);
                localStorage.setItem("theme", e.target.value);
              }}
              className="focus:outline-none bg-transparent text-sm"
              value={theme}
            >
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </button>

          <button className="text-blue-400 py-2 px-4 bg-[#f7f7f7] rounded-xl">
            <select
              name="degree"
              id="degree"
              className="focus:outline-none bg-transparent text-sm text-blue-500"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            >
              <option value="celcius">Celsius</option>
              <option value="fehrenhiet">Fahrenheit</option>
            </select>
          </button>
        </div>
      </div>

      {/* Location */}
      <div
        id="locationTitle"
        className="w-full max-w-5xl mx-auto mt-3 px-3 py-2 rounded border border-gray-300/70 flex items-center gap-2 text-sm sm:text-base"
      >
        <span>
          <svg
            className="inline-block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill={isDark ? "#fff" : "#000"}
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
          </svg>
        </span>
        <span className="truncate">
          {data?.weatherData?.city?.name || "—"},{" "}
          {data?.weatherData?.city?.country || ""}
        </span>
      </div>

      {/* Weather + chart */}
      <div
        id="weatherContainer"
        className={`w-full max-w-5xl mx-auto mt-4 rounded-xl p-3 flex flex-col gap-4 md:flex-row ${
          isDark ? "bg-[#1a1a1a]" : "bg-[#f7f7f7]"
        }`}
      >
        <WeatherCard deg={degree} city={selectedCity} />
        <Chart city={selectedCity} />
      </div>

      {/* Daily timeline */}
      <div
        id="weatherTimelineContainer"
        className="w-full max-w-5xl mx-auto mt-4 p-2 flex flex-col md:flex-row gap-3 items-start md:items-center rounded"
      >
        <h3 className="capitalize py-2 px-5 bg-sky-700 text-black rounded hover:bg-sky-800 text-sm sm:text-base">
          Daily
        </h3>

        <ul
          id="weatherTimeline"
          className="flex flex-wrap gap-3 w-full md:w-[70%] p-1"
        >
          {isLoading && (
            <>
              <Day key="skeleton-1" />
              <Day key="skeleton-2" />
              <Day key="skeleton-3" />
            </>
          )}
          {!isLoading &&
            !isError &&
            dailySummaries.map((d) => (
              <Day
                key={d.key}
                dateLabel={d.dateLabel}
                dayLabel={d.dayLabel}
                temp={d.temp}
                iconSrc={d.iconSrc}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
