import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WeatherContext from "../ContextAPI";
import AdressOptions from "../components/AdressOptions";
import WeatherMain from "../components/WeatherMain";
import WeatherDetails from "../components/WeatherDetails";
import DailyForecast from "../components/DailyForecast";
import { useContext } from "react";

function Home() {
    const { input, setAdress, adressOptions, setAdressOptions, setWeather, weatherCurrent, setWeatherCurrent, setWeatherMinutely, setWeatherHourly, setWeatherDaily } = useContext(WeatherContext);

    useEffect(() => {
        if (input) {
            _getAdressLongLat().then((data) => {
                if (data.length > 1) {
                    setAdressOptions(data);
                } else {
                    setAdress(data[0]);
                    _getWeather(data[0].longitude, data[0].latitude).then((data) => {
                        setWeather(data);
                        setWeatherCurrent(data.current);
                        setWeatherMinutely(data.minutely);
                        setWeatherHourly(data.hourly);
                        setWeatherDaily(data.daily);
                        console.log(data);
                    });
                }
            });
        }
    }, [input]);

    const _getAdressLongLat = async () => {
        const api = await fetch(`http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_GEOLOCATION_API_KEY}&query=${input}&limit=10&output=json`);
        const log = await api.json();
        return log.data;
    };

    const _getWeather = async (lon, lat) => {
        const api = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
        const log = await api.json();
        console.log(log);
        return log;
    };
    return (
        <>
            <>{adressOptions && <AdressOptions />}</>
            <>
                {weatherCurrent && (
                    <>
                        <HomeStyled>
                            <WeatherMain />
                            <WeatherDetails />
                            <DailyForecast />
                        </HomeStyled>
                    </>
                )}
            </>
        </>
    );
}

const AdressOptionsStyled = styled.div`
    position: relative;
    display: flex;
    z-index: 15;
    margin-top: 10vh;
    height: fit-content;

    .adress_option {
        background-color: green;
        margin-right: 1rem;
    }
`;

const DailyForecastStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 1rem;
    padding: 0 5vw;

    .daily {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 3rem 2rem;
        border-radius: 0.5rem;
        background-color: rgba(23, 31, 104, 0.85);
        box-shadow: 0px 0px 12px 5px rgba(23, 31, 104, 0.55);
        position: relative;
        z-index: 2;
        text-shadow: 1px 1px black;

        h3:first-child {
            text-transform: capitalize;
            font-size: 2rem;
        }

        h3:nth-child(3) {
            margin-bottom: 1rem;
        }

        h3 {
            text-align: center;

            span {
                opacity: 0.6;
            }
        }

        &:hover {
            .daily_info {
                display: block;
            }
        }

        .daily_info {
            display: none;
            position: absolute;
            top: 0;
            transform: translateY(-102%);
            width: 115%;
            background-color: rgba(23, 31, 104, 1);
            box-shadow: 0px 0px 12px 5px rgba(23, 31, 104, 0.55);
            border-radius: 0.5rem;

            .daily {
                &_minmax,
                &_sun,
                &_det,
                &_quarterly {
                    display: flex;
                    flex-wrap: wrap;
                    margin: 1rem 0.5rem;

                    p {
                        width: 50%;
                        text-align: center;
                        font-weight: 700;
                        font-size: 1.2rem;
                    }

                    span {
                        text-transform: uppercase;
                        opacity: 0.7;
                        font-weight: 400;
                        font-size: 0.7rem;
                    }
                }

                &_det {
                    p:last-child {
                        width: 100%;
                    }
                }

                &_minmax,
                &_sun,
                &_det {
                    :after {
                        content: "";
                        display: block;
                        background-color: rgba(255, 255, 255, 0.1);
                        box-shadow: 0px 0px 4px 1px rgba(255, 255, 255, 0.1);
                        width: 5rem;
                        height: 1px;
                        margin: auto;
                        transform: translateY(calc(1rem - 1px));
                    }
                }
            }

            &:hover {
                display: block;
            }
        }
    }

    @media (max-width: 500px) {
        margin-bottom: 2rem;
    }
