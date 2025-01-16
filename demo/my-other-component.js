export class MyOtherComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const div = document.createElement('div');
        div.textContent = 'Hello, from my-other-component';
        shadow.appendChild(div);
    }
}

// customElements.define('my-other-component', MyOtherComponent);