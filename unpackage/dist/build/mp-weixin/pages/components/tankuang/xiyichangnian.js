(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/components/tankuang/xiyichangnian"],{"0a16":function(t,e,n){"use strict";(function(t){n("6e3d");a(n("66fd"));var e=a(n("4516"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},4516:function(t,e,n){"use strict";n.r(e);var a=n("93af"),i=n("cf1d");for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);n("73d6");var r,u=n("f0c5"),o=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=o.exports},"73d6":function(t,e,n){"use strict";var a=n("c01a"),i=n.n(a);i.a},"93af":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement;t._self._c},c=[]},c01a:function(t,e,n){},cf1d:function(t,e,n){"use strict";n.r(e);var a=n("e132"),i=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);e["default"]=i.a},e132:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{content:""}},onLoad:function(){var e=this;t.request({url:"https://layer.boyaokj.cn/api/index/setting",method:"GET",data:{key:"falvguwen"},success:function(t){e.content=e.formatRichText(t.data.data.data)}})},methods:{formatRichText:function(t){var e=t.replace(/<img[^>]*>/gi,(function(t,e){return t=t.replace(/style="[^"]+"/gi,"").replace(/style='[^']+'/gi,""),t=t.replace(/width="[^"]+"/gi,"").replace(/width='[^']+'/gi,""),t=t.replace(/height="[^"]+"/gi,"").replace(/height='[^']+'/gi,""),t}));return e=e.replace(/style="[^"]+"/gi,(function(t,e){return t=t.replace(/width:[^;]+;/gi,"max-width:100%;").replace(/width:[^;]+;/gi,"max-width:100%;"),t})),e=e.replace(/<br[^>]*\/>/gi,""),e=e.replace(/\<img/gi,'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"'),e}}};e.default=n}).call(this,n("543d")["default"])}},[["0a16","common/runtime","common/vendor"]]]);