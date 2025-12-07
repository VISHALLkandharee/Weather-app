import { useQuery } from "@tanstack/react-query";
import GetWeatherByCity from "./GetWeatherByCity";




const useWeatherQuery = ({ city }) => {
  const result = useQuery({
    queryKey: ["weatherData", city],
    queryFn: () => GetWeatherByCity({ city }),
    staleTime : 1000 * 60 * 60 * 24,
  });

  return result;
};

export default useWeatherQuery;
