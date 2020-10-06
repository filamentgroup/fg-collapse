
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
				if( elem.classList.contains("menu_item_check")  ){
					elem.setAttribute( "role", "menuitemcheckbox" );
					elem.setAttribute( "aria-checked", elem.classList.contains("menu_item_check-checked") ? "true" : "false" );
				}
				else {
					elem.setAttribute( "role", "menuitem" );
				}
				elem.setAttribute( "tabindex", "-1" );
			});
			this.setLabelRelationship();
			this.menu = true;
		}
		else {
			this.headerBtn.removeAttribute( "aria-haspopup" );
			this.content.removeAttribute( "role" );
			this.content.removeAttribute( "aria-labelledby" );
			this.content.removeAttribute( "tabindex" );
			this.content.querySelectorAll( "[role=menuitem],[role=menuitemcheckbox]" ).forEach(function(elem){
				elem.removeAttribute( "role" );
				elem.removeAttribute( "tabindex" );
			});
			this.removeLabelRelationship();
			this.menu = false;
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

	_collapseIfOutsideTarget(e){
		if( e.target !== this 
			&& !this.contains( e.target ) 
			&& this._contentIsAbsolute() 
			&& !this.collapsed ){
			this.collapse();
		}
	}

	_focusFirstMenuItem(){
		this.content.querySelector( "[role=menuitem], [role=menuitemcheckbox]").focus();
	}

	_focusNextMenuItem( dir ){
		var self = this;
		var activeIndex = 1;
		dir = dir || 1;
		var nextItem;
		var i = 0;
		var menuItems = this.content.querySelectorAll( "[role=menuitem], [role=menuitemcheckbox]");
		menuItems.forEach(function(elem){
			if( self.focusedItem && elem === self.focusedItem ){
				activeIndex = i;
			}
			i++;
		});
		nextItem = menuItems[ activeIndex + dir ];
		if( nextItem ){
			nextItem.focus();
		}
		else if( dir === -1 ){
			this.headerBtn.focus();
		}
	}

	_handleCheckToggle(e){
		var self = this;
		if( self.menu && e.target.closest( "[role=menuitemcheckbox]" ) ){
			e.preventDefault();
			var menuItem = e.target.closest( "[role=menuitemcheckbox]" );
			var checkedState = menuItem.getAttribute( "aria-checked" ) === "true" ? "false" : "true";
			menuItem.setAttribute( "aria-checked", checkedState );
			if( checkedState === "true" ){
				menuItem.classList.add( "menu_item_check-checked" );
			}
			else {
				menuItem.classList.remove( "menu_item_check-checked" );
			}
		}
	}

	bindEvents(){
		var self = this;
		this.firstElementChild.addEventListener('click', event => self.toggle());

		// hover handling
		this.addEventListener('mouseenter', function(){
			if( self._hoverEnabled() ){
				self.expand();
				self._focusFirstMenuItem();
			}
		});

		this.addEventListener('mouseleave', function(){
			if( self._hoverEnabled() ){
				self.collapse();
			}
		});

		// click-out and focus-out when acting as a menu
		document.body.addEventListener("focusin", function( e ){
			self._collapseIfOutsideTarget(e);
		});
		document.body.addEventListener("pointerdown", function( e ){
			self._collapseIfOutsideTarget(e);
		});

		// menu key handling
		this.headerBtn.addEventListener('keydown', function( e ){
			if( self.menu ){
				// arrow expand, also enter and space keys work
				if( e.which === 40 ){
					e.preventDefault();
					if( self.collapsed ){
						self.expand();
					}
					self._focusFirstMenuItem();
				}
				// tab collapses and moves on
				else if( e.which === 9 ){
					self.collapse();
				}
			}
		});

		this.content.addEventListener('keydown', function( e ){
			if( self.menu ){
				// arrow down
				if( e.which === 40 ){
					e.preventDefault();
					self._focusNextMenuItem(1);
				}
				// arrow up
				if( e.which === 38 ){
					e.preventDefault();
					self._focusNextMenuItem(-1);
				}
				// tab away
				if( e.which === 9 ){
					self.collapse();
				}
				// esc away
				if( e.which === 27 ){
					self.collapse();
					self.headerBtn.focus();
				}
				// space or enter
				if( e.which === 32 || e.which === 13 ){
					self._handleCheckToggle(e);
				}
			}
		});

		this.content.addEventListener("focusin", function( e ){
			if( self.menu && e.target.closest( "[role=menuitem],[role=menuitemcheckbox]" ) ){
				self.focusedItem = e.target.closest( "[role=menuitem],[role=menuitemcheckbox]" );
			}
		});

		this.content.addEventListener("click", function( e ){
			self._handleCheckToggle(e);
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