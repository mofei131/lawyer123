<template>
	<view class="page">
		<view class="section1">

			<view class="txt2">{{dataSource.title}}</view>
			<text lines="1" decode="true" class="word3">{{dataSource.create_time}}</text>
			<!-- <image :src="dataSource.image|| '/static/icon/study_detail_icon.png'" class="img1"></image> -->

			<view class="paragraph1">
				<rich-text :nodes="zhuanhua"></rich-text>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		async onLoad(p) {
			console.log('文章详情获得id:' + p.id);
			let res = await this.$myRequest({
				url: 'article/detail',
				methods: 'GET',
				data: {
					id: p.id,
					user_id: this.$store.state.userInfo.user_id
				}
			});
			if (res && res.code == -1) {
				uni.showToast({
					title: res.message,
					icon: 'none'
				})
				return;
			} else {
				console.log(res.data);
				this.dataSource = res.data;
				this.zhuanhua = this.formatRichText(this.dataSource.content)
			}

		},
		data() {
			return {
				dataSource: {},
				zhuanhua:''
			}
		},
		methods: {
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
	img{
		width: 100%;
		
	}
	.page {
		z-index: 1;
		position: relative;
		width: 750rpx;
		height: 1623rpx;
		background-color: rgba(255, 255, 255, 1);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.section1 {
		z-index: auto;
		width: 750rpx;
		height: 1623rpx;
		display: flex;
		flex-direction: column;
	}

	.txt2 {
		color: rgba(81, 86, 93, 1);
		font-size: 42rpx;
		font-family: Helvetica;
		margin: 40rpx 35rpx 0 35rpx;
	}

	.word3 {
		z-index: 7;
		width: 249rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(158, 163, 167, 1);
		font-size: 24rpx;
		font-family: PingFangSC-Regular;
		white-space: nowrap;
		line-height: 33rpx;
		text-align: left;
		align-self: flex-start;
		margin: 20rpx 0 0 35rpx;
	}

	.img1 {
		z-index: 8;
		width: 680rpx;
		height: 138rpx;
		align-self: center;
		margin-top: 20rpx;
	}

	.paragraph1 {
		z-index: 9;
		width: 680rpx;
		height: 900rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(81, 86, 93, 1);
		font-size: 30rpx;
		font-family: PingFangSC-Regular;
		line-height: 50rpx;
		text-align: left;
		align-self: center;
		margin-top: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.img2 {
		z-index: 2;
		width: 750rpx;
		height: 151rpx;
		margin-top: 54rpx;
	}
</style>
