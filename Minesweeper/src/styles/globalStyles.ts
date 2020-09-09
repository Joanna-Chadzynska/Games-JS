import { createGlobalStyle } from 'styled-components';
import DigitalDream from './DigitalDream.ttf';

export const fonts = {
	digitalDream: "'DigitalDream'",
};

export const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: 'DigitalDream';
		src: url(${DigitalDream}) format('truetype');
	}
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
       font-size: 62.5%;
    }

    body {
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.6;
    }

    #root {
        height: 100vh;
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


    .cell-info-1 {
  color: var(--info-one-color);
}
.cell-info-2 {
  color: var(--info-two-color);
}
.cell-info-3 {
  color: var(--info-three-color);
}
.cell-info-4 {
  color: var(--info-four-color);
}
.cell-info-5 {
  color: var(--info-five-color);
}
.cell-info-6 {
  color: var(--info-six-color);
}
.cell-info-7 {
  color: var(--info-seven-color);
}
.cell-info-8 {
  color: var(--info-eight-color);
}
`;
