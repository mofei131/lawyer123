<template>
	<view class="flex-column mx-start sx-stretch" style="padding: 20rpx;min-height: 1000rpx;">
		<view class="flex-row mx-start sx-center">
			<view style="flex: 0 0 auto;">

				<pickcity @getcity="getCity"></pickcity>

			</view>
			<uni-search-bar style="flex:1 1 auto;" border="1rpx solid rgba(244,244,244,1)" placeholder="请输入商家名称"
				bgColor="rgba(244,244,244,1)" :cancel-text="closeText" radius="100" @confirm="search" :focus="true"
				v-model="searchValue" @input="input" @clear="clear">
			</uni-search-bar>
		</view>

		<view class="flex-row mx-center sx-center" style="margin: 20rpx;">
			<view :class="{quan_on:flag==1,quan_off:flag!=1}"
				style="line-height: 60rpx;text-align: center;flex: 0 0 200rpx;height: 60rpx;border-radius: 30rpx 0 0 30rpx;"
				@tap="changeFlage(1)">未使用</view>
			<view :class="{quan_on:flag==2,quan_off:flag!=2}"
				style="line-height: 60rpx;text-align: center;flex: 0 0 200rpx;height: 60rpx;border-radius: 0 30rpx 30rpx 0;"
				@tap="changeFlage(2)">不可用</view>
		</view>
		<view v-for="(item,index) in dataSource" :key='index' class="flex-row mx-start sx-stretch backImgFull youhuiquan"
			:style="{backgroundImage:itme.status==2?'url(../../static/images/youhuiquan2.png)': 'url(../../static/images/youhuiquan.png)',color: itme.status==2?'#ccc':'#FFFFFF'}">
			<view class="flex-column mx-center sx-center" style="flex: 0 0 218rpx;">
				<view class="flex-row mx-center sx-center" >
					<text style="font-size: 32rpx;">￥</text>
					<text style="font-size: 57rpx;">{{item.price}}</text>
				</view>
				<text v-if="item.full" style="color: rgba(255,255,255,0.5);font-size: 24rpx;">满{{item.full}}元可用</text>
			</view>
			<view class="flex-column mx-end sx-stretch" style="padding-left: 40rpx;flex: 1 1 auto;line-height: 36rpx;">

				<view class="flex-row mx-between sx-end" style="flex:1 1 auto;">
					<view class="flex-column mx-end sx-stretch">
						<view class="ellipsis quan_title">
							{{item.name}}
						</view>
						<text style="color: rgba(255,255,255,0.5);font-size: 24rpx;">{{usertime(item.starttime,item.endtime)}}</text>

					</view>
					<view class="flex-row mx-center sx-center" style="align-self: center;margin-right: 20rpx;">
						<view @tap="shiyong(item)" v-if="item.status>0" class="flex-txt-center lingqu" :style="{backgroundColor: item.status==1?'rgba(182,100,247,1)':'#B6B6B6'}">
							<text v-if="item.status==1" style="font-size: 24rpx;">未使用</text>
							<view v-else class="backImgCenter" style="width: 121rpx;height: 121rpx;background-image: url(../../static/images/youhuiquan3.png);" v-else></view>
						</view>
						<view @tap="lingqu(item)" v-else class="flex-txt-center lingqu" :style="{backgroundColor:'rgba(182,100,247,1)'}">
							<text  style="font-size: 24rpx;">领取</text>
						</view>
					</view>
				</view>
				<text lines="1" class="ellipsis" style="width:400rpx;color: rgba(255,255,255,0.5);margin-bottom: 20rpx;
										font-size: 24rpx;">{{item.address}}</text>

			</view>


		</view>

		<authMode @confirm="authorTap" ref="authMode"></authMode>


	</view>

</template>

