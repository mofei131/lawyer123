<template>
	<view>
		<view class="content" :nodes="item.content"></view>
		<view class="btn" @tap="toUrl()">立即认证</view>
	</view>
</template>

<script>
	export default{
		methods:{
			toUrl(){
				uni.navigateTo({
					url:'./classifyDet1'
				})
			}
		}
	}
</script>

<style>
	.content{
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin: 20rpx auto;
		padding: 25rpx;
		box-sizing: border-box;
	}
	.btn{
		width: 680rpx;
		height: 76rpx;
		background: #40A9FF;
		border-radius: 39rpx;
		margin: auto;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		padding-top: 18rpx;
		box-sizing: border-box;
	}
</style>
