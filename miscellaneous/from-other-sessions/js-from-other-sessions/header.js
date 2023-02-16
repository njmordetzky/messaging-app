import { headline, name } from './mock-data/header-data.js';

class HeaderMod {
  constructor() {

  }

  buildHeadline() {
    const headlineDiv = document.createElement('div');
    headlineDiv.style.backgroundColor = "#00BCD4";
    headlineDiv.classList.add('headline');
    headlineDiv.innerHTML = headline;
    document.body.appendChild(headlineDiv);
  }
}

const headerMod = new HeaderMod();
headerMod.buildHeadline();