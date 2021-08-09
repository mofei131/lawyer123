<template>
	<view class="flex-column mx-start sx-stretch">
		<view class="flex-column mx-start sx-stretch  list-item" v-for="(item,index) in lawyerlist" :key="item"
			:style="{flex:'0 0 auto',order:item}">
			<view class="flex-row mx-start sx-stretch" @tap="todetail(item)">

				<view class="backImgCenter"
					style="border-radius: 50%;margin-right: 10rpx;flex: 0 0 125rpx;height:125rpx;background-image: url('/static/icon/girl.png');">
				</view>
				<view class="flex-column mx-evenly sx-stretch" style="flex: 1 1 auto;line-height: 40rpx;">
					<view class="flex-row mx-start sx-center">
						<text style="font-size: 26rpx;">平台自营律师</text>
						<view class="flex-txt-center"
							style="margin-left: 10rpx;width: 52rpx;background-color: #FF4D4F;">
							<text lines="1" style="color: #FFFFFF;height: 26rpx;line-height: 26rpx;text-align: center;font-size: 17rpx;">自营</text>
						</view>
						<view class="flex-row mx-end sx-center" style="flex:1 1 auto">
							<view
								style="width: 14rpx;height: 14rpx;background-color: rgba(255,77,79,1);border-radius: 50%">
							</view>
							<text style="margin-left:8rpx;color: red;font-size: 20rpx;">开庭</text>
						</view>
					</view>
					<view class="ellipsis" style="width: 512rpx;font-size: 22rpx;color: rgba(102,102,102,1);">
						399元/每千字以内，专业律师帮您奥凯合同的坑</view>

					<view class="field">
						<view class="label" v-for="(list,index1) in item.field" :key="index1" :class="list.class">
							{{list.name}}
						</view>
					</view>
					<view class="flex-row mx-between sx-center"
						style="flex: 0 0 auto;font-size: 20rpx;color: rgba(153,153,153,1);">
						<view class="flex-row">职业年限：9年</view>
						<view class="flex-row">案例：<text style="color: red;">1545</text>件</view>
						<view class="flex-row">好评：<text style="color: red;">1545</text>次</view>
					</view>

					<view v-if="isbuy" class="flex-row mx-between sx-center" style="flex: 0 0 auto;">
						<text style="color: #FF4D4F;">￥89</text>
						<view
							style="background-color: #40A9FF;color: #FFFFFF; font-size: 26rpx;padding: 5rpx; border-radius: 6rpx;"
							@tap.stop="toPay">
							立即购买</view>
					</view>
				</view>

			</view>
			<view v-if="zixun" class="flex-row mx-between sx-center" style="flex: 0 0 auto;margin-top: 20rpx;">
				<view class="serviceBtn flex-txt-center" @tap="tuwen(item)">
					<text>图文咨询</text>
					<text style="color: red;">￥89</text>
				</view>
				<view class="serviceBtn flex-txt-center" @tap="dianhua(item)">
					<text>电话咨询</text>
					<text style="color: red;">￥89</text>
				</view>
				<view class="serviceBtn flex-txt-center" @tap="jianmian(item)">
					<text>见面咨询</text>
					<text style="color: red;">￥89</text>
				</view>
				<view class="serviceBtn flex-txt-center" @tap="pinglvshi(item)">
					<text>聘请律师</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		components: {},
		props: ['lawyerlist', 'zixun','isbuy'],
		data() {
			return {



			}
		},
		methods: {
			toPay() {
				this.$emit('buy', 123)
			},

			tuwen(item) {
				console.log(item);
				uni.navigateTo({
					url: '../service_zhixun/tuwen?id='
				})
			},
			dianhua(item) {
				console.log(item);
				uni.navigateTo({
					url: '../service_zhixun/dianhua?id='
				})
			},
			jianmian(item) {
				console.log(item);
				uni.navigateTo({
					url: '../service_zhixun/jianmian?id='
				})
			},
			pinglvshi(item) {
				console.log(item);
				uni.navigateTo({
					url: '../service_zhixun/pinglvshi?id='
				})
			},
			todetail(item) {
				console.log(item);
				uni.navigateTo({
					url: '../detail/lawyerDetail?id=1'
				})
			}
		}
	}
</script>

<style>
	.list-item {
		padding: 20rpx;
		;
		flex: 0 0 auto;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}

	.serviceBtn {
		border: 2rpx solid #4CA2FF;
		padding: 0 5rpx;
		font-size: 22rpx;
		color: #4CA2FF;
	}

	.field {
		display: flex;
		/* margin-bottom: 13rpx; */
	}

	.label {
		width: 56rpx;
		height: 26rpx;
		background: #26CD93;
		border-radius: 2rpx;
		font-size: 18rpx;
		color: #fff;
		line-height: 26rpx;
		margin-right: 6rpx;
		text-align: center;
	}

	.gree {
		background: #26CD93;
	}

	.blue {
		background: #5F91F6;
	}

	.pink {
		background: #ED538A;
	}

	.purple {
		background: #6765FF;
	}

	.yellow {
		background: #E1B12F;
	}

	
</style>
