(function(){var u,l,j,h=[].slice,g=[].indexOf||function(b){for(var a=0,c=this.length;a<c;a++)if(a in this&&this[a]===b)return a;return-1};j=["included","extended"];u=function(){function b(){typeof this.init==="function"&&this.init.apply(this,args)}b.include=function(a){var c,d;if(!a)throw"include(obj) requires obj";for(c in a){d=a[c];if(g.call(j,c)<0)this.prototype[c]=d}(a=a.included)&&a.apply(this);return this};b.extend=function(a){var c,d;if(!a)throw"extend(obj) requires obj";for(c in a){d=a[c];
if(g.call(j,c)<0)this[c]=d}(a=a.extended)&&a.apply(this);return this};b.proxy=function(a){var c=this;return function(){return a.apply(c,arguments)}};b.prototype.proxy=function(a){var c=this;return function(){return a.apply(c,arguments)}};b.prototype.delay=function(a,c){return setTimeout(this.proxy(a),c||0)};return b}();l=this.Monocle={};l.version="0.3";l.Events={bind:function(b,a){var c,d,f,e,i;d=b.split(" ");c=this.hasOwnProperty("_callbacks")&&this._callbacks||(this._callbacks={});e=0;for(i=d.length;e<
i;e++){f=d[e];c[f]||(c[f]=[]);c[f].push(a)}return this},trigger:function(){var b,a,c,d,f;b=1<=arguments.length?h.call(arguments,0):[];c=b.shift();if(c=this.hasOwnProperty("_callbacks")&&((a=this._callbacks)!=null?a[c]:void 0)){d=0;for(f=c.length;d<f;d++){a=c[d];if(a.apply(this,b)===false)break}return true}},unbind:function(b,a){var c,d,f,e,i;if(!b){this._callbacks={};return this}f=(c=this._callbacks)!=null?c[b]:void 0;if(!f)return this;if(!a){delete this._callbacks[b];return this}d=e=0;for(i=f.length;e<
i;d=++e){c=f[d];if(c===a){f=f.slice();f.splice(d,1);this._callbacks[b]=f;break}}return this}};l.Module=u;l.Dom=function(){var b;b=1<=arguments.length?h.call(arguments,0):[];return typeof $$!=="undefined"&&$$!==null?$$.apply(null,b):$.apply(null,b)};this.__=l.App={Model:{},View:{},Controller:{}};this.__Model=l.App.Model;this.__View=l.App.View;this.__Controller=l.App.Controller}).call(this);(function(){var u,l={}.hasOwnProperty,j=function(g,b){function a(){this.constructor=g}for(var c in b)if(l.call(b,c))g[c]=b[c];a.prototype=b.prototype;g.prototype=new a;g.__super__=b.prototype;return g},h=[].slice;Monocle.Model=function(g){function b(a){b.__super__.constructor.apply(this,arguments);this.className=this.constructor.name;a&&this.load(a);this.uid=this.constructor.uid()}j(b,g);b.extend(Monocle.Events);b.records={};b.attributes=[];b.uid_counter=0;b.configure=function(){var a;a=1<=arguments.length?
h.call(arguments,0):[];this.records={};if(a.length)this.attributes=a;this.attributes||(this.attributes=[]);this.unbind();return this};b.create=function(a){return(new this(a)).save()};b.uid=function(){this.uid_counter++;return u()};b.exists=function(a){try{return this.find(a)}catch(c){return false}};b.find=function(a){a=this.records[a];if(!a)throw Error("Unknown record");return a.clone()};b.findBy=function(a,c){var d,f,e;e=this.records;for(d in e){f=e[d];if(f[a]===c)return f.clone()}throw Error("Unknown record");
};b.select=function(a){var c,d;return this.cloneArray(function(){var f,e;f=this.records;e=[];for(c in f){d=f[c];a(d)&&e.push(d)}return e}.call(this))};b.all=function(){return this.cloneArray(this.recordsValues())};b.count=function(){return this.recordsValues().length};b.cloneArray=function(a){var c,d,f,e;e=[];d=0;for(f=a.length;d<f;d++){c=a[d];e.push(c.clone())}return e};b.recordsValues=function(){var a,c,d,f;c=[];f=this.records;for(a in f){d=f[a];c.push(d)}return c};b.destroyAll=function(){return this.records=
{}};b.prototype.isNew=function(){return!this.exists()};b.prototype.exists=function(){return this.uid&&this.uid in this.constructor.records};b.prototype.clone=function(){return createObject(this)};b.prototype.load=function(a){var c,d;for(c in a){d=a[c];typeof this[c]==="function"&&this[c](d);this[c]=d}return this};b.prototype.attributes=function(){var a,c,d,f,e;c={};e=this.constructor.attributes;d=0;for(f=e.length;d<f;d++){a=e[d];if(a in this)c[a]=typeof this[a]==="function"?this[a]():this[a]}if(this.id)c.id=
this.id;return c};b.prototype.save=function(){var a;if(this.validate!=null)a=this.validate();if(a){this.trigger("error",a);return false}this.trigger("beforeSave");a=this.isNew()?this.create():this.update();this.trigger("save");return a};b.prototype.updateAttributes=function(a){this.load(a);return this.save()};b.prototype.create=function(){var a;this.trigger("beforeCreate");a=new this.constructor(this.attributes());a.uid=this.uid;this.constructor.records[this.uid]=a;this.trigger("create");this.trigger("change",
"create");return a.clone()};b.prototype.update=function(){var a;this.trigger("beforeUpdate");a=this.constructor.records;a[this.uid].load(this.attributes());this.trigger("update");this.trigger("change","update");return a[this.uid].clone()};b.prototype.destroy=function(){this.trigger("beforeDestroy");delete this.constructor.records[this.uid];this.trigger("destroy");this.trigger("change","destroy");this.unbind();return this};b.prototype.clone=function(){return Object.create(this)};b.prototype.unbind=
function(){return this.trigger("unbind")};b.prototype.trigger=function(){var a,c;a=1<=arguments.length?h.call(arguments,0):[];a.splice(1,0,this);return(c=this.constructor).trigger.apply(c,a)};return b}(Monocle.Module);if(typeof Object.create!=="function")Object.create=function(g){var b;b=function(){};b.prototype=g;return new b};u=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(g){var b;b=Math.random()*16|0;return(g==="x"?b:b&3|8).toString(16)}).toUpperCase()}}).call(this);(function(){var u=function(h,g){return function(){return h.apply(g,arguments)}},l={}.hasOwnProperty,j=function(h,g){function b(){this.constructor=h}for(var a in g)if(l.call(g,a))h[a]=g[a];b.prototype=g.prototype;h.prototype=new b;h.__super__=g.prototype;return h};Monocle.Controller=function(h){function g(b){this.destroy=u(this.destroy,this);var a,c;if(typeof b==="string")this.el=Monocle.Dom(b);else for(a in b){c=b[a];this[a]=c}if(!this.el)this.el=Monocle.Dom(document.createElement(this.tag));if(!this.events)this.events=
this.constructor.events;if(!this.elements)this.elements=this.constructor.elements;this.events&&this.delegateEvents();this.elements&&this.refreshElements();g.__super__.constructor.apply(this,arguments)}j(g,h);g.include(Monocle.Events);g.prototype.eventSplitter=/^(\S+)\s*(.*)$/;g.prototype.tag="div";g.prototype.delegateEvents=function(){var b,a,c,d,f,e;f=this.events;e=[];for(a in f){d=f[a];if(typeof d!=="function")d=this.proxy(this[d]);c=a.match(this.eventSplitter);b=c[1];c=c[2];c===""?e.push(this.el.bind(b,
d)):e.push(this.el.delegate(c,b,d))}return e};g.prototype.refreshElements=function(){var b,a,c,d,f;d=this.elements;f=[];for(a in d){c=d[a];b=$(a,this.el);this.el.find(a);f.push(this[c]=b)}return f};g.prototype.destroy=function(){this.trigger("release");this.el.remove();return this.unbind()};return g}(Monocle.Module)}).call(this);(function(){var u={}.hasOwnProperty,l=function(h,g){function b(){this.constructor=h}for(var a in g)if(u.call(g,a))h[a]=g[a];b.prototype=g.prototype;h.prototype=new b;h.__super__=g.prototype;return h},j=[].slice;Monocle.View=function(h){function g(){g.__super__.constructor.apply(this,arguments);if(!this.template)this.template=this.constructor.template;if(!this.container)this.container=this.constructor.container;this.container=Monocle.Dom(this.container);this.container.attr("data-monocle",this.constructor.name)}
l(g,h);g.container=null;g.prototype.html=function(){var b;b=1<=arguments.length?j.call(arguments,0):[];return this._html.apply(this,["html"].concat(j.call(b)))};g.prototype.append=function(){var b;b=1<=arguments.length?j.call(arguments,0):[];return this._html.apply(this,["append"].concat(j.call(b)))};g.prototype.prepend=function(){var b;b=1<=arguments.length?j.call(arguments,0):[];return this._html.apply(this,["prepend"].concat(j.call(b)))};g.prototype.remove=function(){1<=arguments.length&&j.call(arguments,
0);this.item.destroy();return this.el.remove()};g.prototype.refresh=function(){return this.replace(Mustache.render(this.template,this.item))};g.prototype._html=function(){var b,a,c;c=arguments[0];a=2<=arguments.length?j.call(arguments,1):[];a=function(){var d,f,e;e=[];d=0;for(f=a.length;d<f;d++){b=a[d];e.push(b.el||b)}return e}();this.replace(Mustache.render.apply(Mustache,[this.template].concat(j.call(a))));this.container[c](this.el[0]);this.refreshElements();return this};g.prototype.replace=function(b){var a;
a=[this.el,Monocle.Dom(b.el||b)];b=a[0];this.el=a[1];b.replaceWith(this.el[0]);this.delegateEvents(this.events);this.refreshElements();return this.el};return g}(Monocle.Controller)}).call(this);(function(){var u,l,j,h,g,b=[].slice;g={};u={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};j=function(a,c,d){var f,e,i,k,w;if(d==null)d=null;if(a===".")return c[c.length-1];i=a.split(/\./);a=i[0];i=2<=i.length?b.call(i,1):[];for(e=k=w=c.length-1;w<=-1?k<-1:k>-1;e=w<=-1?++k:--k)if(c[e]!=null)if(typeof c[e]==="object"&&a in(f=c[e])){d=f[a];break}c=0;for(e=i.length;c<e;c++){a=i[c];d=j(a,[d])}if(d instanceof Function)d=function(y){return function(){var z;z=y.apply(f,arguments);
return z instanceof Function&&z.apply(null,arguments)||z}}(d);return d};l=function(){var a,c,d,f;d=arguments[0];f=arguments[1];a=3<=arguments.length?b.call(arguments,2):[];return function(){var e,i,k;k=[];e=0;for(i=f.length;e<i;e++){c=f[e];k.push(c.call.apply(c,[d].concat(b.call(a))))}return k}().join("")};h=function(a,c,d){var f,e,i,k,w,y,z,A,K,G,p,D,H,s,v,I,B;if(c==null)c=["{{","}}"];if(d==null)d=null;w=g[e=c.join(" ")]||(g[e]={});if(a in w)return w[a];e=[];f=function(){return RegExp("([\\s\\S]*?)([ \\t]*)(?:"+
c[0]+"\\s*(?:(!)\\s*([\\s\\S]+?)|(=)\\s*([\\s\\S]+?)\\s*=|({)\\s*(\\w[\\S]*?)\\s*}|([^0-9a-zA-Z._!={]?)\\s*([\\w.][\\S]*?))\\s*"+c[1]+")","gm")};v=f();v.lastIndex=s=(d||{start:0}).start;for(H=function(m,t){var q,n,o,E,F,r,x,C;(n=/$/gm).lastIndex=m;n.exec(a);r=a.substr(0,m).split("\n");C=r.length;r=r[C-1];q=y+B.length;x=a.substr(q+1,m-q-1);E=Array(r.length-x.length+1).join(" ");q=Array(x.length+1).join("^");r+=a.substr(m,n.lastIndex-m);o=Error();for(F in n={message:""+t+"\n\nLine "+C+":\n"+r+"\n"+
E+q,error:t,line:C,"char":E.length,tag:x})o[F]=n[F];return o};p=v.exec(a);){k=p.slice(1,3);i=k[0];B=k[1];k=p[3]||p[5]||p[7]||p[9];p=p[4]||p[6]||p[8]||p[10];y=s+i.length-1;s=v.lastIndex;G=(y===-1||a.charAt(y)==="\n")&&((D=a.charAt(s))===void 0||D===""||D==="\r"||D==="\n");i&&e.push(function(m){return function(){return m}}(i));if(G&&k!==""&&k!=="&"&&k!=="{"){if(a.charAt(s)==="\r")s+=1;if(a.charAt(s)==="\n")s+=1}else if(B){e.push(function(m){return function(){return m}}(B));y+=B.length;B=""}switch(k){case "!":break;
case "":case "&":case "{":i=function(m,t){return function(q){var n,o;if((n=(o=j(m,q))!=null?o:"")instanceof Function)n=l.apply(null,[this,h(""+n())].concat(b.call(arguments)));t||(n=this.escape(""+n));return""+n}};e.push(i(p,k));break;case ">":k=function(m,t){return function(q,n){var o;o=n(m).toString();if(t)o=o.replace(/^(?=.)/gm,t);return l.apply(null,[this,h(o)].concat(b.call(arguments)))}};e.push(k(p,B));break;case "#":case "^":i={name:p,start:s,error:H(v.lastIndex,"Unclosed section '"+p+"'!")};
G=h(a,c,i);I=G[0];s=G[1];i["#"]=function(m,t,q){return function(n){var o,E,F,r;r=j(m,n)||[];I=r instanceof Function?r(q):q;r instanceof Array||(r=[r]);o=h(I||"",t);n.push(r);E=function(){var x,C,J;J=[];x=0;for(C=r.length;x<C;x++){F=r[x];n[n.length-1]=F;J.push(l.apply(null,[this,o].concat(b.call(arguments))))}return J}.apply(this,arguments);n.pop();return E.join("")}};i["^"]=function(m,t,q){return function(n){var o;o=j(m,n)||[];o instanceof Array||(o=[1]);o=o.length===0?h(q,t):[];return l.apply(null,
[this,o].concat(b.call(arguments)))}};e.push(i[k](p,c,I));break;case "/":if(d==null)A="End Section tag '"+p+"' found, but not in section!";else if(p!==(D=d.name))A="End Section tag closes '"+p+"'; expected '"+D+"'!";if(A)throw H(v.lastIndex,A);a=a.slice(d.start,y+1||9E9);w[a]=e;return[a,s];case "=":if((c=p.split(/\s+/)).length!==2)A="Set Delimiters tags should have two and only two values!";if(A)throw H(v.lastIndex,A);K=/[-[\]{}()*+?.,\\^$|#]/g;c=function(){var m,t,q;q=[];m=0;for(t=c.length;m<t;m++){z=
c[m];q.push(z.replace(K,"\\$&"))}return q}();v=f();break;default:throw H(v.lastIndex,"Unknown tag type -- "+k);}v.lastIndex=s!=null?s:a.length}if(d!=null)throw d.error;a.length!==s&&e.push(function(){return a.slice(s)});return w[a]=e};this.Mustache={version:"0.0.1",helpers:[],partials:null,escape:function(a){return String(a).replace(/[&"<>]/g,function(c){return"&"+u[c]+";"})},render:function(a,c,d){if(d==null)d=null;return l(this,h(a),[].concat([c]),d)}}}).call(this);
