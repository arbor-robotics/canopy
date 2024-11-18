import{d as ne}from"../chunks/index.R8ovVqwX.js";import{s as oe,e as g,a as I,w as ie,c as b,f as c,g as P,b as D,x as R,l as k,h as u,i as C,z as re,t as j,d as q,j as K,n as W}from"../chunks/scheduler.DEuAkw60.js";import{S as ce,i as fe,a as S,d as ae,t as A,c as Y,b as F,m as G,g as se,e as J}from"../chunks/index.C4zwLhwb.js";import{e as N}from"../chunks/each.CFD4HjEW.js";import"../chunks/entry.kZ08suoU.js";import{I as Q}from"../chunks/Icon.CFkdEojW.js";import{d as ue}from"../chunks/stores.ChbBgmKu.js";import"../chunks/create.CL0vqqv_.js";const de=ne,he=!0,Te=Object.freeze(Object.defineProperty({__proto__:null,csr:de,prerender:he},Symbol.toStringTag,{value:"Module"}));function X(m,t,r){const e=m.slice();return e[1]=t[r],e[3]=r,e}function Z(m,t,r){const e=m.slice();return e[4]=t[r],e[3]=r,e}function me(m){let t,r="schedule";return{c(){t=g("span"),t.textContent=r,this.h()},l(e){t=b(e,"SPAN",{class:!0,"data-svelte-h":!0}),R(t)!=="svelte-tc4iin"&&(t.textContent=r),this.h()},h(){k(t,"class","material-symbols-rounded")},m(e,n){C(e,t,n)},i:W,o:W,d(e){e&&c(t)}}}function _e(m){let t,r;return t=new Q({props:{id:"error",size:"1.5rem",color:"#b91c1c"}}),{c(){Y(t.$$.fragment)},l(e){F(t.$$.fragment,e)},m(e,n){G(t,e,n),r=!0},i(e){r||(S(t.$$.fragment,e),r=!0)},o(e){A(t.$$.fragment,e),r=!1},d(e){J(t,e)}}}function pe(m){let t,r;return t=new Q({props:{id:"change_history",size:"1.5rem",color:"#fbbf24"}}),{c(){Y(t.$$.fragment)},l(e){F(t.$$.fragment,e)},m(e,n){G(t,e,n),r=!0},i(e){r||(S(t.$$.fragment,e),r=!0)},o(e){A(t.$$.fragment,e),r=!1},d(e){J(t,e)}}}function ve(m){let t,r;return t=new Q({props:{id:"check",size:"1.5rem",color:"green"}}),{c(){Y(t.$$.fragment)},l(e){F(t.$$.fragment,e)},m(e,n){G(t,e,n),r=!0},i(e){r||(S(t.$$.fragment,e),r=!0)},o(e){A(t.$$.fragment,e),r=!1},d(e){J(t,e)}}}function ee(m){let t,r="Keys",e,n,x,y,$,_,d,p='<tr><th scope="col" class="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Key</th> <th scope="col" class="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Value</th></tr>',o,h,a=N(m[1].values),s=[];for(let l=0;l<a.length;l+=1)s[l]=te(Z(m,a,l));return{c(){t=g("p"),t.textContent=r,e=I(),n=g("div"),x=g("div"),y=g("div"),$=g("div"),_=g("table"),d=g("thead"),d.innerHTML=p,o=I(),h=g("tbody");for(let l=0;l<s.length;l+=1)s[l].c();this.h()},l(l){t=b(l,"P",{class:!0,"data-svelte-h":!0}),R(t)!=="svelte-1mz9fw7"&&(t.textContent=r),e=P(l),n=b(l,"DIV",{class:!0});var v=D(n);x=b(v,"DIV",{class:!0});var f=D(x);y=b(f,"DIV",{class:!0});var T=D(y);$=b(T,"DIV",{class:!0});var H=D($);_=b(H,"TABLE",{class:!0});var V=D(_);d=b(V,"THEAD",{"data-svelte-h":!0}),R(d)!=="svelte-wqyuyd"&&(d.innerHTML=p),o=P(V),h=b(V,"TBODY",{class:!0});var B=D(h);for(let z=0;z<s.length;z+=1)s[z].l(B);B.forEach(c),V.forEach(c),H.forEach(c),T.forEach(c),f.forEach(c),v.forEach(c),this.h()},h(){k(t,"class","mt-2"),k(h,"class","divide-y divide-gray-200 dark:divide-neutral-700"),k(_,"class","min-w-full divide-y divide-gray-200 dark:divide-neutral-700"),k($,"class","border rounded-lg shadow overflow-hidden dark:border-neutral-700 dark:shadow-gray-900"),k(y,"class","p-1.5 min-w-full inline-block align-middle"),k(x,"class","-m-1.5 overflow-x-auto"),k(n,"class","flex flex-col")},m(l,v){C(l,t,v),C(l,e,v),C(l,n,v),u(n,x),u(x,y),u(y,$),u($,_),u(_,d),u(_,o),u(_,h);for(let f=0;f<s.length;f+=1)s[f]&&s[f].m(h,null)},p(l,v){if(v&1){a=N(l[1].values);let f;for(f=0;f<a.length;f+=1){const T=Z(l,a,f);s[f]?s[f].p(T,v):(s[f]=te(T),s[f].c(),s[f].m(h,null))}for(;f<s.length;f+=1)s[f].d(1);s.length=a.length}},d(l){l&&(c(t),c(e),c(n)),re(s,l)}}}function te(m){let t,r,e,n=m[4].key+"",x,y,$,_,d=m[4].value+"",p,o;return{c(){t=g("tr"),r=g("td"),e=g("p"),x=j(n),y=I(),$=g("td"),_=g("p"),p=j(d),o=I(),this.h()},l(h){t=b(h,"TR",{});var a=D(t);r=b(a,"TD",{});var s=D(r);e=b(s,"P",{class:!0});var l=D(e);x=q(l,n),l.forEach(c),s.forEach(c),y=P(a),$=b(a,"TD",{});var v=D($);_=b(v,"P",{class:!0});var f=D(_);p=q(f,d),f.forEach(c),v.forEach(c),o=P(a),a.forEach(c),this.h()},h(){k(e,"class","px-2"),k(_,"class","px-2")},m(h,a){C(h,t,a),u(t,r),u(r,e),u(e,x),u(t,y),u(t,$),u($,_),u(_,p),u(t,o)},p(h,a){a&1&&n!==(n=h[4].key+"")&&K(x,n),a&1&&d!==(d=h[4].value+"")&&K(p,d)},d(h){h&&c(t)}}}function le(m){let t,r,e,n,x,y=m[1].name+"",$,_,d,p,o,h,a,s=m[1].message+"",l,v,f,T,H,V;const B=[ve,pe,_e,me],z=[];function U(i,w){return i[1].level==0?0:i[1].level==1?1:i[1].level==2?2:i[1].level==3?3:-1}~(r=U(m))&&(e=z[r]=B[r](m)),p=new Q({props:{id:"message",size:"1rem",color:""}});let E=m[1].values.length>0&&ee(m);return{c(){t=g("div"),e&&e.c(),n=I(),x=g("p"),$=j(y),_=I(),d=g("div"),Y(p.$$.fragment),o=I(),h=g("p"),a=j('"'),l=j(s),v=j('"'),f=I(),E&&E.c(),T=I(),H=g("hr"),this.h()},l(i){t=b(i,"DIV",{class:!0});var w=D(t);e&&e.l(w),n=P(w),x=b(w,"P",{class:!0});var M=D(x);$=q(M,y),M.forEach(c),w.forEach(c),_=P(i),d=b(i,"DIV",{class:!0});var L=D(d);F(p.$$.fragment,L),o=P(L),h=b(L,"P",{class:!0});var O=D(h);a=q(O,'"'),l=q(O,s),v=q(O,'"'),O.forEach(c),L.forEach(c),f=P(i),E&&E.l(i),T=P(i),H=b(i,"HR",{class:!0}),this.h()},h(){k(x,"class","text-xl font-regular my-4"),k(t,"class","flex flex-row align-bottom items-center"),k(h,"class","ml-2"),k(d,"class","flex flex-row"),k(H,"class","mt-4")},m(i,w){C(i,t,w),~r&&z[r].m(t,null),u(t,n),u(t,x),u(x,$),C(i,_,w),C(i,d,w),G(p,d,null),u(d,o),u(d,h),u(h,a),u(h,l),u(h,v),C(i,f,w),E&&E.m(i,w),C(i,T,w),C(i,H,w),V=!0},p(i,w){let M=r;r=U(i),r!==M&&(e&&(se(),A(z[M],1,1,()=>{z[M]=null}),ae()),~r?(e=z[r],e||(e=z[r]=B[r](i),e.c()),S(e,1),e.m(t,n)):e=null),(!V||w&1)&&y!==(y=i[1].name+"")&&K($,y),(!V||w&1)&&s!==(s=i[1].message+"")&&K(l,s),i[1].values.length>0?E?E.p(i,w):(E=ee(i),E.c(),E.m(T.parentNode,T)):E&&(E.d(1),E=null)},i(i){V||(S(e),S(p.$$.fragment,i),V=!0)},o(i){A(e),A(p.$$.fragment,i),V=!1},d(i){i&&(c(t),c(_),c(d),c(f),c(T),c(H)),~r&&z[r].d(),J(p),E&&E.d(i)}}}function ge(m){let t,r,e,n,x="Diagnostics",y,$,_,d,p=N(m[0]),o=[];for(let a=0;a<p.length;a+=1)o[a]=le(X(m,p,a));const h=a=>A(o[a],1,1,()=>{o[a]=null});return{c(){t=g("meta"),r=I(),e=g("div"),n=g("p"),n.textContent=x,y=I(),$=g("hr"),_=I();for(let a=0;a<o.length;a+=1)o[a].c();this.h()},l(a){const s=ie("svelte-16cfq3a",document.head);t=b(s,"META",{name:!0,content:!0}),s.forEach(c),r=P(a),e=b(a,"DIV",{class:!0});var l=D(e);n=b(l,"P",{class:!0,"data-svelte-h":!0}),R(n)!=="svelte-wu307n"&&(n.textContent=x),y=P(l),$=b(l,"HR",{}),_=P(l);for(let v=0;v<o.length;v+=1)o[v].l(l);l.forEach(c),this.h()},h(){document.title="Diagnostics | Canopy",k(t,"name","description"),k(t,"content","View Steward's health"),k(n,"class","text-5xl font-light my-4"),k(e,"class","flex flex-col h-full w-full overflow-y-auto max-w-2xl mx-auto p-8")},m(a,s){u(document.head,t),C(a,r,s),C(a,e,s),u(e,n),u(e,y),u(e,$),u(e,_);for(let l=0;l<o.length;l+=1)o[l]&&o[l].m(e,null);d=!0},p(a,[s]){if(s&1){p=N(a[0]);let l;for(l=0;l<p.length;l+=1){const v=X(a,p,l);o[l]?(o[l].p(v,s),S(o[l],1)):(o[l]=le(v),o[l].c(),S(o[l],1),o[l].m(e,null))}for(se(),l=p.length;l<o.length;l+=1)h(l);ae()}},i(a){if(!d){for(let s=0;s<p.length;s+=1)S(o[s]);d=!0}},o(a){o=o.filter(Boolean);for(let s=0;s<o.length;s+=1)A(o[s]);d=!1},d(a){a&&(c(r),c(e)),c(t),re(o,a)}}}function be(m,t,r){let e=[];return ue.subscribe(n=>{n&&r(0,e=n.status)}),[e]}class Ie extends ce{constructor(t){super(),fe(this,t,be,ge,oe,{})}}export{Ie as component,Te as universal};
