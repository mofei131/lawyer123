(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/follow"],{3604:function(t,e,a){"use strict";(function(t){a("6e3d");n(a("66fd"));var e=n(a("675c"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"675c":function(t,e,a){"use strict";a.r(e);var n=a("7579"),o=a("e673");for(var r in o)"default"!==r&&function(t){a.d(e,t,(function(){return o[t]}))}(r);a("f833");var u,i=a("f0c5"),c=Object(i["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);e["default"]=c.exports},7579:function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return n}));var o=function(){var t=this,e=t.$createElement;t._self._c},r=[]},a940:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){Promise.all([a.e("common/vendor"),a.e("pages/components/lawyercard1/lawyercard1")]).then(function(){return resolve(a("a02f"))}.bind(null,a)).catch(a.oe)},o={components:{lawyercard1:n},data:function(){return{isMore:!0,page:1,limit:10,lawyerList:[],id:"",name:"",case_type:"",cityid:"",level:"",age:"",typeData:null,ttt:null}},onLoad:function(){var e=this;t.request({url:"https://layer.boyaokj.cn/api/layer/myFollow",method:"GET",data:{user_id:t.getStorageSync("userInfo").user_id,page:1,limit:10},success:function(t){console.log(t.data.data),e.lawyerList=t.data.data}})},onReachBottom:function(){var t=this;t.getnewsList()},methods:{updateFollow:function(t){this.lawyerList[0].follow=1==t?0:1},getnewsList:function(){var e=this;e.page++,t.request({url:"https://layer.boyaokj.cn/api/layer/myFollow",method:"GET",data:{user_id:t.getStorageSync("userInfo").user_id,page:e.page,limit:e.limit},success:function(t){for(var a in t.data.data)e.lawyerList.push(t.data.data[a])}})}}};e.default=o}).call(this,a("543d")["default"])},e673:function(t,e,a){"use strict";a.r(e);var n=a("a940"),o=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);e["default"]=o.a},f833:function(t,e,a){"use strict";var n=a("fd97"),o=a.n(n);o.a},fd97:function(t,e,a){}},[["3604","common/runtime","common/vendor"]]]);