(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar"],{a0f0:function(t,n,e){},a481:function(t,n,e){"use strict";e.r(n);var i=e("fac1"),u=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=u.a},b60a:function(t,n,e){"use strict";var i=e("a0f0"),u=e.n(i);u.a},c2ad:function(t,n,e){"use strict";e.r(n);var i=e("f82d"),u=e("a481");for(var o in u)"default"!==o&&function(t){e.d(n,t,(function(){return u[t]}))}(o);e("b60a");var a,c=e("f0c5"),r=Object(c["a"])(u["default"],i["b"],i["c"],!1,null,"36924f9f",null,!1,i["a"],a);n["default"]=r.exports},f82d:function(t,n,e){"use strict";e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return i}));var i={uniIcons:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(e.bind(null,"b39c"))}},u=function(){var t=this,n=t.$createElement;t._self._c},o=[]},fac1:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=function(){e.e("uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar").then(function(){return resolve(e("efeb"))}.bind(null,e)).catch(e.oe)},u={name:"UniNavBar",components:{statusBar:i},emits:["clickLeft","clickRight","clickTitle"],props:{title:{type:String,default:""},leftText:{type:String,default:""},rightText:{type:String,default:""},leftIcon:{type:String,default:""},rightIcon:{type:String,default:""},fixed:{type:[Boolean,String],default:!1},color:{type:String,default:"#000000"},backgroundColor:{type:String,default:"#FFFFFF"},statusBar:{type:[Boolean,String],default:!1},shadow:{type:[Boolean,String],default:!1},border:{type:[Boolean,String],default:!0}},mounted:function(){t.report&&""!==this.title&&t.report("title",this.title)},methods:{onClickLeft:function(){this.$emit("clickLeft")},onClickRight:function(){this.$emit("clickRight")},onClickTitle:function(){this.$emit("clickTitle")}}};n.default=u}).call(this,e("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar-create-component',
    {
        'uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c2ad"))
        })
    },
    [['uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar-create-component']]
]);
