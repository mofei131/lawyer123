<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">


		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 40rpx;" v-if="buy1 == 0" @touchmove.stop.prevent="moveHandle">
			<view class="txt" v-html="content"></view>
			<view class="btn" @tap="toPay()">立即购买</view>
		</view>
		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 40rpx;" v-if="buy1 == 1" >
			<view v-html="content"></view>
			<view class="btn" @tap="copy()">复制下载链接</view>
		</view>


<view class="botbai"></view>
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
	// import uParse from "@/components/feng-parse/parse.vue"
	export default {
	        // components:{
	        //     uParse
	        // },
		async onLoad(p) {
			console.log(p);
			this.buy = p.buy
			this.id = p.coopid
			this.price = p.price
			
		},
		async onShow() {
			let res = await this.$myRequest({
				url: 'agreement/detail',
				data: {
					id: this.id,
					user_id: this.$store.state.userInfo.user_id
				}
			});
			if (res && res.code == -1) {
				uni.showToast({
					title: res.message,
					icon: 'none'
				})
				return;
			}else{
				console.log(res.data)
				this.content = res.data.content;
				this.image = res.data.image
				this.buy1 = res.data.buy
				this.link = res.data.link
			}
		},
		data() {
			return {
				content:'',
				buy1:'',
				price:'',
				id:'',
				link:'',
				image:'',
				buy:'',
				show:false
			}
		},
		methods: {
			zai(){
				uni.switchTab({
					url: '../index/index'
				})
			},
			moveHandle() {},
			toIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			toDetail() {
				uni.navigateTo({
					url: "../detail/cooperDetail?id=1"
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
			// 	  uni.downloadFile({
			// 	        url:this.link, //文件链接
			// 	        success: function(res) {
			// 	            //statusCode状态为200表示请求成功，tempFIlePath临时路径
			// 	            if (res.statusCode == 200) {
			// 	                console.log("ccc", res.tempFilePath);
			// 	                //保存到本地
			// 									// uni.showModal({
			// 									// 	title: '已保存到',
			// 									// 	content: res.tempFilePath,
			// 									// 	success: function (res) {
			// 									// 	        if (res.confirm) {
													          
			// 									// 	        } else if (res.cancel) {
			// 									// 	            console.log('用户点击取消');
			// 									// 	        }
			// 									// 	    }
			// 									// })
			// 	                uni.saveFile({
			// 	                    tempFilePath: res.tempFilePath,
			// 	                    success: function(res) {
			// 	                        // res.savedFilePath文件的保存路径
			// 	                        // 保存成功并打开文件
			// 	                				uni.openDocument({
			// 	                				    filePath: res.savedFilePath,
			// 	                				    success: (res) => console.log('成功打开文档')
			// 	                				})
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
			async toPay() {
				// console.log(item);
				//跳转到支付页面；支付成功，请求
				let res = await this.$myRequest({
					url: 'service/agreement',
					methods: 'GET',
					data: {
						user_id: this.$store.state.userInfo.user_id,
						agreement_id: this.id
					}
				});
				if (res.code == 200) {
					// console.log(res);
			
					uni.navigateTo({
						url: '../my/pay?id=' + res.data.service_id + '&price=' + this.price + '&typeId=11'+"&emitName=goCoodetail"
					})
					uni.$on('goCoodetail', res => {
						uni.navigateTo({
							url: '/pages/detail/cooperDetail?coopid=' + this.id
						})
					});
			
			
				} else {
					uni.showToast({
						title: res.message,
						icon: 'none'
					})
				}
			}
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
	.image image{
		width: 100%;
	}
	.botbai{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 160rpx;
		background: #fff;
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
	}
</style>
