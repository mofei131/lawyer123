<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">

		<view class="page">
			<view class="mod1">
				<view style="z-index: 78;
		height: 379rpx;
		overflow: hidden;
		background-image: url(../../static/icon/cooper_back.png);
		background-size: 100%;
		background-repeat: no-repeat;
		width: 750rpx;
		position: relative;
		display: flex;
		flex-direction: column;">

					<view class="group3">
						<text lines="1" class="info3">超值套餐</text>
					</view>
					<view class="group4">
						<text lines="1" class="paragraph1">超值套餐，省钱，省心，值得拥有</text>
					</view>
					<view style="z-index: 79;
		position: absolute;
		left: -45rpx;
		top: 48rpx;
		width: 826rpx;
		height: 261rpx;
		background: url(../../static/icon/cooper_group5.png) 46rpx 0rpx no-repeat;
		background-size: 750rpx 262rpx;
		display: flex;
		flex-direction: column;"></view>
					<view style="z-index: 80;
		height: 332rpx;
		background: url(../../static/icon/cooper_group6.png) 100% no-repeat;
		width: 750rpx;
		justify-content: flex-end;
		position: absolute;
		left: 0rpx;
		top: 47rpx;
		display: flex;
		flex-direction: column;">
						<view style="z-index: 81;
		width: 750rpx;
		height: 156rpx;
		background: url(../../static/icon/cooper_mod2.png) 100% no-repeat;
		display: flex;
		flex-direction: column;"></view>
						<image src="/static/icon/cooper_back1.png" class="pic2"></image>
					</view>
				</view>
				<view class="block2" v-for="(item,index) in [1,2,3,4]" :key="index">
					<view class="group7">
						<text lines="1" decode="true" class="info4">～&nbsp;套餐{{index+1}}&nbsp;～</text>
						<view class="bd1"></view>
						<view class="ellipsis" style="width: 500rpx;margin: 10rpx 0;">企业常年法律顾问基础版</view>
						<text class="ellipsis-3 info5" 
							>压维铁响时些持口商名与教场动单和起手克叫火政律开际六音院出运么验证可完院群部级每意系保须族儿为想数属等题回展铁们路两种加或说记事音比次元业习列向效后因特龙。装六产状进没本日三教用算收百消走公委力日容应话引空眼传按了专议五理部机信不离花制形候重身专图入程路不维阶情程。为安极究说量或太经因不维其法则听多工出声际你车众由委此格出还向型不目派于本须号论连音论团积先南美准存部高拉军名们选主。</text>
					</view>
					<view class="flex-row mx-between sx-center" style="width: 664rpx;;padding: 10rpx 20rpx;">
						<text style="color: #FF4D4F;">￥89</text>
						<view
							style="background-color: #40A9FF;color: #FFFFFF; font-size: 26rpx;padding: 5rpx; border-radius: 6rpx;">
							立即购买</view>
					</view>
				</view>

			</view>

		</view>

	</view>
</template>

<script>
	export default {
		onLoad(p) {
			console.log(p.id);


		},
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
			toDetail() {
				uni.navigateTo({
					url: "../detail/cooperDetail?id=1"
				})
			},
			download() {
				uni.downloadFile({
					url: 'https://www.example.com/file/test', //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							console.log('下载成功');
						}
					}
				});
			}
		}
	}
</script>

