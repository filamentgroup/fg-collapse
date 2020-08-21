
class Collapse extends HTMLElement {
	constructor(){
		super();
	}
	connectedCallback(){
		this.toggletext = "Toggle";
		var toggleAttr = this.getAttribute("toggletext");
		this.toggletext = toggleAttr !== null ? toggleAttr : this.toggletext;
		this.collapsed = this.getAttribute("collapsed") !== false;
		this.classList.add("collapse");

		this.initEvent = this.makeEvent("init");
		this.expandEvent = this.makeEvent("expand");
		this.collapseEvent = this.makeEvent("collapseEvent");

		this.headerBtn = this.firstElementChild;
		this.content = this.headerBtn.nextElementSibling;
		this.appendBtn();
		this.setRelationship();
		this.bindEvents();
		this.setState();
		this.dispatchEvent( this.initEvent );
	}
	makeEvent( evtName ){
		if( typeof window.CustomEvent === "function" ){
			return new CustomEvent( evtName, {
				bubbles: true,
				cancelable: false
			});
		} else {
			var evt = document.createEvent('CustomEvent');
			evt.initCustomEvent( evtName, true, true, {} );
			return evt;
		}
	}

	appendBtn(){
		if( !this.headerBtn.matches( "button" ) ){
			var btn = document.createElement( "button" );
			btn.innerHTML = this.toggletext;
			this.headerBtn.appendChild( btn );
			this.headerBtn = btn;
		}
	}

	setRelationship(){
		this.contentId = this.content.id || "collapsible_" + new Date().getTime();
		this.content.id = this.contentId;
		this.headerBtn.setAttribute( "aria-controls", this.content.id );
	}

	expand(){
		this.headerBtn.setAttribute( "aria-expanded", "true" );
		this.removeAttribute( "collapsed" );
		this.collapsed = false;
		this.dispatchEvent( this.expandEvent );
	}

	collapse(){
		this.headerBtn.setAttribute( "aria-expanded", "false" );
		this.setAttribute( "collapsed", "" );
		this.collapsed = true;
		this.dispatchEvent( this.collapseEvent );
	}

	setState(){
		if( this.collapsed ){
			this.collapse();
		}
		else {
			this.expand();
		}
	}

	toggle(){
		if( this.collapsed ){
			this.expand();
		}
		else {
			this.collapse();
		}
	}
	disconnectedCallback(){
		// if needed..
	}

	bindEvents(){
		var self = this;
		this.firstElementChild.addEventListener('click', event => self.toggle());
	}
}

if ('customElements' in window) {
	customElements.define('fg-collapse', Collapse );
}