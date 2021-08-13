<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">


		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 40rpx;">
			<view v-html="dataSource.content" style=""></view>
			<view class="flex-row mx-evenly sx-center" style="margin-top: 40rpx;">
				<view class="flex-txt-center" style="border-radius: 40rpx;flex:0 0 240rpx;background-color: #4CD964; color: #FFFFFF;" @tap="toIndex">返回首页</view>
				<view class="flex-txt-center" style="border-radius: 40rpx;flex:0 0 240rpx;background-color: #6CA5FF; color: #FFFFFF;" @tap="download">立即下载</view>
				
			</view>
			
		</view>



	</view>
</template>

<script>
	export default {
		async onLoad(p) {
			console.log(p);
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
				this.dataSource = res.data;
			}
		},
		data() {
			return {
				dataSource:{}
			}
		},
		methods: {
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
				console.log(this.dataSource);
				uni.downloadFile({
				    url: this.dataSource.link, //仅为示例，并非真实的资源
				    success: (res) => {
						console.log(res);
				        if (res.statusCode === 200) {
				            uni.showToast({
				            	title:'下载成功'
				            })
				        }
				    }
				});
			}
		}
	}
</script>

<style>

</style>
