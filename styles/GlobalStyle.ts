import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap');

 html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  /* http://www.paulirish.com/2012/box-sizing-border-box-ftw/ (2015/04/28)*/
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  /* Additional resets */
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: inherit;
    outline: none;
    line-height: inherit;
    -webkit-appearance: none;
  }
  /* Fix antialiasing */
  *, *:before, *:after {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  /* Disable user select on everything but texts */
  *, *:before, *:after {
    user-select: none;
  }
  body{
    font: 15px Manrope;
    font-weight: medium;
    line-height: 25px;
  }
  p, h1, h2, h3, h4, h5, h6, blockquote, pre, ul, ol, li, table, tr, th, td, input, textarea {
    user-select: text;
  }
  h1, h2, h3, h4, h5, h6 {
    text-transform: uppercase;
  }
  h1 {    
    font: 56px Manrope;
    line-height: 58px;
    letter-spacing: 2px;
    font-weight: bold;    
  }
  h2 {
    font: 40px Manrope;
 line-height: 44px;
    letter-spacing: 1.5px;
    font-weight: bold;
  }
  h3 {
    font: 32px Manrope;
    line-height: 36px;
    letter-spacing: 1.15px;
    font-weight: bold;
  }
  h4 {
    font: 28px Manrope;
    line-height: 38px;
    letter-spacing: 2px;
    font-weight: bold;
  }
  h5 {
    font: 24px Manrope;
    line-height: 33px;
    letter-spacing: 1.7px;
    font-weight: bold;
  }
  h6 {
    font: 18px Manrope;
    line-height: 24px;
    letter-spacing: 1.3px;
    font-weight: bold;
  }

  #__next{
    overflow-x: hidden;
  }
  `;
