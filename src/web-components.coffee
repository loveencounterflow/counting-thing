
'use strict'

#===========================================================================================================
globalThis.web_components = {}


#===========================================================================================================
customElements.define 'custom-square', class web_components.Custom_Square extends HTMLElement

  #---------------------------------------------------------------------------------------------------------
  @state: { count: 0, }

  #---------------------------------------------------------------------------------------------------------
  constructor: ->
    super()
    @constructor.state.count++
    @attachShadow { mode: 'open' }
    @shadowRoot.innerHTML = """<style></style><div>#{@constructor.state.count}</div>"""
    Object.defineProperty @, '$style',  get: -> @shadowRoot.querySelector 'style'
    Object.defineProperty @, '$div',    get: -> @shadowRoot.querySelector 'div'
    return undefined

  #---------------------------------------------------------------------------------------------------------
  connectedCallback: ->
    console.log "Custom square element added to page."
    ### TAINT could be systematized with template attributes ###
    @setAttribute 'size',   '100px'   unless ( @getAttribute 'size'   )?
    @setAttribute 'color',  'yellow'  unless ( @getAttribute 'color'  )?
    return null

  #---------------------------------------------------------------------------------------------------------
  disconnectedCallback: -> console.log "Custom square element removed from page."
  adoptedCallback: -> console.log "Custom square element moved to new page."

  #---------------------------------------------------------------------------------------------------------
  attributeChangedCallback: ( name, oldValue, newValue ) ->
    console.log "Custom square element attributes changed."
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

  #---------------------------------------------------------------------------------------------------------
  Object.defineProperty @, 'observedAttributes',
    get: -> return [ 'color', 'size', ];



