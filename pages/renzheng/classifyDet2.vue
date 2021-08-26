<template>
	<view>
		<view class="modtitle">
			<view class="blue"></view>
			<view>第二步:资质认证</view>
		</view>
		<view class="collect">
			<view class="intitem">
				<view class="tips">执业证号：</view>
				<input class="gather" type="digit" value="" placeholder="请输入号码" v-model="zhenghao" placeholder-style="color: #C1C2C3;"/>
			</view>
		<view class="boder"></view>
			<view class="intitem">
				<view class="tips">执业年限：</view>
				<picker class="gather" @change="anjianChange" :value="index1" :range="array1" range-key="name">
					<view class="flex-row">
						<text>{{array1[index1].name}}</text>
						<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
					</view>
				</picker>
			</view>
		<view class="boder"></view>
			<view class="intitem">
				<view class="tips">律师级别：</view>
				<picker class="gather" @change="anjianChange2" :value="index2" :range="array2" range-key="name">
					<view class="flex-row">
						<text>{{array2[index2].name}}</text>
						<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
					</view>
				</picker>
			</view>
			<view class="boder"></view>
				<view class="intitem">
					<view class="tips">认证分类：</view>
					<view class="danxuan">
						<view class="danxuanleft" @tap="dian1()">
							<view>律所律师认证：</view>
							<image :src="dian?icon1:icon2" ></image>
						</view>
						<view class="danxuanright" @tap="dian2()">
							<view>司法从业者认证：</view>
							<image :src="!dian?icon1:icon2" ></image>
						</view>
					</view>
				</view>
			<view class="kong"></view>
			<view class="imgitem" v-if="dian">
				<view class="imgtitle">请上传执业证书姓名页</view>
				<image class="classfiyimg" src="../../static/images/classfiyimg2.png" v-if="zhiname == ''" @click="chooseImage(1)"></image>
				<image class="classfiyimg" :src="zhiname" v-else @click="chooseImage(1)"></image>
			</view>
			<view class="imgitem" v-if="dian">
				<view class="imgtitle">请上传执业证书年检页</view>
				<image class="classfiyimg" src="../../static/images/classfiyimg3.png" v-if="zhiyear == ''" @click="chooseImage(2)"></image>
				<image class="classfiyimg" :src="zhiyear" v-else @click="chooseImage(2)"></image>
			</view>
			<view class="imgitem" v-if="!dian">
				<view class="imgtitle">请上传司法从业者证书</view>
				<image class="classfiyimg" src="../../static/images/classfiyimg3.png" v-if="cfcong == ''" @click="chooseImage(3)"></image>
				<image class="classfiyimg" :src="cfcong" v-else @click="chooseImage(3)"></image>
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
				array1: [],
				array2: [],
				index1: 0,
				index2: 0,
				zhiname:'',
				zhiyear:'',
				cfcong:'',
				dian:true,
				icon1:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA0hJREFUWEftmE1sFGUYx3//WSgSPCgqSkzwgAkJ8UQChGLZ7R7gJBJJZwgRU6g3bk1AiT3WIJJw8yYfQUKYaTCAJzhsZykfQRJOhMTEHiQxQOXDgwZau/OYaba6HXe7s13QieG9zvs883v/z8f7ITI+lHE+ngO2G6H/v4KFwF50jFWT8HZOvBQBZvw6D36MxI3Q1W/tqDgnBVcG1rEEtmN8BLwLzI8hDGK+OLGdKtQfwCXE8TE4ecvVRKuwLQMWfPsQsR9404zrjsPpyBh5AX4438OjGGDTEC8/gRWO6IoitkqsBn7G2Bd6OtEKZGrAdYEtXABHMTzgsuCTYU+X0/ys27f1BgeA9Qh/HHZedfU4jW0qwK7TtjRX4TuMdxC7Q1eH0zhPzikE1ofxFeJmJcd7I1t1p5mfpoBV5UYwljkOW0o9utLM6Wzfi0PWGUWcQdweh65mSjYFLAR2CmOL41BsF24avApZQpwJXW2bbUGzAk4VBHyD+LhRWIunbHnksBNjI7Cs+rPbiAtOxNHSNo3WA6iG+2tgx2yF0xCw2kpGMX4KPcWtZMboCSz3Cwya0S/oqAdhMCFx6DUYGHJV+UdO+ha3oLfGYHmjFtQQsBBYL3BERleyWmO4+/CtGZvT5KPEuVfhgyTkVHWLEWBX6OpYPV+NAX0rGSwqe1pbpxr3Y3yaBu6vOeKL0NW+pE3et2uC30NPxdSA8faF8VAOA8M9+rLWMM65irjVKKyNoONw54yVyZzsHrK9FjGIWFxvW6yrYNG3DRGUTXSWXV2t/WkhsEGMz1pSb3qy+Dx0NVBrmw9snYwrDuRLni4m/dYF3ODbLgcOLxCvnHf1cAagb9/D1NY1l3E99LSm1nBTYIvHjQcR9F30dCQVYHdg/ZFxsOwyD8kSgHeB1+dCB9wLPb0xw9ZM+YBJR+wZdnUoFWA+sH7+ZUDEnnJawMyHOPNFkvk2EydqIcuNegow61td5g8L1TBn97g13TDzvvmC95/FgdXgbNlTfMdpOJqeqDN/5I+XlulL07T2sZIdxjGB28610yCYEL3NLkt/H4Ba3PUze3GvXUemnz6Sgicfj+Lvlf/68ajFrGhretM205b3p2D8HLBdETOv4J+xogtHzKYMwwAAAABJRU5ErkJggg==',
				icon2:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAAq9JREFUWEftmDFoFEEUht9bs4HDBNSgQbl0QhALLQ4VbCwsEjlzs3uyiGAKCxOwEARFsEkjCoKQQshZWEQUWbybuRgvB1rYCCLXWKgELA8likZIJHAb95eFBELI3c1eiJnipt1/5n37v5l9b5bJ8MGG81EbcLMZajvYdrCRA9PT07uXl5cHiSgF4AAzd0V6AIvM/JWIKh0dHTPpdHq+VSdb2oP5fD5pWdYYM3sA3hFRCcBHZv6xAriXmQ8T0RlmPgHAD8NwLJvNVuOCxgIEwFNTU7cAXAUwYdv2/WbuRC4HQXCNmUeZeXxoaOg2M0MXVBvQ9/0u27YfE9GuRCJxYWBg4JtukEhXLpf3Ly0tPSWi30EQXPQ8b1FnvhZgpVKxq9XqayKanZubuzIyMhLoLL5ek8vl7N7e3gdE1J9MJk+nUqmm62gBKqUeAugRQpyLk56NXiLaJkqp58z8UwhxudmLNgVUSp0FcHdhYeHY8PDwn2YL6jyfnJzc2d3d/Z6ZbwohXjSa0xDQ9/0dnZ2dHwBcdxxnRie4rkZKOcjM92q12hHP8/7Wm9cQsFgsng/DcNRxnFO6gePopJRvLMuayGQyz1oClFK+tCwrn8lkHsUJrKstFouXALhCiHRswCi9tm3PAzjouu533aBxdIVCYR8zf+nr6+upd6LrprhUKiVrtdorIcShOEHjapVSn4koK4T4tNHcuoBSyqPMfEcIEdXaLRtKqZkwDMdd1y3HAlRKHQdww3Gc7JbREZGUMg/gieu6hViAxjto/B40/hRH+8Ho72AEaHwlMb4WRy4a3c2sfpeM7gcjSOM76gjS6DvJaqqNvtWtrZPG3ovXF/M1fxZOAugnoj0rml/MPEtEb7flz8JWdjfr1256q/ufMLHare0GW43fdnCzmWg7uFkH/wH4Vq45pse57gAAAABJRU5ErkJggg==',
			}
		},
		onLoad(){
			let that = this
			uni.request({
				url:'https://layer.boyaokj.cn/api/layer/level',
				success(res) {
					that.array2 = res.data.data
				}
			})
			uni.request({
				url:'https://layer.boyaokj.cn/api/layer/LayerAge',
				success(res) {
					that.array1 = res.data.data
				}
			})
		},
		methods:{
			dian1(){
				this.dian = !this.dian
			},
			dian2(){
				this.dian = !this.dian
			},
			chooseImage(e) {
				let that = this
							uni.chooseImage({
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
												that.zhiname = JSON.parse(res.data).data.url
											}
										})
									}else if(e == 2){
										uni.uploadFile({
											url:'https://layer.boyaokj.cn/api/file/upload',
											filePath: res.tempFilePaths[0],
											name: 'file',
											success(res) {
												that.zhiyear = JSON.parse(res.data).data.url
											}
										})
									}else if(e == 3){
										uni.uploadFile({
											url:'https://layer.boyaokj.cn/api/file/upload',
											filePath: res.tempFilePaths[0],
											name: 'file',
											success(res) {
												that.cfcong = JSON.parse(res.data).data.url
											}
										})
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
				if (!this.zhenghao) {
					uni.showToast({
						title: '请输入执业证号',
						icon: 'none',
					})
					return
				}
				if (!this.zhiname && this.dian) {
					uni.showToast({
						title: '请上传执业证书姓名页',
						icon: 'none',
					})
					return
				}
				if (!this.cfcong && !this.dian) {
					uni.showToast({
						title: '请上传司法从业者证书',
						icon: 'none',
					})
					return
				}
				uni.setStorage(
				{
					key:'cache2',
					data:{
						zhiyezhenghao:this.zhenghao,
						zhiyenianxian:this.array1[this.index1].id,
						shehuizhiwu:this.array2[this.index2].id,
						zhiyezhengshu_xingming:this.zhiname,
						zheyezhengshu_nianjian:this.zhiyear,
						cifacongyezhezhengshu:this.cfcong,
					}
				}
				)
				uni.navigateTo({
					url:'./classifyDet3'
				})
			}
		}
	}
</script>

<style>
	.danxuan{
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #5D6168;
	}
	.danxuanleft,.danxuanright{
		display: flex;
	}
	.danxuanright{
		margin-left: 70rpx;
	}
	.danxuanleft image,.danxuanright image{
		width: 40rpx;
		height: 40rpx;
	}
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
