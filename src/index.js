import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import { WeatherProvider } from "./ContextAPI";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <GlobalStyles />
        <BrowserRouter>
            <WeatherProvider>
                <App />
            </WeatherProvider>
        </BrowserRouter>
    </React.StrictMode>
);