<script>
	import authMode from '@/pages/components/authMode/authMode.vue'
	import pickcity from '@/pages/components/pickcity/pickcity.vue'
	import math from '@/common/math.js'
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		components: {
			authMode,
			pickcity
		},
		data() {
			return {
				flag: 1,
				closeText: '',
				searchValue: '',
				city_id: '',
				dataSource:[]
			}
		},
		onLoad: function() {

		},
		onShow() {
			if (!this.$store.state.userInfo) {
				this.$refs.authMode.open()
				this.getWxCode();
			}
		},
		methods: {

			...mapActions([
				'getProvinceCity', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
				'getBussinessTypes',
				'getLawyerLevels', 'getWorkAges', 'getWxCode', 'updateUserInfo'
			]),
			changeFlage(flag) {
				this.flag = flag;
				this.getYouhuiquan();
			},
			async authorTap() {
				if (!this.$store.state.userInfo || !this.$store.state.userInfo.user_id || !this.$store.state.userInfo
					.isAuthor) {
					let isSuccess = await this.updateUserInfo();
					if (isSuccess) {
						uni.showToast({
							title: '授权成功！'
						})
						this.$refs.authMode.open();
					}
				}
			},
			input(e) {
				this.searchValue = e;
				if(this.ttt){
					clearTimeout(this.ttt)
				}
				this.ttt = setTimeout(()=>{
					this.getYouhuiquan();
				},1500)
			},
			clear(e) {
				console.log(e);
			},
			search(e) {

			},
			async getYouhuiquan() {
				//返回选择的数组下标

				let res = await this.$myRequest({
					url: 'coupon/list',
					methods: 'GET',
					data: {
						city_id: this.city_id,
						type: this.flag,
						user_id: this.$store.state.userInfo.user_id,
						name:this.searchValue
					}
				});
				if (res && res.code == 200) {
					console.log(res.data);
					this.dataSource = res.data;
				} else {
					uni.showToast({
						title: '每日学法数据获取异常',
						icon: 'none'
					})
				}

			},
			async lingqu(item){
				let res = await this.$myRequest({
					url: 'coupon/getCoupon',
					methods: 'GET',
					data: {
						coupon_id:item.id,
						user_id: this.$store.state.userInfo.user_id
					}
				});
				if (res && res.code == 200) {
					this.getYouhuiquan();
				} else {
					uni.showToast({
						title: '服务器异常',
						icon: 'none'
					})
				}
			},
			 shiyong(item){
				uni.showModal({
					cancelText: "取消", // 取消按钮的文字  
					confirmText: "确认", // 确认按钮文字 
					title: '提示',
					content: '确定使用优惠券吗?',
					confirmColor:'#3B8BFF',
					cancelColor:'#222222',
					success:async res => {
						if (res.confirm) {
							
							let result = await this.$myRequest({
								url: 'coupon/useCoupon',
								methods: 'GET',
								data: {
									coupon_id:item.id,
									user_id: this.$store.state.userInfo.user_id
								}
							});
							if (result && result.code == 200) {
								this.getYouhuiquan();
							} else {
								uni.showToast({
									title: '服务器异常',
									icon: 'none'
								})
							}
							
							
						} else if (res.cancel) {
							// 取消
							console.log('cancel')
						}
					}
				});
				
			},
			getCity(e) {
				this.city_id = e.cityid;
				this.getYouhuiquan();

			}
		},
		computed: {
			usertime(sdt,edt) {
				return (sdt,edt) => {
					let sdtStr = math.formatTime(sdt,'Y.M.D');
					let edtStr = math.formatTime(edt,'Y.M.D');
					console.log(sdtStr);
					console.log(edtStr);
					return `${sdtStr}-${edtStr}`
				}
			}
		}
	}
</script>

<style>
	.quan_on {
		border: 2rpx solid #65ADF6;
		background-color: #65ADF6;
		color: #FFFFFF;
	}

	.quan_off {
		border: 2rpx solid #65ADF6;
		background-color: #FFFFFF;
		color: gray;

	}

	.youhuiquan {
		flex: 0 0 173rpx;
		margin-bottom: 20rpx;
	}

	.quan_title {
		width: 270rpx;
		color: #FFFFFF;
		font-size: 26rpx;
		margin-bottom: 10rpx;
	}

	.lingqu {
		height: 48rpx;
		border-radius: 24rpx;
		width: 139rpx;
	}

</style>
