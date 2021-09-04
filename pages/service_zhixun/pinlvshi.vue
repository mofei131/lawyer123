<template>
	<view>
		<view class="box">
			<view class="item">
				<view class="title">真实姓名:</view>
				<input type="text" v-model="name" />
			</view>
			<view class="item">
				<view class="title">手机号码:</view>
				<input type="number" v-model="phone" />
			</view>
			<view class="item">
				<view class="title">所在地:</view>
				<input type="text" v-model="address" />
			</view>
			<view class="item">
				<view class="title">案件类型:</view>
				<picker class="gather" @change="anjianChange" :value="index1" :range="array1" range-key="name">
					<view class="flex-row">
						<text>{{array1[index1].name}}</text>
					</view>
					<image class="right" src="../../static/images/righticon.png"></image>
				</picker>
			</view>
			<view class="item">
				<view class="title">预算律师费:</view>
				<input type="number" v-model="price" placeholder="请输入两千以上的预算"/>
			</view>
			<view class="duoshuru">
				<view class="dstitle">诉求</view>
				<textarea v-model="suqiu" placeholder="请描述诉求详情"></textarea>
			</view>
			<view class="duoshuru">
				<view class="dstitle">案件详情</view>
				<textarea v-model="anjian" placeholder="请描述案件详情"></textarea>
			</view>
		</view>
		<view class="btn" @tap="tijiao()">提交</view>
		<view class="tanbox" v-if="show">
			<view class="baibox">
			<view class="top">
				<view>风险友情提示</view>
				<view>本次付费为案件咨询费，案件委托律师费以实际案件收费为准，请联系客服转账到平台对公账户，因其它交易方式产生的损失及纠纷，平台概不负责。</view>
			</view>
			<view class="bottom">
				<view @tap="zai()">取消</view>
				<view @tap="zai2()">确定</view>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:'',
				phone:'',
				address:'',
				array1: [],
				index1: 0,
				price:'',
				suqiu:'',
				anjian:'',
				mone:'',
				lsdh:'',
				layer_id:'',
				show:false
			}
		},
		onLoad(p) {
			let that = this
			console.log("价钱")
			console.log(p.layer_id)
			that.mone = p.price
			this.layer_id = p.layer_id
			uni.request({
				url:'https://layer.boyaokj.cn/api/layer/getCaseType',
				success(res) {
					that.array1 = res.data.data
					// console.log(res.data.data)
				}
			})
			uni.request({
				url:'https://layer.boyaokj.cn/api/layer/detail',
				method:'GET',
				data:{
					user_id:'',
					layer_id:p.layer_id
				},
				success(res) {
					console.log(res)
					console.log(res.data.data.mobile)
					that.lsdh = res.data.data.mobile
				}
			})
		},
		methods:{
			zai(){
				uni.switchTab({
					url:'../index/index'
				})
			},
			zai2(){
				this.commit()
			},
			anjianChange(e) {
				this.index1 = e.detail.value;
			},
			tijiao(){
				if (!this.name) {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none',
					})
					return
				}
				if (!this.phone) {
					uni.showToast({
						title: '请输入联系方式',
						icon: 'none',
					})
					return
				}
				if (!this.address) {
					uni.showToast({
						title: '请输入所在地区',
						icon: 'none',
					})
					return
				}
				if (!this.price) {
					uni.showToast({
						title: '请输入预算',
						icon: 'none',
					})
					return
				}
				if (this.price < 2000) {
					uni.showToast({
						title: '请输入输入两千以上的预算',
						icon: 'none',
					})
					return
				}
				if (!this.suqiu) {
					uni.showToast({
						title: '请输入诉求',
						icon: 'none',
					})
					return
				}
				if (!this.anjian) {
					uni.showToast({
						title: '请输入案件详情',
						icon: 'none',
					})
					return
				}
				let that = this
				// uni.showModal({
				// 	title: '风险友情提示',
				// 	content: '本次付费为聘请律师的定金费用，律师费差额请转账到山东一二三法律服务集团名下对公账户，否则产生的一切损失由客户自行承担',
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			that.commit()
				// 		}else if (res.cancel) {
    //         uni.switchTab({
    //         	url:'../index/index'
    //         })
				// 	}
				// 	}
				// });
				this.show = true
			},
			commit(){
				let that = this
				console.log("arr")
				console.log(that.array1[that.index1].id)
				uni.request({
					url:'https://layer.boyaokj.cn/api/service/pinqing',
					method:'POST',
					data:{
						layer_id:that.layer_id,
						user_id:uni.getStorageSync('userInfo').user_id,
						title:'标题标题',
						content:'内容内容',
						lng:111,
						lat:1111,
						name:that.name,
						address:that.address,
						mobile:that.phone,
						case_type:1, 
						money:that.price,
						suqiu:that.suqiu,
						detail:that.anjian
					},
					success(res) {
						console.log("随便打",res)
						if(res.data.code == 200){
							// uni.showToast({
							// 	title: '提交成功',
							// 	duration:1000
							// })
							// setTimeout(function() {
							// uni.switchTab({
							// 	url:'../zhaolvshi/zhaolvshi'
							// })
							// },1000)
							uni.hideLoading()
							if (res.data.code == -1) {
								uni.showToast({
									title: res.message,
									icon: 'none'
								})
							} else {
								if (res.data.code == 200) {
									console.log("打电话")
									console.log(res);
									uni.navigateTo({
										url: '../my/pay?id=' + res.data.data.service_id + '&price=' + that.mone + '&typeId=10'+'&phone='+that.lsdh
									})
								} else {
									uni.showToast({
										title: res.message,
										icon: 'none'
									})
								}
							}
						}else{
							uni.showToast({
								title: '提交失败，请联系客服',
								duration:1000,
								icon:'none'
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.bottom view:nth-child(2){
		border-left: 1rpx solid #e8e8e8;
		color: 	#4682B4;
	}
	.bottom view{
		width: 330rpx;
		font-size: 32rpx;
		color: #000000;
		border-top: 1rpx solid #e8e8e8;
		text-align: center;
		align-items: center;
		display: flex;
		justify-content: center;
	}
	.bottom{
		display: flex;
		height: 100rpx;
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
		height: 465rpx;
		margin: auto;
		margin-top: 50%;
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
	}
	page{
		background: #F4F7F7;
	}
	.right{
		width: 14rpx;
		    height: 20rpx;
		    position: absolute;
		    top: 6px;
		    right: 10px;
	}
	.gather{
		width:520rpx;
		margin-left:30rpx;
		color:#5D6168;
		font-size:28rpx;
		position: relative;
	}
	.btn{
		width: 680rpx;
		height: 76rpx;
		background: #40A9FF;
		border-radius: 39rpx;
		margin: auto;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.duoshuru textarea{
		width: 681rpx;
		height: 260rpx;
		background: #F4F4F4;
		border-radius: 8rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		padding: 18rpx 10rpx 18rpx 10rpx;
		box-sizing: border-box;
	}
	.duoshuru{
		width: 680rpx;
		margin: auto;
	}
	.dstitle{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #51565D;
		margin: 33rpx 0 20rpx 0;
	}
	.item input{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #5D6168;
		margin-left: 30rpx;
		width: 520rpx;
	}
	.title{
		width: 168rpx;
		text-align-last: justify;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.box{
		width: 720rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: 25rpx auto;
		box-sizing: border-box;
		padding-bottom: 39rpx;
	}
	.item{
		height: 103rpx;
		width: 680rpx;
		margin: auto;
		border-bottom: 1rpx solid #e8e8e8;
		display: flex;
		align-items: center;
	}
</style>
