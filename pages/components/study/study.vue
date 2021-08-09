<template>
	<view class="study">
		<view class="studyitem" v-for="(item,index) in learn" :key="index" :style="{marginBottom: marginBottom}"
			@click="todetail(item)">
			<view class="studyitemleft">
				<image :src="item.cover"></image>
			</view>
			<view class="studyitemright">
				<view class="studytitle">{{item.title}}</view>
				<view class="studycontent">{{item.content}}</view>
				<view class="figure">
					<view>{{item.name}}</view>
					<view>{{item.status}}</view>
				</view>
				<view class="flex-row mx-center sx-center">
					<view class="stage" style="flex: 1 1 auto;">已更新{{item.stage}}期</view>
					<view style="flex: 0 0 auto;height: 32rpx;
		background: #D4E5F8;
		border-radius: 1rpx;
		color: #40A9FF;
		font-size: 22rpx;
		line-height: 32rpx;
		text-align: center;">
						<view v-if="item.price != 0" class="cost" style="flex: 0 0 auto;padding: 0 20rpx;">￥{{item.price}}</view>
						<view v-if="item.price == 0" style="flex: 0 0 auto;">限时免费</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			learn: {
				type: Array,
				default: []
			},
			marginBottom: {
				type: String,
				default: ''
			}
		},
		data() {

			return {

			}
		},
		methods: {
			todetail(item) {
				uni.navigateTo({
					url:'../detail/studyDetail'
				})
			}
		}
	}
</script>

<style>
	.studyitem {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 20rpx;

	}

	.studyitemleft image {
		width: 196rpx;
		height: 142rpx;
		border-radius: 7rpx;
	}

	.study {
		width: 673rpx;
		margin: auto;
		padding-top: 16rpx;
	}

	.studyitem {
		display: flex;
		position: relative;
		margin-bottom: 34rpx;
	}

	.studytitle {
		color: #323232;
		font-size: 24rpx;
		margin-bottom: 15rpx;
	}

	.studycontent {
		color: #424242;
		font-size: 22rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		line-height: 22rpx;
	}

	.figure {
		display: flex;
		color: #999999;
		font-size: 21rpx;
	}

	.figure view:nth-child(2) {
		margin-left: 18rpx;
	}

	.stage {
		color: #999;
		font-size: 26rpx;
	}



	.studyitemright {
		margin-left: 18rpx;
	}



	.cost {
		color: #FF4D4F !important;
	}
</style>
