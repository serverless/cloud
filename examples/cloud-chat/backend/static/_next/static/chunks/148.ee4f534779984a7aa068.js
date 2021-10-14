(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[148],{4148:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return O}});var o=t(5893),r=t(7294);const u=(0,r.createContext)(null),c=u.Provider;function i(){const n=(0,r.useContext)(u);if(null==n)throw new Error("No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>");return n}function a(){return i().map}var l=t(5243);function s(){return(s=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o])}return n}).apply(this,arguments)}function f({children:n,className:e,id:t,placeholder:o,style:u,whenCreated:i,...a}){const f=(0,r.useRef)(null),p=function(n,e){const[t,o]=(0,r.useState)(null);return(0,r.useEffect)((()=>{if(null!==n.current&&null===t){const t=new l.Map(n.current,e);null!=e.center&&null!=e.zoom?t.setView(e.center,e.zoom):null!=e.bounds&&t.fitBounds(e.bounds,e.boundsOptions),null!=e.whenReady&&t.whenReady(e.whenReady),o(t)}}),[n,t,e]),t}(f,a),d=(0,r.useRef)(!1);(0,r.useEffect)((()=>{null!=p&&!1===d.current&&null!=i&&(d.current=!0,i(p))}),[p,i]);const[v]=(0,r.useState)({className:e,id:t,style:u}),g=(0,r.useMemo)((()=>p?{__version:1,map:p}:null),[p]),h=g?r.createElement(c,{value:g},n):o??null;return r.createElement("div",s({},v,{ref:f}),h)}var p=t(3935);function d(n,e){return null==e?function(e,t){return(0,r.useRef)(n(e,t))}:function(t,o){const u=(0,r.useRef)(n(t,o)),c=(0,r.useRef)(t),{instance:i}=u.current;return(0,r.useEffect)((function(){c.current!==t&&(e(i,t,c.current),c.current=t)}),[i,t,o]),u}}function v(n,e){const t=(0,r.useRef)(e);(0,r.useEffect)((function(){e!==t.current&&null!=n.attributionControl&&(null!=t.current&&n.attributionControl.removeAttribution(t.current),null!=e&&n.attributionControl.addAttribution(e)),t.current=e}),[n,e])}function g(n,e){const t=(0,r.useRef)();(0,r.useEffect)((function(){return null!=e&&n.instance.on(e),t.current=e,function(){null!=t.current&&n.instance.off(t.current),t.current=null}}),[n,e])}function h(n,e){const t=n.pane??e.pane;return t?{...n,pane:t}:n}function m(n){return function(e){const t=i(),o=n(h(e,t),t);return v(t.map,e.attribution),g(o.current,e.eventHandlers),function(n,e){(0,r.useEffect)((function(){return(e.layerContainer??e.map).addLayer(n.instance),function(){var t;null==(t=e.layerContainer)||t.removeLayer(n.instance),e.map.removeLayer(n.instance)}}),[e,n])}(o.current,t),o}}const y=function(n){function e(e,t){const{instance:o}=n(e).current;return(0,r.useImperativeHandle)(t,(()=>o)),null}return(0,r.forwardRef)(e)}(m(d((function({url:n,...e},t){return{instance:new l.TileLayer(n,h(e,t)),context:t}}),(function(n,e,t){const{opacity:o,zIndex:r}=e;null!=o&&o!==t.opacity&&n.setOpacity(o),null!=r&&r!==t.zIndex&&n.setZIndex(r)}))));const b=function(n,e){return function(n){function e(e,t){const{instance:o,context:u}=n(e).current;return(0,r.useImperativeHandle)(t,(()=>o)),null==e.children?null:r.createElement(c,{value:u},e.children)}return(0,r.forwardRef)(e)}(m(d(n,e)))}((function({position:n,...e},t){const o=new l.Marker(n,e);return{instance:o,context:{...t,overlayContainer:o}}}),(function(n,e,t){e.position!==t.position&&n.setLatLng(e.position),null!=e.icon&&e.icon!==t.icon&&n.setIcon(e.icon),null!=e.zIndexOffset&&e.zIndexOffset!==t.zIndexOffset&&n.setZIndexOffset(e.zIndexOffset),null!=e.opacity&&e.opacity!==t.opacity&&n.setOpacity(e.opacity),null!=n.dragging&&e.draggable!==t.draggable&&(!0===e.draggable?n.dragging.enable():n.dragging.disable())})),x=function(n,e){return function(n){function e(e,t){const[o,u]=(0,r.useState)(!1),{instance:c}=n(e,u).current;(0,r.useImperativeHandle)(t,(()=>c)),(0,r.useEffect)((function(){o&&c.update()}),[c,o,e.children]);const i=c._contentNode;return i?(0,p.createPortal)(e.children,i):null}return(0,r.forwardRef)(e)}(function(n,e){return function(t,o){const r=i(),u=n(h(t,r),r);return v(r.map,t.attribution),g(u.current,t.eventHandlers),e(u.current,r,t,o),u}}(d(n),e))}((function(n,e){return{instance:new l.Popup(n,e.overlayContainer),context:e}}),(function(n,e,t,o){const{onClose:u,onOpen:c,position:i}=t;(0,r.useEffect)((function(){const{instance:t}=n;function r(n){n.popup===t&&(t.update(),o(!0),null==c||c())}function a(n){n.popup===t&&(o(!1),null==u||u())}return e.map.on({popupopen:r,popupclose:a}),null==e.overlayContainer?(null!=i&&t.setLatLng(i),t.openOn(e.map)):e.overlayContainer.bindPopup(t),function(){var n;e.map.off({popupopen:r,popupclose:a}),null==(n=e.overlayContainer)||n.unbindPopup(),e.map.removeLayer(t)}}),[n,e,o,u,c,i])}));var C=function(){};function w(n){var e=n.getSouthWest(),t=n.getNorthEast();return{sw:{lat:e.lat,lon:e.lng},ne:{lat:t.lat,lon:t.lng}}}function E(n){var e=n.onBoundsChange,t=void 0===e?C:e,o=function(n){const e=a();return(0,r.useEffect)((function(){return e.on(n),function(){e.off(n)}}),[e,n]),e}({move:function(){t(w(o.getBounds()))},zoom:function(){t(w(o.getBounds()))}});return(0,r.useEffect)((function(){t(w(o.getBounds()))}),[o,t]),null}function O(n){var e=n.height,t=void 0===e?200:e,r=n.zoom,u=void 0===r?13:r,c=n.markers,i=void 0===c?[]:c,a=n.lat,l=void 0===a?0:a,s=n.lon,p=void 0===s?0:s,d=n.onBoundsChange,v=void 0===d?C:d;return(0,o.jsxs)(f,{style:{height:t},center:[l,p],zoom:u,scrollWheelZoom:!1,children:[(0,o.jsx)(y,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),i.map((function(n){var e=n.key,t=n.lat,r=n.lon,u=n.text;return(0,o.jsx)(b,{position:[t,r],children:(0,o.jsx)(x,{children:u})},e)})),(0,o.jsx)(E,{onBoundsChange:v})]})}}}]);