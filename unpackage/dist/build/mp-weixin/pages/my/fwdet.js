(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/fwdet"],{"0fa3":function(a,t,e){"use strict";e.r(t);var n=e("ba9d"),u=e.n(n);for(var d in n)"default"!==d&&function(a){e.d(t,a,(function(){return n[a]}))}(d);t["default"]=u.a},"33d4":function(a,t,e){"use strict";var n=e("6b76"),u=e.n(n);u.a},"3e69":function(a,t,e){"use strict";(function(a){e("6e3d");n(e("66fd"));var t=n(e("8a80"));function n(a){return a&&a.__esModule?a:{default:a}}a(t.default)}).call(this,e("543d")["createPage"])},5836:function(a,t,e){"use strict";var n;e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return d})),e.d(t,"a",(function(){return n}));var u=function(){var a=this,t=a.$createElement;a._self._c},d=[]},"6b76":function(a,t,e){},"8a80":function(a,t,e){"use strict";e.r(t);var n=e("5836"),u=e("0fa3");for(var d in u)"default"!==d&&function(a){e.d(t,a,(function(){return u[a]}))}(d);e("33d4");var o,r=e("f0c5"),i=Object(r["a"])(u["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);t["default"]=i.exports},ba9d:function(a,t,e){"use strict";(function(a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{name:"",phone:"",address:"",array1:[],index1:0,price:"",suqiu:"",anjian:""}},onLoad:function(t){var e=this;console.log(t),a.request({url:"https://layer.boyaokj.cn/api/layer/getCaseType",success:function(a){e.array1=a.data.data,console.log(a.data.data)}}),a.request({url:"https://layer.boyaokj.cn/api/service/getSourceDetail",method:"GET",data:{source_id:t.id},success:function(a){console.log(a.data.data),e.name=a.data.data.name,e.phone=a.data.data.mobile,e.address=a.data.data.address,e.index1=a.data.data.case_type,e.price=a.data.data.money,e.suqiu=a.data.data.suqiu,e.anjian=a.data.data.detail}})},methods:{anjianChange:function(a){this.index1=a.detail.value}}};t.default=e}).call(this,e("543d")["default"])}},[["3e69","common/runtime","common/vendor"]]]);