(function() {
  'use strict';
  var AE, AE_Event, AE_Event_results, Async_events, Datom, LINE, isa, isa_optional, validate, validate_optional, µ;

  //===========================================================================================================
  globalThis.log = console.log;

  globalThis.debug = console.debug;

  µ = require('mudom');

  LINE = require('linefinder');

  ({AE, Async_events, AE_Event, AE_Event_results, Datom, isa, validate, isa_optional, validate_optional} = require('intertalk'));

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
    log('^ops2@123-3^', "ready");
    AE.on('whatever', function(event) {
      return log('^ops2@123-4^', event);
    });
    await AE.emit('whatever', ['my', 'data']);
    log('^ops2@123-5^', "AE is using WeakMap:  ", AE.listeners instanceof globalThis.WeakMap);
    log('^ops2@123-6^', "AE is using Map:      ", AE.listeners instanceof globalThis.Map);
    AE.on('whatever', function(event) {
      return log('^ops2@123-7^', event);
    });
    AE.emit('whatever', [1, 2]);
    return null;
  });

}).call(this);

//# sourceMappingURL=ops2.js.map