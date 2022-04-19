<template>
	<view>
		<view class="contractdet">
			<view  v-html="content"></view>
			<!-- <image :src="image" mode="widthFix"></image> -->
		</view>
		<!-- <view class="btn" @tap="download">立即下载</view> -->
		<view class="btn" @tap="copy()">复制下载链接</view>
		<view class="tanbox" v-if="show">
					<view class="baibox">
					<view class="top">
						<view>合同下载链接已复制到粘贴板</view>
						<view>您可以直接复制到浏览器下载合同或发给朋友</view>
					</view>
					<view class="bottom">
						<view @tap="zai()">确定</view>
					</view>
				</view>
				</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content:'',
				content:'',
				buy:'',
				price:'',
				id:'',
				link:'',
				image:'',
				show:''
			}
		},
		onLoad(p){
			let that = this
			that.link = this.$store.state.link
			uni.request({
				url:'https://layer.boyaokj.cn/api/agreement/detail',
				method:'GET',
				data:{
					id:p.id,
					user_id:uni.getStorageSync('userInfo').user_id
				},
				success(res) {
					console.log(res.data.data)
					that.content = res.data.data.content
					that.link = res.data.data.link
					// that.image = res.data.data.image
				}
			})
		},
		methods:{
			zai(){
				uni.switchTab({
					url: '../index/index'
				})
			},
			copy(){
				let that = this
				uni.setClipboardData({
					data:this.link,
					success() {
						uni.hideToast()
						that.show = true
						// uni.showModal({
						// 		title: '合同下载链接已复制到粘贴板',
						// 		content: '您可以直接复制到浏览器下载合同或发给朋友',
						// 		showCancel:false,
						// 		success: function (res) {
						// 						if (res.confirm) {
						// 						}
						// 				}
						// 	})
					}
				})
			},
			// download(){
			// 	console.log(this.$store.state.link)
			// 	  uni.downloadFile({
			// 	        url:this.link, //文件链接
			// 	        success: function(res) {
			// 	            //statusCode状态为200表示请求成功，tempFIlePath临时路径
			// 	            if (res.statusCode == 200) {
			// 	                console.log("ccc", res.tempFilePath);
			// 	                //保存到本地
			// 	                uni.saveFile({
			// 	                    tempFilePath: res.tempFilePath,
			// 	                    success: function(res) {
			// 	                        //res.savedFilePath文件的保存路径
			// 	                        //保存成功并打开文件
			// 	                        uni.openDocument({
			// 	                            filePath: res.savedFilePath,
			// 	                            success: (res) => console.log('成功打开文档')
			// 	                        })
			// 	                        console.log("bbb", res);
			// 	                    },
			// 	                    fail() {
			// 	                        console.log('打开失败')
			// 	                    }
			// 	                })
			// 	            }
			// 	            console.log("aaa", res);
			// 	        },
			// 	        fail() {
			// 	            console.log('下载失败')
			// 	        }
			// 	    })
			// },
		}
	}
</script>

<style>
	.bottom view{
		width: 100%;
		font-size: 32rpx!important;
		color: 	#4682B4;
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
	}
	.baibox{
		width: 660rpx;
		height: 350rpx;
		margin: auto;
		margin-top: 60%!important;
		background-color: #fff;
		border-radius: 18rpx;
		z-index: 100;
	}
	.tanbox{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(0,0,0,.2);
		z-index: 5;
		margin-top: 0!important;
	}
page{
		background: #F4F7F7;
	}
	.contractdet image{
		width: 100%;
	}
	.btn{
		width: 680rpx;
		height: 76rpx;
		border-radius: 40rpx;
		color: #fff;
		background: #40a9ff;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: auto;
		position: fixed;
		bottom: 40rpx;
		margin: 0 auto;
		z-index: 10;
		margin-left: 35rpx;
	}
	.contractdet{
		width: 720rpx;
		margin: auto;
		border-radius: 10rpx;
		background: #fff;
		
		padding: 20rpx;
	}
</style>
