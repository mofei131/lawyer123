<template>
	<view>
		<view class="dingjia">
			<view class="dingtitle">
				订单号:{{num}}
			</view>
			<view class="star">
				<view class="startitle">服务评价</view>
		<uni-rate value="0" @change="starvalue" margin="15"></uni-rate>
		</view>
		<view class="boder"></view>
		</view>
		<view class="btn" @tap="btn()">发布</view>
	</view>
</template>

<script>
   import uniRate from "@/components/uni-rate/uni-rate.vue"
   export default {
       components: {uniRate},
			 data(){
				 return{
					 num:'',
					 id:'',
					 value:''
				 }
			 },
			 onLoad(p) {
			 	console.log(p)
				this.num = p.code
				this.id = p.id
			 },
			 methods:{
				 starvalue(e){
					 console.log(e.value)
					 this.value = e.value
					 
				 },
				 btn(){
					 let that = this
					 uni.request({
					 	url:'https://layer.boyaokj.cn/api/order/judgeOrder',
					 						method:'GET',
					 						data:{
					 							user_id:43,
					 							service_id:that.id,
					 							star:that.value
					 						},
					 						success() {
												uni.showToast({
													title:'评价成功',
													duration:1000
												})
												setTimeout(function() {
												uni.navigateBack({
												
												},1000);
												},1000)
					 						}
					 })
				 }
			 }
   }
</script>

<style>
	page{
		background: #F9FAFC;
	}
	.dingjia{
		width: 680rpx;
		margin: auto;
	}
	.dingtitle{
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin: 25rpx 0 25rpx 0;
	}
	.startitle{
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 700;
		color: #333333;
		margin-right: 40rpx;
	}
	.boder{
		width: 680rpx;
		height: 2rpx;
		background: #BCBCBC;
	}
	.star{
		display: flex;
		margin-bottom: 30rpx;
	}
	.btn{
		width: 680rpx;
		height: 70rpx;
		background: #059EFF;
		border-radius: 35rpx;
		margin: auto;
		font-size: 28rpx;
		font-family: Helvetica;
		color: #FFFFFF;
		padding-top: 15rpx;
		text-align: center;
		box-sizing: border-box;
		margin-top: 300rpx;
	}
</style>
