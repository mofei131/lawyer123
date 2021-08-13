<template>
	<view>
		<view class="modtitle">
			<view class="blue"></view>
			<view>第一步:个人资料</view>
		</view>
		<view class="collect">
			<view class="intitem">
				<view class="tips">姓名：</view>
				<input class="gather" type="text" value="" placeholder="请输入姓名" v-model="name" placeholder-style="color: #C1C2C3;"/>
			</view>
		<view class="boder"></view>
			<view class="intitem">
				<view class="tips">联系电话：</view>
				<input class="gather" type="number" value="" placeholder="请输入手机号" v-model="phone" placeholder-style="color: #C1C2C3;"/>
			</view>
		<view class="boder"></view>
			<view class="intitem">
				<view class="tips">性别：</view>
				<picker class="gather" @change="anjianChange" :value="index1" :range="array1" range-key="sex">
					<view class="flex-row">
						<text>{{array1[index1].sex}}</text>
					</view>
				</picker>
			</view>
			<view class="kong"></view>
			<view class="imgitem">
				<view class="imgtitle">请上传自拍或两寸照片</view>
				<image class="classfiyimg" src="../../static/images/classfiyimg1.png" v-if="zipai == ''" @click="chooseImage(1)"></image>
				<image class="classfiyimg" :src="zipai" v-else @click="chooseImage(1)"></image>
			</view>
			<view class="imgitem">
				<view class="imgtitle">请上传身份证人像面</view>
				<image class="classfiyimg" src="../../static/images/classfiyimg2.png" v-if="zheng == ''" @click="chooseImage(2)"></image>
				<image class="classfiyimg" :src="zheng" v-else @click="chooseImage(2)"></image>
			</view>
			<view class="imgitem">
				<view class="imgtitle">请上传身份证国徽面</view>
				<image class="classfiyimg" src="../../static/images/classfiyimg3.png" v-if="fan == ''" @click="chooseImage(3)"></image>
				<image class="classfiyimg" :src="fan" v-else @click="chooseImage(3)"></image>
			</view>
	</view>
	<view class="next" @tap="toUrl()">下一步</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:'',
				phone:'',
				array1: [{
					sex: '女',
				}, {
					sex: '男',
				}],
				index1: 1,
				zipai:'',
				zheng:'',
				fan:'',
			}
		},
		methods:{
			chooseImage(e) {
				let that = this
							let file = uni.chooseImage({
								count: 1, //默认9
								sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['album','camera'], //从相册选择、摄像头
								success: function(res) {
									if(e == 1){
										uni.uploadFile({
											url:'https://layer.boyaokj.cn/api/file/upload',
											filePath: res.tempFilePaths[0],
											name: 'file',
											success(res) {
												that.zipai = JSON.parse(res.data).data.url
											}
										})
									}else if(e == 2){
										uni.uploadFile({
											url:'https://layer.boyaokj.cn/api/file/upload',
											filePath: res.tempFilePaths[0],
											name: 'file',
											success(res) {
												that.zheng = JSON.parse(res.data).data.url
											}
										})
									}else{
										uni.uploadFile({
											url:'https://layer.boyaokj.cn/api/file/upload',
											filePath: res.tempFilePaths[0],
											name: 'file',
											success(res) {
												that.fan = JSON.parse(res.data).data.url
											}
										})
									}
								},
							});
						},
			anjianChange(e) {
				this.index1 = e.detail.value;
			},
			toUrl(){
				if (!this.name) {
					uni.showToast({
						title: '请输入您的姓名',
						icon: 'none',
					})
					return
				}
				if (!this.phone) {
					uni.showToast({
						title: '请输入您的手机号',
						icon: 'none',
					})
					return
				}
				if (!this.zipai) {
					uni.showToast({
						title: '请上传头像照片',
						icon: 'none',
					})
					return
				}
				if (!this.zheng) {
					uni.showToast({
						title: '请上传身份证正面照片',
						icon: 'none',
					})
					return
				}
				if (!this.fan) {
					uni.showToast({
						title: '请上传身份证反面照片',
						icon: 'none',
					})
					return
				}
				uni.setStorage(
				{
					key:'cache1',
					data:{
						name:this.name,
						mobile:this.phone,
						gender:this.index1,
						photo:this.zipai,
						idcard:this.zheng,
						idcard_fan:this.fan
					}
				}
				)
				uni.navigateTo({
					url:'./classifyDet2'
				})
			}
		}
	}
</script>

<style>
	page{
		background: #F4F7F7;
	}
	.modtitle{
		width: 680rpx;
		margin: 20rpx auto;
		display: flex;
	}
	.blue{
		width: 6rpx;
		height: 28rpx;
		background: #40a9ff;
		margin-top: 6rpx;
	}
	.modtitle view{
		font-size: 28rpx;
		font-family: Helvetica;
		color: #51565D;
		margin-left: 9rpx;
	}
	.collect{
		width: 720rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
	}
	.intitem{
		display: flex;
		height: 108rpx;
		width: 680rpx;
		margin: auto;
		padding-top: 35rpx;
		box-sizing: border-box;
	}
	.tips{
		width: 170rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.gather{
		width: 510rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #5D6168;
	}
	.boder{
		height: 1rpx;
		width: 680rpx;
		margin: auto;
		background: #E8E8E8;
	}
	.intitem picker{
		width: ;
	}
	.kong{
		width: 680rpx;
		height: 12rpx;
		background: #FAFAFA;
		margin: auto;
	}
	.imgtitle{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		width: 680rpx;
		margin: auto;
		margin-top: 30rpx;
		margin-bottom: 10rpx;
	}
	.classfiyimg{
		width: 680rpx;
		margin: auto;
		display: block;
	}
	.next{
		width: 680rpx;
		height: 76rpx;
		background: #40A9FF;
		border-radius: 39rpx;
		font-size: 28rpx;
		font-family: Helvetica;
		color: #FFFFFF;
		margin: 53rpx auto;
		text-align: center;
		padding-top: 20rpx;
		box-sizing: border-box;
	}
</style>
