import React from "react";
import styled from "styled-components";
import WeatherContext from "../ContextAPI";
import { useContext } from "react";

function WeatherDetails() {
    const { weatherCurrent } = useContext(WeatherContext);
    return (
        <HomeDetails>
            <div id="home_details_inner">
                <div className="detail">
                    <h2>wind speed</h2>
                    <h3>
                        {Math.round(weatherCurrent.wind_speed)}
                        m/s | {Math.round(weatherCurrent.wind_speed * 3.6)}
                        km/h
                    </h3>
                </div>
                <div className="detail">
                    <h2>humidity</h2>
                    <h3>{weatherCurrent.humidity}%</h3>
                </div>
                <div className="detail">
                    <h2>visibility</h2>
                    <h3>{weatherCurrent.visibility / 1000}km</h3>
                </div>
                <div className="detail">
                    <h2>pressure</h2>
                    <h3>{weatherCurrent.pressure} hPa</h3>
                </div>
                <div className="detail">
                    <h2>dew point</h2>
                    <h3>{Math.round(weatherCurrent.dew_point)}°</h3>
                </div>
                {weatherCurrent.rain && (
                    <div className="detail">
                        <h2>rain volume</h2>
                        <h3>
                            {Object.values(weatherCurrent.rain)[0]}
                            mm
                        </h3>
                    </div>
                )}
                {weatherCurrent.snow && (
                    <div className="detail">
                        <h2>snow volume</h2>
                        <h3>
                            {Object.values(weatherCurrent.snow)[0]}
                            mm
                        </h3>
                    </div>
                )}
            </div>
        </HomeDetails>
    );
}

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

    @media (max-width: 425px) {
        #home_details_inner {
            width: 100%;
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;

export default WeatherDetails;
