<template>
	<view>
		<view class="takeout">
			<view class="outtop">
				<view>请选择提现方式</view>
			</view>
			<view class="outbottom">
				<view class="outleft">
					<image src="../../static/icon/wxicon.png"></image>
					<view>微信提现<text>(推荐)</text></view>
				</view>
				<view class="outright">
					<view>实时到账:</view>
					<image @tap="agreementSuccess" class="fix" :src="agreement==true?'../../static/icon/ty1.png':'../../static/icon/ty0.png'"></image>
				</view>
			</view>
			</view>
			<view class="inputbox">
			<view class="input">
				<view class="title">提现金额</view>
				<view class="entry">
					<view>￥</view>
					<input type="number" v-model="value" placeholder="请输入提现金额" placeholder-style="font-size: 36rpx;color: #999999;" />
				</view>
				<view class="tips">钱包余额：{{balance}}(可提现{{balance}}元钱包需保留0.0元)</view>
			</view>
			</view>
			<view class="btn" @tap="pay()">立即提现</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				agreement:true,
				balance:0,
				// total:500.00,
				value:''
			}
		},
		onLoad(p){
			// this.balance = p.balance
			this.balance = 500
		},
		methods:{
			agreementSuccess() {
			  this.agreement = !this.agreement;
			},
			pay(){
				if (!this.value) {
					uni.showToast({
						title: '请输入提现金额',
						icon: 'none',
					})
					return
				}
				if (this.value == 0) {
					uni.showToast({
						title: '提现金额不能为0',
						icon: 'none',
					})
					return
				}
				if(this.agreement == false){
					uni.showToast({
						title:"请勾选支付方式",
						icon:'none'
					})
				}else if(this.value > this.balance){
					uni.showToast({
						title:'余额不足，请重新输入',
						icon:'none'
					})
				}else{
					// console.log("支付")
					let that = this
					uni.request({
						url:'https://layer.boyaokj.cn/api/wechat/withdraw',
						method:'GET',
						data:{
							user_id:42,
							money:that.value
						},
						success(res) {
							uni.showToast({
								title:'提现成功',
							})
							uni.redirectTo({
								url:'./mine'
							})
							//  uni.navigateTo({
							// 		url: '/pages/info/index?name=1',
							// });
						}
					})
				}
				
			}
		}
	}
</script>

<style>
	page{
		background: #F4F7F7;
	}
	.outleft image{
		width: 60rpx;
		height: 60rpx;
		margin: 0 40rpx 0 77rpx;
	}
	.outright image{
		width: 60rpx;
		height: 60rpx;
		margin: 0 56rpx 0 67rpx;
	}
	.takeout{
		width: 100%;
		background: #fff;
		padding: 17rpx 0 13rpx 0;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.11);
	}
	.outtop view{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #666666;
		margin: 0 0 20rpx 49rpx;
	}
	.outbottom{
		justify-content: space-between;
	}
	.outbottom,.outleft,.outright{
		display:flex;
	}
	.outleft view{
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #666666;
		margin-top: 8rpx;
	}
	.outleft text{
		font-size: 20rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FF3223;
	}
	.outright view{
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #666666;
		margin-top: 16rpx;
	}
	.inputbox{
		width: 100%;
		box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.11);
		background: #fff;
	}
	.input{
		background: #fff;
		padding: 11rpx 0 20rpx 0;
		width: 656rpx;
		margin: auto;
	}
	.title {
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #666666;
	}
	.entry{
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FF3223;
		height: 75rpx;
		border-bottom: 1rpx solid #D8D8D8;
		margin-top: 24rpx;
		display: flex;
	}
	.entry view{
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FF3223;
		margin-top: 10rpx;
	}
	.entry input{
		height: 75rpx;
	}
	.tips{
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #999999;
		margin-top: 9rpx;
	}
	.btn{
		width: 686rpx;
		height: 71rpx;
		background: #049EFF;
		border-radius: 35rpx;
		margin: auto;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		/* line-height: 50rpx; */
		padding-top: 15rpx;
		box-sizing: border-box;
		margin-top: 145rpx;
	}
</style>
