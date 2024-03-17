
'use strict'

#===========================================================================================================
globalThis.web_components = {}
state                     = { count: 0, }
log                       = ( P... ) -> console.log ++state.count, P...
set_getter                = ( owner, name, getter ) -> Object.defineProperty owner, name, { get: getter, }

#===========================================================================================================
customElements.define 'custom-square', class web_components.Custom_Square extends HTMLElement

  #---------------------------------------------------------------------------------------------------------
  @state: { count: 0, }
  set_getter @, 'observedAttributes', -> [ 'color', 'size', ]

  #---------------------------------------------------------------------------------------------------------
  constructor: ->
    super()
    @constructor.state.count++
    @attachShadow { mode: 'open' }
    @shadowRoot.innerHTML = """<style></style><div>#{@constructor.state.count}</div>"""
    set_getter @, '$style', -> @shadowRoot.querySelector 'style'
    set_getter @, '$div',   -> @shadowRoot.querySelector 'div'
    return undefined

  #---------------------------------------------------------------------------------------------------------
  connectedCallback: ->
    log "Custom square element added to page."
    ### TAINT could be systematized with template attributes ###
    @setAttribute 'size',   '100px'   unless ( @getAttribute 'size'   )?
    @setAttribute 'color',  'yellow'  unless ( @getAttribute 'color'  )?
    return null

  #---------------------------------------------------------------------------------------------------------
  disconnectedCallback: -> log "Custom square element removed from page."
  adoptedCallback: -> log "Custom square element moved to new page."

  #---------------------------------------------------------------------------------------------------------
  attributeChangedCallback: ( name, prv_value, value ) ->
    log "Custom square element attributes changed:", { name, value, }
    @_update_style()
    return null

  #---------------------------------------------------------------------------------------------------------
  _update_style: ->
    @$style.textContent = """
      div {
        width:            #{@getAttribute 'size'};
        height:           #{@getAttribute 'size'};
        background-color: #{@getAttribute 'color'}; }"""
    return null




