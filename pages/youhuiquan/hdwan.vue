<template>
	<view v-if="dataDet.user_servive.status == 1">
		<view class="mk1">
			<image :src="dataDet.qrcode"></image>
			<view class="code">{{dataDet.order.orderno}}</view>
			<view class="hui"></view>
			<view class="pingti">入园凭证（截图保存以防收不到短信）</view>
		</view>
		<view class="mk2">
			<view class="mk2tit">订单详情</view>
			<view class="hui"></view>
			<!-- <view class="xialist">
				<view class="xialeft">有效期：</view>
				<view class="xiaright">2020年12月01日-2020年12月28日</view>
				</view> -->
			<view class="xialist">
				<view class="xialeft">商家地址：</view>
				<view class="xiaright">{{dataDet.service.address}}</view>
			</view>
			<view class="xialist">
				<view class="xialeft">订单编号：</view>
				<view class="xiaright">{{dataDet.order.orderno}}</view>
			</view>
			<view class="xialist">
				<view class="xialeft">购买数量：</view>
				<view class="xiaright">1</view>
			</view>
			<view class="xialist">
				<view class="xialeft">手机号：</view>
				<view class="xiaright">{{dataDet.user_servive.mobile}}</view>
			</view>
			<view class="xialist">
				<view class="xialeft">订单总价：</view>
				<view class="xiaright">￥{{dataDet.order.money}}</view>
			</view>
			<view class="xialist">
				<view class="xialeft">支付方式：</view>
				<view class="xiaright">微信支付</view>
			</view>
			<view class="xialist">
				<view class="xialeft">费用包含：</view>
				<view class="xiaright">{{dataDet.service.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				service_id:0,
				dataDet:[],
				mobile:''
			}
		},
		onLoad(p) {
			this.service_id = p.id
		},
		onShow() {
			this.optdet()
			this.mobile = uni.getStorageSync('userInfo').mobile
		},
		methods:{
			optdet(){
				let that = this
				uni.request({
					url:'https://layer.boyaokj.cn/api/act/orderDetail',
					data:{
						order_id:this.service_id
					},
					success(res) {
						if(res.data.code == 200){
							that.dataDet = res.data.data
							// console.log(res.data.data)
						}else{
							// uni.showToast({
							// 	title:res.data.message,
							// 	icon:'none'
							// })
							uni.showModal({
								title: '提示',
								content: res.data.message,
								showCancel:false,
								success: function (res) {
									if (res.confirm) {
											uni.navigateBack({
												delta: 1
											})
									}
								}
							});
						}						
					}
				})
			}
		}
	}
</script>

<style>
	.xiaright{
		width: 530rpx;
	}
	.xialeft{
		width: 130rpx;
		text-align-last: justify;
	}
	.xialist{
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		margin-top: 20rpx;
		display: flex;
	}
	.mk2tit{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #51565D;
		margin-bottom: 16rpx;
	}
	.mk2{
		width: 702rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		padding: 16rpx 16rpx 30rpx 16rpx;
		box-sizing: border-box;
		margin: 20rpx auto;
	}
	.pingti{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #40A9FF;
		margin-top: 27rpx;
		text-align: center;
	}
	.hui{
		width: 670rpx;
		height: 1rpx;
		background-color: #D2D2D2;
		margin: auto;
	}
	.code{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #40A9FF;
		margin-bottom: 30rpx;
		text-align: center;
		margin-top: 30rpx;
	}
	.mk1 image{
		width: 360rpx;
		height: 360rpx;
		margin: auto;
		display: block;
	}
	.mk1{
		width: 702rpx;
		height: 581rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin: auto;
		padding: 30rpx 0 30rpx 0;
		box-sizing: border-box;
	}
	page{
		background-color: #F4F7F7;
		padding-top: 30rpx;
	}
</style>
