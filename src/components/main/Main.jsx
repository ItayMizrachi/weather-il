import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCityData } from "../../features/cities/citySlice";
import Forecast from "./Forecast";
import Now from "./Now";
import LaterToday from "./LaterToday";
import Map from "./Map";
import useWeatherApi from "../../../hooks/useWeatherApi";

const Main = () => {
  const cityData = useSelector(selectCityData);
  const {
    fetchWeatherData,
    fetchForecast,
    fetchHourlyData,
    currentWeather,
    forecast,
    hourlyData,
  } = useWeatherApi();

    // Fetch weather data when city data changes
  useEffect(() => {
    if (cityData && cityData.length > 0 && cityData[0].Key) {
      fetchWeatherData(cityData[0].Key);
      fetchForecast(cityData[0].Key);
      fetchHourlyData(cityData[0].Key);
    }
  }, [cityData]);

  if (!cityData || cityData.length === 0) {
    return <div className="p-4">City not found</div>;
  }

  return (
    <main className="grid md:grid-cols-10 mt-4">
      <section className="col-span-full md:col-span-3">
        <Now currentWeather={currentWeather} />
        <h2 className="font-semibold text-xl my-4">5 Days Forecast</h2>
        <div className="bg-base-200 rounded-xl shadow-xl border border-base-300">
          {forecast &&
            forecast.DailyForecasts.map((day, index) => (
              <div key={index} className="">
                <Forecast day={day} />
              </div>
            ))}
        </div>
      </section>
      <section className="col-span-full md:col-span-7">
        <Map />
        <LaterToday hourlyData={hourlyData} />
      </section>
    </main>
  );
};

export default Main;
