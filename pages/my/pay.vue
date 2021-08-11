<template>
	<view>
		<view class="itemlist">
			<view class="listitem">
				<!-- <view>{{arr.chapter}}</view> -->
				<view>￥{{arr.price}}</view>
			</view>
			<view class="paylist">
			<view class="wxpay">
				<image src="@/static/icon/wxicon.png"></image>
				<view>微信支付</view>
			</view>	
			<image @tap="agreementSuccess" class="fix" :src="agreement==true?'../../static/icon/ty1.png':'../../static/icon/ty0.png'"></image>
			</view>
			<view class="nowpay">
				<button @tap="pay()">立即支付</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				arr:{
					id:'',
					chapter:'',
					price:'',
					},
				agreement: true,
			}
		},
		onLoad(options){
			this.arr.id = options.id
			// this.arr.chapter = options.chapter
			this.arr.price = options.price
		},
		computed:{
			
		},
		methods:{
			agreementSuccess() {
			  this.agreement = !this.agreement;
			},
			pay(){
				let that = this
				if(this.agreement == false){
					uni.showToast({
						title:"请勾选支付方式",
						icon:'none'
					})
				}else{
					console.log("支付")
					uni.request({
						url:'https://layer.boyaokj.cn/api/wechat/payCenter',
						method:'GET',
						data:{
							user_id:42,
							source_id:that.id
						},
						success(res) {
							console.log(res)
						}
					})
				}
				
			}
		}
	}
</script>

<style>
	.itemlist{
		width: 710rpx;
		margin: auto;
	}
	.listitem{
		display: flex;
		height: 147rpx;
		justify-content: space-between;
		padding-top: 54rpx;
		box-sizing: border-box;
	}
	/* .listitem view:nth-child(1){
		margin: auto;
	} */
	.listitem view:nth-child(1){
		color: #FF4D4F;
		font-size: 36rpx;
	}
	.wxpay{
		display: flex;
	}
	.wxpay image{
		width: 84rpx;
		height: 84rpx;
	}
	.wxpay view{
		margin: 24rpx 0 0 13rpx;
	}
	.fix{
		width: 40rpx;
		height: 40rpx;
		/* padding-top: 24rpx; */
		margin-top: 24rpx;
		box-sizing: border-box;
	}
	.paylist{
		display: flex;
		justify-content: space-between;
	}
	.nowpay button{
		width: 680rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 39rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-size: 24rpx;
		text-align: center;
		display: block;
		line-height: 70rpx;
		color: #fff;
		margin-top: 154rpx;
	}
</style>
