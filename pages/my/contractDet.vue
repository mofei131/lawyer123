<template>
	<view>
		<view class="contractdet">
			<!-- <view  v-html="content"></view> -->
			<image :src="image" mode="widthFix"></image>
		</view>
		<view class="btn" @tap="download">立即下载</view>
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
				image:''
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
					// that.content = res.data.data.content
					that.link = res.data.data.link
					that.image = res.data.data.image
				}
			})
		},
		methods:{
			download(){
				console.log(this.$store.state.link)
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
		}
	}
</script>

<style>
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
