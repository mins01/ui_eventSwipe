/**
 * event for swipe
 */

// Polyfill https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function () {
	if ( typeof window.CustomEvent === "function" ) return false;
	function CustomEvent ( event, params ) {
		params = params || { bubbles: false, cancelable: false, detail: null };
		var evt = document.createEvent( 'CustomEvent' );
		evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		return evt;
	}
	window.CustomEvent = CustomEvent;
})();

const eventSwipe = (function(){
	let eventSwipe = {
		debug:false,
	};
	let pointerState = {
		actived:0,
		x:null,
		y:null,
		swipeStartTarget:null,
	}
	let pointerdown = function(evt){
		pointerState.actived=1;
		pointerState.x=evt.clientX;
		pointerState.y=evt.clientY;
		pointerState.swipeStartTarget=evt.target;
		let eventData = {
			deltaX:0,
			deltaY:0,
			swipeStartTarget:pointerState.swipeStartTarget,
		};
		evt.target.dispatchEvent(new CustomEvent('swipestart', { bubbles: true, cancelable: true, detail: eventData }));
		if(eventSwipe.debug){ console.log(evt); }
	};
	let pointermove = function(evt){
		if(!pointerState.actived){return}
		let eventData = {
			deltaX:evt.clientX-pointerState.x,
			deltaY:evt.clientY-pointerState.y,
			swipeStartTarget:pointerState.swipeStartTarget,
		};
		evt.target.dispatchEvent(new CustomEvent('swipemove', { bubbles: true, cancelable: true, detail: eventData }));
		if(eventSwipe.debug){ console.log(evt); }
	};
	let pointerup = function(evt){
		if(!pointerState.actived){return}
		let eventData = {
			deltaX:evt.clientX-pointerState.x,
			deltaY:evt.clientY-pointerState.y,
			swipeStartTarget:pointerState.swipeStartTarget,
		};
		evt.target.dispatchEvent(new CustomEvent('swipeend', { bubbles: true, cancelable: true, detail: eventData }));
		pointerState.actived=false;
		pointerState.x=null;
		pointerState.y=null;
		pointerState.swipeStartTarget=null;
		if(eventSwipe.debug){ console.log(evt); }
	};
	document.addEventListener('pointerdown',pointerdown,false)
	document.addEventListener('pointermove',pointermove,false)
	document.addEventListener('pointerup',pointerup,false)

	return eventSwipe;
})()