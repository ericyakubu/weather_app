import React from "react";
import styled from "styled-components";
import WeatherContext from "../ContextAPI";
import { useContext } from "react";

function WeatherMain() {
    const { weatherCurrent, adress } = useContext(WeatherContext);

    const _getWeekDay = (x) => {
        let date = new Date(x * 1000);

        switch (date.getDay()) {
            case 0:
                return "sun";
            case 1:
                return "mon";
            case 2:
                return "tue";
            case 3:
                return "wed";
            case 4:
                return "thu";
            case 5:
                return "fri";
            case 6:
                return "sat";
            default:
                return null;
        }
    };
    const _getWeekDate = (x) => {
        let date = new Date(x * 1000);

        return date.getDate();
    };
    const _sunSetRise = (time) => {
        const x = new Date(time * 1000);
        const sunH = x.getHours();
        const sunM = x.getMinutes();
        return `${sunH} : ${sunM < 10 ? `0${sunM}` : `${sunM}`}`;
    };

    console.log(adress);

    const time = new Date(weatherCurrent.dt * 1000);

    return (
        <HomeTop>
            <div id="home_top_inner">
                <div id="location">
                    <h1 id="city">{adress.properties.city}</h1>
                    <h3 id="region">
                        {adress.properties.state}, <span>{adress.properties.country_code}</span>
                    </h3>
                    <h4 id="current_time">
                        {`${_getWeekDay(weatherCurrent.dt)} ${_getWeekDate(weatherCurrent.dt)}, `}
                        {time.getHours() < 12
                            ? `${time.getHours()} : ${time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`}am`
                            : `${time.getHours()} : ${time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`}pm`}
                    </h4>
                </div>
                <div id="temp">
                    <img src={`http://openweathermap.org/img/wn/${weatherCurrent.weather[0].icon}@2x.png`} alt="" id="temp_icon" />
                    <h1 id="temp_deg">
                        {Math.round(weatherCurrent.temp)}
                        <span>°</span>
                    </h1>
                </div>
                <div id="weather_desc">
                    <h3 id="desc">{weatherCurrent.weather[0].description}</h3>
                    <h3 id="feels_like">
                        <span>feels like </span>
                        {Math.round(weatherCurrent.feels_like)}°
                    </h3>
                    <h3>
                        <span>Sunrise:</span> {_sunSetRise(weatherCurrent.sunrise)}
                    </h3>
                    <h3>
                        <span>Sunset:</span> {_sunSetRise(weatherCurrent.sunset)}
                    </h3>
                </div>
            </div>
        </HomeTop>
    );
}

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

                span {
                    text-transform: uppercase;
                }
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
                position: relative;
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

export default WeatherMain;
