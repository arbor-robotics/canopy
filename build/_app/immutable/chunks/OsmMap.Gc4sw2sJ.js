const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./leaflet-src.gPfWyBzh.js","./_commonjsHelpers.BosuxZz1.js"])))=>i.map(i=>d[i]);
import{_ as S}from"./preload-helper.C1FmrZbK.js";import{s as U,e as Z,c as q,b as B,f as M,l as O,i as H,n as P,m as K,o as Q}from"./scheduler.BVUDL6Zt.js";import{S as X,i as ee}from"./index.DgboukHs.js";import{s as te,e as oe,a as ne,b as T,p as ae,w as se}from"./stores.DzPvbtKP.js";import"./forest_generator.DRvdXYq1.js";import{b as D}from"./paths.ain7_Iv0.js";/* empty css                                             */function re(f){let a;return{c(){a=Z("div"),this.h()},l(s){a=q(s,"DIV",{id:!0,class:!0}),B(a).forEach(M),this.h()},h(){O(a,"id","map"),O(a,"class","z-0 svelte-140f54t")},m(s,p){H(s,a,p)},p:P,i:P,o:P,d(s){s&&M(a)}}}function ie(f,a,s){const p=K();let i,{useCurrentPos:h=!1}=a,n,k,_,d,g,u,o,v,x,{seedlings:y=[]}=a,w=!1,m=[],l=[],{selected_action:c=1}=a;function I(){w=!0}function b(){l.forEach(e=>{e.remove(),console.log(`Removing ${e} from map.`)}),l=[]}async function E(e,t){var r=o.marker([e[0],e[1]],{icon:new x({iconUrl:`${D}/res/leaves/${t.icon}.svg`})}).addTo(n);l.push(r)}te.subscribe(e=>{console.log("Seedling reached!"),e!=!1&&addReachedSeedlingMarker()}),oe.subscribe(e=>{if(g=e,!(o==null||!u))if(!d)d=o.marker([g,u],{icon:_}).addTo(n);else{var t=new o.LatLng(g,u);d.setLatLng(t)}}),ne.subscribe(e=>{if(console.log("Longitude updated!"),u=e,!(o==null||!g))if(!d)d=o.marker([g,u],{icon:_}).addTo(n);else{var t=new o.LatLng(g,u);d.setLatLng(t)}}),T.subscribe(e=>{if(o==null||!T)return;let t=document.getElementById("ego-icon");if(!t)return;let r=-e+Math.PI/2;t.style.transform=`rotate(${r}rad)`}),ae.subscribe(e=>{e!=null&&(console.log(`Seedling markers contains ${l.length} seedlings`),l.forEach(t=>{t.remove(),console.log(`Removing ${t} from map.`)}),l=[],console.log(`Seedling markers now contains ${l.length} seedlings`),e.seedlings.forEach((t,r)=>{t==null&&console.log(`Seedling at ${r} was ${t}`),E(t)}),i&&i.setData(e.bounds))});function C(e){console.log(`Setting to ${e}`),i?i.setData(e):console.log("CONTROL NOT READY")}function A(e){if(w){var t=o.marker(e.latlng,{icon:k}).addTo(n),r=m.pop();r!=null&&r.removeFrom(n),m.push(t),w=!1,console.log(`There are now ${m.length} waypoints on the map.`);let L=[];m.forEach(j=>{let $=j.getLatLng();L.push([$.lat,$.lng])}),console.log(L),se.set(L)}}function z(e){(c==0||c==3)&&p("geomchanged")}Q(async()=>{o=await S(()=>import("./leaflet-src.gPfWyBzh.js").then(e=>e.l),__vite__mapDeps([0,1]),import.meta.url),await S(()=>import("./leaflet.draw.cJkf-kdY.js"),[],import.meta.url),await S(()=>import("./Leaflet.PaintPolygon.BL41ABOh.js"),[],import.meta.url),h?n=o.map("map",{zoomControl:!1}).locate({setView:!0,maxZoom:19}):n=o.map("map",{zoomControl:!1}).setView([40.44002092,-79.9409749],19),v=o.popup(),k=o.divIcon({html:`<span class="material-symbols-outlined">
flag
</span>`,className:"div-icon"}),_=o.divIcon({html:`<div class="icon-container flex justify-center" id="ego-icon">
  <span
    class="material-symbols-rounded my-auto"
    style="--icon-color: #ff0000; --size: 1rem; --fill: 1"
  >
    navigation
  </span>
</div>`,className:"div-icon"}),x=o.Icon.extend({options:{iconUrl:`${D}/res/leaves/silver_maple.svg`,iconSize:[24,24],iconAnchor:[12,24],shadowSize:[50,64],shadowAnchor:[4,62],popupAnchor:[-3,-76]}}),o.divIcon({html:`<div class="icon-container flex justify-center" id="seedling-icon" style="">
  <span
    class="material-symbols-rounded my-auto"
    style="--icon-color: #ff0000; --size: 1rem; --fill: 1"
  >
    check
  </span>
</div>`,className:"div-icon",iconAnchor:[0,20]}),o.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:20,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(n),i=o.control.paintPolygon({menu:!1}).addTo(n),n.on("click",A),n.on("mouseup",z)});function N(){return i.getData()}function R(){return y}function G(){s(0,c=0),i.startDraw()}function V(){s(0,c=3),i.startErase()}function F(){s(0,c=1),i.stop()}function J(){i.eraseAll(),b()}function W(e){let t=o.latLng(e[0],e[1]);v.setLatLng(t).setContent("You clicked the map at "+t.toString()).openOn(n),o.marker(t).addTo(n),console.log(`Adding point at ${e[0]}, ${e[1]}`)}function Y(e){e.forEach(t=>{let r=o.latLng(t[0],t[1]);v.setLatLng(r).setContent("You clicked the map at "+r.toString()).openOn(n),o.marker(r).addTo(n),console.log(`Adding point at ${t[0]}, ${t[1]}`)})}return f.$$set=e=>{"useCurrentPos"in e&&s(1,h=e.useCurrentPos),"seedlings"in e&&s(2,y=e.seedlings),"selected_action"in e&&s(0,c=e.selected_action)},[c,h,y,I,b,E,C,N,R,G,V,F,J,W,Y]}class pe extends X{constructor(a){super(),ee(this,a,ie,re,U,{useCurrentPos:1,seedlings:2,selected_action:0,listenForWaypoint:3,clearSeedlingMarkers:4,addSeedlingMarker:5,setGeometry:6,getGeoJSON:7,getPlanSeedlings:8,startDraw:9,startErase:10,startPan:11,clear:12,addPoint:13,addPoints:14},null,[-1,-1])}get listenForWaypoint(){return this.$$.ctx[3]}get clearSeedlingMarkers(){return this.$$.ctx[4]}get addSeedlingMarker(){return this.$$.ctx[5]}get setGeometry(){return this.$$.ctx[6]}get getGeoJSON(){return this.$$.ctx[7]}get getPlanSeedlings(){return this.$$.ctx[8]}get startDraw(){return this.$$.ctx[9]}get startErase(){return this.$$.ctx[10]}get startPan(){return this.$$.ctx[11]}get clear(){return this.$$.ctx[12]}get addPoint(){return this.$$.ctx[13]}get addPoints(){return this.$$.ctx[14]}}export{pe as O};