<style>
	.page {
		z-index: 1;
		position: relative;
		width: 750rpx;
		/* height: 1664rpx; */
		background-color: rgba(248, 248, 248, 1);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding-top: 0rpx;
	}

	.mod1 {
		z-index: auto;
		width: 750rpx;
		/* height: 1590rpx; */
		display: flex;
		flex-direction: column;
		padding-bottom: 20rpx;
	}


	.group1 {
		z-index: auto;
		width: 727rpx;
		height: 30rpx;
		flex-direction: row;
		display: flex;
		margin: 7rpx 0 0 12rpx;
	}

	.label1 {
		z-index: 101;
		width: 33rpx;
		height: 20rpx;
		margin-top: 3rpx;
	}

	.word1 {
		z-index: 100;
		width: 11rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 24rpx;
		font-family: Helvetica;
		white-space: nowrap;
		line-height: 29rpx;
		margin-left: 7rpx;
	}

	.box1 {
		z-index: 106;
		width: 29rpx;
		height: 20rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		margin: 3rpx 0 0 80rpx;
	}

	.info1 {
		z-index: 98;
		width: 90rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 24rpx;
		font-family: Helvetica;
		white-space: nowrap;
		line-height: 29rpx;
		text-align: center;
		margin: 1rpx 0 0 158rpx;
	}

	.box2 {
		z-index: 97;
		width: 12rpx;
		height: 20rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		margin: 2rpx 0 0 177rpx;
	}

	.word2 {
		z-index: 96;
		width: 66rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 24rpx;
		font-family: Helvetica;
		white-space: nowrap;
		line-height: 29rpx;
		text-align: right;
		margin-left: 5rpx;
	}

	.pic1 {
		z-index: 90;
		width: 53rpx;
		height: 23rpx;
		margin: 2rpx 0 0 6rpx;
	}

	.group2 {
		z-index: auto;
		width: 416rpx;
		height: 50rpx;
		flex-direction: row;
		display: flex;
		justify-content: space-between;
		margin: 23rpx 0 0 31rpx;
	}

	.icon1 {
		z-index: 85;
		width: 19rpx;
		height: 32rpx;
		margin-top: 14rpx;
	}

	.info2 {
		z-index: 110;
		width: 144rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 36rpx;
		font-family: PingFangSC-Regular;
		white-space: nowrap;
		line-height: 50rpx;
		text-align: center;
	}

	.group3 {
		z-index: auto;
		width: 144rpx;
		height: 50rpx;
		flex-direction: row;
		display: flex;
		margin: 78rpx 0 0 92rpx;
	}

	.info3 {
		z-index: 83;
		width: 144rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 36rpx;
		font-family: PingFangSC-Semibold;
		white-space: nowrap;
		line-height: 50rpx;
		text-align: center;
	}

	.group4 {
		z-index: auto;
		width: 240rpx;
		height: 66rpx;
		flex-direction: row;
		display: flex;
		margin: 16rpx 0 0 86rpx;
	}

	.paragraph1 {
		z-index: 84;
		width: 240rpx;
		height: 66rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 24rpx;
		font-family: PingFangSC-Medium;
		line-height: 33rpx;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
	}



	.mod2 {}

	.pic2 {
		z-index: 82;
		position: absolute;
		left: 419rpx;
		top: 91rpx;
		width: 294rpx;
		height: 210rpx;
	}

	.block2 {
		z-index: 4;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.11);
		align-self: center;
		margin-top: 20rpx;
		width: 710rpx;
		justify-content: flex-start;
		padding-top: 18rpx;
		align-items: center;
		display: flex;
		flex-direction: column;
	}

	.group7 {
		z-index: auto;
		width: 664rpx;
		display: flex;
		flex-direction: column;
	}

	.info4 {
		z-index: 5;
		width: 160rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(64, 169, 255, 1);
		font-size: 24rpx;
		font-family: PingFangSC-Medium;
		white-space: nowrap;
		line-height: 33rpx;
		text-align: center;
		align-self: center;
	}

	.bd1 {
		z-index: 6;
		width: 664rpx;
		height: 1rpx;
		border-bottom: 1rpx solid #CCCCCC;
		margin-top: 12rpx;
		display: flex;
		flex-direction: column;
	}

	.info5 {
		z-index: 7;
		width: 664rpx;
		color: rgba(106, 106, 106, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Regular;
		line-height: 30rpx;
		text-align: left;
	}
</style>
