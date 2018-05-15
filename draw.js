
export default function ( program ) {

	let role, start, DEFINED_LAYER

	let init = ( ( ) => {

		'use strict'

		const DEFINED_LAYER = [ ]

		self.onmessage = ( { data } ) => {
			switch ( data.type ) {
				case 'start': {
					let canvas = data.canvas
					let ctx = canvas.getContext( '2d' )
					ctx.scale( 0.05, 0.05 )
					if ( data.role == 'line-simple' ) {
						ctx.strokeStyle = 'black'
						ctx.lineWidth = 10
					}
					DEFINED_LAYER[ 1 ] = ctx
					start( data.role )
				}
			}
		}
	} ).toString( ).match( /\n([\s\S]+)\n/ )[ 1 ]


	let pre = ( ( ) => {

		const $ = [ ]
		console.log( $ )

		const [ ISO, HEADER, ENDSEC, DATA, END ] = new Uint8Array( 100 )
		function FILE_DESCRIPTION ( ) { }
		function FILE_NAME ( ) { }
		function FILE_SCHEMA ( ) { }

		const _ = x => x
		const [ __,
			pre_defined_colour_feature, pre_defined_font_feature

		] = [ ...Array( 100 ) ].fill( _ )

		const DEFINED_COLOUR = [
			'', 'black', 'red', 'green', 'blue', 'yellow', 'magenta', 'cyan', 'white', 'deeppink', 'brown', 'orange', 'lightgreen', 'lightblue', 'lavender', 'lightgray', 'darkgray'
		]
		const DEFINED_FONT = [
			[], [], [6,1.5], [6,6], [12,1.5,0.25,1.5], [12,1.5,0.25,1.5,0.25,1.5], [12,1.5,0.25,1.5,0.25,1.5,0.25,1.5], [0.25,1.5], [12,1.5,3.5,1.5], [12,1.5,3.5,1.5,3.5,1.5], [6,1.5,0.25,1.5], [6,1.5,6,1.5,0.25,1.5], [6,1.5,0.25,1.5,0.25,1.5], [6,1.5,6,1.5,0.25,1.5,0.25,1.5], [6,1.5,0.25,1.5,0.25,1.5,0.25,1.5], [6,1.5,6,1.5,0.25,1.5,0.25,1.5,0.25,1.5], []
		]

		const DEFINED_WIDTH = [ '0', '0.13', '0.18', '0.25', '0.35', '0.5', '0.7', '1.0', '1.4', '2.0', '0' ]

		const DEFINED_TEXT_FONT = [ '' ]

		function user_defined_colour_feature ( red, green, blue ) {
			if ( role == 'line-simple' ) return
			DEFINED_COLOUR.push( `rgb(${ red },${ green },${ blue })` )
		}

		function user_defined_font_feature ( name, segment, pitch ) {
			if ( role == 'text' || role == 'line-simple' ) return
			DEFINED_FONT.push( pitch.match( /[\d.]+/g ).map( s => +s ) )
		}

		function width_feature ( width ) {
			if ( role == 'text' || role == 'line-simple' ) return
			DEFINED_WIDTH.push( width )
		}


		function line_feature ( layer, color, type, line_width, start_x, start_y, end_x, end_y ) {
			if ( role != 'line-strict' && role != 'line-simple' ) return
			const ctx = DEFINED_LAYER[ layer ]
			if ( ! ctx ) return
			//ctx.save( )
			if ( role == 'line-strict' ) {
				ctx.strokeStyle = DEFINED_COLOUR[ color ]
				console.log( ctx.strokeStyle )
				ctx.setLineDash( DEFINED_FONT[ type ] )
				ctx.lineWidth = DEFINED_WIDTH[ line_width ]
				ctx.moveTo( start_x, start_y )
				ctx.lineTo( end_x, end_y )
				ctx.stroke( )
			}
			if ( role == 'line-simple' ) {
				ctx.moveTo( start_x, start_y )
				ctx.lineTo( end_x, end_y )
			}
			//ctx.restore( )
		}

		function circle_feature ( layer, color, type, line_width, center_x, center_y, radius ) {
			if ( role != 'arc' ) return
			const ctx = DEFINED_LAYER[ layer ]
			if ( ! ctx ) return
			//ctx.save( )
			ctx.strokeStyle = DEFINED_COLOUR[ color ]
			ctx.setLineDash( DEFINED_FONT[ type ] )
			ctx.lineWidth = DEFINED_WIDTH[ line_width ]
			ctx.arc( center_x, center_y, radius, 0, Math.PI * 2, false )
			ctx.stroke( )
			//ctx.restore( )
		}

		function arc_feature ( layer, color, type, line_width, center_x, center_y, radius, direction, start_angle, end_angle ) {
			if ( role != 'arc' ) return
			const ctx = DEFINED_LAYER[ layer ]
			if ( ! ctx ) return
			//ctx.save( )
			ctx.strokeStyle = DEFINED_COLOUR[ color ]
			ctx.setLineDash( DEFINED_FONT[ type ] )
			ctx.lineWidth = DEFINED_WIDTH[ line_width ]
			ctx.arc( center_x, center_y, radius, Math.PI * 2 * start_angle / 360, Math.PI * 2 * end_angle / 360, ! direction )
			ctx.stroke( )
			//ctx.restore( )
		}

		function ellipse_arc_feature ( ) { }

		function text_font_feature ( name ) {
			if ( role != 'text' ) return
			DEFINED_TEXT_FONT.push( name )
		}

		function text_string_feature ( layer, color, font, str, text_x, text_y, height, width, spc, angle, slant, b_pnt, direct ) {
			if ( role != 'text' ) return
			const ctx = DEFINED_LAYER[ layer ]
			if ( ! ctx ) return
			//ctx.save( )
			ctx.fillStyle = DEFINED_COLOUR[ color ]
			ctx.font = `${ height }px "${ DEFINED_TEXT_FONT[ font ] }"`
			ctx.fillText( str, text_x, text_y, /*width*/ )
			//ctx.restore( )
		}

		function sfig_org_feature ( ) { }
		function sfig_locate_feature ( ) { }
		function drawing_sheet_feature ( ) { }
		function layer_feature ( ) { }



	} ).toString( ).match( /\n([\s\S]+)\n/ )[ 1 ]

	const end = ( ( ) => {
		if ( role == 'line-simple' ) DEFINED_LAYER[ 1 ].stroke( )
		console.log( role, 'finish' )
		createImageBitmap( DEFINED_LAYER[ 1 ].canvas ).then(
			bitmap => postMessage( { type: 'finish', bitmap }, [ bitmap ] )
		)
	} ).toString( ).match( /\n([\s\S]+)\n/ )[ 1 ]

	for ( let role of [ 'text', 'line-simple', 'line-strict', 'arc' ] ) {
		console.time( role )
		let worker = new Worker( URL.createObjectURL( new Blob(
			[
				init,
				'\n',
				'\t\tfunction start ( role ) {\n',
				'\t\tconsole.log( "start" )\n',
				pre, program,
				'\n', end,  '\n}'
			], { type: 'text/javascript' } )
		) )
		let canvas = new OffscreenCanvas( 5000, 5000 )
		let renderer = document.createElement( 'canvas' )
		renderer.style.border = 'solid 2px'
		renderer.width = renderer.height = 5000
		renderer.style.width = renderer.style.height = '1000px'
		let ctx = renderer.getContext( 'bitmaprenderer' )
		document.body.append( renderer )
		worker.postMessage( { type: 'start', role, canvas }, [ canvas ] )
		worker.onmessage = ( { data } ) => {
			switch ( data.type ) {
				case 'finish': {
					ctx.transferFromImageBitmap( data.bitmap )
					console.timeEnd( role )
				}
			}
		}
	}

}
