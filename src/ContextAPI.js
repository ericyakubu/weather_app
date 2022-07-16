import { createContext, useState } from "react";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
    const [input, setInput] = useState("");
    const [adress, setAdress] = useState(null);
    const [adressOptions, setAdressOptions] = useState(null);
    const [weather, setWeather] = useState({});
    const [weatherCurrent, setWeatherCurrent] = useState(null);
    const [weatherDaily, setWeatherDaily] = useState(null);
    const [weatherHourly, setWeatherHourly] = useState(null);
    const [weatherMinutely, setWeatherMinutely] = useState(null);

    return (
        <WeatherContext.Provider
            value={{
                input,
                setInput,
                adress,
                setAdress,
                adressOptions,
                setAdressOptions,
                weather,
                setWeather,
                weatherCurrent,
                setWeatherCurrent,
                weatherMinutely,
                setWeatherMinutely,
                weatherHourly,
                setWeatherHourly,
                weatherDaily,
                setWeatherDaily,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
}

export default WeatherContext;
