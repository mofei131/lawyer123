<template>
	<view class="fourcard">
		<view class="cardone" v-for="(item,index) in lawyerlist" :key="index" @tap='todetail(item)'>
			<view class="cardoneleft">
				<image :src="item.portrait"></image>
			</view>
			<view class="cardoneright">
				<view class="head">
					<view class="name">{{item.name}}</view>
					<view class="workyer">执业{{item.workyer}}年</view>
				</view>
				<view class="address">{{item.address}}</view>
				<view class="begood">{{item.begood}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:["lawyerlist"],
		methods:{
			todetail(){
				uni.navigateTo({
					url:'../detail/lawyerDetail?id='
				})
			}
		}
	}
</script>

<style>
	.fourcard{
		width: 676rpx;
		display: flex;
		margin: auto;
		flex-wrap: wrap;
		
	}
	.cardone{
		width: 338rpx;
		display: flex;
		margin-top: 28rpx;
	}
	.cardoneleft image{
		width: 70rpx;
		height: 70rpx;
		border-radius: 36rpx;
	}
	.head{
		display: flex;
	}
	.name{
		font-size: 24rpx;
		color: #333333;
	}
	.workyer{
		width: 70rpx;
		height: 26rpx;
		background: #D4E5F8;
		border-radius: 2rpx;
		color: #40A9FF;
		font-size: 16rpx;
		text-align: center;
		margin-top: 5rpx;
		margin-left: 20rpx;
	}
	.address{
		color: #666666;
		font-size: 20rpx;
		margin-top: 6rpx;
	}
	.begood{
		width: 240rpx;
		color: #999999;
		font-size: 20rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
		margin-top: 6rpx;
	}
	.cardoneright{
		margin-left: 10rpx;
	}
</style>
