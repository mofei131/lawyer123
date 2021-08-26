(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/components/ordercard/ordercard"],{"0278":function(e,n,t){"use strict";t.r(n);var r=t("c430"),c=t.n(r);for(var a in r)"default"!==a&&function(e){t.d(n,e,(function(){return r[e]}))}(a);n["default"]=c.a},"0bca":function(e,n,t){"use strict";var r=t("c389"),c=t.n(r);c.a},"37b6":function(e,n,t){"use strict";var r;t.d(n,"b",(function(){return c})),t.d(n,"c",(function(){return a})),t.d(n,"a",(function(){return r}));var c=function(){var e=this,n=e.$createElement;e._self._c},a=[]},ae73:function(e,n,t){"use strict";t.r(n);var r=t("37b6"),c=t("0278");for(var a in c)"default"!==a&&function(e){t.d(n,e,(function(){return c[e]}))}(a);t("0bca");var u,i=t("f0c5"),o=Object(i["a"])(c["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],u);n["default"]=o.exports},c389:function(e,n,t){},c430:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={props:["list"],data:function(){return{type:2,id:0}},methods:{det:function(n){e.navigateTo({url:"./fwdet?id="+n.source_id})},topay:function(n){e.navigateTo({url:"./pay?id="+n.service_id+"&price="+n.service_price})},score:function(n){e.navigateTo({url:"./score?id="+n.service_id+"&code="+n.orderno})},tuwen:function(n){e.navigateTo({url:"../chat/chat?layer_id="+n.layer_id+"&source_id="+n.source_id})},dianhua:function(n){e.makePhoneCall({phoneNumber:n.mobile})}}};n.default=t}).call(this,t("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/components/ordercard/ordercard-create-component',
    {
        'pages/components/ordercard/ordercard-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("ae73"))
        })
    },
    [['pages/components/ordercard/ordercard-create-component']]
]);
