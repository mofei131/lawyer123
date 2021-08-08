<template>
	<view class="flex-column mx-start sx-stretch" style="padding: 20rpx;">
		<view class="flex-row" style="margin-bottom: 20rpx;">
			<textarea v-model="question" placeholder-style="color:gray" auto-height placeholder="请输入您的问题,以便更好的为您推荐律师"
				style="flex: 1 1 auto;padding: 20rpx;min-height: 400rpx;background-color: #F4F4F4;border-radius: 20rpx;" />
		</view>

		<view class="flex-column mx-start sx-stretch"
			style="padding: 20rpx;background-color: #F4F4F4;border-radius: 20rpx;">
			<view style="margin:0 0 20rpx 10rpx;color: gray;">
				请选择事类型
			</view>
			<view class="flex-row mx-evenly sx-start wrap" style="align-items: flex-start;">
				<view :class="{choose_item:true,item_on:id==1}" @tap="id=1">家庭婚姻</view>
				<view :class="{choose_item:true,item_on:id==2}" @tap="id=2">买卖合同</view>
				<view :class="{choose_item:true,item_on:id==3}" @tap="id=3">土地房地产</view>
				<view :class="{choose_item:true,item_on:id==4}" @tap="id=4">劳动人事</view>
				<view :class="{choose_item:true,item_on:id==5}" @tap="id=5">刑事</view>
				<view :class="{choose_item:true,item_on:id==6}" @tap="id=6">交通事故</view>
				<view :class="{choose_item:true,item_on:id==7}" @tap="id=7">欠款纠纷</view>
				<view :class="{choose_item:true,item_on:id==8}" @tap="id=8">其他</view>
			</view>

		</view>
		<view class="flex-column mx-center sx-stretch" style="margin-top: 20rpx;flex: 0 0 140rpx;padding: 20rpx;background-color: #F4F4F4;border-radius: 20rpx;">
			<view style="margin:0 0 20rpx 0;color: gray;">
				请输入事发地
			</view>
			<input class="uni-input"   v-model="address" placeholder="请输入事发地,精确到街道" style="flex:1 1 auto;background-color: #FFFFFF;padding-left: 20rpx;" >
		</view>
		<view class="flex-row mx-center sx-center">
			<view class="flex-txt-center" @tap="commit" style="flex: 1 1 auto;margin: 20rpx;height: 60rpx;border-radius:30rpx;background-color: #57A9FF;color: #FFFFFF;">
				提交咨询
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				question: '',
				id:'',
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
	.choose_item {
		flex: 0 0 120rpx;
		padding: 10rpx 10rpx;
		margin: 0 10rpx 10rpx 0;
		background-color: #E6E6E6;
		font-size: 24rpx;
		color: gray;
		text-align: center;
		border-radius: 10rpx;
		border: 2rpx solid #E6E6E6;

	}

	.item_on {
		border: 2rpx solid #007AFF;
		color: #007AFF;
	}
</style>
