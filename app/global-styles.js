import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    width: 800px;
    height: 550px;
    font-family: 'Rubik', sans-serif;
    position: relative;
  }
  h1, h2, h3, h4, h5, span, p {
    font-family: 'Rubik', sans-serif;
  }

  #app {
    background-color: #fafafa;
    height: 100%;
    width: 100%;
    .app-container {
      height: 100%;
      width: 100%;
    }
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  a:focus,
  button:focus,
  input:focus,
  textarea:focus {
    outline: none;
  }
`;

export default GlobalStyle;
