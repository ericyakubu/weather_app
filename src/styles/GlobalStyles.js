import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }

    body {
        overflow-x: hidden;
        overflow-y: auto;
        font-family: 'Montserrat', sans-serif;

        &::-webkit-scrollbar {
            display: none;
        }
    }
`;

export default GlobalStyles;
