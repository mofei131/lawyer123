(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/contractDet"],{3234:function(t,n,e){},"6a2d":function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return a}));var o=function(){var t=this,n=t.$createElement;t._self._c},c=[]},"74aa":function(t,n,e){"use strict";(function(t){function e(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){var t;return t={content:""},e(t,"content",""),e(t,"buy",""),e(t,"price",""),e(t,"id",""),e(t,"link",""),e(t,"image",""),t},onLoad:function(n){var e=this;e.link=this.$store.state.link,t.request({url:"https://layer.boyaokj.cn/api/agreement/detail",method:"GET",data:{id:n.id,user_id:t.getStorageSync("userInfo").user_id},success:function(t){console.log(t.data.data),e.link=t.data.data.link,e.image=t.data.data.image}})},methods:{download:function(){console.log(this.$store.state.link),t.downloadFile({url:this.link,success:function(n){200==n.statusCode&&(console.log("ccc",n.tempFilePath),t.saveFile({tempFilePath:n.tempFilePath,success:function(n){t.openDocument({filePath:n.savedFilePath,success:function(t){return console.log("成功打开文档")}}),console.log("bbb",n)},fail:function(){console.log("打开失败")}})),console.log("aaa",n)},fail:function(){console.log("下载失败")}})}}};n.default=a}).call(this,e("543d")["default"])},9069:function(t,n,e){"use strict";var a=e("3234"),o=e.n(a);o.a},c113:function(t,n,e){"use strict";e.r(n);var a=e("6a2d"),o=e("f78a");for(var c in o)"default"!==c&&function(t){e.d(n,t,(function(){return o[t]}))}(c);e("9069");var i,u=e("f0c5"),l=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);n["default"]=l.exports},d4a8:function(t,n,e){"use strict";(function(t){e("6e3d");a(e("66fd"));var n=a(e("c113"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},f78a:function(t,n,e){"use strict";e.r(n);var a=e("74aa"),o=e.n(a);for(var c in a)"default"!==c&&function(t){e.d(n,t,(function(){return a[t]}))}(c);n["default"]=o.a}},[["d4a8","common/runtime","common/vendor"]]]);