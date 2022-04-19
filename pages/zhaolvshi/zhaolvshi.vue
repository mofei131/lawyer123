<template>
	<view class="flex-column mx-start sx-stretch" :style="{backgroundColor: '#F4F7F7',minHeight: getWindowHeight}">
		<view class="head" style="position: fixed;top: 0;left: 0;margin: auto;">
			<view class="search">
				<image src="@/static/images/search.png"></image>
				<input type="text" v-model="name" @input="searchName" @change="inputChange" placeholder="请输入搜索内容"
					placeholder-style="color:#fff;font-size:20rpx;" />
			</view>
		</view>
		<view class="baiboc">
		<view class="option">
			<view class="real" :class="[type == 1?'qie':'']" @tap="decide()">平台自有律师</view>
			<view class="empty" :class="[type == 2?'qie':'']" @tap="decide2()">平台入驻律师</view>
		</view>
		</view>
		<cooperTabar @searchChange="searchChange" style="position: fixed;top: 256rpx;width: 100%;left: 0;margin: auto;"></cooperTabar>
		<!-- <view class="qihuan">
			<view class="left">
				<image src="../../static/icon/lsicon.png"></image>
				<view class="shangx" v-if="type == 1">
					<view>平台律师</view>
					<view>平台律师简介</view>
				</view>
				<view class="shangx" v-if="type == 2">
					<view>自有律师</view>
					<view>自有律师简介</view>
				</view>
			</view>
			<view class="right">
				<view class="zi" @tap="qie()">进入</view>
			</view>
		</view> -->
		
		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 35rpx;overflow: auto; padding-top: 42rpx;margin-top: 320rpx;">


			<lawyercard1 :showline="true" :zixun="true" @updatefollow="updateFollow" :lawyerlist="lawyerList" @buy="buy"></lawyercard1>

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
			let userInfo = uni.getStorageSync('userInfo');
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
				judge:true,
				page: 1,
				limit: 10,
				lawyerList: [],
				id: '',
				name: '',
				case_type: '',
				cityid: '',
				level: '',
				age: '',
				type:1,
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
						name: "案件委托",
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
			decide2(){
				if(this.type == 1){
					this.type = 2
					this.dian();
				}
			},
			decide(){
				if(this.type == 2){
					this.type = 1
					this.dian();
				}
			},
			// qie(){
			// 	if(this.type == 1){
			// 		this.type = 2
			// 		this.dian();
			// 	}else{
			// 		this.type = 1
			// 		this.dian();
			// 	}
			// },
			dian(){
				let that = this
				uni.request({
					url:'https://layer.boyaokj.cn/api/layer/list',
					method:'GET',
					data:{
						page: 1,
						limit: 10,
						name: that.name,
						case_type: that.case_type,
						cityid: that.cityid,
						level: that.level,
						age: that.age,
						service_id: '',
						type:that.type
					},
					success(res) {
						that.lawyerList = res.data.data
					}
				})
			},
			updateFollow(fllow){
				this.lawyerList[0].follow = fllow==1?0:1;
			},
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
				let userInfo = uni.getStorageSync('userInfo');
				if (!userInfo || !userInfo.user_id || !userInfo.avater || !userInfo.nickname) {
					let isSuccess = await this.updateUserInfo();
					if (isSuccess) {
						uni.showToast({
							title: '授权成功！',
							success() {
								uni.switchTab({
									url:'../index/index'
								})
							}
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
				let that = this
				// this.isMore = true;
				if (this.ttt) {
					clearTimeout(this.ttt);
				}
				this.ttt = setTimeout(item => {
					uni.request({
						url: 'https://layer.boyaokj.cn/api/layer/list',
						method: 'POST',
						data: {
							page: 1,
							limit: 100,
							name: this.name,
							case_type: this.case_type,
							cityid: this.cityid,
							level: this.level,
							age: this.age,
							service_id: '',
							type:this.type
						},
						success(res) {
							that.lawyerList = res.data.data;
						}
					})
				}, 1000)
			},
			inputChange() {
				let that = this
				uni.request({
					url: 'https://layer.boyaokj.cn/api/layer/list',
					method: 'POST',
					data: {
						page: 1,
						limit: 100,
						name: this.name,
						case_type: this.case_type,
						cityid: this.cityid,
						level: this.level,
						age: this.age,
						service_id: '',
						type:this.type
					},
					success(res) {
						that.lawyerList = res.data.data;
					}
				})
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
					age: this.age,
					type:this.type
				});
				let res = await this.$myRequest({
					url: 'layer/list',
					method: 'POST',
					data: {
						page: this.page,
						limit: this.limit,
						name: this.name,
						case_type: this.case_type,
						cityid: this.cityid,
						level: this.level,
						age: this.age,
						service_id: '',
						type:this.type
					}
				});
				// if(this.name != ""){
				// 	this.lawyerList = res.data;
				// }
				uni.hideLoading();
				console.log("律师列表")
				console.log(res);	
				// this.lawyerList = res.data;
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
	.empty{
		width: 240rpx;
		height: 63rpx;
		background: #fff;
		border-radius:0px 26px 26px 0px;
		border: 1px solid #40A9FF;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #464646;
		text-align: center;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.baiboc{
		position: fixed;
		top: 150rpx;
		justify-content: center;
		background-color: #fff;
		width: 750rpx;
		height: 160rpx;
	}
	.option{
		width: 470rpx;
		height: 63rpx;
		border-radius: 60rpx;
		/* border: 1px solid #40A9FF; */
		display: flex;
		margin: 0 auto;
		margin-top: 20rpx;
	}
	.qie{
		background: #40A9FF!important;
		color: #FFFFFF!important;
	}
	.real{
		width: 240rpx;
		height: 63rpx;
		background: #fff;
		border-radius: 26px 0px 0px 26px;
		border: 1px solid #40A9FF;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #464646;
		text-align: center;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.zi{
		width: 106rpx;
		height: 35rpx;
		background: #6765FF;
		box-shadow: 0px 2px 4px 0px rgba(109, 109, 109, 0.5);
		border-radius: 21rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.shangx view:nth-child(2){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.shangx view:nth-child(1){
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.left{
		display: flex;
		align-items: center;
	}
	.left image{
		width: 89rpx;
		height: 89rpx;
		margin: 0 16rpx 0 25rpx;
	}
	.qihuan{
		width: 710rpx;
		height: 145rpx;
		background: #B5DEFF;
		border-radius: 11rpx;
		margin: 0 auto;
		margin-top: 260rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding-right: 30rpx;
	}
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
		/* margin-top: 16rpx; */
		height: 54rpx;
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
