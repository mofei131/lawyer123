<template>
	<view>
		<view class="guidelist" v-for="(item,index) in article" :key="index" @tap="pandaun(index)">
		<view class="guideitem">
			<view>{{item.title}}</view>
			<image :src="ji == index?'../../static/icon/downzd.png':'../../static/icon/rightzd.png'"></image>
		</view>
		<view class="box" v-show="ji == index">
		<view class="guidecot" :nodes="item.content"></view>
		</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				decide:false,
				ji:'',
				article:[
					{
						title:'赚钱标题1',
					},{
						title:'赚钱标题2',
					},{
						title:'赚钱标题3',
					},{
						title:'赚钱标题4',
					}
				]
			}
		},
		methods:{
			pandaun(e){
				// console.log(e)
				this.ji = e
			}
		}
	}
</script>


<style>
	.guideitem{
		display: flex;
		justify-content: space-between;
		width: 710rpx;
		height: 80rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.11);
		border-radius: 14rpx;
		margin: auto;
		margin-top: 20rpx;
	}
	.guideitem image{
		width: 36rpx;
		height: 36rpx;
		margin: 26rpx 36rpx 0 0;
	}
	.guideitem view{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #40A9FF;
		margin: 24rpx 0 0 38rpx;
	}
	.guidecot{
		width: 640rpx;
		margin: auto;
	}
	.box{
		width: 710rpx;
		margin: auto;
		border-radius: 14rpx;
		padding-top: 100rpx;
		margin-top: -80rpx;
	}
</style>
