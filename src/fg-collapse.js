
class Collapse extends HTMLElement {
	constructor(){
		super();
		this._init = this._init.bind(this);
    	this._observer = new MutationObserver(this._init);
	}
	connectedCallback(){
		if (this.children.length) {
			this._init();
		}
		this._observer.observe(this, { childList: true });
	}
	_init(){
		this.toggletext = "Toggle";
		var toggleAttr = this.getAttribute("toggletext");
		this.toggletext = toggleAttr !== null ? toggleAttr : this.toggletext;
		this.collapsed = this.getAttribute("collapsed") !== "false";
		this.classList.add("collapse");
		

		this.initEvent = this.makeEvent("init");
		this.expandEvent = this.makeEvent("expand");
		this.collapseEvent = this.makeEvent("collapseEvent");

		this.headerBtn = this.firstElementChild;
		this.content = this.headerBtn.nextElementSibling;
		this.appendBtn();
		this.setControlsRelationship();
		this.setState();
		this.cssStateOverride();
		this.staticHandler();
		this.menuRoleHandler();
		this.bindEvents();
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
		var whichMatches = Element.prototype.matches || Element.prototype.msMatchesSelector;
		if( !whichMatches.call(this.headerBtn, "button") ){
			var btn = document.createElement( "button" );
			btn.innerHTML = this.toggletext;
			this.headerBtn.appendChild( btn );
			this.headerBtn = btn;
		}
	}

	setControlsRelationship(){
		this.content.id = this.content.id ||  "collapsible_" + new Date().getTime();
		this.headerBtn.setAttribute( "aria-controls", this.content.id );
	}

	removeControlsRelationship(){
		this.headerBtn.removeAttribute( "aria-controls" );
	}

	setLabelRelationship(){
		this.headerBtn.id = this.headerBtn.id || this.content.id + "-headerbtn";
		this.content.setAttribute( "labelledby", this.headerBtn.id );
	}

	removeLabelRelationship(){
		this.content.removeAttribute( "labelledby", this.headerBtn.id );
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

	cssStateOverride(){
		var startState = this.collapsed;
		var contentOverride = window.getComputedStyle( this ).getPropertyValue( "--collapse-state" );
		if ( contentOverride.match(/collapsed/) ){
			this.collapsed = true;
		}
		if ( contentOverride.match(/expanded/) ){
			this.collapsed = false;
		}
		if( this.collapsed !== startState ){
			this.setState();
		}
	}

	setState(){
		if( this.collapsed ){
			this.collapse();
		}
		else {
			this.expand();
		}
	}

	_contentIsAbsolute(){
		return window.getComputedStyle( this.content ).getPropertyValue( "position" ) === "absolute";
	}

	_hoverEnabled(){
		return window.getComputedStyle( this.content ).getPropertyValue( "--collapse-hover" ).match(/true/);
	}

	// if btn is non-interactive
	_isNonInteractive(){
		var headerProps = window.getComputedStyle( this.headerBtn )
		return headerProps.getPropertyValue( "pointer-events" ) === "none" || headerProps.getPropertyValue( "display" ) === "none";
	}

	staticHandler(){
		if( this._isNonInteractive() ){
			this.headerBtn.removeAttribute( "aria-expanded" );
			this.headerBtn.setAttribute( "role", "heading" );
			this.removeControlsRelationship();

		} else {
			this.setControlsRelationship();
			this.headerBtn.removeAttribute( "role" );
		}
	}

	menuRoleHandler(){
		// if menu content is absolute and button is interactive, it's a menu
		if( this._contentIsAbsolute() && !this._isNonInteractive() ){
			this.headerBtn.setAttribute( "aria-haspopup", true );
			this.content.setAttribute( "role", "menu" );
			this.content.setAttribute( "aria-labelledby", this.headerBtn.id );
			this.content.setAttribute( "tabindex", "-1" );
			this.content.querySelectorAll( "li" ).forEach(function( elem ){
				elem.setAttribute( "role", "menuitem" );
				elem.setAttribute( "tabindex", "-1" );
			});
			this.setLabelRelationship();
		}
		else {
			this.headerBtn.removeAttribute( "aria-haspopup" );
			this.content.removeAttribute( "role" );
			this.content.removeAttribute( "aria-labelledby" );
			this.content.removeAttribute( "tabindex" );
			this.content.querySelectorAll( "[role=menuitem]" ).forEach(function(elem){
				elem.removeAttribute( "role" );
				elem.removeAttribute( "tabindex" );
			});
			this.removeLabelRelationship();

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
		 this._observer.disconnect();
		 this.resizeObserver.disconnect();
	}

	bindEvents(){
		var self = this;
		this.firstElementChild.addEventListener('click', event => self.toggle());

		// hover handling
		this.addEventListener('mouseenter', function(){
			if( self._hoverEnabled() ){
				self.expand();
			}
		});

		this.addEventListener('mouseleave', function(){
			if( self._hoverEnabled() ){
				self.collapse();
			}
		});

		// click-out and focus-out when acting as a menu
		this.addEventListener("focusout", function( e ){
			if( this._contentIsAbsolute() ){
				self.collapse();
			}
		});

		// possibly move to a resize handler
		this.resizeObserver = new ResizeObserver(entries => {
			for (const entry of entries) {
				self.setControlsRelationship();
				self.setState();
				self.cssStateOverride();
				self.staticHandler();
				self.menuRoleHandler();
			}
		});
		this.resizeObserver.observe(document.body);
	}
}

if ('customElements' in window) {
	customElements.define('fg-collapse', Collapse );
}