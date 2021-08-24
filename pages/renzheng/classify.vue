<template>
	<view>
		<view class="order" @click="toservice()">
			<view class="topflex">
				<view>平台自有律师认证</view>
				<view>人工审核需要1-2天</view>
			</view>
			<image src="../../static/icon/fangicon.png"></image>
		</view>
		<view class="order" @click="todeal()">
			<view class="topflex">
				<view>平台入驻律师认证</view>
				<view>人工审核需要1-2天</view>
			</view>
			<image src="../../static/icon/fangicon.png"></image>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			toservice(){
				uni.setStorage({
				key:'type',
				data:1
				})
				uni.navigateTo({
					url:'./privateNotice'
				})
			},
			todeal(){
				uni.setStorage({
				key:'type',
				data:2
				})
				uni.navigateTo({
					url:'./commonNotice'
				})
			}
		}
	}
</script>

<style>
	page{
		background: #F4F7F7;
		padding-top: 31rpx;
	}
	.order{
		display: flex;
		background: #fff;
		justify-content: space-between;
		margin-top: 20rpx;
		box-sizing: border-box;
	}
	.topflex{
		margin: 20rpx 0 0 22rpx;
		box-sizing: border-box;
	}
	.topflex view:nth-child(1){
		font-size: 38rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		
	}
	.topflex view:nth-child(2){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		margin-top: 7rpx;
		margin-bottom: 21rpx;
	}
	.order image{
		width: 66rpx;
		height: 66rpx;
		margin: 35rpx 21rpx 0 0;
	}
</style>
