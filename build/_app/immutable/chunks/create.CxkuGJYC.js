import{d as y,w,r as f}from"./index.qysLAMB4.js";import{o as h,a5 as v,a6 as p}from"./scheduler.D26MHN-h.js";function D(e){return Object.keys(e).reduce((t,n)=>e[n]===void 0?t:t+`${n}:${e[n]};`,"")}D({position:"absolute",opacity:0,"pointer-events":"none",margin:0,transform:"translateX(-100%)"});function V(e){if(e!==null)return""}function m(e){function t(n){return n(e),()=>{}}return{subscribe:t}}const b=e=>new Proxy(e,{get(t,n,r){return Reflect.get(t,n,r)},ownKeys(t){return Reflect.ownKeys(t).filter(n=>n!=="action")}}),E=e=>typeof e=="function";O("empty");function O(e,t){const{stores:n,action:r,returned:a}=t??{},s=(()=>{if(n&&a)return y(n,i=>{const u=a(i);if(E(u)){const c=(...l)=>b({...u(...l),[`data-melt-${e}`]:"",action:r??d});return c.action=r??d,c}return b({...u,[`data-melt-${e}`]:"",action:r??d})});{const i=a,u=i==null?void 0:i();if(E(u)){const c=(...l)=>b({...u(...l),[`data-melt-${e}`]:"",action:r??d});return c.action=r??d,m(c)}return m(b({...u,[`data-melt-${e}`]:"",action:r??d}))}})(),o=r??(()=>{});return o.subscribe=s.subscribe,o}function x(e){const t=s=>s?`${e}-${s}`:e,n=s=>`data-melt-${e}${s?`-${s}`:""}`,r=s=>`[data-melt-${e}${s?`-${s}`:""}]`;return{name:t,attribute:n,selector:r,getEl:s=>document.querySelector(r(s))}}const N=typeof document<"u",k=e=>typeof e=="function";function j(e){return e instanceof Element}function A(e){return e instanceof HTMLElement}function L(e){return e!==null&&typeof e=="object"}function R(e){return L(e)&&"subscribe"in e}function C(...e){return(...t)=>{for(const n of e)typeof n=="function"&&n(...t)}}function d(){}function F(e,t,n,r){const a=Array.isArray(t)?t:[t];return a.forEach(s=>e.addEventListener(s,n,r)),()=>{a.forEach(s=>e.removeEventListener(s,n,r))}}function B(e,t,n,r){const a=Array.isArray(t)?t:[t];if(typeof n=="function"){const s=P(o=>n(o));return a.forEach(o=>e.addEventListener(o,s,r)),()=>{a.forEach(o=>e.removeEventListener(o,s,r))}}return()=>void 0}function T(e){const t=e.currentTarget;if(!A(t))return null;const n=new CustomEvent(`m-${e.type}`,{detail:{originalEvent:e},cancelable:!0});return t.dispatchEvent(n),n}function P(e){return t=>{const n=T(t);if(!(n!=null&&n.defaultPrevented))return e(t)}}const G=e=>{try{h(e)}catch{return e}},S=e=>{try{v(e)}catch{return e}};function $(e,...t){const n={};for(const r of Object.keys(e))t.includes(r)||(n[r]=e[r]);return n}function g(e){return{...e,get:()=>p(e)}}g.writable=function(e){const t=w(e);let n=e;return{subscribe:t.subscribe,set(r){t.set(r),n=r},update(r){const a=r(n);t.set(a),n=a},get(){return n}}};g.derived=function(e,t){const n=new Map,r=()=>{const s=Array.isArray(e)?e.map(o=>o.get()):e.get();return t(s)};return{get:r,subscribe:s=>{const o=[];return(Array.isArray(e)?e:[e]).forEach(u=>{o.push(u.subscribe(()=>{s(r())}))}),s(r()),n.set(s,o),()=>{const u=n.get(s);if(u)for(const c of u)c();n.delete(s)}}}};const M={ALT:"Alt",ARROW_DOWN:"ArrowDown",ARROW_LEFT:"ArrowLeft",ARROW_RIGHT:"ArrowRight",ARROW_UP:"ArrowUp",BACKSPACE:"Backspace",CAPS_LOCK:"CapsLock",CONTROL:"Control",DELETE:"Delete",END:"End",ENTER:"Enter",ESCAPE:"Escape",F1:"F1",F10:"F10",F11:"F11",F12:"F12",F2:"F2",F3:"F3",F4:"F4",F5:"F5",F6:"F6",F7:"F7",F8:"F8",F9:"F9",HOME:"Home",META:"Meta",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",SHIFT:"Shift",SPACE:" ",TAB:"Tab",CTRL:"Control",ASTERISK:"*",A:"a",P:"p"};function W(e,t){let n;const r=y(e,s=>{n==null||n(),n=t(s)}).subscribe(d),a=()=>{r(),n==null||n()};return S(a),a}f(void 0,e=>{function t(r){e(r),e(void 0)}return F(document,"pointerup",t,{passive:!1,capture:!0})});const _=f(void 0,e=>{function t(r){r&&r.key===M.ESCAPE&&e(r),e(void 0)}return F(document,"keydown",t,{passive:!1})}),I=(e,t={})=>{let n=d;function r(a={}){n();const s={enabled:!0,...a},o=R(s.enabled)?s.enabled:f(s.enabled);n=C(_.subscribe(i=>{var c;if(!i||!p(o))return;const u=i.target;if(!(!A(u)||u.closest("[data-escapee]")!==e)){if(i.preventDefault(),s.ignore){if(k(s.ignore)){if(s.ignore(i))return}else if(Array.isArray(s.ignore)&&s.ignore.length>0&&s.ignore.some(l=>l&&u===l))return}(c=s.handler)==null||c.call(s,i)}}),W(o,i=>{i?e.dataset.escapee="":delete e.dataset.escapee}))}return r(t),{update:r,destroy(){e.removeAttribute("data-escapee"),n()}}};f(!1),f(!1),f(void 0);const H={isDateDisabled:void 0,isDateUnavailable:void 0,value:void 0,preventDeselect:!1,numberOfMonths:1,pagedNavigation:!1,weekStartsOn:0,fixedWeeks:!1,calendarLabel:"Event Date",locale:"en",minValue:void 0,maxValue:void 0,disabled:!1,readonly:!1,weekdayFormat:"narrow"};({...$(H,"isDateDisabled","isDateUnavailable","value","locale","disabled","readonly","minValue","maxValue","weekdayFormat")});export{k as a,j as b,F as c,B as d,C as e,W as f,N as g,x as h,A as i,G as j,M as k,O as m,d as n,$ as o,V as p,D as s,I as u,g as w};
