<template>
	<view class="anlilist">
		<view class="anlilistitem" v-for="(item,index) in anli" :key="index" :style="{marginBottom: marginBottom}"
			@tap="tochat">
			<view class="floor1">
				<view>【{{item.sort}}】</view>
				<view>{{item.title}}</view>
			</view>
			<view class="floor2">
				<view class="mine">
					<image :src="item.portrait"></image>
					<view>{{item.address}}</view>
					<view>{{item.name}}</view>
				</view>
				<view class="read">{{item.read}}人查看</view>
			</view>
			<view class="anliborder" v-if="index<3 && showBottomBorder"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			anli: {
				type: Array,
				default: []
			},
			showBottomBorder: {
				type: Boolean,
				default: false
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
			tochat() {
				uni.navigateTo({
					url:'../chat/chat'
				})
			}
		}
	}
</script>

<style>
	.anlilist {
		width: 670rpx;
		margin: auto;
	}

	.anlilistitem {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 20rpx;

		/* border: 1px solid; */
	}

	.mine image {
		width: 60rpx;
		height: 60rpx;
		border-radius: 36rpx;
	}

	.floor1 {
		display: flex;
		overflow: hidden;
		white-space: nowrap;
		color: #323232;
		font-size: 28rpx;
		margin-top: 16rpx;
	}

	.floor1 view:nth-child(2) {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.floor2 {
		display: flex;
		justify-content: space-between;
		margin-top: 10rpx;
		margin-bottom: 18rpx;
	}

	.mine {
		display: flex;
		color: #999999;
		font-size: 24rpx;
	}

	.mine image {
		margin-right: 18rpx;
	}

	.mine view {
		padding-top: 25rpx;
	}

	.read {
		width: 105rpx;
		height: 26rpx;
		background: #D4E5F8;
		border-radius: 1rpx;
		color: #40A9FF;
		font-size: 16rpx;
		text-align: center;
		margin-top: 28rpx;
		line-height: 27rpx;
	}

	.anliborder {
		width: 636rpx;
		height: 1rpx;
		background: #ddd;
		margin: auto;
	}
</style>
