<template>
	<view class="flex-column mx-start sx-stretch" style="padding: 20rpx;font-size: 32rpx;">
		<view class="flex-column mx-center sx-stretch"
			style="margin-bottom: 20rpx;flex: 0 0 76rpx;background-color: #F4F4F4;border-radius: 15rpx;">
			<input class="uni-input" v-model="title" placeholder="请输入案情标题（如：婚姻家庭、交通事故）" placeholder-style="color: #6A6A6A;font-size: 24rpx;font-family: PingFangSC-Regular;"
				style="flex:1 1 auto;background-color: #F4F4F4;padding-left: 20rpx;border-radius: 20rpx;color: #6A6A6A;font-size: 24rpx;">
		</view>

		<view class="flex-row" style="margin-bottom: 20rpx;">
			<textarea v-model="content"
				placeholder-style="color: rgba(153,153,153,1);font-size: 28rpx;font-family: PingFangSC-Regular;"
				placeholder="请简要描述案情和要求，律师首先会帮您做案情分析"
				style="flex: 1 1 auto;padding: 18rpx 0 0 25rpx;height:407rpx;background-color: #F4F4F4;border-radius: 8rpx;font-size:28rpx" />
		</view>

		<view class="flex-column mx-center sx-stretch"
			style="margin-top: 20rpx;flex: 0 0 auto;padding: 20rpx;background-color: #F4F4F4;border-radius: 8rpx;color: #6A6A6A;font-size: 24rpx;font-family: PingFangSC-Regular;">
			<view class="flex-row mx-center sx-center">
				<input class="uni-input" disabled="true" v-model="address"
					placeholder-style="font-size:24rpx;color:#6A6A6A" placeholder="请选择事发地" style="flex:1 1 auto;">
				<view class="flex-row mx-center sx-center" style="flex: 0 0 auto;margin-left:20rpx;"
					@tap="searchKeyWord">
					<view style="flex: 0 0 auto;margin-right: 10rpx;">请选择事发地</view>
					<fa-icon type="angle-right" color="#6A6A6A"></fa-icon>
				</view>
			</view>
		</view>
		<view class="flex-row mx-center sx-center">
			<view class="flex-txt-center" @tap="submit()"
				style="flex: 1 1 auto;margin: 20rpx;height: 80rpx;border-radius:30rpx;background-color: #57A9FF;color: #FFFFFF;">
				提交
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		onLoad(param) {
			this.price = param.price;
			let userInfo = this.$store.state.userInfo;
			this.userInfo = userInfo;
			this.layer_id = param.layer_id;
			this.user_id = userInfo.user_id;

		},
		data() {
			return {
				layer_id: '',
				userInfo: null,
				user_id: null,
				content: '',
				title: '',
				address: '',
				lng: '',
				lat: '',
				price: ''

			}
		},
		methods: {
			submit() {
				let {
					layer_id,
					user_id,
					content,
					title,
					address,
					lng,
					lat
				} = this.$data;
				if (!layer_id || !user_id) {
					uni.showToast({
						title: '用户数据异常，请重新登录',
						icon: 'none'
					})
					return;
				}
				if (!content || (content + '').trim() == '') {
					uni.showToast({
						title: '请输入咨询内容',
						icon: 'none'
					})
					return;
				}
				if (!title) {
					uni.showToast({
						title: '请输入标题！',
						icon: 'none'
					})
					return;
				}
				if (!address || !lng || !lat) {
					uni.showToast({
						title: '请选择事发地址！',
						icon: 'none'
					})
					return;
				}
				let that = this
				uni.showModal({
					title: '风险友情提示',
					content: '本次付费为聘请律师的定金费用，律师费差额请转账到山东一二三法律服务集团名下对公账户，否则产生的一切损失由客户自行承担',
					success: function(res) {
						if (res.confirm) {
							that.commit()
						}
					}
				});
			},
			async commit() {

				//跳转支付页面

				let data = {
					layer_id,
					user_id,
					content,
					title,
					address,
					lng,
					lat
				}

				console.log(data);
				uni.showLoading({
					title: '正在提交...'
				})
				let res = await this.$myRequest({
					url: 'service/pinqing',
					data
				});
				uni.hideLoading()
				if (res && res.code == -1) {
					uni.showToast({
						title: res.message,
						icon: 'none'
					})
				} else {
					if (res && res.code == 200) {
						console.log(res);
						uni.navigateTo({
							url: '../my/pay?id=' + res.data.service_id + '&price=' + this.price + '&typeId=10'
						})
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				}
			},
			searchKeyWord() {
				console.log('---' + this.searchAddress);
				let mapContext = uni.createMapContext("map1");
				uni.chooseLocation({
					keyword: this.searchAddress,
					success: (res) => {
						console.log(res) //name address  latitude  longitude
						this.address = res.address;
						this.lng = res.longitude;
						this.lat = res.latitude;
						// mapContext.moveToLocation({
						// 	longitude: res.longitude,
						// 	latitude: res.latitude,
						// 	success: (e) => {
						// 		console.log(JSON.stringify(e));
						// 		this.markers[0].longitude = res.longitude;
						// 		this.markers[0].latitude = res.latitude;
						// 	}
						// })
					}
				})




			},
		}
	}
</script>

<style>


</style>
