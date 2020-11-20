"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
    var _this;

    _classCallCheck(this, Collapse);

    _this = _super.call(this);
    _this._init = _this._init.bind(_assertThisInitialized(_this));
    _this._observer = new MutationObserver(_this._init);
    return _this;
  }

  _createClass(Collapse, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      if (this.children.length) {
        this._init();
      }

      this._observer.observe(this, {
        childList: true
      });
    }
  }, {
    key: "_init",
    value: function _init() {
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
      this.popupHandler(); //this.setState();

      this.cssStateOverride();
      this.staticHandler();
      this.bindEvents();
      this.dispatchEvent(this.initEvent);
    }
  }, {
    key: "makeEvent",
    value: function makeEvent(evtName) {
      if (typeof window.CustomEvent === "function") {
        return new CustomEvent(evtName, {
          bubbles: true,
          cancelable: false
        });
      } else {
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(evtName, true, true, {});
        return evt;
      }
    }
  }, {
    key: "appendBtn",
    value: function appendBtn() {
      var whichMatches = Element.prototype.matches || Element.prototype.msMatchesSelector;

      if (!whichMatches.call(this.headerBtn, "button")) {
        var btn = document.createElement("button");
        btn.innerHTML = this.toggletext;
        this.headerBtn.appendChild(btn);
        this.headerBtn = btn;
      }
    }
  }, {
    key: "setControlsRelationship",
    value: function setControlsRelationship() {
      this.content.id = this.content.id || "collapsible_" + new Date().getTime();
      this.headerBtn.setAttribute("aria-controls", this.content.id);
    }
  }, {
    key: "removeControlsRelationship",
    value: function removeControlsRelationship() {
      this.headerBtn.removeAttribute("aria-controls");
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
      this.setAttribute("collapsed", "true");
      this.collapsed = true;
      this.dispatchEvent(this.collapseEvent);
    }
  }, {
    key: "cssStateOverride",
    value: function cssStateOverride() {
      var startState = this.collapsed;
      var contentOverride = window.getComputedStyle(this).getPropertyValue("--collapse-state");

      if (contentOverride.match(/collapsed/)) {
        this.collapsed = true;
      }

      if (contentOverride.match(/expanded/)) {
        this.collapsed = false;
      }

      if (this.collapsed !== startState) {
        this.setState();
      }
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
    key: "_contentIsAbsolute",
    value: function _contentIsAbsolute() {
      return window.getComputedStyle(this.content).getPropertyValue("position") === "absolute";
    }
  }, {
    key: "_hoverEnabled",
    value: function _hoverEnabled() {
      return window.getComputedStyle(this.content).getPropertyValue("--collapse-hover").match(/true/);
    } // if btn is non-interactive

  }, {
    key: "_isNonInteractive",
    value: function _isNonInteractive() {
      var headerProps = window.getComputedStyle(this.headerBtn);
      return headerProps.getPropertyValue("pointer-events") === "none" || headerProps.getPropertyValue("display") === "none";
    }
  }, {
    key: "staticHandler",
    value: function staticHandler() {
      if (this._isNonInteractive()) {
        this.headerBtn.removeAttribute("aria-expanded");
        this.headerBtn.setAttribute("role", "heading");
        this.removeControlsRelationship();

        if (this.menuSemantics) {
          this.content.setAttribute("tabindex", "0");
        }
      } else {
        this.setControlsRelationship();
        this.headerBtn.removeAttribute("role");

        if (this.menuSemantics) {
          this.content.setAttribute("tabindex", "-1");
        }
      }
    }
  }, {
    key: "addMenuSemantics",
    value: function addMenuSemantics() {
      if (this.getAttribute("data-collapse-role") === "menu") {
        this.menuSemantics = true;
        this.content.setAttribute("role", "menu");
        this.content.setAttribute("tabindex", "-1");
        this.headerBtn.id = this.headerBtn.id || this.content.id + "-headerbtn";
        this.content.setAttribute("labelledby", this.headerBtn.id);
        this.content.querySelectorAll(".menu_item_group").forEach(function (elem) {
          elem.setAttribute("role", "group");
        });
        this.content.querySelectorAll("li").forEach(function (elem) {
          if (elem.classList.contains("menu_item_check")) {
            elem.setAttribute("role", "menuitemcheckbox");
            elem.setAttribute("aria-checked", elem.classList.contains("menu_item_check-checked") ? "true" : "false");
          } else if (elem.classList.contains("menu_item_radio")) {
            elem.setAttribute("role", "menuitemradio");
            elem.setAttribute("aria-checked", elem.classList.contains("menu_item_radio-checked") ? "true" : "false");
          } else {
            elem.setAttribute("role", "menuitem");
          }

          elem.setAttribute("tabindex", "-1");
        });
      }
    }
  }, {
    key: "popupHandler",
    value: function popupHandler() {
      // if menu content is absolute and button is interactive, it's a popup
      if (this._contentIsAbsolute() && !this._isNonInteractive()) {
        this.headerBtn.setAttribute("aria-haspopup", true);
        this.popup = true;
      } else {
        this.headerBtn.removeAttribute("aria-haspopup");
        this.popup = false;
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
    value: function disconnectedCallback() {
      this._observer.disconnect();

      this.resizeObserver.disconnect();
    }
  }, {
    key: "_collapseIfOutsideTarget",
    value: function _collapseIfOutsideTarget(e) {
      if (e.target !== this && !this.contains(e.target) && this._contentIsAbsolute() && !this.collapsed) {
        this.collapse();
      }
    }
  }, {
    key: "_focusFirstMenuItem",
    value: function _focusFirstMenuItem() {
      this.content.querySelector("[role=menuitem], [role=menuitemcheckbox], [role=menuitemradio]").focus();
    }
  }, {
    key: "_focusNextMenuItem",
    value: function _focusNextMenuItem(dir) {
      var self = this;
      var activeIndex = 0;
      dir = dir || 1;
      var nextItem;
      var i = 0;
      var menuItems = this.content.querySelectorAll("[role=menuitem], [role=menuitemcheckbox], , [role=menuitemradio]");
      menuItems.forEach(function (elem) {
        if (self.focusedItem && elem === self.focusedItem) {
          activeIndex = i;
        }

        i++;
      });
      nextItem = menuItems[activeIndex + dir];

      if (nextItem) {
        nextItem.focus();
      } else if (dir === -1) {
        this.headerBtn.focus();
      }
    }
  }, {
    key: "_handleCheckToggle",
    value: function _handleCheckToggle(e) {
      var self = this;

      if (self.menuSemantics && e.target.closest("[role=menuitemcheckbox], [role=menuitemradio]")) {
        e.preventDefault();
        var menuItemCheck = e.target.closest("[role=menuitemcheckbox]");

        if (menuItemCheck) {
          var checkToggledState = menuItemCheck.getAttribute("aria-checked") === "true" ? "false" : "true";
          menuItemCheck.setAttribute("aria-checked", checkToggledState);

          if (checkToggledState === "true") {
            menuItemCheck.classList.add("menu_item_check-checked");
          } else {
            menuItemCheck.classList.remove("menu_item_check-checked");
          }
        }

        var menuItemRadio = e.target.closest("[role=menuitemradio]");

        if (menuItemRadio) {
          var menuItemRadioChecked = menuItemRadio.getAttribute("aria-checked");

          if (menuItemRadioChecked === null || menuItemRadioChecked === "false") {
            menuItemRadio.parentElement.childNodes.forEach(function (elem) {
              elem.setAttribute("aria-checked", "false");
              elem.classList.remove("menu_item_radio-checked");
            });
            menuItemRadio.setAttribute("aria-checked", "true");
            menuItemRadio.classList.add("menu_item_radio-checked");
          }
        }
      }
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var self = this;
      this.firstElementChild.addEventListener('click', function (event) {
        return self.toggle();
      }); // hover handling

      this.addEventListener('mouseenter', function () {
        if (self._hoverEnabled()) {
          self.expand();

          self._focusFirstMenuItem();
        }
      });
      this.addEventListener('mouseleave', function () {
        if (self._hoverEnabled()) {
          self.collapse();
        }
      }); // click-out and focus-out when acting as a menu

      document.body.addEventListener("focusin", function (e) {
        self._collapseIfOutsideTarget(e);
      });
      document.body.addEventListener("pointerdown", function (e) {
        self._collapseIfOutsideTarget(e);
      }); // menu key handling

      this.headerBtn.addEventListener('keydown', function (e) {
        // arrow expand, also enter and space keys work
        if (e.which === 40) {
          e.preventDefault();

          if (self.collapsed && self.popup) {
            self.expand();
          }

          if (self.menuSemantics) {
            self._focusFirstMenuItem();
          }
        } // tab collapses and moves on
        else if (e.which === 9 && self.popup) {
            self.collapse();
          }
      });
      this.content.addEventListener('keydown', function (e) {
        if (self.menuSemantics) {
          // arrow down
          if (e.which === 40) {
            e.preventDefault();

            if (e.target === self.content) {
              self._focusFirstMenuItem();
            } else {
              self._focusNextMenuItem(1);
            }
          } // arrow up


          if (e.which === 38) {
            e.preventDefault();

            self._focusNextMenuItem(-1);
          } // tab away


          if (e.which === 9) {
            self.collapse();
          } // esc away


          if (e.which === 27) {
            self.headerBtn.focus();
            self.collapse();
          } // space or enter


          if (e.which === 32 || e.which === 13) {
            self._handleCheckToggle(e);
          }
        }
      });
      this.content.addEventListener("focusin", function (e) {
        if (self.menuSemantics && e.target.closest("[role=menuitem],[role=menuitemcheckbox],[role=menuitemradio]")) {
          self.focusedItem = e.target.closest("[role=menuitem],[role=menuitemcheckbox],[role=menuitemradio]");
        }
      });
      this.content.addEventListener("click", function (e) {
        self._handleCheckToggle(e);
      }); // possibly move to a resize handler

      this.resizeObserver = new ResizeObserver(function (entries) {
        var _iterator = _createForOfIteratorHelper(entries),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            self.setControlsRelationship();
            self.setState();
            self.cssStateOverride();
            self.staticHandler();
            self.popupHandler();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
      this.resizeObserver.observe(document.body);
    }
  }]);

  return Collapse;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

if ('customElements' in window) {
  customElements.define('fg-collapse', Collapse);
}