`;

const HomeTop = styled.div`
    padding: 0 15vw;

    #home_top_inner {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));

        align-items: center;
        z-index: 2;

        #location {
            text-align: center;

            #city {
                font-size: 4rem;
            }

            #region {
                font-size: 1.75rem;
            }

            #current_time {
                font-size: 2.5rem;
                text-transform: capitalize;
            }
        }

        #temp {
            display: flex;
            align-items: center;
            &_icon {
                width: 15rem;
                height: 15rem;
            }
            &_deg {
                font-size: 10rem;
                position: relative;

                span {
                    position: absolute;
                    font-size: 4rem;
                    top: 1rem;
                }
            }
        }

        #weather_desc {
            font-size: 2rem;

            #desc {
                text-transform: capitalize;
            }

            #feels_like {
                margin: 1rem 0 1.5rem;
                text-transform: uppercase;
                line-height: 1;
                span {
                    font-size: 1.6rem;
                    opacity: 0.7;
                    margin-right: 0.5rem;
                }
            }

            h3:nth-last-child(-n + 2) {
                font-size: 1.5rem;
                span {
                    opacity: 0.7;
                    font-size: 1rem;
                    text-transform: uppercase;
                    margin-right: 0.5rem;
                }
            }
        }

        #location,
        #temp,
        #weather_desc {
            z-index: 2;
            align-self: center;
            justify-self: center;
        }
    }

    @media (max-width: 1600px) {
        padding: 0 10vw;
        #home_top_inner {
            #location {
                #city {
                    font-size: 3rem;
                }

                #region {
                    font-size: 1.2rem;
                }

                #current_time {
                    font-size: 1.5rem;
                    text-transform: capitalize;
                }
            }

            #temp {
                &_icon {
                    width: 10rem;
                    height: 10rem;
                }
                &_deg {
                    font-size: 7rem;

                    span {
                        font-size: 4rem;
                        top: 0rem;
                    }
                }
            }

            #weather_desc {
                font-size: 1.5rem;

                #desc {
                    text-transform: capitalize;
                }

                #feels_like {
                    margin: 0.5rem 0;
                    span {
                        font-size: 1.2rem;
                    }
                }

                h3:nth-last-child(-n + 2) {
                    font-size: 1.5rem;
                    span {
                        font-size: 1rem;
                    }
                }
            }
        }
    }

    @media (min-width: 500px) and (max-width: 1200px) {
        #home_top_inner {
            grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));

            #weather_desc {
                display: flex;
                font-size: 1.2rem;
                grid-area: 2 / 1 / 3 / 3;
                align-items: center;

                #desc {
                    text-transform: capitalize;
                }

                #feels_like {
                    margin: 0.5rem 2rem 0.5rem 0;
                    span {
                        font-size: 1rem;
                    }
                }

                h3:nth-last-child(-n + 2) {
                    font-size: 1.5rem;
                    span {
                        font-size: 1rem;
                    }
                }

                h3:not(:last-child) {
                    margin-right: 2rem;
                }
            }
        }
    }
    @media (max-width: 920px) {
        #home_top_inner {
            #weather_desc {
                h3 {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                }
            }
        }
    }

    @media (max-width: 500px) {
        height: 90vh;
        padding: 0;

        #home_top_inner {
            height: 100%;
            grid-template-columns: 1fr;
            grid-template-rows: repeat(auto-fit, 1fr);
            justify-content: center;

            text-align: center;

            #temp {
                &_icon {
                    width: auto;
                    height: auto;
                }
            }
        }
    }
`;

const HomeDetails = styled.div`
    margin: 2rem 0;

    #home_details_inner {
        padding: 0 20vw;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-column-gap: 1rem;
        grid-row-gap: 2rem;

        .detail {
            text-align: center;
            justify-self: center;
            z-index: 2;

            h2 {
                font-size: 2rem;
                text-transform: capitalize;
                margin-bottom: 1rem;
                opacity: 0.8;
            }

            h3 {
                font-size: 1.5rem;
            }
        }
    }

    @media (max-width: 1200px) {
        margin: 5rem 0;
    }

    @media (max-width: 500px) {
        #home_details_inner {
            padding: 2rem 0;
            grid-template-columns: repeat(auto-fit, minmax(185px, 190px));
            grid-column-gap: 0;
            grid-row-gap: 4rem;

            .detail {
                h2 {
                    font-size: 1.5rem;
                }

                h3 {
                    font-size: 1.2rem;
                }
            }
        }
    }
`;

const HomeStyled = styled.div`
    margin-top: 10vh;
    min-height: 90vh;
    height: fit-content;
    width: 100vw;
    z-index: 11;
    color: rgba(255, 255, 255, 1);
    font-family: "Montserrat", sans-serif;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

export default Home;
