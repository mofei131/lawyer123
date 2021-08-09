<template>
	<view>
		<view class="billlist">
			<view class="billitem" v-for="(item,index) in bill" :key="index">
				<view class="itemleft">
					<view>{{item.title}}</view>
					<view>{{item.time}}</view>
				</view>
				<view class="itemright">
					<view>{{item.rae}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				bill:[
					{
						title:'余额提现',
						time:'2021-08-09 13:22:21',
						rae:'-64.00'
					},{
						title:'余额充值',
						time:'2021-08-07 15:06:55',
						rae:'+664.00'
					}
				]
			}
		}
	}
</script>

<style>
	.billlist{
		width: 100%;
		background: #fff;
	}
	.billitem{
		display: flex;
		width: 665rpx;
		margin: auto;
		justify-content: space-between;
		padding: 28rpx 0 30rpx 0;
		box-sizing: border-box;
		border-bottom: 1rpx solid #c4c4c4;
	}
	.billitem:last-child{
		border-bottom: 0;
	}
	.itemleft view:nth-child(1){
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-bottom: 8rpx;
	}
	.itemleft view:nth-child(2){
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.itemright view{
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-top: 18rpx;
	}
</style>
