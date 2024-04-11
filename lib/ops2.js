(function() {
  'use strict';
  var Intertalk, LINE, µ;

  //===========================================================================================================
  globalThis.log = console.log;

  globalThis.debug = console.debug;

  µ = require('mudom');

  LINE = require('linefinder');

  ({Intertalk} = require('intertalk'));

  globalThis.intertalk = new Intertalk();

  // Intertalk Note Results Datom isa validate isa_optional validate_optional

  // _Distributor = LINE.Distributor

  // LINE.Distributor = class extends _Distributor

  //   constructor: ( cfg ) ->
  //     super cfg
  //     @rightcomb = µ.DOM.parse_one '<mu-rightcomb></mu-rightcomb>'
  //     log '^342234^', "Distributor", @rightcomb
  //     return undefined

  // #===========================================================================================================
  // µ.DOM.ready ->
  //   log '^ops2@123-1^', "ready"
  //   cfg   =
  //     paragraph_selector:         'mu-galley > p'
  //     iframe_selector:            'iframe'
  //     insert_stylesheet_after:    'link[href$="reset.css"]'
  //     insert_debug_button:        true
  //     insert_paginate_button:     true
  //   #.........................................................................................................
  //   if ( not µ.DOM.page_is_inside_iframe() ) and ( µ.DOM.select_first 'mu-galley', null )?
  //     log '^ops2@123-2^', "galley page, not inside an iframe"
  //     distributor = new LINE.Distributor cfg
  //     await distributor.mark_lines()
  //     return null
  //   #.........................................................................................................
  //   return null unless  LINE.Distributor.is_main_document()
  //   #.........................................................................................................
  //   distributor = new LINE.Distributor cfg
  //   # await distributor.distribute_lines()
  //   ### TAINT to be done in `linefinder` ###
  //   # globalThis.ws = new ( require 'intersock' ).Intersock()
  //   return null

  //===========================================================================================================
  µ.DOM.ready(async function() {
    var $, mouse_moved, spinner_toggle;
    log('^ops2@123-3^', "ready");
    intertalk.on('whatever', function(note) {
      return log('^ops2@123-4^', note);
    });
    await intertalk.emit('whatever', ['my', 'data']);
    log('^ops2@123-5^', "intertalk is using WeakMap:  ", intertalk.listeners instanceof globalThis.WeakMap);
    log('^ops2@123-6^', "intertalk is using Map:      ", intertalk.listeners instanceof globalThis.Map);
    intertalk.on('whatever', function(note) {
      return log('^ops2@123-7^', note);
    });
    intertalk.emit('whatever', [1, 2]);
    //=========================================================================================================
    /* this code has been put here as we still have to decide on a better place for it */
    //.........................................................................................................
    $ = function([selector]) {
      return µ.DOM.select_first(selector);
    };
    //.........................................................................................................
    intertalk.on('spinner-toggle', spinner_toggle = function(note) {
      var event;
      event = note.$value;
      µ.DOM.toggle_class($`#spinner`, 'visible');
      return null;
    });
    //.........................................................................................................
    intertalk.on('mouse-moved', mouse_moved = function(note) {
      return log('^ops2@123-1^', {
        x: note.$value.clientX,
        y: note.$value.clientY
      });
    });
    // intertalk.on 'counter-increment', counter_increment = ( note ) ->
    //   log '^ops2@123-1^', "counter-increment"
    //.........................................................................................................
    // on E[to is me and key is "show"] from #bus queue all
    //   send E(to:me,key:"toggle") to #bus unless me matches .visible
    // on E[to is me and key is "hide"] from #bus queue all
    //   send E(to:me,key:"toggle") to #bus if me matches .visible
    //.........................................................................................................
    intertalk.emit_on_event($`#spinner-toggle`, 'click', 'spinner-toggle');
    // intertalk.emit_on_event 'click', 'spinner-toggle'
    intertalk.emit_on_event('click', 'counter-increment');
    intertalk.emit_on_event('change', 'document-changed');
    intertalk.emit_on_event($`#my-counter`, 'document-changed');
    // intertalk.emit_on_event 'mousemove', 'mous-moved'
    //=========================================================================================================
    return null;
  });

}).call(this);

//# sourceMappingURL=ops2.js.map