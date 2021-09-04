<template>
	<view class="finish">
		<image src="../../static/icon/wxicon2.png"></image>
		<view>支付成功</view>
		<button type="default" @tap="back()">确定</button>
		<view class="tanbox" v-if="show">
			<view class="baibox">
			<view class="top">
				<view>友情提示</view>
				<view>您已下单成功，律师会在5-30分钟来电，请注意接听。</view>
			</view>
			<view class="bottom">
				<view @tap="zai()">确定</view>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(p) {
			console.log(p)
			this.emitName = p.emitName;
			this.phone = p.phone
		},
		data() {
			return {
				emitName: '',
				phone:'',
				show:false
			}
		},
		methods: {
			zai(){
				uni.switchTab({
					url: '../index/index'
				})
			},
			back() {
				console.log(this.emitName)
				if (this.emitName && this.emitName != "undefined") {
					console.log("到了吗")
					uni.$emit(this.emitName, {
						ispay: true,
					});
				}else if(this.phone != "undefined"){
					console.log(111)
					// uni.makePhoneCall({
					// 	 phoneNumber: this.phone,
					// })
					// uni.showModal({
					//     title: '友情提示',
					//     content: '您已下单成功，律师会在5-30分钟来电，请注意接听。',
					// 		showCancel:false,
					//     success: function (res) {
					//         if (res.confirm) {
					//             uni.switchTab({
					//             	url: '../index/index'
					//             })
					//         }
					//     }
					// });
					this.show = true
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
	.bottom view{
		width: 100%;
		font-size: 32rpx!important;
		color: 	#4682B4;
		border-top: 1rpx solid #e8e8e8;
		text-align: center;
		align-items: center;
		display: flex;
		justify-content: center;
	}
	.bottom{
		display: flex;
		height: 150rpx;
		justify-content: space-between;
		margin-top: 60rpx;
	}
	.top view:nth-child(1){
		font-size: 32rpx;
		text-align: center;
		color: #000;
		font-weight: bold;
		padding-top: 80rpx;
	}
	.top view:nth-child(2){
		font-size: 28rpx;
		text-align: start;
		color: #333;
		padding-top: 30rpx;
		width: 580rpx;
		margin: auto;
		text-indent: 56rpx;
	}
	.baibox{
		width: 660rpx;
		height: 440rpx;
		margin: auto;
		margin-top: 60%!important;
		background-color: #fff;
		border-radius: 18rpx;
	}
	.tanbox{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(0,0,0,.2);
		z-index: 5;
		margin-top: 0!important;
	}
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
