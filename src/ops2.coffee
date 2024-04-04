
'use strict'


#===========================================================================================================
globalThis.log            = console.log
globalThis.debug          = console.debug
µ                         = require 'mudom'
LINE                      = require 'linefinder'
{ IT }                    = require 'intertalk'
# Intertalk Note Results Datom isa validate isa_optional validate_optional




# _Distributor = LINE.Distributor

# LINE.Distributor = class extends _Distributor

#   constructor: ( cfg ) ->
#     super cfg
#     @rightcomb = µ.DOM.parse_one '<mu-rightcomb></mu-rightcomb>'
#     log '^342234^', "Distributor", @rightcomb
#     return undefined


# #===========================================================================================================
# µ.DOM.ready ->
#   log '^ops2@123-1^', "ready"
#   cfg   =
#     paragraph_selector:         'mu-galley > p'
#     iframe_selector:            'iframe'
#     insert_stylesheet_after:    'link[href$="reset.css"]'
#     insert_debug_button:        true
#     insert_paginate_button:     true
#   #.........................................................................................................
#   if ( not µ.DOM.page_is_inside_iframe() ) and ( µ.DOM.select_first 'mu-galley', null )?
#     log '^ops2@123-2^', "galley page, not inside an iframe"
#     distributor = new LINE.Distributor cfg
#     await distributor.mark_lines()
#     return null
#   #.........................................................................................................
#   return null unless  LINE.Distributor.is_main_document()
#   #.........................................................................................................
#   distributor = new LINE.Distributor cfg
#   # await distributor.distribute_lines()
#   ### TAINT to be done in `linefinder` ###
#   # globalThis.ws = new ( require 'intersock' ).Intersock()
#   return null


#===========================================================================================================
µ.DOM.ready ->
  log '^ops2@123-3^', "ready"
  IT.on 'whatever', ( note ) -> log '^ops2@123-4^', note
  await IT.emit 'whatever', [ 'my', 'data', ]
  log '^ops2@123-5^', "IT is using WeakMap:  ", ( IT.listeners instanceof globalThis.WeakMap )
  log '^ops2@123-6^', "IT is using Map:      ", ( IT.listeners instanceof globalThis.Map )
  IT.on 'whatever', ( note ) -> log '^ops2@123-7^', note
  IT.emit 'whatever', [ 1, 2, ]
  #=========================================================================================================
  ### this code has been put here as we still have to decide on a better place for it ###
  #.........................................................................................................
  $ = ([ selector ]) -> µ.DOM.select_first selector
  #.........................................................................................................
  IT.on 'spinner-toggle', spinner_toggle = ( note ) ->
    event = note.$value
    µ.DOM.toggle_class $'#spinner', 'visible'
    return null
  #.........................................................................................................
    # on E[to is me and key is "show"] from #bus queue all
    #   send E(to:me,key:"toggle") to #bus unless me matches .visible
    # on E[to is me and key is "hide"] from #bus queue all
    #   send E(to:me,key:"toggle") to #bus if me matches .visible
  #.........................................................................................................
  IT.ae_event_from_dom_event = ( element, event_name, note_name ) ->
    µ.DOM.on element, event_name, ( event ) => IT.emit note_name, event
  #.........................................................................................................
  IT.ae_event_from_dom_event $'#spinner-toggle', 'click', 'spinner-toggle'
  #=========================================================================================================
  return null




