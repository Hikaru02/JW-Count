
import Draw from './draw.js'

const $log = ( ...args ) => console.log( ...args )

test( )

async function test ( ) {

	$log( 'test' )

	let [ input ] = [ 'input' ].map( name => document.createElement( name ) )

	input.type = 'file'
	document.body.append( input )
	Object.assign( input.style, { width: '300px', height: '300px' } )


	await new Promise( ok => input.onchange = ok )

	let file = input.files[ 0 ]
	$log( file )

	let buffer = await new Promise( ok => {
		let reader = new FileReader
		reader.onload = ( ) => ok( reader.result )
		reader.readAsArrayBuffer( file )
	} )

	let decoder = new TextDecoder( 'sjis' )
	let text = decoder.decode( buffer )

	text = text.replace( /\r/g, '' )

	text = [
		[ /\\'/g, '\'' ],
		[ /\\/g, '\\\\' ],
	//	[ /([^(;,])$/gm, '$1,' ],
		[ /(^#\d+)\s=/mg, '/*$1*/' ],
	// 	[ /([(,])\*/g, '$1_["*"]' ],
	// 	[ /([(,])\.(\w+)\./g, '$1_.$2' ],
	// 	[ /,\n\);/g, '\n);' ]
		[ /^(\/\*)?SXF(\*\/)?$/gm, '' ],
		[ /\n+/g, '\n' ],
	].reduce( ( text, [ pt, str ] ) => text.replace( pt, str ), text )

	console.log( text.match( /\n/g ).length + 1 )

	Draw( text )




}
