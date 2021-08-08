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
		data() {
			return {
				phone:'077382568624'
			}
		},
		methods: {
			callphone(){
				uni.makePhoneCall({
				    phoneNumber: '077382568624', //仅为示例
					success() {
						
					}
				});
			}
		}
	}
</script>

<style>

</style>
