<template>
	<view>
		<view class="modtitle">
			<view class="blue"></view>
			<view>第二步:资质认证</view>
		</view>
		<view class="collect">
			<view class="intitem">
				<view class="tips">执业证号：</view>
				<input class="gather" type="number" value="" placeholder="请输入号码" v-model="zhenghao" placeholder-style="color: #C1C2C3;"/>
			</view>
		<view class="boder"></view>
			<view class="intitem">
				<view class="tips">执业年限：</view>
				<picker class="gather" @change="anjianChange" :value="index1" :range="array1" range-key="years">
					<view class="flex-row">
						<text>{{array1[index1].years}}</text>
						<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
					</view>
				</picker>
			</view>
		<view class="boder"></view>
			<view class="intitem">
				<view class="tips">律师级别：</view>
				<picker class="gather" @change="anjianChange2" :value="index2" :range="array2" range-key="level">
					<view class="flex-row">
						<text>{{array2[index2].level}}</text>
						<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
					</view>
				</picker>
			</view>
			<view class="kong"></view>
			<view class="imgitem">
				<view class="imgtitle">请上传执业证书姓名页</view>
				<image class="classfiyimg" src="../../static/images/classfiyimg2.png" v-if="zhiname == ''" @click="chooseImage(1)"></image>
				<image class="classfiyimg" :src="zhiname" v-else @click="chooseImage(1)"></image>
			</view>
			<view class="imgitem">
				<view class="imgtitle">请上传执业证书年检页</view>
				<image class="classfiyimg" src="../../static/images/classfiyimg3.png" v-if="zhiyear == ''" @click="chooseImage(2)"></image>
				<image class="classfiyimg" :src="zhiyear" v-else @click="chooseImage(2)"></image>
			</view>
	</view>
	<view class="next" @tap="toUrl()">下一步</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				zhenghao:'',
				phone:'',
				array1: [{
					years: '1~3',
				}, {
					years: '3~6',
				}],
				array2: [{
					level: '高级律师',
				}, {
					level: '专家级律师',
				}],
				index1: 0,
				index2: 0,
				zhiname:'',
				zhiyear:'',
			}
		},
		methods:{
			chooseImage(e) {
				let that = this
							uni.chooseImage({
								count: 1, //默认9
								sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['album','camera'], //从相册选择、摄像头
								success: function(res) {
									if(e == 1){
										that.zipai = res.tempFilePaths[0]
									}else if(e == 2){
										that.zheng = res.tempFilePaths[0]
									}
								},
							});
						},
			anjianChange(e) {
				this.index1 = e.detail.value;
			},
			anjianChange2(e) {
				this.index2 = e.detail.value;
			},
			toUrl(){
				uni.navigateTo({
					url:'./classifyDet3'
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
	fa-icon{
		margin-right: 20rpx;
	}
	.flex-row{
		display: flex;
		justify-content: space-between;
	}
</style>
