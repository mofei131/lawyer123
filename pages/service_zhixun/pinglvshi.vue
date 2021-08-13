<template>
	<view class="flex-column mx-start sx-stretch" style="padding: 20rpx;font-size: 32rpx;">
		<view class="flex-column mx-center sx-stretch"
			style="margin-bottom: 20rpx;flex: 0 0 80rpx;padding: 20rpx;background-color: #F4F4F4;border-radius: 20rpx;">
			<input class="uni-input" v-model="title" placeholder="请输案件标题,如婚姻家庭或交通事故"
				style="flex:1 1 auto;background-color: #FFFFFF;padding-left: 20rpx;">
		</view>
		<view class="flex-row" style="margin-bottom: 20rpx;">
			<textarea v-model="content" placeholder-style="color:gray" auto-height placeholder="请输入您的问题,以便更好的为您推荐律师"
				style="flex: 1 1 auto;padding: 20rpx;min-height: 400rpx;background-color: #F4F4F4;border-radius: 20rpx;" />
		</view>

		<view class="flex-row mx-center sx-center" style="background-color: #F4F4F4;height: 60rpx;padding: 10rpx 0;"
			@tap="searchKeyWord">
			<input class="uni-input" disabled="true" v-model="address" placeholder-style="font-size:32rpx"
				placeholder="请选择事发地,精确到街道" style="flex:1 1 auto;padding-left: 20rpx;font-size: 32rpx;">
			<view style="margin: 0 20rpx;">
				<fa-icon type="telegram" color="gray"></fa-icon>
			</view>
		</view>
		<view class="flex-row mx-center sx-center">
			<view class="flex-txt-center" @tap="commit"
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
			async commit() {
				//跳转支付页面
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
							url: '../my/pay?id=' + res.data.service_id + '&price=' + this.price+'&typeId=10'
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
