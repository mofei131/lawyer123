(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/xieyi"],{"1bab":function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}));var i=function(){var e=this,t=e.$createElement;e._self._c},r=[]},"2e2b":function(e,t,n){"use strict";(function(e){n("6e3d");a(n("66fd"));var t=a(n("bb0e"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"6db6":function(e,t,n){},bb0e:function(e,t,n){"use strict";n.r(t);var a=n("1bab"),i=n("e608");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("bcef");var c,u=n("f0c5"),o=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);t["default"]=o.exports},bcef:function(e,t,n){"use strict";var a=n("6db6"),i=n.n(a);i.a},e608:function(e,t,n){"use strict";n.r(t);var a=n("e644"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=i.a},e644:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{content:""}},onLoad:function(){var t=this;e.request({url:"https://layer.boyaokj.cn/api/index/setting",method:"GET",data:{key:"fuwu"},success:function(e){t.content=t.formatRichText(e.data.data.data)}})},methods:{formatRichText:function(e){var t=e.replace(/<img[^>]*>/gi,(function(e,t){return e=e.replace(/style="[^"]+"/gi,"").replace(/style='[^']+'/gi,""),e=e.replace(/width="[^"]+"/gi,"").replace(/width='[^']+'/gi,""),e=e.replace(/height="[^"]+"/gi,"").replace(/height='[^']+'/gi,""),e}));return t=t.replace(/style="[^"]+"/gi,(function(e,t){return e=e.replace(/width:[^;]+;/gi,"max-width:100%;").replace(/width:[^;]+;/gi,"max-width:100%;"),e})),t=t.replace(/<br[^>]*\/>/gi,""),t=t.replace(/\<img/gi,'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"'),t}}};t.default=n}).call(this,n("543d")["default"])}},[["2e2b","common/runtime","common/vendor"]]]);