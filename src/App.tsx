import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCity("");
  };

  useEffect(() => {
    document.title = city ? `Weather in ${city}` : "Weather App";

    if (!city) return;

    async function fetchWeather() {
      try {
        const url = `https://wttr.in/${city.toLowerCase()}?format=%C+%t`;
        const response = await axios.get(url, { responseType: "text" });
        setWeather(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    }

    fetchWeather();
  }, [city]);

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-rose-600 to-fuchsia-600">
      <div className="h-[50%] w-[50%] rounded-2xl bg-white/20 backdrop-blur-md">
        <h1 className="my-2 text-center text-3xl font-bold text-neutral-200">
          Weather APP
        </h1>

        <form
          action="submit"
          onSubmit={handleSubmit}
          className="flex justify-center"
        >
          <div className="relative w-80">
            <input
              type="text"
              name="City"
              value={city}
              placeholder="Enter city name"
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-lg border-none bg-neutral-50 px-5 py-2 pr-12 text-neutral-700 shadow-lg transition duration-200 outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-neutral-200"
            />
            <button type="submit" aria-label="submit form">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                className="absolute top-1/2 right-3 h-6 w-6 -translate-y-1/2 text-blue-500"
                fill="currentColor"
              >
                <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM352 240C352 195.8 316.2 160 272 160C227.8 160 192 195.8 192 240C192 288.8 238.5 351.6 260.6 378.6C266.6 385.9 277.4 385.9 283.3 378.6C305.4 351.6 351.9 288.8 351.9 240zM240 240C240 222.3 254.3 208 272 208C289.7 208 304 222.3 304 240C304 257.7 289.7 272 272 272C254.3 272 240 257.7 240 240z" />
              </svg>
            </button>
          </div>
        </form>
        <div className="my-10 flex justify-center text-3xl">
          <p>{weather}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
