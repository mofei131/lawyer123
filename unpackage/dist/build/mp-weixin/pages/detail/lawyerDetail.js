(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/detail/lawyerDetail"],{"0360":function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return a}));var r=function(){var e=this,t=e.$createElement;e._self._c},i=[]},"4d30":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("a34a")),r=i(n("fc9e"));function i(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,a,r,i,o){try{var u=e[i](o),c=u.value}catch(l){return void n(l)}u.done?t(c):Promise.resolve(c).then(a,r)}function u(e){return function(){var t=this,n=arguments;return new Promise((function(a,r){var i=e.apply(t,n);function u(e){o(i,a,r,u,c,"next",e)}function c(e){o(i,a,r,u,c,"throw",e)}u(void 0)}))}}var c=function(){n.e("pages/components/lawyercard1/lawyercard2").then(function(){return resolve(n("3fa3"))}.bind(null,n)).catch(n.oe)},l={onLoad:function(e){console.log(e.id+"======="+this.$store.state.userInfo.user_id),this.lawyerid=e.id,this.getLawyer(),this.getAnli()},components:{anli:r.default,lawyercard1:c},data:function(){return{lawyerid:null,lawyerList:[],anli:[]}},methods:{getAnli:function(){var t=this;return u(a.default.mark((function n(){var r;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$myRequest({url:"service/selectCase",methods:"GET",data:{page:1,limit:5,layer_id:t.lawyerid}});case 2:r=n.sent,r&&200==r.code?(console.log("====获取案例----"),console.log(r.data),t.anli=r.data):e.showToast({title:"每日学法数据获取异常",icon:"none"});case 4:case"end":return n.stop()}}),n)})))()},getLawyer:function(){var t=this;return u(a.default.mark((function n(){var r;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.lawyerList=[],r=t.$myRequest({url:"layer/detail",methods:"GET",data:{layer_id:t.lawyerid,user_id:t.$store.state.userInfo.user_id}}),r.then((function(n){200==n.code?(console.log("律师详情"),console.log(n),t.lawyerList.push(n.data)):e.showToast({title:n.message,icon:"none"})}));case 3:case"end":return n.stop()}}),n)})))()},updateFollow:function(e){this.lawyerList[0].follow=1==e?0:1},tuTuwenPage:function(){var t=this.lawyerList[0];t&&e.navigateTo({url:"../service_zhixun/tuwen?layer_id="+t.id+"&price="+t.price.tuwen+"&typeId=1"})},toDianhuaPage:function(){var t=this;return u(a.default.mark((function n(){var r,i,o,u,c;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=t.lawyerList[0],r){n.next=3;break}return n.abrupt("return");case 3:if(i=r.id,o=t.$store.state.userInfo.user_id,i&&o){n.next=8;break}return e.showToast({title:"用户数据异常，请重新登录",icon:"none"}),n.abrupt("return");case 8:return u={layer_id:i,user_id:t.$store.state.userInfo.user_id},console.log(u),e.showLoading({title:"请稍等"}),n.next=13,t.$myRequest({url:"service/dianhua",method:"GET",data:u});case 13:c=n.sent,e.hideLoading(),c&&-1==c.code?e.showToast({title:c.message,icon:"none"}):(e.navigateTo({url:"../my/pay?id="+c.data.service_id+"&price="+r.price.dianhua+"&typeId=2&emitName=callphone"}),e.$on("callphone",(function(){e.makePhoneCall({phoneNumber:r.mobile})})));case 16:case"end":return n.stop()}}),n)})))()}}};t.default=l}).call(this,n("543d")["default"])},5708:function(e,t,n){"use strict";var a=n("c7af"),r=n.n(a);r.a},"5ed1":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return a}));var a={faIcon:function(){return n.e("components/fa-icon/fa-icon").then(n.bind(null,"1f6a"))}},r=function(){var e=this,t=e.$createElement;e._self._c},i=[]},"61e3":function(e,t,n){"use strict";n.r(t);var a=n("5ed1"),r=n("7f0b");for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n("775e");var o,u=n("f0c5"),c=Object(u["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=c.exports},"6b6f":function(e,t,n){"use strict";n.r(t);var a=n("b1f9"),r=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);t["default"]=r.a},"6e97":function(e,t,n){"use strict";(function(e){n("6e3d");a(n("66fd"));var t=a(n("61e3"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"71c6":function(e,t,n){},"775e":function(e,t,n){"use strict";var a=n("71c6"),r=n.n(a);r.a},"7f0b":function(e,t,n){"use strict";n.r(t);var a=n("4d30"),r=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);t["default"]=r.a},b1f9:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={props:{anli:{type:Array,default:[]},showBottomBorder:{type:Boolean,default:!1},marginBottom:{type:String,default:""}},data:function(){return{}},methods:{tochat:function(t){console.log(t),e.navigateTo({url:"../anjianDetail/anjianDetail?source_id="+t.id+"&layer_id="+t.layer.id+"&user_id="+t.user_id})}}};t.default=n}).call(this,n("543d")["default"])},c7af:function(e,t,n){},fc9e:function(e,t,n){"use strict";n.r(t);var a=n("0360"),r=n("6b6f");for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n("5708");var o,u=n("f0c5"),c=Object(u["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=c.exports}},[["6e97","common/runtime","common/vendor"]]]);