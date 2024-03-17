(function() {
  'use strict';
  //===========================================================================================================
  globalThis.web_components = {};

  //===========================================================================================================
  customElements.define('custom-square', web_components.Custom_Square = (function() {
    class Custom_Square extends HTMLElement {
      //---------------------------------------------------------------------------------------------------------
      constructor() {
        var root;
        super();
        this.constructor.state.count++;
        root = this.attachShadow({
          mode: 'open'
        });
        root.innerHTML = `<style></style><div>${this.constructor.state.count}</div>`;
        // square.setAttribute("size", "100");
        // square.setAttribute("color", "red");
        // log '^Custom_Square@1^', root.innerHTML
        // log '^Custom_Square@2^', root.innerHTML.parent
        // log '^Custom_Square@3^', root.parent
        // log '^Custom_Square@4^', root.parentElement
        // log '^Custom_Square@5^', root.innerHTML.parentElement
        // log '^Custom_Square@6^', root.querySelector('style')
        // log '^Custom_Square@7^', root.querySelector('style').parentElement
        // log '^Custom_Square@8^', root.outerHTML
        // log '^Custom_Square@9^', root
        // log '^Custom_Square@10^', @
        // log '^Custom_Square@10^', @innerHTML
        // log '^Custom_Square@10^', @outerHTML
        // log '^Custom_Square@10^', @outerHTML.setAttribute
        // log '^Custom_Square@10^', @setAttribute
        // log '^Custom_Square@10^', @setAttribute 'size', '100'
        // div     = document.createElement 'div'
        // style   = document.createElement 'style'
        // root.appendChild style
        // root.appendChild div
        // @setAttribute 'foobar', true
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
        var style;
        style = this.shadowRoot.querySelector('style');
        style.textContent = `div {
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