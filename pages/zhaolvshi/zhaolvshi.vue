<template>
	<view class="flex-column mx-start sx-stretch" :style="{backgroundColor: '#F4F7F7',minHeight: getWindowHeight}">
		<view class="head" style="position: fixed;top: 0;left: 0;margin: auto;">
			<view class="search">
				<image src="@/static/images/search.png"></image>
				<input type="text" v-model="name" @input="searchName" @change="inputChange" placeholder="请输入搜索内容"
					placeholder-style="color:#fff;font-size:20rpx;" />
			</view>
		</view>
		<cooperTabar @searchChange="searchChange" style="position: fixed;top: 156rpx;width: 100%;left: 0;margin: auto;"></cooperTabar>
		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 20rpx;overflow: auto;margin-top: 256rpx;">


			<lawyercard1 :zixun="true" :lawyerlist="lawyerList" @buy="buy"></lawyercard1>

			<view v-if="!isMore" style="text-align: center;font-size: 36rpx;color: gray;margin-top: 20rpx;">
				没有数据了，切换选择试试!</view>

		</view>
		<authMode @confirm="authorTap" @backindex="backIndex" ref="authMode"></authMode>



	</view>
</template>

<script>
	import cooperTabar from '@/pages/components/cooperTabar/cooperTabar.vue'
	import lawyercard1 from '@/pages/components/lawyercard1/lawyercard1.vue'
	import authMode from '@/pages/components/authMode/authMode.vue'
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		onLoad(p) {

			this.id = p && p.id;
			let obj = this.list.find(item => item.id == this.id);
			if (obj) {
				this.typeData = obj;
			}
		},
		components: {
			cooperTabar,
			lawyercard1,
			authMode
		},
		async onShow() {
			let userInfo = this.$store.state.userInfo;
			console.log(userInfo);
			if (!userInfo || !userInfo.user_id || !userInfo.avater || !userInfo.nickname) {
				let res = await this.getWxCode();
				if (res.hasUserInfo) {
					this.$refs.authMode.open()
				}
			}
		},
		computed: {
			...mapGetters([
				'getWindowHeight',
			]),
		},
		data() {
			return {
				isMore: true,
				page: 1,
				limit: 10,
				lawyerList: [],
				id: '',
				name: '',
				case_type: '',
				cityid: '',
				level: '',
				age: '',
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
		// onPageScroll(e) {
		// 	//兼容iOS端下拉时顶部漂移
		// 	this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
		// 	this.headerTop = e.scrollTop>=0?null:0;
		// 	this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
		// },
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			this.isMore = true;
			this.page = 1;
			this.lawyerList = [];
			this.searchChange();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			this.isMore = true;
			uni.showNavigationBarLoading();
			this.searchChange();
			setTimeout(function() {
				uni.hideNavigationBarLoading()
			}, 500);

		},
		// 上拉加载
		// onReachBottom() {
		// 	let _self = this
		// 	uni.showNavigationBarLoading()
		// 	console.log('reach');
		// 	setTimeout(function() {
		// 		_self.page++;
		// 		_self.searchChange();
		// 		uni.hideNavigationBarLoading()
		// 	}, 2000);
		// },
		methods: {

			...mapActions([
				'getProvinceCity', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
				'getBussinessTypes',
				'getLawyerLevels', 'getWorkAges', 'getWxCode', 'updateUserInfo'
			]),
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			backIndex() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			change(e) {
				console.log(e);
			},
			async authorTap() {
				let userInfo = this.$store.state.userInfo;
				if (!userInfo || !userInfo.user_id || !userInfo.avater || !userInfo.nickname) {
					let isSuccess = await this.updateUserInfo();
					if (isSuccess) {
						uni.showToast({
							title: '授权成功！'
						})
						this.$refs.authMode.setDialogFalse();
					} else {
						uni.showToast({
							title: '授权失败，请重新登录！'
						})
						this.$refs.authMode.setDialogFalse();
					}
				}
			},


			searchName() {
				// this.isMore = true;
				if (this.ttt) {
					clearTimeout(this.ttt);
				}
				this.ttt = setTimeout(item => {
					this.searchChange()
				}, 1000)
			},
			inputChange() {
				this.searchChange();
			},
			async searchChange(e) {
				console.log('----请求律师列表的信息 ------>');

				if (e) {
					let {
						case_type,
						cityid,
						level,
						age
					} = e;
					if (this.case_type == case_type && this.cityid == cityid && this.level == level && this.age ==
						age) {
							return;
						} else {
						this.lawyerList = [];
						this.isMore = true;
						this.page = 1;
						this.case_type = case_type;
						this.cityid = cityid;
						this.level = level;
						this.age = age;
					}
				}
				uni.showLoading({
					title: '加载中'
				})
				console.log({
					page: this.page,
					limit: this.limit,
					name: this.name,
					case_type: this.case_type,
					cityid: this.cityid,
					level: this.level,
					age: this.age
				});
				let res = await this.$myRequest({
					url: 'layer/list',
					method: 'GET',
					data: {
						page: this.page,
						limit: this.limit,
						name: this.name,
						case_type: this.case_type,
						cityid: this.cityid,
						level: this.level,
						age: this.age,
						service_id: ''
					}
				});
				uni.hideLoading();
				console.log(res);
				if (res && res.data) {

					// this.lawyerList = res.data;
					if (res.data.length > 0) {
						console.log('有数据');
						for (let s of res.data) {
							console.log(s.id);
							let f = this.lawyerList.find(item2 => item2.id == s.id);
							if (!f) {
								this.lawyerList.push(s)
							}
						}
						this.page += 1;
					} else {
						console.log('无数据');
						this.isMore = false;
					}
					console.log(this.lawyerList);

				}
			},
			buy(e) {
				console.log(e);
			},


		}
	}
</script>

<style>
	@keyframes mymove {
		from {
			height: 0px
		}

		to {
			height: 200rpx;
		}
	}

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
