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

  set_getter = function(owner, name, getter) {
    return Object.defineProperty(owner, name, {
      get: getter
    });
  };

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