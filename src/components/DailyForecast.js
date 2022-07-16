import React from "react";
import styled from "styled-components";
import WeatherContext from "../ContextAPI";
import { useContext } from "react";

function DailyForecast() {
    const { weatherDaily } = useContext(WeatherContext);

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
    return (
        <Daily>
            {weatherDaily.map((e) => (
                <div className="daily" key={e.moonrise}>
                    <h3>
                        {_getWeekDay(e.dt)} {_getWeekDate(e.dt)}
                    </h3>
                    <img src={`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`} alt="" className="daily_temp_icon" />
                    <h3>
                        <span>Day Time</span> <br /> {Math.round(e.temp.day)}°
                    </h3>
                    <h3>
                        <span>Feels Like</span>
                        <br />
                        {Math.round(e.feels_like.day)}°
                    </h3>

                    <div className="daily_info">
                        <div className="daily_minmax">
                            <p>
                                <span>max</span> <br /> {Math.round(e.temp.max)}°
                            </p>
                            <p>
                                <span>min</span> <br /> {Math.round(e.temp.min)}°
                            </p>
                        </div>
                        <div className="daily_sun">
                            <p>
                                <span>sunrise</span> <br /> {_sunSetRise(e.sunrise)}am
                            </p>
                            <p>
                                <span>sunset</span> <br /> {_sunSetRise(e.sunset)}pm
                            </p>
                        </div>
                        <div className="daily_det">
                            <p>
                                <span>uvi</span> <br /> {e.uvi}
                            </p>
                            <p>
                                <span>pressure</span> <br /> {e.pressure} hPa
                            </p>
                            <p>
                                <span>wind speed</span> <br /> {Math.round(e.wind_speed)}
                            </p>
                            <p>
                                <span>humidity</span> <br /> {e.humidity}%
                            </p>
                            <p>
                                <span>dew point</span> <br /> {Math.round(e.dew_point)}°
                            </p>
                        </div>
                        <div className="daily_quarterly">
                            <p>
                                <span>morn</span> <br /> {Math.round(e.temp.morn)}°
                            </p>
                            <p>
                                <span>day</span> <br /> {Math.round(e.temp.day)}°
                            </p>
                            <p>
                                <span>eve</span> <br /> {Math.round(e.temp.eve)}°
                            </p>
                            <p>
                                <span>night</span> <br /> {Math.round(e.temp.night)}°
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </Daily>
    );
}

const Daily = styled.div`
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
        .daily_temp_icon {
            position: relative;
            width: 7.5rem;
            height: 7.5rem;
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

export default DailyForecast;
