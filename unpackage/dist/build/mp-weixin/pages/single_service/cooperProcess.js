(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/single_service/cooperProcess"],{"0df4":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("a34a"));function i(t){return t&&t.__esModule?t:{default:t}}function r(t,n,e,a,i,r,u){try{var c=t[r](u),o=c.value}catch(d){return void e(d)}c.done?n(o):Promise.resolve(o).then(a,i)}function u(t){return function(){var n=this,e=arguments;return new Promise((function(a,i){var u=t.apply(n,e);function c(t){r(u,a,i,c,o,"next",t)}function o(t){r(u,a,i,c,o,"throw",t)}c(void 0)}))}}function c(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var o={onLoad:function(n){var e=this;console.log(n),this.id=n&&n.id;var a=this.list.find((function(t){return t.id==e.id}));a&&(this.typeData=a,this.getContent(a.detailId),t.setNavigationBarTitle({title:a.name}));var i=this;t.request({url:"https://layer.boyaokj.cn/api/index/setting",method:"GET",data:{key:"wenti"},success:function(t){i.content=t.data.data.data}})},data:function(){var t;return t={content:"双方都",dataSource:{}},c(t,"content",""),c(t,"id",""),c(t,"name",""),c(t,"list",[{id:5,name:"",url:"/static/icon/icon6.png",detailId:4},{id:6,name:"",url:"/static/icon/icon7.png",detailId:5},{id:7,name:"",url:"/static/icon/icon8.png",detailId:6},{id:8,name:"",url:"/static/icon/icon9.png",detailId:7},{id:9,name:"",url:"/static/icon/icon10.png",detailId:8},{id:10,name:"",url:"/static/icon/icon11.png",detailId:9}]),c(t,"typeData",""),t},methods:{back:function(){t.navigateBack({delta:1})},kefu:function(){t.makePhoneCall({phoneNumber:"400-8623-5513"})},getContent:function(t){var n=this;return u(a.default.mark((function e(){var i;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.$myRequest({url:"service/detail",data:{id:t}});case 2:i=e.sent,i&&200==i.code&&(console.log(i.data),n.dataSource=i.data,n.name=i.data.name);case 4:case"end":return e.stop()}}),e)})))()},toDetail:function(){t.navigateTo({url:"../detail/cooperDetail?id=1"})},toPay:function(){return u(a.default.mark((function n(){return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.navigateBack({delta:1});case 1:case"end":return n.stop()}}),n)})))()},commitService:function(){var t=this;return u(a.default.mark((function n(){var e;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$myRequest({url:"service/danxiang",data:{layer_id:null,user_id:null,service_id:t.id}});case 2:e=n.sent,e&&e.data&&console.log(e);case 4:case"end":return n.stop()}}),n)})))()},download:function(){t.downloadFile({url:"https://www.example.com/file/test",success:function(t){200===t.statusCode&&console.log("下载成功")}})}}};n.default=o}).call(this,e("543d")["default"])},3879:function(t,n,e){"use strict";e.r(n);var a=e("0df4"),i=e.n(a);for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);n["default"]=i.a},"5b09":function(t,n,e){},"9dfe":function(t,n,e){"use strict";e.r(n);var a=e("bcb1"),i=e("3879");for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);e("f853");var u,c=e("f0c5"),o=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);n["default"]=o.exports},bcb1:function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return a}));var a={uniNavBar:function(){return e.e("uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar").then(e.bind(null,"c2ad"))}},i=function(){var t=this,n=t.$createElement;t._self._c},r=[]},e404:function(t,n,e){"use strict";(function(t){e("6e3d");a(e("66fd"));var n=a(e("9dfe"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},f853:function(t,n,e){"use strict";var a=e("5b09"),i=e.n(a);i.a}},[["e404","common/runtime","common/vendor"]]]);