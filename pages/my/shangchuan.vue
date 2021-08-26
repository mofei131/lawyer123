<template>
	<view>
		<view class="dd">订单编号:{{dd}}</view>
		<view class="box">
			<textarea maxlength="200" class="duoh" type="text" placeholder="请填写商品评价" placeholder-style="color: #676767;" v-model="pingjia"></textarea>
			<view class="xianzhi">{{pingjia.length}}/200</view>
			<view class="upload">
				<view class="yshangc" v-for="(item,index) in imgpth" :key="index">
					<image class="yjshang" :src="item"></image>
					<image class="close" src="../../static/icon/scclose.png" @tap="close(index)"></image>
				</view>
				<view class="dianji" @tap="upload()" v-if="imgpth.length != 4">
					<image src="../../static/icon/scimages.png"></image>
					<view class="zhangshu">{{imgpth.length}}/4</view>
				</view>
			</view>
		</view>
		<view class="btn" @tap="chuan()">确认上传</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				dd:'',
				pingjia:'',
				imgpth:[
					// 'http://dangjian.people.com.cn/NMediaFile/2021/0714/MAIN202107141600240723883355443.jpg',
					// 'http://dangjian.people.com.cn/NMediaFile/2021/0714/MAIN202107141600240723883355443.jpg',
					// 'http://dangjian.people.com.cn/NMediaFile/2021/0714/MAIN202107141600240723883355443.jpg',
				],
				upimage:[],
				id:''
			}
		},
		onLoad(p) {
			console.log(p)
			let that = this
			that.dd = p.dd
			that.id = p.id
		},
		methods:{
			upload(){
				let that = this
							let file = uni.chooseImage({
								count: 4, //默认9
								sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['album','camera'], //从相册选择、摄像头
								success: function(res) {
									that.imgpth = res.tempFilePaths
									console.log(res.tempFilePaths)
									// if(e == 1){
									// 	uni.uploadFile({
									// 		url:'https://layer.boyaokj.cn/api/file/upload',
									// 		filePath: res.tempFilePaths,
									// 		name: 'file',
									// 		success(res) {
									// 			that.imgpth = JSON.parse(res.data).data
									// 		}
									// 	})
									// }
								},
							});
						},
			close(index){
				this.imgpth.splice(index,1);
			},
			chuan(){
				if (!this.pingjia ) {
					uni.showToast({
						title: '请输入评价',
						icon: 'none',
					})
					return
				}
				let that = this
				let an = []
				for(let i in that.imgpth){
					uni.uploadFile({
						url:'https://layer.boyaokj.cn/api/file/upload',
						filePath: that.imgpth[i],
						name: 'file',
						success(res) {
							an.push(JSON.parse(res.data).data.url)
							that.upimage = an
							if(an.length == that.imgpth.length){
								console.log(JSON.stringify(an))
								uni.request({
									url:'https://layer.boyaokj.cn/api/service/layerUpload',
									method:'GET',
									data:{
										source_id:that.id,
										text:that.pingjia,
										images:JSON.stringify(an)
									},
									success(res) {
										uni.showToast({
											title: '提交成功',
											duration:1000
										})
										setTimeout(function() {
										uni.navigateTo({
											url:'./slanjian'
										})
										},1000)
									}
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style>
	.xianzhi{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #676767;
		margin-left: 27rpx;
	}
	.yshangc{
		position: relative;
	}
	.close{
		position: absolute;
		width: 34rpx;
		height: 34rpx;
		top: 0;
		right: 0;
	}
	.yjshang{
		width: 161rpx;
		height: 161rpx;
		border-radius: 8rpx;
	}
	.upload{
		display: flex;
		justify-content: space-between;
		width: 654rpx;
		margin: auto;
		padding-top: 20rpx;
	}
	.duoh{
		height: 160rpx;
		width: 650rpx;
		margin: auto;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #676767;
		padding-top: 8rpx;
		box-sizing: border-box;
	}
	.zhangshu{
		position: absolute;
		font-size: 20rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #979797;
		top: 105rpx;
		left: 68rpx;
	}
	.dianji{
		position: relative;
	}
	.dianji image{
		width: 161rpx;
		height: 161rpx;
	}
	.dd{
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin: 24rpx 0 0 32rpx;
	}
	.box{
		width: 710rpx;
		height: 395rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		border: 1px solid #C9C9C9;
		margin: 24rpx auto;
		
	}
	.btn{
		width: 686rpx;
		height: 76rpx;
		background: #30AEFF;
		border-radius: 35rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: auto;
		margin-top: 150rpx;
	}
</style>
