<template>
	<view style="overflow: hidden;">
	<view class="about">
		<!-- <view v-html="content"></view> -->
		<view class="title">{{title}}</view>
		<rich-text  v-html = 'content'></rich-text>
	</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				title:'',
				content: ''
			}
		},
		onLoad(p) {
			let that = this
			uni.request({
				url:'https://layer.boyaokj.cn/api/index/bannerDetail',
				data:{
					id:p.id
				},
				success(res) {
					that.title = res.data.data.name
					that.content = that.formatRichText(res.data.data.content)
				}
			})
		},
		methods:{
			formatRichText(html) {
					let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
						match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
						match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
						match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
						return match;
					});
					newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
						match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
						return match;
					});
					newContent = newContent.replace(/<br[^>]*\/>/gi, '');
					newContent = newContent.replace(/\<img/gi,
						'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
					return newContent;
				}
		}
	}
</script>

<style>
	page{
		background: #F4F7F7;
	}
	.about{
		width: 640rpx;
		margin: auto;
		border-radius: 10rpx;
		background: #fff;
		padding: 18rpx;
		height: 100%;
	}
	.title{
		width: 640rpx;
		margin: auto;
		font-size: 48rpx;
		font-weight: bold;
		margin-bottom: 28rpx;
	}
</style>
