import{t as F,d as G,S as H,i as J}from"./index._uyrrK30.js";import{r as K,s as L,e as q,t as O,c as C,b as D,d as Q,f as M,l as P,N as w,z as v,i as R,h as V,j as T,n as k}from"./scheduler.DnSaA6Oj.js";function Z(s){return(s==null?void 0:s.length)!==void 0?s:Array.from(s)}function p(s,n){F(s,1,1,()=>{n.delete(s.key)})}function x(s,n,e,u,t,l,f,y,_,a,z,B){let d=s.length,m=l.length,h=d;const S={};for(;h--;)S[s[h].key]=h;const r=[],j=new Map,b=new Map,A=[];for(h=m;h--;){const i=B(t,l,h),c=e(i);let o=f.get(c);o?A.push(()=>o.p(i,n)):(o=a(c,i),o.c()),j.set(c,r[h]=o),c in S&&b.set(c,Math.abs(h-S[c]))}const E=new Set,N=new Set;function I(i){G(i,1),i.m(y,z),f.set(i.key,i),z=i.first,m--}for(;d&&m;){const i=r[m-1],c=s[d-1],o=i.key,g=c.key;i===c?(z=i.first,d--,m--):j.has(g)?!f.has(o)||E.has(o)?I(i):N.has(g)?d--:b.get(o)>b.get(g)?(N.add(o),I(i)):(E.add(g),d--):(_(c,f),d--)}for(;d--;){const i=s[d];j.has(i.key)||_(i,f)}for(;m;)I(r[m-1]);return K(A),r}function U(s){let n,e,u;return{c(){n=q("div"),e=q("span"),u=O(s[0]),this.h()},l(t){n=C(t,"DIV",{class:!0});var l=D(n);e=C(l,"SPAN",{class:!0,style:!0});var f=D(e);u=Q(f,s[0]),f.forEach(M),l.forEach(M),this.h()},h(){P(e,"class","material-symbols-rounded my-auto svelte-3vwrbj"),w(e,"--icon-color",s[1]),w(e,"--size",s[2]),w(e,"--fill",s[3]),v(e,"animate-pulse",s[4]),v(e,"animate-spin",s[5]),P(n,"class","icon-container flex justify-center svelte-3vwrbj")},m(t,l){R(t,n,l),V(n,e),V(e,u)},p(t,[l]){l&1&&T(u,t[0]),l&2&&w(e,"--icon-color",t[1]),l&4&&w(e,"--size",t[2]),l&8&&w(e,"--fill",t[3]),l&16&&v(e,"animate-pulse",t[4]),l&32&&v(e,"animate-spin",t[5])},i:k,o:k,d(t){t&&M(n)}}}function W(s,n,e){let{id:u}=n,{color:t="var(--md-sys-color-on-secondary-container)"}=n,{size:l="1rem"}=n,{fill:f="1"}=n,{pulse:y=!1}=n,{spin:_=!1}=n;return s.$$set=a=>{"id"in a&&e(0,u=a.id),"color"in a&&e(1,t=a.color),"size"in a&&e(2,l=a.size),"fill"in a&&e(3,f=a.fill),"pulse"in a&&e(4,y=a.pulse),"spin"in a&&e(5,_=a.spin)},[u,t,l,f,y,_]}class $ extends H{constructor(n){super(),J(this,n,W,U,L,{id:0,color:1,size:2,fill:3,pulse:4,spin:5})}}export{$ as I,Z as e,p as o,x as u};
