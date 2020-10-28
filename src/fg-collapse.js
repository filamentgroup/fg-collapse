
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
		this.addMenuSemantics();
		this.popupHandler();
		this.setState();
		this.cssStateOverride();
		this.staticHandler();
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
			if( this.menuSemantics ){
				this.content.setAttribute( "tabindex", "0" );
			}
		} else {
			this.setControlsRelationship();
			this.headerBtn.removeAttribute( "role" );
			if( this.menuSemantics ){
				this.content.setAttribute( "tabindex", "-1" );
			}
		}
	}

	addMenuSemantics(){
		if( this.getAttribute( "data-collapse-role" ) === "menu" ){
			this.menuSemantics = true;
			this.content.setAttribute( "role", "menu" );
			this.content.setAttribute( "tabindex", "-1" );
			this.headerBtn.id = this.headerBtn.id || this.content.id + "-headerbtn";
			this.content.setAttribute( "labelledby", this.headerBtn.id );
			this.content.querySelectorAll( ".menu_item_group" ).forEach(function(elem){
				elem.setAttribute( "role", "group" );
			});
			this.content.querySelectorAll( "li" ).forEach(function( elem ){
				if( elem.classList.contains("menu_item_check")  ){
					elem.setAttribute( "role", "menuitemcheckbox" );
					elem.setAttribute( "aria-checked", elem.classList.contains("menu_item_check-checked") ? "true" : "false" );
				}
				else if( elem.classList.contains("menu_item_radio")  ){
					elem.setAttribute( "role", "menuitemradio" );
					elem.setAttribute( "aria-checked", elem.classList.contains("menu_item_radio-checked") ? "true" : "false" );
				}
				else {
					elem.setAttribute( "role", "menuitem" );
				}
				elem.setAttribute( "tabindex", "-1" );
			});
		}
	}

	popupHandler(){
		// if menu content is absolute and button is interactive, it's a popup
		if( this._contentIsAbsolute() && !this._isNonInteractive() ){
			this.headerBtn.setAttribute( "aria-haspopup", true );
			this.popup = true;
		}
		else {
			this.headerBtn.removeAttribute( "aria-haspopup" );
			this.popup = false;
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
		this.content.querySelector( "[role=menuitem], [role=menuitemcheckbox], [role=menuitemradio]").focus();
	}

	_focusNextMenuItem( dir ){
		var self = this;
		var activeIndex = 0;
		dir = dir || 1;
		var nextItem;
		var i = 0;
		var menuItems = this.content.querySelectorAll( "[role=menuitem], [role=menuitemcheckbox], , [role=menuitemradio]");
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
		if( self.menuSemantics && e.target.closest( "[role=menuitemcheckbox], [role=menuitemradio]" ) ){
			e.preventDefault();
			var menuItemCheck = e.target.closest( "[role=menuitemcheckbox]" );
			if( menuItemCheck ){
				var checkToggledState = menuItemCheck.getAttribute( "aria-checked" ) === "true" ? "false" : "true";
				menuItemCheck.setAttribute( "aria-checked", checkToggledState );
				if( checkToggledState === "true" ){
					menuItemCheck.classList.add( "menu_item_check-checked" );
				}
				else {
					menuItemCheck.classList.remove( "menu_item_check-checked" );
				}
			}
			var menuItemRadio = e.target.closest( "[role=menuitemradio]" );
			if( menuItemRadio ){
				var menuItemRadioChecked = menuItemRadio.getAttribute( "aria-checked" );
				if( menuItemRadioChecked === null || menuItemRadioChecked === "false" ){
					menuItemRadio.parentElement.childNodes.forEach( function( elem ){
						elem.setAttribute( "aria-checked", "false" );
						elem.classList.remove( "menu_item_radio-checked" );
					})
					menuItemRadio.setAttribute( "aria-checked", "true" );
					menuItemRadio.classList.add( "menu_item_radio-checked" );
				}
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
			
				// arrow expand, also enter and space keys work
				if( e.which === 40 ){
					e.preventDefault();
					if( self.collapsed && self.popup ){
						self.expand();
					}
					if( self.menuSemantics ){
						self._focusFirstMenuItem();
					}
				}
				// tab collapses and moves on
				else if( e.which === 9 && self.popup ){
					self.collapse();
				}
		});

		this.content.addEventListener('keydown', function( e ){
			if( self.menuSemantics ){
				// arrow down
				if( e.which === 40 ){
					e.preventDefault();
					if( e.target === self.content ){
						self._focusFirstMenuItem();
					}
					else {
						self._focusNextMenuItem(1);
					}
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
					self.headerBtn.focus();
					self.collapse();
				}
				// space or enter
				if( e.which === 32 || e.which === 13 ){
					self._handleCheckToggle(e);
				}
			}
		});

		this.content.addEventListener("focusin", function( e ){
			if( self.menuSemantics && e.target.closest( "[role=menuitem],[role=menuitemcheckbox],[role=menuitemradio]" ) ){
				self.focusedItem = e.target.closest( "[role=menuitem],[role=menuitemcheckbox],[role=menuitemradio]" );
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
				self.popupHandler();
			}
		});
		this.resizeObserver.observe(document.body);
	}
}

if ('customElements' in window) {
	customElements.define('fg-collapse', Collapse );
}