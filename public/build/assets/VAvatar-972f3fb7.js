import{h as i,ay as f,br as G,a as d,bq as m,bx as g,p as v,e as S,o as N,ab as T,ac as z,d as B,ad as x,f as U,ae as F,i as M,b5 as K,aJ as D,l as J,bs as q,r as W,v as y,V as Y,b8 as H}from"./main-c8d21aaa.js";import{a as Q}from"./VImg-dba3914f.js";function ce(e){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"div",t=arguments.length>2?arguments[2]:void 0;return i()({name:t??f(G(e.replace(/__/g,"-"))),props:{tag:{type:String,default:s},...d()},setup(n,a){let{slots:l}=a;return()=>{var r;return m(n.tag,{class:[e,n.class],style:n.style},(r=l.default)==null?void 0:r.call(l))}}})}const P=(()=>g.reduce((e,s)=>(e[s]={type:[Boolean,String,Number],default:!1},e),{}))(),j=(()=>g.reduce((e,s)=>{const t="offset"+f(s);return e[t]={type:[String,Number],default:null},e},{}))(),A=(()=>g.reduce((e,s)=>{const t="order"+f(s);return e[t]={type:[String,Number],default:null},e},{}))(),k={col:Object.keys(P),offset:Object.keys(j),order:Object.keys(A)};function X(e,s,t){let n=e;if(!(t==null||t===!1)){if(s){const a=s.replace(e,"");n+=`-${a}`}return e==="col"&&(n="v-"+n),e==="col"&&(t===""||t===!0)||(n+=`-${t}`),n.toLowerCase()}}const Z=["auto","start","end","center","baseline","stretch"],p=v({cols:{type:[Boolean,String,Number],default:!1},...P,offset:{type:[String,Number],default:null},...j,order:{type:[String,Number],default:null},...A,alignSelf:{type:String,default:null,validator:e=>Z.includes(e)},...d(),...S()},"VCol"),ie=i()({name:"VCol",props:p(),setup(e,s){let{slots:t}=s;const n=N(()=>{const a=[];let l;for(l in k)k[l].forEach(o=>{const u=e[o],c=X(l,o,u);c&&a.push(c)});const r=a.some(o=>o.startsWith("v-col-"));return a.push({"v-col":!r||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),a});return()=>{var a;return m(e.tag,{class:[n.value,e.class],style:e.style},(a=t.default)==null?void 0:a.call(t))}}}),b=["start","end","center"],L=["space-between","space-around","space-evenly"];function C(e,s){return g.reduce((t,n)=>{const a=e+f(n);return t[a]=s(),t},{})}const ee=[...b,"baseline","stretch"],$=e=>ee.includes(e),w=C("align",()=>({type:String,default:null,validator:$})),te=[...b,...L],E=e=>te.includes(e),I=C("justify",()=>({type:String,default:null,validator:E})),ae=[...b,...L,"stretch"],O=e=>ae.includes(e),R=C("alignContent",()=>({type:String,default:null,validator:O})),h={align:Object.keys(w),justify:Object.keys(I),alignContent:Object.keys(R)},ne={align:"align",justify:"justify",alignContent:"align-content"};function se(e,s,t){let n=ne[e];if(t!=null){if(s){const a=s.replace(e,"");n+=`-${a}`}return n+=`-${t}`,n.toLowerCase()}}const le=v({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:$},...w,justify:{type:String,default:null,validator:E},...I,alignContent:{type:String,default:null,validator:O},...R,...d(),...S()},"VRow"),fe=i()({name:"VRow",props:le(),setup(e,s){let{slots:t}=s;const n=N(()=>{const a=[];let l;for(l in h)h[l].forEach(r=>{const o=e[r],u=se(l,r,o);u&&a.push(u)});return a.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),a});return()=>{var a;return m(e.tag,{class:["v-row",n.value,e.class],style:e.style},(a=t.default)==null?void 0:a.call(t))}}});const re=v({start:Boolean,end:Boolean,icon:T,image:String,text:String,...d(),...z(),...B(),...x(),...S(),...U(),...F({variant:"flat"})},"VAvatar"),de=i()({name:"VAvatar",props:re(),setup(e,s){let{slots:t}=s;const{themeClasses:n}=M(e),{colorClasses:a,colorStyles:l,variantClasses:r}=K(e),{densityClasses:o}=D(e),{roundedClasses:u}=J(e),{sizeClasses:c,sizeStyles:_}=q(e);return W(()=>y(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},n.value,a.value,o.value,u.value,c.value,r.value,e.class],style:[l.value,_.value,e.style]},{default:()=>{var V;return[e.image?y(Q,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?y(Y,{key:"icon",icon:e.icon},null):((V=t.default)==null?void 0:V.call(t))??e.text,H(!1,"v-avatar")]}})),{}}});export{fe as V,ie as a,de as b,ce as c};
