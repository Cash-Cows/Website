/**
 * Fortmatic JavaScript SDK lets developers conveniently connect their 
 * web apps to the Ethereum blockchain - allowing end-users to interact 
 * with their apps on any modern browser, without requiring them to 
 * download any browser extensions or mobile dApp browsers.
 */
window.Fortmatic=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=8)}([function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}Object.defineProperty(t,"__esModule",{value:!0}),n(r(13)),n(r(17))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(18);function o(e){var r,i;return e.jsonrpc=e.jsonrpc||t.JSON_RPC_VERSION,e.id=n.getPayloadId(),e.batch||"eth_batchRequest"===e.method?(e.method="eth_batchRequest",e.batch=null!=(i=null===(r=e.batch)||void 0===r?void 0:r.map((function(e){return o(e)})))?i:[],e):(e.params=e.params||[],e)}t.JSON_RPC_VERSION="2.0",t.createJsonRpcRequestPayload=function(e,r){var o=[{}];return r&&(o=Array.isArray(r)?r:[{to:r.to,value:r.amount}]),{params:o,method:e,jsonrpc:t.JSON_RPC_VERSION,id:n.getPayloadId()}},t.createJsonRpcBatchRequestPayload=function(e){void 0===e&&(e=[]);var r=Array.isArray(e)?e:[e];return{method:"eth_batchRequest",jsonrpc:t.JSON_RPC_VERSION,id:n.getPayloadId(),batch:r.filter(Boolean).map((function(e){return o(e)}))}},t.standardizeRequestPayload=o},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var i=r(0),a=r(4),s=function(e){function t(r,n){var o=e.call(this,"Fortmatic SDK Error: ["+r+"] "+n)||this;return o.code=r,o.__proto__=Error,Object.setPrototypeOf(o,t.prototype),o}return o(t,e),t}(Error);t.FortmaticError=s;var u=function(){function e(e,t){this.code=e,this.message="Fortmatic SDK Warning: ["+e+"] "+t}return e.prototype.log=function(){console.warn(this.message)},e}();t.FortmaticWarning=u;var c=function(e){function t(r){var n,o,s=e.call(this)||this;s.__proto__=Error;var u=Number(null===(n=r)||void 0===n?void 0:n.code),c=(null===(o=r)||void 0===o?void 0:o.message)||"Internal error";return s.code=a.isJsonRpcErrorCode(u)?u:i.RPCErrorCode.InternalError,s.message="Fortmatic RPC Error: ["+s.code+"] "+c,Object.setPrototypeOf(s,t.prototype),s}return o(t,e),t}(Error);t.RpcError=c,t.createMissingApiKeyError=function(){return new s(i.SDKErrorCode.MissingApiKey,"Please provide a Fortmatic API key that you acquired from the developer dashboard.")},t.createModalNotReadyError=function(){return new s(i.SDKErrorCode.ModalNotReady,"Modal is not ready.")},t.createInvalidArgumentError=function(e){var t,r,n,o;return new s(i.SDKErrorCode.InvalidArgument,"Invalid "+(t=e.argIndex,o=(r=t+1)%100,1===(n=r%10)&&11!==o?r+"st":2===n&&12!==o?r+"nd":3===n&&13!==o?r+"rd":r+"th")+" argument given to `"+e.functionName+"`.\n  Expected: `"+e.expected+"`\n  Received: `"+e.received+"`")},t.createSynchronousWeb3MethodWarning=function(){return new u(i.SDKWarningCode.SyncWeb3Method,"Non-async web3 methods will be deprecated in web3 > 1.0 and are not supported by the Fortmatic provider. An async method is to be used instead.")},t.createDuplicateIframeWarning=function(){return new u(i.SDKWarningCode.DuplicateIframe,"Duplicate iframes found.")}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1);t.emitWeb3Payload=function(e,t,r){return void 0===r&&(r=[]),new Promise((function(o,i){e.sendAsync(n.createJsonRpcRequestPayload(t,r),(function(e,t){e?i(e):o(t.result)}))}))},t.emitFortmaticPayload=function(e,t){return new Promise((function(r,n){e.sendFortmaticAsync(t,(function(e,t){e?n(e):r(t?t.result:{})}))}))}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);function o(e){return!!e&&!(!e.jsonrpc||!e.id||!e.method||!e.batch||e.params)}function i(e){return!!e&&!(!e.jsonrpc||!e.id||!e.method||!e.params||e.batch)}t.isJsonRpcBatchRequestPayload=o,t.isJsonRpcRequestPayload=i,t.isJsonRpcResponsePayload=function(e){return!!e&&!(!e.jsonrpc||!e.id||!e.result&&null!==e.result&&!e.error)},t.isFmRequest=function(e){return!(!e||!e.payload)&&i(e.payload)},t.isFmBatchRequest=function(e){return!(!e||!e.payload)&&o(e.payload)},t.isFmPayloadMethod=function(e){return!!e&&("string"==typeof e&&Object.values(n.FmPayloadMethod).includes(e))},t.isJsonRpcErrorCode=function(e){return!!e&&("number"==typeof e&&Object.values(n.RPCErrorCode).includes(e))}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){this.sdk=e};t.BaseModule=n},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function s(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}u((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},i=this&&this.__values||function(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(t,"__esModule",{value:!0});var a=r(0),s=r(4),u=r(7),c=r(2);function l(e,t){var r,n,o,i,a,c;!function(e){var t,r,n,o,i,a,s=!!e.data.response.error||!!e.data.response.message||!!e.data.response.code,u={message:(r=null===(t=e.data.response.error)||void 0===t?void 0:t.message,n=null!=r?r:e.data.response.message,null!=n?n:"Fortmatic: Modal was closed without executing action!"),code:(i=null===(o=e.data.response.error)||void 0===o?void 0:o.code,a=null!=i?i:e.data.response.code,null!=a?a:1)};e.data.response.error=s?u:null}(t);var l=null!=(n=null===(r=t.data.response)||void 0===r?void 0:r.id)?n:void 0;return{response:new u.JsonRpcResponse(function(e,t){return t&&s.isJsonRpcBatchRequestPayload(e)&&e.batch.find((function(e){return e.id===t}))||e}(e,l)).applyResult(null===(o=t.data.response)||void 0===o?void 0:o.result).applyError(null===(i=t.data.response)||void 0===i?void 0:i.error),id:(c=null===(a=t.data.response)||void 0===a?void 0:a.id,null!=c?c:void 0)}}var d=function(){function e(e,t){this.endpoint=e,this.encodedQueryParams=t,this.messageHandlers=new Set,this.initMessageListener()}return e.prototype.post=function(e,t,r){return n(this,void 0,void 0,(function(){var n,i=this;return o(this,(function(o){switch(o.label){case 0:return[4,e.iframe];case 1:return n=o.sent(),[2,new Promise((function(e,o){if(n.contentWindow){var d=[],p=s.isJsonRpcBatchRequestPayload(r)?r.batch.map((function(e){return e.id})):[];n.contentWindow.postMessage({msgType:t+"-"+i.encodedQueryParams,payload:r},"*");var f=i.on(a.FmIncomingWindowMessage.FORTMATIC_HANDLE_RESPONSE,(h=function(){f(),y()},function(t){var n=l(r,t),o=n.id,i=n.response;o&&s.isJsonRpcBatchRequestPayload(r)&&p.includes(o)?(d.push(i.payload),d.length===r.batch.length&&(h(),e(d))):o&&o===r.id&&(h(),e(i.payload))})),y=i.on(a.FmIncomingWindowMessage.FORTMATIC_USER_DENIED,function(t){return function(n){var o=l(r,n),i=o.id,a=o.response,c={message:"Fortmatic: Modal was closed without executing action!",code:1},f=a.hasError?a.payload:a.applyError(c).payload;if(i&&s.isJsonRpcBatchRequestPayload(r)&&p.includes(i)){d.push(f);for(var y=d.length;y<r.batch.length;y++)d.push(new u.JsonRpcResponse(r.batch[y]).applyError(c).payload);t(),e(d)}else i&&i===r.id&&(t(),e(f))}}((function(){y(),f()})))}else o(c.createModalNotReadyError());var h}))]}}))}))},e.prototype.on=function(e,t){var r=this,n=t.bind(window),o=function(t){t.data.msgType===e+"-"+r.encodedQueryParams&&n(t)};return this.messageHandlers.add(o),function(){return r.messageHandlers.delete(o)}},e.prototype.initMessageListener=function(){var e=this;window.addEventListener("message",(function(t){var r,n,o;if(t.origin===e.endpoint&&t.data&&t.data.msgType&&e.messageHandlers.size){t.data.response=null!=(o=t.data.response)?o:{};try{for(var a=i(e.messageHandlers.values()),s=a.next();!s.done;s=a.next()){(0,s.value)(t)}}catch(e){r={error:e}}finally{try{s&&!s.done&&(n=a.return)&&n.call(a)}finally{if(r)throw r.error}}}}))},e}();t.FmPayloadTransport=d},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(4),o=function(){function e(t){t instanceof e?(this._jsonrpc=t.payload.jsonrpc,this._id=t.payload.id,this._result=t.payload.result,this._error=t.payload.error):n.isJsonRpcResponsePayload(t)?(this._jsonrpc=t.jsonrpc,this._id=t.id,this._result=t.result,this._error=t.error):(this._jsonrpc=t.jsonrpc,this._id=t.id,this._result=null,this._error=null)}return e.prototype.applyError=function(e){return this._error=e,this},e.prototype.applyResult=function(e){return this._result=e,this},Object.defineProperty(e.prototype,"hasError",{get:function(){return void 0!==this._error&&null!==this._error},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"hasResult",{get:function(){return void 0!==this._result&&null!==this._result},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"payload",{get:function(){return{jsonrpc:this._jsonrpc,id:this._id,result:this._result,error:this._error}},enumerable:!0,configurable:!0}),e}();t.JsonRpcResponse=o},function(e,t,r){e.exports=r(9)},function(e,t,r){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};var o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var i=r(10);t.default=i.Fortmatic;var a=r(2);t.FortmaticError=a.FortmaticError,t.FortmaticWarning=a.FortmaticWarning,t.RpcError=a.RpcError;var s=o(r(0));Object.assign(i.Fortmatic,n(n({},s),{FortmaticError:a.FortmaticError,FortmaticWarning:a.FortmaticWarning,RpcError:a.RpcError})),function(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}(r(0))},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function s(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}u((n=n.apply(e,t||[])).next())}))},a=this&&this.__generator||function(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(t,"__esModule",{value:!0});var s=r(11),u=r(12),c=r(19),l=r(20),d=r(0),p=r(3),f=r(1),y=r(21),h=r(23),_=r(24),m=r(2),v=function(){function e(e){if(!e.apiKey)throw m.createMissingApiKeyError();this.apiKey=e.apiKey,this.endpoint=new URL(e.endpoint).origin,this.encodedQueryParams=h.encodeQueryParameters({API_KEY:this.apiKey,DOMAIN_ORIGIN:window.location?window.location.origin:"",ETH_NETWORK:e.ethNetwork,host:new URL(this.endpoint).host,sdk:_.name,version:_.version})}return e.prototype.getProvider=function(){return e.__provider__.has(this.encodedQueryParams)||e.__provider__.set(this.encodedQueryParams,new y.FmProvider(this.endpoint,this.apiKey,this.encodedQueryParams)),e.__provider__.get(this.encodedQueryParams)},e.__provider__=new Map,e}();t.SDK=v;var g=function(e){function t(t,r){var n=e.call(this,{apiKey:t,ethNetwork:r,endpoint:s.PHANTOM_URL})||this;return n.user=new u.PhantomUser(n),n}return o(t,e),t.prototype.loginWithMagicLink=function(e){return i(this,void 0,void 0,(function(){var t,r,n,o;return a(this,(function(i){switch(i.label){case 0:return t=e.email,r=e.showUI,n=void 0===r||r,o=f.createJsonRpcRequestPayload(d.FmPayloadMethod.fm_auth_login_with_magic_link,[{email:t,showUI:n}]),[4,p.emitFortmaticPayload(this.getProvider(),o)];case 1:return i.sent(),[2,this.user]}}))}))},t}(v);t.PhantomMode=g;var b=function(e){function t(t,r){var n=e.call(this,{apiKey:t,ethNetwork:r,endpoint:s.WIDGET_URL})||this;return n.transactions=new c.TransactionsModule(n),n.user=new l.UserModule(n),n}return o(t,e),t.prototype.configure=function(e){void 0===e&&(e={});var t=f.createJsonRpcRequestPayload(d.FmPayloadMethod.fm_configure,[e]);return p.emitFortmaticPayload(this.getProvider(),t)},t.Phantom=g,t}(v);t.WidgetMode=b,t.Fortmatic=b},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.WIDGET_URL="https://x2.fortmatic.com",t.PHANTOM_URL="https://auth.fortmatic.com"},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var i=r(0),a=r(3),s=r(1),u=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.getIdToken=function(e){var t=s.createJsonRpcRequestPayload(i.FmPayloadMethod.fm_auth_get_access_token,[e]);return a.emitFortmaticPayload(this.sdk.getProvider(),t)},t.prototype.getMetadata=function(){var e=s.createJsonRpcRequestPayload(i.FmPayloadMethod.fm_auth_get_metadata);return a.emitFortmaticPayload(this.sdk.getProvider(),e)},t.prototype.isLoggedIn=function(){var e=s.createJsonRpcRequestPayload(i.FmPayloadMethod.fm_is_logged_in);return a.emitFortmaticPayload(this.sdk.getProvider(),e)},t.prototype.logout=function(){var e=s.createJsonRpcRequestPayload(i.FmPayloadMethod.fm_auth_logout);return a.emitFortmaticPayload(this.sdk.getProvider(),e)},t}(r(5).BaseModule);t.PhantomUser=u},function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}Object.defineProperty(t,"__esModule",{value:!0}),n(r(14)),n(r(15)),n(r(16))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.fm_composeSend="fm_composeSend",e.fm_logout="fm_logout",e.fm_get_balances="fm_get_balances",e.fm_get_transactions="fm_get_transactions",e.fm_is_logged_in="fm_is_logged_in",e.fm_accountSettings="fm_accountSettings",e.fm_deposit="fm_deposit",e.fm_get_user="fm_get_user",e.fm_configure="fm_configure",e.fm_auth_login_with_magic_link="fm_auth_login_with_magic_link",e.fm_auth_get_access_token="fm_auth_get_access_token",e.fm_auth_get_metadata="fm_auth_get_metadata",e.fm_auth_logout="fm_auth_logout"}(t.FmPayloadMethod||(t.FmPayloadMethod={}))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.FORTMATIC_HANDLE_RESPONSE="FORTMATIC_HANDLE_RESPONSE",e.FORTMATIC_OVERLAY_READY="FORTMATIC_OVERLAY_READY",e.FORTMATIC_SHOW_OVERLAY="FORTMATIC_SHOW_OVERLAY",e.FORTMATIC_HIDE_OVERLAY="FORTMATIC_HIDE_OVERLAY",e.FORTMATIC_USER_DENIED="FORTMATIC_USER_DENIED",e.FORTMATIC_USER_LOGOUT="FORTMATIC_USER_LOGOUT"}(t.FmIncomingWindowMessage||(t.FmIncomingWindowMessage={})),function(e){e.FORTMATIC_HANDLE_BATCH_REQUEST="FORTMATIC_HANDLE_BATCH_REQUEST",e.FORTMATIC_HANDLE_REQUEST="FORTMATIC_HANDLE_REQUEST",e.FORTMATIC_HANDLE_FORTMATIC_REQUEST="FORTMATIC_HANDLE_FORTMATIC_REQUEST"}(t.FmOutgoingWindowMessage||(t.FmOutgoingWindowMessage={}))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.MissingApiKey="MISSING_API_KEY",e.ModalNotReady="MODAL_NOT_READY",e.InvalidArgument="INVALID_ARGUMENT"}(t.SDKErrorCode||(t.SDKErrorCode={})),function(e){e.SyncWeb3Method="SYNC_WEB3_METHOD",e.DuplicateIframe="DUPLICATE_IFRAME"}(t.SDKWarningCode||(t.SDKWarningCode={})),function(e){e[e.ParseError=-32700]="ParseError",e[e.InvalidRequest=-32600]="InvalidRequest",e[e.MethodNotFound=-32601]="MethodNotFound",e[e.InvalidParams=-32602]="InvalidParams",e[e.InternalError=-32603]="InternalError",e[e.MagicLinkFailedVerification=-1e4]="MagicLinkFailedVerification",e[e.MagicLinkExpired=-10001]="MagicLinkExpired",e[e.MagicLinkRateLimited=-10002]="MagicLinkRateLimited",e[e.UserAlreadyLoggedIn=-10003]="UserAlreadyLoggedIn"}(t.RPCErrorCode||(t.RPCErrorCode={}))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.LoginWithEmail="email",e.LoginWithPhone="phone"}(t.WidgetModePrimaryLoginOption||(t.WidgetModePrimaryLoginOption={}))},function(e,t,r){"use strict";var n=this&&this.__generator||function(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(t,"__esModule",{value:!0});var o=function(){var e;return n(this,(function(t){switch(t.label){case 0:e=0,t.label=1;case 1:return e<Number.MAX_SAFE_INTEGER?[4,++e]:[3,3];case 2:return t.sent(),[3,4];case 3:e=0,t.label=4;case 4:return[3,1];case 5:return[2]}}))}();t.getPayloadId=function(){return o.next().value}},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var i=r(0),a=r(1),s=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.send=function(e,t){var r=a.createJsonRpcRequestPayload(i.FmPayloadMethod.fm_composeSend,e);this.sdk.getProvider().sendFortmaticAsync(r,t)},t}(r(5).BaseModule);t.TransactionsModule=s},function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function s(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}u((n=n.apply(e,t||[])).next())}))},a=this&&this.__generator||function(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(t,"__esModule",{value:!0});var s=r(0),u=r(3),c=r(1),l=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.login=function(){return i(this,void 0,void 0,(function(){return a(this,(function(e){return[2,this.sdk.getProvider().enable()]}))}))},t.prototype.logout=function(){var e=c.createJsonRpcRequestPayload(s.FmPayloadMethod.fm_logout);return u.emitFortmaticPayload(this.sdk.getProvider(),e)},t.prototype.getUser=function(){var e=c.createJsonRpcRequestPayload(s.FmPayloadMethod.fm_get_user);return u.emitFortmaticPayload(this.sdk.getProvider(),e)},t.prototype.getBalances=function(){var e=c.createJsonRpcRequestPayload(s.FmPayloadMethod.fm_get_balances);return u.emitFortmaticPayload(this.sdk.getProvider(),e)},t.prototype.getTransactions=function(){var e=c.createJsonRpcRequestPayload(s.FmPayloadMethod.fm_get_transactions);return u.emitFortmaticPayload(this.sdk.getProvider(),e)},t.prototype.isLoggedIn=function(){var e=c.createJsonRpcRequestPayload(s.FmPayloadMethod.fm_is_logged_in);return u.emitFortmaticPayload(this.sdk.getProvider(),e)},t.prototype.settings=function(){var e=c.createJsonRpcRequestPayload(s.FmPayloadMethod.fm_accountSettings);return u.emitFortmaticPayload(this.sdk.getProvider(),e)},t.prototype.deposit=function(){var e=c.createJsonRpcRequestPayload(s.FmPayloadMethod.fm_deposit);return u.emitFortmaticPayload(this.sdk.getProvider(),e)},t}(r(5).BaseModule);t.UserModule=l},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function s(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}u((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(t,"__esModule",{value:!0});var i=r(0),a=r(3),s=r(1),u=r(4),c=r(22),l=r(6),d=r(7),p=r(2),f=function(){function e(e,t,r){this.apiKey=t,this.isFortmatic=!0,this.queue=[],this.overlay=new c.FmIframeController(e,r),this.payloadTransport=new l.FmPayloadTransport(e,r),this.listen()}return e.prototype.sendAsync=function(e,t){if(!t)throw p.createInvalidArgumentError({functionName:"sendAsync",argIndex:1,expected:"function",received:null===t?"null":typeof t});if(Array.isArray(e))return this.enqueue({onRequestComplete:t,payload:s.createJsonRpcBatchRequestPayload(e)});var r=s.standardizeRequestPayload(e);return u.isJsonRpcBatchRequestPayload(r),this.enqueue({onRequestComplete:t,payload:r})},e.prototype.sendFortmaticAsync=function(e,t){if(!t)throw p.createInvalidArgumentError({functionName:"sendFortmaticAsync",argIndex:1,expected:"function",received:null===t?"null":typeof t});var r=s.standardizeRequestPayload(e);this.enqueue({onRequestComplete:t,payload:r,isFortmaticMethod:!0})},e.prototype.send=function(e,t){return"string"==typeof e?a.emitWeb3Payload(this,e,t):t?void this.sendAsync(e,t):(p.createSynchronousWeb3MethodWarning().log(),new d.JsonRpcResponse(e).applyError({code:-32603,message:"Non-async web3 methods will be deprecated in web3 > 1.0 and are not supported by the Fortmatic provider. An async method is to be used instead."}).payload)},e.prototype.enable=function(){return a.emitWeb3Payload(this,"eth_accounts")},e.prototype.enqueue=function(e){e&&(this.queue.push(e),this.overlay.overlayReady&&this.dequeue())},e.prototype.dequeue=function(){return n(this,void 0,void 0,(function(){var e,t,r,n;return o(this,(function(o){switch(o.label){case 0:return 0===this.queue.length?[2]:(e=this.queue.shift())?(t=e.payload,u.isJsonRpcBatchRequestPayload(t)?0===t.batch.length?[2,e.onRequestComplete(null,[])]:[4,this.payloadTransport.post(this.overlay,i.FmOutgoingWindowMessage.FORTMATIC_HANDLE_REQUEST,t)]:[3,2]):[3,5];case 1:r=o.sent(),e.onRequestComplete(null,r),o.label=2;case 2:return u.isJsonRpcRequestPayload(t)?[4,this.payloadTransport.post(this.overlay,e.isFortmaticMethod?i.FmOutgoingWindowMessage.FORTMATIC_HANDLE_FORTMATIC_REQUEST:i.FmOutgoingWindowMessage.FORTMATIC_HANDLE_REQUEST,t)]:[3,4];case 3:(n=o.sent()).error?e.onRequestComplete(new p.RpcError(n.error),n):e.onRequestComplete(null,n),o.label=4;case 4:this.dequeue(),o.label=5;case 5:return[2]}}))}))},e.prototype.listen=function(){var e=this;this.payloadTransport.on(i.FmIncomingWindowMessage.FORTMATIC_OVERLAY_READY,(function(){e.dequeue()})),this.payloadTransport.on(i.FmIncomingWindowMessage.FORTMATIC_USER_DENIED,(function(){e.queue.forEach((function(e){var t=new d.JsonRpcResponse(e.payload),r={message:"Fortmatic: Modal was closed without executing action!",code:1};e.onRequestComplete(new p.RpcError(r),t.applyError(r).payload)})),e.queue.slice(0)}))},e}();t.FmProvider=f},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function s(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}u((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},i=this&&this.__values||function(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},a=this&&this.__read||function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,i=r.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a};Object.defineProperty(t,"__esModule",{value:!0});var s=r(0),u=r(6),c=r(2),l={display:"none",position:"fixed",top:"0",right:"0",width:"100%",height:"100%",borderRadius:"0",border:"none",zIndex:"2147483647"};var d=function(){function e(e,t){this.endpoint=e,this.encodedQueryParams=t,this._overlayReady=!1,this.iframe=this.init(),this.payloadTransport=new u.FmPayloadTransport(e,t),this.listen()}return Object.defineProperty(e.prototype,"overlayReady",{get:function(){return this._overlayReady},enumerable:!0,configurable:!0}),e.prototype.init=function(){var e=this;return new Promise((function(t){var r=function(){if(o=e.encodedQueryParams,s=[].slice.call(document.querySelectorAll(".fortmatic-iframe")),Boolean(s.find((function(e){var t;return null===(t=e.src)||void 0===t?void 0:t.includes(o)}))))c.createDuplicateIframeWarning().log();else{var r=document.createElement("iframe");r.classList.add("fortmatic-iframe"),r.dataset.fortmaticIframeLabel=new URL(e.endpoint).host,r.src=new URL("/send?params="+e.encodedQueryParams,e.endpoint).href,function(e){var t,r;try{for(var n=i(Object.entries(l)),o=n.next();!o.done;o=n.next()){var s=a(o.value,2),u=s[0],c=s[1];e.style[u]=c}}catch(e){t={error:e}}finally{try{o&&!o.done&&(r=n.return)&&r.call(n)}finally{if(t)throw t.error}}}(r),document.body.appendChild(r);var n=document.createElement("img");n.src="https://static.fortmatic.com/assets/trans.gif",n.style.position="fixed",document.body.appendChild(n),t(r)}var o,s};["loaded","interactive","complete"].includes(document.readyState)?r():window.addEventListener("load",r,!1)}))},e.prototype.showOverlay=function(){return n(this,void 0,void 0,(function(){return o(this,(function(e){switch(e.label){case 0:return[4,this.iframe];case 1:return e.sent().style.display="block",[2]}}))}))},e.prototype.hideOverlay=function(){return n(this,void 0,void 0,(function(){return o(this,(function(e){switch(e.label){case 0:return[4,this.iframe];case 1:return e.sent().style.display="none",[2]}}))}))},e.prototype.listen=function(){var e=this;this.payloadTransport.on(s.FmIncomingWindowMessage.FORTMATIC_OVERLAY_READY,(function(){e._overlayReady=!0})),this.payloadTransport.on(s.FmIncomingWindowMessage.FORTMATIC_HIDE_OVERLAY,(function(){e.hideOverlay()})),this.payloadTransport.on(s.FmIncomingWindowMessage.FORTMATIC_SHOW_OVERLAY,(function(){e.showOverlay()}))},e}();t.FmIframeController=d},function(e,t,r){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.HARMONY="HARMONY"}(n||(n={})),t.encodeQueryParameters=function(e){return btoa(JSON.stringify(e))},t.decodeQueryParameters=function(e){return JSON.parse(atob(e))}},function(e){e.exports=JSON.parse('{"name":"fortmatic","version":"2.0.6","description":"Fortmatic Javascript SDK","author":"Fortmatic <team@fortmatic.com> (https://fortmatic.com/)","license":"MIT","repository":{"type":"git","url":"https://github.com/fortmatic/fortmatic-js"},"keywords":["auth","login","web3","crypto","ethereum","metaMask","wallet","blockchain","dapp"],"homepage":"https://www.fortmatic.com","main":"dist/cjs/fortmatic.js","types":"dist/cjs/src/index.d.ts","scripts":{"start":"npm run clean:build && ./scripts/start.sh","build":"npm run clean:build && ./scripts/build.sh","test":"npm run clean:test-artifacts && ./scripts/test.sh","lint":"eslint --fix src/**/*.ts","clean":"npm-run-all -s clean:*","clean:test-artifacts":"rimraf coverage && rimraf .nyc_output","clean:build":"rimraf dist","clean_node_modules":"rimraf node_modules"},"dependencies":{},"devDependencies":{"@ikscodes/browser-env":"~0.3.1","@ikscodes/eslint-config":"~6.2.0","@ikscodes/prettier-config":"^0.1.0","@istanbuljs/nyc-config-typescript":"~0.1.3","@types/jsdom":"~12.2.4","@types/sinon":"~7.5.0","@types/webpack":"~4.41.0","@typescript-eslint/eslint-plugin":"~2.17.0","ava":"2.2.0","cross-env":"~6.0.3","eslint":"~6.8.0","eslint-import-resolver-typescript":"~2.0.0","eslint-plugin-import":"~2.20.0","eslint-plugin-jsx-a11y":"~6.2.3","eslint-plugin-prettier":"~3.1.2","eslint-plugin-react":"~7.18.0","eslint-plugin-react-hooks":"~1.7.0","lodash":"~4.17.15","npm-run-all":"~4.1.5","nyc":"13.1.0","prettier":"~1.19.1","rimraf":"~3.0.0","sinon":"7.1.1","ts-loader":"~6.2.1","ts-node":"~8.5.2","typescript":"~3.7.2","webpack":"~4.41.2","webpack-chain":"~6.2.0","webpack-cli":"~3.3.10"},"ava":{"require":["ts-node/register"],"files":["test/**/*.spec.ts"],"extensions":["ts"],"compileEnhancements":false,"verbose":true},"nyc":{"extends":"@istanbuljs/nyc-config-typescript","all":false,"check-coverage":true,"per-file":true,"lines":99,"statements":99,"functions":99,"branches":99,"reporter":["html","lcov"]}}')}]).default;