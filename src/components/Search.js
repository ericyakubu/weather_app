import React, { useRef, useState } from "react";
import styled from "styled-components";
import WeatherContext from "../ContextAPI";
import { useContext } from "react";

function Search() {
    const { setInput, setWeatherCurrent, setAdressOptions } = useContext(WeatherContext);
    const inputValue = useRef();
    return (
        <SearchForm>
            <form
                onSubmit={(e) => {
                    setWeatherCurrent(null);
                    setInput(inputValue.current.value);

                    setAdressOptions(null);
                    e.preventDefault();
                }}
            >
                <input type="text" ref={inputValue} placeholder="enter your adress" />
            </form>
        </SearchForm>
    );
}

const SearchForm = styled.div`
    height: 10vh;
    display: flex;
    position: fixed;
    z-index: 100;
    width: 100%;
    top: 0;
    left: 0;

    form {
        display: block;
        margin: auto;

        input {
            outline: none;
            width: 25rem;
            max-width: 70vw;
            padding: 1rem 2rem;
            font-size: 1.5rem;
            border: none;
            border-radius: 3rem;
            color: grey;
            background-color: white;
        }
    }
`;

export default Search;
