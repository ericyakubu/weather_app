import React from "react";
import styled from "styled-components";
import WeatherContext from "../ContextAPI";
import { useContext } from "react";

function AdressOptions() {
    const { adressOptions, setAdressOptions, setAdress, setWeather, setWeatherCurrent, setWeatherMinutely, setWeatherHourly, setWeatherDaily } = useContext(WeatherContext);

    const _getWeather = async (lon, lat) => {
        const api = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
        const log = await api.json();
        console.log(log);
        return log;
    };

    const _gotAdress = async (data) => {
        console.log(data);
        setAdress(data);
        setAdressOptions(null);
        _getWeather(data.properties.lon, data.properties.lat).then((data) => {
            setWeather(data);
            setWeatherCurrent(data.current);
            setWeatherMinutely(data.minutely);
            setWeatherHourly(data.hourly);
            setWeatherDaily(data.daily);
            console.log(data);
        });

        console.log("got adress");
    };

    return (
        <Container>
            <AdressOptionsStyled>
                {adressOptions.map((e) => (
                    <div
                        key={e.properties.lat}
                        className="adress_option"
                        onClick={() => {
                            _gotAdress(e);
                        }}
                    >
                        <h3 className="country">{e.properties.country}</h3>
                        <h3 className="region">{e.properties.state}</h3>
                        <h3>{e.properties.district}</h3>
                        <h3>{e.properties.postcode}</h3>
                        <h3 className="label">{e.properties.label}</h3>
                    </div>
                ))}
            </AdressOptionsStyled>
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    width: 100%;
    transform: translate(-50%, -50%);

    @media (max-width: 1024px) {
        top: 12.5%;
        transform: translate(-50%, -0%);
    }
`;

const AdressOptionsStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 1rem;
    padding: 0 5vw;
    position: relative;

    color: rgba(255, 255, 255, 0.95);

    .adress_option {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 1rem;
        border-radius: 0.5rem;
        background-color: rgba(23, 31, 104, 0.85);
        box-shadow: 0px 0px 12px 5px rgba(23, 31, 104, 0.55);
        position: relative;
        z-index: 2;
        text-shadow: 1px 1px black;
        transition: all 0.5s ease;

        .country {
            text-transform: capitalize;
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        .region {
            margin-bottom: 2rem;
            :after {
                content: "";
                display: block;
                background-color: rgba(255, 255, 255, 0.1);
                box-shadow: 0px 0px 4px 1px rgba(255, 255, 255, 0.1);
                width: 5rem;
                height: 1px;
                margin: auto;
                transform: translateY(calc(1rem - 1px));
                transition: all 0.5s ease;
            }
        }

        .label {
            margin-top: 2rem;
        }

        h3 {
            text-align: center;
        }

        &:hover {
            cursor: pointer;
            background-color: rgba(23, 31, 104, 1);
            box-shadow: 0px 0px 12px 5px rgba(23, 31, 104, 0.75);

            .region {
                :after {
                    background-color: rgba(255, 255, 255, 0.2);
                    box-shadow: 0px 0px 4px 1px rgba(255, 255, 255, 0.2);
                }
            }
        }
    }

    @media (max-width: 500px) {
        margin-bottom: 2rem;
    }
`;

export default AdressOptions;
