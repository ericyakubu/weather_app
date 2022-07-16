import React from "react";
import { Route, Routes } from "react-router-dom";
import Search from "./components/Search";
import Home from "./pages/Home";
import styled from "styled-components";

function App() {
    return (
        <>
            <Weather>
                <Search />
                <Routes>
                    <Route path="/" exact element={<Home />} />
                </Routes>

                <img alt="background" src="./img/backgrounds/morning.jpg" />
            </Weather>
        </>
    );
}

const Weather = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;

    video {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    img {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export default App;
