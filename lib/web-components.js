(function() {
  'use strict';
  //===========================================================================================================
  globalThis.web_components = {};

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
        Object.defineProperty(this, '$style', {
          get: function() {
            return this.shadowRoot.querySelector('style');
          }
        });
        Object.defineProperty(this, '$div', {
          get: function() {
            return this.shadowRoot.querySelector('div');
          }
        });
        return void 0;
      }

      //---------------------------------------------------------------------------------------------------------
      connectedCallback() {
        console.log("Custom square element added to page.");
        if ((this.getAttribute('size')) == null) {
          /* TAINT could be systematized with template attributes */
          this.setAttribute('size', '100px');
        }
        if ((this.getAttribute('color')) == null) {
          this.setAttribute('color', 'yellow');
        }
        this._update_style();
        return null;
      }

      //---------------------------------------------------------------------------------------------------------
      disconnectedCallback() {
        return console.log("Custom square element removed from page.");
      }

      adoptedCallback() {
        return console.log("Custom square element moved to new page.");
      }

      //---------------------------------------------------------------------------------------------------------
      attributeChangedCallback(name, oldValue, newValue) {
        console.log("Custom square element attributes changed.");
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

    //---------------------------------------------------------------------------------------------------------
    Object.defineProperty(Custom_Square, 'observedAttributes', {
      get: function() {
        return ['color', 'size'];
      }
    });

    return Custom_Square;

  }).call(this));

}).call(this);

//# sourceMappingURL=web-components.js.map