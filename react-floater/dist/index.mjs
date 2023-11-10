// src/index.tsx
import * as React8 from "react";

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle2(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle2(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle2(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x, y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed2 = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed2 && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed2 && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }, getWindow(popper2)) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle2(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed2) {
  if (isFixed2 === void 0) {
    isFixed2 = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed2);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed2) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions2 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions2;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions2),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions2, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref) {
        var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect4 = _ref.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/popper.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});

// node_modules/.pnpm/is-lite@0.9.3/node_modules/is-lite/dist/index.mjs
var DOM_PROPERTIES_TO_CHECK = [
  "innerHTML",
  "ownerDocument",
  "style",
  "attributes",
  "nodeValue"
];
var objectTypes = [
  "Array",
  "ArrayBuffer",
  "AsyncFunction",
  "AsyncGenerator",
  "AsyncGeneratorFunction",
  "Date",
  "Error",
  "Function",
  "Generator",
  "GeneratorFunction",
  "HTMLElement",
  "Map",
  "Object",
  "Promise",
  "RegExp",
  "Set",
  "WeakMap",
  "WeakSet"
];
var primitiveTypes = [
  "bigint",
  "boolean",
  "null",
  "number",
  "string",
  "symbol",
  "undefined"
];
function getObjectType(value) {
  const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
  if (/HTML\w+Element/.test(objectTypeName)) {
    return "HTMLElement";
  }
  if (isObjectType(objectTypeName)) {
    return objectTypeName;
  }
  return void 0;
}
function isObjectOfType(type) {
  return (value) => getObjectType(value) === type;
}
function isObjectType(name) {
  return objectTypes.includes(name);
}
function isOfType(type) {
  return (value) => typeof value === type;
}
function isPrimitiveType(name) {
  return primitiveTypes.includes(name);
}
function is(value) {
  if (value === null) {
    return "null";
  }
  switch (typeof value) {
    case "bigint":
      return "bigint";
    case "boolean":
      return "boolean";
    case "number":
      return "number";
    case "string":
      return "string";
    case "symbol":
      return "symbol";
    case "undefined":
      return "undefined";
    default:
  }
  if (is.array(value)) {
    return "Array";
  }
  if (is.plainFunction(value)) {
    return "Function";
  }
  const tagType = getObjectType(value);
  if (tagType) {
    return tagType;
  }
  return "Object";
}
is.array = Array.isArray;
is.arrayOf = (target, predicate) => {
  if (!is.array(target) && !is.function(predicate)) {
    return false;
  }
  return target.every((d) => predicate(d));
};
is.asyncGeneratorFunction = (value) => getObjectType(value) === "AsyncGeneratorFunction";
is.asyncFunction = isObjectOfType("AsyncFunction");
is.bigint = isOfType("bigint");
is.boolean = (value) => {
  return value === true || value === false;
};
is.date = isObjectOfType("Date");
is.defined = (value) => !is.undefined(value);
is.domElement = (value) => {
  return is.object(value) && !is.plainObject(value) && value.nodeType === 1 && is.string(value.nodeName) && DOM_PROPERTIES_TO_CHECK.every((property) => property in value);
};
is.empty = (value) => {
  return is.string(value) && value.length === 0 || is.array(value) && value.length === 0 || is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length === 0 || is.set(value) && value.size === 0 || is.map(value) && value.size === 0;
};
is.error = isObjectOfType("Error");
is.function = isOfType("function");
is.generator = (value) => {
  return is.iterable(value) && is.function(value.next) && is.function(value.throw);
};
is.generatorFunction = isObjectOfType("GeneratorFunction");
is.instanceOf = (instance, class_) => {
  if (!instance || !class_) {
    return false;
  }
  return Object.getPrototypeOf(instance) === class_.prototype;
};
is.iterable = (value) => {
  return !is.nullOrUndefined(value) && is.function(value[Symbol.iterator]);
};
is.map = isObjectOfType("Map");
is.nan = (value) => {
  return Number.isNaN(value);
};
is.null = (value) => {
  return value === null;
};
is.nullOrUndefined = (value) => {
  return is.null(value) || is.undefined(value);
};
is.number = (value) => {
  return isOfType("number")(value) && !is.nan(value);
};
is.numericString = (value) => {
  return is.string(value) && value.length > 0 && !Number.isNaN(Number(value));
};
is.object = (value) => {
  return !is.nullOrUndefined(value) && (is.function(value) || typeof value === "object");
};
is.oneOf = (target, value) => {
  if (!is.array(target)) {
    return false;
  }
  return target.indexOf(value) > -1;
};
is.plainFunction = isObjectOfType("Function");
is.plainObject = (value) => {
  if (getObjectType(value) !== "Object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.getPrototypeOf({});
};
is.primitive = (value) => is.null(value) || isPrimitiveType(typeof value);
is.promise = isObjectOfType("Promise");
is.propertyOf = (target, key, predicate) => {
  if (!is.object(target) || !key) {
    return false;
  }
  const value = target[key];
  if (is.function(predicate)) {
    return predicate(value);
  }
  return is.defined(value);
};
is.regexp = isObjectOfType("RegExp");
is.set = isObjectOfType("Set");
is.string = isOfType("string");
is.symbol = isOfType("symbol");
is.undefined = isOfType("undefined");
is.weakMap = isObjectOfType("WeakMap");
is.weakSet = isObjectOfType("WeakSet");
var src_default = is;

// node_modules/.pnpm/tree-changes-hook@0.10.0_react@18.2.0/node_modules/tree-changes-hook/dist/index.mjs
import { useEffect, useRef } from "react";

// node_modules/.pnpm/@gilbarbara+deep-equal@0.1.2/node_modules/@gilbarbara/deep-equal/esm/helpers.js
function isOfType2(type) {
  return function(value) {
    return typeof value === type;
  };
}
var isFunction = isOfType2("function");
var isNull = function(value) {
  return value === null;
};
var isRegex = function(value) {
  return Object.prototype.toString.call(value).slice(8, -1) === "RegExp";
};
var isObject = function(value) {
  return !isUndefined(value) && !isNull(value) && (isFunction(value) || typeof value === "object");
};
var isUndefined = isOfType2("undefined");

// node_modules/.pnpm/@gilbarbara+deep-equal@0.1.2/node_modules/@gilbarbara/deep-equal/esm/index.js
var __values = function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
function equalArray(left2, right2) {
  var length = left2.length;
  if (length !== right2.length) {
    return false;
  }
  for (var index = length; index-- !== 0; ) {
    if (!equal(left2[index], right2[index])) {
      return false;
    }
  }
  return true;
}
function equalArrayBuffer(left2, right2) {
  if (left2.byteLength !== right2.byteLength) {
    return false;
  }
  var view1 = new DataView(left2.buffer);
  var view2 = new DataView(right2.buffer);
  var index = left2.byteLength;
  while (index--) {
    if (view1.getUint8(index) !== view2.getUint8(index)) {
      return false;
    }
  }
  return true;
}
function equalMap(left2, right2) {
  var e_1, _a, e_2, _b;
  if (left2.size !== right2.size) {
    return false;
  }
  try {
    for (var _c = __values(left2.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
      var index = _d.value;
      if (!right2.has(index[0])) {
        return false;
      }
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_d && !_d.done && (_a = _c.return))
        _a.call(_c);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  try {
    for (var _e = __values(left2.entries()), _f = _e.next(); !_f.done; _f = _e.next()) {
      var index = _f.value;
      if (!equal(index[1], right2.get(index[0]))) {
        return false;
      }
    }
  } catch (e_2_1) {
    e_2 = { error: e_2_1 };
  } finally {
    try {
      if (_f && !_f.done && (_b = _e.return))
        _b.call(_e);
    } finally {
      if (e_2)
        throw e_2.error;
    }
  }
  return true;
}
function equalSet(left2, right2) {
  var e_3, _a;
  if (left2.size !== right2.size) {
    return false;
  }
  try {
    for (var _b = __values(left2.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
      var index = _c.value;
      if (!right2.has(index[0])) {
        return false;
      }
    }
  } catch (e_3_1) {
    e_3 = { error: e_3_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return))
        _a.call(_b);
    } finally {
      if (e_3)
        throw e_3.error;
    }
  }
  return true;
}
function equal(left2, right2) {
  if (left2 === right2) {
    return true;
  }
  if (left2 && isObject(left2) && right2 && isObject(right2)) {
    if (left2.constructor !== right2.constructor) {
      return false;
    }
    if (Array.isArray(left2) && Array.isArray(right2)) {
      return equalArray(left2, right2);
    }
    if (left2 instanceof Map && right2 instanceof Map) {
      return equalMap(left2, right2);
    }
    if (left2 instanceof Set && right2 instanceof Set) {
      return equalSet(left2, right2);
    }
    if (ArrayBuffer.isView(left2) && ArrayBuffer.isView(right2)) {
      return equalArrayBuffer(left2, right2);
    }
    if (isRegex(left2) && isRegex(right2)) {
      return left2.source === right2.source && left2.flags === right2.flags;
    }
    if (left2.valueOf !== Object.prototype.valueOf) {
      return left2.valueOf() === right2.valueOf();
    }
    if (left2.toString !== Object.prototype.toString) {
      return left2.toString() === right2.toString();
    }
    var leftKeys = Object.keys(left2);
    var rightKeys = Object.keys(right2);
    if (leftKeys.length !== rightKeys.length) {
      return false;
    }
    for (var index = leftKeys.length; index-- !== 0; ) {
      if (!Object.prototype.hasOwnProperty.call(right2, leftKeys[index])) {
        return false;
      }
    }
    for (var index = leftKeys.length; index-- !== 0; ) {
      var key = leftKeys[index];
      if (key === "_owner" && left2.$$typeof) {
        continue;
      }
      if (!equal(left2[key], right2[key])) {
        return false;
      }
    }
    return true;
  }
  if (Number.isNaN(left2) && Number.isNaN(right2)) {
    return true;
  }
  return left2 === right2;
}

// node_modules/.pnpm/tree-changes@0.10.0/node_modules/tree-changes/dist/index.mjs
function canHaveLength(...arguments_) {
  return arguments_.every((d) => src_default.string(d) || src_default.array(d) || src_default.plainObject(d));
}
function checkEquality(left2, right2, value) {
  if (!isSameType(left2, right2)) {
    return false;
  }
  if ([left2, right2].every(src_default.array)) {
    return !left2.some(hasValue(value)) && right2.some(hasValue(value));
  }
  if ([left2, right2].every(src_default.plainObject)) {
    return !Object.entries(left2).some(hasEntry(value)) && Object.entries(right2).some(hasEntry(value));
  }
  return right2 === value;
}
function compareNumbers(previousData, data, options) {
  const { actual, key, previous, type } = options;
  const left2 = nested(previousData, key);
  const right2 = nested(data, key);
  let changed = [left2, right2].every(src_default.number) && (type === "increased" ? left2 < right2 : left2 > right2);
  if (!src_default.undefined(actual)) {
    changed = changed && right2 === actual;
  }
  if (!src_default.undefined(previous)) {
    changed = changed && left2 === previous;
  }
  return changed;
}
function compareValues(previousData, data, options) {
  const { key, type, value } = options;
  const left2 = nested(previousData, key);
  const right2 = nested(data, key);
  const primary = type === "added" ? left2 : right2;
  const secondary = type === "added" ? right2 : left2;
  if (!src_default.nullOrUndefined(value)) {
    if (src_default.defined(primary)) {
      if (src_default.array(primary) || src_default.plainObject(primary)) {
        return checkEquality(primary, secondary, value);
      }
    } else {
      return equal(secondary, value);
    }
    return false;
  }
  if ([left2, right2].every(src_default.array)) {
    return !secondary.every(isEqualPredicate(primary));
  }
  if ([left2, right2].every(src_default.plainObject)) {
    return hasExtraKeys(Object.keys(primary), Object.keys(secondary));
  }
  return ![left2, right2].every((d) => src_default.primitive(d) && src_default.defined(d)) && (type === "added" ? !src_default.defined(left2) && src_default.defined(right2) : src_default.defined(left2) && !src_default.defined(right2));
}
function getIterables(previousData, data, { key } = {}) {
  let left2 = nested(previousData, key);
  let right2 = nested(data, key);
  if (!isSameType(left2, right2)) {
    throw new TypeError("Inputs have different types");
  }
  if (!canHaveLength(left2, right2)) {
    throw new TypeError("Inputs don't have length");
  }
  if ([left2, right2].every(src_default.plainObject)) {
    left2 = Object.keys(left2);
    right2 = Object.keys(right2);
  }
  return [left2, right2];
}
function hasEntry(input) {
  return ([key, value]) => {
    if (src_default.array(input)) {
      return equal(input, value) || input.some((d) => equal(d, value) || src_default.array(value) && isEqualPredicate(value)(d));
    }
    if (src_default.plainObject(input) && input[key]) {
      return !!input[key] && equal(input[key], value);
    }
    return equal(input, value);
  };
}
function hasExtraKeys(left2, right2) {
  return right2.some((d) => !left2.includes(d));
}
function hasValue(input) {
  return (value) => {
    if (src_default.array(input)) {
      return input.some((d) => equal(d, value) || src_default.array(value) && isEqualPredicate(value)(d));
    }
    return equal(input, value);
  };
}
function includesOrEqualsTo(previousValue, value) {
  return src_default.array(previousValue) ? previousValue.some((d) => equal(d, value)) : equal(previousValue, value);
}
function isEqualPredicate(data) {
  return (value) => data.some((d) => equal(d, value));
}
function isSameType(...arguments_) {
  return arguments_.every(src_default.array) || arguments_.every(src_default.number) || arguments_.every(src_default.plainObject) || arguments_.every(src_default.string);
}
function nested(data, property) {
  if (src_default.plainObject(data) || src_default.array(data)) {
    if (src_default.string(property)) {
      const props = property.split(".");
      return props.reduce((acc, d) => acc && acc[d], data);
    }
    if (src_default.number(property)) {
      return data[property];
    }
    return data;
  }
  return data;
}
function treeChanges(previousData, data) {
  if ([previousData, data].some(src_default.nullOrUndefined)) {
    throw new Error("Missing required parameters");
  }
  if (![previousData, data].every((d) => src_default.plainObject(d) || src_default.array(d))) {
    throw new Error("Expected plain objects or array");
  }
  const added = (key, value) => {
    try {
      return compareValues(previousData, data, { key, type: "added", value });
    } catch {
      return false;
    }
  };
  const changed = (key, actual, previous) => {
    try {
      const left2 = nested(previousData, key);
      const right2 = nested(data, key);
      const hasActual = src_default.defined(actual);
      const hasPrevious = src_default.defined(previous);
      if (hasActual || hasPrevious) {
        const leftComparator = hasPrevious ? includesOrEqualsTo(previous, left2) : !includesOrEqualsTo(actual, left2);
        const rightComparator = includesOrEqualsTo(actual, right2);
        return leftComparator && rightComparator;
      }
      if ([left2, right2].every(src_default.array) || [left2, right2].every(src_default.plainObject)) {
        return !equal(left2, right2);
      }
      return left2 !== right2;
    } catch {
      return false;
    }
  };
  const changedFrom = (key, previous, actual) => {
    if (!src_default.defined(key)) {
      return false;
    }
    try {
      const left2 = nested(previousData, key);
      const right2 = nested(data, key);
      const hasActual = src_default.defined(actual);
      return includesOrEqualsTo(previous, left2) && (hasActual ? includesOrEqualsTo(actual, right2) : !hasActual);
    } catch {
      return false;
    }
  };
  const changedTo = (key, actual) => {
    if (!src_default.defined(key)) {
      return false;
    }
    if (process.env.NODE_ENV === "development") {
      console.warn("`changedTo` is deprecated! Replace it with `change`");
    }
    return changed(key, actual);
  };
  const decreased = (key, actual, previous) => {
    if (!src_default.defined(key)) {
      return false;
    }
    try {
      return compareNumbers(previousData, data, { key, actual, previous, type: "decreased" });
    } catch {
      return false;
    }
  };
  const emptied = (key) => {
    try {
      const [left2, right2] = getIterables(previousData, data, { key });
      return !!left2.length && !right2.length;
    } catch {
      return false;
    }
  };
  const filled = (key) => {
    try {
      const [left2, right2] = getIterables(previousData, data, { key });
      return !left2.length && !!right2.length;
    } catch {
      return false;
    }
  };
  const increased = (key, actual, previous) => {
    if (!src_default.defined(key)) {
      return false;
    }
    try {
      return compareNumbers(previousData, data, { key, actual, previous, type: "increased" });
    } catch {
      return false;
    }
  };
  const removed = (key, value) => {
    try {
      return compareValues(previousData, data, { key, type: "removed", value });
    } catch {
      return false;
    }
  };
  return { added, changed, changedFrom, changedTo, decreased, emptied, filled, increased, removed };
}

// node_modules/.pnpm/tree-changes-hook@0.10.0_react@18.2.0/node_modules/tree-changes-hook/dist/index.mjs
function useTreeChanges(value) {
  const previousValue = useRef(value);
  const isEqual = equal(previousValue.current, value);
  const previousIsEqual = useRef(isEqual);
  const instance = useRef(
    treeChanges(previousValue.current, value)
  );
  useEffect(() => {
    previousValue.current = value;
  });
  if (previousIsEqual.current !== isEqual || !isEqual) {
    previousIsEqual.current = isEqual;
    instance.current = treeChanges(previousValue.current, value);
  }
  return instance.current;
}

// src/components/Floater/index.tsx
import * as React5 from "react";

// src/components/Floater/Arrow.tsx
import * as React from "react";
function FloaterArrow(props) {
  const { arrowRef, placement, styles } = props;
  const {
    arrow: { color, display, length, position, spread }
  } = styles;
  const arrowStyles = { display, position };
  let points;
  let x = spread;
  let y = length;
  if (placement.startsWith("top")) {
    points = `0,0 ${x / 2},${y} ${x},0`;
  } else if (placement.startsWith("bottom")) {
    points = `${x},${y} ${x / 2},0 0,${y}`;
  } else if (placement.startsWith("left")) {
    y = spread;
    x = length;
    points = `0,0 ${x},${y / 2} 0,${y}`;
  } else if (placement.startsWith("right")) {
    y = spread;
    x = length;
    points = `${x},${y} ${x},0 0,${y / 2}`;
  }
  return /* @__PURE__ */ React.createElement("span", { ref: arrowRef, className: "__floater__arrow", style: arrowStyles }, /* @__PURE__ */ React.createElement("svg", { height: y, version: "1.1", width: x, xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ React.createElement("polygon", { fill: color, points })));
}
var Arrow_default = FloaterArrow;

// src/components/Floater/Container.tsx
import * as React3 from "react";

// src/components/Floater/CloseButton.tsx
import * as React2 from "react";
function FloaterCloseButton({ onClick, styles }) {
  const { color, height, width, ...style } = styles;
  return /* @__PURE__ */ React2.createElement("button", { "aria-label": "close", onClick, style, type: "button" }, /* @__PURE__ */ React2.createElement(
    "svg",
    {
      height: `${height}px`,
      preserveAspectRatio: "xMidYMid",
      version: "1.1",
      viewBox: "0 0 18 18",
      width: `${width}px`,
      xmlns: "http://www.w3.org/2000/svg"
    },
    /* @__PURE__ */ React2.createElement("g", null, /* @__PURE__ */ React2.createElement(
      "path",
      {
        d: "M8.13911129,9.00268191 L0.171521827,17.0258467 C-0.0498027049,17.248715 -0.0498027049,17.6098394 0.171521827,17.8327545 C0.28204354,17.9443526 0.427188206,17.9998706 0.572051765,17.9998706 C0.71714958,17.9998706 0.862013139,17.9443526 0.972581703,17.8327545 L9.0000937,9.74924618 L17.0276057,17.8327545 C17.1384085,17.9443526 17.2832721,17.9998706 17.4281356,17.9998706 C17.5729992,17.9998706 17.718097,17.9443526 17.8286656,17.8327545 C18.0499901,17.6098862 18.0499901,17.2487618 17.8286656,17.0258467 L9.86135722,9.00268191 L17.8340066,0.973848225 C18.0553311,0.750979934 18.0553311,0.389855532 17.8340066,0.16694039 C17.6126821,-0.0556467968 17.254037,-0.0556467968 17.0329467,0.16694039 L9.00042166,8.25611765 L0.967006424,0.167268345 C0.745681892,-0.0553188426 0.387317931,-0.0553188426 0.165993399,0.167268345 C-0.0553311331,0.390136635 -0.0553311331,0.751261038 0.165993399,0.974176179 L8.13920499,9.00268191 L8.13911129,9.00268191 Z",
        fill: color
      }
    ))
  ));
}
var CloseButton_default = FloaterCloseButton;

// src/components/Floater/Container.tsx
function FloaterContainer(props) {
  const { content, footer, onClick, open, positionWrapper, showCloseButton, styles, title } = props;
  const output = {
    content: React3.isValidElement(content) ? content : /* @__PURE__ */ React3.createElement("div", { className: "__floater__content", style: styles.content }, content)
  };
  if (title) {
    output.title = React3.isValidElement(title) ? title : /* @__PURE__ */ React3.createElement("div", { className: "__floater__title", style: styles.title }, title);
  }
  if (footer) {
    output.footer = React3.isValidElement(footer) ? footer : /* @__PURE__ */ React3.createElement("div", { className: "__floater__footer", style: styles.footer }, footer);
  }
  if ((showCloseButton || positionWrapper) && !src_default.boolean(open)) {
    output.close = /* @__PURE__ */ React3.createElement(CloseButton_default, { onClick, styles: styles.close });
  }
  return /* @__PURE__ */ React3.createElement("div", { className: "__floater__container", style: styles.container }, output.close, output.title, output.content, output.footer);
}
var Container_default = FloaterContainer;

// src/literals.ts
var POSITIONING_PROPS = ["position", "top", "right", "bottom", "left"];
var STATUS = {
  INIT: "init",
  IDLE: "idle",
  RENDER: "render",
  OPENING: "opening",
  OPEN: "open",
  CLOSING: "closing",
  ERROR: "error"
};

// src/modules/helpers.ts
import * as React4 from "react";
import { deepmerge } from "deepmerge-ts";
var portalId = "react-floater-portal";
function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
function enhanceProps(props) {
  return {
    autoOpen: false,
    debug: false,
    disableFlip: false,
    disableHoverToClick: false,
    event: "click",
    eventDelay: 0.4,
    hideArrow: false,
    offset: 15,
    placement: "bottom",
    showCloseButton: false,
    styles: {},
    target: null,
    wrapperOptions: {
      position: false
    },
    ...props
  };
}
function getFallbackPlacements(placement) {
  if (placement.startsWith("left")) {
    return ["top", "bottom"];
  }
  if (placement.startsWith("right")) {
    return ["bottom", "top"];
  }
  return void 0;
}
function getModifiers(modifiers) {
  const defaultOptions2 = {
    flip: {
      name: "flip",
      enabled: true,
      options: {
        padding: 20
      }
    },
    preventOverflow: {
      name: "preventOverflow",
      enabled: true,
      options: {
        padding: 10
      }
    }
  };
  return deepmerge(defaultOptions2, modifiers ?? {});
}
function isFixed(el) {
  if (!el) {
    return false;
  }
  const { nodeName } = el;
  if (nodeName === "BODY" || nodeName === "HTML") {
    return false;
  }
  if (getComputedStyle(el).position === "fixed") {
    return true;
  }
  return el.parentNode instanceof HTMLElement ? isFixed(el.parentNode) : false;
}
function isMobile() {
  return "ontouchstart" in window && /Mobi/.test(navigator.userAgent);
}
function isValidElement3(object) {
  return React4.isValidElement(object);
}
function log({ data, debug = false, title }) {
  const logFn = console.log;
  if (debug && title && data) {
    console.groupCollapsed(
      `%creact-floater: ${title}`,
      "color: #9b00ff; font-weight: bold; font-size: 12px;"
    );
    if (Array.isArray(data)) {
      data.forEach((d) => {
        if (src_default.plainObject(d) && d.key) {
          logFn.apply(console, [d.key, d.value]);
        } else {
          logFn.apply(console, [d]);
        }
      });
    } else {
      logFn.apply(console, [data]);
    }
    console.groupEnd();
  }
}
function mergeModifier(modifier, customModifier) {
  return deepmerge(modifier, customModifier ?? {});
}
function off(element, eventType, handler, options = false) {
  element.removeEventListener(eventType, handler, options);
}
function on(element, eventType, handler, options = false) {
  element.addEventListener(eventType, handler, options);
}
function once(element, eventType, handler, options = false) {
  let nextCB;
  nextCB = (event) => {
    handler(event);
    off(element, eventType, nextCB);
  };
  on(element, eventType, nextCB, options);
}
function randomId() {
  return `rf-${Math.round(Math.random() * 1e5)}`;
}

// src/components/Floater/index.tsx
function Floater(props) {
  const {
    component,
    content,
    floaterRef,
    hideArrow,
    id,
    onClick: closeFn,
    placement,
    status,
    styles
  } = props;
  const style = React5.useMemo(() => {
    const {
      arrow: { length },
      floater,
      floaterCentered,
      floaterClosing,
      floaterOpening,
      floaterWithComponent
    } = styles;
    let element = { ...floater };
    if (!hideArrow) {
      if (placement.startsWith("top")) {
        element.padding = `0 0 ${length}px`;
      } else if (placement.startsWith("bottom")) {
        element.padding = `${length}px 0 0`;
      } else if (placement.startsWith("left")) {
        element.padding = `0 ${length}px 0 0`;
      } else if (placement.startsWith("right")) {
        element.padding = `0 0 0 ${length}px`;
      }
    }
    if (status === STATUS.CLOSING) {
      element = { ...element, ...floaterClosing };
    }
    if (status === STATUS.OPENING || status === STATUS.OPEN) {
      element = { ...element, ...floaterOpening };
    }
    if (placement === "center") {
      element = { ...element, ...floaterCentered };
    }
    if (component) {
      element = { ...element, ...floaterWithComponent };
    }
    return element;
  }, [component, hideArrow, placement, status, styles]);
  const shouldRender = ["render", "open", "opening", "closing"].includes(status);
  const output = {};
  const classes = ["__floater"];
  const baseProps = { id, role: "tooltip" };
  if (component) {
    const componentProps = { closeFn, ...baseProps };
    output.content = isValidElement3(component) ? React5.cloneElement(component, componentProps) : component(componentProps);
  } else {
    output.content = /* @__PURE__ */ React5.createElement(Container_default, { ...props, content });
  }
  if (status === STATUS.OPEN) {
    classes.push("__floater__open");
  }
  if (!hideArrow) {
    output.arrow = /* @__PURE__ */ React5.createElement(Arrow_default, { ...props });
  }
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ React5.createElement("div", { ref: floaterRef, style: { zIndex: styles.options.zIndex } }, /* @__PURE__ */ React5.createElement("div", { className: classes.join(" "), style, ...baseProps }, /* @__PURE__ */ React5.createElement("div", { className: "__floater__body" }, output.content, output.arrow)));
}
var Floater_default = React5.memo(Floater);

// src/components/Portal.tsx
import * as React6 from "react";
import { createPortal } from "react-dom";

// src/modules/hooks.ts
import { useEffect as useEffect2, useRef as useRef2 } from "react";
function useEffectOnce(effect4) {
  useEffect2(effect4, []);
}
function useMount(effect4) {
  useEffectOnce(effect4);
}
function useSingleton(callback) {
  const hasBeenCalled = useRef2(false);
  if (hasBeenCalled.current) {
    return;
  }
  callback();
  hasBeenCalled.current = true;
}
function useUnmount(fn2) {
  const fnRef = useRef2(fn2);
  fnRef.current = fn2;
  useEffectOnce(() => () => fnRef.current());
}
function useUpdateEffect(effect4, deps) {
  const isFirst = useRef2(true);
  useEffect2(() => {
    if (!isFirst.current) {
      effect4();
    }
  }, deps);
  if (isFirst.current) {
    isFirst.current = false;
  }
}

// src/components/Portal.tsx
function ReactFloaterPortal(props) {
  const { children, hasChildren, internalId, placement, portalElement, target, zIndex } = props;
  const node = React6.useRef(null);
  const initialize = React6.useCallback(() => {
    if (!canUseDOM()) {
      return;
    }
    if (portalElement) {
      node.current = src_default.string(portalElement) ? document.querySelector(portalElement) : portalElement;
    }
    if (!portalElement || !node.current) {
      const portal = document.getElementById(portalId);
      if (portal) {
        const ids = portal.dataset.ids?.split(",").filter(Boolean) ?? [];
        if (!ids.includes(internalId) && internalId) {
          ids.push(internalId);
        }
        portal.dataset.ids = ids.join(",");
        node.current = portal;
      } else {
        node.current = document.createElement("div");
        node.current.id = portalId;
        node.current.dataset.ids = internalId;
        node.current.style.zIndex = `${zIndex}`;
        document.body.appendChild(node.current);
      }
    }
    if (!portalElement && !document.getElementById(portalId)) {
      if (node.current) {
        document.body.appendChild(node.current);
      }
    }
  }, [internalId, portalElement, zIndex]);
  useMount(() => {
    if (!canUseDOM) {
      return;
    }
    initialize();
  });
  React6.useEffect(() => {
    initialize();
  }, [initialize]);
  useUnmount(() => {
    if (!canUseDOM() || !node.current) {
      return;
    }
    try {
      if (node.current.id === portalId) {
        const ids = node.current.dataset.ids?.split(",") ?? [];
        if (ids.includes(internalId)) {
          node.current.dataset.ids = ids.filter((id) => id !== internalId).join(",");
        }
        if (ids.length <= 1) {
          document.body.removeChild(node.current);
          node.current = null;
        }
      }
    } catch {
      node.current = null;
    }
  });
  if (node.current) {
    if (!hasChildren && !target && placement !== "center") {
      return null;
    }
    return createPortal(children, node.current);
  }
  return null;
}
var Portal_default = ReactFloaterPortal;

// src/components/Wrapper.tsx
import * as React7 from "react";
function FloaterWrapper(props) {
  const {
    childRef,
    children,
    id,
    isControlled,
    onClick,
    onMount,
    onMouseEnter,
    onMouseLeave,
    status,
    style,
    styles,
    wrapperRef
  } = props;
  useMount(() => {
    onMount();
  });
  let element;
  const mergedStyles = {
    ...styles,
    ...style,
    ...React7.isValidElement(children) ? children.props.style : void 0
  };
  let wrapperProps = {
    "aria-describedby": [STATUS.OPENING, STATUS.OPEN, STATUS.CLOSING].includes(
      status
    ) ? id : void 0,
    "data-id": id,
    style: mergedStyles
  };
  if (!isControlled) {
    wrapperProps = {
      ...wrapperProps,
      onClick,
      onMouseEnter,
      onMouseLeave
    };
  }
  if (children) {
    if (React7.Children.count(children) === 1 && React7.isValidElement(children) && children.type !== React7.Fragment) {
      if (src_default.function(children.type)) {
        element = /* @__PURE__ */ React7.createElement("span", { ref: wrapperRef }, React7.cloneElement(React7.Children.only(children), {
          innerRef: childRef,
          ...wrapperProps
        }));
      } else {
        element = React7.cloneElement(React7.Children.only(children), {
          ref: wrapperRef,
          ...wrapperProps
        });
      }
    } else {
      element = /* @__PURE__ */ React7.createElement("span", { ref: wrapperRef, ...wrapperProps }, children);
    }
  }
  return element ?? null;
}
var Wrapper_default = React7.memo(FloaterWrapper);

// src/modules/styles.ts
import { deepmerge as deepmerge2 } from "deepmerge-ts";
var defaultOptions = {
  zIndex: 100
};
function getStyles(styles) {
  const { options = {}, ...rest } = styles ?? {};
  return deepmerge2(
    {
      arrow: {
        color: "#fff",
        display: "inline-flex",
        length: 16,
        position: "absolute",
        spread: 32
      },
      close: {
        backgroundColor: "transparent",
        border: 0,
        borderRadius: 0,
        color: "#555",
        fontSize: 0,
        height: 15,
        outline: "none",
        padding: 10,
        position: "absolute",
        right: 0,
        top: 0,
        width: 15,
        WebkitAppearance: "none"
      },
      container: {
        backgroundColor: "#fff",
        borderRadius: ".25rem",
        color: "#666",
        minHeight: 60,
        minWidth: 200,
        padding: 20,
        position: "relative",
        zIndex: 10
      },
      content: {
        fontSize: 15
      },
      footer: {
        borderTop: "1px solid #ccc",
        fontSize: 13,
        marginTop: 10,
        paddingTop: 5
      },
      floater: {
        display: "inline-block",
        filter: "drop-shadow(0 0 3px rgba(0, 0, 0, 0.3))",
        maxWidth: 300,
        opacity: 0,
        position: "relative",
        transition: "opacity 0.3s",
        visibility: "hidden",
        zIndex: options.zIndex
      },
      floaterCentered: {
        left: "50%",
        position: "fixed",
        top: "50%",
        transform: "translate(-50%, -50%)"
      },
      floaterClosing: {
        opacity: 0,
        visibility: "visible"
      },
      floaterOpening: {
        opacity: 1,
        visibility: "visible"
      },
      floaterWithComponent: {
        maxWidth: "100%"
      },
      title: {
        borderBottom: "1px solid #555",
        color: "#555",
        fontSize: 18,
        marginBottom: 5,
        paddingBottom: 6,
        paddingRight: 18
      },
      wrapper: {
        cursor: "help",
        zIndex: options.zIndex
      },
      wrapperPosition: {
        left: -1e3,
        position: "absolute",
        top: -1e3,
        visibility: "hidden"
      },
      options: deepmerge2(defaultOptions, options)
    },
    rest
  );
}

// src/index.tsx
function ReactFloater(props) {
  const {
    autoOpen,
    callback,
    children,
    component,
    content,
    debug,
    disableFlip,
    disableHoverToClick,
    event,
    eventDelay,
    footer,
    getPopper,
    hideArrow,
    id,
    modifiers,
    offset: offset2,
    open,
    placement = "bottom",
    portalElement,
    showCloseButton,
    style,
    styles,
    target,
    title,
    wrapperOptions
  } = enhanceProps(props);
  const [state, setState] = React8.useReducer(
    (previousState, nextState) => ({
      ...previousState,
      ...nextState
    }),
    {
      currentPlacement: placement,
      positionWrapper: !!wrapperOptions?.position && !!target,
      status: STATUS.INIT,
      statusWrapper: STATUS.INIT
    }
  );
  const arrowRef = React8.useRef(null);
  const childRef = React8.useRef(null);
  const eventDelayTimer = React8.useRef();
  const floaterRef = React8.useRef(null);
  const internalId = React8.useRef(randomId());
  const isMounted = React8.useRef(false);
  const popperRef = React8.useRef();
  const stateRef = React8.useRef(state);
  const wrapperPopper = React8.useRef();
  const wrapperRef = React8.useRef(null);
  const wrapperStyles = React8.useRef({});
  const { currentPlacement, positionWrapper, status, statusWrapper } = state;
  const { changed } = useTreeChanges(state);
  const { changed: changedProps } = useTreeChanges(props);
  const updateState = React8.useCallback(
    (nextState, callback_) => {
      if (isMounted.current) {
        setState(nextState);
        stateRef.current = { ...state, ...nextState };
        if (callback_) {
          callback_();
        }
      }
    },
    [setState, state]
  );
  const toggle = React8.useCallback(
    (forceStatus) => {
      let nextStatus = stateRef.current.status === STATUS.OPEN ? STATUS.CLOSING : STATUS.RENDER;
      if (!src_default.undefined(forceStatus)) {
        nextStatus = forceStatus;
      }
      updateState({
        status: nextStatus,
        statusWrapper: nextStatus === STATUS.CLOSING ? STATUS.RENDER : STATUS.IDLE
      });
    },
    [updateState]
  );
  const targetElement = React8.useRef(() => {
    if (!canUseDOM()) {
      return null;
    }
    if (target) {
      if (src_default.domElement(target)) {
        return target;
      }
      return document.querySelector(target);
    }
    return childRef.current ?? wrapperRef.current;
  });
  const currentDebug = React8.useMemo(() => {
    return canUseDOM() && (debug || !!window.ReactFloaterDebug);
  }, [debug]);
  const currentEvent = React8.useMemo(() => {
    if (event === "hover" && isMobile() && !disableHoverToClick) {
      return "click";
    }
    return event;
  }, [disableHoverToClick, event]);
  const currentStyles = React8.useMemo(() => {
    const nextStyles = getStyles(styles);
    const element = targetElement.current();
    if (positionWrapper) {
      let wrapperCurrentStyles;
      if (status !== STATUS.IDLE) {
        wrapperCurrentStyles = nextStyles.wrapperPosition;
      } else if (statusWrapper === STATUS.RENDER) {
        wrapperCurrentStyles = wrapperPopper.current?.state.styles;
      }
      nextStyles.wrapper = {
        ...nextStyles.wrapper,
        ...wrapperCurrentStyles
      };
    }
    if (element) {
      const targetStyles = window.getComputedStyle(element);
      if (wrapperStyles.current) {
        nextStyles.wrapper = {
          ...nextStyles.wrapper,
          ...wrapperStyles.current
        };
      } else if (!["relative", "static"].includes(targetStyles.position)) {
        wrapperStyles.current = {};
        if (!positionWrapper) {
          POSITIONING_PROPS.forEach((d) => {
            if (d === "position") {
              wrapperStyles.current[d] = targetStyles[d];
            } else {
              wrapperStyles.current[d] = targetStyles[d];
            }
          });
          nextStyles.wrapper = {
            ...nextStyles.wrapper,
            ...wrapperStyles.current
          };
        }
      }
    }
    return nextStyles;
  }, [positionWrapper, status, statusWrapper, styles]);
  const initPopper = React8.useRef(() => {
    const nextStatus = stateRef.current.status === STATUS.RENDER ? STATUS.OPENING : STATUS.IDLE;
    const element = targetElement.current();
    if (placement === "center") {
      setTimeout(() => {
        updateState({ status: nextStatus });
      }, 100);
    } else if (element) {
      if (floaterRef.current) {
        const { arrow: arrow2, flip: flip2, offset: offsetModifier, ...rest } = getModifiers(modifiers);
        popperRef.current = createPopper(element, floaterRef.current, {
          placement,
          strategy: isFixed(targetElement.current()) ? "fixed" : "absolute",
          modifiers: [
            mergeModifier(
              {
                name: "arrow",
                enabled: !hideArrow,
                options: {
                  element: arrowRef.current,
                  padding: 8
                }
              },
              arrow2
            ),
            mergeModifier(
              {
                name: "flip",
                enabled: !disableFlip,
                options: {
                  altAxis: false,
                  fallbackPlacements: getFallbackPlacements(placement || "bottom")
                }
              },
              flip2
            ),
            mergeModifier(
              {
                name: "offset",
                enabled: true,
                options: {
                  offset: [0, offset2]
                }
              },
              offsetModifier
            ),
            {
              name: "updatePlacement",
              enabled: true,
              phase: "afterWrite",
              fn: ({ instance, state: popperState }) => {
                if (popperState.placement !== stateRef.current.currentPlacement) {
                  popperRef.current = instance;
                  updateState({ currentPlacement: popperState.placement });
                }
              }
            },
            {
              name: "applyArrowStyle",
              enabled: true,
              phase: "write",
              fn: ({ state: popperState }) => {
                const {
                  elements: { arrow: stateArrow },
                  placement: statePlacement
                } = popperState;
                if (stateArrow) {
                  if (statePlacement.startsWith("top")) {
                    stateArrow.style.bottom = "0px";
                    stateArrow.style.right = "";
                  } else if (statePlacement.startsWith("bottom")) {
                    stateArrow.style.top = "0px";
                    stateArrow.style.right = "";
                  } else if (statePlacement.startsWith("left")) {
                    stateArrow.style.right = "0px";
                    stateArrow.style.bottom = "";
                  } else if (statePlacement.startsWith("right")) {
                    stateArrow.style.left = "0px";
                    stateArrow.style.bottom = "";
                  }
                }
              }
            },
            ...Object.values(rest)
          ],
          onFirstUpdate: (popperState) => {
            updateState({
              currentPlacement: popperState.placement,
              status: nextStatus
            });
            if (placement !== popperState.placement) {
              setTimeout(() => {
                popperRef.current?.forceUpdate();
              });
            }
          }
        });
        if (getPopper && popperRef.current) {
          getPopper(popperRef.current, "floater");
        }
      } else {
        updateState({
          status: STATUS.IDLE
        });
      }
      if (wrapperRef.current && !wrapperPopper.current && stateRef.current.positionWrapper) {
        const wrapperOffset = wrapperOptions?.offset ? wrapperOptions.offset : 0;
        wrapperPopper.current = createPopper(element, wrapperRef.current, {
          placement: wrapperOptions?.placement ?? placement,
          modifiers: [
            {
              name: "arrow",
              enabled: false
            },
            {
              name: "offset",
              options: {
                offset: [0, wrapperOffset]
              }
            },
            {
              name: "flip",
              enabled: false
            }
          ],
          onFirstUpdate: (popperState) => {
            updateState({ statusWrapper: STATUS.RENDER });
            if (placement !== popperState.placement) {
              setTimeout(() => {
                wrapperPopper.current?.forceUpdate();
              });
            }
          }
        });
        if (getPopper) {
          getPopper(wrapperPopper.current, "wrapper");
        }
      }
    }
  });
  const handleLoad = React8.useRef(() => {
    if (popperRef.current) {
      popperRef.current.forceUpdate();
    }
    if (wrapperPopper.current) {
      wrapperPopper.current.forceUpdate();
    }
  });
  const handleTransitionEnd = React8.useRef(() => {
    if (wrapperPopper.current) {
      wrapperPopper.current.forceUpdate();
    }
    updateState(
      {
        status: stateRef.current.status === STATUS.OPENING ? STATUS.OPEN : STATUS.IDLE
      },
      () => {
        if (callback) {
          callback(stateRef.current.status === STATUS.OPEN ? "open" : "close", enhanceProps(props));
        }
      }
    );
  });
  const handleClick = React8.useCallback(() => {
    if (src_default.boolean(open)) {
      return;
    }
    if (currentEvent === "click" || currentEvent === "hover" && positionWrapper) {
      log({
        title: "click",
        data: [{ event, status: status === STATUS.OPEN ? "closing" : "opening" }],
        debug: currentDebug
      });
      toggle(status === "idle" ? STATUS.RENDER : void 0);
    }
  }, [currentDebug, currentEvent, event, open, positionWrapper, status, toggle]);
  const handleMouseEnter = React8.useCallback(() => {
    if (src_default.boolean(open) || isMobile() || currentEvent !== "hover") {
      return;
    }
    log({
      title: "mouseEnter",
      data: [{ key: "originalEvent", value: event }],
      debug: currentDebug
    });
    if (status === STATUS.IDLE) {
      clearTimeout(eventDelayTimer.current);
      eventDelayTimer.current = void 0;
      toggle(STATUS.RENDER);
    }
  }, [currentDebug, currentEvent, event, open, status, toggle]);
  const handleMouseLeave = React8.useCallback(() => {
    if (src_default.boolean(open) || isMobile()) {
      return;
    }
    if (currentEvent === "hover") {
      log({
        title: "mouseLeave",
        data: [{ key: "originalEvent", value: event }],
        debug: currentDebug
      });
      const hasOpenStatus = [STATUS.OPENING, STATUS.OPEN].includes(status);
      if (!eventDelay) {
        toggle(status === STATUS.CLOSING ? STATUS.IDLE : STATUS.CLOSING);
      } else if (!positionWrapper) {
        if (hasOpenStatus) {
          clearTimeout(eventDelayTimer.current);
          eventDelayTimer.current = window.setTimeout(() => {
            toggle();
            eventDelayTimer.current = void 0;
          }, eventDelay * 1e3);
        }
      }
    }
  }, [currentDebug, currentEvent, event, eventDelay, open, positionWrapper, status, toggle]);
  const handleWrapperMount = React8.useCallback(() => {
    if (positionWrapper) {
      initPopper.current();
    }
  }, [positionWrapper]);
  const cleanUp = () => {
    if (popperRef.current) {
      popperRef.current.destroy();
      popperRef.current = void 0;
    }
    if (wrapperPopper.current) {
      wrapperPopper.current.destroy();
      wrapperPopper.current = void 0;
    }
  };
  useSingleton(() => {
    if (canUseDOM()) {
      window.addEventListener("load", handleLoad.current);
    }
  });
  useMount(() => {
    isMounted.current = true;
    log({
      title: "init",
      data: {
        hasChildren: !!children,
        hasTarget: !!target,
        isControlled: src_default.boolean(open),
        positionWrapper,
        target: targetElement.current(),
        floater: floaterRef.current
      },
      debug: currentDebug
    });
    initPopper.current();
  });
  useUnmount(() => {
    isMounted.current = false;
    cleanUp();
    window.removeEventListener("load", handleLoad.current);
  });
  useUpdateEffect(() => {
    if (!canUseDOM()) {
      return;
    }
    if (changedProps("open")) {
      let forceStatus;
      if (src_default.boolean(open)) {
        forceStatus = open ? STATUS.RENDER : STATUS.CLOSING;
      }
      toggle(forceStatus);
    }
    if (changedProps("wrapperOptions.position") || changedProps("target")) {
      updateState({
        positionWrapper: !!wrapperOptions?.position && !!target
      });
    }
    if (changed("status", STATUS.IDLE) && open || changed("status", STATUS.IDLE, STATUS.INIT) && autoOpen) {
      toggle(STATUS.RENDER);
    }
    if (changed("status", STATUS.RENDER)) {
      if (popperRef.current) {
        popperRef.current.destroy();
      }
      initPopper.current();
    }
    if (floaterRef.current && changed("status", [STATUS.RENDER, STATUS.CLOSING])) {
      once(floaterRef.current, "transitionend", handleTransitionEnd.current);
    }
    if (changed("status", STATUS.IDLE, STATUS.CLOSING) && popperRef.current) {
      popperRef.current.destroy();
      popperRef.current = void 0;
      if (wrapperPopper.current) {
        wrapperPopper.current.forceUpdate();
      }
    }
  });
  const wrapper = /* @__PURE__ */ React8.createElement(
    Wrapper_default,
    {
      childRef,
      id: id ?? internalId.current,
      isControlled: src_default.boolean(open),
      onClick: handleClick,
      onMount: handleWrapperMount,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      status,
      style,
      styles: currentStyles.wrapper,
      wrapperRef
    },
    children
  );
  return /* @__PURE__ */ React8.createElement(React8.Fragment, null, /* @__PURE__ */ React8.createElement(
    Portal_default,
    {
      hasChildren: !!children,
      internalId: internalId.current,
      placement: currentPlacement,
      portalElement,
      target,
      zIndex: currentStyles.options.zIndex
    },
    /* @__PURE__ */ React8.createElement(
      Floater_default,
      {
        arrowRef,
        component,
        content,
        floaterRef,
        footer,
        hideArrow: hideArrow || currentPlacement === "center",
        id: id ?? internalId.current,
        onClick: handleClick,
        placement: currentPlacement,
        positionWrapper,
        showCloseButton,
        status,
        styles: currentStyles,
        title
      }
    ),
    positionWrapper && wrapper
  ), !positionWrapper && wrapper);
}
ReactFloater.defaultProps = {
  autoOpen: false,
  debug: false,
  disableFlip: false,
  disableHoverToClick: false,
  event: "click",
  eventDelay: 0.4,
  hideArrow: false,
  offset: 15,
  placement: "bottom",
  showCloseButton: false
};
var src_default2 = ReactFloater;
export {
  src_default2 as default
};
//# sourceMappingURL=index.mjs.map