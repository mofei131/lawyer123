<template>
	<view v-if="dataDet.user_servive.status == 1">
		<view class="mk1">
			<view class="mk1top">
				<view class="mk1left">
					<image :src="dataDet.service.images" mode="aspectFit"></image>
				</view>
				<view class="mk1right">{{dataDet.service.name}}</view>
			</view>
			<view class="fit">
				<view>订单编号：</view>
				<view>{{dataDet.order.orderno}}</view>
			</view>
			<view class="fit">
				<view>订单金额：</view>
				<view style="color: #CF1322;">￥{{dataDet.order.money}}</view>
			</view>
			<view class="fit">
				<view>支付时间：</view>
				<view>{{dataDet.user_servive.create_time}}</view>
			</view>
		</view>
		<view class="mk2">
			<view class="titi">客户信息</view>
			<view class="fit fit2">
				<view>客户昵称：</view>
				<view>{{dataDet.user.nickname}}</view>
			</view>
			<view class="fit fit2">
				<view>手机号：</view>
				<view>{{dataDet.user_servive.mobile}}</view>
			</view>
		</view>
		<view class="btnbox">
		<view class="btn" @click="quren()" v-if="dataDet.user_servive.status == 1">核销确认</view>
		<view class="btn" v-else>已核销</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				orderno:0,
				dataDet:[]
			}
		},
		onLoad(p) {
			console.log(p)
			this.orderno = p.q.slice(43)
		},
		onShow() {
			this.optDet()
		},
		methods:{
			quren(){
				let that = this
				uni.request({
					url:'https://layer.boyaokj.cn/api/act/verify',
					data:{
						order_id:this.dataDet.order.id,
						user_id:uni.getStorageSync('userInfo').id
					},
					success(res) {
						if(res.data.code == 200){
							uni.showToast({
								title:'核销成功',
								duration:1000
							})
							setTimeout(function(){
								that.optDet()
							},1000)
						}else{
							uni.showModal({
								title: '提示',
								content: res.data.message,
								showCancel:false,
								success: function (res) {
										if (res.confirm) {
												uni.switchTab({
													url:'../index/index'
												})
										}
								}
							});
						}
					}
				})
			},
			optDet(){
				let that = this
				uni.request({
					url:'https://layer.boyaokj.cn/api/act/orderDetailByOrderno',
					data:{
						orderno:this.orderno,
						user_id:uni.getStorageSync('userInfo').id
					},
					success(res) {
						if(res.data.code == 200){
							console.log(res.data.data)
							that.dataDet = res.data.data
						}else{
							uni.showModal({
								title: '提示',
								content: res.data.message,
								showCancel:false,
								success: function (res) {
										if (res.confirm) {
												uni.switchTab({
													url:'../index/index'
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
	page{
		background: #F4F7F7;
	}
	.btn{
		width: 750rpx;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 120rpx;
		background-color: #40A9FF;
		color: #fff;
		font-size: 32rpx;
	}
	.btnbox{
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
	}
	.titi{
		width: 690rpx;
		height: 75rpx;
		border-bottom: 1rpx solid #ddd;
		display: flex;
		align-items: center;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.mk2{
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin: auto;
		margin-top: 20rpx;
		padding-bottom: 13rpx;
	}
	.fit view:nth-child(2){
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.fit2 view:nth-child(1){
		margin-right: 18rpx;
	}
	.fit view:nth-child(1){
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		width: 140rpx;
		text-align: justify;
	}
	.fit2{
		width: 690rpx;
		margin: auto;
		margin-bottom: 11rpx;
		display: flex;
		align-items: center;
	}
	.fit{
		width: 690rpx;
		margin: auto;
		margin-bottom: 11rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.mk1right{
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.mk1{
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin: auto;
		margin-top: 43rpx;
		padding-bottom: 24rpx;
	}
	.mk1top{
		width: 690rpx;
		margin: auto;
		border-bottom: 1rpx solid #ddd;
		display: flex;
		align-items: center;
		padding: 20rpx 0 16rpx 0;
		box-sizing: border-box;
		margin-bottom: 16rpx;
	}
	.mk1left image{
		width: 140rpx;
		height: 140rpx;
		margin-right: 16rpx;
	}
</style>
