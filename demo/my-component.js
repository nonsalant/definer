export class MyComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const div = document.createElement('div');
        div.textContent = 'Hello, from my-component';
        shadow.appendChild(div);
    }
}

// customElements.define('my-component', MyComponent);