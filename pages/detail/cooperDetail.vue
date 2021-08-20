<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">


		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 40rpx;" v-if="buy == 0" @touchmove.stop.prevent="moveHandle">
			<!-- <view v-html="content"></view> -->
			<view class="image">
				<image :src="image" mode="widthFix"></image>
			</view>
			<!-- <u-parse :content="content" @navigate="navigate"></u-parse> -->
			<view class="btn" @tap="toPay()">立即购买</view>
			<!-- <view class="flex-row mx-evenly sx-center" style="margin-top: 40rpx;">
				<view class="flex-txt-center" style="border-radius: 40rpx;flex:0 0 240rpx;background-color: #4CD964; color: #FFFFFF;" @tap="toIndex">返回首页</view>
				<view class="flex-txt-center" style="border-radius: 40rpx;flex:0 0 240rpx;background-color: #6CA5FF; color: #FFFFFF;" @tap="download">立即下载</view>
			</view> -->
			
		</view>
		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 40rpx;" v-if="buy == 1" >
			<!-- <view v-html="content"></view> -->
			<view class="image">
				<image :src="image"></image>
			</view>
			<view class="btn" @tap="download">立即下载</view>
			<!-- <view class="flex-row mx-evenly sx-center" style="margin-top: 40rpx;">
				<view class="flex-txt-center" style="border-radius: 40rpx;flex:0 0 240rpx;background-color: #4CD964; color: #FFFFFF;" @tap="toIndex">返回首页</view>
				<view class="flex-txt-center" style="border-radius: 40rpx;flex:0 0 240rpx;background-color: #6CA5FF; color: #FFFFFF;" @tap="download">立即下载</view>
			</view> -->
			
		</view>


<view class="botbai"></view>
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
			this.link = p.link
			// this.$store.state.link = p.link
			// uni.getStorageSync('link',p.link)
			// console.log(p)
			let res = await this.$myRequest({
				url: 'agreement/detail',
				data: {
					id: p.coopid,
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
			}
		},
		// onShow() {
			
		// }
		data() {
			return {
				content:'',
				buy:'',
				price:'',
				id:'',
				link:'',
				image:''
			}
		},
		methods: {
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
			download(){
				  uni.downloadFile({
				        url:this.link, //文件链接
				        success: function(res) {
				            //statusCode状态为200表示请求成功，tempFIlePath临时路径
				            if (res.statusCode == 200) {
				                console.log("ccc", res.tempFilePath);
				                //保存到本地
				                uni.saveFile({
				                    tempFilePath: res.tempFilePath,
				                    success: function(res) {
				                        //res.savedFilePath文件的保存路径
				                        //保存成功并打开文件
				                        uni.openDocument({
				                            filePath: res.savedFilePath,
				                            success: (res) => console.log('成功打开文档')
				                        })
				                        console.log("bbb", res);
				                    },
				                    fail() {
				                        console.log('打开失败')
				                    }
				                })
				            }
				            console.log("aaa", res);
				        },
				        fail() {
				            console.log('下载失败')
				        }
				    })
			},
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
