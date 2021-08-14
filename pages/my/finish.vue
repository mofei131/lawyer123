<template>
	<view class="finish">
		<image src="../../static/icon/wxicon2.png"></image>
		<view>支付成功</view>
		<button type="default" @tap="back()">确定</button>
	</view>
</template>

<script>
	export default {
		onLoad(p) {
			this.emitName = p.emitName;
		},
		data() {
			return {
				emitName: ''
			}
		},
		methods: {

			back() {
				if (this.emitName) {
					uni.$emit(this.emitName, {
						ispay: true
					});
				} else {
					uni.switchTab({
						url: '../index/index'
					})
				}

			}
		}
	}
</script>

<style>
	.finish {
		padding-top: 80%;
	}

	.finish image {
		margin: auto;
		width: 300rpx;
		height: 300rpx;
		display: block;
	}

	.finish view {
		font-size: 24rpx;
		text-align: center;
		margin-top: 50rpx;
	}

	.finish button {
		width: 500rpx;
		height: 80rpx;
		border: 1rpx solid #40A9FF;
		background: #40A9FF;
		color: #fff;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 100rpx;
		font-size: 24rpx;
		font-weight: bold;
		outline: none;
	}
</style>
