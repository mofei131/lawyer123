<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">
		<view class="head">
			<view class="search">
				<image src="@/static/images/search.png"></image>
				<input type="text" v-model="name" @input="searchName" placeholder="请输入搜索内容"
					placeholder-style="color:#fff;font-size:20rpx;" />
			</view>
		</view>
		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 20rpx;">


			<cooperTabar @searchChange="searchChange"></cooperTabar>
			<lawyercard1 :zixun="true" :lawyerlist="lawyerList" @buy="buy"></lawyercard1>



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
				page: 1,
				limit: 10,
				lawyerList: [],
				id: '',
				name: '',
				case_type: '',
				cityid: '',
				level: '',
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
				typeData: null,
				ttt: null,
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			onReachBottom() {
				uni.showToast({
					title: '触发上拉加载'
				});
			},
			// onPageScroll(e) {
			// 	//兼容iOS端下拉时顶部漂移
			// 	this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
			// 	this.headerTop = e.scrollTop>=0?null:0;
			// 	this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
			// },
			//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
			onPullDownRefresh() {
				// setTimeout(function() {
				// 	uni.stopPullDownRefresh();
				// }, 1000);
			},
			//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
			async onReachBottom() {
				uni.showToast({
					title: '触发上拉加载'
				});
				// let len = this.productList.length;
				// if (len >= 40) {
				// 	this.loadingText = '到底了';
				// 	return false;
				// }
				// // 加入商品,生成环境请替换为ajax请求
				// let result = await myRequest('/business/page',{}, "GET");
				// console.log(result)

				//  let list = result.data.records;
				// if (Array.isArray(list) && list.length > 0) {
				// this.productList = list;
				// }
				// this.productList.push();
			},
			searchName() {
				if (this.ttt) {
					clearTimeout(this.ttt);
				}
				this.ttt = setTimeout(item => {
					this.searchChange()
				}, 1000)
			},
			async searchChange(e) {
				console.log('----请求律师列表的信息 ------>');
				if(e){
					this.case_type = e.case_type;
					this.cityid = e.cityid;
					this.level = e.level;
				}
				
				let res = await this.$myRequest({
					url: 'layer/list',
					data: {
						page: this.page,
						limit: this.limit,
						name: this.name,
						case_type: this.case_type,
						cityid: this.cityid,
						level: this.level
					}
				});
				if (res && res.data) {
					console.log(res);
					this.lawyerList = res.data;
				}
			},
			buy(e) {
				console.log(e);
			},


		}
	}
</script>

<style>
	.head {
		width: 750rpx;
		height: 156rpx;
		background: #40A9FF;
		padding-top: 80rpx;
		box-sizing: border-box;
	}

	.search {
		width: 500rpx;
		background: rgb(255, 255, 255, .34);
		border-radius: 32rpx;
		display: flex;
		margin-left: 15rpx;
		justify-content: center;
		align-items: center;
	}

	.search image {
		width: 26rpx;
		height: 26rpx;
		margin: 0 16rpx;
	}

	.search input {
		font-size: 26rpx;
		color: #fff;
		width: 400rpx;
		flex: 1 1 auto;
	}

	.cooper_check_icon {
		margin-right: 10rpx;
		flex: 0 0 116rpx;
		height: 116rpx;
	}
</style>
