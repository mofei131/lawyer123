<template>
	<view>
	<view class="inputbox">
		<view class="intlist">
			<view class="inlleft">姓名：</view>
			<view class="inlright">
				<input type="text" placeholder="请输入姓名" v-model="name" placeholder-style="color: #C1C2C3;" />
			</view>
		</view>
		<view class="hui"></view>
		<view class="intlist">
			<view class="inlleft">联系电话：</view>
			<view class="inlright">
				<input type="text" placeholder="请输入手机号" v-model="mobile" placeholder-style="color: #C1C2C3;" />
			</view>
		</view>
	</view>
	<view class="btn" @click="pay()">立即支付</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name2:'',
				mobile:'',
				id:0,
				name:'',
				price:''
			}
		},
		onLoad(p) {
			this.id = p.id
			this.name2 = p.name
			this.price = p.price
		},
		methods:{
			pay(){
				if(!this.name){
					uni.showToast({
						title:'请输入姓名',
						icon:'none'
					})
					return
				}
				if(!this.mobile){
					uni.showToast({
						title:'请输入手机号',
						icon:'none'
					})
					return
				}
				let that = this
				uni.request({
					url:'https://layer.boyaokj.cn/api/service/act',
					method:'GET',
					data:{
						user_id:uni.getStorageSync('userInfo').id,
						act_id:this.id,
						name:this.name,
						mobile:this.mobile
					},
					success(res) {
						if(res.data.code == 200){
							uni.navigateTo({
								url:'../my/pay?id='+res.data.data.service_id+'&price='+that.price+'&name='+that.name2
							})
						}else if(res.data.code == -1){
							uni.showToast({
								title:res.message,
								icon:'none'
							})
						}
					console.log(res)
					}
				})
			}
		}
	}
</script>

<style>
	.btn{
		width: 686rpx;
		height: 71rpx;
		background: #049EFF;
		border-radius: 35rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
	}
	.inlright input{
		width: 500rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		margin-left: 30rpx;
	}
	.inputbox{
		width: 720rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
		margin-bottom: 28rpx;
	}
	.inlleft{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		width: 140rpx;
	}
	.intlist{
		display: flex;
		align-items: center;
		padding: 35rpx 0 33rpx 20rpx;
		box-sizing: border-box;
	}
	.hui{
		width: 680rpx;
		height: 1rpx;
		margin: auto;
		background-color: #E8E8E8;
	}
	page{
		background: #F4F7F7;
		padding-top: 21rpx;
	}
</style>
