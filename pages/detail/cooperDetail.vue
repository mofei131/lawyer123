<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">
		<view class="">
			<uni-nav-bar :fixed="true" :border="false" left-icon="arrowleft" title="合同详情" color="#333333"
				background-color="#FFFFFF" @clickLeft="back">
				<!-- <block slot="right">
					<view class="city">
						<view><text class="uni-nav-bar-text">123</text></view>
						<uni-icons type="arrowdown" color="#333333" size="22" />
					</view>
				</block> -->

			</uni-nav-bar>
		</view>

		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 40rpx;">
			<view v-html="dataSource.content" style=""></view>
			<view class="flex-txt-center" style="margin-top: 40rpx;border-radius: 40rpx;flex:0 0 80rpx;background-color: #6CA5FF; color: #FFFFFF;" @click="download">立即下载</view>
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
