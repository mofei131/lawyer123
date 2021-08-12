<template>
	<view class="about">
		<!-- <view v-html="content"></view> -->
		<rich-text  v-html = 'content'></rich-text>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content: ''
			}
		},
		onLoad() {
			let that = this
			uni.request({
				url:'https://layer.boyaokj.cn/api/index/setting',
				method:'GET',
				data:{
					key:'fuwu'
				},
				success(res) {
					// console.log(res.data.data.data)
					that.content = res.data.data.data
				}
			})
		},
	}
</script>

<style>
	page{
		background: #F4F7F7;
	}
	.about{
		width: 720rpx;
		margin: auto;
		border-radius: 10rpx;
		background: #fff;
		padding: 20rpx;
	}
</style>
