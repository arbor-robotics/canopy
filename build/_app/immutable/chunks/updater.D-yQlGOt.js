import{w as l}from"./create.BkTxEPcK.js";import{w as d}from"./index.BGlJxlAq.js";import{a3 as f}from"./scheduler.38Bkksq3.js";const y=(r,t)=>{const e=l(r),n=(s,a)=>{e.update(c=>{const i=s(c);let u=i;return t&&(u=t({curr:c,next:i})),a==null||a(u),u})};return{...e,update:n,set:s=>{n(()=>s)}}};let p="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",h=(r=21)=>{let t="",e=r;for(;e--;)t+=p[Math.random()*64|0];return t};function m(){return h(10)}function w(r){return r.reduce((t,e)=>(t[e]=m(),t),{})}function D(r){const t={};return Object.keys(r).forEach(e=>{const n=e,o=r[n];t[n]=l(d(o))}),t}function k(r,t){const e={};return t.forEach(n=>{e[n]={[`data-${r}-${n}`]:""}}),n=>e[n]}function x(){const r=f();return t=>{const{originalEvent:e}=t.detail,{cancelable:n}=t,o=e.type;r(o,{originalEvent:e,currentTarget:e.currentTarget},{cancelable:n})||t.preventDefault()}}function A(r){const t={};for(const e in r){const n=r[e];n!==void 0&&(t[e]=n)}return t}function I(r){return function(t,e){if(e===void 0)return;const n=r[t];n&&n.set(e)}}export{I as a,x as b,k as c,w as g,y as o,A as r,D as t};