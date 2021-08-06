<template>
	<view>
		<search></search>
		<view class="banner">
			<image src="@/static/images/banner.png"></image>
		</view>
		<iconlist :item ='item1'></iconlist>
		<iconlist :item ='item2'></iconlist>
		<view class="modtitle">
			<view class="modleft">
			<view class="blue"></view>
			<view class="modone">优选律师</view>
			</view>
			<view class="more">
				<view>全部</view>
				<image src="@/static/images/righticon.png"></image>
			</view>
		</view>
		<swiper class="beg" display-multiple-items='6'>
			<swiper-item class="beglist" v-for="(item,index) in begood">
				<view class="beglisttitle">{{item.title}}</view>
			</swiper-item>
		</swiper>
		<lawyercard :lawyerlist='lawyercard'></lawyercard>
		<view class="case">
		<view class="modtitle">
			<view class="modleft">
			<view class="blue"></view>
			<view class="modone">精选咨询案例</view>
			</view>
			<view class="more">
				<view>更多案例</view>
				<image src="@/static/images/righticon.png"></image>
			</view>
		</view>
		</view>
		<view class="anlilist">
			<view class="anlilistitem" v-for="(item,index) in anli">
				<view class="floor1">
					<view>【{{item.sort}}】</view>
					<view>{{item.title}}</view>
				</view>
				<view class="floor2">
					<view class="mine">
						<image :src="item.portrait"></image>
						<view>{{item.address}}</view>
						<view>{{item.name}}</view>
					</view>
					<view class="read">{{item.read}}人查看</view>
				</view>
				<view class="anliborder" v-if="index<3"></view>
			</view>
		</view>
		<view class="case">
		<view class="modtitle">
			<view class="modleft">
			<view class="blue"></view>
			<view class="modone">每日学法</view>
			</view>
			<view class="more">
				<view>查看更多</view>
				<image src="@/static/images/righticon.png"></image>
			</view>
		</view>
		</view>
		<view class="study">
			<view class="studyitem" v-for="(item,index) in learn">
				<view class="studyitemleft">
					<image :src="item.cover"></image>
				</view>
				<view class="studyitemright">
					<view class="studytitle">{{item.title}}</view>
					<view class="studycontent">{{item.content}}</view>
					<view class="figure">
						<view>{{item.name}}</view>
						<view>{{item.status}}</view>
					</view>
					<view class="stage">已更新{{item.stage}}期</view>
					<view class="price">
						<view v-if="item.price != 0" class="cost">￥{{item.price}}</view>
						<view v-if="item.price == 0">限时免费</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import search from '../components/search/search.vue'
	import iconlist from '../components/iconlist/iconlist.vue'
	import lawyercard from '../components/lawyercard/lawyercard.vue'
	export default {
		components:{
			search,
			iconlist,
			lawyercard
		},
		data() {
			return {
				item1:{
					title:'咨询律师',
					zixun:[
						{id:0,name:"图文咨询",url:"https://cdn.segmentfault.com/r-870d958c/static/work-logo.9eb9e57a.png"},
						{id:1,name:"电话咨询",url:"../../static/icon/icon2.png"},
						{id:2,name:"见面咨询",url:"../../static/icon/icon3.png"},
						{id:3,name:"聘请律师",url:"../../static/icon/icon4.png"},
					],
				},
				item2:{
					title:'单项服务',
					zixun:[
						{id:4,name:"合同下载",url:"../../static/icon/icon5.png"},
						{id:5,name:"合同审核/起草",url:"../../static/icon/icon6.png"},
						{id:6,name:"律师函",url:"../../static/icon/icon7.png"},
						{id:7,name:"债务催收指导",url:"../../static/icon/icon8.png"},
						{id:8,name:"起诉状/答辩状",url:"../../static/icon/icon9.png"},
						{id:9,name:"代写借/欠条",url:"../../static/icon/icon10.png"},
						{id:10,name:"刑事会见",url:"../../static/icon/icon11.png"},
						{id:11,name:"其他",url:"../../static/icon/icon12.png"},
					]
				},
				begood:[
					{id:0,title:"婚姻家庭"},
					{id:1,title:"交通事故"},
					{id:2,title:"劳动纠纷"},
					{id:3,title:"合同纠纷"},
					{id:4,title:"婚姻家庭"},
					{id:5,title:"交通事故"},
					{id:6,title:"劳动纠纷"},
					{id:7,title:"合同纠纷"},
					{id:8,title:"婚姻家庭"},
					{id:9,title:"交通事故"},
					{id:10,title:"劳动纠纷"},
					{id:11,title:"合同纠纷"},
					],
					lawyercard:[
						{id:0,name:"张三",workyer:5,address:'辽宁沈阳',begood:'婚姻家庭、交通事故、刑事案件、劳动仲裁、债权债务',portrait:'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg'},
						{id:1,name:"李四",workyer:12,address:'北京朝阳',begood:'婚姻家庭、交通事故、刑事案件、劳动仲裁、债权债务',portrait:'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg'},
						{id:2,name:"王五",workyer:2,address:'山东菏泽',begood:'婚姻家庭、交通事故、刑事案件、劳动仲裁、债权债务',portrait:'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg'},
						{id:3,name:"赵六",workyer:45,address:'云南镇江',begood:'婚姻家庭、交通事故、刑事案件、劳动仲裁、债权债务',portrait:'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg'},
					],
					anli:[
						{id:0,sort:'买卖合同',title:'发展提供高质量数据——第四次fd经济论坛第四次fd经济论坛',address:'山东青岛',name:'张三',portrait:'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg',read:'1783'},
						{id:1,sort:'婚姻家庭',title:'发展提供高质量数据——第四次fd经济论坛第四次fd经济论坛',address:'山东潍坊',name:'李四',portrait:'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg',read:'32'},
						{id:2,sort:'为高质量',title:'发展提供高质量数据——第四次fd经济论坛第四次fd经济论坛',address:'山东烟台',name:'王五',portrait:'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg',read:'544'},
						{id:3,sort:'为高质量',title:'发展提供高质量数据——第四次fd经济论坛第四次fd经济论坛',address:'山东日照',name:'赵六',portrait:'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg',read:'6'},
					],
					learn:[
						{id:0,cover:'https://www.51sphere.com/upload/content/2021/04/25/39131619344825.jpg',title:'南方只要不被沃尔玛收购',content:'南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购',name:'朱海滨',status:'安心首席律师',stage:'69',price:0},
						{id:1,cover:'https://www.51sphere.com/upload/content/2021/04/25/39131619344825.jpg',title:'南方只要不被沃尔玛收购',content:'南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购',name:'朱海滨',status:'安心首席律师',stage:'5',price:0},
						{id:2,cover:'https://www.51sphere.com/upload/content/2021/04/25/39131619344825.jpg',title:'南方只要不被沃尔玛收购',content:'南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购',name:'朱海滨',status:'安心首席律师',stage:'15',price:192.00}
					]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.banner image{
		width: 750rpx;
	}	
	.modtitle{
		display: flex;
		justify-content: space-between;
		width: 690rpx;
		margin: auto;
		box-sizing: border-box;
		margin-top: 16rpx;
	}
	.modleft,.more{
		display: flex;
		box-sizing: border-box;
	}
	.more image{
		width: 11rpx;
		height: 21rpx;
		/* margin-top: 6rpx; */
		margin: auto;
	}
	.blue{
		width: 6rpx;
		height: auto;
		background: #40A9FF;
		/* margin-top: 8rpx */
	}
	.modone{
		color: #51565D;
		font-size: 28rpx;
		font-weight: 500;
		margin-left: 8rpx;
	}
	.more view{
		color: #919191;
		font-size: 24rpx;
		font-weight: 400;
		margin-right: 13rpx;
	}
	.beg{
		width: 710rpx;
		margin: auto;
		margin-top: 12rpx;
		height: 80rpx;
		border-radius: 14rpx 14rpx 0rpx 0rpx;
		background: rgb(9,109,217,.1);
		box-sizing: border-box;
	}
	.beglist{
		width: 177.5rpx;
	}
	.beglisttitle{
		text-align: center;
		height: 80rpx;
		padding-top: 19rpx;
		color: #333333;
		font-size: 24rpx;
		font-weight: 400;
	}
	.case{
		height: 80rpx;
		border-radius: 14rpx 14rpx 0rpx 0rpx;
		background: rgb(9,109,217,.1);
		box-sizing: border-box;
		width: 710rpx;
		margin: auto;
		padding-top: 10rpx;
		margin-top: 50rpx;
	}
	.anlilist{
		width: 670rpx;
		margin: auto;
	}
	.mine image{
		width: 60rpx;
		height: 60rpx;
		border-radius: 36rpx;
	}
	.floor1{
		display: flex;
		overflow: hidden;
		white-space: nowrap;
		color: #323232;
		font-size: 28rpx;
		margin-top: 16rpx;
	}
	.floor1 view:nth-child(2){
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
	}
	.floor2{
		display: flex;
		justify-content: space-between;
		margin-top: 10rpx;
		margin-bottom: 18rpx;
	}
	.mine{
		display: flex;
		color: #999999;
		font-size: 24rpx;
	}
	.mine image{
		margin-right: 18rpx;
	}
	.mine view{
		padding-top: 25rpx;
	}
	.read{
		width: 105rpx;
		height: 26rpx;
		background: #D4E5F8;
		border-radius: 1rpx;
		color: #40A9FF;
		font-size: 16rpx;
		text-align: center;
		margin-top: 28rpx;
		line-height: 27rpx;
	}
	.anliborder{
		width: 636rpx;
		height: 1rpx;
		background: #ddd;
		margin: auto;
	}
	.studyitemleft image{
		width: 196rpx;
		height: 142rpx;
		border-radius: 7rpx;
	}
	.study{
		width: 673rpx;
		margin: auto;
		padding-top: 16rpx;
	}
	.studyitem{
		display: flex;
		position: relative;
		margin-bottom: 34rpx;
	}
	.studytitle{
		color: #323232;
		font-size: 24rpx;
		margin-bottom: 15rpx;
	}
	.studycontent{
		color: #424242;
		font-size: 22rpx;
		overflow: hidden; 
		text-overflow: ellipsis; 
		display: -webkit-box; 
		-webkit-line-clamp: 2; 
		-webkit-box-orient: vertical;
		line-height: 22rpx;
	}
	.figure{
		display: flex;
		color: #999999;
		font-size: 21rpx;
	}
	.figure view:nth-child(2){
		margin-left: 18rpx;
	}
	.stage{
		color: #999;
		font-size: 21rpx;
	}
	.price{
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.studyitemright{
		margin-left: 18rpx;
	}
	.price view{
		width: 105rpx;
		height: 26rpx;
		background: #D4E5F8;
		border-radius: 1rpx;
		color: #40A9FF;
		font-size: 16rpx;
		line-height: 27rpx;
		text-align: center;
	}
	.cost{
		color: #FF4D4F!important;
	}
</style>
