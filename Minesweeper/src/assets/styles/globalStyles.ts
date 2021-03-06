import { createGlobalStyle } from 'styled-components';
import DigitalDream from '../fonts/DigitalDream/DigitalDream.ttf';

export const fonts = {
	digitalDream: "'DigitalDream'",
};

export const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: 'DigitalDream';
		src: url(${DigitalDream}) format('truetype');
    }
    
    *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

    html {
    font-size: 52.5%;
    }

    body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.6;
    }

	a {
    text-decoration: none;
	}

    ul {
	list-style-type: none;
    }

    h1, h2, h3, p {
        margin: 0;
    }

    button, svg{
    cursor: pointer;
    }

.border {
  border: ${({ theme }) => theme.gameSizes.borderWidth} solid;
  
}

.border--convex {
  border-color: ${({ theme }) => theme.colors.primary.dark} #fff #fff ${({
	theme,
}) => theme.colors.primary.dark};
}

.border--concave {
  border-color: #fff ${({ theme }) => theme.colors.primary.dark} ${({
	theme,
}) => theme.colors.primary.dark} #fff;
}

.border--revealed {
  border-width: 0.1rem;
  border-color: ${({ theme }) => theme.colors.primary.dark};
}

`;
