import{c as e,a as t,o as n,b as r,d as o,e as i,P as s,m as a,S as l,t as d,i as c,f as u,g,h as f,j as p,u as h,k as y,s as b,l as m,n as v,p as w,q as x,r as k,v as $,w as S,x as C,y as E,z as q,A as M,B as F,F as L,C as D,D as T,$ as A,E as I,G as O,H as P,I as z,J as K,K as R,L as B,M as H,N as G,O as U,Q as V,R as j,T as N,U as Q,V as W,W as _}from"./index-DvqVQAuW.js";import"./vendor-p9OE2Gn_.js";import"./router-CqJB9dL_.js";import"./ui-BudRaljr.js";import"./utils-DtvSZdEq.js";var X=e=>null!=e;var Z=e=>"function"!=typeof e||e.length?e:e(),Y=e=>Array.isArray(e)?e:e?[e]:[];var J=y;var ee,te=function(e){const[r,o]=t(),i=e?.throw?(e,t)=>{throw o(e instanceof Error?e:new Error(t)),e}:(e,t)=>{o(e instanceof Error?e:new Error(t))},s=e?.api?Array.isArray(e.api)?e.api:[e.api]:[globalThis.localStorage].filter(Boolean),a=e?.prefix?`${e.prefix}.`:"",l=new Map,d=new Proxy({},{get(n,r){let o=l.get(r);o||(o=t(void 0,{equals:!1}),l.set(r,o)),o[0]();const d=s.reduce((e,t)=>{if(null!==e||!t)return e;try{return t.getItem(`${a}${r}`)}catch(n){return i(n,`Error reading ${a}${r} from ${t.name}`),null}},null);return null!==d&&e?.deserializer?e.deserializer(d,r,e.options):d}});return!1!==e?.sync&&n(()=>{const e=e=>{let t=!1;s.forEach(n=>{try{n!==e.storageArea&&e.key&&e.newValue!==n.getItem(e.key)&&(e.newValue?n.setItem(e.key,e.newValue):n.removeItem(e.key),t=!0)}catch(r){i(r,`Error synching api ${n.name} from storage event (${e.key}=${e.newValue})`)}}),t&&e.key&&l.get(e.key)?.[1]()};"addEventListener"in globalThis?(globalThis.addEventListener("storage",e),y(()=>globalThis.removeEventListener("storage",e))):(s.forEach(t=>t.addEventListener?.("storage",e)),y(()=>s.forEach(t=>t.removeEventListener?.("storage",e))))}),[d,(t,n,r)=>{const o=e?.serializer?e.serializer(n,t,r??e.options):n,d=`${a}${t}`;s.forEach(e=>{try{e.getItem(d)!==o&&e.setItem(d,o)}catch(n){i(n,`Error setting ${a}${t} to ${o} in ${e.name}`)}});const c=l.get(t);c&&c[1]()},{clear:()=>s.forEach(e=>{try{e.clear()}catch(t){i(t,`Error clearing ${e.name}`)}}),error:r,remove:e=>s.forEach(t=>{try{t.removeItem(`${a}${e}`)}catch(n){i(n,`Error removing ${a}${e} from ${t.name}`)}}),toJSON:()=>{const t={},n=(n,r)=>{if(!t.hasOwnProperty(n)){const o=r&&e?.deserializer?e.deserializer(r,n,e.options):r;o&&(t[n]=o)}};return s.forEach(e=>{if("function"==typeof e.getAll){let t;try{t=e.getAll()}catch(r){i(r,`Error getting all values from in ${e.name}`)}for(const e of t)n(e,t[e])}else{let o,s=0;try{for(;o=e.key(s++);)t.hasOwnProperty(o)||n(o,e.getItem(o))}catch(r){i(r,`Error getting all values from ${e.name}`)}}}),t}}]},ne=e=>{if(!e)return"";let t="";for(const n in e){if(!e.hasOwnProperty(n))continue;const r=e[n];t+=r instanceof Date?`; ${n}=${r.toUTCString()}`:"boolean"==typeof r?`; ${n}`:`; ${n}=${r}`}return t},re=("function"==typeof(ee={_cookies:[globalThis.document,"cookie"],getItem:e=>re._cookies[0][re._cookies[1]].match("(^|;)\\s*"+e+"\\s*=\\s*([^;]+)")?.pop()??null,setItem:(e,t,n)=>{const r=re.getItem(e);re._cookies[0][re._cookies[1]]=`${e}=${t}${ne(n)}`;const o=Object.assign(new Event("storage"),{key:e,oldValue:r,newValue:t,url:globalThis.document.URL,storageArea:re});window.dispatchEvent(o)},removeItem:e=>{re._cookies[0][re._cookies[1]]=`${e}=deleted${ne({expires:new Date(0)})}`},key:e=>{let t=null,n=0;return re._cookies[0][re._cookies[1]].replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g,(r,o)=>(!t&&o&&n++===e&&(t=o),"")),t},get length(){let e=0;return re._cookies[0][re._cookies[1]].replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g,t=>(e+=t?1:0,"")),e}}).clear||(ee.clear=()=>{let e;for(;e=ee.key(0);)ee.removeItem(e)}),ee),oe=796,ie="bottom",se=Object.keys(b)[0],ae=Object.keys(m)[0],le=e({client:void 0,onlineManager:void 0,queryFlavor:"",version:"",shadowDOMTarget:void 0});function de(){return h(le)}var ce=e(void 0),ue=e=>{const[n,s]=t(null),a=()=>{const e=n();null!=e&&(e.close(),s(null))},l=(t,r)=>{if(null!=n())return;const o=window.open("","TSQD-Devtools-Panel",`width=${t},height=${r},popup`);if(!o)throw new Error("Failed to open popup. Please allow popups for this site to view the devtools in picture-in-picture mode.");o.document.head.innerHTML="",o.document.body.innerHTML="",f(o.document),o.document.title="TanStack Query Devtools",o.document.body.style.margin="0",o.addEventListener("pagehide",()=>{e.setLocalStore("pip_open","false"),s(null)}),[...(de().shadowDOMTarget||document).styleSheets].forEach(e=>{try{const t=[...e.cssRules].map(e=>e.cssText).join(""),n=document.createElement("style"),r=e.ownerNode;let i="";r&&"id"in r&&(i=r.id),i&&n.setAttribute("id",i),n.textContent=t,o.document.head.appendChild(n)}catch(t){const n=document.createElement("link");if(null==e.href)return;n.rel="stylesheet",n.type=e.type,n.media=e.media.toString(),n.href=e.href,o.document.head.appendChild(n)}}),p(["focusin","focusout","pointermove","keydown","pointerdown","pointerup","click","mousedown","input"],o.document),e.setLocalStore("pip_open","true"),s(o)};r(()=>{"true"!==(e.localStore.pip_open??"false")||e.disabled||l(Number(window.innerWidth),Number(e.localStore.height||500))}),r(()=>{const e=(de().shadowDOMTarget||document).querySelector("#_goober"),t=n();if(e&&t){const n=new MutationObserver(()=>{const n=(de().shadowDOMTarget||t.document).querySelector("#_goober");n&&(n.textContent=e.textContent)});n.observe(e,{childList:!0,subtree:!0,characterDataOldValue:!0}),y(()=>{n.disconnect()})}});const d=o(()=>({pipWindow:n(),requestPipWindow:l,closePipWindow:a,disabled:e.disabled??!1}));return i(ce.Provider,{value:d,get children(){return e.children}})},ge=()=>o(()=>{const e=h(ce);if(!e)throw new Error("usePiPWindow must be used within a PiPProvider");return e()}),fe=e(()=>"dark");function pe(){return h(fe)}var he={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Ấ":"A","Ắ":"A","Ẳ":"A","Ẵ":"A","Ặ":"A","Æ":"AE","Ầ":"A","Ằ":"A","Ȃ":"A","Ç":"C","Ḉ":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ế":"E","Ḗ":"E","Ề":"E","Ḕ":"E","Ḝ":"E","Ȇ":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ḯ":"I","Ȋ":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ố":"O","Ṍ":"O","Ṓ":"O","Ȏ":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","ấ":"a","ắ":"a","ẳ":"a","ẵ":"a","ặ":"a","æ":"ae","ầ":"a","ằ":"a","ȃ":"a","ç":"c","ḉ":"c","è":"e","é":"e","ê":"e","ë":"e","ế":"e","ḗ":"e","ề":"e","ḕ":"e","ḝ":"e","ȇ":"e","ì":"i","í":"i","î":"i","ï":"i","ḯ":"i","ȋ":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ố":"o","ṍ":"o","ṓ":"o","ȏ":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Ĉ":"C","ĉ":"c","Ċ":"C","ċ":"c","Č":"C","č":"c","C̆":"C","c̆":"c","Ď":"D","ď":"d","Đ":"D","đ":"d","Ē":"E","ē":"e","Ĕ":"E","ĕ":"e","Ė":"E","ė":"e","Ę":"E","ę":"e","Ě":"E","ě":"e","Ĝ":"G","Ǵ":"G","ĝ":"g","ǵ":"g","Ğ":"G","ğ":"g","Ġ":"G","ġ":"g","Ģ":"G","ģ":"g","Ĥ":"H","ĥ":"h","Ħ":"H","ħ":"h","Ḫ":"H","ḫ":"h","Ĩ":"I","ĩ":"i","Ī":"I","ī":"i","Ĭ":"I","ĭ":"i","Į":"I","į":"i","İ":"I","ı":"i","Ĳ":"IJ","ĳ":"ij","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","Ḱ":"K","ḱ":"k","K̆":"K","k̆":"k","Ĺ":"L","ĺ":"l","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ŀ":"L","ŀ":"l","Ł":"l","ł":"l","Ḿ":"M","ḿ":"m","M̆":"M","m̆":"m","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","ŉ":"n","N̆":"N","n̆":"n","Ō":"O","ō":"o","Ŏ":"O","ŏ":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","P̆":"P","p̆":"p","Ŕ":"R","ŕ":"r","Ŗ":"R","ŗ":"r","Ř":"R","ř":"r","R̆":"R","r̆":"r","Ȓ":"R","ȓ":"r","Ś":"S","ś":"s","Ŝ":"S","ŝ":"s","Ş":"S","Ș":"S","ș":"s","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","ț":"t","Ț":"T","Ť":"T","ť":"t","Ŧ":"T","ŧ":"t","T̆":"T","t̆":"t","Ũ":"U","ũ":"u","Ū":"U","ū":"u","Ŭ":"U","ŭ":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ȗ":"U","ȗ":"u","V̆":"V","v̆":"v","Ŵ":"W","ŵ":"w","Ẃ":"W","ẃ":"w","X̆":"X","x̆":"x","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Y̆":"Y","y̆":"y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","ſ":"s","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","Ǎ":"A","ǎ":"a","Ǐ":"I","ǐ":"i","Ǒ":"O","ǒ":"o","Ǔ":"U","ǔ":"u","Ǖ":"U","ǖ":"u","Ǘ":"U","ǘ":"u","Ǚ":"U","ǚ":"u","Ǜ":"U","ǜ":"u","Ứ":"U","ứ":"u","Ṹ":"U","ṹ":"u","Ǻ":"A","ǻ":"a","Ǽ":"AE","ǽ":"ae","Ǿ":"O","ǿ":"o","Þ":"TH","þ":"th","Ṕ":"P","ṕ":"p","Ṥ":"S","ṥ":"s","X́":"X","x́":"x","Ѓ":"Г","ѓ":"г","Ќ":"К","ќ":"к","A̋":"A","a̋":"a","E̋":"E","e̋":"e","I̋":"I","i̋":"i","Ǹ":"N","ǹ":"n","Ồ":"O","ồ":"o","Ṑ":"O","ṑ":"o","Ừ":"U","ừ":"u","Ẁ":"W","ẁ":"w","Ỳ":"Y","ỳ":"y","Ȁ":"A","ȁ":"a","Ȅ":"E","ȅ":"e","Ȉ":"I","ȉ":"i","Ȍ":"O","ȍ":"o","Ȑ":"R","ȑ":"r","Ȕ":"U","ȕ":"u","B̌":"B","b̌":"b","Č̣":"C","č̣":"c","Ê̌":"E","ê̌":"e","F̌":"F","f̌":"f","Ǧ":"G","ǧ":"g","Ȟ":"H","ȟ":"h","J̌":"J","ǰ":"j","Ǩ":"K","ǩ":"k","M̌":"M","m̌":"m","P̌":"P","p̌":"p","Q̌":"Q","q̌":"q","Ř̩":"R","ř̩":"r","Ṧ":"S","ṧ":"s","V̌":"V","v̌":"v","W̌":"W","w̌":"w","X̌":"X","x̌":"x","Y̌":"Y","y̌":"y","A̧":"A","a̧":"a","B̧":"B","b̧":"b","Ḑ":"D","ḑ":"d","Ȩ":"E","ȩ":"e","Ɛ̧":"E","ɛ̧":"e","Ḩ":"H","ḩ":"h","I̧":"I","i̧":"i","Ɨ̧":"I","ɨ̧":"i","M̧":"M","m̧":"m","O̧":"O","o̧":"o","Q̧":"Q","q̧":"q","U̧":"U","u̧":"u","X̧":"X","x̧":"x","Z̧":"Z","z̧":"z"},ye=Object.keys(he).join("|"),be=new RegExp(ye,"g");var me=7,ve=6,we=5,xe=4,ke=3,$e=2,Se=1,Ce=0;function Ee(e,t,n){var r;if((n=n||{}).threshold=null!=(r=n.threshold)?r:Se,!n.accessors){const r=qe(e,t,n);return{rankedValue:e,rank:r,accessorIndex:-1,accessorThreshold:n.threshold,passed:r>=n.threshold}}const o=function(e,t){const n=[];for(let r=0,o=t.length;r<o;r++){const o=t[r],i=De(o),s=Fe(e,o);for(let e=0,t=s.length;e<t;e++)n.push({itemValue:s[e],attributes:i})}return n}(e,n.accessors),i={rankedValue:e,rank:Ce,accessorIndex:-1,accessorThreshold:n.threshold,passed:!1};for(let s=0;s<o.length;s++){const e=o[s];let r=qe(e.itemValue,t,n);const{minRanking:a,maxRanking:l,threshold:d=n.threshold}=e.attributes;r<a&&r>=Se?r=a:r>l&&(r=l),r=Math.min(r,l),r>=d&&r>i.rank&&(i.rank=r,i.passed=!0,i.accessorIndex=s,i.accessorThreshold=d,i.rankedValue=e.itemValue)}return i}function qe(e,t,n){return e=Me(e,n),(t=Me(t,n)).length>e.length?Ce:e===t?me:(e=e.toLowerCase())===(t=t.toLowerCase())?ve:e.startsWith(t)?we:e.includes(` ${t}`)?xe:e.includes(t)?ke:1===t.length?Ce:function(e){let t="";return e.split(" ").forEach(e=>{e.split("-").forEach(e=>{t+=e.substr(0,1)})}),t}(e).includes(t)?$e:function(e,t){let n=0,r=0;function o(e,t,r){for(let o=r,i=t.length;o<i;o++){if(t[o]===e)return n+=1,o+1}return-1}function i(e){const r=1/e,o=n/t.length;return Se+o*r}const s=o(t[0],e,0);if(s<0)return Ce;r=s;for(let a=1,l=t.length;a<l;a++){r=o(t[a],e,r);if(!(r>-1))return Ce}return i(r-s)}(e,t)}function Me(e,t){let{keepDiacritics:n}=t;return e=`${e}`,n||(e=e.replace(be,e=>he[e])),e}function Fe(e,t){let n=t;"object"==typeof t&&(n=t.accessor);const r=n(e);return null==r?[]:Array.isArray(r)?r:[String(r)]}var Le={maxRanking:1/0,minRanking:-1/0};function De(e){return"function"==typeof e?Le:{...Le,...e}}var Te={data:""},Ae=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Ie=/\/\*[^]*?\*\/|  +/g,Oe=/\n+/g,Pe=(e,t)=>{let n="",r="",o="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?n=i+" "+s+";":r+="f"==i[1]?Pe(s,i):i+"{"+Pe(s,"k"==i[1]?"":t)+"}":"object"==typeof s?r+=Pe(s,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=Pe.p?Pe.p(i,s):i+":"+s+";")}return n+(t&&o?t+"{"+o+"}":o)+r},ze={},Ke=e=>{if("object"==typeof e){let t="";for(let n in e)t+=n+Ke(e[n]);return t}return e};function Re(e){let t=this||{},n=e.call?e(t.p):e;return((e,t,n,r,o)=>{let i=Ke(e),s=ze[i]||(ze[i]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"go"+n})(i));if(!ze[s]){let t=i!==e?e:(e=>{let t,n,r=[{}];for(;t=Ae.exec(e.replace(Ie,""));)t[4]?r.shift():t[3]?(n=t[3].replace(Oe," ").trim(),r.unshift(r[0][n]=r[0][n]||{})):r[0][t[1]]=t[2].replace(Oe," ").trim();return r[0]})(e);ze[s]=Pe(o?{["@keyframes "+s]:t}:t,n?"":"."+s)}let a=n&&ze.g?ze.g:null;return n&&(ze.g=ze[s]),l=ze[s],d=t,c=r,(u=a)?d.data=d.data.replace(u,l):-1===d.data.indexOf(l)&&(d.data=c?l+d.data:d.data+l),s;var l,d,c,u})(n.unshift?n.raw?((e,t,n)=>e.reduce((e,r,o)=>{let i=t[o];if(i&&i.call){let e=i(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":Pe(e,""):!1===e?"":e}return e+r+(null==i?"":i)},""))(n,[].slice.call(arguments,1),t.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(t.p):n),{}):n,(r=t.target,"object"==typeof window?((r?r.querySelector("#_goober"):window._goober)||Object.assign((r||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:r||Te),t.g,t.o,t.k);var r}function Be(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(n=Be(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function He(){for(var e,t,n=0,r="",o=arguments.length;n<o;n++)(e=arguments[n])&&(t=Be(e))&&(r&&(r+=" "),r+=t);return r}function Ge(...e){return t=e,(...e)=>{for(const n of t)n&&n(...e)};var t}Re.bind({g:1}),Re.bind({k:1});var Ue=e=>e instanceof Element;function Ve(e,t){if(t(e))return e;if("function"==typeof e&&!e.length)return Ve(e(),t);if(Array.isArray(e)){const n=[];for(const r of e){const e=Ve(r,t);e&&(Array.isArray(e)?n.push.apply(n,e):n.push(e))}return n.length?n:null}return null}function je(e,t=Ue,n=Ue){const r=o(e),i=o(()=>Ve(r(),t));return i.toArray=()=>{const e=i();return Array.isArray(e)?e:e?[e]:[]},i}function Ne(e){requestAnimationFrame(()=>requestAnimationFrame(e))}function Qe(e,t,n,r){const{onBeforeEnter:o,onEnter:i,onAfterEnter:s}=t;function a(t){t&&t.target!==n||(n.removeEventListener("transitionend",a),n.removeEventListener("animationend",a),n.classList.remove(...e.enterActive),n.classList.remove(...e.enterTo),s?.(n))}o?.(n),n.classList.add(...e.enter),n.classList.add(...e.enterActive),queueMicrotask(()=>{if(!n.parentNode)return r?.();i?.(n,()=>a())}),Ne(()=>{n.classList.remove(...e.enter),n.classList.add(...e.enterTo),(!i||i.length<2)&&(n.addEventListener("transitionend",a),n.addEventListener("animationend",a))})}function We(e,t,n,r){const{onBeforeExit:o,onExit:i,onAfterExit:s}=t;if(!n.parentNode)return r?.();function a(t){t&&t.target!==n||(r?.(),n.removeEventListener("transitionend",a),n.removeEventListener("animationend",a),n.classList.remove(...e.exitActive),n.classList.remove(...e.exitTo),s?.(n))}o?.(n),n.classList.add(...e.exit),n.classList.add(...e.exitActive),i?.(n,()=>a()),Ne(()=>{n.classList.remove(...e.exit),n.classList.add(...e.exitTo),(!i||i.length<2)&&(n.addEventListener("transitionend",a),n.addEventListener("animationend",a))})}var _e=e=>{const n=function(e){return o(()=>{const t=e.name||"s";return{enterActive:(e.enterActiveClass||t+"-enter-active").split(" "),enter:(e.enterClass||t+"-enter").split(" "),enterTo:(e.enterToClass||t+"-enter-to").split(" "),exitActive:(e.exitActiveClass||t+"-exit-active").split(" "),exit:(e.exitClass||t+"-exit").split(" "),exitTo:(e.exitToClass||t+"-exit-to").split(" "),move:(e.moveClass||t+"-move").split(" ")}})}(e);return function(e,n){const r=T(e),{onChange:i}=n;let s=new Set(n.appear?void 0:r);const a=new WeakSet,[l,d]=t([],{equals:!1}),[c]=I(),u=e=>{d(t=>(t.push.apply(t,e),t));for(const t of e)a.delete(t)},g=(e,t,n)=>e.splice(n,0,t);return o(t=>{const n=l(),r=e();if(r[A],T(c))return c(),t;if(n.length){const e=t.filter(e=>!n.includes(e));return n.length=0,i({list:e,added:[],removed:[],unchanged:e,finishRemoved:u}),e}return T(()=>{const e=new Set(r),n=r.slice(),o=[],l=[],d=[];for(const t of r)(s.has(t)?d:o).push(t);let c=!o.length;for(let r=0;r<t.length;r++){const o=t[r];e.has(o)||(a.has(o)||(l.push(o),a.add(o)),g(n,o,r)),c&&o!==n[r]&&(c=!1)}return!l.length&&c?t:(i({list:n,added:o,removed:l,unchanged:d,finishRemoved:u}),s=e,n)})},n.appear?[]:r.slice())}(je(()=>e.children).toArray,{appear:e.appear,onChange({added:t,removed:r,finishRemoved:o,list:i}){const s=n();for(const n of t)Qe(s,e,n);const a=[];for(const e of i)e.isConnected&&(e instanceof HTMLElement||e instanceof SVGElement)&&a.push({el:e,rect:e.getBoundingClientRect()});queueMicrotask(()=>{const e=[];for(const{el:t,rect:n}of a)if(t.isConnected){const r=t.getBoundingClientRect(),o=n.left-r.left,i=n.top-r.top;(o||i)&&(t.style.transform=`translate(${o}px, ${i}px)`,t.style.transitionDuration="0s",e.push(t))}document.body.offsetHeight;for(const t of e){let e=function(n){(n.target===t||/transform$/.test(n.propertyName))&&(t.removeEventListener("transitionend",e),t.classList.remove(...s.move))};t.classList.add(...s.move),t.style.transform=t.style.transitionDuration="",t.addEventListener("transitionend",e)}});for(const n of r)We(s,e,n,()=>o([n]))}})},Xe=Symbol("fallback");function Ze(e){for(const t of e)t.dispose()}function Ye(e){const{by:n}=e;return o(function(e,n,r,o={}){const i=new Map;return y(()=>Ze(i.values())),()=>{const t=e()||[];return t[A],T(()=>{if(!t.length)return Ze(i.values()),i.clear(),o.fallback?[z(e=>(i.set(Xe,{dispose:e}),o.fallback()))]:[];const e=new Array(t.length),r=i.get(Xe);if(!i.size||r){r?.dispose(),i.delete(Xe);for(let r=0;r<t.length;r++){const o=t[r];s(e,o,r,n(o,r))}return e}const a=new Set(i.keys());for(let o=0;o<t.length;o++){const r=t[o],l=n(r,o);a.delete(l);const d=i.get(l);d?(e[o]=d.mapped,d.setIndex?.(o),d.setItem(()=>r)):s(e,r,o,l)}for(const t of a)i.get(t)?.dispose(),i.delete(t);return e})};function s(e,n,o,s){z(a=>{const[l,d]=t(n),c={setItem:d,dispose:a};if(r.length>1){const[e,n]=t(o);c.setIndex=n,c.mapped=r(l,e)}else c.mapped=r(l);i.set(s,c),e[o]=c.mapped})}}(()=>e.each,"function"==typeof n?n:e=>e[n],e.children,"fallback"in e?{fallback:()=>e.fallback}:void 0))}function Je(e,t,n,o){const i=()=>{Y(Z(e)).forEach(e=>{e&&Y(Z(t)).forEach(t=>function(e,t,n,r){return e.addEventListener(t,n,r),J(e.removeEventListener.bind(e,t,n,r))}(e,t,n,o))})};"function"==typeof e?r(i):u(i)}function et(e,t,n){const o=new WeakMap,{observe:i,unobserve:s}=function(e,t){const n=new ResizeObserver(e);return y(n.disconnect.bind(n)),{observe:e=>n.observe(e,t),unobserve:n.unobserve.bind(n)}}(e=>{for(const n of e){const{contentRect:e,target:r}=n,i=Math.round(e.width),s=Math.round(e.height),a=o.get(r);a&&a.width===i&&a.height===s||(t(e,r,n),o.set(r,{width:i,height:s}))}},n);r(t=>{const n=Y(Z(e)).filter(X);return function(e,t,n,r){const o=e.length,i=t.length;let s,a,l=0;if(i)if(o){for(;l<i&&t[l]===e[l];l++);for(s of(t=t.slice(l),e=e.slice(l),t))e.includes(s)||r(s);for(a of e)t.includes(a)||n(a)}else for(;l<i;l++)r(t[l]);else for(;l<o;l++)n(e[l])}(n,t,i,s),n},[])}var tt=/((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;function nt(e){const t={};let n;for(;n=tt.exec(e);)t[n[1]]=n[2];return t}function rt(e,t){if("string"==typeof e){if("string"==typeof t)return`${e};${t}`;e=nt(e)}else"string"==typeof t&&(t=nt(t));return{...e,...t}}function ot(e,t){const n=[...e],r=n.indexOf(t);return-1!==r&&n.splice(r,1),n}function it(e){return"number"==typeof e}function st(e){return"[object String]"===Object.prototype.toString.call(e)}function at(e){return t=>`${e()}-${t}`}function lt(e,t){return!!e&&(e===t||e.contains(t))}function dt(e,t=!1){const{activeElement:n}=ct(e);if(!n?.nodeName)return null;if(ut(n)&&n.contentDocument)return dt(n.contentDocument.body,t);if(t){const e=n.getAttribute("aria-activedescendant");if(e){const t=ct(n).getElementById(e);if(t)return t}}return n}function ct(e){return e?e.ownerDocument||e:document}function ut(e){return"IFRAME"===e.tagName}var gt=(e=>(e.Escape="Escape",e.Enter="Enter",e.Tab="Tab",e.Space=" ",e.ArrowDown="ArrowDown",e.ArrowLeft="ArrowLeft",e.ArrowRight="ArrowRight",e.ArrowUp="ArrowUp",e.End="End",e.Home="Home",e.PageDown="PageDown",e.PageUp="PageUp",e))(gt||{});function ft(e){return"undefined"!=typeof window&&null!=window.navigator&&e.test(window.navigator.userAgentData?.platform||window.navigator.platform)}function pt(){return ft(/^Mac/i)}function ht(){return ft(/^iPhone/i)||ft(/^iPad/i)||pt()&&navigator.maxTouchPoints>1}function yt(e,t){return t&&("function"==typeof t?t(e):t[0](t[1],e)),e?.defaultPrevented}function bt(e){return t=>{for(const n of e)yt(t,n)}}function mt(e){return pt()?e.metaKey&&!e.ctrlKey:e.ctrlKey&&!e.metaKey}function vt(e){if(e)if(function(){if(null==wt){wt=!1;try{document.createElement("div").focus({get preventScroll(){return wt=!0,!0}})}catch(e){}}return wt}())e.focus({preventScroll:!0});else{const t=function(e){let t=e.parentNode;const n=[],r=document.scrollingElement||document.documentElement;for(;t instanceof HTMLElement&&t!==r;)(t.offsetHeight<t.scrollHeight||t.offsetWidth<t.scrollWidth)&&n.push({element:t,scrollTop:t.scrollTop,scrollLeft:t.scrollLeft}),t=t.parentNode;r instanceof HTMLElement&&n.push({element:r,scrollTop:r.scrollTop,scrollLeft:r.scrollLeft});return n}(e);e.focus(),function(e){for(const{element:t,scrollTop:n,scrollLeft:r}of e)t.scrollTop=n,t.scrollLeft=r}(t)}}var wt=null;var xt=["input:not([type='hidden']):not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","a[href]","area[href]","[tabindex]","iframe","object","embed","audio[controls]","video[controls]","[contenteditable]:not([contenteditable='false'])"],kt=[...xt,'[tabindex]:not([tabindex="-1"]):not([disabled])'],$t=xt.join(":not([hidden]),")+",[tabindex]:not([disabled]):not([hidden])",St=kt.join(':not([hidden]):not([tabindex="-1"]),');function Ct(e,t){const n=Array.from(e.querySelectorAll($t)).filter(Et);return t&&Et(e)&&n.unshift(e),n.forEach((e,t)=>{if(ut(e)&&e.contentDocument){const r=Ct(e.contentDocument.body,!1);n.splice(t,1,...r)}}),n}function Et(e){return qt(e)&&!function(e){const t=parseInt(e.getAttribute("tabindex")||"0",10);return t<0}(e)}function qt(e){return e.matches($t)&&Mt(e)}function Mt(e,t){return"#comment"!==e.nodeName&&function(e){if(!(e instanceof HTMLElement||e instanceof SVGElement))return!1;const{display:t,visibility:n}=e.style;let r="none"!==t&&"hidden"!==n&&"collapse"!==n;if(r){if(!e.ownerDocument.defaultView)return r;const{getComputedStyle:t}=e.ownerDocument.defaultView,{display:n,visibility:o}=t(e);r="none"!==n&&"hidden"!==o&&"collapse"!==o}return r}(e)&&function(e,t){return!e.hasAttribute("hidden")&&("DETAILS"!==e.nodeName||!t||"SUMMARY"===t.nodeName||e.hasAttribute("open"))}(e,t)&&(!e.parentElement||Mt(e.parentElement,e))}function Ft(e){for(;e&&!Lt(e);)e=e.parentElement;return e||document.scrollingElement||document.documentElement}function Lt(e){const t=window.getComputedStyle(e);return/(auto|scroll)/.test(t.overflow+t.overflowX+t.overflowY)}function Dt(){}function Tt(e,t){return P(e,t)}var At=new Map,It=new Set;function Ot(){if("undefined"==typeof window)return;const e=t=>{if(!t.target)return;const n=At.get(t.target);if(n&&(n.delete(t.propertyName),0===n.size&&(t.target.removeEventListener("transitioncancel",e),At.delete(t.target)),0===At.size)){for(const e of It)e();It.clear()}};document.body.addEventListener("transitionrun",t=>{if(!t.target)return;let n=At.get(t.target);n||(n=new Set,At.set(t.target,n),t.target.addEventListener("transitioncancel",e)),n.add(t.propertyName)}),document.body.addEventListener("transitionend",e)}function Pt(e,t){const n=zt(e,t,"left"),r=zt(e,t,"top"),o=t.offsetWidth,i=t.offsetHeight;let s=e.scrollLeft,a=e.scrollTop;const l=s+e.offsetWidth,d=a+e.offsetHeight;n<=s?s=n:n+o>l&&(s+=n+o-l),r<=a?a=r:r+i>d&&(a+=r+i-d),e.scrollLeft=s,e.scrollTop=a}function zt(e,t,n){const r="left"===n?"offsetLeft":"offsetTop";let o=0;for(;t.offsetParent&&(o+=t[r],t.offsetParent!==e);){if(t.offsetParent.contains(e)){o-=e[r];break}t=t.offsetParent}return o}"undefined"!=typeof document&&("loading"!==document.readyState?Ot():document.addEventListener("DOMContentLoaded",Ot));var Kt={border:"0",clip:"rect(0 0 0 0)","clip-path":"inset(50%)",height:"1px",margin:"0 -1px -1px 0",overflow:"hidden",padding:"0",position:"absolute",width:"1px","white-space":"nowrap"};function Rt(e){return t=>(e(t),()=>e(void 0))}function Bt(e,n){const[o,i]=t(Ht(n?.()));return r(()=>{i(e()?.tagName.toLowerCase()||Ht(n?.()))}),o}function Ht(e){return st(e)?e:void 0}function Gt(e){const[t,n]=N(e,["as"]);if(!t.as)throw new Error("[kobalte]: Polymorphic is missing the required `as` prop.");return i(Q,P(n,{get component(){return t.as}}))}var Ut=["id","name","validationState","required","disabled","readOnly"];var Vt=e();function jt(){const e=h(Vt);if(void 0===e)throw new Error("[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component");return e}function Nt(e){const t=jt(),n=Tt({id:t.generateId("description")},e);return r(()=>y(t.registerDescription(n.id))),i(Gt,P({as:"div"},()=>t.dataset(),n))}function Qt(e){const t=jt(),n=Tt({id:t.generateId("error-message")},e),[o,s]=N(n,["forceMount"]),a=()=>"invalid"===t.validationState();return r(()=>{a()&&y(t.registerErrorMessage(s.id))}),i(l,{get when(){return o.forceMount||a()},get children(){return i(Gt,P({as:"div"},()=>t.dataset(),s))}})}function Wt(e){let t;const n=jt(),o=Tt({id:n.generateId("label")},e),[s,l]=N(o,["ref"]),d=Bt(()=>t,()=>"label");return r(()=>y(n.registerLabel(l.id))),i(Gt,P({as:"label",ref(e){const n=Ge(e=>t=e,s.ref);"function"==typeof n&&n(e)},get for(){return a(()=>"label"===d())()?n.fieldId():void 0}},()=>n.dataset(),l))}function _t(e,t){r(v(e,e=>{if(null==e)return;const n=function(e){return function(e){return e.matches("textarea, input, select, button")}(e)?e.form:e.closest("form")}(e);null!=n&&(n.addEventListener("reset",t,{passive:!0}),y(()=>{n.removeEventListener("reset",t)}))}))}function Xt(e){const[n,r]=t(e.defaultValue?.()),i=o(()=>void 0!==e.value?.()),s=o(()=>i()?e.value?.():n());return[s,t=>{T(()=>{const n=function(e,...t){return"function"==typeof e?e(...t):e}(t,s());return Object.is(n,s())||(i()||r(n),e.onChange?.(n)),n})}]}function Zt(e){const[t,n]=Xt(e);return[()=>t()??!1,n]}var Yt=Object.defineProperty,Jt=(e,t)=>{for(var n in t)Yt(e,n,{get:t[n],enumerable:!0})},en=e();function tn(){return h(en)}function nn(e,t){return Boolean(t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_PRECEDING)}function rn(e,t){const n=function(e){const t=e.map((e,t)=>[t,e]);let n=!1;return t.sort(([e,t],[r,o])=>{const i=t.ref(),s=o.ref();return i===s?0:i&&s?nn(i,s)?(e>r&&(n=!0),-1):(e<r&&(n=!0),1):0}),n?t.map(([e,t])=>t):e}(e);e!==n&&t(n)}function on(e,t){if("function"!=typeof IntersectionObserver)return void function(e,t){r(()=>{const n=setTimeout(()=>{rn(e(),t)});y(()=>clearTimeout(n))})}(e,t);let n=[];r(()=>{const r=function(e){const t=e[0],n=e[e.length-1]?.ref();let r=t?.ref()?.parentElement;for(;r;){if(n&&r.contains(n))return r;r=r.parentElement}return ct(r).body}(e()),o=new IntersectionObserver(()=>{const r=!!n.length;n=e(),r&&rn(e(),t)},{root:r});for(const t of e()){const e=t.ref();e&&o.observe(e)}y(()=>o.disconnect())})}function sn(e={}){const[t,n]=function(e){const[t,n]=Xt(e);return[()=>t()??[],n]}({value:()=>Z(e.items),onChange:t=>e.onItemsChange?.(t)});on(t,n);const r=e=>(n(t=>{const n=function(e,t){const n=t.ref();if(!n)return-1;let r=e.length;if(!r)return-1;for(;r--;){const t=e[r]?.ref();if(t&&nn(t,n))return r+1}return 0}(t,e);return function(e,t,n=-1){return n in e?[...e.slice(0,n),t,...e.slice(n)]:[...e,t]}(t,e,n)}),()=>{n(t=>{const n=t.filter(t=>t.ref()!==e.ref());return t.length===n.length?t:n})});return{DomCollectionProvider:e=>i(en.Provider,{value:{registerItem:r},get children(){return e.children}})}}function an(e){const t=function(){const e=tn();if(void 0===e)throw new Error("[kobalte]: `useDomCollectionContext` must be used within a `DomCollectionProvider` component");return e}(),n=Tt({shouldRegisterItem:!0},e);r(()=>{if(!n.shouldRegisterItem)return;const e=t.registerItem(n.getItem());y(e)})}function ln(e){let t=e.startIndex??0;const n=e.startLevel??0,r=[],o=t=>{if(null==t)return"";const n=e.getKey??"key",r=st(n)?t[n]:n(t);return null!=r?String(r):""},i=t=>{if(null==t)return"";const n=e.getTextValue??"textValue",r=st(n)?t[n]:n(t);return null!=r?String(r):""},s=t=>{if(null==t)return!1;const n=e.getDisabled??"disabled";return(st(n)?t[n]:n(t))??!1},a=t=>{if(null!=t)return st(e.getSectionChildren)?t[e.getSectionChildren]:e.getSectionChildren?.(t)};for(const l of e.dataSource)if(st(l)||it(l))r.push({type:"item",rawValue:l,key:String(l),textValue:String(l),disabled:s(l),level:n,index:t}),t++;else if(null!=a(l)){r.push({type:"section",rawValue:l,key:"",textValue:"",disabled:!1,level:n,index:t}),t++;const o=a(l)??[];if(o.length>0){const i=ln({dataSource:o,getKey:e.getKey,getTextValue:e.getTextValue,getDisabled:e.getDisabled,getSectionChildren:e.getSectionChildren,startIndex:t,startLevel:n+1});r.push(...i),t+=i.length}}else r.push({type:"item",rawValue:l,key:o(l),textValue:i(l),disabled:s(l),level:n,index:t}),t++;return r}function dn(e,t=[]){return o(()=>{const n=ln({dataSource:Z(e.dataSource),getKey:Z(e.getKey),getTextValue:Z(e.getTextValue),getDisabled:Z(e.getDisabled),getSectionChildren:Z(e.getSectionChildren)});for(let e=0;e<t.length;e++)t[e]();return e.factory(n)})}var cn=new Set(["Avst","Arab","Armi","Syrc","Samr","Mand","Thaa","Mend","Nkoo","Adlm","Rohg","Hebr"]),un=new Set(["ae","ar","arc","bcc","bqi","ckb","dv","fa","glk","he","ku","mzn","nqo","pnb","ps","sd","ug","ur","yi"]);function gn(e){return function(e){if(Intl.Locale){const t=new Intl.Locale(e).maximize().script??"";return cn.has(t)}const t=e.split("-")[0];return un.has(t)}(e)?"rtl":"ltr"}function fn(){let e="undefined"!=typeof navigator&&(navigator.language||navigator.userLanguage)||"en-US";return{locale:e,direction:gn(e)}}var pn=fn(),hn=new Set;function yn(){pn=fn();for(const e of hn)e(pn)}var bn=e();function mn(){const e=function(){const[e,r]=t(pn),i=o(()=>e());return n(()=>{0===hn.size&&window.addEventListener("languagechange",yn),hn.add(r),y(()=>{hn.delete(r),0===hn.size&&window.removeEventListener("languagechange",yn)})}),{locale:()=>i().locale,direction:()=>i().direction}}();return h(bn)||e}var vn=new Map;var wn=class e extends Set{anchorKey;currentKey;constructor(t,n,r){super(t),t instanceof e?(this.anchorKey=n||t.anchorKey,this.currentKey=r||t.currentKey):(this.anchorKey=n,this.currentKey=r)}};function xn(e){return pt()||ht()?e.altKey:e.ctrlKey}function kn(e){return pt()?e.metaKey:e.ctrlKey}function $n(e){return new wn(e)}function Sn(e){const n=Tt({selectionMode:"none",selectionBehavior:"toggle"},e),[i,s]=t(!1),[a,l]=t(),d=o(()=>{const e=Z(n.selectedKeys);return null!=e?$n(e):e}),c=o(()=>{const e=Z(n.defaultSelectedKeys);return null!=e?$n(e):new wn}),[u,g]=function(e){const[t,n]=Xt(e);return[()=>t()??new wn,n]}({value:d,defaultValue:c,onChange:e=>n.onSelectionChange?.(e)}),[f,p]=t(Z(n.selectionBehavior));return r(()=>{const e=u();"replace"===Z(n.selectionBehavior)&&"toggle"===f()&&"object"==typeof e&&0===e.size&&p("replace")}),r(()=>{p(Z(n.selectionBehavior)??"toggle")}),{selectionMode:()=>Z(n.selectionMode),disallowEmptySelection:()=>Z(n.disallowEmptySelection)??!1,selectionBehavior:f,setSelectionBehavior:p,isFocused:i,setFocused:s,focusedKey:a,setFocusedKey:l,selectedKeys:u,setSelectedKeys:e=>{!Z(n.allowDuplicateSelectionEvents)&&function(e,t){if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0}(e,u())||g(e)}}}function Cn(e,i,s){const a=P({selectOnFocus:()=>"replace"===Z(e.selectionManager).selectionBehavior()},e),l=()=>i(),{direction:d}=mn();let c={top:0,left:0};Je(()=>Z(a.isVirtualized)?void 0:l(),"scroll",()=>{const e=l();e&&(c={top:e.scrollTop,left:e.scrollLeft})});const{typeSelectHandlers:u}=function(e){const[n,r]=t(""),[o,i]=t(-1);return{typeSelectHandlers:{onKeyDown:t=>{if(Z(e.isDisabled))return;const s=Z(e.keyboardDelegate),a=Z(e.selectionManager);if(!s.getKeyForSearch)return;const l=function(e){return 1!==e.length&&/^[A-Z]/i.test(e)?"":e}(t.key);if(!l||t.ctrlKey||t.metaKey)return;" "===l&&n().trim().length>0&&(t.preventDefault(),t.stopPropagation());let d=r(e=>e+l),c=s.getKeyForSearch(d,a.focusedKey())??s.getKeyForSearch(d);null==c&&function(e){return e.split("").every(t=>t===e[0])}(d)&&(d=d[0],c=s.getKeyForSearch(d,a.focusedKey())??s.getKeyForSearch(d)),null!=c&&(a.setFocusedKey(c),e.onTypeSelect?.(c)),clearTimeout(o()),i(window.setTimeout(()=>r(""),500))}}}}({isDisabled:()=>Z(a.disallowTypeAhead),keyboardDelegate:()=>Z(a.keyboardDelegate),selectionManager:()=>Z(a.selectionManager)}),g=()=>Z(a.orientation)??"vertical",f=()=>{const e=Z(a.autoFocus);if(!e)return;const t=Z(a.selectionManager),n=Z(a.keyboardDelegate);let r;"first"===e&&(r=n.getFirstKey?.()),"last"===e&&(r=n.getLastKey?.());const o=t.selectedKeys();o.size&&(r=o.values().next().value),t.setFocused(!0),t.setFocusedKey(r);const s=i();s&&null==r&&!Z(a.shouldUseVirtualFocus)&&vt(s)};n(()=>{a.deferAutoFocus?setTimeout(f,0):f()}),r(v([l,()=>Z(a.isVirtualized),()=>Z(a.selectionManager).focusedKey()],e=>{const[t,n,r]=e;if(n)r&&a.scrollToKey?.(r);else if(r&&t){const e=t.querySelector(`[data-key="${r}"]`);e&&Pt(t,e)}}));return{tabIndex:o(()=>{if(!Z(a.shouldUseVirtualFocus))return null==Z(a.selectionManager).focusedKey()?0:-1}),onKeyDown:e=>{yt(e,u.onKeyDown),e.altKey&&"Tab"===e.key&&e.preventDefault();const t=i();if(!t?.contains(e.target))return;const n=Z(a.selectionManager),r=Z(a.selectOnFocus),o=t=>{null!=t&&(n.setFocusedKey(t),e.shiftKey&&"multiple"===n.selectionMode()?n.extendSelection(t):r&&!xn(e)&&n.replaceSelection(t))},s=Z(a.keyboardDelegate),l=Z(a.shouldFocusWrap),c=n.focusedKey();switch(e.key){case"vertical"===g()?"ArrowDown":"ArrowRight":if(s.getKeyBelow){let t;e.preventDefault(),t=null!=c?s.getKeyBelow(c):s.getFirstKey?.(),null==t&&l&&(t=s.getFirstKey?.(c)),o(t)}break;case"vertical"===g()?"ArrowUp":"ArrowLeft":if(s.getKeyAbove){let t;e.preventDefault(),t=null!=c?s.getKeyAbove(c):s.getLastKey?.(),null==t&&l&&(t=s.getLastKey?.(c)),o(t)}break;case"vertical"===g()?"ArrowLeft":"ArrowUp":if(s.getKeyLeftOf){e.preventDefault();const t="rtl"===d();let n;n=null!=c?s.getKeyLeftOf(c):t?s.getFirstKey?.():s.getLastKey?.(),o(n)}break;case"vertical"===g()?"ArrowRight":"ArrowDown":if(s.getKeyRightOf){e.preventDefault();const t="rtl"===d();let n;n=null!=c?s.getKeyRightOf(c):t?s.getLastKey?.():s.getFirstKey?.(),o(n)}break;case"Home":if(s.getFirstKey){e.preventDefault();const t=s.getFirstKey(c,kn(e));null!=t&&(n.setFocusedKey(t),kn(e)&&e.shiftKey&&"multiple"===n.selectionMode()?n.extendSelection(t):r&&n.replaceSelection(t))}break;case"End":if(s.getLastKey){e.preventDefault();const t=s.getLastKey(c,kn(e));null!=t&&(n.setFocusedKey(t),kn(e)&&e.shiftKey&&"multiple"===n.selectionMode()?n.extendSelection(t):r&&n.replaceSelection(t))}break;case"PageDown":if(s.getKeyPageBelow&&null!=c){e.preventDefault();o(s.getKeyPageBelow(c))}break;case"PageUp":if(s.getKeyPageAbove&&null!=c){e.preventDefault();o(s.getKeyPageAbove(c))}break;case"a":kn(e)&&"multiple"===n.selectionMode()&&!0!==Z(a.disallowSelectAll)&&(e.preventDefault(),n.selectAll());break;case"Escape":e.defaultPrevented||(e.preventDefault(),Z(a.disallowEmptySelection)||n.clearSelection());break;case"Tab":if(!Z(a.allowsTabNavigation)){if(e.shiftKey)t.focus();else{const e=function(e,t){const n=t?.tabbable?St:$t,r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:e=>t?.from?.contains(e)?NodeFilter.FILTER_REJECT:e.matches(n)&&Mt(e)&&(!t?.accept||t.accept(e))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP});return t?.from&&(r.currentNode=t.from),r}(t,{tabbable:!0});let n,r;do{r=e.lastChild(),r&&(n=r)}while(r);n&&!n.contains(document.activeElement)&&vt(n)}break}}},onMouseDown:e=>{l()===e.target&&e.preventDefault()},onFocusIn:e=>{const t=Z(a.selectionManager),n=Z(a.keyboardDelegate),r=Z(a.selectOnFocus);if(t.isFocused())e.currentTarget.contains(e.target)||t.setFocused(!1);else if(e.currentTarget.contains(e.target))if(t.setFocused(!0),null==t.focusedKey()){const o=e=>{null!=e&&(t.setFocusedKey(e),r&&t.replaceSelection(e))},i=e.relatedTarget;i&&e.currentTarget.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING?o(t.lastSelectedKey()??n.getLastKey?.()):o(t.firstSelectedKey()??n.getFirstKey?.())}else if(!Z(a.isVirtualized)){const e=l();if(e){e.scrollTop=c.top,e.scrollLeft=c.left;const n=e.querySelector(`[data-key="${t.focusedKey()}"]`);n&&(vt(n),Pt(e,n))}}},onFocusOut:e=>{const t=Z(a.selectionManager);e.currentTarget.contains(e.relatedTarget)||t.setFocused(!1)}}}function En(e,t){const n=()=>Z(e.selectionManager),i=()=>Z(e.key),s=()=>Z(e.shouldUseVirtualFocus),a=e=>{"none"!==n().selectionMode()&&("single"===n().selectionMode()?n().isSelected(i())&&!n().disallowEmptySelection()?n().toggleSelection(i()):n().replaceSelection(i()):e?.shiftKey?n().extendSelection(i()):"toggle"===n().selectionBehavior()||kn(e)||"pointerType"in e&&"touch"===e.pointerType?n().toggleSelection(i()):n().replaceSelection(i()))},l=()=>Z(e.disabled)||n().isDisabled(i()),d=()=>!l()&&n().canSelectItem(i());let c=null;const u=o(()=>{if(!s()&&!l())return i()===n().focusedKey()?0:-1}),g=o(()=>Z(e.virtualized)?void 0:i());return r(v([t,i,s,()=>n().focusedKey(),()=>n().isFocused()],([t,n,r,o,i])=>{t&&n===o&&i&&!r&&document.activeElement!==t&&(e.focus?e.focus():vt(t))})),{isSelected:()=>n().isSelected(i()),isDisabled:l,allowsSelection:d,tabIndex:u,dataKey:g,onPointerDown:t=>{d()&&(c=t.pointerType,"mouse"!==t.pointerType||0!==t.button||Z(e.shouldSelectOnPressUp)||a(t))},onPointerUp:t=>{d()&&"mouse"===t.pointerType&&0===t.button&&Z(e.shouldSelectOnPressUp)&&Z(e.allowsDifferentPressOrigin)&&a(t)},onClick:t=>{d()&&(Z(e.shouldSelectOnPressUp)&&!Z(e.allowsDifferentPressOrigin)||"mouse"!==c)&&a(t)},onKeyDown:e=>{d()&&["Enter"," "].includes(e.key)&&(xn(e)?n().toggleSelection(i()):a(e))},onMouseDown:e=>{l()&&e.preventDefault()},onFocus:e=>{const r=t();s()||l()||!r||e.target===r&&n().setFocusedKey(i())}}}var qn=class{collection;state;constructor(e,t){this.collection=e,this.state=t}selectionMode(){return this.state.selectionMode()}disallowEmptySelection(){return this.state.disallowEmptySelection()}selectionBehavior(){return this.state.selectionBehavior()}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}isFocused(){return this.state.isFocused()}setFocused(e){this.state.setFocused(e)}focusedKey(){return this.state.focusedKey()}setFocusedKey(e){(null==e||this.collection().getItem(e))&&this.state.setFocusedKey(e)}selectedKeys(){return this.state.selectedKeys()}isSelected(e){if("none"===this.state.selectionMode())return!1;const t=this.getKey(e);return null!=t&&this.state.selectedKeys().has(t)}isEmpty(){return 0===this.state.selectedKeys().size}isSelectAll(){if(this.isEmpty())return!1;const e=this.state.selectedKeys();return this.getAllSelectableKeys().every(t=>e.has(t))}firstSelectedKey(){let e;for(const t of this.state.selectedKeys()){const n=this.collection().getItem(t),r=null!=n?.index&&null!=e?.index&&n.index<e.index;e&&!r||(e=n)}return e?.key}lastSelectedKey(){let e;for(const t of this.state.selectedKeys()){const n=this.collection().getItem(t),r=null!=n?.index&&null!=e?.index&&n.index>e.index;e&&!r||(e=n)}return e?.key}extendSelection(e){if("none"===this.selectionMode())return;if("single"===this.selectionMode())return void this.replaceSelection(e);const t=this.getKey(e);if(null==t)return;const n=this.state.selectedKeys(),r=n.anchorKey||t,o=new wn(n,r,t);for(const i of this.getKeyRange(r,n.currentKey||t))o.delete(i);for(const i of this.getKeyRange(t,r))this.canSelectItem(i)&&o.add(i);this.state.setSelectedKeys(o)}getKeyRange(e,t){const n=this.collection().getItem(e),r=this.collection().getItem(t);return n&&r?null!=n.index&&null!=r.index&&n.index<=r.index?this.getKeyRangeInternal(e,t):this.getKeyRangeInternal(t,e):[]}getKeyRangeInternal(e,t){const n=[];let r=e;for(;null!=r;){const e=this.collection().getItem(r);if(e&&"item"===e.type&&n.push(r),r===t)return n;r=this.collection().getKeyAfter(r)}return[]}getKey(e){const t=this.collection().getItem(e);return t?t&&"item"===t.type?t.key:null:e}toggleSelection(e){if("none"===this.selectionMode())return;if("single"===this.selectionMode()&&!this.isSelected(e))return void this.replaceSelection(e);const t=this.getKey(e);if(null==t)return;const n=new wn(this.state.selectedKeys());n.has(t)?n.delete(t):this.canSelectItem(t)&&(n.add(t),n.anchorKey=t,n.currentKey=t),this.disallowEmptySelection()&&0===n.size||this.state.setSelectedKeys(n)}replaceSelection(e){if("none"===this.selectionMode())return;const t=this.getKey(e);if(null==t)return;const n=this.canSelectItem(t)?new wn([t],t,t):new wn;this.state.setSelectedKeys(n)}setSelectedKeys(e){if("none"===this.selectionMode())return;const t=new wn;for(const n of e){const e=this.getKey(n);if(null!=e&&(t.add(e),"single"===this.selectionMode()))break}this.state.setSelectedKeys(t)}selectAll(){"multiple"===this.selectionMode()&&this.state.setSelectedKeys(new Set(this.getAllSelectableKeys()))}clearSelection(){const e=this.state.selectedKeys();!this.disallowEmptySelection()&&e.size>0&&this.state.setSelectedKeys(new wn)}toggleSelectAll(){this.isSelectAll()?this.clearSelection():this.selectAll()}select(e,t){"none"!==this.selectionMode()&&("single"===this.selectionMode()?this.isSelected(e)&&!this.disallowEmptySelection()?this.toggleSelection(e):this.replaceSelection(e):"toggle"===this.selectionBehavior()||t&&"touch"===t.pointerType?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys())return!0;const t=this.selectedKeys();if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;for(const n of t)if(!e.has(n))return!1;return!0}canSelectItem(e){if("none"===this.state.selectionMode())return!1;const t=this.collection().getItem(e);return null!=t&&!t.disabled}isDisabled(e){const t=this.collection().getItem(e);return!t||t.disabled}getAllSelectableKeys(){const e=[];return(t=>{for(;null!=t;){if(this.canSelectItem(t)){const n=this.collection().getItem(t);if(!n)continue;"item"===n.type&&e.push(t)}t=this.collection().getKeyAfter(t)}})(this.collection().getFirstKey()),e}},Mn=class{keyMap=new Map;iterable;firstKey;lastKey;constructor(e){this.iterable=e;for(const r of e)this.keyMap.set(r.key,r);if(0===this.keyMap.size)return;let t,n=0;for(const[r,o]of this.keyMap)t?(t.nextKey=r,o.prevKey=t.key):(this.firstKey=r,o.prevKey=void 0),"item"===o.type&&(o.index=n++),t=o,t.nextKey=void 0;this.lastKey=t.key}*[Symbol.iterator](){yield*this.iterable}getSize(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){return this.keyMap.get(e)?.prevKey}getKeyAfter(e){return this.keyMap.get(e)?.nextKey}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(e){return this.keyMap.get(e)}at(e){const t=[...this.getKeys()];return this.getItem(t[e])}};var Fn,Ln=e=>"function"==typeof e?e():e,Dn=e=>{const n=o(()=>{const t=Ln(e.element);if(t)return getComputedStyle(t)}),i=()=>n()?.animationName??"none",[s,a]=t(Ln(e.show)?"present":"hidden");let l="none";return r(t=>{const r=Ln(e.show);return T(()=>{if(t===r)return r;const e=l,o=i();if(r)a("present");else if("none"===o||"none"===n()?.display)a("hidden");else{a(!0===t&&e!==o?"hiding":"hidden")}}),r}),r(()=>{const t=Ln(e.element);if(!t)return;const n=e=>{e.target===t&&(l=i())},r=e=>{const n=i().includes(e.animationName);e.target===t&&n&&"hiding"===s()&&a("hidden")};t.addEventListener("animationstart",n),t.addEventListener("animationcancel",r),t.addEventListener("animationend",r),y(()=>{t.removeEventListener("animationstart",n),t.removeEventListener("animationcancel",r),t.removeEventListener("animationend",r)})}),{present:()=>"present"===s()||"hiding"===s(),state:s}},Tn="data-kb-top-layer",An=!1,In=[];function On(e){return In.findIndex(t=>t.node===e)}function Pn(){return In.filter(e=>e.isPointerBlocking)}function zn(){return Pn().length>0}function Kn(e){const t=On([...Pn()].slice(-1)[0]?.node);return On(e)<t}var Rn={layers:In,isTopMostLayer:function(e){return In[In.length-1].node===e},hasPointerBlockingLayer:zn,isBelowPointerBlockingLayer:Kn,addLayer:function(e){In.push(e)},removeLayer:function(e){const t=On(e);t<0||In.splice(t,1)},indexOf:On,find:function(e){return In[On(e)]},assignPointerEventToLayers:function(){for(const{node:e}of In)e.style.pointerEvents=Kn(e)?"none":"auto"},disableBodyPointerEvents:function(e){if(zn()&&!An){const t=ct(e);Fn=document.body.style.pointerEvents,t.body.style.pointerEvents="none",An=!0}},restoreBodyPointerEvents:function(e){if(zn())return;const t=ct(e);t.body.style.pointerEvents=Fn,0===t.body.style.length&&t.body.removeAttribute("style"),An=!1}};Jt({},{Button:()=>Gn,Root:()=>Hn});var Bn=["button","color","file","image","reset","submit"];function Hn(e){let t;const n=Tt({type:"button"},e),[r,s]=N(n,["ref","type","disabled"]),a=Bt(()=>t,()=>"button"),l=o(()=>{const e=a();return null!=e&&function(e){const t=e.tagName.toLowerCase();return"button"===t||!("input"!==t||!e.type)&&-1!==Bn.indexOf(e.type)}({tagName:e,type:r.type})}),d=o(()=>"input"===a()),c=o(()=>"a"===a()&&null!=t?.getAttribute("href"));return i(Gt,P({as:"button",ref(e){const n=Ge(e=>t=e,r.ref);"function"==typeof n&&n(e)},get type(){return l()||d()?r.type:void 0},get role(){return l()||c()?void 0:"button"},get tabIndex(){return l()||c()||r.disabled?void 0:0},get disabled(){return l()||d()?r.disabled:void 0},get"aria-disabled"(){return!(l()||d()||!r.disabled)||void 0},get"data-disabled"(){return r.disabled?"":void 0}},s))}var Gn=Hn,Un=["top","right","bottom","left"],Vn=Math.min,jn=Math.max,Nn=Math.round,Qn=Math.floor,Wn=e=>({x:e,y:e}),_n={left:"right",right:"left",bottom:"top",top:"bottom"},Xn={start:"end",end:"start"};function Zn(e,t,n){return jn(e,Vn(t,n))}function Yn(e,t){return"function"==typeof e?e(t):e}function Jn(e){return e.split("-")[0]}function er(e){return e.split("-")[1]}function tr(e){return"x"===e?"y":"x"}function nr(e){return"y"===e?"height":"width"}function rr(e){return["top","bottom"].includes(Jn(e))?"y":"x"}function or(e){return tr(rr(e))}function ir(e){return e.replace(/start|end/g,e=>Xn[e])}function sr(e){return e.replace(/left|right|bottom|top/g,e=>_n[e])}function ar(e){return"number"!=typeof e?function(e){return{top:0,right:0,bottom:0,left:0,...e}}(e):{top:e,right:e,bottom:e,left:e}}function lr(e){const{x:t,y:n,width:r,height:o}=e;return{width:r,height:o,top:n,left:t,right:t+r,bottom:n+o,x:t,y:n}}function dr(e,t,n){let{reference:r,floating:o}=e;const i=rr(t),s=or(t),a=nr(s),l=Jn(t),d="y"===i,c=r.x+r.width/2-o.width/2,u=r.y+r.height/2-o.height/2,g=r[a]/2-o[a]/2;let f;switch(l){case"top":f={x:c,y:r.y-o.height};break;case"bottom":f={x:c,y:r.y+r.height};break;case"right":f={x:r.x+r.width,y:u};break;case"left":f={x:r.x-o.width,y:u};break;default:f={x:r.x,y:r.y}}switch(er(t)){case"start":f[s]-=g*(n&&d?-1:1);break;case"end":f[s]+=g*(n&&d?-1:1)}return f}async function cr(e,t){var n;void 0===t&&(t={});const{x:r,y:o,platform:i,rects:s,elements:a,strategy:l}=e,{boundary:d="clippingAncestors",rootBoundary:c="viewport",elementContext:u="floating",altBoundary:g=!1,padding:f=0}=Yn(t,e),p=ar(f),h=a[g?"floating"===u?"reference":"floating":u],y=lr(await i.getClippingRect({element:null==(n=await(null==i.isElement?void 0:i.isElement(h)))||n?h:h.contextElement||await(null==i.getDocumentElement?void 0:i.getDocumentElement(a.floating)),boundary:d,rootBoundary:c,strategy:l})),b="floating"===u?{x:r,y:o,width:s.floating.width,height:s.floating.height}:s.reference,m=await(null==i.getOffsetParent?void 0:i.getOffsetParent(a.floating)),v=await(null==i.isElement?void 0:i.isElement(m))&&await(null==i.getScale?void 0:i.getScale(m))||{x:1,y:1},w=lr(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:b,offsetParent:m,strategy:l}):b);return{top:(y.top-w.top+p.top)/v.y,bottom:(w.bottom-y.bottom+p.bottom)/v.y,left:(y.left-w.left+p.left)/v.x,right:(w.right-y.right+p.right)/v.x}}function ur(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function gr(e){return Un.some(t=>e[t]>=0)}function fr(e){return yr(e)?(e.nodeName||"").toLowerCase():"#document"}function pr(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function hr(e){var t;return null==(t=(yr(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function yr(e){return e instanceof Node||e instanceof pr(e).Node}function br(e){return e instanceof Element||e instanceof pr(e).Element}function mr(e){return e instanceof HTMLElement||e instanceof pr(e).HTMLElement}function vr(e){return"undefined"!=typeof ShadowRoot&&(e instanceof ShadowRoot||e instanceof pr(e).ShadowRoot)}function wr(e){const{overflow:t,overflowX:n,overflowY:r,display:o}=Er(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&!["inline","contents"].includes(o)}function xr(e){return["table","td","th"].includes(fr(e))}function kr(e){return[":popover-open",":modal"].some(t=>{try{return e.matches(t)}catch(n){return!1}})}function $r(e){const t=Sr(),n=br(e)?Er(e):e;return"none"!==n.transform||"none"!==n.perspective||!!n.containerType&&"normal"!==n.containerType||!t&&!!n.backdropFilter&&"none"!==n.backdropFilter||!t&&!!n.filter&&"none"!==n.filter||["transform","perspective","filter"].some(e=>(n.willChange||"").includes(e))||["paint","layout","strict","content"].some(e=>(n.contain||"").includes(e))}function Sr(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function Cr(e){return["html","body","#document"].includes(fr(e))}function Er(e){return pr(e).getComputedStyle(e)}function qr(e){return br(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function Mr(e){if("html"===fr(e))return e;const t=e.assignedSlot||e.parentNode||vr(e)&&e.host||hr(e);return vr(t)?t.host:t}function Fr(e){const t=Mr(e);return Cr(t)?e.ownerDocument?e.ownerDocument.body:e.body:mr(t)&&wr(t)?t:Fr(t)}function Lr(e,t,n){var r;void 0===t&&(t=[]),void 0===n&&(n=!0);const o=Fr(e),i=o===(null==(r=e.ownerDocument)?void 0:r.body),s=pr(o);return i?t.concat(s,s.visualViewport||[],wr(o)?o:[],s.frameElement&&n?Lr(s.frameElement):[]):t.concat(o,Lr(o,[],n))}function Dr(e){const t=Er(e);let n=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const o=mr(e),i=o?e.offsetWidth:n,s=o?e.offsetHeight:r,a=Nn(n)!==i||Nn(r)!==s;return a&&(n=i,r=s),{width:n,height:r,$:a}}function Tr(e){return br(e)?e:e.contextElement}function Ar(e){const t=Tr(e);if(!mr(t))return Wn(1);const n=t.getBoundingClientRect(),{width:r,height:o,$:i}=Dr(t);let s=(i?Nn(n.width):n.width)/r,a=(i?Nn(n.height):n.height)/o;return s&&Number.isFinite(s)||(s=1),a&&Number.isFinite(a)||(a=1),{x:s,y:a}}var Ir=Wn(0);function Or(e){const t=pr(e);return Sr()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:Ir}function Pr(e,t,n,r){void 0===t&&(t=!1),void 0===n&&(n=!1);const o=e.getBoundingClientRect(),i=Tr(e);let s=Wn(1);t&&(r?br(r)&&(s=Ar(r)):s=Ar(e));const a=function(e,t,n){return void 0===t&&(t=!1),!(!n||t&&n!==pr(e))&&t}(i,n,r)?Or(i):Wn(0);let l=(o.left+a.x)/s.x,d=(o.top+a.y)/s.y,c=o.width/s.x,u=o.height/s.y;if(i){const e=pr(i),t=r&&br(r)?pr(r):r;let n=e,o=n.frameElement;for(;o&&r&&t!==n;){const e=Ar(o),t=o.getBoundingClientRect(),r=Er(o),i=t.left+(o.clientLeft+parseFloat(r.paddingLeft))*e.x,s=t.top+(o.clientTop+parseFloat(r.paddingTop))*e.y;l*=e.x,d*=e.y,c*=e.x,u*=e.y,l+=i,d+=s,n=pr(o),o=n.frameElement}}return lr({width:c,height:u,x:l,y:d})}function zr(e){return Pr(hr(e)).left+qr(e).scrollLeft}function Kr(e,t,n){let r;if("viewport"===t)r=function(e,t){const n=pr(e),r=hr(e),o=n.visualViewport;let i=r.clientWidth,s=r.clientHeight,a=0,l=0;if(o){i=o.width,s=o.height;const e=Sr();(!e||e&&"fixed"===t)&&(a=o.offsetLeft,l=o.offsetTop)}return{width:i,height:s,x:a,y:l}}(e,n);else if("document"===t)r=function(e){const t=hr(e),n=qr(e),r=e.ownerDocument.body,o=jn(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),i=jn(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let s=-n.scrollLeft+zr(e);const a=-n.scrollTop;return"rtl"===Er(r).direction&&(s+=jn(t.clientWidth,r.clientWidth)-o),{width:o,height:i,x:s,y:a}}(hr(e));else if(br(t))r=function(e,t){const n=Pr(e,!0,"fixed"===t),r=n.top+e.clientTop,o=n.left+e.clientLeft,i=mr(e)?Ar(e):Wn(1);return{width:e.clientWidth*i.x,height:e.clientHeight*i.y,x:o*i.x,y:r*i.y}}(t,n);else{const n=Or(e);r={...t,x:t.x-n.x,y:t.y-n.y}}return lr(r)}function Rr(e,t){const n=Mr(e);return!(n===t||!br(n)||Cr(n))&&("fixed"===Er(n).position||Rr(n,t))}function Br(e,t,n){const r=mr(t),o=hr(t),i="fixed"===n,s=Pr(e,!0,i,t);let a={scrollLeft:0,scrollTop:0};const l=Wn(0);if(r||!r&&!i)if(("body"!==fr(t)||wr(o))&&(a=qr(t)),r){const e=Pr(t,!0,i,t);l.x=e.x+t.clientLeft,l.y=e.y+t.clientTop}else o&&(l.x=zr(o));return{x:s.left+a.scrollLeft-l.x,y:s.top+a.scrollTop-l.y,width:s.width,height:s.height}}function Hr(e){return"static"===Er(e).position}function Gr(e,t){return mr(e)&&"fixed"!==Er(e).position?t?t(e):e.offsetParent:null}function Ur(e,t){const n=pr(e);if(kr(e))return n;if(!mr(e)){let t=Mr(e);for(;t&&!Cr(t);){if(br(t)&&!Hr(t))return t;t=Mr(t)}return n}let r=Gr(e,t);for(;r&&xr(r)&&Hr(r);)r=Gr(r,t);return r&&Cr(r)&&Hr(r)&&!$r(r)?n:r||function(e){let t=Mr(e);for(;mr(t)&&!Cr(t);){if($r(t))return t;if(kr(t))return null;t=Mr(t)}return null}(e)||n}var Vr={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:n,offsetParent:r,strategy:o}=e;const i="fixed"===o,s=hr(r),a=!!t&&kr(t.floating);if(r===s||a&&i)return n;let l={scrollLeft:0,scrollTop:0},d=Wn(1);const c=Wn(0),u=mr(r);if((u||!u&&!i)&&(("body"!==fr(r)||wr(s))&&(l=qr(r)),mr(r))){const e=Pr(r);d=Ar(r),c.x=e.x+r.clientLeft,c.y=e.y+r.clientTop}return{width:n.width*d.x,height:n.height*d.y,x:n.x*d.x-l.scrollLeft*d.x+c.x,y:n.y*d.y-l.scrollTop*d.y+c.y}},getDocumentElement:hr,getClippingRect:function(e){let{element:t,boundary:n,rootBoundary:r,strategy:o}=e;const i=[..."clippingAncestors"===n?kr(t)?[]:function(e,t){const n=t.get(e);if(n)return n;let r=Lr(e,[],!1).filter(e=>br(e)&&"body"!==fr(e)),o=null;const i="fixed"===Er(e).position;let s=i?Mr(e):e;for(;br(s)&&!Cr(s);){const t=Er(s),n=$r(s);n||"fixed"!==t.position||(o=null),(i?!n&&!o:!n&&"static"===t.position&&o&&["absolute","fixed"].includes(o.position)||wr(s)&&!n&&Rr(e,s))?r=r.filter(e=>e!==s):o=t,s=Mr(s)}return t.set(e,r),r}(t,this._c):[].concat(n),r],s=i[0],a=i.reduce((e,n)=>{const r=Kr(t,n,o);return e.top=jn(r.top,e.top),e.right=Vn(r.right,e.right),e.bottom=Vn(r.bottom,e.bottom),e.left=jn(r.left,e.left),e},Kr(t,s,o));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}},getOffsetParent:Ur,getElementRects:async function(e){const t=this.getOffsetParent||Ur,n=this.getDimensions,r=await n(e.floating);return{reference:Br(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}},getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){const{width:t,height:n}=Dr(e);return{width:t,height:n}},getScale:Ar,isElement:br,isRTL:function(e){return"rtl"===Er(e).direction}};function jr(e,t,n,r){void 0===r&&(r={});const{ancestorScroll:o=!0,ancestorResize:i=!0,elementResize:s="function"==typeof ResizeObserver,layoutShift:a="function"==typeof IntersectionObserver,animationFrame:l=!1}=r,d=Tr(e),c=o||i?[...d?Lr(d):[],...Lr(t)]:[];c.forEach(e=>{o&&e.addEventListener("scroll",n,{passive:!0}),i&&e.addEventListener("resize",n)});const u=d&&a?function(e,t){let n,r=null;const o=hr(e);function i(){var e;clearTimeout(n),null==(e=r)||e.disconnect(),r=null}return function s(a,l){void 0===a&&(a=!1),void 0===l&&(l=1),i();const{left:d,top:c,width:u,height:g}=e.getBoundingClientRect();if(a||t(),!u||!g)return;const f={rootMargin:-Qn(c)+"px "+-Qn(o.clientWidth-(d+u))+"px "+-Qn(o.clientHeight-(c+g))+"px "+-Qn(d)+"px",threshold:jn(0,Vn(1,l))||1};let p=!0;function h(e){const t=e[0].intersectionRatio;if(t!==l){if(!p)return s();t?s(!1,t):n=setTimeout(()=>{s(!1,1e-7)},1e3)}p=!1}try{r=new IntersectionObserver(h,{...f,root:o.ownerDocument})}catch(y){r=new IntersectionObserver(h,f)}r.observe(e)}(!0),i}(d,n):null;let g,f=-1,p=null;s&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===d&&p&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;null==(e=p)||e.observe(t)})),n()}),d&&!l&&p.observe(d),p.observe(t));let h=l?Pr(e):null;return l&&function t(){const r=Pr(e);!h||r.x===h.x&&r.y===h.y&&r.width===h.width&&r.height===h.height||n();h=r,g=requestAnimationFrame(t)}(),n(),()=>{var e;c.forEach(e=>{o&&e.removeEventListener("scroll",n),i&&e.removeEventListener("resize",n)}),null==u||u(),null==(e=p)||e.disconnect(),p=null,l&&cancelAnimationFrame(g)}}var Nr=function(e){return void 0===e&&(e=0),{name:"offset",options:e,async fn(t){var n,r;const{x:o,y:i,placement:s,middlewareData:a}=t,l=await async function(e,t){const{placement:n,platform:r,elements:o}=e,i=await(null==r.isRTL?void 0:r.isRTL(o.floating)),s=Jn(n),a=er(n),l="y"===rr(n),d=["left","top"].includes(s)?-1:1,c=i&&l?-1:1,u=Yn(t,e);let{mainAxis:g,crossAxis:f,alignmentAxis:p}="number"==typeof u?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...u};return a&&"number"==typeof p&&(f="end"===a?-1*p:p),l?{x:f*c,y:g*d}:{x:g*d,y:f*c}}(t,e);return s===(null==(n=a.offset)?void 0:n.placement)&&null!=(r=a.arrow)&&r.alignmentOffset?{}:{x:o+l.x,y:i+l.y,data:{...l,placement:s}}}}},Qr=function(e){return void 0===e&&(e={}),{name:"shift",options:e,async fn(t){const{x:n,y:r,placement:o}=t,{mainAxis:i=!0,crossAxis:s=!1,limiter:a={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=Yn(e,t),d={x:n,y:r},c=await cr(t,l),u=rr(Jn(o)),g=tr(u);let f=d[g],p=d[u];if(i){const e="y"===g?"bottom":"right";f=Zn(f+c["y"===g?"top":"left"],f,f-c[e])}if(s){const e="y"===u?"bottom":"right";p=Zn(p+c["y"===u?"top":"left"],p,p-c[e])}const h=a.fn({...t,[g]:f,[u]:p});return{...h,data:{x:h.x-n,y:h.y-r}}}}},Wr=function(e){return void 0===e&&(e={}),{name:"flip",options:e,async fn(t){var n,r;const{placement:o,middlewareData:i,rects:s,initialPlacement:a,platform:l,elements:d}=t,{mainAxis:c=!0,crossAxis:u=!0,fallbackPlacements:g,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:p="none",flipAlignment:h=!0,...y}=Yn(e,t);if(null!=(n=i.arrow)&&n.alignmentOffset)return{};const b=Jn(o),m=rr(a),v=Jn(a)===a,w=await(null==l.isRTL?void 0:l.isRTL(d.floating)),x=g||(v||!h?[sr(a)]:function(e){const t=sr(e);return[ir(e),t,ir(t)]}(a)),k="none"!==p;!g&&k&&x.push(...function(e,t,n,r){const o=er(e);let i=function(e,t,n){const r=["left","right"],o=["right","left"],i=["top","bottom"],s=["bottom","top"];switch(e){case"top":case"bottom":return n?t?o:r:t?r:o;case"left":case"right":return t?i:s;default:return[]}}(Jn(e),"start"===n,r);return o&&(i=i.map(e=>e+"-"+o),t&&(i=i.concat(i.map(ir)))),i}(a,h,p,w));const $=[a,...x],S=await cr(t,y),C=[];let E=(null==(r=i.flip)?void 0:r.overflows)||[];if(c&&C.push(S[b]),u){const e=function(e,t,n){void 0===n&&(n=!1);const r=er(e),o=or(e),i=nr(o);let s="x"===o?r===(n?"end":"start")?"right":"left":"start"===r?"bottom":"top";return t.reference[i]>t.floating[i]&&(s=sr(s)),[s,sr(s)]}(o,s,w);C.push(S[e[0]],S[e[1]])}if(E=[...E,{placement:o,overflows:C}],!C.every(e=>e<=0)){var q,M;const e=((null==(q=i.flip)?void 0:q.index)||0)+1,t=$[e];if(t)return{data:{index:e,overflows:E},reset:{placement:t}};let n=null==(M=E.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0])?void 0:M.placement;if(!n)switch(f){case"bestFit":{var F;const e=null==(F=E.filter(e=>{if(k){const t=rr(e.placement);return t===m||"y"===t}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0])?void 0:F[0];e&&(n=e);break}case"initialPlacement":n=a}if(o!==n)return{reset:{placement:n}}}return{}}}},_r=function(e){return void 0===e&&(e={}),{name:"size",options:e,async fn(t){const{placement:n,rects:r,platform:o,elements:i}=t,{apply:s=()=>{},...a}=Yn(e,t),l=await cr(t,a),d=Jn(n),c=er(n),u="y"===rr(n),{width:g,height:f}=r.floating;let p,h;"top"===d||"bottom"===d?(p=d,h=c===(await(null==o.isRTL?void 0:o.isRTL(i.floating))?"start":"end")?"left":"right"):(h=d,p="end"===c?"top":"bottom");const y=f-l.top-l.bottom,b=g-l.left-l.right,m=Vn(f-l[p],y),v=Vn(g-l[h],b),w=!t.middlewareData.shift;let x=m,k=v;if(u?k=c||w?Vn(v,b):b:x=c||w?Vn(m,y):y,w&&!c){const e=jn(l.left,0),t=jn(l.right,0),n=jn(l.top,0),r=jn(l.bottom,0);u?k=g-2*(0!==e||0!==t?e+t:jn(l.left,l.right)):x=f-2*(0!==n||0!==r?n+r:jn(l.top,l.bottom))}await s({...t,availableWidth:k,availableHeight:x});const $=await o.getDimensions(i.floating);return g!==$.width||f!==$.height?{reset:{rects:!0}}:{}}}},Xr=function(e){return void 0===e&&(e={}),{name:"hide",options:e,async fn(t){const{rects:n}=t,{strategy:r="referenceHidden",...o}=Yn(e,t);switch(r){case"referenceHidden":{const e=ur(await cr(t,{...o,elementContext:"reference"}),n.reference);return{data:{referenceHiddenOffsets:e,referenceHidden:gr(e)}}}case"escaped":{const e=ur(await cr(t,{...o,altBoundary:!0}),n.floating);return{data:{escapedOffsets:e,escaped:gr(e)}}}default:return{}}}}},Zr=e=>({name:"arrow",options:e,async fn(t){const{x:n,y:r,placement:o,rects:i,platform:s,elements:a,middlewareData:l}=t,{element:d,padding:c=0}=Yn(e,t)||{};if(null==d)return{};const u=ar(c),g={x:n,y:r},f=or(o),p=nr(f),h=await s.getDimensions(d),y="y"===f,b=y?"top":"left",m=y?"bottom":"right",v=y?"clientHeight":"clientWidth",w=i.reference[p]+i.reference[f]-g[f]-i.floating[p],x=g[f]-i.reference[f],k=await(null==s.getOffsetParent?void 0:s.getOffsetParent(d));let $=k?k[v]:0;$&&await(null==s.isElement?void 0:s.isElement(k))||($=a.floating[v]||i.floating[p]);const S=w/2-x/2,C=$/2-h[p]/2-1,E=Vn(u[b],C),q=Vn(u[m],C),M=E,F=$-h[p]-q,L=$/2-h[p]/2+S,D=Zn(M,L,F),T=!l.arrow&&null!=er(o)&&L!==D&&i.reference[p]/2-(L<M?E:q)-h[p]/2<0,A=T?L<M?L-M:L-F:0;return{[f]:g[f]+A,data:{[f]:D,centerOffset:L-D-A,...T&&{alignmentOffset:A}},reset:T}}}),Yr=(e,t,n)=>{const r=new Map,o={platform:Vr,...n},i={...o.platform,_c:r};return(async(e,t,n)=>{const{placement:r="bottom",strategy:o="absolute",middleware:i=[],platform:s}=n,a=i.filter(Boolean),l=await(null==s.isRTL?void 0:s.isRTL(t));let d=await s.getElementRects({reference:e,floating:t,strategy:o}),{x:c,y:u}=dr(d,r,l),g=r,f={},p=0;for(let h=0;h<a.length;h++){const{name:n,fn:i}=a[h],{x:y,y:b,data:m,reset:v}=await i({x:c,y:u,initialPlacement:r,placement:g,strategy:o,middlewareData:f,rects:d,platform:s,elements:{reference:e,floating:t}});c=null!=y?y:c,u=null!=b?b:u,f={...f,[n]:{...f[n],...m}},v&&p<=50&&(p++,"object"==typeof v&&(v.placement&&(g=v.placement),v.rects&&(d=!0===v.rects?await s.getElementRects({reference:e,floating:t,strategy:o}):v.rects),({x:c,y:u}=dr(d,g,l))),h=-1)}return{x:c,y:u,placement:g,strategy:o,middlewareData:f}})(e,t,{...o,platform:i})},Jr=e();function eo(){const e=h(Jr);if(void 0===e)throw new Error("[kobalte]: `usePopperContext` must be used within a `Popper` component");return e}var to=d('<svg display="block" viewBox="0 0 30 30" style="transform:scale(1.02)"><g><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z">'),no={top:180,right:-90,bottom:0,left:90};function ro(e){const n=eo(),o=Tt({size:30},e),[s,a]=N(o,["ref","style","size"]),l=()=>n.currentPlacement().split("-")[0],d=function(e){const[n,o]=t();return r(()=>{const t=e();var n;t&&o((n=t,ct(n).defaultView||window).getComputedStyle(t))}),n}(n.contentRef),c=()=>2*Number.parseInt(d()?.getPropertyValue(`border-${l()}-width`)||"0px")*(30/s.size);return i(Gt,P({as:"div",ref(e){const t=Ge(n.setArrowRef,s.ref);"function"==typeof t&&t(e)},"aria-hidden":"true",get style(){return rt({position:"absolute","font-size":`${s.size}px`,width:"1em",height:"1em","pointer-events":"none",fill:d()?.getPropertyValue("background-color")||"none",stroke:d()?.getPropertyValue(`border-${l()}-color`)||"none","stroke-width":c()},s.style)}},a,{get children(){const e=to(),t=e.firstChild;return u(()=>w(t,"transform",`rotate(${no[l()]} 15 15) translate(0 2)`)),e}}))}function oo(e){const{x:t=0,y:n=0,width:r=0,height:o=0}=e??{};if("function"==typeof DOMRect)return new DOMRect(t,n,r,o);const i={x:t,y:n,width:r,height:o,top:n,right:t+r,bottom:n+o,left:t};return{...i,toJSON:()=>i}}function io(e){return/^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e)}var so={top:"bottom",right:"left",bottom:"top",left:"right"};var ao=Object.assign(function(e){const n=Tt({getAnchorRect:e=>e?.getBoundingClientRect(),placement:"bottom",gutter:0,shift:0,flip:!0,slide:!0,overlap:!1,sameWidth:!1,fitViewport:!1,hideWhenDetached:!1,detachedPadding:0,arrowPadding:4,overflowPadding:8},e),[o,s]=t(),[a,l]=t(),[d,c]=t(n.placement),u=()=>{return e=n.anchorRef?.(),t=n.getAnchorRect,{contextElement:e,getBoundingClientRect:()=>{const n=t(e);return n?oo(n):e?e.getBoundingClientRect():oo()}};var e,t},{direction:g}=mn();async function f(){const e=u(),t=o(),r=a();if(!e||!t)return;const i=(r?.clientHeight||0)/2,s="number"==typeof n.gutter?n.gutter+i:n.gutter??i;t.style.setProperty("--kb-popper-content-overflow-padding",`${n.overflowPadding}px`),e.getBoundingClientRect();const l=[Nr(({placement:e})=>{const t=!!e.split("-")[1];return{mainAxis:s,crossAxis:t?void 0:n.shift,alignmentAxis:n.shift}})];if(!1!==n.flip){const e="string"==typeof n.flip?n.flip.split(" "):void 0;if(void 0!==e&&!e.every(io))throw new Error("`flip` expects a spaced-delimited list of placements");l.push(Wr({padding:n.overflowPadding,fallbackPlacements:e}))}(n.slide||n.overlap)&&l.push(Qr({mainAxis:n.slide,crossAxis:n.overlap,padding:n.overflowPadding})),l.push(_r({padding:n.overflowPadding,apply({availableWidth:e,availableHeight:r,rects:o}){const i=Math.round(o.reference.width);e=Math.floor(e),r=Math.floor(r),t.style.setProperty("--kb-popper-anchor-width",`${i}px`),t.style.setProperty("--kb-popper-content-available-width",`${e}px`),t.style.setProperty("--kb-popper-content-available-height",`${r}px`),n.sameWidth&&(t.style.width=`${i}px`),n.fitViewport&&(t.style.maxWidth=`${e}px`,t.style.maxHeight=`${r}px`)}})),n.hideWhenDetached&&l.push(Xr({padding:n.detachedPadding})),r&&l.push(Zr({element:r,padding:n.arrowPadding}));const d=await Yr(e,t,{placement:n.placement,strategy:"absolute",middleware:l,platform:{...Vr,isRTL:()=>"rtl"===g()}});if(c(d.placement),n.onCurrentPlacementChange?.(d.placement),!t)return;t.style.setProperty("--kb-popper-content-transform-origin",function(e,t){const[n,r]=e.split("-"),o=so[n];return r?"left"===n||"right"===n?`${o} ${"start"===r?"top":"bottom"}`:"start"===r?`${o} ${"rtl"===t?"right":"left"}`:`${o} ${"rtl"===t?"left":"right"}`:`${o} center`}(d.placement,g()));const f=Math.round(d.x),p=Math.round(d.y);let h;if(n.hideWhenDetached&&(h=d.middlewareData.hide?.referenceHidden?"hidden":"visible"),Object.assign(t.style,{top:"0",left:"0",transform:`translate3d(${f}px, ${p}px, 0)`,visibility:h}),r&&d.middlewareData.arrow){const{x:e,y:t}=d.middlewareData.arrow,n=d.placement.split("-")[0];Object.assign(r.style,{left:null!=e?`${e}px`:"",top:null!=t?`${t}px`:"",[n]:"100%"})}}r(()=>{const e=u(),t=o();if(!e||!t)return;const n=jr(e,t,f,{elementResize:"function"==typeof ResizeObserver});y(n)}),r(()=>{const e=o(),t=n.contentRef?.();e&&t&&queueMicrotask(()=>{e.style.zIndex=getComputedStyle(t).zIndex})});const p={currentPlacement:d,contentRef:()=>n.contentRef?.(),setPositionerRef:s,setArrowRef:l};return i(Jr.Provider,{value:p,get children(){return n.children}})},{Arrow:ro,Context:Jr,usePopperContext:eo,Positioner:function(e){const t=eo(),[n,r]=N(e,["ref","style"]);return i(Gt,P({as:"div",ref(e){const r=Ge(t.setPositionerRef,n.ref);"function"==typeof r&&r(e)},"data-popper-positioner":"",get style(){return rt({position:"absolute",top:0,left:0,"min-width":"max-content"},n.style)}},r))}});var lo="interactOutside.pointerDownOutside",co="interactOutside.focusOutside";var uo=e();function go(e){let t;const o=h(uo),[s,a]=N(e,["ref","disableOutsidePointerEvents","excludedElements","onEscapeKeyDown","onPointerDownOutside","onFocusOutside","onInteractOutside","onDismiss","bypassTopMostLayerCheck"]),l=new Set([]);!function(e,t){let n,o=Dt;const i=()=>ct(t()),s=t=>e.onPointerDownOutside?.(t),a=t=>e.onFocusOutside?.(t),l=t=>e.onInteractOutside?.(t),d=n=>{const r=n.target;return r instanceof HTMLElement&&!r.closest(`[${Tn}]`)&&!!lt(i(),r)&&!lt(t(),r)&&!e.shouldExcludeElement?.(r)},c=e=>{function n(){const n=t(),r=e.target;if(!n||!r||!d(e))return;const o=bt([s,l]);r.addEventListener(lo,o,{once:!0});const i=new CustomEvent(lo,{bubbles:!1,cancelable:!0,detail:{originalEvent:e,isContextMenu:2===e.button||mt(e)&&0===e.button}});r.dispatchEvent(i)}"touch"===e.pointerType?(i().removeEventListener("click",n),o=n,i().addEventListener("click",n,{once:!0})):n()},u=e=>{const n=t(),r=e.target;if(!n||!r||!d(e))return;const o=bt([a,l]);r.addEventListener(co,o,{once:!0});const i=new CustomEvent(co,{bubbles:!1,cancelable:!0,detail:{originalEvent:e,isContextMenu:!1}});r.dispatchEvent(i)};r(()=>{Z(e.isDisabled)||(n=window.setTimeout(()=>{i().addEventListener("pointerdown",c,!0)},0),i().addEventListener("focusin",u,!0),y(()=>{window.clearTimeout(n),i().removeEventListener("click",o),i().removeEventListener("pointerdown",c,!0),i().removeEventListener("focusin",u,!0)}))})}({shouldExcludeElement:e=>!!t&&(s.excludedElements?.some(t=>lt(t(),e))||[...l].some(t=>lt(t,e))),onPointerDownOutside:e=>{t&&!Rn.isBelowPointerBlockingLayer(t)&&(s.bypassTopMostLayerCheck||Rn.isTopMostLayer(t))&&(s.onPointerDownOutside?.(e),s.onInteractOutside?.(e),e.defaultPrevented||s.onDismiss?.())},onFocusOutside:e=>{s.onFocusOutside?.(e),s.onInteractOutside?.(e),e.defaultPrevented||s.onDismiss?.()}},()=>t),function(e){const t=t=>{t.key===gt.Escape&&e.onEscapeKeyDown?.(t)};r(()=>{if(Z(e.isDisabled))return;const n=e.ownerDocument?.()??ct();n.addEventListener("keydown",t),y(()=>{n.removeEventListener("keydown",t)})})}({ownerDocument:()=>ct(t),onEscapeKeyDown:e=>{t&&Rn.isTopMostLayer(t)&&(s.onEscapeKeyDown?.(e),!e.defaultPrevented&&s.onDismiss&&(e.preventDefault(),s.onDismiss()))}}),n(()=>{if(!t)return;Rn.addLayer({node:t,isPointerBlocking:s.disableOutsidePointerEvents,dismiss:s.onDismiss});const e=o?.registerNestedLayer(t);Rn.assignPointerEventToLayers(),Rn.disableBodyPointerEvents(t),y(()=>{t&&(Rn.removeLayer(t),e?.(),Rn.assignPointerEventToLayers(),Rn.restoreBodyPointerEvents(t))})}),r(v([()=>t,()=>s.disableOutsidePointerEvents],([e,t])=>{if(!e)return;const n=Rn.find(e);n&&n.isPointerBlocking!==t&&(n.isPointerBlocking=t,Rn.assignPointerEventToLayers()),t&&Rn.disableBodyPointerEvents(e),y(()=>{Rn.restoreBodyPointerEvents(e)})},{defer:!0}));const d={registerNestedLayer:e=>{l.add(e);const t=o?.registerNestedLayer(e);return()=>{l.delete(e),t?.()}}};return i(uo.Provider,{value:d,get children(){return i(Gt,P({as:"div",ref(e){const n=Ge(e=>t=e,s.ref);"function"==typeof n&&n(e)}},a))}})}function fo(e={}){const[t,n]=Zt({value:()=>Z(e.open),defaultValue:()=>!!Z(e.defaultOpen),onChange:t=>e.onOpenChange?.(t)}),r=()=>{n(!0)},o=()=>{n(!1)};return{isOpen:t,setIsOpen:n,open:r,close:o,toggle:()=>{t()?o():r()}}}var po={};Jt(po,{Description:()=>Nt,ErrorMessage:()=>Qt,Item:()=>vo,ItemControl:()=>wo,ItemDescription:()=>xo,ItemIndicator:()=>ko,ItemInput:()=>$o,ItemLabel:()=>So,Label:()=>Co,RadioGroup:()=>qo,Root:()=>Eo});var ho=e();function yo(){const e=h(ho);if(void 0===e)throw new Error("[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component");return e}var bo=e();function mo(){const e=h(bo);if(void 0===e)throw new Error("[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component");return e}function vo(e){const n=jt(),r=yo(),s=Tt({id:`${n.generateId("item")}-${$()}`},e),[a,l]=N(s,["value","disabled","onPointerDown"]),[d,c]=t(),[u,g]=t(),[f,p]=t(),[h,y]=t(),[b,m]=t(!1),v=o(()=>r.isSelectedValue(a.value)),w=o(()=>a.disabled||n.isDisabled()||!1),x=e=>{yt(e,a.onPointerDown),b()&&e.preventDefault()},k=o(()=>({...n.dataset(),"data-disabled":w()?"":void 0,"data-checked":v()?"":void 0})),S={value:()=>a.value,dataset:k,isSelected:v,isDisabled:w,inputId:d,labelId:u,descriptionId:f,inputRef:h,select:()=>r.setSelectedValue(a.value),generateId:at(()=>l.id),registerInput:Rt(c),registerLabel:Rt(g),registerDescription:Rt(p),setIsFocused:m,setInputRef:y};return i(bo.Provider,{value:S,get children(){return i(Gt,P({as:"div",role:"group",onPointerDown:x},k,l))}})}function wo(e){const t=mo(),n=Tt({id:t.generateId("control")},e),[r,o]=N(n,["onClick","onKeyDown"]);return i(Gt,P({as:"div",onClick:e=>{yt(e,r.onClick),t.select(),t.inputRef()?.focus()},onKeyDown:e=>{yt(e,r.onKeyDown),e.key===gt.Space&&(t.select(),t.inputRef()?.focus())}},()=>t.dataset(),o))}function xo(e){const t=mo(),n=Tt({id:t.generateId("description")},e);return r(()=>y(t.registerDescription(n.id))),i(Gt,P({as:"div"},()=>t.dataset(),n))}function ko(e){const n=mo(),r=Tt({id:n.generateId("indicator")},e),[o,s]=N(r,["ref","forceMount"]),[a,d]=t(),{present:c}=Dn({show:()=>o.forceMount||n.isSelected(),element:()=>a()??null});return i(l,{get when(){return c()},get children(){return i(Gt,P({as:"div",ref(e){const t=Ge(d,o.ref);"function"==typeof t&&t(e)}},()=>n.dataset(),s))}})}function $o(e){const n=jt(),o=yo(),s=mo(),a=Tt({id:s.generateId("input")},e),[l,d]=N(a,["ref","style","aria-labelledby","aria-describedby","onChange","onFocus","onBlur"]),[c,u]=t(!1);return r(v([()=>s.isSelected(),()=>s.value()],e=>{if(!e[0]&&e[1]===s.value())return;u(!0);const t=s.inputRef();t?.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0})),t?.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0}))},{defer:!0})),r(()=>y(s.registerInput(d.id))),i(Gt,P({as:"input",ref(e){const t=Ge(s.setInputRef,l.ref);"function"==typeof t&&t(e)},type:"radio",get name(){return n.name()},get value(){return s.value()},get checked(){return s.isSelected()},get required(){return n.isRequired()},get disabled(){return s.isDisabled()},get readonly(){return n.isReadOnly()},get style(){return rt({...Kt},l.style)},get"aria-labelledby"(){return[l["aria-labelledby"],s.labelId(),null!=l["aria-labelledby"]&&null!=d["aria-label"]?d.id:void 0].filter(Boolean).join(" ")||void 0},get"aria-describedby"(){return[l["aria-describedby"],s.descriptionId(),o.ariaDescribedBy()].filter(Boolean).join(" ")||void 0},onChange:e=>{if(yt(e,l.onChange),e.stopPropagation(),!c()){o.setSelectedValue(s.value());e.target.checked=s.isSelected()}u(!1)},onFocus:e=>{yt(e,l.onFocus),s.setIsFocused(!0)},onBlur:e=>{yt(e,l.onBlur),s.setIsFocused(!1)}},()=>s.dataset(),d))}function So(e){const t=mo(),n=Tt({id:t.generateId("label")},e);return r(()=>y(t.registerLabel(n.id))),i(Gt,P({as:"label",get for(){return t.inputId()}},()=>t.dataset(),n))}function Co(e){return i(Wt,P({as:"span"},e))}function Eo(e){let n;const r=Tt({id:`radiogroup-${$()}`,orientation:"vertical"},e),[s,a,l]=N(r,["ref","value","defaultValue","onChange","orientation","aria-labelledby","aria-describedby"],Ut),[d,c]=Xt({value:()=>s.value,defaultValue:()=>s.defaultValue,onChange:e=>s.onChange?.(e)}),{formControlContext:u}=function(e){const n=Tt({id:`form-control-${$()}`},e),[r,i]=t(),[s,a]=t(),[l,d]=t(),[c,u]=t();return{formControlContext:{name:()=>Z(n.name)??Z(n.id),dataset:o(()=>({"data-valid":"valid"===Z(n.validationState)?"":void 0,"data-invalid":"invalid"===Z(n.validationState)?"":void 0,"data-required":Z(n.required)?"":void 0,"data-disabled":Z(n.disabled)?"":void 0,"data-readonly":Z(n.readOnly)?"":void 0})),validationState:()=>Z(n.validationState),isRequired:()=>Z(n.required),isDisabled:()=>Z(n.disabled),isReadOnly:()=>Z(n.readOnly),labelId:r,fieldId:s,descriptionId:l,errorMessageId:c,getAriaLabelledBy:(e,t,n)=>{const o=null!=n||null!=r();return[n,r(),o&&null!=t?e:void 0].filter(Boolean).join(" ")||void 0},getAriaDescribedBy:e=>[l(),c(),e].filter(Boolean).join(" ")||void 0,generateId:at(()=>Z(n.id)),registerLabel:Rt(i),registerField:Rt(a),registerDescription:Rt(d),registerErrorMessage:Rt(u)}}}(a);_t(()=>n,()=>c(s.defaultValue??""));const g=()=>u.getAriaDescribedBy(s["aria-describedby"]),f=e=>e===d(),p={ariaDescribedBy:g,isSelectedValue:f,setSelectedValue:e=>{if(!u.isReadOnly()&&!u.isDisabled()&&(c(e),n))for(const t of n.querySelectorAll("[type='radio']")){const e=t;e.checked=f(e.value)}}};return i(Vt.Provider,{value:u,get children(){return i(ho.Provider,{value:p,get children(){return i(Gt,P({as:"div",ref(e){const t=Ge(e=>n=e,s.ref);"function"==typeof t&&t(e)},role:"radiogroup",get id(){return Z(a.id)},get"aria-invalid"(){return"invalid"===u.validationState()||void 0},get"aria-required"(){return u.isRequired()||void 0},get"aria-disabled"(){return u.isDisabled()||void 0},get"aria-readonly"(){return u.isReadOnly()||void 0},get"aria-orientation"(){return s.orientation},get"aria-labelledby"(){return u.getAriaLabelledBy(Z(a.id),l["aria-label"],s["aria-labelledby"])},get"aria-describedby"(){return g()}},()=>u.dataset(),l))}})}})}var qo=Object.assign(Eo,{Description:Nt,ErrorMessage:Qt,Item:vo,ItemControl:wo,ItemDescription:xo,ItemIndicator:ko,ItemInput:$o,ItemLabel:So,Label:Co}),Mo=class{collection;ref;collator;constructor(e,t,n){this.collection=e,this.ref=t,this.collator=n}getKeyBelow(e){let t=this.collection().getKeyAfter(e);for(;null!=t;){const e=this.collection().getItem(t);if(e&&"item"===e.type&&!e.disabled)return t;t=this.collection().getKeyAfter(t)}}getKeyAbove(e){let t=this.collection().getKeyBefore(e);for(;null!=t;){const e=this.collection().getItem(t);if(e&&"item"===e.type&&!e.disabled)return t;t=this.collection().getKeyBefore(t)}}getFirstKey(){let e=this.collection().getFirstKey();for(;null!=e;){const t=this.collection().getItem(e);if(t&&"item"===t.type&&!t.disabled)return e;e=this.collection().getKeyAfter(e)}}getLastKey(){let e=this.collection().getLastKey();for(;null!=e;){const t=this.collection().getItem(e);if(t&&"item"===t.type&&!t.disabled)return e;e=this.collection().getKeyBefore(e)}}getItem(e){return this.ref?.()?.querySelector(`[data-key="${e}"]`)??null}getKeyPageAbove(e){const t=this.ref?.();let n=this.getItem(e);if(!t||!n)return;const r=Math.max(0,n.offsetTop+n.offsetHeight-t.offsetHeight);let o=e;for(;o&&n&&n.offsetTop>r;)o=this.getKeyAbove(o),n=null!=o?this.getItem(o):null;return o}getKeyPageBelow(e){const t=this.ref?.();let n=this.getItem(e);if(!t||!n)return;const r=Math.min(t.scrollHeight,n.offsetTop-n.offsetHeight+t.offsetHeight);let o=e;for(;o&&n&&n.offsetTop<r;)o=this.getKeyBelow(o),n=null!=o?this.getItem(o):null;return o}getKeyForSearch(e,t){const n=this.collator?.();if(!n)return;let r=null!=t?this.getKeyBelow(t):this.getFirstKey();for(;null!=r;){const t=this.collection().getItem(r);if(t){const o=t.textValue.slice(0,e.length);if(t.textValue&&0===n.compare(o,e))return r}r=this.getKeyBelow(r)}}};function Fo(e,t,n){const r=function(e){const{locale:t}=mn(),n=o(()=>t()+(e?Object.entries(e).sort((e,t)=>e[0]<t[0]?-1:1).join():""));return o(()=>{const r=n();let o;return vn.has(r)&&(o=vn.get(r)),o||(o=new Intl.Collator(t(),e),vn.set(r,o)),o})}({usage:"search",sensitivity:"base"});return Cn({selectionManager:()=>Z(e.selectionManager),keyboardDelegate:o(()=>{const n=Z(e.keyboardDelegate);return n||new Mo(e.collection,t,r)}),autoFocus:()=>Z(e.autoFocus),deferAutoFocus:()=>Z(e.deferAutoFocus),shouldFocusWrap:()=>Z(e.shouldFocusWrap),disallowEmptySelection:()=>Z(e.disallowEmptySelection),selectOnFocus:()=>Z(e.selectOnFocus),disallowTypeAhead:()=>Z(e.disallowTypeAhead),shouldUseVirtualFocus:()=>Z(e.shouldUseVirtualFocus),allowsTabNavigation:()=>Z(e.allowsTabNavigation),isVirtualized:()=>Z(e.isVirtualized),scrollToKey:t=>Z(e.scrollToKey)?.(t),orientation:()=>Z(e.orientation)},t)}var Lo="focusScope.autoFocusOnMount",Do="focusScope.autoFocusOnUnmount",To={bubbles:!1,cancelable:!0},Ao={stack:[],active(){return this.stack[0]},add(e){e!==this.active()&&this.active()?.pause(),this.stack=ot(this.stack,e),this.stack.unshift(e)},remove(e){this.stack=ot(this.stack,e),this.active()?.resume()}};function Io(e,n){const[o,i]=t(!1),s={pause(){i(!0)},resume(){i(!1)}};let a=null;const l=t=>e.onMountAutoFocus?.(t),d=t=>e.onUnmountAutoFocus?.(t),c=()=>ct(n()),u=()=>{const e=c().createElement("span");return e.setAttribute("data-focus-trap",""),e.tabIndex=0,Object.assign(e.style,Kt),e},g=()=>{const e=n();return e?Ct(e,!0).filter(e=>!e.hasAttribute("data-focus-trap")):[]},f=()=>{const e=g();return e.length>0?e[0]:null};r(()=>{const e=n();if(!e)return;Ao.add(s);const t=dt(e);if(!lt(e,t)){const n=new CustomEvent(Lo,To);e.addEventListener(Lo,l),e.dispatchEvent(n),n.defaultPrevented||setTimeout(()=>{vt(f()),dt(e)===t&&vt(e)},0)}y(()=>{e.removeEventListener(Lo,l),setTimeout(()=>{const r=new CustomEvent(Do,To);(()=>{const e=n();if(!e)return!1;const t=dt(e);return!!t&&!lt(e,t)&&qt(t)})()&&r.preventDefault(),e.addEventListener(Do,d),e.dispatchEvent(r),r.defaultPrevented||vt(t??c().body),e.removeEventListener(Do,d),Ao.remove(s)},0)})}),r(()=>{const t=n();if(!t||!Z(e.trapFocus)||o())return;const r=e=>{const n=e.target;n?.closest(`[${Tn}]`)||(lt(t,n)?a=n:vt(a))},i=e=>{const n=e.relatedTarget??dt(t);n?.closest(`[${Tn}]`)||lt(t,n)||vt(a)};c().addEventListener("focusin",r),c().addEventListener("focusout",i),y(()=>{c().removeEventListener("focusin",r),c().removeEventListener("focusout",i)})}),r(()=>{const t=n();if(!t||!Z(e.trapFocus)||o())return;const r=u();t.insertAdjacentElement("afterbegin",r);const i=u();function s(e){const t=f(),n=(()=>{const e=g();return e.length>0?e[e.length-1]:null})();e.relatedTarget===t?vt(n):vt(t)}t.insertAdjacentElement("beforeend",i),r.addEventListener("focusin",s),i.addEventListener("focusin",s);const a=new MutationObserver(e=>{for(const n of e)n.previousSibling===i&&(i.remove(),t.insertAdjacentElement("beforeend",i)),n.nextSibling===r&&(r.remove(),t.insertAdjacentElement("afterbegin",r))});a.observe(t,{childList:!0,subtree:!1}),y(()=>{r.removeEventListener("focusin",s),i.removeEventListener("focusin",s),r.remove(),i.remove(),a.disconnect()})})}var Oo="data-live-announcer";function Po(e){r(()=>{Z(e.isDisabled)||y(function(e,t=document.body){const n=new Set(e),r=new Set,o=e=>{for(const r of e.querySelectorAll(`[${Oo}], [${Tn}]`))n.add(r);const t=e=>{if(n.has(e)||e.parentElement&&r.has(e.parentElement)&&"row"!==e.parentElement.getAttribute("role"))return NodeFilter.FILTER_REJECT;for(const t of n)if(e.contains(t))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT},o=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:t}),s=t(e);if(s===NodeFilter.FILTER_ACCEPT&&i(e),s!==NodeFilter.FILTER_REJECT){let e=o.nextNode();for(;null!=e;)i(e),e=o.nextNode()}},i=e=>{const t=zo.get(e)??0;"true"===e.getAttribute("aria-hidden")&&0===t||(0===t&&e.setAttribute("aria-hidden","true"),r.add(e),zo.set(e,t+1))};Ko.length&&Ko[Ko.length-1].disconnect();o(t);const s=new MutationObserver(e=>{for(const t of e)if("childList"===t.type&&0!==t.addedNodes.length&&![...n,...r].some(e=>e.contains(t.target))){for(const e of t.removedNodes)e instanceof Element&&(n.delete(e),r.delete(e));for(const e of t.addedNodes)!(e instanceof HTMLElement||e instanceof SVGElement)||"true"!==e.dataset.liveAnnouncer&&"true"!==e.dataset.reactAriaTopLayer?e instanceof Element&&o(e):n.add(e)}});s.observe(t,{childList:!0,subtree:!0});const a={observe(){s.observe(t,{childList:!0,subtree:!0})},disconnect(){s.disconnect()}};return Ko.push(a),()=>{s.disconnect();for(const e of r){const t=zo.get(e);if(null==t)return;1===t?(e.removeAttribute("aria-hidden"),zo.delete(e)):zo.set(e,t-1)}a===Ko[Ko.length-1]?(Ko.pop(),Ko.length&&Ko[Ko.length-1].observe()):Ko.splice(Ko.indexOf(a),1)}}(Z(e.targets),Z(e.root)))})}var zo=new WeakMap,Ko=[];var Ro=new Map,Bo=e=>{r(()=>{const t=Ln(e.style)??{},n=Ln(e.properties)??[],r={};for(const i in t)r[i]=e.element.style[i];const o=Ro.get(e.key);o?o.activeCount++:Ro.set(e.key,{activeCount:1,originalStyles:r,properties:n.map(e=>e.key)}),Object.assign(e.element.style,e.style);for(const i of n)e.element.style.setProperty(i.key,i.value);y(()=>{const t=Ro.get(e.key);if(t)if(1===t.activeCount){Ro.delete(e.key);for(const[n,r]of Object.entries(t.originalStyles))e.element.style[n]=r;for(const n of t.properties)e.element.style.removeProperty(n);0===e.element.style.length&&e.element.removeAttribute("style"),e.cleanup?.()}else t.activeCount--})})},Ho=(e,t)=>{switch(t){case"x":return[e.clientWidth,e.scrollLeft,e.scrollWidth];case"y":return[e.clientHeight,e.scrollTop,e.scrollHeight]}},Go=(e,t)=>{const n=getComputedStyle(e),r="x"===t?n.overflowX:n.overflowY;return"auto"===r||"scroll"===r||"HTML"===e.tagName&&"visible"===r},[Uo,Vo]=t([]),jo=e=>[e.deltaX,e.deltaY],No=e=>e.changedTouches[0]?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0],Qo=(e,t,n,r)=>{const o=null!==r&&Wo(r,e),[i,s]=((e,t,n)=>{const r="x"===t&&"rtl"===window.getComputedStyle(e).direction?-1:1;let o=e,i=0,s=0,a=!1;do{const[e,l,d]=Ho(o,t),c=d-e-r*l;0===l&&0===c||!Go(o,t)||(i+=c,s+=l),o===(n??document.documentElement)?a=!0:o=o._$host??o.parentElement}while(o&&!a);return[i,s]})(e,t,o?r:void 0);return!(n>0&&Math.abs(i)<=1)&&!(n<0&&Math.abs(s)<1)},Wo=(e,t)=>{if(e.contains(t))return!0;let n=t;for(;n;){if(n===e)return!0;n=n._$host??n.parentElement}return!1},_o=e=>{const t=P({element:null,enabled:!0,hideScrollbar:!0,preventScrollbarShift:!0,preventScrollbarShiftMode:"padding",restoreScrollPosition:!0,allowPinchZoom:!1},e),n=$();let o=[0,0],i=null,s=null;r(()=>{Ln(t.enabled)&&(Vo(e=>[...e,n]),y(()=>{Vo(e=>e.filter(e=>e!==n))}))}),r(()=>{if(!Ln(t.enabled)||!Ln(t.hideScrollbar))return;const{body:e}=document,n=window.innerWidth-e.offsetWidth;if(Ln(t.preventScrollbarShift)){const r={overflow:"hidden"},o=[];n>0&&("padding"===Ln(t.preventScrollbarShiftMode)?r.paddingRight=`calc(${window.getComputedStyle(e).paddingRight} + ${n}px)`:r.marginRight=`calc(${window.getComputedStyle(e).marginRight} + ${n}px)`,o.push({key:"--scrollbar-width",value:`${n}px`}));const i=window.scrollY,s=window.scrollX;Bo({key:"prevent-scroll",element:e,style:r,properties:o,cleanup:()=>{Ln(t.restoreScrollPosition)&&n>0&&window.scrollTo(s,i)}})}else Bo({key:"prevent-scroll",element:e,style:{overflow:"hidden"}})}),r(()=>{var e;(e=n,Uo().indexOf(e)===Uo().length-1&&Ln(t.enabled))&&(document.addEventListener("wheel",l,{passive:!1}),document.addEventListener("touchstart",a,{passive:!1}),document.addEventListener("touchmove",d,{passive:!1}),y(()=>{document.removeEventListener("wheel",l),document.removeEventListener("touchstart",a),document.removeEventListener("touchmove",d)}))});const a=e=>{o=No(e),i=null,s=null},l=e=>{const n=e.target,r=Ln(t.element),o=jo(e),i=Math.abs(o[0])>Math.abs(o[1])?"x":"y",s="x"===i?o[0]:o[1],a=Qo(n,i,s,r);let l;l=!r||!Wo(r,n)||!a,l&&e.cancelable&&e.preventDefault()},d=e=>{const n=Ln(t.element),r=e.target;let a;if(2===e.touches.length)a=!Ln(t.allowPinchZoom);else{if(null==i||null===s){const t=No(e).map((e,t)=>o[t]-e),n=Math.abs(t[0])>Math.abs(t[1])?"x":"y";i=n,s="x"===n?t[0]:t[1]}if("range"===r.type)a=!1;else{const e=Qo(r,i,s,n);a=!n||!Wo(n,r)||!e}}a&&e.cancelable&&e.preventDefault()}},Xo=e();function Zo(){return h(Xo)}function Yo(){const e=Zo();if(void 0===e)throw new Error("[kobalte]: `useMenuContext` must be used within a `Menu` component");return e}var Jo=e();function ei(){const e=h(Jo);if(void 0===e)throw new Error("[kobalte]: `useMenuItemContext` must be used within a `Menu.Item` component");return e}var ti=e();function ni(){const e=h(ti);if(void 0===e)throw new Error("[kobalte]: `useMenuRootContext` must be used within a `MenuRoot` component");return e}function ri(e){let n;const r=ni(),s=Yo(),a=Tt({id:r.generateId(`item-${$()}`)},e),[l,d]=N(a,["ref","textValue","disabled","closeOnSelect","checked","indeterminate","onSelect","onPointerMove","onPointerLeave","onPointerDown","onPointerUp","onClick","onKeyDown","onMouseDown","onFocus"]),[c,u]=t(),[g,f]=t(),[p,h]=t(),y=()=>s.listState().selectionManager(),b=()=>d.id,m=()=>{l.onSelect?.(),l.closeOnSelect&&setTimeout(()=>{s.close(!0)})};an({getItem:()=>({ref:()=>n,type:"item",key:b(),textValue:l.textValue??p()?.textContent??n?.textContent??"",disabled:l.disabled??!1})});const v=En({key:b,selectionManager:y,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>l.disabled},()=>n),w=e=>{yt(e,l.onPointerMove),"mouse"===e.pointerType&&(l.disabled?s.onItemLeave(e):(s.onItemEnter(e),e.defaultPrevented||(vt(e.currentTarget),s.listState().selectionManager().setFocused(!0),s.listState().selectionManager().setFocusedKey(b()))))},x=e=>{yt(e,l.onPointerLeave),"mouse"===e.pointerType&&s.onItemLeave(e)},k=e=>{yt(e,l.onPointerUp),l.disabled||0!==e.button||m()},S=e=>{if(yt(e,l.onKeyDown),!e.repeat&&!l.disabled)switch(e.key){case"Enter":case" ":m()}},C=o(()=>l.indeterminate?"mixed":null!=l.checked?l.checked:void 0),E=o(()=>({"data-indeterminate":l.indeterminate?"":void 0,"data-checked":l.checked&&!l.indeterminate?"":void 0,"data-disabled":l.disabled?"":void 0,"data-highlighted":y().focusedKey()===b()?"":void 0})),q={isChecked:()=>l.checked,dataset:E,setLabelRef:h,generateId:at(()=>d.id),registerLabel:Rt(u),registerDescription:Rt(f)};return i(Jo.Provider,{value:q,get children(){return i(Gt,P({as:"div",ref(e){const t=Ge(e=>n=e,l.ref);"function"==typeof t&&t(e)},get tabIndex(){return v.tabIndex()},get"aria-checked"(){return C()},get"aria-disabled"(){return l.disabled},get"aria-labelledby"(){return c()},get"aria-describedby"(){return g()},get"data-key"(){return v.dataKey()},get onPointerDown(){return bt([l.onPointerDown,v.onPointerDown])},get onPointerUp(){return bt([k,v.onPointerUp])},get onClick(){return bt([l.onClick,v.onClick])},get onKeyDown(){return bt([S,v.onKeyDown])},get onMouseDown(){return bt([l.onMouseDown,v.onMouseDown])},get onFocus(){return bt([l.onFocus,v.onFocus])},onPointerMove:w,onPointerLeave:x},E,d))}})}function oi(e){const t=Tt({closeOnSelect:!1},e),[n,r]=N(t,["checked","defaultChecked","onChange","onSelect"]),o=function(e={}){const[t,n]=Zt({value:()=>Z(e.isSelected),defaultValue:()=>!!Z(e.defaultIsSelected),onChange:t=>e.onSelectedChange?.(t)});return{isSelected:t,setIsSelected:t=>{Z(e.isReadOnly)||Z(e.isDisabled)||n(t)},toggle:()=>{Z(e.isReadOnly)||Z(e.isDisabled)||n(!t())}}}({isSelected:()=>n.checked,defaultIsSelected:()=>n.defaultChecked,onSelectedChange:e=>n.onChange?.(e),isDisabled:()=>r.disabled});return i(ri,P({role:"menuitemcheckbox",get checked(){return o.isSelected()},onSelect:()=>{n.onSelect?.(),o.toggle()}},r))}var ii=e();function si(){return h(ii)}var ai={next:(e,t)=>"ltr"===e?"horizontal"===t?"ArrowRight":"ArrowDown":"horizontal"===t?"ArrowLeft":"ArrowUp",previous:(e,t)=>ai.next("ltr"===e?"rtl":"ltr",t)},li=e=>"horizontal"===e?"ArrowDown":"ArrowRight",di=e=>"horizontal"===e?"ArrowUp":"ArrowLeft";function ci(e){const t=ni(),n=Yo(),s=si(),{direction:l}=mn(),d=Tt({id:t.generateId("trigger")},e),[c,u]=N(d,["ref","id","disabled","onPointerDown","onClick","onKeyDown","onMouseOver","onFocus"]);let g=()=>t.value();void 0!==s&&(g=()=>t.value()??c.id,void 0===s.lastValue()&&s.setLastValue(g));const f=Bt(()=>n.triggerRef(),()=>"button"),p=o(()=>"a"===f()&&null!=n.triggerRef()?.getAttribute("href"));r(v(()=>s?.value(),e=>{p()&&e===g()&&n.triggerRef()?.focus()}));const h=()=>{void 0!==s?n.isOpen()?s.value()===g()&&s.closeMenu():(s.autoFocusMenu()||s.setAutoFocusMenu(!0),n.open(!1)):n.toggle(!0)};return r(()=>y(n.registerTriggerId(c.id))),i(Hn,P({ref(e){const t=Ge(n.setTriggerRef,c.ref);"function"==typeof t&&t(e)},get"data-kb-menu-value-trigger"(){return t.value()},get id(){return c.id},get disabled(){return c.disabled},"aria-haspopup":"true",get"aria-expanded"(){return n.isOpen()},get"aria-controls"(){return a(()=>!!n.isOpen())()?n.contentId():void 0},get"data-highlighted"(){return void 0!==g()&&s?.value()===g()||void 0},get tabIndex(){return void 0!==s?s.value()===g()||s.lastValue()===g()?0:-1:void 0},onPointerDown:e=>{yt(e,c.onPointerDown),e.currentTarget.dataset.pointerType=e.pointerType,c.disabled||"touch"===e.pointerType||0!==e.button||h()},onMouseOver:e=>{yt(e,c.onMouseOver),"touch"!==n.triggerRef()?.dataset.pointerType&&(c.disabled||void 0===s||void 0===s.value()||s.setValue(g))},onClick:e=>{yt(e,c.onClick),c.disabled||"touch"===e.currentTarget.dataset.pointerType&&h()},onKeyDown:e=>{if(yt(e,c.onKeyDown),!c.disabled){if(p())switch(e.key){case"Enter":case" ":return}switch(e.key){case"Enter":case" ":case li(t.orientation()):e.stopPropagation(),e.preventDefault(),function(e){if(document.contains(e)){const t=document.scrollingElement||document.documentElement;if("hidden"===window.getComputedStyle(t).overflow){let n=Ft(e);for(;e&&n&&e!==t&&n!==t;)Pt(n,e),n=Ft(e=n)}else{const{left:t,top:n}=e.getBoundingClientRect();e?.scrollIntoView?.({block:"nearest"});const{left:r,top:o}=e.getBoundingClientRect();(Math.abs(t-r)>1||Math.abs(n-o)>1)&&e.scrollIntoView?.({block:"nearest"})}}}(e.currentTarget),n.open("first"),s?.setAutoFocusMenu(!0),s?.setValue(g);break;case di(t.orientation()):e.stopPropagation(),e.preventDefault(),n.open("last");break;case ai.next(l(),t.orientation()):if(void 0===s)break;e.stopPropagation(),e.preventDefault(),s.nextMenu();break;case ai.previous(l(),t.orientation()):if(void 0===s)break;e.stopPropagation(),e.preventDefault(),s.previousMenu()}}},onFocus:e=>{yt(e,c.onFocus),void 0!==s&&"touch"!==e.currentTarget.dataset.pointerType&&s.setValue(g)},role:void 0!==s?"menuitem":void 0},()=>n.dataset(),u))}var ui=e();function gi(){return h(ui)}function fi(e){let t;const n=ni(),o=Yo(),s=si(),d=gi(),{direction:c}=mn(),u=Tt({id:n.generateId(`content-${$()}`)},e),[g,f]=N(u,["ref","id","style","onOpenAutoFocus","onCloseAutoFocus","onEscapeKeyDown","onFocusOutside","onPointerEnter","onPointerMove","onKeyDown","onMouseDown","onFocusIn","onFocusOut"]);let p=0;const h=()=>null==o.parentMenuContext()&&void 0===s&&n.isModal(),b=Fo({selectionManager:o.listState().selectionManager,collection:o.listState().collection,autoFocus:o.autoFocus,deferAutoFocus:!0,shouldFocusWrap:!0,disallowTypeAhead:()=>!o.listState().selectionManager().isFocused(),orientation:()=>"horizontal"===n.orientation()?"vertical":"horizontal"},()=>t);Io({trapFocus:()=>h()&&o.isOpen(),onMountAutoFocus:e=>{void 0===s&&g.onOpenAutoFocus?.(e)},onUnmountAutoFocus:g.onCloseAutoFocus},()=>t);const m=e=>{g.onEscapeKeyDown?.(e),s?.setAutoFocusMenu(!1),o.close(!0)},v=e=>{g.onFocusOutside?.(e),n.isModal()&&e.preventDefault()};r(()=>y(o.registerContentId(g.id)));const w={ref:Ge(e=>{o.setContentRef(e),t=e},g.ref),role:"menu",get id(){return g.id},get tabIndex(){return b.tabIndex()},get"aria-labelledby"(){return o.triggerId()},onKeyDown:bt([g.onKeyDown,b.onKeyDown,e=>{if(lt(e.currentTarget,e.target)&&("Tab"===e.key&&o.isOpen()&&e.preventDefault(),void 0!==s&&"true"!==e.currentTarget.getAttribute("aria-haspopup")))switch(e.key){case ai.next(c(),n.orientation()):e.stopPropagation(),e.preventDefault(),o.close(!0),s.setAutoFocusMenu(!0),s.nextMenu();break;case ai.previous(c(),n.orientation()):if(e.currentTarget.hasAttribute("data-closed"))break;e.stopPropagation(),e.preventDefault(),o.close(!0),s.setAutoFocusMenu(!0),s.previousMenu()}}]),onMouseDown:bt([g.onMouseDown,b.onMouseDown]),onFocusIn:bt([g.onFocusIn,b.onFocusIn]),onFocusOut:bt([g.onFocusOut,b.onFocusOut]),onPointerEnter:e=>{yt(e,g.onPointerEnter),o.isOpen()&&(o.parentMenuContext()?.listState().selectionManager().setFocused(!1),o.parentMenuContext()?.listState().selectionManager().setFocusedKey(void 0))},onPointerMove:e=>{if(yt(e,g.onPointerMove),"mouse"!==e.pointerType)return;const t=e.target,n=p!==e.clientX;lt(e.currentTarget,t)&&n&&(o.setPointerDir(e.clientX>p?"right":"left"),p=e.clientX)},get"data-orientation"(){return n.orientation()}};return i(l,{get when(){return o.contentPresent()},get children(){return i(l,{get when(){return void 0===d||null!=o.parentMenuContext()},get fallback(){return i(Gt,P({as:"div"},()=>o.dataset(),w,f))},get children(){return i(ao.Positioner,{get children(){return i(go,P({get disableOutsidePointerEvents(){return a(()=>!!h())()&&o.isOpen()},get excludedElements(){return[o.triggerRef]},bypassTopMostLayerCheck:!0,get style(){return rt({"--kb-menu-content-transform-origin":"var(--kb-popper-content-transform-origin)",position:"relative"},g.style)},onEscapeKeyDown:m,onFocusOutside:v,get onDismiss(){return o.close}},()=>o.dataset(),w,f))}})}})}})}function pi(e){let t;const n=ni(),r=Yo(),[o,s]=N(e,["ref"]);return _o({element:()=>t??null,enabled:()=>r.contentPresent()&&n.preventScroll()}),i(fi,P({ref(e){const n=Ge(e=>{t=e},o.ref);"function"==typeof n&&n(e)}},s))}var hi=e();function yi(e){const n=Tt({id:ni().generateId(`group-${$()}`)},e),[r,o]=t(),s={generateId:at(()=>n.id),registerLabelId:Rt(o)};return i(hi.Provider,{value:s,get children(){return i(Gt,P({as:"div",role:"group",get"aria-labelledby"(){return r()}},n))}})}function bi(e){const t=function(){const e=h(hi);if(void 0===e)throw new Error("[kobalte]: `useMenuGroupContext` must be used within a `Menu.Group` component");return e}(),n=Tt({id:t.generateId("label")},e),[o,s]=N(n,["id"]);return r(()=>y(t.registerLabelId(o.id))),i(Gt,P({as:"span",get id(){return o.id},"aria-hidden":"true"},s))}function mi(e){const t=Yo(),n=Tt({children:"▼"},e);return i(Gt,P({as:"span","aria-hidden":"true"},()=>t.dataset(),n))}function vi(e){return i(ri,P({role:"menuitem",closeOnSelect:!0},e))}function wi(e){const t=ei(),n=Tt({id:t.generateId("description")},e),[o,s]=N(n,["id"]);return r(()=>y(t.registerDescription(o.id))),i(Gt,P({as:"div",get id(){return o.id}},()=>t.dataset(),s))}function xi(e){const t=ei(),n=Tt({id:t.generateId("indicator")},e),[r,o]=N(n,["forceMount"]);return i(l,{get when(){return r.forceMount||t.isChecked()},get children(){return i(Gt,P({as:"div"},()=>t.dataset(),o))}})}function ki(e){const t=ei(),n=Tt({id:t.generateId("label")},e),[o,s]=N(n,["ref","id"]);return r(()=>y(t.registerLabel(o.id))),i(Gt,P({as:"div",ref(e){const n=Ge(t.setLabelRef,o.ref);"function"==typeof n&&n(e)},get id(){return o.id}},()=>t.dataset(),s))}function $i(e){const t=Yo();return i(l,{get when(){return t.contentPresent()},get children(){return i(s,e)}})}var Si=e();function Ci(e){const t=Tt({id:ni().generateId(`radiogroup-${$()}`)},e),[n,r]=N(t,["value","defaultValue","onChange","disabled"]),[o,s]=Xt({value:()=>n.value,defaultValue:()=>n.defaultValue,onChange:e=>n.onChange?.(e)}),a={isDisabled:()=>n.disabled,isSelectedValue:e=>e===o(),setSelectedValue:s};return i(Si.Provider,{value:a,get children(){return i(yi,r)}})}function Ei(e){const t=function(){const e=h(Si);if(void 0===e)throw new Error("[kobalte]: `useMenuRadioGroupContext` must be used within a `Menu.RadioGroup` component");return e}(),n=Tt({closeOnSelect:!1},e),[r,o]=N(n,["value","onSelect"]);return i(ri,P({role:"menuitemradio",get checked(){return t.isSelectedValue(r.value)},onSelect:()=>{r.onSelect?.(),t.setSelectedValue(r.value)}},o))}function qi(e,t,n){const r=e.split("-")[0],o=n.getBoundingClientRect(),i=[],s=t.clientX,a=t.clientY;switch(r){case"top":i.push([s,a+5]),i.push([o.left,o.bottom]),i.push([o.left,o.top]),i.push([o.right,o.top]),i.push([o.right,o.bottom]);break;case"right":i.push([s-5,a]),i.push([o.left,o.top]),i.push([o.right,o.top]),i.push([o.right,o.bottom]),i.push([o.left,o.bottom]);break;case"bottom":i.push([s,a-5]),i.push([o.right,o.top]),i.push([o.right,o.bottom]),i.push([o.left,o.bottom]),i.push([o.left,o.top]);break;case"left":i.push([s+5,a]),i.push([o.right,o.bottom]),i.push([o.left,o.bottom]),i.push([o.left,o.top]),i.push([o.right,o.top])}return i}function Mi(e){const n=ni(),s=tn(),a=Zo(),d=si(),c=gi(),u=Tt({placement:"horizontal"===n.orientation()?"bottom-start":"right-start"},e),[g,f]=N(u,["open","defaultOpen","onOpenChange"]);let p=0,h=null,b="right";const[m,v]=t(),[w,x]=t(),[k,$]=t(),[S,C]=t(),[E,q]=t(!0),[M,F]=t(f.placement),[L,D]=t([]),[T,A]=t([]),{DomCollectionProvider:I}=sn({items:T,onItemsChange:A}),O=fo({open:()=>g.open,defaultOpen:()=>g.defaultOpen,onOpenChange:e=>g.onOpenChange?.(e)}),{present:z}=Dn({show:()=>n.forceMount()||O.isOpen(),element:()=>S()??null}),K=function(e){const t=Sn(e),n=dn({dataSource:()=>Z(e.dataSource),getKey:()=>Z(e.getKey),getTextValue:()=>Z(e.getTextValue),getDisabled:()=>Z(e.getDisabled),getSectionChildren:()=>Z(e.getSectionChildren),factory:t=>e.filter?new Mn(e.filter(t)):new Mn(t)},[()=>e.filter]),r=new qn(n,t);return W(()=>{const e=t.focusedKey();null==e||n().getItem(e)||t.setFocusedKey(void 0)}),{collection:n,selectionManager:()=>r}}({selectionMode:"none",dataSource:T}),R=e=>{q(e),O.open()},B=(e=!1)=>{O.close(),e&&a&&a.close(!0)},H=()=>{const e=S();e&&(vt(e),K.selectionManager().setFocused(!0),K.selectionManager().setFocusedKey(void 0))},G=()=>{null!=c?setTimeout(()=>H()):H()},U=e=>{return b===h?.side&&(t=e,n=h?.area,!!n&&function(e,t){const[n,r]=e;let o=!1;for(let i=t.length,s=0,a=i-1;s<i;a=s++){const[e,l]=t[s],[d,c]=t[a],[,u]=t[0===a?i-1:a-1]||[0,0],g=(l-c)*(n-e)-(e-d)*(r-l);if(c<l){if(r>=c&&r<l){if(0===g)return!0;g>0&&(r===c?r>u&&(o=!o):o=!o)}}else if(l<c){if(r>l&&r<=c){if(0===g)return!0;g<0&&(r===c?r<u&&(o=!o):o=!o)}}else if(r==l&&(n>=d&&n<=e||n>=e&&n<=d))return!0}return o}([t.clientX,t.clientY],n));var t,n};Po({isDisabled:()=>!(null==a&&O.isOpen()&&n.isModal()),targets:()=>[S(),...L()].filter(Boolean)}),r(()=>{const e=S();if(!e||!a)return;const t=a.registerNestedMenu(e);y(()=>{t()})}),r(()=>{void 0===a&&d?.registerMenu(n.value(),[S(),...L()])}),r(()=>{void 0===a&&void 0!==d&&(d.value()===n.value()?(k()?.focus(),d.autoFocusMenu()&&R(!0)):B())}),r(()=>{void 0===a&&void 0!==d&&O.isOpen()&&d.setValue(n.value())}),y(()=>{void 0===a&&d?.unregisterMenu(n.value())});const V={dataset:o(()=>({"data-expanded":O.isOpen()?"":void 0,"data-closed":O.isOpen()?void 0:""})),isOpen:O.isOpen,contentPresent:z,nestedMenus:L,currentPlacement:M,pointerGraceTimeoutId:()=>p,autoFocus:E,listState:()=>K,parentMenuContext:()=>a,triggerRef:k,contentRef:S,triggerId:m,contentId:w,setTriggerRef:$,setContentRef:C,open:R,close:B,toggle:e=>{q(e),O.toggle()},focusContent:G,onItemEnter:e=>{U(e)&&e.preventDefault()},onItemLeave:e=>{U(e)||G()},onTriggerLeave:e=>{U(e)&&e.preventDefault()},setPointerDir:e=>b=e,setPointerGraceTimeoutId:e=>p=e,setPointerGraceIntent:e=>h=e,registerNestedMenu:e=>{D(t=>[...t,e]);const t=a?.registerNestedMenu(e);return()=>{D(t=>ot(t,e)),t?.()}},registerItemToParentDomCollection:s?.registerItem,registerTriggerId:Rt(v),registerContentId:Rt(x)};return i(I,{get children(){return i(Xo.Provider,{value:V,get children(){return i(l,{when:void 0===c,get fallback(){return f.children},get children(){return i(ao,P({anchorRef:k,contentRef:S,onCurrentPlacementChange:F},f))}})}})}})}function Fi(e){const{direction:t}=mn();return i(Mi,P({get placement(){return"rtl"===t()?"left-start":"right-start"},flip:!0},e))}var Li=(e,t)=>"ltr"===e?["horizontal"===t?"ArrowLeft":"ArrowUp"]:["horizontal"===t?"ArrowRight":"ArrowDown"];function Di(e){const t=Yo(),n=ni(),[r,o]=N(e,["onFocusOutside","onKeyDown"]),{direction:s}=mn();return i(fi,P({onOpenAutoFocus:e=>{e.preventDefault()},onCloseAutoFocus:e=>{e.preventDefault()},onFocusOutside:e=>{r.onFocusOutside?.(e);const n=e.target;lt(t.triggerRef(),n)||t.close()},onKeyDown:e=>{yt(e,r.onKeyDown);const o=lt(e.currentTarget,e.target),i=Li(s(),n.orientation()).includes(e.key),a=null!=t.parentMenuContext();o&&i&&a&&(t.close(),vt(t.triggerRef()))}},o))}var Ti=["Enter"," "],Ai=(e,t)=>"ltr"===e?[...Ti,"horizontal"===t?"ArrowRight":"ArrowDown"]:[...Ti,"horizontal"===t?"ArrowLeft":"ArrowUp"];function Ii(e){let t;const n=ni(),o=Yo(),s=Tt({id:n.generateId(`sub-trigger-${$()}`)},e),[l,d]=N(s,["ref","id","textValue","disabled","onPointerMove","onPointerLeave","onPointerDown","onPointerUp","onClick","onKeyDown","onMouseDown","onFocus"]);let c=null;const u=()=>{c&&window.clearTimeout(c),c=null},{direction:g}=mn(),f=()=>l.id,p=()=>{const e=o.parentMenuContext();if(null==e)throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");return e.listState().selectionManager()},h=En({key:f,selectionManager:p,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>l.disabled},()=>t),b=e=>{yt(e,l.onClick),o.isOpen()||l.disabled||o.open(!0)},m=e=>{yt(e,l.onKeyDown),e.repeat||l.disabled||Ai(g(),n.orientation()).includes(e.key)&&(e.stopPropagation(),e.preventDefault(),p().setFocused(!1),p().setFocusedKey(void 0),o.isOpen()||o.open("first"),o.focusContent(),o.listState().selectionManager().setFocused(!0),o.listState().selectionManager().setFocusedKey(o.listState().collection().getFirstKey()))};return r(()=>{if(null==o.registerItemToParentDomCollection)throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");const e=o.registerItemToParentDomCollection({ref:()=>t,type:"item",key:f(),textValue:l.textValue??t?.textContent??"",disabled:l.disabled??!1});y(e)}),r(v(()=>o.parentMenuContext()?.pointerGraceTimeoutId(),e=>{y(()=>{window.clearTimeout(e),o.parentMenuContext()?.setPointerGraceIntent(null)})})),r(()=>y(o.registerTriggerId(l.id))),y(()=>{u()}),i(Gt,P({as:"div",ref(e){const n=Ge(e=>{o.setTriggerRef(e),t=e},l.ref);"function"==typeof n&&n(e)},get id(){return l.id},role:"menuitem",get tabIndex(){return h.tabIndex()},"aria-haspopup":"true",get"aria-expanded"(){return o.isOpen()},get"aria-controls"(){return a(()=>!!o.isOpen())()?o.contentId():void 0},get"aria-disabled"(){return l.disabled},get"data-key"(){return h.dataKey()},get"data-highlighted"(){return p().focusedKey()===f()?"":void 0},get"data-disabled"(){return l.disabled?"":void 0},get onPointerDown(){return bt([l.onPointerDown,h.onPointerDown])},get onPointerUp(){return bt([l.onPointerUp,h.onPointerUp])},get onClick(){return bt([b,h.onClick])},get onKeyDown(){return bt([m,h.onKeyDown])},get onMouseDown(){return bt([l.onMouseDown,h.onMouseDown])},get onFocus(){return bt([l.onFocus,h.onFocus])},onPointerMove:e=>{if(yt(e,l.onPointerMove),"mouse"!==e.pointerType)return;const t=o.parentMenuContext();t?.onItemEnter(e),e.defaultPrevented||(l.disabled?t?.onItemLeave(e):(o.isOpen()||c||(o.parentMenuContext()?.setPointerGraceIntent(null),c=window.setTimeout(()=>{o.open(!1),u()},100)),t?.onItemEnter(e),e.defaultPrevented||(o.listState().selectionManager().isFocused()&&(o.listState().selectionManager().setFocused(!1),o.listState().selectionManager().setFocusedKey(void 0)),vt(e.currentTarget),t?.listState().selectionManager().setFocused(!0),t?.listState().selectionManager().setFocusedKey(f()))))},onPointerLeave:e=>{if(yt(e,l.onPointerLeave),"mouse"!==e.pointerType)return;u();const t=o.parentMenuContext(),n=o.contentRef();if(n){t?.setPointerGraceIntent({area:qi(o.currentPlacement(),e,n),side:o.currentPlacement().split("-")[0]}),window.clearTimeout(t?.pointerGraceTimeoutId());const r=window.setTimeout(()=>{t?.setPointerGraceIntent(null)},300);t?.setPointerGraceTimeoutId(r)}else{if(t?.onTriggerLeave(e),e.defaultPrevented)return;t?.setPointerGraceIntent(null)}t?.onItemLeave(e)}},()=>o.dataset(),d))}function Oi(e){const t=si(),n=Tt({id:`menu-${$()}`,modal:!0},e),[r,o]=N(n,["id","modal","preventScroll","forceMount","open","defaultOpen","onOpenChange","value","orientation"]),s=fo({open:()=>r.open,defaultOpen:()=>r.defaultOpen,onOpenChange:e=>r.onOpenChange?.(e)}),a={isModal:()=>r.modal??!0,preventScroll:()=>r.preventScroll??a.isModal(),forceMount:()=>r.forceMount??!1,generateId:at(()=>r.id),value:()=>r.value,orientation:()=>r.orientation??t?.orientation()??"horizontal"};return i(ti.Provider,{value:a,get children(){return i(Mi,P({get open(){return s.isOpen()},get onOpenChange(){return s.setIsOpen}},o))}})}function Pi(e){let t;const n=Tt({orientation:"horizontal"},e),[r,o]=N(n,["ref","orientation"]),s=Bt(()=>t,()=>"hr");return i(Gt,P({as:"hr",ref(e){const n=Ge(e=>t=e,r.ref);"function"==typeof n&&n(e)},get role(){return"hr"!==s()?"separator":void 0},get"aria-orientation"(){return"vertical"===r.orientation?"vertical":void 0},get"data-orientation"(){return r.orientation}},o))}Jt({},{Root:()=>Pi,Separator:()=>zi});var zi=Pi,Ki={};function Ri(e){const t=ni(),n=Yo(),[r,o]=N(e,["onCloseAutoFocus","onInteractOutside"]);let s=!1;return i(pi,P({onCloseAutoFocus:e=>{r.onCloseAutoFocus?.(e),s||vt(n.triggerRef()),s=!1,e.preventDefault()},onInteractOutside:e=>{r.onInteractOutside?.(e),t.isModal()&&!e.detail.isContextMenu||(s=!0)}},o))}function Bi(e){const t=Tt({id:`dropdownmenu-${$()}`},e);return i(Oi,t)}Jt(Ki,{Arrow:()=>ro,CheckboxItem:()=>oi,Content:()=>Ri,DropdownMenu:()=>Hi,Group:()=>yi,GroupLabel:()=>bi,Icon:()=>mi,Item:()=>vi,ItemDescription:()=>wi,ItemIndicator:()=>xi,ItemLabel:()=>ki,Portal:()=>$i,RadioGroup:()=>Ci,RadioItem:()=>Ei,Root:()=>Bi,Separator:()=>Pi,Sub:()=>Fi,SubContent:()=>Di,SubTrigger:()=>Ii,Trigger:()=>ci});var Hi=Object.assign(Bi,{Arrow:ro,CheckboxItem:oi,Content:Ri,Group:yi,GroupLabel:bi,Icon:mi,Item:vi,ItemDescription:wi,ItemIndicator:xi,ItemLabel:ki,Portal:$i,RadioGroup:Ci,RadioItem:Ei,Separator:Pi,Sub:Fi,SubContent:Di,SubTrigger:Ii,Trigger:ci}),Gi={colors:{inherit:"inherit",current:"currentColor",transparent:"transparent",black:"#000000",white:"#ffffff",neutral:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},darkGray:{50:"#525c7a",100:"#49536e",200:"#414962",300:"#394056",400:"#313749",500:"#292e3d",600:"#212530",700:"#191c24",800:"#111318",900:"#0b0d10"},gray:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},blue:{25:"#F5FAFF",50:"#EFF8FF",100:"#D1E9FF",200:"#B2DDFF",300:"#84CAFF",400:"#53B1FD",500:"#2E90FA",600:"#1570EF",700:"#175CD3",800:"#1849A9",900:"#194185"},green:{25:"#F6FEF9",50:"#ECFDF3",100:"#D1FADF",200:"#A6F4C5",300:"#6CE9A6",400:"#32D583",500:"#12B76A",600:"#039855",700:"#027A48",800:"#05603A",900:"#054F31"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a"},yellow:{25:"#FFFCF5",50:"#FFFAEB",100:"#FEF0C7",200:"#FEDF89",300:"#FEC84B",400:"#FDB022",500:"#F79009",600:"#DC6803",700:"#B54708",800:"#93370D",900:"#7A2E0E"},purple:{25:"#FAFAFF",50:"#F4F3FF",100:"#EBE9FE",200:"#D9D6FE",300:"#BDB4FE",400:"#9B8AFB",500:"#7A5AF8",600:"#6938EF",700:"#5925DC",800:"#4A1FB8",900:"#3E1C96"},teal:{25:"#F6FEFC",50:"#F0FDF9",100:"#CCFBEF",200:"#99F6E0",300:"#5FE9D0",400:"#2ED3B7",500:"#15B79E",600:"#0E9384",700:"#107569",800:"#125D56",900:"#134E48"},pink:{25:"#fdf2f8",50:"#fce7f3",100:"#fbcfe8",200:"#f9a8d4",300:"#f472b6",400:"#ec4899",500:"#db2777",600:"#be185d",700:"#9d174d",800:"#831843",900:"#500724"},cyan:{25:"#ecfeff",50:"#cffafe",100:"#a5f3fc",200:"#67e8f9",300:"#22d3ee",400:"#06b6d4",500:"#0891b2",600:"#0e7490",700:"#155e75",800:"#164e63",900:"#083344"}},alpha:{90:"e5",80:"cc"},font:{size:{xs:"calc(var(--tsqd-font-size) * 0.75)",sm:"calc(var(--tsqd-font-size) * 0.875)",md:"var(--tsqd-font-size)"},lineHeight:{xs:"calc(var(--tsqd-font-size) * 1)",sm:"calc(var(--tsqd-font-size) * 1.25)",md:"calc(var(--tsqd-font-size) * 1.5)"},weight:{medium:"500",semibold:"600",bold:"700"}},border:{radius:{xs:"calc(var(--tsqd-font-size) * 0.125)",sm:"calc(var(--tsqd-font-size) * 0.25)",full:"9999px"}},size:{.25:"calc(var(--tsqd-font-size) * 0.0625)",.5:"calc(var(--tsqd-font-size) * 0.125)",1:"calc(var(--tsqd-font-size) * 0.25)",1.5:"calc(var(--tsqd-font-size) * 0.375)",2:"calc(var(--tsqd-font-size) * 0.5)",2.5:"calc(var(--tsqd-font-size) * 0.625)",3:"calc(var(--tsqd-font-size) * 0.75)",3.5:"calc(var(--tsqd-font-size) * 0.875)",4:"calc(var(--tsqd-font-size) * 1)",4.5:"calc(var(--tsqd-font-size) * 1.125)",5:"calc(var(--tsqd-font-size) * 1.25)",6:"calc(var(--tsqd-font-size) * 1.5)",6.5:"calc(var(--tsqd-font-size) * 1.625)",14:"calc(var(--tsqd-font-size) * 3.5)"},shadow:{xs:(e="rgb(0 0 0 / 0.1)")=>"0 1px 2px 0 rgb(0 0 0 / 0.05)",sm:(e="rgb(0 0 0 / 0.1)")=>`0 1px 3px 0 ${e}, 0 1px 2px -1px ${e}`,md:(e="rgb(0 0 0 / 0.1)")=>`0 4px 6px -1px ${e}, 0 2px 4px -2px ${e}`,lg:(e="rgb(0 0 0 / 0.1)")=>`0 10px 15px -3px ${e}, 0 4px 6px -4px ${e}`,xl:(e="rgb(0 0 0 / 0.1)")=>`0 20px 25px -5px ${e}, 0 8px 10px -6px ${e}`,"2xl":(e="rgb(0 0 0 / 0.25)")=>`0 25px 50px -12px ${e}`,inner:(e="rgb(0 0 0 / 0.05)")=>`inset 0 2px 4px 0 ${e}`,none:()=>"none"}},Ui=d('<svg width=14 height=14 viewBox="0 0 14 14"fill=none xmlns=http://www.w3.org/2000/svg><path d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),Vi=d('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),ji=d('<svg width=10 height=6 viewBox="0 0 10 6"fill=none xmlns=http://www.w3.org/2000/svg><path d="M1 1L5 5L9 1"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),Ni=d('<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 13.3333V2.66667M8 2.66667L4 6.66667M8 2.66667L12 6.66667"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),Qi=d('<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>'),Wi=d('<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),_i=d('<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 15.844a10.424 10.424 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.464 10.464 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Xi=d('<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 21h8m-4-4v4m-5.2-4h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 14.72 22 13.88 22 12.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 3 18.88 3 17.2 3H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 5.28 2 6.12 2 7.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 17 5.12 17 6.8 17Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Zi=d('<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M0 0h24v24H0z"></path><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z">'),Yi=d('<svg stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"></path><path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4a9.793 9.793 0 00-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24A9.684 9.684 0 005 13v.01L6.99 15a7.042 7.042 0 014.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3a4.237 4.237 0 00-6 0z">'),Ji=d('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.3951 19.3711L9.97955 20.6856C10.1533 21.0768 10.4368 21.4093 10.7958 21.6426C11.1547 21.8759 11.5737 22.0001 12.0018 22C12.4299 22.0001 12.8488 21.8759 13.2078 21.6426C13.5667 21.4093 13.8503 21.0768 14.024 20.6856L14.6084 19.3711C14.8165 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5678 17.8941 17.0784 17.9478L18.5084 18.1C18.9341 18.145 19.3637 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8715 16.635 20.9735 16.2103 20.9511 15.7829C20.9286 15.3555 20.7825 14.9438 20.5307 14.5978L19.684 13.4344C19.3825 13.0171 19.2214 12.5148 19.224 12C19.2239 11.4866 19.3865 10.9864 19.6884 10.5711L20.5351 9.40778C20.787 9.06175 20.933 8.65007 20.9555 8.22267C20.978 7.79528 20.8759 7.37054 20.6618 7C20.4479 6.62923 20.131 6.32849 19.7496 6.13423C19.3681 5.93997 18.9386 5.86053 18.5129 5.90556L17.0829 6.05778C16.5722 6.11141 16.0577 6.00212 15.6129 5.74556C15.17 5.48825 14.82 5.09736 14.6129 4.62889L14.024 3.31444C13.8503 2.92317 13.5667 2.59072 13.2078 2.3574C12.8488 2.12408 12.4299 1.99993 12.0018 2C11.5737 1.99993 11.1547 2.12408 10.7958 2.3574C10.4368 2.59072 10.1533 2.92317 9.97955 3.31444L9.3951 4.62889C9.18803 5.09736 8.83798 5.48825 8.3951 5.74556C7.95032 6.00212 7.43577 6.11141 6.9251 6.05778L5.49066 5.90556C5.06499 5.86053 4.6354 5.93997 4.25397 6.13423C3.87255 6.32849 3.55567 6.62923 3.34177 7C3.12759 7.37054 3.02555 7.79528 3.04804 8.22267C3.07052 8.65007 3.21656 9.06175 3.46844 9.40778L4.3151 10.5711C4.61704 10.9864 4.77964 11.4866 4.77955 12C4.77964 12.5134 4.61704 13.0137 4.3151 13.4289L3.46844 14.5922C3.21656 14.9382 3.07052 15.3499 3.04804 15.7773C3.02555 16.2047 3.12759 16.6295 3.34177 17C3.55589 17.3706 3.8728 17.6712 4.25417 17.8654C4.63554 18.0596 5.06502 18.1392 5.49066 18.0944L6.92066 17.9422C7.43133 17.8886 7.94587 17.9979 8.39066 18.2544C8.83519 18.511 9.18687 18.902 9.3951 19.3711Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),es=d('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),ts=d('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path class=copier d="M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round stroke=currentColor>'),ns=d('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.5 21.4998L8.04927 19.3655C8.40421 19.229 8.58168 19.1607 8.74772 19.0716C8.8952 18.9924 9.0358 18.901 9.16804 18.7984C9.31692 18.6829 9.45137 18.5484 9.72028 18.2795L21 6.99982C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8955 1.89525 18.1046 1.89524 17 2.99981L5.72028 14.2795C5.45138 14.5484 5.31692 14.6829 5.20139 14.8318C5.09877 14.964 5.0074 15.1046 4.92823 15.2521C4.83911 15.4181 4.77085 15.5956 4.63433 15.9506L2.5 21.4998ZM2.5 21.4998L4.55812 16.1488C4.7054 15.7659 4.77903 15.5744 4.90534 15.4867C5.01572 15.4101 5.1523 15.3811 5.2843 15.4063C5.43533 15.4351 5.58038 15.5802 5.87048 15.8703L8.12957 18.1294C8.41967 18.4195 8.56472 18.5645 8.59356 18.7155C8.61877 18.8475 8.58979 18.9841 8.51314 19.0945C8.42545 19.2208 8.23399 19.2944 7.85107 19.4417L2.5 21.4998Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),rs=d('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),os=d('<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke=#F04438 stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),is=d('<svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 xmlns=http://www.w3.org/2000/svg><rect class=list width=20 height=20 y=2 x=2 rx=2></rect><line class=list-item y1=7 y2=7 x1=6 x2=18></line><line class=list-item y2=12 y1=12 x1=6 x2=18></line><line class=list-item y1=17 y2=17 x1=6 x2=18>'),ss=d('<svg viewBox="0 0 24 24"height=20 width=20 fill=none xmlns=http://www.w3.org/2000/svg><path d="M3 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C5.28 3 6.12 3 7.8 3h8.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C21 5.28 21 6.12 21 7.8v8.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V7.8Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),as=d('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),ls=d('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><animateTransform attributeName=transform attributeType=XML type=rotate from=0 to=360 dur=2s repeatCount=indefinite>'),ds=d('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),cs=d('<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),us=d('<svg version=1.0 viewBox="0 0 633 633"><linearGradient x1=-666.45 x2=-666.45 y1=163.28 y2=163.99 gradientTransform="matrix(633 0 0 633 422177 -103358)"gradientUnits=userSpaceOnUse><stop stop-color=#6BDAFF offset=0></stop><stop stop-color=#F9FFB5 offset=.32></stop><stop stop-color=#FFA770 offset=.71></stop><stop stop-color=#FF7373 offset=1></stop></linearGradient><circle cx=316.5 cy=316.5 r=316.5></circle><defs><filter x=-137.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=316.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=316.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=316.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=272.2 y=308 width=176.9 height=129.3 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=272.2 y=308 width=176.9 height=129.3 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><line x1=436 x2=431 y1=403.2 y2=431.8 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=291 x2=280 y1=341.5 y2=403.5 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=332.9 x2=328.6 y1=384.1 y2=411.2 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><linearGradient x1=-670.75 x2=-671.59 y1=164.4 y2=164.49 gradientTransform="matrix(-184.16 -32.472 -11.461 64.997 -121359 -32126)"gradientUnits=userSpaceOnUse><stop stop-color=#EE2700 offset=0></stop><stop stop-color=#FF008E offset=1></stop></linearGradient><path d="m344.1 363 97.7 17.2c5.8 2.1 8.2 6.1 7.1 12.1s-4.7 9.2-11 9.9l-106-18.7-57.5-59.2c-3.2-4.8-2.9-9.1 0.8-12.8s8.3-4.4 13.7-2.1l55.2 53.6z"clip-rule=evenodd fill-rule=evenodd></path><line x1=428.2 x2=429.1 y1=384.5 y2=378 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=395.2 x2=396.1 y1=379.5 y2=373 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=362.2 x2=363.1 y1=373.5 y2=367.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=324.2 x2=328.4 y1=351.3 y2=347.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=303.2 x2=307.4 y1=331.3 y2=327.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line></g><defs><filter x=73.2 y=113.8 width=280.6 height=317.4 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=73.2 y=113.8 width=280.6 height=317.4 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-672.16 x2=-672.16 y1=165.03 y2=166.03 gradientTransform="matrix(-100.18 48.861 97.976 200.88 -83342 -93.059)"gradientUnits=userSpaceOnUse><stop stop-color=#A17500 offset=0></stop><stop stop-color=#5D2100 offset=1></stop></linearGradient><path d="m192.3 203c8.1 37.3 14 73.6 17.8 109.1 3.8 35.4 2.8 75.1-3 119.2l61.2-16.7c-15.6-59-25.2-97.9-28.6-116.6s-10.8-51.9-22.1-99.6l-25.3 4.6"clip-rule=evenodd fill-rule=evenodd></path><g stroke=#2F8A00><linearGradient x1=-660.23 x2=-660.23 y1=166.72 y2=167.72 gradientTransform="matrix(92.683 4.8573 -2.0259 38.657 61680 -3088.6)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9s-12.6-22.1-36.5-29.9c-15.9-5.2-34.4-1.5-55.5 11.1 15.9 14.3 29.5 22.6 40.7 24.9 16.8 3.6 51.3-6.1 51.3-6.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-661.36 x2=-661.36 y1=164.18 y2=165.18 gradientTransform="matrix(110 5.7648 -6.3599 121.35 73933 -15933)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5s-47.5-8.5-83.2 15.7c-23.8 16.2-34.3 49.3-31.6 99.4 30.3-27.8 52.1-48.5 65.2-61.9 19.8-20.2 49.6-53.2 49.6-53.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.79 x2=-656.79 y1=165.15 y2=166.15 gradientTransform="matrix(62.954 3.2993 -3.5023 66.828 42156 -8754.1)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9c-0.8-21.9 6-38 20.6-48.2s29.8-15.4 45.5-15.3c-6.1 21.4-14.5 35.8-25.2 43.4s-24.4 14.2-40.9 20.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-663.07 x2=-663.07 y1=165.44 y2=166.44 gradientTransform="matrix(152.47 7.9907 -3.0936 59.029 101884 -4318.7)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c31.9-30 64.1-39.7 96.7-29s50.8 30.4 54.6 59.1c-35.2-5.5-60.4-9.6-75.8-12.1-15.3-2.6-40.5-8.6-75.5-18z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-662.57 x2=-662.57 y1=164.44 y2=165.44 gradientTransform="matrix(136.46 7.1517 -5.2163 99.533 91536 -11442)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c35.8-7.6 65.6-0.2 89.2 22s37.7 49 42.3 80.3c-39.8-9.7-68.3-23.8-85.5-42.4s-32.5-38.5-46-59.9z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.43 x2=-656.43 y1=163.86 y2=164.86 gradientTransform="matrix(60.866 3.1899 -8.7773 167.48 41560 -25168)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c-33.6 13.8-53.6 35.7-60.1 65.6s-3.6 63.1 8.7 99.6c27.4-40.3 43.2-69.6 47.4-88s5.6-44.1 4-77.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><path d="m196.5 182.3c-14.8 21.6-25.1 41.4-30.8 59.4s-9.5 33-11.1 45.1"fill=none stroke-linecap=round stroke-width=8></path><path d="m194.9 185.7c-24.4 1.7-43.8 9-58.1 21.8s-24.7 25.4-31.3 37.8"fill=none stroke-linecap=round stroke-width=8></path><path d="m204.5 176.4c29.7-6.7 52-8.4 67-5.1s26.9 8.6 35.8 15.9"fill=none stroke-linecap=round stroke-width=8></path><path d="m196.5 181.4c20.3 9.9 38.2 20.5 53.9 31.9s27.4 22.1 35.1 32"fill=none stroke-linecap=round stroke-width=8></path></g></g><defs><filter x=50.5 y=399 width=532 height=633 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=50.5 y=399 width=532 height=633 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-666.06 x2=-666.23 y1=163.36 y2=163.75 gradientTransform="matrix(532 0 0 633 354760 -102959)"gradientUnits=userSpaceOnUse><stop stop-color=#FFF400 offset=0></stop><stop stop-color=#3C8700 offset=1></stop></linearGradient><ellipse cx=316.5 cy=715.5 rx=266 ry=316.5></ellipse></g><defs><filter x=391 y=-24 width=288 height=283 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=391 y=-24 width=288 height=283 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-664.56 x2=-664.56 y1=163.79 y2=164.79 gradientTransform="matrix(227 0 0 227 151421 -37204)"gradientUnits=userSpaceOnUse><stop stop-color=#FFDF00 offset=0></stop><stop stop-color=#FF9D00 offset=1></stop></linearGradient><circle cx=565.5 cy=89.5 r=113.5></circle><linearGradient x1=-644.5 x2=-645.77 y1=342 y2=342 gradientTransform="matrix(30 0 0 1 19770 -253)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=427 x2=397 y1=89 y2=89 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-641.56 x2=-642.83 y1=196.02 y2=196.07 gradientTransform="matrix(26.5 0 0 5.5 17439 -1025.5)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=430.5 x2=404 y1=55.5 y2=50 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-643.73 x2=-645 y1=185.83 y2=185.9 gradientTransform="matrix(29 0 0 8 19107 -1361)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=431 x2=402 y1=122 y2=130 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-638.94 x2=-640.22 y1=177.09 y2=177.39 gradientTransform="matrix(24 0 0 13 15783 -2145)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=442 x2=418 y1=153 y2=166 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-633.42 x2=-634.7 y1=172.41 y2=173.31 gradientTransform="matrix(20 0 0 19 13137 -3096)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=464 x2=444 y1=180 y2=199 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-619.05 x2=-619.52 y1=170.82 y2=171.82 gradientTransform="matrix(13.83 0 0 22.85 9050 -3703.4)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=491.4 x2=477.5 y1=203 y2=225.9 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-578.5 x2=-578.63 y1=170.31 y2=171.31 gradientTransform="matrix(7.5 0 0 24.5 4860 -3953)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=524.5 x2=517 y1=219.5 y2=244 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=666.5 x2=666.5 y1=170.31 y2=171.31 gradientTransform="matrix(.5 0 0 24.5 231.5 -3944)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=564.5 x2=565 y1=228.5 y2=253 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12>');function gs(){return Ui()}function fs(){return Vi()}function ps(){return ji()}function hs(){return Ni()}function ys(){return Qi()}function bs(){return(e=Qi()).style.setProperty("transform","rotate(90deg)"),e;var e}function ms(){return(e=Qi()).style.setProperty("transform","rotate(-90deg)"),e;var e}function vs(){return Wi()}function ws(){return _i()}function xs(){return Xi()}function ks(){return Zi()}function $s(){return Yi()}function Ss(){return Ji()}function Cs(){return es()}function Es(){return ts()}function qs(){return ns()}function Ms(e){return t=rs(),n=t.firstChild,u(()=>w(n,"stroke","dark"===e.theme?"#12B76A":"#027A48")),t;var t,n}function Fs(){return os()}function Ls(){return is()}function Ds(e){return[i(l,{get when(){return e.checked},get children(){var t=rs(),n=t.firstChild;return u(()=>w(n,"stroke","dark"===e.theme?"#9B8AFB":"#6938EF")),t}}),i(l,{get when(){return!e.checked},get children(){var t=ss(),n=t.firstChild;return u(()=>w(n,"stroke","dark"===e.theme?"#9B8AFB":"#6938EF")),t}})]}function Ts(){return as()}function As(){return ls()}function Is(){return ds()}function Os(){return cs()}function Ps(){const e=$();return t=us(),n=t.firstChild,r=n.nextSibling,o=r.nextSibling,i=o.firstChild,s=o.nextSibling,a=s.firstChild,l=s.nextSibling,d=l.nextSibling,c=d.firstChild,u=d.nextSibling,g=u.firstChild,f=u.nextSibling,p=f.nextSibling,h=p.firstChild,y=p.nextSibling,b=y.firstChild,m=y.nextSibling,v=m.nextSibling,x=v.firstChild,k=v.nextSibling,S=k.firstChild,C=k.nextSibling,E=C.nextSibling,q=E.firstChild,M=E.nextSibling,F=M.firstChild,L=M.nextSibling,D=L.nextSibling,T=D.firstChild,A=D.nextSibling,I=A.firstChild,O=A.nextSibling,P=O.nextSibling,z=P.firstChild,K=P.nextSibling,R=K.firstChild,B=K.nextSibling,H=B.firstChild.nextSibling.nextSibling.nextSibling,G=H.nextSibling,U=B.nextSibling,V=U.firstChild,j=U.nextSibling,N=j.firstChild,Q=j.nextSibling,W=Q.firstChild,_=W.nextSibling,X=_.nextSibling.firstChild,Z=X.nextSibling,Y=Z.nextSibling,J=Y.nextSibling,ee=J.nextSibling,te=ee.nextSibling,ne=te.nextSibling,re=ne.nextSibling,oe=re.nextSibling,ie=oe.nextSibling,se=ie.nextSibling,ae=se.nextSibling,le=Q.nextSibling,de=le.firstChild,ce=le.nextSibling,ue=ce.firstChild,ge=ce.nextSibling,fe=ge.firstChild,pe=fe.nextSibling,he=ge.nextSibling,ye=he.firstChild,be=he.nextSibling,me=be.firstChild,ve=be.nextSibling,we=ve.firstChild,xe=we.nextSibling,ke=xe.nextSibling,$e=ke.nextSibling,Se=$e.nextSibling,Ce=Se.nextSibling,Ee=Ce.nextSibling,qe=Ee.nextSibling,Me=qe.nextSibling,Fe=Me.nextSibling,Le=Fe.nextSibling,De=Le.nextSibling,Te=De.nextSibling,Ae=Te.nextSibling,Ie=Ae.nextSibling,Oe=Ie.nextSibling,Pe=Oe.nextSibling,ze=Pe.nextSibling,w(n,"id",`a-${e}`),w(r,"fill",`url(#a-${e})`),w(i,"id",`am-${e}`),w(s,"id",`b-${e}`),w(a,"filter",`url(#am-${e})`),w(l,"mask",`url(#b-${e})`),w(c,"id",`ah-${e}`),w(u,"id",`k-${e}`),w(g,"filter",`url(#ah-${e})`),w(f,"mask",`url(#k-${e})`),w(h,"id",`ae-${e}`),w(y,"id",`j-${e}`),w(b,"filter",`url(#ae-${e})`),w(m,"mask",`url(#j-${e})`),w(x,"id",`ai-${e}`),w(k,"id",`i-${e}`),w(S,"filter",`url(#ai-${e})`),w(C,"mask",`url(#i-${e})`),w(q,"id",`aj-${e}`),w(M,"id",`h-${e}`),w(F,"filter",`url(#aj-${e})`),w(L,"mask",`url(#h-${e})`),w(T,"id",`ag-${e}`),w(A,"id",`g-${e}`),w(I,"filter",`url(#ag-${e})`),w(O,"mask",`url(#g-${e})`),w(z,"id",`af-${e}`),w(K,"id",`f-${e}`),w(R,"filter",`url(#af-${e})`),w(B,"mask",`url(#f-${e})`),w(H,"id",`m-${e}`),w(G,"fill",`url(#m-${e})`),w(V,"id",`ak-${e}`),w(j,"id",`e-${e}`),w(N,"filter",`url(#ak-${e})`),w(Q,"mask",`url(#e-${e})`),w(W,"id",`n-${e}`),w(_,"fill",`url(#n-${e})`),w(X,"id",`r-${e}`),w(Z,"fill",`url(#r-${e})`),w(Y,"id",`s-${e}`),w(J,"fill",`url(#s-${e})`),w(ee,"id",`q-${e}`),w(te,"fill",`url(#q-${e})`),w(ne,"id",`p-${e}`),w(re,"fill",`url(#p-${e})`),w(oe,"id",`o-${e}`),w(ie,"fill",`url(#o-${e})`),w(se,"id",`l-${e}`),w(ae,"fill",`url(#l-${e})`),w(de,"id",`al-${e}`),w(ce,"id",`d-${e}`),w(ue,"filter",`url(#al-${e})`),w(ge,"mask",`url(#d-${e})`),w(fe,"id",`u-${e}`),w(pe,"fill",`url(#u-${e})`),w(ye,"id",`ad-${e}`),w(be,"id",`c-${e}`),w(me,"filter",`url(#ad-${e})`),w(ve,"mask",`url(#c-${e})`),w(we,"id",`t-${e}`),w(xe,"fill",`url(#t-${e})`),w(ke,"id",`v-${e}`),w($e,"stroke",`url(#v-${e})`),w(Se,"id",`aa-${e}`),w(Ce,"stroke",`url(#aa-${e})`),w(Ee,"id",`w-${e}`),w(qe,"stroke",`url(#w-${e})`),w(Me,"id",`ac-${e}`),w(Fe,"stroke",`url(#ac-${e})`),w(Le,"id",`ab-${e}`),w(De,"stroke",`url(#ab-${e})`),w(Te,"id",`y-${e}`),w(Ae,"stroke",`url(#y-${e})`),w(Ie,"id",`x-${e}`),w(Oe,"stroke",`url(#x-${e})`),w(Pe,"id",`z-${e}`),w(ze,"stroke",`url(#z-${e})`),t;var t,n,r,o,i,s,a,l,d,c,u,g,f,p,h,y,b,m,v,x,k,S,C,E,q,M,F,L,D,T,A,I,O,P,z,K,R,B,H,G,U,V,j,N,Q,W,_,X,Z,Y,J,ee,te,ne,re,oe,ie,se,ae,le,de,ce,ue,ge,fe,pe,he,ye,be,me,ve,we,xe,ke,$e,Se,Ce,Ee,qe,Me,Fe,Le,De,Te,Ae,Ie,Oe,Pe,ze}var zs=d('<span><svg width=16 height=16 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 12L10 8L6 4"stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),Ks=d('<button title="Copy object to clipboard">'),Rs=d('<button title="Remove all items"aria-label="Remove all items">'),Bs=d('<button title="Delete item"aria-label="Delete item">'),Hs=d('<button title="Toggle value"aria-label="Toggle value">'),Gs=d('<button title="Bulk Edit Data"aria-label="Bulk Edit Data">'),Us=d("<div>"),Vs=d("<div><button> <span></span> <span> "),js=d("<input>"),Ns=d("<span>"),Qs=d("<div><span>:"),Ws=d("<div><div><button> [<!>...<!>]");var _s=e=>{const t=pe(),n=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,r=o(()=>"dark"===t()?oa(n):ra(n));return i=zs(),u(()=>g(i,He(r().expander,n`
          transform: rotate(${e.expanded?90:0}deg);
        `,e.expanded&&n`
            & svg {
              top: -1px;
            }
          `))),i;var i},Xs=e=>{const n=pe(),r=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,s=o(()=>"dark"===n()?oa(r):ra(r)),[a,l]=t("NoCopy");return d=Ks(),H(d,"click","NoCopy"===a()?()=>{navigator.clipboard.writeText(G(e.value)).then(()=>{l("SuccessCopy"),setTimeout(()=>{l("NoCopy")},1500)},e=>{console.error("Failed to copy: ",e),l("ErrorCopy"),setTimeout(()=>{l("NoCopy")},1500)})}:void 0,!0),c(d,i(V,{get children(){return[i(U,{get when(){return"NoCopy"===a()},get children(){return i(Es,{})}}),i(U,{get when(){return"SuccessCopy"===a()},get children(){return i(Ms,{get theme(){return n()}})}}),i(U,{get when(){return"ErrorCopy"===a()},get children(){return i(Fs,{})}})]}})),u(e=>{var t=s().actionButton,n="NoCopy"===a()?"Copy object to clipboard":"SuccessCopy"===a()?"Object copied to clipboard":"Error copying object to clipboard";return t!==e.e&&g(d,e.e=t),n!==e.t&&w(d,"aria-label",e.t=n),e},{e:void 0,t:void 0}),d;var d},Zs=e=>{const t=pe(),n=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,r=o(()=>"dark"===t()?oa(n):ra(n)),s=de().client;return(a=Rs()).$$click=()=>{const t=e.activeQuery.state.data,n=B(t,e.dataPath,[]);s.setQueryData(e.activeQuery.queryKey,n)},c(a,i(Ls,{})),u(()=>g(a,r().actionButton)),a;var a},Ys=e=>{const t=pe(),n=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,r=o(()=>"dark"===t()?oa(n):ra(n)),s=de().client;return(a=Bs()).$$click=()=>{const t=e.activeQuery.state.data,n=j(t,e.dataPath);s.setQueryData(e.activeQuery.queryKey,n)},c(a,i(fs,{})),u(()=>g(a,He(r().actionButton))),a;var a},Js=e=>{const t=pe(),n=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,r=o(()=>"dark"===t()?oa(n):ra(n)),s=de().client;return(a=Hs()).$$click=()=>{const t=e.activeQuery.state.data,n=B(t,e.dataPath,!e.value);s.setQueryData(e.activeQuery.queryKey,n)},c(a,i(Ds,{get theme(){return t()},get checked(){return e.value}})),u(()=>g(a,He(r().actionButton,n`
          width: ${Gi.size[3.5]};
          height: ${Gi.size[3.5]};
        `))),a;var a};function ea(e){return Symbol.iterator in e}function ta(e){const n=pe(),r=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,s=o(()=>"dark"===n()?oa(r):ra(r)),d=de().client,[f,p]=t((e.defaultExpanded||[]).includes(e.label)),[h,y]=t([]),b=o(()=>Array.isArray(e.value)?e.value.map((e,t)=>({label:t.toString(),value:e})):null!==e.value&&"object"==typeof e.value&&ea(e.value)&&"function"==typeof e.value[Symbol.iterator]?e.value instanceof Map?Array.from(e.value,([e,t])=>({label:e,value:t})):Array.from(e.value,(e,t)=>({label:t.toString(),value:e})):"object"==typeof e.value&&null!==e.value?Object.entries(e.value).map(([e,t])=>({label:e,value:t})):[]),m=o(()=>Array.isArray(e.value)?"array":null!==e.value&&"object"==typeof e.value&&ea(e.value)&&"function"==typeof e.value[Symbol.iterator]?"Iterable":"object"==typeof e.value&&null!==e.value?"object":typeof e.value),v=o(()=>function(e,t){let n=0;const r=[];for(;n<e.length;)r.push(e.slice(n,n+t)),n+=t;return r}(b(),100)),x=e.dataPath??[];return k=Us(),c(k,i(l,{get when(){return v().length},get children(){return[(t=Vs(),n=t.firstChild,r=n.firstChild,o=r.nextSibling,d=o.nextSibling.nextSibling,w=d.firstChild,n.$$click=()=>p(e=>!e),c(n,i(_s,{get expanded(){return f()}}),r),c(o,()=>e.label),c(d,()=>"iterable"===String(m()).toLowerCase()?"(Iterable) ":"",w),c(d,()=>b().length,w),c(d,()=>b().length>1?"items":"item",null),c(t,i(l,{get when(){return e.editable},get children(){var t=Us();return c(t,i(Xs,{get value(){return e.value}}),null),c(t,i(l,{get when(){return e.itemsDeletable&&void 0!==e.activeQuery},get children(){return i(Ys,{get activeQuery(){return e.activeQuery},dataPath:x})}}),null),c(t,i(l,{get when(){return"array"===m()&&void 0!==e.activeQuery},get children(){return i(Zs,{get activeQuery(){return e.activeQuery},dataPath:x})}}),null),c(t,i(l,{get when(){return a(()=>!!e.onEdit)()&&!K(e.value).meta},get children(){var t=Gs();return t.$$click=()=>{e.onEdit?.()},c(t,i(qs,{})),u(()=>g(t,s().actionButton)),t}}),null),u(()=>g(t,s().actions)),t}}),null),u(e=>{var r=s().expanderButtonContainer,o=s().expanderButton,i=s().info;return r!==e.e&&g(t,e.e=r),o!==e.t&&g(n,e.t=o),i!==e.a&&g(d,e.a=i),e},{e:void 0,t:void 0,a:void 0}),t),i(l,{get when(){return f()},get children(){return[i(l,{get when(){return 1===v().length},get children(){var t=Us();return c(t,i(Ye,{get each(){return b()},by:e=>e.label,children:t=>i(ta,{get defaultExpanded(){return e.defaultExpanded},get label(){return t().label},get value(){return t().value},get editable(){return e.editable},get dataPath(){return[...x,t().label]},get activeQuery(){return e.activeQuery},get itemsDeletable(){return"array"===m()||"Iterable"===m()||"object"===m()}})})),u(()=>g(t,s().subEntry)),t}}),i(l,{get when(){return v().length>1},get children(){var t=Us();return c(t,i(R,{get each(){return v()},children:(t,n)=>{return r=Ws(),o=r.firstChild,a=o.firstChild,d=a.firstChild,f=d.nextSibling,(p=f.nextSibling.nextSibling).nextSibling,a.$$click=()=>y(e=>e.includes(n)?e.filter(e=>e!==n):[...e,n]),c(a,i(_s,{get expanded(){return h().includes(n)}}),d),c(a,100*n,f),c(a,100*n+100-1,p),c(o,i(l,{get when(){return h().includes(n)},get children(){var n=Us();return c(n,i(Ye,{get each(){return t()},by:e=>e.label,children:t=>i(ta,{get defaultExpanded(){return e.defaultExpanded},get label(){return t().label},get value(){return t().value},get editable(){return e.editable},get dataPath(){return[...x,t().label]},get activeQuery(){return e.activeQuery}})})),u(()=>g(n,s().subEntry)),n}}),null),u(e=>{var t=s().entry,n=s().expanderButton;return t!==e.e&&g(o,e.e=t),n!==e.t&&g(a,e.t=n),e},{e:void 0,t:void 0}),r;var r,o,a,d,f,p}})),u(()=>g(t,s().subEntry)),t}})]}})];var t,n,r,o,d,w}}),null),c(k,i(l,{get when(){return 0===v().length},get children(){var t=Qs(),n=t.firstChild,r=n.firstChild;return c(n,()=>e.label,r),c(t,i(l,{get when(){return a(()=>!(!e.editable||void 0===e.activeQuery))()&&("string"===m()||"number"===m()||"boolean"===m())},get fallback(){return t=Ns(),c(t,()=>F(e.value)),u(()=>g(t,s().value)),t;var t},get children(){return[i(l,{get when(){return a(()=>!(!e.editable||void 0===e.activeQuery))()&&("string"===m()||"number"===m())},get children(){var t=js();return t.addEventListener("change",t=>{const n=e.activeQuery.state.data,r=B(n,x,"number"===m()?t.target.valueAsNumber:t.target.value);d.setQueryData(e.activeQuery.queryKey,r)}),u(e=>{var n="number"===m()?"number":"text",r=He(s().value,s().editableInput);return n!==e.e&&w(t,"type",e.e=n),r!==e.t&&g(t,e.t=r),e},{e:void 0,t:void 0}),u(()=>t.value=e.value),t}}),i(l,{get when(){return"boolean"===m()},get children(){var t=Ns();return c(t,i(Js,{get activeQuery(){return e.activeQuery},dataPath:x,get value(){return e.value}}),null),c(t,()=>F(e.value),null),u(()=>g(t,He(s().value,s().actions,s().editableInput))),t}})]}}),null),c(t,i(l,{get when(){return e.editable&&e.itemsDeletable&&void 0!==e.activeQuery},get children(){return i(Ys,{get activeQuery(){return e.activeQuery},dataPath:x})}}),null),u(e=>{var r=s().row,o=s().label;return r!==e.e&&g(t,e.e=r),o!==e.t&&g(n,e.t=o),e},{e:void 0,t:void 0}),t}}),null),u(()=>g(k,s().entry)),k;var k}var na=(e,t)=>{const{colors:n,font:r,size:o,border:i}=Gi,s=(t,n)=>"light"===e?t:n;return{entry:t`
      & * {
        font-size: ${r.size.xs};
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
      }
      position: relative;
      outline: none;
      word-break: break-word;
    `,subEntry:t`
      margin: 0 0 0 0.5em;
      padding-left: 0.75em;
      border-left: 2px solid ${s(n.gray[300],n.darkGray[400])};
      /* outline: 1px solid ${n.teal[400]}; */
    `,expander:t`
      & path {
        stroke: ${n.gray[400]};
      }
      & svg {
        width: ${o[3]};
        height: ${o[3]};
      }
      display: inline-flex;
      align-items: center;
      transition: all 0.1s ease;
      /* outline: 1px solid ${n.blue[400]}; */
    `,expanderButtonContainer:t`
      display: flex;
      align-items: center;
      line-height: ${o[4]};
      min-height: ${o[4]};
      gap: ${o[2]};
    `,expanderButton:t`
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      height: ${o[5]};
      background: transparent;
      border: none;
      padding: 0;
      display: inline-flex;
      align-items: center;
      gap: ${o[1]};
      position: relative;
      /* outline: 1px solid ${n.green[400]}; */

      &:focus-visible {
        border-radius: ${i.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }

      & svg {
        position: relative;
        left: 1px;
      }
    `,info:t`
      color: ${s(n.gray[500],n.gray[500])};
      font-size: ${r.size.xs};
      margin-left: ${o[1]};
      /* outline: 1px solid ${n.yellow[400]}; */
    `,label:t`
      color: ${s(n.gray[700],n.gray[300])};
      white-space: nowrap;
    `,value:t`
      color: ${s(n.purple[600],n.purple[400])};
      flex-grow: 1;
    `,actions:t`
      display: inline-flex;
      gap: ${o[2]};
      align-items: center;
    `,row:t`
      display: inline-flex;
      gap: ${o[2]};
      width: 100%;
      margin: ${o[.25]} 0px;
      line-height: ${o[4.5]};
      align-items: center;
    `,editableInput:t`
      border: none;
      padding: ${o[.5]} ${o[1]} ${o[.5]} ${o[1.5]};
      flex-grow: 1;
      border-radius: ${i.radius.xs};
      background-color: ${s(n.gray[200],n.darkGray[500])};

      &:hover {
        background-color: ${s(n.gray[300],n.darkGray[600])};
      }
    `,actionButton:t`
      background-color: transparent;
      color: ${s(n.gray[500],n.gray[500])};
      border: none;
      display: inline-flex;
      padding: 0px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: ${o[3]};
      height: ${o[3]};
      position: relative;
      z-index: 1;

      &:hover svg {
        color: ${s(n.gray[600],n.gray[400])};
      }

      &:focus-visible {
        border-radius: ${i.radius.xs};
        outline: 2px solid ${n.blue[800]};
        outline-offset: 2px;
      }
    `}},ra=e=>na("light",e),oa=e=>na("dark",e);p(["click"]);var ia=d('<div><div aria-hidden=true></div><button type=button aria-label="Open Tanstack query devtools"class=tsqd-open-btn>'),sa=d("<div>"),aa=d('<aside aria-label="Tanstack query devtools"><div></div><button aria-label="Close tanstack query devtools">'),la=d("<select name=tsqd-queries-filter-sort>"),da=d("<select name=tsqd-mutations-filter-sort>"),ca=d("<span>Asc"),ua=d("<span>Desc"),ga=d('<button aria-label="Open in picture-in-picture mode"title="Open in picture-in-picture mode">'),fa=d("<div>Settings"),pa=d("<span>Position"),ha=d("<span>Top"),ya=d("<span>Bottom"),ba=d("<span>Left"),ma=d("<span>Right"),va=d("<span>Theme"),wa=d("<span>Light"),xa=d("<span>Dark"),ka=d("<span>System"),$a=d("<span>Disabled Queries"),Sa=d("<span>Show"),Ca=d("<span>Hide"),Ea=d("<div><div class=tsqd-queries-container>"),qa=d("<div><div class=tsqd-mutations-container>"),Ma=d('<div><div><div><button aria-label="Close Tanstack query devtools"><span>TANSTACK</span><span> v</span></button></div></div><div><div><div><input aria-label="Filter queries by query key"type=text placeholder=Filter name=tsqd-query-filter-input></div><div></div><button class=tsqd-query-filter-sort-order-btn></button></div><div><button aria-label="Clear query cache"></button><button>'),Fa=d("<option>Sort by "),La=d("<div class=tsqd-query-disabled-indicator>disabled"),Da=d("<div class=tsqd-query-static-indicator>static"),Ta=d("<button><div></div><code class=tsqd-query-hash>"),Aa=d("<div role=tooltip id=tsqd-status-tooltip>"),Ia=d("<span>"),Oa=d("<button><span></span><span>"),Pa=d("<button><span></span> Error"),za=d('<div><span></span>Trigger Error<select><option value=""disabled selected>'),Ka=d('<div class="tsqd-query-details-explorer-container tsqd-query-details-data-explorer">'),Ra=d("<form><textarea name=data></textarea><div><span></span><div><button type=button>Cancel</button><button>Save"),Ba=d('<div><div>Query Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span></span></div><div class=tsqd-query-details-observers-count><span>Observers:</span><span></span></div><div class=tsqd-query-details-last-updated><span>Last Updated:</span><span></span></div></div><div>Actions</div><div><button><span></span>Refetch</button><button><span></span>Invalidate</button><button><span></span>Reset</button><button><span></span>Remove</button><button><span></span> Loading</button></div><div>Data </div><div>Query Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">'),Ha=d("<option>"),Ga=d('<div><div>Mutation Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span></span></div><div class=tsqd-query-details-last-updated><span>Submitted At:</span><span></span></div></div><div>Variables Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Context Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Data Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Mutations Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">'),[Ua,Va]=t(null),[ja,Na]=t(null),[Qa,Wa]=t(0),[_a,Xa]=t(!1),Za=e=>{const t=pe(),d=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,f=o(()=>"dark"===t()?bl(d):yl(d)),p=o(()=>de().onlineManager);n(()=>{const e=p().subscribe(e=>{Xa(!e)});y(()=>{e()})});const h=ge(),b=o(()=>de().buttonPosition||"bottom-right"),m=o(()=>"true"===e.localStore.open||"false"!==e.localStore.open&&(de().initialIsOpen||false)),v=o(()=>e.localStore.position||de().position||ie);let w;r(()=>{const t=w.parentElement,n=e.localStore.height||500,r=e.localStore.width||500,o=v();t.style.setProperty("--tsqd-panel-height",`${"top"===o?"-":""}${n}px`),t.style.setProperty("--tsqd-panel-width",`${"left"===o?"-":""}${r}px`)}),n(()=>{const e=()=>{const e=w.parentElement,t=getComputedStyle(e).fontSize;e.style.setProperty("--tsqd-font-size",t)};e(),window.addEventListener("focus",e),y(()=>{window.removeEventListener("focus",e)})});const x=o(()=>e.localStore.pip_open??"false");return[i(l,{get when(){return a(()=>!!h().pipWindow)()&&"true"==x()},get children(){return i(s,{get mount(){return h().pipWindow?.document.body},get children(){return i(Ya,{get children(){return i(el,e)}})}})}}),($=sa(),"function"==typeof w?k(w,$):w=$,c($,i(_e,{name:"tsqd-panel-transition",get children(){return i(l,{get when(){return a(()=>!(!m()||h().pipWindow))()&&"false"==x()},get children(){return i(Ja,{get localStore(){return e.localStore},get setLocalStore(){return e.setLocalStore}})}})}}),null),c($,i(_e,{name:"tsqd-button-transition",get children(){return i(l,{get when(){return!m()},get children(){var t=ia(),n=t.firstChild,r=n.nextSibling;return c(n,i(Ps,{})),r.$$click=()=>e.setLocalStore("open","true"),c(r,i(Ps,{})),u(()=>g(t,He(f().devtoolsBtn,f()[`devtoolsBtn-position-${b()}`],"tsqd-open-btn-container"))),t}})}}),null),u(()=>g($,He(d`
            & .tsqd-panel-transition-exit-active,
            & .tsqd-panel-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
            }

            & .tsqd-panel-transition-exit-to,
            & .tsqd-panel-transition-enter {
              ${"top"===v()||"bottom"===v()?"transform: translateY(var(--tsqd-panel-height));":"transform: translateX(var(--tsqd-panel-width));"}
            }

            & .tsqd-button-transition-exit-active,
            & .tsqd-button-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
              opacity: 1;
            }

            & .tsqd-button-transition-exit-to,
            & .tsqd-button-transition-enter {
              transform: ${"relative"===b()?"none;":"top-left"===b()?"translateX(-72px);":"top-right"===b()?"translateX(72px);":"translateY(72px);"};
              opacity: 0;
            }
          `,"tsqd-transitions-container"))),$)];var $},Ya=e=>{const t=ge(),n=pe(),i=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,s=o(()=>"dark"===n()?bl(i):yl(i));return r(()=>{const e=t().pipWindow,n=()=>{e&&Wa(e.innerWidth)};e&&(e.addEventListener("resize",n),n()),y(()=>{e&&e.removeEventListener("resize",n)})}),(a=sa()).style.setProperty("--tsqd-font-size","16px"),a.style.setProperty("max-height","100vh"),a.style.setProperty("height","100vh"),a.style.setProperty("width","100vw"),c(a,()=>e.children),u(()=>g(a,He(s().panel,(()=>{const{colors:e}=Gi,t=(e,t)=>"dark"===n()?t:e;return Qa()<oe?i`
        flex-direction: column;
        background-color: ${t(e.gray[300],e.gray[600])};
      `:i`
      flex-direction: row;
      background-color: ${t(e.gray[200],e.darkGray[900])};
    `})(),{[i`
            min-width: min-content;
          `]:Qa()<700},"tsqd-main-panel"))),a;var a},Ja=e=>{const s=pe(),a=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,l=o(()=>"dark"===s()?bl(a):yl(a)),[d,f]=t(!1),p=o(()=>e.localStore.position||de().position||ie),h=t=>{const n=t.currentTarget.parentElement;if(!n)return;f(!0);const{height:r,width:o}=n.getBoundingClientRect(),i=t.clientX,s=t.clientY;let a=0;const l=D(3.5),c=D(12),u=t=>{if(t.preventDefault(),"left"===p()||"right"===p()){const r="right"===p()?i-t.clientX:t.clientX-i;a=Math.round(o+r),a<c&&(a=c),e.setLocalStore("width",String(Math.round(a)));const s=n.getBoundingClientRect().width;Number(e.localStore.width)<s&&e.setLocalStore("width",String(s))}else{const n="bottom"===p()?s-t.clientY:t.clientY-s;a=Math.round(r+n),a<l&&(a=l,Va(null)),e.setLocalStore("height",String(Math.round(a)))}},g=()=>{d()&&f(!1),document.removeEventListener("mousemove",u,!1),document.removeEventListener("mouseUp",g,!1)};document.addEventListener("mousemove",u,!1),document.addEventListener("mouseup",g,!1)};let b;n(()=>{et(b,({width:e},t)=>{t===b&&Wa(e)})}),r(()=>{const t=b.parentElement?.parentElement?.parentElement;if(!t)return;const n=e.localStore.position||ie,r=x("padding",n),o="left"===e.localStore.position||"right"===e.localStore.position,i=(({padding:e,paddingTop:t,paddingBottom:n,paddingLeft:r,paddingRight:o})=>({padding:e,paddingTop:t,paddingBottom:n,paddingLeft:r,paddingRight:o}))(t.style);t.style[r]=`${o?e.localStore.width:e.localStore.height}px`,y(()=>{Object.entries(i).forEach(([e,n])=>{t.style[e]=n})})});return m=aa(),v=m.firstChild,w=v.nextSibling,"function"==typeof b?k(b,m):b=m,v.$$mousedown=h,w.$$click=()=>e.setLocalStore("open","false"),c(w,i(ps,{})),c(m,i(el,e),null),u(t=>{var n=He(l().panel,l()[`panel-position-${p()}`],(()=>{const{colors:e}=Gi,t=(e,t)=>"dark"===s()?t:e;return Qa()<oe?a`
        flex-direction: column;
        background-color: ${t(e.gray[300],e.gray[600])};
      `:a`
      flex-direction: row;
      background-color: ${t(e.gray[200],e.darkGray[900])};
    `})(),{[a`
            min-width: min-content;
          `]:Qa()<700&&("right"===p()||"left"===p())},"tsqd-main-panel"),r="bottom"===p()||"top"===p()?`${e.localStore.height||500}px`:"auto",o="right"===p()||"left"===p()?`${e.localStore.width||500}px`:"auto",i=He(l().dragHandle,l()[`dragHandle-position-${p()}`],"tsqd-drag-handle"),d=He(l().closeBtn,l()[`closeBtn-position-${p()}`],"tsqd-minimize-btn");return n!==t.e&&g(m,t.e=n),r!==t.t&&(null!=(t.t=r)?m.style.setProperty("height",r):m.style.removeProperty("height")),o!==t.a&&(null!=(t.a=o)?m.style.setProperty("width",o):m.style.removeProperty("width")),i!==t.o&&g(v,t.o=i),d!==t.i&&g(w,t.i=d),t},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),m;var m,v,w},el=e=>{let n;dl(),gl();const r=pe(),s=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,d=o(()=>"dark"===r()?bl(s):yl(s)),f=ge(),[p,h]=t("queries"),y=o(()=>e.localStore.sort||se),x=o(()=>Number(e.localStore.sortOrder)||1),$=o(()=>e.localStore.mutationSort||ae),S=o(()=>Number(e.localStore.mutationSortOrder)||1),C=o(()=>b[y()]),E=o(()=>m[$()]),q=o(()=>de().onlineManager),M=o(()=>de().client.getQueryCache()),F=o(()=>de().client.getMutationCache()),L=cl(e=>e().getAll().length,!1),D=o(v(()=>[L(),e.localStore.filter,y(),x(),e.localStore.hideDisabledQueries],()=>{const t=M().getAll();let n=e.localStore.filter?t.filter(t=>Ee(t.queryHash,e.localStore.filter||"").passed):[...t];"true"===e.localStore.hideDisabledQueries&&(n=n.filter(e=>!e.isDisabled()));return C()?n.sort((e,t)=>C()(e,t)*x()):n})),T=fl(e=>e().getAll().length,!1),A=o(v(()=>[T(),e.localStore.mutationFilter,$(),S()],()=>{const t=F().getAll(),n=e.localStore.mutationFilter?t.filter(t=>Ee(`${t.options.mutationKey?JSON.stringify(t.options.mutationKey)+" - ":""}${new Date(t.state.submittedAt).toLocaleString()}`,e.localStore.mutationFilter||"").passed):[...t];return E()?n.sort((e,t)=>E()(e,t)*S()):n})),I=t=>{e.setLocalStore("position",t)},O=e=>{const t=getComputedStyle(n).getPropertyValue("--tsqd-font-size");e.style.setProperty("--tsqd-font-size",t)};return[(z=Ma(),K=z.firstChild,R=K.firstChild,B=R.firstChild,H=B.firstChild,G=H.nextSibling,U=G.firstChild,V=K.nextSibling,j=V.firstChild,N=j.firstChild,Q=N.firstChild,W=N.nextSibling,_=W.nextSibling,X=j.nextSibling,Z=X.firstChild,Y=Z.nextSibling,"function"==typeof n?k(n,z):n=z,B.$$click=()=>{f().pipWindow||e.showPanelViewOnly?e.onClose&&e.onClose():e.setLocalStore("open","false")},c(G,()=>de().queryFlavor,U),c(G,()=>de().version,null),c(R,i(po.Root,{get class(){return He(d().viewToggle)},get value(){return p()},onChange:e=>{h(e),Va(null),Na(null)},get children(){return[i(po.Item,{value:"queries",class:"tsqd-radio-toggle",get children(){return[i(po.ItemInput,{}),i(po.ItemControl,{get children(){return i(po.ItemIndicator,{})}}),i(po.ItemLabel,{title:"Toggle Queries View",children:"Queries"})]}}),i(po.Item,{value:"mutations",class:"tsqd-radio-toggle",get children(){return[i(po.ItemInput,{}),i(po.ItemControl,{get children(){return i(po.ItemIndicator,{})}}),i(po.ItemLabel,{title:"Toggle Mutations View",children:"Mutations"})]}})]}}),null),c(K,i(l,{get when(){return"queries"===p()},get children(){return i(rl,{})}}),null),c(K,i(l,{get when(){return"mutations"===p()},get children(){return i(ol,{})}}),null),c(N,i(gs,{}),Q),Q.$$input=t=>{"queries"===p()?e.setLocalStore("filter",t.currentTarget.value):e.setLocalStore("mutationFilter",t.currentTarget.value)},c(W,i(l,{get when(){return"queries"===p()},get children(){var t=la();return t.addEventListener("change",t=>{e.setLocalStore("sort",t.currentTarget.value)}),c(t,()=>Object.keys(b).map(e=>{return(t=Fa()).firstChild,t.value=e,c(t,e,null),t;var t})),u(()=>t.value=y()),t}}),null),c(W,i(l,{get when(){return"mutations"===p()},get children(){var t=da();return t.addEventListener("change",t=>{e.setLocalStore("mutationSort",t.currentTarget.value)}),c(t,()=>Object.keys(m).map(e=>{return(t=Fa()).firstChild,t.value=e,c(t,e,null),t;var t})),u(()=>t.value=$()),t}}),null),c(W,i(ps,{}),null),_.$$click=()=>{"queries"===p()?e.setLocalStore("sortOrder",String(-1*x())):e.setLocalStore("mutationSortOrder",String(-1*S()))},c(_,i(l,{get when(){return 1===("queries"===p()?x():S())},get children(){return[ca(),i(hs,{})]}}),null),c(_,i(l,{get when(){return-1===("queries"===p()?x():S())},get children(){return[ua(),i(ys,{})]}}),null),Z.$$click=()=>{"queries"===p()?(pl({type:"CLEAR_QUERY_CACHE"}),M().clear()):(pl({type:"CLEAR_MUTATION_CACHE"}),F().clear())},c(Z,i(fs,{})),Y.$$click=()=>{q().setOnline(!q().isOnline())},c(Y,(P=a(()=>!!_a()),()=>P()?i($s,{}):i(ks,{}))),c(X,i(l,{get when(){return a(()=>!f().pipWindow)()&&!f().disabled},get children(){var t=ga();return t.$$click=()=>{f().requestPipWindow(Number(window.innerWidth),Number(e.localStore.height??500))},c(t,i(Cs,{})),u(()=>g(t,He(d().actionsBtn,"tsqd-actions-btn","tsqd-action-open-pip"))),t}}),null),c(X,i(Ki.Root,{gutter:4,get children(){return[i(Ki.Trigger,{get class(){return He(d().actionsBtn,"tsqd-actions-btn","tsqd-action-settings")},get children(){return i(Ss,{})}}),i(Ki.Portal,{ref:e=>O(e),get mount(){return a(()=>!!f().pipWindow)()?f().pipWindow.document.body:document.body},get children(){return i(Ki.Content,{get class(){return He(d().settingsMenu,"tsqd-settings-menu")},get children(){return[(t=fa(),u(()=>g(t,He(d().settingsMenuHeader,"tsqd-settings-menu-header"))),t),i(l,{get when(){return!e.showPanelViewOnly},get children(){return i(Ki.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[i(Ki.SubTrigger,{get class(){return He(d().settingsSubTrigger,"tsqd-settings-menu-sub-trigger","tsqd-settings-menu-sub-trigger-position")},get children(){return[pa(),i(ps,{})]}}),i(Ki.Portal,{ref:e=>O(e),get mount(){return a(()=>!!f().pipWindow)()?f().pipWindow.document.body:document.body},get children(){return i(Ki.SubContent,{get class(){return He(d().settingsMenu,"tsqd-settings-submenu")},get children(){return[i(Ki.Item,{onSelect:()=>{I("top")},as:"button",get class(){return He(d().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-top")},get children(){return[ha(),i(hs,{})]}}),i(Ki.Item,{onSelect:()=>{I("bottom")},as:"button",get class(){return He(d().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-bottom")},get children(){return[ya(),i(ys,{})]}}),i(Ki.Item,{onSelect:()=>{I("left")},as:"button",get class(){return He(d().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-left")},get children(){return[ba(),i(bs,{})]}}),i(Ki.Item,{onSelect:()=>{I("right")},as:"button",get class(){return He(d().settingsSubButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-right")},get children(){return[ma(),i(ms,{})]}})]}})}})]}})}}),i(Ki.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[i(Ki.SubTrigger,{get class(){return He(d().settingsSubTrigger,"tsqd-settings-menu-sub-trigger","tsqd-settings-menu-sub-trigger-position")},get children(){return[va(),i(ps,{})]}}),i(Ki.Portal,{ref:e=>O(e),get mount(){return a(()=>!!f().pipWindow)()?f().pipWindow.document.body:document.body},get children(){return i(Ki.SubContent,{get class(){return He(d().settingsMenu,"tsqd-settings-submenu")},get children(){return[i(Ki.Item,{onSelect:()=>{e.setLocalStore("theme_preference","light")},as:"button",get class(){return He(d().settingsSubButton,"light"===e.localStore.theme_preference&&d().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-top")},get children(){return[wa(),i(vs,{})]}}),i(Ki.Item,{onSelect:()=>{e.setLocalStore("theme_preference","dark")},as:"button",get class(){return He(d().settingsSubButton,"dark"===e.localStore.theme_preference&&d().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-bottom")},get children(){return[xa(),i(ws,{})]}}),i(Ki.Item,{onSelect:()=>{e.setLocalStore("theme_preference","system")},as:"button",get class(){return He(d().settingsSubButton,"system"===e.localStore.theme_preference&&d().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-left")},get children(){return[ka(),i(xs,{})]}})]}})}})]}}),i(Ki.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[i(Ki.SubTrigger,{get class(){return He(d().settingsSubTrigger,"tsqd-settings-menu-sub-trigger","tsqd-settings-menu-sub-trigger-disabled-queries")},get children(){return[$a(),i(ps,{})]}}),i(Ki.Portal,{ref:e=>O(e),get mount(){return a(()=>!!f().pipWindow)()?f().pipWindow.document.body:document.body},get children(){return i(Ki.SubContent,{get class(){return He(d().settingsMenu,"tsqd-settings-submenu")},get children(){return[i(Ki.Item,{onSelect:()=>{e.setLocalStore("hideDisabledQueries","false")},as:"button",get class(){return He(d().settingsSubButton,"true"!==e.localStore.hideDisabledQueries&&d().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-show")},get children(){return[Sa(),i(l,{get when(){return"true"!==e.localStore.hideDisabledQueries},get children(){return i(Ts,{})}})]}}),i(Ki.Item,{onSelect:()=>{e.setLocalStore("hideDisabledQueries","true")},as:"button",get class(){return He(d().settingsSubButton,"true"===e.localStore.hideDisabledQueries&&d().themeSelectedButton,"tsqd-settings-menu-position-btn","tsqd-settings-menu-position-btn-hide")},get children(){return[Ca(),i(l,{get when(){return"true"===e.localStore.hideDisabledQueries},get children(){return i(Ts,{})}})]}})]}})}})]}})];var t}})}})]}}),null),c(z,i(l,{get when(){return"queries"===p()},get children(){var e=Ea(),t=e.firstChild;return c(t,i(Ye,{by:e=>e.queryHash,get each(){return D()},children:e=>i(tl,{get query(){return e()}})})),u(()=>g(e,He(d().overflowQueryContainer,"tsqd-queries-overflow-container"))),e}}),null),c(z,i(l,{get when(){return"mutations"===p()},get children(){var e=qa(),t=e.firstChild;return c(t,i(Ye,{by:e=>e.mutationId,get each(){return A()},children:e=>i(nl,{get mutation(){return e()}})})),u(()=>g(e,He(d().overflowQueryContainer,"tsqd-mutations-overflow-container"))),e}}),null),u(e=>{var t=He(d().queriesContainer,Qa()<oe&&(Ua()||ja())&&s`
              height: 50%;
              max-height: 50%;
            `,Qa()<oe&&!(Ua()||ja())&&s`
              height: 100%;
              max-height: 100%;
            `,"tsqd-queries-container"),n=He(d().row,"tsqd-header"),r=d().logoAndToggleContainer,o=He(d().logo,"tsqd-text-logo-container"),i=He(d().tanstackLogo,"tsqd-text-logo-tanstack"),a=He(d().queryFlavorLogo,"tsqd-text-logo-query-flavor"),l=He(d().row,"tsqd-filters-actions-container"),c=He(d().filtersContainer,"tsqd-filters-container"),u=He(d().filterInput,"tsqd-query-filter-textfield-container"),f=He("tsqd-query-filter-textfield"),h=He(d().filterSelect,"tsqd-query-filter-sort-container"),y="Sort order "+(-1===("queries"===p()?x():S())?"descending":"ascending"),b=-1===("queries"===p()?x():S()),m=He(d().actionsContainer,"tsqd-actions-container"),v=He(d().actionsBtn,"tsqd-actions-btn","tsqd-action-clear-cache"),k=`Clear ${p()} cache`,$=He(d().actionsBtn,_a()&&d().actionsBtnOffline,"tsqd-actions-btn","tsqd-action-mock-offline-behavior"),C=_a()?"Unset offline mocking behavior":"Mock offline behavior",E=_a(),q=_a()?"Unset offline mocking behavior":"Mock offline behavior";return t!==e.e&&g(z,e.e=t),n!==e.t&&g(K,e.t=n),r!==e.a&&g(R,e.a=r),o!==e.o&&g(B,e.o=o),i!==e.i&&g(H,e.i=i),a!==e.n&&g(G,e.n=a),l!==e.s&&g(V,e.s=l),c!==e.h&&g(j,e.h=c),u!==e.r&&g(N,e.r=u),f!==e.d&&g(Q,e.d=f),h!==e.l&&g(W,e.l=h),y!==e.u&&w(_,"aria-label",e.u=y),b!==e.c&&w(_,"aria-pressed",e.c=b),m!==e.w&&g(X,e.w=m),v!==e.m&&g(Z,e.m=v),k!==e.f&&w(Z,"title",e.f=k),$!==e.y&&g(Y,e.y=$),C!==e.g&&w(Y,"aria-label",e.g=C),E!==e.p&&w(Y,"aria-pressed",e.p=E),q!==e.b&&w(Y,"title",e.b=q),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0}),u(()=>Q.value="queries"===p()?e.localStore.filter||"":e.localStore.mutationFilter||""),z),i(l,{get when(){return a(()=>"queries"===p())()&&Ua()},get children(){return i(sl,{})}}),i(l,{get when(){return a(()=>"mutations"===p())()&&ja()},get children(){return i(al,{})}})];var P,z,K,R,B,H,G,U,V,j,N,Q,W,_,X,Z,Y},tl=e=>{const t=pe(),n=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,r=o(()=>"dark"===t()?bl(n):yl(n)),{colors:s,alpha:a}=Gi,d=(e,n)=>"dark"===t()?n:e,f=cl(t=>t().find({queryKey:e.query.queryKey})?.state,!0,t=>t.query.queryHash===e.query.queryHash),p=cl(t=>t().find({queryKey:e.query.queryKey})?.isDisabled()??!1,!0,t=>t.query.queryHash===e.query.queryHash),h=cl(t=>t().find({queryKey:e.query.queryKey})?.isStatic()??!1,!0,t=>t.query.queryHash===e.query.queryHash),y=cl(t=>t().find({queryKey:e.query.queryKey})?.isStale()??!1,!0,t=>t.query.queryHash===e.query.queryHash),b=cl(t=>t().find({queryKey:e.query.queryKey})?.getObserversCount()??0,!0,t=>t.query.queryHash===e.query.queryHash),m=o(()=>q({queryState:f(),observerCount:b(),isStale:y()}));return i(l,{get when(){return f()},get children(){var t=Ta(),o=t.firstChild,f=o.nextSibling;return t.$$click=()=>Va(e.query.queryHash===Ua()?null:e.query.queryHash),c(o,b),c(f,()=>e.query.queryHash),c(t,i(l,{get when(){return p()},get children(){return La()}}),null),c(t,i(l,{get when(){return h()},get children(){return Da()}}),null),u(i=>{var l=He(r().queryRow,Ua()===e.query.queryHash&&r().selectedQueryRow,"tsqd-query-row"),c=`Query key ${e.query.queryHash}`,u=He("gray"===m()?n`
        background-color: ${d(s[m()][200],s[m()][700])};
        color: ${d(s[m()][700],s[m()][300])};
      `:n`
      background-color: ${d(s[m()][200]+a[80],s[m()][900])};
      color: ${d(s[m()][800],s[m()][300])};
    `,"tsqd-query-observer-count");return l!==i.e&&g(t,i.e=l),c!==i.t&&w(t,"aria-label",i.t=c),u!==i.a&&g(o,i.a=u),i},{e:void 0,t:void 0,a:void 0}),t}})},nl=e=>{const t=pe(),n=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,r=o(()=>"dark"===t()?bl(n):yl(n)),{colors:s,alpha:d}=Gi,f=(e,n)=>"dark"===t()?n:e,p=fl(t=>{const n=t().getAll().find(t=>t.mutationId===e.mutation.mutationId);return n?.state}),h=fl(t=>{const n=t().getAll().find(t=>t.mutationId===e.mutation.mutationId);return!!n&&n.state.isPaused}),y=fl(t=>{const n=t().getAll().find(t=>t.mutationId===e.mutation.mutationId);return n?n.state.status:"idle"}),b=o(()=>E({isPaused:h(),status:y()}));return i(l,{get when(){return p()},get children(){var t=Ta(),o=t.firstChild,p=o.nextSibling;return t.$$click=()=>{Na(e.mutation.mutationId===ja()?null:e.mutation.mutationId)},c(o,i(l,{get when(){return"purple"===b()},get children(){return i(Os,{})}}),null),c(o,i(l,{get when(){return"green"===b()},get children(){return i(Ts,{})}}),null),c(o,i(l,{get when(){return"red"===b()},get children(){return i(Is,{})}}),null),c(o,i(l,{get when(){return"yellow"===b()},get children(){return i(As,{})}}),null),c(p,i(l,{get when(){return e.mutation.options.mutationKey},get children(){return[a(()=>JSON.stringify(e.mutation.options.mutationKey))," -"," "]}}),null),c(p,()=>new Date(e.mutation.state.submittedAt).toLocaleString(),null),u(i=>{var a=He(r().queryRow,ja()===e.mutation.mutationId&&r().selectedQueryRow,"tsqd-query-row"),l=`Mutation submitted at ${new Date(e.mutation.state.submittedAt).toLocaleString()}`,c=He("gray"===b()?n`
        background-color: ${f(s[b()][200],s[b()][700])};
        color: ${f(s[b()][700],s[b()][300])};
      `:n`
      background-color: ${f(s[b()][200]+d[80],s[b()][900])};
      color: ${f(s[b()][800],s[b()][300])};
    `,"tsqd-query-observer-count");return a!==i.e&&g(t,i.e=a),l!==i.t&&w(t,"aria-label",i.t=l),c!==i.a&&g(o,i.a=c),i},{e:void 0,t:void 0,a:void 0}),t}})},rl=()=>{const e=cl(e=>e().getAll().filter(e=>"stale"===C(e)).length),t=cl(e=>e().getAll().filter(e=>"fresh"===C(e)).length),n=cl(e=>e().getAll().filter(e=>"fetching"===C(e)).length),r=cl(e=>e().getAll().filter(e=>"paused"===C(e)).length),s=cl(e=>e().getAll().filter(e=>"inactive"===C(e)).length),a=pe(),l=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,d=o(()=>"dark"===a()?bl(l):yl(l));return f=sa(),c(f,i(il,{label:"Fresh",color:"green",get count(){return t()}}),null),c(f,i(il,{label:"Fetching",color:"blue",get count(){return n()}}),null),c(f,i(il,{label:"Paused",color:"purple",get count(){return r()}}),null),c(f,i(il,{label:"Stale",color:"yellow",get count(){return e()}}),null),c(f,i(il,{label:"Inactive",color:"gray",get count(){return s()}}),null),u(()=>g(f,He(d().queryStatusContainer,"tsqd-query-status-container"))),f;var f},ol=()=>{const e=fl(e=>e().getAll().filter(e=>"green"===E({isPaused:e.state.isPaused,status:e.state.status})).length),t=fl(e=>e().getAll().filter(e=>"yellow"===E({isPaused:e.state.isPaused,status:e.state.status})).length),n=fl(e=>e().getAll().filter(e=>"purple"===E({isPaused:e.state.isPaused,status:e.state.status})).length),r=fl(e=>e().getAll().filter(e=>"red"===E({isPaused:e.state.isPaused,status:e.state.status})).length),s=pe(),a=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,l=o(()=>"dark"===s()?bl(a):yl(a));return d=sa(),c(d,i(il,{label:"Paused",color:"purple",get count(){return n()}}),null),c(d,i(il,{label:"Pending",color:"yellow",get count(){return t()}}),null),c(d,i(il,{label:"Success",color:"green",get count(){return e()}}),null),c(d,i(il,{label:"Error",color:"red",get count(){return r()}}),null),u(()=>g(d,He(l().queryStatusContainer,"tsqd-query-status-container"))),d;var d},il=e=>{const n=pe(),r=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,s=o(()=>"dark"===n()?bl(r):yl(r)),{colors:d,alpha:f}=Gi,p=(e,t)=>"dark"===n()?t:e;let h;const[y,b]=t(!1),[m,v]=t(!1),w=o(()=>!(Ua()&&Qa()<1024&&Qa()>oe)&&!(Qa()<oe));return x=Oa(),$=x.firstChild,S=$.nextSibling,"function"==typeof h?k(h,x):h=x,x.addEventListener("mouseleave",()=>{b(!1),v(!1)}),x.addEventListener("mouseenter",()=>b(!0)),x.addEventListener("blur",()=>v(!1)),x.addEventListener("focus",()=>v(!0)),O(x,P({get disabled(){return w()},get class(){return He(s().queryStatusTag,!w()&&r`
            cursor: pointer;
            &:hover {
              background: ${p(d.gray[200],d.darkGray[400])}${f[80]};
            }
          `,"tsqd-query-status-tag",`tsqd-query-status-tag-${e.label.toLowerCase()}`)}},()=>y()||m()?{"aria-describedby":"tsqd-status-tooltip"}:{}),!1,!0),c(x,i(l,{get when(){return a(()=>!w())()&&(y()||m())},get children(){var t=Aa();return c(t,()=>e.label),u(()=>g(t,He(s().statusTooltip,"tsqd-query-status-tooltip"))),t}}),$),c(x,i(l,{get when(){return w()},get children(){var t=Ia();return c(t,()=>e.label),u(()=>g(t,He(s().queryStatusTagLabel,"tsqd-query-status-tag-label"))),t}}),S),c(S,()=>e.count),u(t=>{var n=He(r`
            width: ${Gi.size[1.5]};
            height: ${Gi.size[1.5]};
            border-radius: ${Gi.border.radius.full};
            background-color: ${Gi.colors[e.color][500]};
          `,"tsqd-query-status-tag-dot"),o=He(s().queryStatusCount,e.count>0&&"gray"!==e.color&&r`
              background-color: ${p(d[e.color][100],d[e.color][900])};
              color: ${p(d[e.color][700],d[e.color][300])};
            `,"tsqd-query-status-tag-count");return n!==t.e&&g($,t.e=n),o!==t.t&&g(S,t.t=o),t},{e:void 0,t:void 0}),x;var x,$,S},sl=()=>{const e=pe(),n=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,s=o(()=>"dark"===e()?bl(n):yl(n)),{colors:d}=Gi,f=(t,n)=>"dark"===e()?n:t,p=de().client,[h,y]=t(!1),[b,m]=t("view"),[v,x]=t(!1),k=o(()=>de().errorTypes||[]),$=cl(e=>e().getAll().find(e=>e.queryHash===Ua()),!1),S=cl(e=>e().getAll().find(e=>e.queryHash===Ua()),!1),E=cl(e=>e().getAll().find(e=>e.queryHash===Ua())?.state,!1),q=cl(e=>e().getAll().find(e=>e.queryHash===Ua())?.state.data,!1),D=cl(e=>{const t=e().getAll().find(e=>e.queryHash===Ua());return t?C(t):"inactive"}),T=cl(e=>{const t=e().getAll().find(e=>e.queryHash===Ua());return t?t.state.status:"pending"}),A=cl(e=>e().getAll().find(e=>e.queryHash===Ua())?.getObserversCount()??0),I=o(()=>M(D())),O=()=>{pl({type:"REFETCH",queryHash:$()?.queryHash});const e=$()?.fetch();e?.catch(()=>{})},P=e=>{const t=$();if(!t)return;pl({type:"TRIGGER_ERROR",queryHash:t.queryHash,metadata:{error:e?.name}});const n=e?.initializer(t)??new Error("Unknown error from devtools"),r=t.options;t.setState({status:"error",error:n,fetchMeta:{...t.state.fetchMeta,__previousQueryOptions:r}})};r(()=>{"fetching"!==D()&&y(!1)});return i(l,{get when(){return a(()=>!!$())()&&E()},get children(){var e=Ba(),t=e.firstChild,r=t.nextSibling,o=r.firstChild,a=o.firstChild,C=a.firstChild,M=a.nextSibling,z=o.nextSibling,K=z.firstChild.nextSibling,R=z.nextSibling.firstChild.nextSibling,B=r.nextSibling,H=B.nextSibling,G=H.firstChild,U=G.firstChild,V=G.nextSibling,j=V.firstChild,N=V.nextSibling,Q=N.firstChild,W=N.nextSibling,_=W.firstChild,X=W.nextSibling,Z=X.firstChild,Y=Z.nextSibling,J=H.nextSibling;J.firstChild;var ee=J.nextSibling,te=ee.nextSibling;return c(C,()=>F($().queryKey,!0)),c(M,D),c(K,A),c(R,()=>new Date(E().dataUpdatedAt).toLocaleTimeString()),G.$$click=O,V.$$click=()=>{pl({type:"INVALIDATE",queryHash:$()?.queryHash}),p.invalidateQueries($())},N.$$click=()=>{pl({type:"RESET",queryHash:$()?.queryHash}),p.resetQueries($())},W.$$click=()=>{pl({type:"REMOVE",queryHash:$()?.queryHash}),p.removeQueries($()),Va(null)},X.$$click=()=>{if(void 0===$()?.state.data)y(!0),(()=>{const e=$();if(!e)return;pl({type:"RESTORE_LOADING",queryHash:e.queryHash});const t=e.state,n=e.state.fetchMeta?e.state.fetchMeta.__previousQueryOptions:null;e.cancel({silent:!0}),e.setState({...t,fetchStatus:"idle",fetchMeta:null}),n&&e.fetch(n)})();else{const e=$();if(!e)return;pl({type:"TRIGGER_LOADING",queryHash:e.queryHash});const t=e.options;e.fetch({...t,queryFn:()=>new Promise(()=>{}),gcTime:-1}),e.setState({data:void 0,status:"pending",fetchMeta:{...e.state.fetchMeta,__previousQueryOptions:t}})}},c(X,()=>"pending"===T()?"Restore":"Trigger",Y),c(H,i(l,{get when(){return 0===k().length||"error"===T()},get children(){var e=Pa(),t=e.firstChild,r=t.nextSibling;return e.$$click=()=>{$().state.error?(pl({type:"RESTORE_ERROR",queryHash:$()?.queryHash}),p.resetQueries($())):P()},c(e,()=>"error"===T()?"Restore":"Trigger",r),u(r=>{var o=He(n`
                  color: ${f(d.red[500],d.red[400])};
                `,"tsqd-query-details-actions-btn","tsqd-query-details-action-error"),i="pending"===T(),s=n`
                  background-color: ${f(d.red[500],d.red[400])};
                `;return o!==r.e&&g(e,r.e=o),i!==r.t&&(e.disabled=r.t=i),s!==r.a&&g(t,r.a=s),r},{e:void 0,t:void 0,a:void 0}),e}}),null),c(H,i(l,{get when(){return!(0===k().length||"error"===T())},get children(){var e=za(),t=e.firstChild,r=t.nextSibling.nextSibling;return r.firstChild,r.addEventListener("change",e=>{const t=k().find(t=>t.name===e.currentTarget.value);P(t)}),c(r,i(L,{get each(){return k()},children:e=>{return t=Ha(),c(t,()=>e.name),u(()=>t.value=e.name),t;var t}}),null),c(e,i(ps,{}),null),u(o=>{var i=He(s().actionsSelect,"tsqd-query-details-actions-btn","tsqd-query-details-action-error-multiple"),a=n`
                  background-color: ${Gi.colors.red[400]};
                `,l="pending"===T();return i!==o.e&&g(e,o.e=i),a!==o.t&&g(t,o.t=a),l!==o.a&&(r.disabled=o.a=l),o},{e:void 0,t:void 0,a:void 0}),e}}),null),c(J,()=>"view"===b()?"Explorer":"Editor",null),c(e,i(l,{get when(){return"view"===b()},get children(){var e=Ka();return c(e,i(ta,{label:"Data",defaultExpanded:["Data"],get value(){return q()},editable:!0,onEdit:()=>m("edit"),get activeQuery(){return $()}})),u(t=>null!=(t=Gi.size[2])?e.style.setProperty("padding",t):e.style.removeProperty("padding")),e}}),ee),c(e,i(l,{get when(){return"edit"===b()},get children(){var e=Ra(),t=e.firstChild,r=t.nextSibling,o=r.firstChild,i=o.nextSibling,a=i.firstChild,l=a.nextSibling;return e.addEventListener("submit",e=>{e.preventDefault();const t=new FormData(e.currentTarget).get("data");try{const e=JSON.parse(t);$().setState({...$().state,data:e}),m("view")}catch(n){x(!0)}}),t.addEventListener("focus",()=>x(!1)),c(o,()=>v()?"Invalid Value":""),a.$$click=()=>m("view"),u(c=>{var u=He(s().devtoolsEditForm,"tsqd-query-details-data-editor"),p=s().devtoolsEditTextarea,h=v(),y=s().devtoolsEditFormActions,b=s().devtoolsEditFormError,m=s().devtoolsEditFormActionContainer,x=He(s().devtoolsEditFormAction,n`
                      color: ${f(d.gray[600],d.gray[300])};
                    `),k=He(s().devtoolsEditFormAction,n`
                      color: ${f(d.blue[600],d.blue[400])};
                    `);return u!==c.e&&g(e,c.e=u),p!==c.t&&g(t,c.t=p),h!==c.a&&w(t,"data-error",c.a=h),y!==c.o&&g(r,c.o=y),b!==c.i&&g(o,c.i=b),m!==c.n&&g(i,c.n=m),x!==c.s&&g(a,c.s=x),k!==c.h&&g(l,c.h=k),c},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),u(()=>t.value=JSON.stringify(q(),null,2)),e}}),ee),c(te,i(ta,{label:"Query",defaultExpanded:["Query","queryKey"],get value(){return S()}})),u(o=>{var i=He(s().detailsContainer,"tsqd-query-details-container"),a=He(s().detailsHeader,"tsqd-query-details-header"),l=He(s().detailsBody,"tsqd-query-details-summary-container"),c=He(s().queryDetailsStatus,"gray"===I()?n`
        background-color: ${f(d[I()][200],d[I()][700])};
        color: ${f(d[I()][700],d[I()][300])};
        border-color: ${f(d[I()][400],d[I()][600])};
      `:n`
      background-color: ${f(d[I()][100],d[I()][900])};
      color: ${f(d[I()][700],d[I()][300])};
      border-color: ${f(d[I()][400],d[I()][600])};
    `),u=He(s().detailsHeader,"tsqd-query-details-header"),p=He(s().actionsBody,"tsqd-query-details-actions-container"),y=He(n`
                color: ${f(d.blue[600],d.blue[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-refetch"),b="fetching"===D(),m=n`
                background-color: ${f(d.blue[600],d.blue[400])};
              `,v=He(n`
                color: ${f(d.yellow[600],d.yellow[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-invalidate"),w="pending"===T(),x=n`
                background-color: ${f(d.yellow[600],d.yellow[400])};
              `,k=He(n`
                color: ${f(d.gray[600],d.gray[300])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-reset"),$="pending"===T(),S=n`
                background-color: ${f(d.gray[600],d.gray[400])};
              `,C=He(n`
                color: ${f(d.pink[500],d.pink[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-remove"),E="fetching"===D(),q=n`
                background-color: ${f(d.pink[500],d.pink[400])};
              `,F=He(n`
                color: ${f(d.cyan[500],d.cyan[400])};
              `,"tsqd-query-details-actions-btn","tsqd-query-details-action-loading"),L=h(),A=n`
                background-color: ${f(d.cyan[500],d.cyan[400])};
              `,O=He(s().detailsHeader,"tsqd-query-details-header"),P=He(s().detailsHeader,"tsqd-query-details-header"),z=Gi.size[2];return i!==o.e&&g(e,o.e=i),a!==o.t&&g(t,o.t=a),l!==o.a&&g(r,o.a=l),c!==o.o&&g(M,o.o=c),u!==o.i&&g(B,o.i=u),p!==o.n&&g(H,o.n=p),y!==o.s&&g(G,o.s=y),b!==o.h&&(G.disabled=o.h=b),m!==o.r&&g(U,o.r=m),v!==o.d&&g(V,o.d=v),w!==o.l&&(V.disabled=o.l=w),x!==o.u&&g(j,o.u=x),k!==o.c&&g(N,o.c=k),$!==o.w&&(N.disabled=o.w=$),S!==o.m&&g(Q,o.m=S),C!==o.f&&g(W,o.f=C),E!==o.y&&(W.disabled=o.y=E),q!==o.g&&g(_,o.g=q),F!==o.p&&g(X,o.p=F),L!==o.b&&(X.disabled=o.b=L),A!==o.T&&g(Z,o.T=A),O!==o.A&&g(J,o.A=O),P!==o.O&&g(ee,o.O=P),z!==o.I&&(null!=(o.I=z)?te.style.setProperty("padding",z):te.style.removeProperty("padding")),o},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0,T:void 0,A:void 0,O:void 0,I:void 0}),e}})},al=()=>{const e=pe(),t=de().shadowDOMTarget?Re.bind({target:de().shadowDOMTarget}):Re,n=o(()=>"dark"===e()?bl(t):yl(t)),{colors:r}=Gi,s=(t,n)=>"dark"===e()?n:t,a=fl(e=>{const t=e().getAll().find(e=>e.mutationId===ja());return!!t&&t.state.isPaused}),d=fl(e=>{const t=e().getAll().find(e=>e.mutationId===ja());return t?t.state.status:"idle"}),f=o(()=>E({isPaused:a(),status:d()})),p=fl(e=>e().getAll().find(e=>e.mutationId===ja()),!1);return i(l,{get when(){return p()},get children(){var e=Ga(),o=e.firstChild,a=o.nextSibling,h=a.firstChild,y=h.firstChild,b=y.firstChild,m=y.nextSibling,v=h.nextSibling.firstChild.nextSibling,w=a.nextSibling,x=w.nextSibling,k=x.nextSibling,$=k.nextSibling,S=$.nextSibling,C=S.nextSibling,E=C.nextSibling,q=E.nextSibling;return c(b,i(l,{get when(){return p().options.mutationKey},fallback:"No mutationKey found",get children(){return F(p().options.mutationKey,!0)}})),c(m,i(l,{get when(){return"purple"===f()},children:"pending"}),null),c(m,i(l,{get when(){return"purple"!==f()},get children(){return d()}}),null),c(v,()=>new Date(p().state.submittedAt).toLocaleTimeString()),c(x,i(ta,{label:"Variables",defaultExpanded:["Variables"],get value(){return p().state.variables}})),c($,i(ta,{label:"Context",defaultExpanded:["Context"],get value(){return p().state.context}})),c(C,i(ta,{label:"Data",defaultExpanded:["Data"],get value(){return p().state.data}})),c(q,i(ta,{label:"Mutation",defaultExpanded:["Mutation"],get value(){return p()}})),u(i=>{var l=He(n().detailsContainer,"tsqd-query-details-container"),d=He(n().detailsHeader,"tsqd-query-details-header"),c=He(n().detailsBody,"tsqd-query-details-summary-container"),u=He(n().queryDetailsStatus,"gray"===f()?t`
        background-color: ${s(r[f()][200],r[f()][700])};
        color: ${s(r[f()][700],r[f()][300])};
        border-color: ${s(r[f()][400],r[f()][600])};
      `:t`
      background-color: ${s(r[f()][100],r[f()][900])};
      color: ${s(r[f()][700],r[f()][300])};
      border-color: ${s(r[f()][400],r[f()][600])};
    `),p=He(n().detailsHeader,"tsqd-query-details-header"),h=Gi.size[2],y=He(n().detailsHeader,"tsqd-query-details-header"),b=Gi.size[2],v=He(n().detailsHeader,"tsqd-query-details-header"),M=Gi.size[2],F=He(n().detailsHeader,"tsqd-query-details-header"),L=Gi.size[2];return l!==i.e&&g(e,i.e=l),d!==i.t&&g(o,i.t=d),c!==i.a&&g(a,i.a=c),u!==i.o&&g(m,i.o=u),p!==i.i&&g(w,i.i=p),h!==i.n&&(null!=(i.n=h)?x.style.setProperty("padding",h):x.style.removeProperty("padding")),y!==i.s&&g(k,i.s=y),b!==i.h&&(null!=(i.h=b)?$.style.setProperty("padding",b):$.style.removeProperty("padding")),v!==i.r&&g(S,i.r=v),M!==i.d&&(null!=(i.d=M)?C.style.setProperty("padding",M):C.style.removeProperty("padding")),F!==i.l&&g(E,i.l=F),L!==i.u&&(null!=(i.u=L)?q.style.setProperty("padding",L):q.style.removeProperty("padding")),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0}),e}})},ll=new Map,dl=()=>{const e=o(()=>de().client.getQueryCache()),t=e().subscribe(t=>{S(()=>{for(const[n,r]of ll.entries())r.shouldUpdate(t)&&r.setter(n(e))})});return y(()=>{ll.clear(),t()}),t},cl=(e,n=!0,i=()=>!0)=>{const s=o(()=>de().client.getQueryCache()),[a,l]=t(e(s),n?void 0:{equals:!1});return r(()=>{l(e(s))}),ll.set(e,{setter:l,shouldUpdate:i}),y(()=>{ll.delete(e)}),a},ul=new Map,gl=()=>{const e=o(()=>de().client.getMutationCache()),t=e().subscribe(()=>{for(const[t,n]of ul.entries())queueMicrotask(()=>{n(t(e))})});return y(()=>{ul.clear(),t()}),t},fl=(e,n=!0)=>{const i=o(()=>de().client.getMutationCache()),[s,a]=t(e(i),n?void 0:{equals:!1});return r(()=>{a(e(i))}),ul.set(e,a),y(()=>{ul.delete(e)}),s},pl=({type:e,queryHash:t,metadata:n})=>{const r=new CustomEvent("@tanstack/query-devtools-event",{detail:{type:e,queryHash:t,metadata:n},bubbles:!0,cancelable:!0});window.dispatchEvent(r)},hl=(e,t)=>{const{colors:n,font:r,size:o,alpha:i,shadow:s,border:a}=Gi,l=(t,n)=>"light"===e?t:n;return{devtoolsBtn:t`
      z-index: 100000;
      position: fixed;
      padding: 4px;
      text-align: left;

      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      box-shadow: ${s.md()};
      overflow: hidden;

      & div {
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border-radius: 9999px;

        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        filter: blur(6px) saturate(1.2) contrast(1.1);
      }

      &:focus-within {
        outline-offset: 2px;
        outline: 3px solid ${n.green[600]};
      }

      & button {
        position: relative;
        z-index: 1;
        padding: 0;
        border-radius: 9999px;
        background-color: transparent;
        border: none;
        height: 40px;
        display: flex;
        width: 40px;
        overflow: hidden;
        cursor: pointer;
        outline: none;
        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
    `,panel:t`
      position: fixed;
      z-index: 9999;
      display: flex;
      gap: ${Gi.size[.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${l(n.gray[300],n.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${l(n.gray[400],n.darkGray[300])};
      }
    `,parentPanel:t`
      z-index: 9999;
      display: flex;
      height: 100%;
      gap: ${Gi.size[.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${l(n.gray[300],n.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${l(n.gray[400],n.darkGray[300])};
      }
    `,"devtoolsBtn-position-bottom-right":t`
      bottom: 12px;
      right: 12px;
    `,"devtoolsBtn-position-bottom-left":t`
      bottom: 12px;
      left: 12px;
    `,"devtoolsBtn-position-top-left":t`
      top: 12px;
      left: 12px;
    `,"devtoolsBtn-position-top-right":t`
      top: 12px;
      right: 12px;
    `,"devtoolsBtn-position-relative":t`
      position: relative;
    `,"panel-position-top":t`
      top: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${o[14]};
      border-bottom: ${l(n.gray[400],n.darkGray[300])} 1px solid;
    `,"panel-position-bottom":t`
      bottom: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${o[14]};
      border-top: ${l(n.gray[400],n.darkGray[300])} 1px solid;
    `,"panel-position-right":t`
      bottom: 0;
      right: 0;
      top: 0;
      border-left: ${l(n.gray[400],n.darkGray[300])} 1px solid;
      max-width: 90%;
    `,"panel-position-left":t`
      bottom: 0;
      left: 0;
      top: 0;
      border-right: ${l(n.gray[400],n.darkGray[300])} 1px solid;
      max-width: 90%;
    `,closeBtn:t`
      position: absolute;
      cursor: pointer;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      background-color: ${l(n.gray[50],n.darkGray[700])};
      &:hover {
        background-color: ${l(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline: 2px solid ${n.blue[600]};
      }
      & svg {
        color: ${l(n.gray[600],n.gray[400])};
        width: ${o[2]};
        height: ${o[2]};
      }
    `,"closeBtn-position-top":t`
      bottom: 0;
      right: ${o[2]};
      transform: translate(0, 100%);
      border-right: ${l(n.gray[400],n.darkGray[300])} 1px solid;
      border-left: ${l(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: none;
      border-bottom: ${l(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: 0px 0px ${a.radius.sm} ${a.radius.sm};
      padding: ${o[.5]} ${o[1.5]} ${o[1]} ${o[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        bottom: 100%;
        left: -${o[2.5]};
        height: ${o[1.5]};
        width: calc(100% + ${o[5]});
      }

      & svg {
        transform: rotate(180deg);
      }
    `,"closeBtn-position-bottom":t`
      top: 0;
      right: ${o[2]};
      transform: translate(0, -100%);
      border-right: ${l(n.gray[400],n.darkGray[300])} 1px solid;
      border-left: ${l(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${l(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: none;
      border-radius: ${a.radius.sm} ${a.radius.sm} 0px 0px;
      padding: ${o[1]} ${o[1.5]} ${o[.5]} ${o[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        top: 100%;
        left: -${o[2.5]};
        height: ${o[1.5]};
        width: calc(100% + ${o[5]});
      }
    `,"closeBtn-position-right":t`
      bottom: ${o[2]};
      left: 0;
      transform: translate(-100%, 0);
      border-right: none;
      border-left: ${l(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${l(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: ${l(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: ${a.radius.sm} 0px 0px ${a.radius.sm};
      padding: ${o[1.5]} ${o[.5]} ${o[1.5]} ${o[1]};

      &::after {
        content: ' ';
        position: absolute;
        left: 100%;
        height: calc(100% + ${o[5]});
        width: ${o[1.5]};
      }

      & svg {
        transform: rotate(-90deg);
      }
    `,"closeBtn-position-left":t`
      bottom: ${o[2]};
      right: 0;
      transform: translate(100%, 0);
      border-left: none;
      border-right: ${l(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${l(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: ${l(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: 0px ${a.radius.sm} ${a.radius.sm} 0px;
      padding: ${o[1.5]} ${o[1]} ${o[1.5]} ${o[.5]};

      &::after {
        content: ' ';
        position: absolute;
        right: 100%;
        height: calc(100% + ${o[5]});
        width: ${o[1.5]};
      }

      & svg {
        transform: rotate(90deg);
      }
    `,queriesContainer:t`
      flex: 1 1 700px;
      background-color: ${l(n.gray[50],n.darkGray[700])};
      display: flex;
      flex-direction: column;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
    `,dragHandle:t`
      position: absolute;
      transition: background-color 0.125s ease;
      &:hover {
        background-color: ${n.purple[400]}${l("",i[90])};
      }
      z-index: 4;
    `,"dragHandle-position-top":t`
      bottom: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,"dragHandle-position-bottom":t`
      top: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,"dragHandle-position-right":t`
      left: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,"dragHandle-position-left":t`
      right: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,row:t`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${Gi.size[2]} ${Gi.size[2.5]};
      gap: ${Gi.size[2.5]};
      border-bottom: ${l(n.gray[300],n.darkGray[500])} 1px solid;
      align-items: center;
      & > button {
        padding: 0;
        background: transparent;
        border: none;
        display: flex;
        gap: ${o[.5]};
        flex-direction: column;
      }
    `,logoAndToggleContainer:t`
      display: flex;
      gap: ${Gi.size[3]};
      align-items: center;
    `,logo:t`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      gap: ${Gi.size[.5]};
      padding: 0px;
      &:hover {
        opacity: 0.7;
      }
      &:focus-visible {
        outline-offset: 4px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,tanstackLogo:t`
      font-size: ${r.size.md};
      font-weight: ${r.weight.bold};
      line-height: ${r.lineHeight.xs};
      white-space: nowrap;
      color: ${l(n.gray[600],n.gray[300])};
    `,queryFlavorLogo:t`
      font-weight: ${r.weight.semibold};
      font-size: ${r.size.xs};
      background: linear-gradient(
        to right,
        ${l("#ea4037, #ff9b11","#dd524b, #e9a03b")}
      );
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,queryStatusContainer:t`
      display: flex;
      gap: ${Gi.size[2]};
      height: min-content;
    `,queryStatusTag:t`
      display: flex;
      gap: ${Gi.size[1.5]};
      box-sizing: border-box;
      height: ${Gi.size[6.5]};
      background: ${l(n.gray[50],n.darkGray[500])};
      color: ${l(n.gray[700],n.gray[300])};
      border-radius: ${Gi.border.radius.sm};
      font-size: ${r.size.sm};
      padding: ${Gi.size[1]};
      padding-left: ${Gi.size[1.5]};
      align-items: center;
      font-weight: ${r.weight.medium};
      border: ${l("1px solid "+n.gray[300],"1px solid transparent")};
      user-select: none;
      position: relative;
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
    `,queryStatusTagLabel:t`
      font-size: ${r.size.xs};
    `,queryStatusCount:t`
      font-size: ${r.size.xs};
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${l(n.gray[500],n.gray[400])};
      background-color: ${l(n.gray[200],n.darkGray[300])};
      border-radius: 2px;
      font-variant-numeric: tabular-nums;
      height: ${Gi.size[4.5]};
    `,statusTooltip:t`
      position: absolute;
      z-index: 1;
      background-color: ${l(n.gray[50],n.darkGray[500])};
      top: 100%;
      left: 50%;
      transform: translate(-50%, calc(${Gi.size[2]}));
      padding: ${Gi.size[.5]} ${Gi.size[2]};
      border-radius: ${Gi.border.radius.sm};
      font-size: ${r.size.xs};
      border: 1px solid ${l(n.gray[400],n.gray[600])};
      color: ${l(n.gray[600],n.gray[300])};

      &::before {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, -100%);
        position: absolute;
        border-color: transparent transparent
          ${l(n.gray[400],n.gray[600])} transparent;
        border-style: solid;
        border-width: 7px;
        /* transform: rotate(180deg); */
      }

      &::after {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, calc(-100% + 2px));
        position: absolute;
        border-color: transparent transparent
          ${l(n.gray[100],n.darkGray[500])} transparent;
        border-style: solid;
        border-width: 7px;
      }
    `,filtersContainer:t`
      display: flex;
      gap: ${Gi.size[2]};
      & > button {
        cursor: pointer;
        padding: ${Gi.size[.5]} ${Gi.size[1.5]} ${Gi.size[.5]}
          ${Gi.size[2]};
        border-radius: ${Gi.border.radius.sm};
        background-color: ${l(n.gray[100],n.darkGray[400])};
        border: 1px solid ${l(n.gray[300],n.darkGray[200])};
        color: ${l(n.gray[700],n.gray[300])};
        font-size: ${r.size.xs};
        display: flex;
        align-items: center;
        line-height: ${r.lineHeight.sm};
        gap: ${Gi.size[1.5]};
        max-width: 160px;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${a.radius.xs};
          outline: 2px solid ${n.blue[800]};
        }
        & svg {
          width: ${Gi.size[3]};
          height: ${Gi.size[3]};
          color: ${l(n.gray[500],n.gray[400])};
        }
      }
    `,filterInput:t`
      padding: ${o[.5]} ${o[2]};
      border-radius: ${Gi.border.radius.sm};
      background-color: ${l(n.gray[100],n.darkGray[400])};
      display: flex;
      box-sizing: content-box;
      align-items: center;
      gap: ${Gi.size[1.5]};
      max-width: 160px;
      min-width: 100px;
      border: 1px solid ${l(n.gray[300],n.darkGray[200])};
      height: min-content;
      color: ${l(n.gray[600],n.gray[400])};
      & > svg {
        width: ${o[3]};
        height: ${o[3]};
      }
      & input {
        font-size: ${r.size.xs};
        width: 100%;
        background-color: ${l(n.gray[100],n.darkGray[400])};
        border: none;
        padding: 0;
        line-height: ${r.lineHeight.sm};
        color: ${l(n.gray[700],n.gray[300])};
        &::placeholder {
          color: ${l(n.gray[700],n.gray[300])};
        }
        &:focus {
          outline: none;
        }
      }

      &:focus-within {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,filterSelect:t`
      padding: ${Gi.size[.5]} ${Gi.size[2]};
      border-radius: ${Gi.border.radius.sm};
      background-color: ${l(n.gray[100],n.darkGray[400])};
      display: flex;
      align-items: center;
      gap: ${Gi.size[1.5]};
      box-sizing: content-box;
      max-width: 160px;
      border: 1px solid ${l(n.gray[300],n.darkGray[200])};
      height: min-content;
      & > svg {
        color: ${l(n.gray[600],n.gray[400])};
        width: ${Gi.size[2]};
        height: ${Gi.size[2]};
      }
      & > select {
        appearance: none;
        color: ${l(n.gray[700],n.gray[300])};
        min-width: 100px;
        line-height: ${r.lineHeight.sm};
        font-size: ${r.size.xs};
        background-color: ${l(n.gray[100],n.darkGray[400])};
        border: none;
        &:focus {
          outline: none;
        }
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,actionsContainer:t`
      display: flex;
      gap: ${Gi.size[2]};
    `,actionsBtn:t`
      border-radius: ${Gi.border.radius.sm};
      background-color: ${l(n.gray[100],n.darkGray[400])};
      border: 1px solid ${l(n.gray[300],n.darkGray[200])};
      width: ${Gi.size[6.5]};
      height: ${Gi.size[6.5]};
      justify-content: center;
      display: flex;
      align-items: center;
      gap: ${Gi.size[1.5]};
      max-width: 160px;
      cursor: pointer;
      padding: 0;
      &:hover {
        background-color: ${l(n.gray[200],n.darkGray[500])};
      }
      & svg {
        color: ${l(n.gray[700],n.gray[300])};
        width: ${Gi.size[3]};
        height: ${Gi.size[3]};
      }
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,actionsBtnOffline:t`
      & svg {
        stroke: ${l(n.yellow[700],n.yellow[500])};
        fill: ${l(n.yellow[700],n.yellow[500])};
      }
    `,overflowQueryContainer:t`
      flex: 1;
      overflow-y: auto;
      & > div {
        display: flex;
        flex-direction: column;
      }
    `,queryRow:t`
      display: flex;
      align-items: center;
      padding: 0;
      border: none;
      cursor: pointer;
      color: ${l(n.gray[700],n.gray[300])};
      background-color: ${l(n.gray[50],n.darkGray[700])};
      line-height: 1;
      &:focus {
        outline: none;
      }
      &:focus-visible {
        outline-offset: -2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      &:hover .tsqd-query-hash {
        background-color: ${l(n.gray[200],n.darkGray[600])};
      }

      & .tsqd-query-observer-count {
        padding: 0 ${Gi.size[1]};
        user-select: none;
        min-width: ${Gi.size[6.5]};
        align-self: stretch;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${r.size.xs};
        font-weight: ${r.weight.medium};
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom: 1px solid ${l(n.gray[300],n.darkGray[700])};
      }
      & .tsqd-query-hash {
        user-select: text;
        font-size: ${r.size.xs};
        display: flex;
        align-items: center;
        min-height: ${Gi.size[6]};
        flex: 1;
        padding: ${Gi.size[1]} ${Gi.size[2]};
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        border-bottom: 1px solid ${l(n.gray[300],n.darkGray[400])};
        text-align: left;
        text-overflow: clip;
        word-break: break-word;
      }

      & .tsqd-query-disabled-indicator {
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 ${Gi.size[2]};
        color: ${l(n.gray[800],n.gray[300])};
        background-color: ${l(n.gray[300],n.darkGray[600])};
        border-bottom: 1px solid ${l(n.gray[300],n.darkGray[400])};
        font-size: ${r.size.xs};
      }

      & .tsqd-query-static-indicator {
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 ${Gi.size[2]};
        color: ${l(n.teal[800],n.teal[300])};
        background-color: ${l(n.teal[100],n.teal[900])};
        border-bottom: 1px solid ${l(n.teal[300],n.teal[700])};
        font-size: ${r.size.xs};
      }
    `,selectedQueryRow:t`
      background-color: ${l(n.gray[200],n.darkGray[500])};
    `,detailsContainer:t`
      flex: 1 1 700px;
      background-color: ${l(n.gray[50],n.darkGray[700])};
      color: ${l(n.gray[700],n.gray[300])};
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      display: flex;
      text-align: left;
    `,detailsHeader:t`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: ${l(n.gray[200],n.darkGray[600])};
      padding: ${Gi.size[1.5]} ${Gi.size[2]};
      font-weight: ${r.weight.medium};
      font-size: ${r.size.xs};
      line-height: ${r.lineHeight.xs};
      text-align: left;
    `,detailsBody:t`
      margin: ${Gi.size[1.5]} 0px ${Gi.size[2]} 0px;
      & > div {
        display: flex;
        align-items: stretch;
        padding: 0 ${Gi.size[2]};
        line-height: ${r.lineHeight.sm};
        justify-content: space-between;
        & > span {
          font-size: ${r.size.xs};
        }
        & > span:nth-child(2) {
          font-variant-numeric: tabular-nums;
        }
      }

      & > div:first-child {
        margin-bottom: ${Gi.size[1.5]};
      }

      & code {
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        margin: 0;
        font-size: ${r.size.xs};
        line-height: ${r.lineHeight.xs};
      }

      & pre {
        margin: 0;
        display: flex;
        align-items: center;
      }
    `,queryDetailsStatus:t`
      border: 1px solid ${n.darkGray[200]};
      border-radius: ${Gi.border.radius.sm};
      font-weight: ${r.weight.medium};
      padding: ${Gi.size[1]} ${Gi.size[2.5]};
    `,actionsBody:t`
      flex-wrap: wrap;
      margin: ${Gi.size[2]} 0px ${Gi.size[2]} 0px;
      display: flex;
      gap: ${Gi.size[2]};
      padding: 0px ${Gi.size[2]};
      & > button {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
        font-size: ${r.size.xs};
        padding: ${Gi.size[1]} ${Gi.size[2]};
        display: flex;
        border-radius: ${Gi.border.radius.sm};
        background-color: ${l(n.gray[100],n.darkGray[600])};
        border: 1px solid ${l(n.gray[300],n.darkGray[400])};
        align-items: center;
        gap: ${Gi.size[2]};
        font-weight: ${r.weight.medium};
        line-height: ${r.lineHeight.xs};
        cursor: pointer;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${a.radius.xs};
          outline: 2px solid ${n.blue[800]};
        }
        &:hover {
          background-color: ${l(n.gray[200],n.darkGray[500])};
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        & > span {
          width: ${o[1.5]};
          height: ${o[1.5]};
          border-radius: ${Gi.border.radius.full};
        }
      }
    `,actionsSelect:t`
      font-size: ${r.size.xs};
      padding: ${Gi.size[.5]} ${Gi.size[2]};
      display: flex;
      border-radius: ${Gi.border.radius.sm};
      overflow: hidden;
      background-color: ${l(n.gray[100],n.darkGray[600])};
      border: 1px solid ${l(n.gray[300],n.darkGray[400])};
      align-items: center;
      gap: ${Gi.size[2]};
      font-weight: ${r.weight.medium};
      line-height: ${r.lineHeight.sm};
      color: ${l(n.red[500],n.red[400])};
      cursor: pointer;
      position: relative;
      &:hover {
        background-color: ${l(n.gray[200],n.darkGray[500])};
      }
      & > span {
        width: ${o[1.5]};
        height: ${o[1.5]};
        border-radius: ${Gi.border.radius.full};
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      & select {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        appearance: none;
        background-color: transparent;
        border: none;
        color: transparent;
        outline: none;
      }

      & svg path {
        stroke: ${Gi.colors.red[400]};
      }
      & svg {
        width: ${Gi.size[2]};
        height: ${Gi.size[2]};
      }
    `,settingsMenu:t`
      display: flex;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
      flex-direction: column;
      gap: ${o[.5]};
      border-radius: ${Gi.border.radius.sm};
      border: 1px solid ${l(n.gray[300],n.gray[700])};
      background-color: ${l(n.gray[50],n.darkGray[600])};
      font-size: ${r.size.xs};
      color: ${l(n.gray[700],n.gray[300])};
      z-index: 99999;
      min-width: 120px;
      padding: ${o[.5]};
    `,settingsSubTrigger:t`
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: ${Gi.border.radius.xs};
      padding: ${Gi.size[1]} ${Gi.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      color: ${l(n.gray[700],n.gray[300])};
      & svg {
        color: ${l(n.gray[600],n.gray[400])};
        transform: rotate(-90deg);
        width: ${Gi.size[2]};
        height: ${Gi.size[2]};
      }
      &:hover {
        background-color: ${l(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
      &.data-disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `,settingsMenuHeader:t`
      padding: ${Gi.size[1]} ${Gi.size[1]};
      font-weight: ${r.weight.medium};
      border-bottom: 1px solid ${l(n.gray[300],n.darkGray[400])};
      color: ${l(n.gray[500],n.gray[400])};
      font-size: ${r.size.xs};
    `,settingsSubButton:t`
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${l(n.gray[700],n.gray[300])};
      font-size: ${r.size.xs};
      border-radius: ${Gi.border.radius.xs};
      padding: ${Gi.size[1]} ${Gi.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      & svg {
        color: ${l(n.gray[600],n.gray[400])};
      }
      &:hover {
        background-color: ${l(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
    `,themeSelectedButton:t`
      background-color: ${l(n.purple[100],n.purple[900])};
      color: ${l(n.purple[700],n.purple[300])};
      & svg {
        color: ${l(n.purple[700],n.purple[300])};
      }
      &:hover {
        background-color: ${l(n.purple[100],n.purple[900])};
      }
    `,viewToggle:t`
      border-radius: ${Gi.border.radius.sm};
      background-color: ${l(n.gray[200],n.darkGray[600])};
      border: 1px solid ${l(n.gray[300],n.darkGray[200])};
      display: flex;
      padding: 0;
      font-size: ${r.size.xs};
      color: ${l(n.gray[700],n.gray[300])};
      overflow: hidden;

      &:has(:focus-visible) {
        outline: 2px solid ${n.blue[800]};
      }

      & .tsqd-radio-toggle {
        opacity: 0.5;
        display: flex;
        & label {
          display: flex;
          align-items: center;
          cursor: pointer;
          line-height: ${r.lineHeight.md};
        }

        & label:hover {
          background-color: ${l(n.gray[100],n.darkGray[500])};
        }
      }

      & > [data-checked] {
        opacity: 1;
        background-color: ${l(n.gray[100],n.darkGray[400])};
        & label:hover {
          background-color: ${l(n.gray[100],n.darkGray[400])};
        }
      }

      & .tsqd-radio-toggle:first-child {
        & label {
          padding: 0 ${Gi.size[1.5]} 0 ${Gi.size[2]};
        }
        border-right: 1px solid ${l(n.gray[300],n.darkGray[200])};
      }

      & .tsqd-radio-toggle:nth-child(2) {
        & label {
          padding: 0 ${Gi.size[2]} 0 ${Gi.size[1.5]};
        }
      }
    `,devtoolsEditForm:t`
      padding: ${o[2]};
      & > [data-error='true'] {
        outline: 2px solid ${l(n.red[200],n.red[800])};
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
      }
    `,devtoolsEditTextarea:t`
      width: 100%;
      max-height: 500px;
      font-family: 'Fira Code', monospace;
      font-size: ${r.size.xs};
      border-radius: ${a.radius.sm};
      field-sizing: content;
      padding: ${o[2]};
      background-color: ${l(n.gray[100],n.darkGray[800])};
      color: ${l(n.gray[900],n.gray[100])};
      border: 1px solid ${l(n.gray[200],n.gray[700])};
      resize: none;
      &:focus {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${l(n.blue[200],n.blue[800])};
      }
    `,devtoolsEditFormActions:t`
      display: flex;
      justify-content: space-between;
      gap: ${o[2]};
      align-items: center;
      padding-top: ${o[1]};
      font-size: ${r.size.xs};
    `,devtoolsEditFormError:t`
      color: ${l(n.red[700],n.red[500])};
    `,devtoolsEditFormActionContainer:t`
      display: flex;
      gap: ${o[2]};
    `,devtoolsEditFormAction:t`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      font-size: ${r.size.xs};
      padding: ${o[1]} ${Gi.size[2]};
      display: flex;
      border-radius: ${a.radius.sm};
      background-color: ${l(n.gray[100],n.darkGray[600])};
      border: 1px solid ${l(n.gray[300],n.darkGray[400])};
      align-items: center;
      gap: ${o[2]};
      font-weight: ${r.weight.medium};
      line-height: ${r.lineHeight.xs};
      cursor: pointer;
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      &:hover {
        background-color: ${l(n.gray[200],n.darkGray[500])};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `}},yl=e=>hl("light",e),bl=e=>hl("dark",e);p(["click","mousedown","input"]);var ml=e=>{const[t,n]=te({prefix:"TanstackQueryDevtools"}),r=_(),s=o(()=>{const e=t.theme_preference||"system";return"system"!==e?e:r()});return i(le.Provider,{value:e,get children(){return i(ue,{localStore:t,setLocalStore:n,get children(){return i(fe.Provider,{value:s,get children(){return i(Za,{localStore:t,setLocalStore:n})}})}})}})};export{ml as default};
