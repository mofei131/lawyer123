<template>
	<view class="flex-column mx-start sx-stretch" style="padding: 20rpx;">
		
		<view class="flex-txt-center" style="color: gray;flex: 0 0 80rpx;border: 2rpx solid gray;">{{phone}}</view>
		<view class="flex-row mx-center sx-center" style="background-color: #26CD93;flex: 0 0 80rpx;" @tap="callphone">
			立即拨打
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(param) {
		
			let userInfo = this.$store.state.userInfo;
			// if(!userInfo){
			// 	uni.navigateTo({
			// 		url:'../login/login'
			// 	})
			// 	return
			// }
			// this.layer_id = param.layer_id;
			// this.user_id = userInfo.user_id;
		
		},
		data() {
			return {
				phone:'077382568624',
				layer_id: '',
				user_id: '',
			}
		},
		methods: {
			callphone(){
				uni.makePhoneCall({
				    phoneNumber: '077382568624', //仅为示例
					success() {
						
					}
				});
			},
			async commit() {
				//跳转支付页面
				let {
					layer_id,
					user_id,
				} = this.$data;
				if (!layer_id || !user_id) {
					uni.showToast({
						title: '用户数据异常，请重新登录',
						icon: 'none'
					})
					return;
				}
				let data = {
					layer_id,
					user_id,
				}
				console.log(data);
				uni.showLoading({
					title: '正在提交...'
				})
				let res = await this.$myRequest({
					url: 'service/pinqing',
					data
				});
				if (res && res.data) {
					uni.hideLoading();
					uni.showToast({
						title: "提交成功" + res.data.service_id
					})
			
				}
			},
		}
	}
</script>

<style>

</style>
