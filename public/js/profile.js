require=function t(e,n,o){function i(r,a){if(!n[r]){if(!e[r]){var c="function"==typeof require&&require;if(!a&&c)return c(r,!0);if(s)return s(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[r]={exports:{}};e[r][0].call(u.exports,function(t){var n=e[r][1][t];return i(n?n:t)},u,u.exports,t,e,n,o)}return n[r].exports}for(var s="function"==typeof require&&require,r=0;r<o.length;r++)i(o[r]);return i}({"/root/javascript-nodejs/node_modules/client/delegate.js":[function(t,e){"use strict";function n(t,e){for(var n=t.target;n;){if(n.matches(e))return n;if(n==t.currentTarget)break;n=n.parentElement}return null}function o(t,e,o,i,s){t.addEventListener(o,function(t){var o=n(t,e);t.delegateTarget=o,o&&i.call(s||this,t)})}t("./polyfill"),o.delegateMixin=function(t){t.delegate=function(t,e,n){o(this.elem,t,e,n,this)}},e.exports=o},{"./polyfill":"/root/javascript-nodejs/node_modules/client/polyfill/index.js"}],"/root/javascript-nodejs/node_modules/client/imageUploader.js":[function(t,e){function n(t){this.file=t}var o=t("client/xhr");n.prototype.upload=function(){var t=new FormData;t.append("image",this.file);var e=o({method:"POST",url:"https://api.imgur.com/3/image.json",json:!0});return e.successStatuses=[200,400],e.setRequestHeader("Authorization","Client-ID 675c2d9b213e56b"),setTimeout(function(){e.send(t)},0),e},e.exports=n},{"client/xhr":"/root/javascript-nodejs/node_modules/client/xhr.js"}],"/root/javascript-nodejs/node_modules/client/notify.js":[function(t,e,n){var o=t("humane-js");n.info=o.spawn({addnCls:"humane-libnotify-info",timeout:1e3}),n.error=o.spawn({addnCls:"humane-libnotify-error",timeout:3e3})},{"humane-js":"/root/javascript-nodejs/node_modules/humane-js/humane.js"}],"/root/javascript-nodejs/node_modules/client/polyfill/dom4.js":[function(){var t={matches:Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector,remove:function(){var t=this.parentNode;return t?t.removeChild(this):void 0}};for(var e in t)Element.prototype[e]||(Element.prototype[e]=t[e]);try{new CustomEvent("IE has CustomEvent, but doesn't support constructor")}catch(n){window.CustomEvent=function(t,e){var n;return e=e||{bubbles:!1,cancelable:!1,detail:void 0},n=document.createEvent("CustomEvent"),n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},CustomEvent.prototype=Object.create(window.Event.prototype)}},{}],"/root/javascript-nodejs/node_modules/client/polyfill/index.js":[function(t){t("./dom4")},{"./dom4":"/root/javascript-nodejs/node_modules/client/polyfill/dom4.js"}],"/root/javascript-nodejs/node_modules/client/xhr-notify.js":[function(t){var e=t("./notify");document.addEventListener("xhrfail",function(t){e.error(t.reason)})},{"./notify":"/root/javascript-nodejs/node_modules/client/notify.js"}],"/root/javascript-nodejs/node_modules/client/xhr.js":[function(t,e){function n(t){function e(t,e){var n=new CustomEvent(t);return n.originalEvent=e,n}function n(t,n){var o=e("fail",n);o.reason=t,s.dispatchEvent(o)}function i(t,n){var o=e("success",n);o.result=t,s.dispatchEvent(o)}var s=new XMLHttpRequest,r=t.method||"GET";s.open(r,t.url,t.sync?!1:!0),s.method=r,t.noGlobalEvents||(s.addEventListener("loadstart",function(t){var n=e("xhrstart",t);document.dispatchEvent(n)}),s.addEventListener("loadend",function(t){var n=e("xhrend",t);document.dispatchEvent(n)}),s.addEventListener("success",function(t){var n=e("xhrsuccess",t);n.result=t.result,document.dispatchEvent(n)}),s.addEventListener("fail",function(t){var n=e("xhrfail",t);n.reason=t.reason,document.dispatchEvent(n)})),t.json&&s.setRequestHeader("Accept","application/json");var a=t.successStatuses||[200];return s.addEventListener("error",function(t){n("Ошибка связи с сервером.",t)}),s.addEventListener("timeout",function(t){n("Превышено максимально допустимое время ожидания ответа от сервера.",t)}),s.addEventListener("abort",function(t){n("Запрос был прерван.",t)}),s.addEventListener("load",function(e){if(!this.status)return void n("Не получен ответ от сервера.",e);if(-1==a.indexOf(this.status))return void n("Ошибка на стороне сервера (код "+this.status+"), попытайтесь позднее",e);var o=this.responseText,s=this.getResponseHeader("Content-Type");if(s.match(/^application\/json/)||t.json)try{o=JSON.parse(o)}catch(e){return void n("Некорректный формат ответа от сервера",e)}i(o,e)}),o(s),s}function o(t){var e=t.send;t.send=function(t){~["GET","HEAD","OPTIONS"].indexOf(this.method)||(t instanceof FormData&&t.append("_csrf",window.csrf),"[object Object]"=={}.toString.call(t)&&(t._csrf=window.csrf),t||(t={_csrf:window.csrf})),"[object Object]"=={}.toString.call(t)&&(this.setRequestHeader("Content-Type","application/json;charset=UTF-8"),t=JSON.stringify(t)),e.call(this,t)}}t("./polyfill"),t("./xhr-notify"),e.exports=n},{"./polyfill":"/root/javascript-nodejs/node_modules/client/polyfill/index.js","./xhr-notify":"/root/javascript-nodejs/node_modules/client/xhr-notify.js"}],"/root/javascript-nodejs/node_modules/humane-js/humane.js":[function(t,e){!function(t,n,o){"undefined"!=typeof e?e.exports=o(t,n):"function"==typeof define&&"object"==typeof define.amd?define(o):n[t]=o(t,n)}("humane",this,function(){var t=window,e=document,n={on:function(e,n,o){"addEventListener"in t?e.addEventListener(n,o,!1):e.attachEvent("on"+n,o)},off:function(e,n,o){"removeEventListener"in t?e.removeEventListener(n,o,!1):e.detachEvent("on"+n,o)},bind:function(t,e){return function(){t.apply(e,arguments)}},isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},config:function(t,e){return null!=t?t:e},transSupport:!1,useFilter:/msie [678]/i.test(navigator.userAgent),_checkTransition:function(){var t=e.createElement("div"),n={webkit:"webkit",Moz:"",O:"o",ms:"MS"};for(var o in n)o+"Transition"in t.style&&(this.vendorPrefix=n[o],this.transSupport=!0)}};n._checkTransition();var o=function(e){e||(e={}),this.queue=[],this.baseCls=e.baseCls||"humane",this.addnCls=e.addnCls||"",this.timeout="timeout"in e?e.timeout:2500,this.waitForMove=e.waitForMove||!1,this.clickToClose=e.clickToClose||!1,this.timeoutAfterMove=e.timeoutAfterMove||!1,this.container=e.container;try{this._setupEl()}catch(o){n.on(t,"load",n.bind(this._setupEl,this))}};return o.prototype={constructor:o,_setupEl:function(){var t=e.createElement("div");if(t.style.display="none",!this.container){if(!e.body)throw"document.body is null";this.container=e.body}this.container.appendChild(t),this.el=t,this.removeEvent=n.bind(function(){this.timeoutAfterMove?setTimeout(n.bind(this.remove,this),this.timeout):this.remove()},this),this.transEvent=n.bind(this._afterAnimation,this),this._run()},_afterTimeout:function(){n.config(this.currentMsg.waitForMove,this.waitForMove)?this.removeEventsSet||(n.on(e.body,"mousemove",this.removeEvent),n.on(e.body,"click",this.removeEvent),n.on(e.body,"keypress",this.removeEvent),n.on(e.body,"touchstart",this.removeEvent),this.removeEventsSet=!0):this.remove()},_run:function(){if(!this._animating&&this.queue.length&&this.el){this._animating=!0,this.currentTimer&&(clearTimeout(this.currentTimer),this.currentTimer=null);var t=this.queue.shift(),e=n.config(t.clickToClose,this.clickToClose);e&&(n.on(this.el,"click",this.removeEvent),n.on(this.el,"touchstart",this.removeEvent));var o=n.config(t.timeout,this.timeout);o>0&&(this.currentTimer=setTimeout(n.bind(this._afterTimeout,this),o)),n.isArray(t.html)&&(t.html="<ul><li>"+t.html.join("<li>")+"</ul>"),this.el.innerHTML=t.html,this.currentMsg=t,this.el.className=this.baseCls,n.transSupport?(this.el.style.display="block",setTimeout(n.bind(this._showMsg,this),50)):this._showMsg()}},_setOpacity:function(t){if(n.useFilter)try{this.el.filters.item("DXImageTransform.Microsoft.Alpha").Opacity=100*t}catch(e){}else this.el.style.opacity=String(t)},_showMsg:function(){var t=n.config(this.currentMsg.addnCls,this.addnCls);if(n.transSupport)this.el.className=this.baseCls+" "+t+" "+this.baseCls+"-animate";else{var e=0;this.el.className=this.baseCls+" "+t+" "+this.baseCls+"-js-animate",this._setOpacity(0),this.el.style.display="block";var o=this,i=setInterval(function(){1>e?(e+=.1,e>1&&(e=1),o._setOpacity(e)):clearInterval(i)},30)}},_hideMsg:function(){var t=n.config(this.currentMsg.addnCls,this.addnCls);if(n.transSupport)this.el.className=this.baseCls+" "+t,n.on(this.el,n.vendorPrefix?n.vendorPrefix+"TransitionEnd":"transitionend",this.transEvent);else var e=1,o=this,i=setInterval(function(){e>0?(e-=.1,0>e&&(e=0),o._setOpacity(e)):(o.el.className=o.baseCls+" "+t,clearInterval(i),o._afterAnimation())},30)},_afterAnimation:function(){n.transSupport&&n.off(this.el,n.vendorPrefix?n.vendorPrefix+"TransitionEnd":"transitionend",this.transEvent),this.currentMsg.cb&&this.currentMsg.cb(),this.el.style.display="none",this._animating=!1,this._run()},remove:function(t){var o="function"==typeof t?t:null;n.off(e.body,"mousemove",this.removeEvent),n.off(e.body,"click",this.removeEvent),n.off(e.body,"keypress",this.removeEvent),n.off(e.body,"touchstart",this.removeEvent),n.off(this.el,"click",this.removeEvent),n.off(this.el,"touchstart",this.removeEvent),this.removeEventsSet=!1,o&&this.currentMsg&&(this.currentMsg.cb=o),this._animating?this._hideMsg():o&&o()},log:function(t,e,n,o){var i={};if(o)for(var s in o)i[s]=o[s];if("function"==typeof e)n=e;else if(e)for(var s in e)i[s]=e[s];return i.html=t,n&&(i.cb=n),this.queue.push(i),this._run(),this},spawn:function(t){var e=this;return function(n,o,i){return e.log.call(e,n,o,i,t),e}},create:function(t){return new o(t)}},new o})},{}],"/root/javascript-nodejs/node_modules/profile/client/authProvidersManager.js":[function(t,e){function n(){this.elem=document.body,this.delegate('[data-action="provider-add"]',"click",function(t){t.preventDefault(),this.addProvider(t.delegateTarget.dataset.provider)}),this.delegate('[data-action="provider-remove"]',"click",function(t){t.preventDefault(),this.removeProvider(t.delegateTarget.dataset.provider)})}var o=t("client/delegate"),i=t("client/notify"),s=t("client/xhr");n.prototype.addProvider=function(t){this.openAuthPopup("/auth/connect/"+t)},n.prototype.removeProvider=function(t){var e=s({method:"POST",url:"/auth/disconnect/"+t});e.addEventListener("success",function(){window.location.reload()}),e.send()},n.prototype.openAuthPopup=function(t){this.authPopup&&!this.authPopup.closed&&this.authPopup.close();var e=800,n=600,o=(window.outerHeight-n)/2,i=(window.outerWidth-e)/2;window.authProvidersManager=this,this.authPopup=window.open(t,"authProvidersManager","width="+e+",height="+n+",scrollbars=0,top="+o+",left="+i)},n.prototype.onAuthSuccess=function(){window.location.reload()},n.prototype.onAuthFailure=function(t){i.error(t||"Отказ в авторизации","error")},o.delegateMixin(n.prototype),e.exports=n},{"client/delegate":"/root/javascript-nodejs/node_modules/client/delegate.js","client/notify":"/root/javascript-nodejs/node_modules/client/notify.js","client/xhr":"/root/javascript-nodejs/node_modules/client/xhr.js"}],"/root/javascript-nodejs/node_modules/profile/client/photoChanger.js":[function(t,e){function n(){this.elem=document.body.querySelector('[data-action="photo-change"]'),this.img=this.elem,this.elem.addEventListener("click",function(t){t.preventDefault(),this.changePhoto()}.bind(this))}var o=t("client/delegate"),i=t("client/xhr"),s=t("client/imageUploader"),r=t("client/notify");n.prototype.changePhoto=function(){var t=document.createElement("input");t.type="file";var e=this;t.onchange=function(){e.upload(this.files[0])},t.click()},n.prototype.updateUserPhoto=function(t){var e=this,n=i({method:"PATCH",url:"/users/me"});n.send({photo:t}),n.addEventListener("success",function(t){e.img.src=t.result.photo.replace(/(\.\w+)$/,window.devicePixelRatio>1?"m$1":"t$1")})},n.prototype.upload=function(t){var e=new s(t).upload(),n=this;e.addEventListener("success",function(t){return 400==this.status?void r.error("Неверный тип файла или изображение повреждено."):t.result.data.width<160||t.result.data.height<160?void r.error("Минимальное разрешение 160x160, лучше 320px."):void n.updateUserPhoto(t.result.data.link)})},o.delegateMixin(n.prototype),e.exports=n},{"client/delegate":"/root/javascript-nodejs/node_modules/client/delegate.js","client/imageUploader":"/root/javascript-nodejs/node_modules/client/imageUploader.js","client/notify":"/root/javascript-nodejs/node_modules/client/notify.js","client/xhr":"/root/javascript-nodejs/node_modules/client/xhr.js"}],"profile/client":[function(t,e,n){var o=t("./authProvidersManager"),i=t("./photoChanger");n.init=function(){new o,new i}},{"./authProvidersManager":"/root/javascript-nodejs/node_modules/profile/client/authProvidersManager.js","./photoChanger":"/root/javascript-nodejs/node_modules/profile/client/photoChanger.js"}]},{},[]);