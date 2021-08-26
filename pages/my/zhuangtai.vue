<template>
	<view>
		<view class="item">
			<view class="left">
			<view class="lv"></view>
			<view class="title">在线</view>
			</view>
			<view class="right">
			<image @tap="agreementSuccess1" class="fix"
				:src="agreement1==true?'../../static/icon/ty1.png':'../../static/icon/ty0.png'"></image>
			</view>
		</view>
		<view class="item">
			<view class="left">
			<view class="huang"></view>
			<view class="title">繁忙</view>
			</view>
			<view class="right">
			<image @tap="agreementSuccess2" class="fix"
				:src="agreement2==true?'../../static/icon/ty1.png':'../../static/icon/ty0.png'"></image>
			</view>
		</view>
		<view class="item">
			<view class="left">
			<view class="hong"></view>
			<view class="title">开庭</view>
			</view>
			<view class="right">
			<image @tap="agreementSuccess3" class="fix"
				:src="agreement3==true?'../../static/icon/ty1.png':'../../static/icon/ty0.png'"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				agreement1:false,
				agreement2:false,
				agreement3:false,
			}
		},
		onShow() {
			// console.log(uni.getStorageSync('userInfo'))
			// console.log("打印")
			// console.log(uni.getStorageSync('userInfo').layer)
			// console.log("打印2")
			// console.log(uni.getStorageSync('userInfo').layer.id)
			let that = this
			uni.request({
				url:'https://layer.boyaokj.cn/api/layer/detail',
				method:'GET',
				data:{
					user_id:uni.getStorageSync('userInfo').user_id,
					layer_id:uni.getStorageSync('userInfo').layer.id
				},
				success(res) {
					console.log(res.data.data)
					if(res.data.data.busy == 1){
						that.agreement1 = true;
					}else if(res.data.data.busy == 2){
						that.agreement2 = true;
					}else if(res.data.data.busy == 3){
						that.agreement3 = true;
					}
				}
			})
			
		},
		methods:{
			agreementSuccess1() {
				this.agreement1 = true;
				this.agreement2 = false;
				this.agreement3 = false;
				uni.request({
					url:'https://layer.boyaokj.cn/api/layer/setBusy',
					method:'GET',
					data:{
						user_id:uni.getStorageSync('userInfo').user_id,
						busy:1
					}
				})
			},
			agreementSuccess2() {
				this.agreement2 = true;
				this.agreement1 = false;
				this.agreement3 = false;
				uni.request({
					url:'https://layer.boyaokj.cn/api/layer/setBusy',
					method:'GET',
					data:{
						user_id:uni.getStorageSync('userInfo').user_id,
						busy:2
					}
				})
			},
			agreementSuccess3() {
				this.agreement3 = true;
				this.agreement2 = false;
				this.agreement1 = false;
				uni.request({
					url:'https://layer.boyaokj.cn/api/layer/setBusy',
					method:'GET',
					data:{
						user_id:uni.getStorageSync('userInfo').user_id,
						busy:3
					}
				})
			},
		}
	}
</script>

<style>
	.left{
		display: flex;
		align-items: center;
	}
	.hong{
		width: 18rpx;
		height: 18rpx;
		background: #FF4D4F;
		border-radius: 18rpx;
		margin-right: 16rpx;
	}
	.huang{
		width: 18rpx;
		height: 18rpx;
		background: #E1B12F;
		border-radius: 18rpx;
		margin-right: 16rpx;
	}
	.lv{
		width: 18rpx;
		height: 18rpx;
		background: #26CD93;
		border-radius: 18rpx;
		margin-right: 16rpx;
	}
	.right image{
		width: 40rpx;
		height: 40rpx;
	}
	.item{
		width: 720rpx;
		height: 96rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		display: flex;
		align-items: center;
		margin: auto;
		justify-content: space-between;
		padding: 0 20rpx 0 20rpx;
		box-sizing: border-box;
		margin-top: 16rpx;
	}
	page{
		background: #F4F7F7;
	}
</style>
