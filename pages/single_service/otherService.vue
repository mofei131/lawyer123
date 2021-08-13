<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">

		<view class="page">
			<view class="mod1">
				<view style="z-index: 78;
		height: 379rpx;
		overflow: hidden;
		background-image: url(/static/icon/cooper_back.png);
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
		background: url(/static/icon/cooper_group5.png) 46rpx 0rpx no-repeat;
		background-size: 750rpx 262rpx;
		display: flex;
		flex-direction: column;"></view>
					<view style="z-index: 80;
		height: 332rpx;
		background: url(/static/icon/cooper_group6.png) 100% no-repeat;
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
		background: url(/static/icon/cooper_mod2.png) 100% no-repeat;
		display: flex;
		flex-direction: column;"></view>
						<image src="/static/icon/cooper_back1.png" class="pic2"></image>
					</view>
				</view>
				<view class="block2" v-for="(item,index) in dataSource" :key="index">
					<view class="group7">
						<text lines="1" decode="true" class="info4">～&nbsp;套餐{{index+1}}&nbsp;～</text>
						<view class="bd1"></view>
						<view class="ellipsis" style="width: 500rpx;margin: 10rpx 0;">{{item.name}}</view>
						<view
							class="ellipsis-3 info5">
							<rich-text :nodes="item.intro"></rich-text>
							</view>
					</view>
					<view class="flex-row mx-between sx-center" style="width: 664rpx;;padding: 10rpx 20rpx;">
						<text style="color: #FF4D4F;">￥{{item.price}}</text>
						<view @tap="toPay(item)"
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
			this.drawInit();

		},
		data() {
			return {
				dataSource:[]
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			async drawInit() {
				let res = await this.$myRequest({
					url: 'service/packageList',
					methods: 'GET',
					data: {}
				});
				if (res && res.code==200) {
					console.log(res);
					this.dataSource = res.data;
				}else{
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
			},
			toDetail() {
				uni.navigateTo({
					url: "../detail/cooperDetail?id=1"
				})
			},
			async toPay(item){
			
				let res = await this.$myRequest({
				url: 'service/buyPackage',
				methods: 'GET',
				data: {
					package_id:item.id,
					user_id:this.$store.state.userInfo.user_id
				}
				});
				
				if (res && res.code==200) {
				console.log(res.data.service_id);//只有指个参数
					uni.navigateTo({
						url: '../my/pay?id=' + res.data.service_id + '&price=' + item.price + '&typeId=' + item.id
					})
				}else{
					uni.showToast({
						title: res.message,
						icon:'none'
					})
				}
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
