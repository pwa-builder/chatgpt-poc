var $t=Object.defineProperty;var vt=(n,t,e)=>t in n?$t(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var p=(n,t,e)=>(vt(n,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=window,K=H.ShadowRoot&&(H.ShadyCSS===void 0||H.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),Q=new WeakMap;let ct=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(K&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Q.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Q.set(e,t))}return t}toString(){return this.cssText}};const gt=n=>new ct(typeof n=="string"?n:n+"",void 0,Z),mt=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new ct(e,n,Z)},yt=(n,t)=>{K?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),i=H.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)})},X=K?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return gt(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var z;const k=window,Y=k.trustedTypes,_t=Y?Y.emptyScript:"",tt=k.reactiveElementPolyfillSupport,J={toAttribute(n,t){switch(t){case Boolean:n=n?_t:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},dt=(n,t)=>t!==n&&(t==t||n==n),D={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:dt};let A=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const i=this._$Ep(s,e);i!==void 0&&(this._$Ev.set(i,s),t.push(i))}),t}static createProperty(t,e=D){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const r=this[t];this[e]=i,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||D}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of s)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(X(i))}else t!==void 0&&e.push(X(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return yt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=D){var i;const r=this.constructor._$Ep(t,s);if(r!==void 0&&s.reflect===!0){const o=(((i=s.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?s.converter:J).toAttribute(e,s.type);this._$El=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,r=i._$Ev.get(t);if(r!==void 0&&this._$El!==r){const o=i.getPropertyOptions(r),c=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?o.converter:J;this._$El=r,this[r]=c.fromAttribute(e,o.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||dt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((i,r)=>this[r]=i),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(i=>{var r;return(r=i.hostUpdate)===null||r===void 0?void 0:r.call(i)}),this.update(s)):this._$Ek()}catch(i){throw e=!1,this._$Ek(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var i;return(i=s.hostUpdated)===null||i===void 0?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};A.finalized=!0,A.elementProperties=new Map,A.elementStyles=[],A.shadowRootOptions={mode:"open"},tt==null||tt({ReactiveElement:A}),((z=k.reactiveElementVersions)!==null&&z!==void 0?z:k.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var B;const R=window,E=R.trustedTypes,et=E?E.createPolicy("lit-html",{createHTML:n=>n}):void 0,g=`lit$${(Math.random()+"").slice(9)}$`,ut="?"+g,At=`<${ut}>`,w=document,L=(n="")=>w.createComment(n),O=n=>n===null||typeof n!="object"&&typeof n!="function",pt=Array.isArray,bt=n=>pt(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,st=/-->/g,it=/>/g,y=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),nt=/'/g,rt=/"/g,ft=/^(?:script|style|textarea|title)$/i,Et=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),f=Et(1),S=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),ot=new WeakMap,b=w.createTreeWalker(w,129,null,!1),wt=(n,t)=>{const e=n.length-1,s=[];let i,r=t===2?"<svg>":"",o=C;for(let l=0;l<e;l++){const a=n[l];let v,h,d=-1,$=0;for(;$<a.length&&(o.lastIndex=$,h=o.exec(a),h!==null);)$=o.lastIndex,o===C?h[1]==="!--"?o=st:h[1]!==void 0?o=it:h[2]!==void 0?(ft.test(h[2])&&(i=RegExp("</"+h[2],"g")),o=y):h[3]!==void 0&&(o=y):o===y?h[0]===">"?(o=i??C,d=-1):h[1]===void 0?d=-2:(d=o.lastIndex-h[2].length,v=h[1],o=h[3]===void 0?y:h[3]==='"'?rt:nt):o===rt||o===nt?o=y:o===st||o===it?o=C:(o=y,i=void 0);const M=o===y&&n[l+1].startsWith("/>")?" ":"";r+=o===C?a+At:d>=0?(s.push(v),a.slice(0,d)+"$lit$"+a.slice(d)+g+M):a+g+(d===-2?(s.push(void 0),l):M)}const c=r+(n[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[et!==void 0?et.createHTML(c):c,s]};class U{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const c=t.length-1,l=this.parts,[a,v]=wt(t,e);if(this.el=U.createElement(a,s),b.currentNode=this.el.content,e===2){const h=this.el.content,d=h.firstChild;d.remove(),h.append(...d.childNodes)}for(;(i=b.nextNode())!==null&&l.length<c;){if(i.nodeType===1){if(i.hasAttributes()){const h=[];for(const d of i.getAttributeNames())if(d.endsWith("$lit$")||d.startsWith(g)){const $=v[o++];if(h.push(d),$!==void 0){const M=i.getAttribute($.toLowerCase()+"$lit$").split(g),N=/([.?@])?(.*)/.exec($);l.push({type:1,index:r,name:N[2],strings:M,ctor:N[1]==="."?xt:N[1]==="?"?Pt:N[1]==="@"?Lt:I})}else l.push({type:6,index:r})}for(const d of h)i.removeAttribute(d)}if(ft.test(i.tagName)){const h=i.textContent.split(g),d=h.length-1;if(d>0){i.textContent=E?E.emptyScript:"";for(let $=0;$<d;$++)i.append(h[$],L()),b.nextNode(),l.push({type:2,index:++r});i.append(h[d],L())}}}else if(i.nodeType===8)if(i.data===ut)l.push({type:2,index:r});else{let h=-1;for(;(h=i.data.indexOf(g,h+1))!==-1;)l.push({type:7,index:r}),h+=g.length-1}r++}}static createElement(t,e){const s=w.createElement("template");return s.innerHTML=t,s}}function x(n,t,e=n,s){var i,r,o,c;if(t===S)return t;let l=s!==void 0?(i=e._$Co)===null||i===void 0?void 0:i[s]:e._$Cl;const a=O(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==a&&((r=l==null?void 0:l._$AO)===null||r===void 0||r.call(l,!1),a===void 0?l=void 0:(l=new a(n),l._$AT(n,e,s)),s!==void 0?((o=(c=e)._$Co)!==null&&o!==void 0?o:c._$Co=[])[s]=l:e._$Cl=l),l!==void 0&&(t=x(n,l._$AS(n,t.values),l,s)),t}class St{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:s},parts:i}=this._$AD,r=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:w).importNode(s,!0);b.currentNode=r;let o=b.nextNode(),c=0,l=0,a=i[0];for(;a!==void 0;){if(c===a.index){let v;a.type===2?v=new T(o,o.nextSibling,this,t):a.type===1?v=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(v=new Ot(o,this,t)),this.u.push(v),a=i[++l]}c!==(a==null?void 0:a.index)&&(o=b.nextNode(),c++)}return r}p(t){let e=0;for(const s of this.u)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class T{constructor(t,e,s,i){var r;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cm=(r=i==null?void 0:i.isConnected)===null||r===void 0||r}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=x(this,t,e),O(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==S&&this.g(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):bt(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==u&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(w.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=U.createElement(i.h,this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===r)this._$AH.p(s);else{const o=new St(r,this),c=o.v(this.options);o.p(s),this.T(c),this._$AH=o}}_$AC(t){let e=ot.get(t.strings);return e===void 0&&ot.set(t.strings,e=new U(t)),e}k(t){pt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new T(this.O(L()),this.O(L()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cm=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class I{constructor(t,e,s,i,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(r===void 0)t=x(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==S,o&&(this._$AH=t);else{const c=t;let l,a;for(t=r[0],l=0;l<r.length-1;l++)a=x(this,c[s+l],e,l),a===S&&(a=this._$AH[l]),o||(o=!O(a)||a!==this._$AH[l]),a===u?t=u:t!==u&&(t+=(a??"")+r[l+1]),this._$AH[l]=a}o&&!i&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class xt extends I{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}const Ct=E?E.emptyScript:"";class Pt extends I{constructor(){super(...arguments),this.type=4}j(t){t&&t!==u?this.element.setAttribute(this.name,Ct):this.element.removeAttribute(this.name)}}class Lt extends I{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){var s;if((t=(s=x(this,t,e,0))!==null&&s!==void 0?s:u)===S)return;const i=this._$AH,r=t===u&&i!==u||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==u&&(i===u||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class Ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){x(this,t)}}const lt=R.litHtmlPolyfillSupport;lt==null||lt(U,T),((B=R.litHtmlVersions)!==null&&B!==void 0?B:R.litHtmlVersions=[]).push("2.6.1");const Ut=(n,t,e)=>{var s,i;const r=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let o=r._$litPart$;if(o===void 0){const c=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:null;r._$litPart$=o=new T(t.insertBefore(L(),c),c,void 0,e??{})}return o._$AI(n),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var W,q;class P extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ut(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return S}}P.finalized=!0,P._$litElement$=!0,(W=globalThis.litElementHydrateSupport)===null||W===void 0||W.call(globalThis,{LitElement:P});const at=globalThis.litElementPolyfillSupport;at==null||at({LitElement:P});((q=globalThis.litElementVersions)!==null&&q!==void 0?q:globalThis.litElementVersions=[]).push("3.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tt=n=>t=>typeof t=="function"?((e,s)=>(customElements.define(e,s),s))(n,t):((e,s)=>{const{kind:i,elements:r}=s;return{kind:i,elements:r,finisher(o){customElements.define(e,o)}}})(n,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mt=(n,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,n)}};function F(n){return(t,e)=>e!==void 0?((s,i,r)=>{i.constructor.createProperty(r,s)})(n,t,e):Mt(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function j(n){return F({...n,state:!0})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var G;((G=window.HTMLSlotElement)===null||G===void 0?void 0:G.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ht=(n,t,e)=>{for(const s of t)if(s[0]===n)return(0,s[1])();return e==null?void 0:e()};var Nt=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,_=(n,t,e,s)=>{for(var i=s>1?void 0:s?Ht(t,e):t,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Nt(t,e,i),i},V;let m=(V=class extends P{constructor(){super(...arguments);p(this,"stage","start");p(this,"isLoading",!1);p(this,"url","");p(this,"manifest","");p(this,"icons",[]);p(this,"manifestLegacy","");p(this,"initAPI",async function(){this.stage="warmup",this.isLoading=!0,this.requestUpdate();const t=await fetch("/initAPI");this.stage=t.status==200?"url":"error",this.isLoading=!1,this.requestUpdate()});p(this,"generateManifest",async function(){var s;this.stage="manifestGen",this.isLoading=!0,this.requestUpdate();const t=await fetch(`/generateManifest?url=${this.url}`);if(t.status==200){const i=await t.json();this.manifest=i.manifest,this.icons=(i==null?void 0:i.icon)||null,this.manifest=Object.keys(this.manifest).sort().reduce((r,o)=>(r[o]=this.manifest[o],r),{}),console.log("AI",this.manifest,this.icon)}else this.manifest=null,this.icons=[];const e=await fetch(`/generateManifestLegacy?url=${this.url}`);e.status==200?(this.manifestLegacy=(s=await e.json())==null?void 0:s.manifest,this.manifestLegacy=Object.keys(this.manifestLegacy).sort().reduce((i,r)=>(i[r]=this.manifestLegacy[r],i),{}),console.log("PARSER",this.manifestLegacy)):this.manifestLegacy=null,this.stage="compare",this.isLoading=!1,this.requestUpdate()});p(this,"generateWinPackage",async function(){var e;this.stage="packageGen",this.isLoading=!0,this.requestUpdate();const t=await fetch(`/generateWinPackage?url=${this.url}`,{headers:{"Content-Type":"application/json"},body:JSON.stringify({manifest:(e=this.manifest)==null?void 0:e.manifest}),method:"POST"});if(this.stage=t.status==200?"success":"error",this.isLoading=!1,this.stage=="success"){let s=window.URL.createObjectURL(await t.blob());window.location.assign(s)}this.requestUpdate()});p(this,"goThrough",async function(){switch(this.stage){case"start":case"error":await this.initAPI();break;case"url":await this.generateManifest();break;case"compare":this.stage="url";break}this.requestUpdate()})}render(){return f`
      <sl-card class="card-header card-footer">
        <div slot="header">
          <span>
            PWABuilder OpenAI PoC<br>
            <small>Web Manifest and Icon generation via LLM</small>
          </span>
          
          <!-- <sl-icon-button name="gear" label="Settings"></sl-icon-button> -->
        </div>

        ${ht(this.stage,[["start",()=>f`This prototype explores possibilities and horizons of using OpenAI in PWA development.`],["warmup",()=>f`Warming up OpenAI...`],["url",()=>f`
            <sl-input 
              id="url"
              .value=${this.url}
              @sl-input=${t=>{this.url=t.target.value,this.requestUpdate()}}
              required
              label="Input webapp url" 
              placeholder="https://example.com"
              help-text="Without or broken manifest file"></sl-input>
            `],["manifestGen",()=>f`Generating Web Manifest and App Icon...`],["compare",()=>{var t;return f`
          <section class="compare">
            <sl-textarea rows="28" label="LLM Manifest" help-text="Generated by LLM" .value=${JSON.stringify(this.manifest,null,2)}></sl-textarea>
            <sl-textarea rows="28" label="Parser Manifest" help-text="Generated by HTML parser" .value=${JSON.stringify(this.manifestLegacy,null,2)}></sl-textarea>
            ${(t=this.icons)!=null&&t.length?f`<sl-card class="card-image icons">
                ${this.icons.map(e=>f` <img src=${e.url} alt="app icon" />`)}
                <div class="label">Generated by DALL-E 2</div>
              </sl-card>`:""}
          </section>
          `}],["packageGen",()=>f`Generating Microsoft package...`],["success",()=>f`Success! Try to install the app from the generated package.`]],()=>f`Error :(`)}

        <!-- ${ht(this.stage,[["url",()=>f`Input URL of the webapp with no manifest`]])} -->        

        <div slot="footer">
          <sl-button ?disabled=${this.stage=="success"} variant="primary" ?loading=${this.isLoading} @click=${this.goThrough}>Proceed</sl-button>
        </div>
      </sl-card>
    `}},p(V,"styles",mt`
  :host {
    font-size: 18px;
  }

  .card-header{
    max-width: min(95vw, 1024px)
  }

  .card-header [slot='header'] {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-footer [slot='footer'] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-header h3 {
    margin: 0;
  }

  .card-header sl-icon-button {
    font-size: var(--sl-font-size-medium);
  }
  
  .compare{
    display: grid; 
    grid-template:
        ". ." 1fr
        "icons icons";
    gap: 15px;
    min-width: min(85vw, 980px);
    overflow-x: auto;
  }
  .icons { grid-area: icons; font-size: 0; }
  .icons img { width: 25% }
  .icons .label { font-size: 14px; color: rgb(113, 113, 122); margin-top: 2px; }
  `),V);_([F({type:String})],m.prototype,"stage",2);_([F({type:Boolean})],m.prototype,"isLoading",2);_([j()],m.prototype,"url",2);_([j()],m.prototype,"manifest",2);_([j()],m.prototype,"icons",2);_([j()],m.prototype,"manifestLegacy",2);m=_([Tt("app-root")],m);
