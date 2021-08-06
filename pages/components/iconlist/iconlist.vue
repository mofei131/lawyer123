<template>
	<view class="iconlist">
		<view class="childtitle">
			<view class="blue"></view>
			<view>{{item.title}}</view>
		</view>
		<view class="zixun">
			<view v-for="(item,index) in item.zixun" class="zixunitem" @click="toPage(item)">
				<image :src='item.url' class="zixunitemimage"></image>
				<view class="zixunitemview">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["item"],
		methods: {
			toPage(item) {
				if (!item) return;
				let url = "";
				switch (item.id) {
					case 0:
						url = "";
						break;
					case 1:
						url = "";
						break;
					case 2:
						url = "";
						break;
					case 3:
						url = "";
						break;
					case 4:
						url = "../single_service/cooperDownload";
						break;
					case 5:
						url = "../single_service/cooperCheck";
						break;
					case 6:
						url = "";
						break;
					case 7:
						url = "";
						break;
				}
				if (!url) return;
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	.childtitle {
		display: flex;
		width: 690rpx;
		margin: auto;
		margin-top: 12rpx;
	}

	.blue {
		width: 6rpx;
		height: auto;
		background: #40A9FF;
		/* margin-top: 6rpx; */
	}

	.childtitle view {
		color: #51565D;
		font-size: 28rpx;
		font-weight: 500;
		margin-left: 8rpx;
	}

	.zixun {
		width: 710rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(147, 147, 147, 0.5);
		border-radius: 14rpx;
		display: flex;
		justify-content: space-around;
		margin: auto;
		margin-top: 12rpx;
		box-sizing: border-box;
		flex-wrap: wrap;
	}

	.zixunitem {
		width: 177.5rpx;
	}

	.zixunitemimage {
		width: 87rpx;
		height: 87rpx;
		margin: auto;
		display: block;
		margin-top: 20rpx;
	}

	.zixunitemview {
		color: #333;
		font-size: 24rpx;
		font-weight: 500;
		margin-top: 20rpx;
		margin-bottom: 12rpx;
		text-align: center;
	}
</style>
