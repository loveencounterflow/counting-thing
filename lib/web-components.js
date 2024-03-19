(function() {
  'use strict';
  var log, set_getter, state;

  //===========================================================================================================
  globalThis.web_components = {};

  state = {
    count: 0
  };

  log = function(...P) {
    return console.log(++state.count, ...P);
  };

  set_getter = function(owner, name, get) {
    return Object.defineProperty(owner, name, {get});
  };

  //===========================================================================================================
  customElements.define('my-spinner', web_components.My_spinner = class My_spinner extends HTMLElement {
    //---------------------------------------------------------------------------------------------------------
    constructor() {
      /* SVG thx to https://github.com/SamHerbert/SVG-Loaders/blob/master/svg-loaders/circles.svg */
      super();
      this.attachShadow({
        mode: 'open'
      });
      this.shadowRoot.innerHTML = `<style>
div {
  width:    135px;
  height:   135px }
</style><div>
<svg width="135" height="135" viewBox="0 0 135 135" fill="#f88">
  <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
  <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="-360 67 67" dur="2.5s" repeatCount="indefinite"/>
  </path>
  <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
  <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="360 67 67" dur="8s" repeatCount="indefinite"/>
  </path>
  </svg>
  </div>`;
      return void 0;
    }

  });

  //===========================================================================================================
  customElements.define('custom-square', web_components.Custom_Square = (function() {
    class Custom_Square extends HTMLElement {
      //---------------------------------------------------------------------------------------------------------
      constructor() {
        super();
        this.constructor.state.count++;
        this.attachShadow({
          mode: 'open'
        });
        this.shadowRoot.innerHTML = `<style></style><div>${this.constructor.state.count}</div>`;
        set_getter(this, '$style', function() {
          return this.shadowRoot.querySelector('style');
        });
        set_getter(this, '$div', function() {
          return this.shadowRoot.querySelector('div');
        });
        return void 0;
      }

      //---------------------------------------------------------------------------------------------------------
      connectedCallback() {
        log("Custom square element added to page.");
        if ((this.getAttribute('size')) == null) {
          /* TAINT could be systematized with template attributes */
          this.setAttribute('size', '100px');
        }
        if ((this.getAttribute('color')) == null) {
          this.setAttribute('color', 'yellow');
        }
        return null;
      }

      //---------------------------------------------------------------------------------------------------------
      disconnectedCallback() {
        return log("Custom square element removed from page.");
      }

      adoptedCallback() {
        return log("Custom square element moved to new page.");
      }

      //---------------------------------------------------------------------------------------------------------
      attributeChangedCallback(name, prv_value, value) {
        log("Custom square element attributes changed:", {name, value});
        this._update_style();
        return null;
      }

      //---------------------------------------------------------------------------------------------------------
      _update_style() {
        this.$style.textContent = `div {
  width:            ${this.getAttribute('size')};
  height:           ${this.getAttribute('size')};
  background-color: ${this.getAttribute('color')}; }`;
        return null;
      }

    };

    //---------------------------------------------------------------------------------------------------------
    Custom_Square.state = {
      count: 0
    };

    set_getter(Custom_Square, 'observedAttributes', function() {
      return ['color', 'size'];
    });

    return Custom_Square;

  }).call(this));

}).call(this);

//# sourceMappingURL=web-components.js.map