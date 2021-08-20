<template>
	<view class="xiyibox">
		<view class="boxwite">
			<view class="tishi">提示</view>
			<view class="yuedu">请阅读并同意<text class="shixia" @tap="cak()">{{box.title}}</text></view>
			<view class="binglie">
				<!-- <view class="ck" @tap="cak()">查看协议</view> -->
				<view class="ty" @tap="submit()">同意协议</view>
			</view>
			<image src="@/static/icon/closeicon.png" class="close" @tap="show()"></image>
		</view>
	</view>
</template>

<script>
	export default{
		props:['box'],
		methods:{
			cak(){
				this.$emit("cak")
			},
			submit(){
				this.$emit("submit")
			},
			show(){
				this.$emit("show")
			}
		}
	}
</script>

<style>
	.close{
		width: 66rpx;
		height: 66rpx;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 20;
	}
	.shixia{
		color: #A3A3A3;
		border-bottom: 1rpx solid #666;
	}
	.tishi,.yuedu{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		text-align: center;
	}
	.tishi{
		margin-bottom: 40rpx;
	}
	.xiyibox{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		background: rgb(0,0,0,.5);
		z-index: 10;
		box-sizing: border-box;
		padding-top: 60%;
	}
	.boxwite{
		width: 720rpx;
		/* height: 368px; */
		background: #FFFFFF;
		border-radius: 14rpx;
		box-sizing: border-box;
		padding-top: 68rpx;
		margin: auto;
		height: 368rpx;
		position: relative;
	}
	.binglie{
		display: flex;
		justify-content: space-between;
		width: 680rpx;
		margin: auto;
		margin-top: 79rpx;
	}
	.binglie view{
		width: 334rpx;
	}
	.ck{
		height: 76rpx;
		border-radius: 39rpx;
		border: 1px solid #1890FF;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #1890FF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.ty{
		height: 76rpx;
		border-radius: 39rpx;
		border: 1px solid #1890FF;
		background: #1890FF;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: auto;
		
	}
</style>
