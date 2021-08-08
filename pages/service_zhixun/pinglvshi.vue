<template>
	<view class="flex-column mx-start sx-stretch" style="padding: 20rpx;">
		<view class="flex-column mx-center sx-stretch" style="margin-bottom: 20rpx;flex: 0 0 80rpx;padding: 20rpx;background-color: #F4F4F4;border-radius: 20rpx;">
			<input class="uni-input"   v-model="title" placeholder="请输案件标题,如婚姻家庭或交通事故" style="flex:1 1 auto;background-color: #FFFFFF;padding-left: 20rpx;" >
		</view>
		<view class="flex-row" style="margin-bottom: 20rpx;">
			<textarea v-model="question" placeholder-style="color:gray" auto-height placeholder="请输入您的问题,以便更好的为您推荐律师"
				style="flex: 1 1 auto;padding: 20rpx;min-height: 400rpx;background-color: #F4F4F4;border-radius: 20rpx;" />
		</view>

		<view class="flex-column mx-center sx-stretch" style="margin-top: 20rpx;flex: 0 0 80rpx;padding: 20rpx;background-color: #F4F4F4;border-radius: 20rpx;">
			<input class="uni-input"   v-model="address" placeholder="请输入事发地,精确到街道" style="flex:1 1 auto;background-color: #FFFFFF;padding-left: 20rpx;" >
		</view>
		<view class="flex-row mx-center sx-center">
			<view class="flex-txt-center" @tap="commit" style="flex: 1 1 auto;margin: 20rpx;height: 60rpx;border-radius:30rpx;background-color: #57A9FF;color: #FFFFFF;">
				提交
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				question: '',
				title:'',
				address:''
			}
		},
		methods: {
			commit(){
				//跳转支付页面
			},
		}
	}
</script>

<style>
	

</style>
