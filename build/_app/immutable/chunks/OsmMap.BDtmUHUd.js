const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./leaflet-src.gPfWyBzh.js","./_commonjsHelpers.BosuxZz1.js"])))=>i.map(i=>d[i]);
import{_ as P}from"./preload-helper.C1FmrZbK.js";import{s as Z,e as q,c as B,b as H,f as $,l as O,i as K,n as S,m as Q,o as X}from"./scheduler.DnSaA6Oj.js";import{S as ee,i as te}from"./index._uyrrK30.js";import{s as ne,e as oe,a as ae,b as T,w as re}from"./stores.D7huVntC.js";import"./transform.BXP9HJX6.js";import{b as I}from"./paths.DB4GxgaC.js";/* empty css                                             */function se(m){let a;return{c(){a=q("div"),this.h()},l(r){a=B(r,"DIV",{id:!0,class:!0}),H(a).forEach($),this.h()},h(){O(a,"id","map"),O(a,"class","z-0 svelte-140f54t")},m(r,f){K(r,a,f)},p:S,i:S,o:S,d(r){r&&$(a)}}}function ie(m,a,r){const f=Q();let i,{useCurrentPos:p=!1}=a,o,x,h,c,d,g,t,_,k,b=!1,{seedlings:y=[]}=a,v=!1,u=[],L=[],{selected_action:l=1}=a;function C(){v=!0}function E(){L.forEach(e=>{e.remove(),console.log(`Removing ${e} from map.`)}),L=[]}async function D(e,n){var s=t.marker([e[0],e[1]],{icon:new k({iconUrl:`${I}/res/leaves/${n.icon}.svg`})}).addTo(o);b&&s.bindPopup(`<strong>${n.common}</strong><br/><i>${n.scientific}</i>`),L.push(s)}ne.subscribe(e=>{console.log("Seedling reached!"),e!=!1&&addReachedSeedlingMarker()}),oe.subscribe(e=>{if(d=e,!(t==null||!g))if(!c)c=t.marker([d,g],{icon:h}).addTo(o);else{var n=new t.LatLng(d,g);c.setLatLng(n)}}),ae.subscribe(e=>{if(console.log("Longitude updated!"),g=e,!(t==null||!d))if(!c)c=t.marker([d,g],{icon:h}).addTo(o);else{var n=new t.LatLng(d,g);c.setLatLng(n)}}),T.subscribe(e=>{if(t==null||!T)return;let n=document.getElementById("ego-icon");if(!n)return;let s=-e+Math.PI/2;n.style.transform=`rotate(${s}rad)`});function A(e){console.log(`Setting to ${e}`),i?i.setData(e):console.log("CONTROL NOT READY")}function z(e){if(v){var n=t.marker(e.latlng,{icon:x}).addTo(o),s=u.pop();s!=null&&s.removeFrom(o),u.push(n),v=!1,console.log(`There are now ${u.length} waypoints on the map.`);let w=[];u.forEach(U=>{let M=U.getLatLng();w.push([M.lat,M.lng])}),console.log(w),re.set(w)}}function N(e){(l==0||l==3)&&f("geomchanged")}X(async()=>{t=await P(()=>import("./leaflet-src.gPfWyBzh.js").then(e=>e.l),__vite__mapDeps([0,1]),import.meta.url),await P(()=>import("./leaflet.draw.cJkf-kdY.js"),[],import.meta.url),await P(()=>import("./Leaflet.PaintPolygon.BL41ABOh.js"),[],import.meta.url),b=!0,k=t.Icon.extend({options:{iconUrl:`${I}/res/leaves/silver_maple.svg`,iconSize:[24,24],iconAnchor:[12,12],shadowSize:[50,64],shadowAnchor:[4,62],popupAnchor:[0,0]}}),p?o=t.map("map",{zoomControl:!1}).locate({setView:!0,maxZoom:19}):o=t.map("map",{zoomControl:!1}).setView([40.44002092,-79.9409749],19),_=t.popup(),x=t.divIcon({html:`<span class="material-symbols-outlined">
flag
</span>`,className:"div-icon"}),h=t.divIcon({html:`<div class="icon-container flex justify-center" id="ego-icon">
  <span
    class="material-symbols-rounded my-auto"
    style="--icon-color: #ff0000; --size: 1rem; --fill: 1"
  >
    navigation
  </span>
</div>`,className:"div-icon"}),t.divIcon({html:`<div class="icon-container flex justify-center" id="seedling-icon" style="">
  <span
    class="material-symbols-rounded my-auto"
    style="--icon-color: #ff0000; --size: 1rem; --fill: 1"
  >
    check
  </span>
</div>`,className:"div-icon",iconAnchor:[0,20]}),t.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:20,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(o),i=t.control.paintPolygon({menu:!1}).addTo(o),o.on("click",z),o.on("mouseup",N)});function R(){return i.getData()}function G(){return y}function V(){r(0,l=0),i.startDraw()}function F(){r(0,l=3),i.startErase()}function J(){r(0,l=1),i.stop()}function W(){i.eraseAll(),E()}function Y(e){let n=t.latLng(e[0],e[1]);_.setLatLng(n).setContent("You clicked the map at "+n.toString()).openOn(o),t.marker(n).addTo(o),console.log(`Adding point at ${e[0]}, ${e[1]}`)}function j(e){e.forEach(n=>{let s=t.latLng(n[0],n[1]);_.setLatLng(s).setContent("You clicked the map at "+s.toString()).openOn(o),t.marker(s).addTo(o),console.log(`Adding point at ${n[0]}, ${n[1]}`)})}return m.$$set=e=>{"useCurrentPos"in e&&r(1,p=e.useCurrentPos),"seedlings"in e&&r(2,y=e.seedlings),"selected_action"in e&&r(0,l=e.selected_action)},[l,p,y,C,E,D,A,R,G,V,F,J,W,Y,j]}class pe extends ee{constructor(a){super(),te(this,a,ie,se,Z,{useCurrentPos:1,seedlings:2,selected_action:0,listenForWaypoint:3,clearSeedlingMarkers:4,addSeedlingMarker:5,setGeometry:6,getGeoJSON:7,getPlanSeedlings:8,startDraw:9,startErase:10,startPan:11,clear:12,addPoint:13,addPoints:14},null,[-1,-1])}get listenForWaypoint(){return this.$$.ctx[3]}get clearSeedlingMarkers(){return this.$$.ctx[4]}get addSeedlingMarker(){return this.$$.ctx[5]}get setGeometry(){return this.$$.ctx[6]}get getGeoJSON(){return this.$$.ctx[7]}get getPlanSeedlings(){return this.$$.ctx[8]}get startDraw(){return this.$$.ctx[9]}get startErase(){return this.$$.ctx[10]}get startPan(){return this.$$.ctx[11]}get clear(){return this.$$.ctx[12]}get addPoint(){return this.$$.ctx[13]}get addPoints(){return this.$$.ctx[14]}}export{pe as O};
