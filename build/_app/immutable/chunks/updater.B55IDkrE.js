import{w as i}from"./index.BRf4yT8s.js";import{w as s}from"./create.X5FZDoBX.js";let u="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",a=(n=21)=>{let t="",e=n;for(;e--;)t+=u[Math.random()*64|0];return t};function c(){return a(10)}function l(n){return n.reduce((t,e)=>(t[e]=c(),t),{})}function h(n){const t={};return Object.keys(n).forEach(e=>{const r=e,o=n[r];t[r]=s(i(o))}),t}function m(n,t){const e={};return t.forEach(r=>{e[r]={[`data-${n}-${r}`]:""}}),r=>e[r]}function p(n){const t={};for(const e in n){const r=n[e];r!==void 0&&(t[e]=r)}return t}function w(n){return function(t,e){if(e===void 0)return;const r=n[t];r&&r.set(e)}}export{l as a,m as c,w as g,p as r,h as t};
