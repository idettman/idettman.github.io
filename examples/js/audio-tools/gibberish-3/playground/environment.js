var cm, cmconsole, exampleCode, AudioContext = AudioContext || webkitAudioContext,
isStereo = false

let environment = {}

window.onload = function() {
  cm = CodeMirror( document.querySelector('#editor'), {
    mode:   'javascript',
    value:  'loading...',
    keyMap: 'playground',
    autofocus: true,
    matchBrackets:true
  })

  cm.setSize( null, '100%' )

  cmconsole = CodeMirror( document.querySelector('#main'), {
    mode:'javascript',
    value:
`// genish playground, v0.0.1
// https://github.com/charlieroberts/genish.js`,
    readOnly:'nocursor',
  })     

  cmconsole.setSize( null, '100%' )

  Gibberish.init()
  Gibberish.export( window )

  environment.editor = cm
  environment.console = cmconsole
  window.Environment = environment

  environment.displayCallbackUpdates = function() {
    Gibberish.oncallback = function( cb ) {
      environment.console.setValue( cb.toString() )
    }
  }

  let select = document.querySelector( 'select' ),
    files = [
      'deepnote.js',
      'intro.js',
      'introOld.js',
      'oscillators.js',
      'filtering.js',
      'enveloping.js',
      'fx_and_busses.js',
      'sequencing.js',
      'making_ugens.js',
      'phasing.js',
      'ssd.js',
      'solina.js',
      'three03.js',
      'fm.js'
    ]

  select.onchange = function( e ) {
    loadexample( files[ select.selectedIndex ] )
  }

  let loadexample = function( filename ) {
    var req = new XMLHttpRequest()
    req.open( 'GET', './examples/'+filename, true )
    req.onload = function() {
      var js = req.responseText
      window.Environment.editor.setValue( js )
    }

    req.send()
  }

  loadexample( 'deepnote.js' )

  setupSplit()
}


const setupSplit = function() {
  let splitDiv = document.querySelector( '#splitbar' ),
      editor   = document.querySelector( '#editor'   ),
      sidebar  = document.querySelector( '#console'  ),
      mousemove, mouseup

  mouseup = evt => {
    window.removeEventListener( 'mousemove', mousemove )
    window.removeEventListener( 'mouseup', mouseup )
  }

  mousemove = evt => {
    let splitPos = evt.clientX

    editor.style.width = splitPos + 'px'
    sidebar.style.left = splitPos  + 'px'
    sidebar.style.width = (window.innerWidth - splitPos) + 'px'
  }


  splitDiv.addEventListener( 'mousedown', evt => {
    window.addEventListener( 'mousemove', mousemove )
    window.addEventListener( 'mouseup', mouseup )
  })

}


const fixCallback = function( cb ) {
  const cbarr = cb.split( '\n' )
  cbarr.splice(1,1)
  cbarr[0] += ') {'

  return cbarr.join('\n')
}

CodeMirror.keyMap.playground =  {
  fallthrough:'default',

  'Ctrl-Enter'( cm ) {
    try {
      var selectedCode = getSelectionCodeColumn( cm, false )

      flash( cm, selectedCode.selection )

      var func = new Function( selectedCode.code )

      func()
    } catch (e) {
      console.log( e )
      return
    }
    
    Gibberish.generateCallback()
    cmconsole.setValue( fixCallback( Gibberish.callback.toString() ) )
  },
  'Alt-Enter'( cm ) {
    try {
      var selectedCode = getSelectionCodeColumn( cm, true )

      flash( cm, selectedCode.selection )

      var func = new Function( selectedCode.code )
      func()
    } catch (e) {
      console.log( e )
      return
    }
    
    Gibberish.generateCallback()
    cmconsole.setValue( fixCallback( Gibberish.callback.toString() ) )
  },
  'Ctrl-.'( cm ) {
    Gibberish.clear()
    if( dat !== undefined ) {
      dat.GUI.__all__.forEach( v => v.destroy() )
      dat.GUI.__all__.length = 0
    }
    Gibberish.generateCallback()
    cmconsole.setValue( fixCallback( Gibberish.callback.toString() ) )
  },
}

var getSelectionCodeColumn = function( cm, findBlock ) {
  var pos = cm.getCursor(), 
  text = null

  if( !findBlock ) {
    text = cm.getDoc().getSelection()

    if ( text === "") {
      text = cm.getLine( pos.line )
    }else{
      pos = { start: cm.getCursor('start'), end: cm.getCursor('end') }
      //pos = null
    }
  }else{
    var startline = pos.line, 
    endline = pos.line,
    pos1, pos2, sel

    while ( startline > 0 && cm.getLine( startline ) !== "" ) { startline-- }
    while ( endline < cm.lineCount() && cm.getLine( endline ) !== "" ) { endline++ }

    pos1 = { line: startline, ch: 0 }
    pos2 = { line: endline, ch: 0 }

    text = cm.getRange( pos1, pos2 )

    pos = { start: pos1, end: pos2 }
  }

  if( pos.start === undefined ) {
    var lineNumber = pos.line,
    start = 0,
    end = text.length

    pos = { start:{ line:lineNumber, ch:start }, end:{ line:lineNumber, ch: end } }
  }

  return { selection: pos, code: text }
}

var flash = function(cm, pos) {
  var sel,
  cb = function() { sel.clear() }

  if (pos !== null) {
    if( pos.start ) { // if called from a findBlock keymap
      sel = cm.markText( pos.start, pos.end, { className:"CodeMirror-highlight" } );
    }else{ // called with single line
      sel = cm.markText( { line: pos.line, ch:0 }, { line: pos.line, ch:null }, { className: "CodeMirror-highlight" } )
    }
  }else{ // called with selected block
    sel = cm.markText( cm.getCursor(true), cm.getCursor(false), { className: "CodeMirror-highlight" } );
  }

  window.setTimeout(cb, 250);
}
