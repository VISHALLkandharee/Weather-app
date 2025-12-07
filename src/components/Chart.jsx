import React from "react";
import useWeatherQuery from "./UseWeatherQuery";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Chart = ({ city }) => {
  const { data, isLoading, isError, error } = useWeatherQuery({ city });

  if (isLoading) return <div className="w-full text-center py-4">Loading...</div>;
  if (isError)
    return (
      <div className="w-full text-center py-4 text-red-500">
        {error.message}
      </div>
    );

  const hourlyData =
    data?.weatherData?.list?.filter((item) => {
      const currentDate = new Date();
      const itemDate = new Date(item.dt_txt);
      return itemDate.toDateString() === currentDate.toDateString();
    }) || [];

  const labels =
    hourlyData.map((item) =>
      new Date(item.dt_txt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    ) || [];

  const temps = hourlyData.map((item) => Math.round(item.main.temp)) || [];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temps,
        borderColor: "#d97706",
        backgroundColor: "rgba(251, 191, 36, 0.25)",
        tension: 0.4,
        fill: true,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allow container to control height [web:48][web:57]
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: `Hourly Temperature - ${city}` },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y}°C`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 6,
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          callback: (v) => v + "°C",
        },
      },
    },
  };

  return (
    <div className="w-full md:w-1/2 bg-[#f9f9f9]/80 dark:bg-[#111827] h-64 sm:h-72 md:h-full p-3 rounded-xl flex items-center">
      <div className="relative w-full h-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Chart;
