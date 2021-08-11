<template>
	<view class="study">
		<view class="studyitem flex-row mx-center sx-center" v-for="(item,index) in learn" :key="index" :style="{marginBottom: marginBottom}"
			@click="todetail(item)">
			<view class="studyitemleft">
				<image style="width: 120rpx;height: 120rpx;"  :src="item.image"></image>
			</view>
			<view class="studyitemright flex-column mx-start sx-stretch">
				<view class="studytitle">{{item.title}}</view>
				<view class="studycontent">{{item.desc}}</view>
				<view class="figure flex-row mx-between sx-center">
					<view>{{item.subtitle}}</view>
				<view class="flex-row mx-center sx-center">
							<view class="stage" style="flex: 1 1 auto;"></view>
							<view style="flex: 0 0 auto;height: 32rpx;
				background: #D4E5F8;
				border-radius: 1rpx;
				color: #40A9FF;
				font-size: 22rpx;
				line-height: 32rpx;
				text-align: center;">
								<view v-if="item.buy" class="cost" style="flex: 0 0 auto;padding: 0 20rpx;">已购买</view>
								<view v-else-if="item.price > 0" class="cost" style="flex: 0 0 auto;padding: 0 20rpx;" @tap="toPay(item)">￥{{item.price}}</view>
								<view v-else style="flex: 0 0 auto;">限时免费</view>
							</view>
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
				if(!item.buy && item.price>0){
					uni.showToast({
						title:'请先购买',
						icon:'none'
					})
					return;
				}
				uni.navigateTo({
					url:'../detail/studyDetail?id='+item.id
				})
			},
			toPay(item){
				uni.showToast({
					title:'购买接口对接'
				})
				// uni.navigateTo({
				// 	url:'../detail/studyDetail'
				// })
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
		
		/* border: 1px solid; */
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
		flex: 1 1 auto;
	}



	.cost {
		color: #FF4D4F !important;
	}
</style>
