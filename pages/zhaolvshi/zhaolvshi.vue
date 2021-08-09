
<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">
		<view class="head">
			<view class="search">
				<image src="@/static/images/search.png"></image>
				<input type="text" placeholder="请输入搜索内容" placeholder-style="color:#fff;font-size:20rpx;" />
			</view>
		</view>
		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 20rpx;">


			<cooperTabar @searchChange="searchChange"></cooperTabar>
			<lawyercard1 :zixun="true" :isbuy="true" :lawyerlist="lawyerList" @buy="buy"></lawyercard1>



		</view>


	</view>
</template>

<script>
	import cooperTabar from '@/pages/components/cooperTabar/cooperTabar.vue'
	import lawyercard1 from '@/pages/components/lawyercard1/lawyercard1.vue'
	export default {
		onLoad(p) {
			console.log(p);
			this.id = p && p.id;
			let obj = this.list.find(item => item.id == this.id);
			if (obj) {
				this.typeData = obj;
			}
		},
		components: {
			cooperTabar,
			lawyercard1
		},
		data() {
			return {
				lawyerList: [
					{
						field:[{name:"交通",class:'green'},
						{name:"婚姻",class:'blue'},
						{name:"合同",class:'pink'},
						{name:"审核",class:'purple'},
						{name:"诉状",class:'yellow'}],
					},
					{
						field:[{name:"交通",class:'green'},
						{name:"婚姻",class:'blue'},
						{name:"合同",class:'pink'},
						{name:"审核",class:'purple'},
						{name:"诉状",class:'yellow'}],
					},
					{
						field:[{name:"交通",class:'green'},
						{name:"婚姻",class:'blue'},
						{name:"合同",class:'pink'},
						{name:"审核",class:'purple'},
						{name:"诉状",class:'yellow'}],
					}
				],
				id: '',
				list: [{
						id: 0,
						name: "图文咨询",
						url: "/static/icon/icon1.png"
					},
					{
						id: 1,
						name: "电话咨询",
						url: "/static/icon/icon2.png"
					},
					{
						id: 2,
						name: "见面咨询",
						url: "/static/icon/icon3.png"
					},
					{
						id: 3,
						name: "聘请律师",
						url: "/static/icon/icon4.png"
					},

				],
				typeData: null
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			searchChange(e) {
				console.log(e);
			},
			buy(e) {
				console.log(e);
			},



		}
	}
</script>

<style>
	.head{
		width: 750rpx;
		height: 156rpx;
		background: #40A9FF;
		padding-top: 80rpx;
		box-sizing: border-box;
	}
	.search{
		width: 500rpx;
		background: rgb(255,255,255,.34);
		border-radius: 32rpx;
		display: flex;
		margin-left: 15rpx;
		justify-content: center;
		align-items: center;
	}
	.search image{
		width: 26rpx;
		height: 26rpx;
		margin:  0 16rpx;
	}
	.search input{
		font-size: 26rpx;
		color: #fff;
		width: 400rpx;
		flex:1 1 auto;
	}
	.cooper_check_icon {
		margin-right: 10rpx;
		flex: 0 0 116rpx;
		height: 116rpx;
	}
</style>
