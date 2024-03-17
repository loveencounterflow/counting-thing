
'use strict'

class Square extends HTMLElement

  #---------------------------------------------------------------------------------------------------------
  @state: { count: 0, }

  #---------------------------------------------------------------------------------------------------------
  constructor: ->
    super()
    @constructor.state.count++
    root            = @attachShadow { mode: 'open' }
    root.innerHTML  = """<style></style><div>#{@constructor.state.count}</div>"""
  # square.setAttribute("size", "100");
  # square.setAttribute("color", "red");
    # log '^Square@1^', root.innerHTML
    # log '^Square@2^', root.innerHTML.parent
    # log '^Square@3^', root.parent
    # log '^Square@4^', root.parentElement
    # log '^Square@5^', root.innerHTML.parentElement
    # log '^Square@6^', root.querySelector('style')
    # log '^Square@7^', root.querySelector('style').parentElement
    # log '^Square@8^', root.outerHTML
    # log '^Square@9^', root
    # log '^Square@10^', @
    # log '^Square@10^', @innerHTML
    # log '^Square@10^', @outerHTML
    # log '^Square@10^', @outerHTML.setAttribute
    # log '^Square@10^', @setAttribute
    # log '^Square@10^', @setAttribute 'size', '100'
    # div     = document.createElement 'div'
    # style   = document.createElement 'style'
    # root.appendChild style
    # root.appendChild div
    # @setAttribute 'foobar', true
    return undefined

  #---------------------------------------------------------------------------------------------------------
  connectedCallback: ->
    console.log "Custom square element added to page."
    ### TAINT could be systematized with template attributes ###
    @setAttribute 'size',   '100'     unless ( @getAttribute 'size'   )?
    @setAttribute 'color',  'yellow'  unless ( @getAttribute 'color'  )?
    @_update_style()
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
    style = @shadowRoot.querySelector 'style'
    style.textContent = """
      div {
        width:            #{@getAttribute 'size'}px;
        height:           #{@getAttribute 'size'}px;
        background-color: #{@getAttribute 'color'}; }"""
    return null

  # Specify observed attributes so that attributeChangedCallback will work
  Object.defineProperty @, 'observedAttributes',
    get: -> return [ 'color', 'size', ];


globalThis.web_components = { Square, }

