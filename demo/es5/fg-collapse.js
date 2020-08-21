"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Collapse = /*#__PURE__*/function (_HTMLElement) {
  _inherits(Collapse, _HTMLElement);

  var _super = _createSuper(Collapse);

  function Collapse() {
    _classCallCheck(this, Collapse);

    return _super.call(this);
  }

  _createClass(Collapse, [{
    key: "connectedCallback",
    value: function connectedCallback() {
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
      this.dispatchEvent(this.initEvent);
    }
  }, {
    key: "appendBtn",
    value: function appendBtn() {
      if (!this.headerBtn.matches("button")) {
        var btn = document.createElement("button");
        btn.innerHTML = this.toggletext;
        this.headerBtn.append(btn);
        this.headerBtn = btn;
      }
    }
  }, {
    key: "setRelationship",
    value: function setRelationship() {
      this.contentId = this.content.id || "collapsible_" + new Date().getTime();
      this.content.id = this.contentId;
      this.headerBtn.setAttribute("aria-controls", this.content.id);
    }
  }, {
    key: "expand",
    value: function expand() {
      this.headerBtn.setAttribute("aria-expanded", "true");
      this.removeAttribute("collapsed");
      this.collapsed = false;
      this.dispatchEvent(this.expandEvent);
    }
  }, {
    key: "collapse",
    value: function collapse() {
      this.headerBtn.setAttribute("aria-expanded", "false");
      this.setAttribute("collapsed", "");
      this.collapsed = true;
      this.dispatchEvent(this.collapseEvent);
    }
  }, {
    key: "setState",
    value: function setState() {
      if (this.collapsed) {
        this.collapse();
      } else {
        this.expand();
      }
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.collapsed) {
        this.expand();
      } else {
        this.collapse();
      }
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {// if needed..
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var self = this;
      this.firstElementChild.addEventListener('click', function (event) {
        return self.toggle();
      });
    }
  }]);

  return Collapse;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

if ('customElements' in window) {
  customElements.define('fg-collapse', Collapse);
}