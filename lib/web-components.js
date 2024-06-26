(function() {
  'use strict';
  var HTML, SUBSIDIARY, log, rpr, set_getter, state, µ;

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

  µ = require('mudom');

  ({HTML} = require('/lib/string-markers'));

  ({SUBSIDIARY} = require('subsidiary'));

  ({rpr} = (require('webguy')).trm);

  //===========================================================================================================
  customElements.define('my-spinner', web_components.My_spinner = class My_spinner extends HTMLElement {
    //---------------------------------------------------------------------------------------------------------
    constructor() {
      /* SVG thx to https://github.com/SamHerbert/SVG-Loaders/blob/master/svg-loaders/circles.svg */
      super();
      this.attachShadow({
        mode: 'open'
      });
      this.shadowRoot.innerHTML = HTML`<style>
div {
  opacity:  0;
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

    //---------------------------------------------------------------------------------------------------------
    connectedCallback() {
      log("spinner added to page.");
      // log '^webc@325-1^', µ
      // log '^webc@325-2^', µ.DOM
      // log '^webc@325-3^', µ.DOM.on @, 'E', -> log '^webc@325-4^', "received `E`"
      return null;
    }

  });

  //===========================================================================================================
  customElements.define('my-counter', web_components.My_counter = (function() {
    class My_counter extends HTMLElement {
      //---------------------------------------------------------------------------------------------------------
      constructor() {
        var sub;
        super();
        this.attachShadow({
          mode: 'open'
        });
        this.shadowRoot.innerHTML = HTML`<style>
  div {
    width:    10mm;
    height:   10mm;
    outline:  1px solid red; }
  </style><div id=digit>0</div>`;
        //.......................................................................................................
        set_getter(this, '$style', function() {
          return this.shadowRoot.querySelector('style');
        });
        set_getter(this, '$div', function() {
          return this.shadowRoot.querySelector('div');
        });
        //.......................................................................................................
        SUBSIDIARY.tie_one({
          host: this,
          host_key: '_',
          subsidiary_key: '$',
          enumerable: true,
          subsidiary: sub = this.constructor.$
        });
        intertalk.on('counter-increment', (...P) => {
          return this.$.on_counter_increment.call(sub, ...P);
        });
        //.......................................................................................................
        return void 0;
      }

      //---------------------------------------------------------------------------------------------------------
      connectedCallback() {
        var i, kv, len, ref;
        log("counter added to page.");
        log('^webc@325-7^', this);
        log('^webc@325-8^', this.outerHTML);
        log('^webc@325-9^', this.attributes);
        log('^webc@325-10^', Array.from(this.attributes));
        ref = [...this.attributes];
        for (i = 0, len = ref.length; i < len; i++) {
          kv = ref[i];
          log('^webc@325-11^', [kv.nodeName, kv.nodeValue]);
        }
        /* TAINT implement µDOM method */
        log('^webc@325-11^', Object.fromEntries((function() {
          var j, len1, ref1, results;
          ref1 = this.attributes;
          results = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            kv = ref1[j];
            results.push([kv.name, kv.value]);
          }
          return results;
        }).call(this)));
        return null;
      }

    };

    //---------------------------------------------------------------------------------------------------------
    My_counter.$ = {
      //-------------------------------------------------------------------------------------------------------
      on_counter_increment: function(note) {
        var counter;
        // log '^webc@325-5^', "counter-increment"
        counter = parseInt(this._.$div.textContent, 10);
        if (counter === 9) {
          this._.$div.textContent = 0;
        } else {
          this._.$div.textContent = counter + 1;
        }
        return null;
      },
      //-------------------------------------------------------------------------------------------------------
      on_counter_set: function(note) {
        /* TAINT validate.integer */
        this._.$div.textContent = note.$value;
        return null;
      }
    };

    return My_counter;

  }).call(this));

  //===========================================================================================================
  customElements.define('my-logger', web_components.My_logger = (function() {
    class My_logger extends HTMLElement {
      //---------------------------------------------------------------------------------------------------------
      constructor() {
        var sub;
        super();
        this.attachShadow({
          mode: 'open'
        });
        this.shadowRoot.innerHTML = HTML`<style>
  div {
    width:    150mm;
    height:   15mm;
    outline:  1px solid red; }
  </style><div id=infobox>0</div>`;
        //.......................................................................................................
        SUBSIDIARY.tie_one({
          host: this,
          host_key: '_',
          subsidiary_key: '$',
          enumerable: true,
          subsidiary: sub = this.constructor.$
        });
        //.......................................................................................................
        this.$.message_count = 0;
        set_getter(this.$, '$style', function() {
          return this._.shadowRoot.querySelector('style');
        });
        set_getter(this.$, '$infobox', function() {
          return this._.shadowRoot.querySelector('#infobox');
        });
        intertalk.on_any((...P) => {
          return this.$.log.call(sub, ...P);
        });
        //.......................................................................................................
        return void 0;
      }

      //---------------------------------------------------------------------------------------------------------
      connectedCallback() {
        var i, kv, len, ref;
        log("counter added to page.");
        log('^webc@325-7^', this);
        log('^webc@325-8^', this.outerHTML);
        log('^webc@325-9^', this.attributes);
        log('^webc@325-10^', Array.from(this.attributes));
        ref = [...this.attributes];
        for (i = 0, len = ref.length; i < len; i++) {
          kv = ref[i];
          log('^webc@325-11^', [kv.nodeName, kv.nodeValue]);
        }
        /* TAINT implement µDOM method */
        log('^webc@325-11^', Object.fromEntries((function() {
          var j, len1, ref1, results;
          ref1 = this.attributes;
          results = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            kv = ref1[j];
            results.push([kv.name, kv.value]);
          }
          return results;
        }).call(this)));
        return null;
      }

    };

    //---------------------------------------------------------------------------------------------------------
    My_logger.$ = {
      //-------------------------------------------------------------------------------------------------------
      log: function(note, ctl) {
        this.message_count++;
        /* TAINT use divs, flexbox */
        this.$infobox.textContent += '\n';
        this.$infobox.textContent += this.message_count;
        this.$infobox.textContent += ' ';
        this.$infobox.textContent += rpr(note);
        return null;
      },
      //-------------------------------------------------------------------------------------------------------
      on_counter_set: function(note) {
        /* TAINT validate.integer */
        this._.$infobox.textContent = note.$value;
        return null;
      }
    };

    return My_logger;

  }).call(this));

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
        this.shadowRoot.innerHTML = HTML`<style></style><div>${this.constructor.state.count}</div>`;
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

  // µ.DOM.on document, 'E', ( event ) ->
  //   log '^document@3^', event
  // µ.DOM.emit_custom_event 'E', { key: 1, }
  // µ.DOM.ready ->
  //   log '^document@4^', "ready"
  //   µ.DOM.on ( µ.DOM.select_first '#spinner' ), 'E', ( event ) ->
  //     log '^spinner@1^', event
  //   µ.DOM.emit_custom_event 'E', { key: 1, }

  // µ.DOM.emit_custom_event 'E', { key: 1, }
  µ.DOM.ready(function() {
    return log('^document@4^', "ready");
  });

  // spinner = µ.DOM.select_first '#spinner'
// do =>
//   handler = ( event ) ->
//     log 'document', event.detail, event.detail.to, event.detail.to is @
//     if ( event.detail?.to )? and event.detail.to isnt @
//       event.detail.to.dispatchEvent event
//   document.addEventListener 'E', handler, { capture: false, passive: false, }
//   return null
// do =>
//   handler = ( event ) -> log 'spinner', event.detail
//   spinner.addEventListener 'E', handler, { capture: false, passive: false, }
//   return null
// # µ.DOM.emit_custom_event 'E', { key: 1, }
// document.dispatchEvent new CustomEvent 'E', { detail: { key: 1, } }
// spinner.dispatchEvent new CustomEvent 'E', { detail: { key: 2, } }
// # document.dispatchEvent new CustomEvent 'E', { detail: { to: document, key: 3, } }
// document.dispatchEvent new CustomEvent 'E', { detail: { to: spinner, key: 4, } }

}).call(this);

//# sourceMappingURL=web-components.js.map