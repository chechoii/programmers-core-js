const template = document.querySelector('template');
template.innerHTML = `
    <style>
    @import url("./components/Counter/Counter.css");
    </style>
    <button type=button class="decrement" aria-label="감소">-</button>
    <span>${10}</span>
    <button type=button class="increment" aria-label="증가">+</button>
`;

console.log(template.content);

class Counter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = {
      value: +this.getAttribute('data-value') || 0,
    };
    this.render();
    this.attachEvent();
  }
  static get observedAttributes() {
    return ['data-value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-value') {
      this.state.value = +newValue;
      this.render();
    }
  }

  increment() {
    this.state.value += 1;
    this.dataset.value = this.state.value;
  }
  decrement() {
    this.state.value -= 1;
    this.dataset.value = this.state.value;
  }

  handleClick(e) {
    const target = e.target.closest('button');
    if (!target) return;

    if (target.classList.contains('increment')) {
      this.increment();
    } else {
      this.decrement();
    }
    console.log(target);
  }

  attachEvent() {
    this.shadowRoot.addEventListener('click', (e) => this.handleClick(e));
  }

  render() {
    const { value } = this.state;
    this.shadowRoot.append(template.content.cloneNode(true));
  }
}

customElements.define('c-counter', Counter);
