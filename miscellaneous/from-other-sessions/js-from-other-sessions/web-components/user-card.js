const template = document.createElement('template');
template.innerHTML = `
  <style>
    h2 {
      color: #00BCD4;
    }
    img {
      height: 100px;
    }
    .user-card {
      background-color: #fa5555;
      padding: 20px;
      margin: 40px;
      width: 140px;
      display: inline-block;
      border-radius: 6px;
      vertical-align: top;
    }
  </style>
  <div class="user-card">
      <img />
      <h2></h2>
      <div class="info">
        <p><slot name="description" /></p>
      </div>
      <button id="toggle-info">Hide Info</button>
  </div>
`;

// creating a custom element
class UserCard extends HTMLElement {
  constructor() {
    // calls the constructor for this custom element
    super();

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h2').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector('.info');
    const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

    if (this.showInfo) {
      info.style.display = 'block';
      toggleBtn.innerHTML = 'Hide Info';
    } else {
      info.style.display = 'none';
      toggleBtn.innerHTML = 'Show Info';
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener;
  }
}

// window object, 
window.customElements.define('user-card', UserCard);