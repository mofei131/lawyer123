<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">
		<view class="">
			<uni-nav-bar :fixed="true" :border="false" left-icon="arrowleft" title="合同审核" color="#333333"
				background-color="#FFFFFF" @clickLeft="back">
				<!-- <block slot="right">
					<view class="city">
						<view><text class="uni-nav-bar-text">123</text></view>
						<uni-icons type="arrowdown" color="#333333" size="22" />
					</view>
				</block> -->

			</uni-nav-bar>
		</view>
		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 20rpx;">
			
			<view class="flex-row mx-center sx-center" style="padding: 20rpx;flex: 0 0 160rpx;background-color: #C0DDFF;border-radius: 20rpx;">
				<view class="backImgCenter" style="margin-right: 10rpx;flex: 0 0 116rpx;height: 116rpx;background-image: url('https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngcc45ec5b7b7b444f2fdf3a0bc5827a42e8cb391a2f82af6ce064d4e82315144b');"></view>
				<view class="flex-column mx-evenly sx-stretch" style="flex: 1 1 auto;">
					<view>合同审核</view>
					<view class="ellipsis" style="width: 512rpx;font-size: 26rpx;color: rgba(102,102,102,1);">399元/每千字以内，专业律师帮您奥凯合同的坑</view>
				</view>
				<fa-icon  type="angle-right" color="gray"></fa-icon>
			</view>
			

			
		</view>


	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				

			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			

		}
	}
</script>

<style>
	
</style>
