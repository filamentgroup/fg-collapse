
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

		this.initEvent = new CustomEvent("init", {
			bubbles: true,
			cancelable: false
		});

		this.expandEvent = new CustomEvent("expand", {
			bubbles: true,
			cancelable: false
		});
	
		this.collapseEvent = new CustomEvent("collapse", {
			bubbles: true,
			cancelable: false
		});
		this.headerBtn = this.firstElementChild;
		this.content = this.headerBtn.nextElementSibling;
		this.appendBtn();
		this.setRelationship();
		this.bindEvents();
		this.setState();
		this.addStyle();
		this.dispatchEvent( this.initEvent );
	}

	appendBtn(){
		if( !this.headerBtn.matches( "button" ) ){
			var btn = document.createElement( "button" );
			btn.innerHTML = this.toggletext;
			this.headerBtn.append( btn );
			this.headerBtn = btn;
		}
	}

	setRelationship(){
		this.contentId = this.content.id || "collapsible_" + new Date().getTime();
		this.content.id = this.contentId;
		this.headerBtn.setAttribute( "aria-controls", this.content.id );
	}

	addStyle(){
		var style = document.createElement("style");
		style.innerText = `
			fg-collapse[collapsed] > *:nth-child(2) { display: none; }
		`;
		this.append(style);
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