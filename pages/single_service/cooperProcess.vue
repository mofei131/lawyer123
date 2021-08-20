<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">
		<view class="" style="position: fixed;z-index: 9999;top:40rpx;left: 0;margin: 0 auto;font-size: 36rpx;background-color: #ffffff00;">
			<uni-nav-bar :fixed="true" :border="false" left-icon="arrowleft" :title="typeData && typeData.name"
				color="#fff" background-color="#ffffff00" @clickLeft="back">

			</uni-nav-bar>
		</view>

		<view class="page">
			<view class="mod1" style="position: relative;">
				<image style="width: 100%;height: 379rpx;" mode="scaleToFill" src="/static/icon/cooper_back111.png">
				</image>
				<view style="position: absolute;top: 145rpx;" class="yuai">
					<text lines="1" class="info3">{{name}}</text>
				</view>
				<view class="group4">
					<text v-if="id == 5" lines="1" class="paragraph1">帮您绕开别人掉过的“坑”，让您放心大胆前行</text>
					<text v-else-if="id == 6" lines="1" class="paragraph1">用法律手段将欠款追回，向对方提出正式警告，促成纠纷解决</text>
					<text v-else-if="id == 7" lines="1" class="paragraph1">通过专业的谈判技巧迫使债务人偿还欠款</text>
					<text v-else-if="id == 8" lines="1" class="paragraph1">让法官更好的明了案情，理解当事人的诉求，争取主动</text>
					<text v-else-if="id == 9" lines="1" class="paragraph1">让借贷关系更清楚、明了，专业性强</text>
					<text v-else-if="id == 10" lines="1" class="paragraph1">专业刑事律师代理看守所会见，保护嫌疑人的合法利益</text>
				</view>
			</view>
			<view class="block2">
				<view class="group7">
					<text lines="1" decode="true" class="info4">～&nbsp;产品介绍&nbsp;～</text>
					<view class="bd1"></view>
					<view lines="1" class="info5">
						<rich-text :nodes="dataSource.intro"></rich-text>
					</view>
				</view>
			</view>
			<view class="block3">
				<view class="group8">
					<text lines="1" decode="true" class="txt1">～&nbsp;服务说明&nbsp;～</text>
					<view class="bd2"></view>
					<view class="flex-column danding" style="color: gray;margin-top: 18rpx;padding-bottom: 20rpx;">
						<rich-text :nodes="dataSource.service"></rich-text>
					</view>

				</view>
			</view>
			<view class="block3">
				<view class="group8">
					<text lines="1" decode="true" class="txt1">～&nbsp;服务流程&nbsp;～</text>
					<view class="bd2"></view>
					<view class="imgbox">
						<image v-if="id == 5" mode="widthFix" src="../../static/images/liucheng1.png" ></image>
						<image v-else-if="id == 6" mode="widthFix" src="../../static/images/liucheng2.png"></image>
						<image v-else mode="widthFix" src="../../static/images/liucheng3.png"></image>
					</view>
					<!-- <view class="flex-column danding" style="color: gray;margin-top: 18rpx;padding-bottom: 20rpx;">
						<rich-text :nodes="dataSource.service"></rich-text>
					</view> -->
			
				</view>
			</view>
			<!-- <view class="block4" style="padding-top: 0;">
				<view class="mod3">
					<text lines="1" decode="true" class="info7">～&nbsp;服务流程&nbsp;～</text>
					<view class="mod4"></view>
					<view class="mod5">
						<image src="/static/icon/cooper_p3.png" class="img1"></image>
						<view class="group9"></view>
						<image src="/static/icon/cooper_p1.png" class="pic3"></image>
						<view class="group10"></view>
						<image src="/static/icon/cooper_p2.png" class="img2"></image>
						<view class="group11"></view>
						<image src="/static/icon/cooper_p5.png" class="img3"></image>
					</view>
					<view class="mod6">
						<text lines="1" class="word6">下单购买</text>
						<text lines="1" class="txt4">律师接单</text>
						<text lines="1" class="info8">律师服务</text>
						<text lines="1" class="info9">回访评价</text>
					</view>
					<image v-if="id == 5" mode="widthFix" src="../../static/images/liucheng1.png" style="width: 100%;border-radius: 20rpx;"></image>
					<image v-else-if="id == 6" mode="widthFix" src="../../static/images/liucheng2.png" style="width: 100%;border-radius: 20rpx;"></image>
					<image v-else mode="widthFix" src="../../static/images/liucheng3.png" style="width: 100%;border-radius: 20rpx;"></image>
				</view>

			</view> -->
		</view>



	</view>
</template>

<script>
	export default {
		onLoad(p) {
			console.log(p);
			this.id = p && p.id;
			let obj = this.list.find(item => item.id == this.id);
			if (obj) {
				this.typeData = obj;

				this.getContent(obj.detailId);
				uni.setNavigationBarTitle({
					title: obj.name
				});
			}
			let that = this
			uni.request({
				url: 'https://layer.boyaokj.cn/api/index/setting',
				method: 'GET',
				data: {
					key: 'wenti'
				},
				success(res) {
					// console.log(res.data.data.data)
					that.content = res.data.data.data
				}
			})
		},
		data() {
			return {

				content: "双方都",
				dataSource: {},
				content: '',
				id: '',
				name:'',
				list: [{
						id: 5,
						name: "合同审核",
						url: "/static/icon/icon6.png",
						detailId: 4
					},
					{
						id: 6,
						name: "律师函",
						url: "/static/icon/icon7.png",
						detailId: 5
					},
					{
						id: 7,
						name: "债务催收指导",
						url: "/static/icon/icon8.png",
						detailId: 6
					},
					{
						id: 8,
						name: "起诉状/答辩状",
						url: "/static/icon/icon9.png",
						detailId: 7
					},
					{
						id: 9,
						name: "代写借/欠条",
						url: "/static/icon/icon10.png",
						detailId: 8
					},
					{
						id: 10,
						name: "刑事会见",
						url: "/static/icon/icon11.png",
						detailId: 9
					},

				],
				typeData: '',
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			kefu() {
				uni.makePhoneCall({
					phoneNumber: "400-8623-5513",
				})

			},

			async getContent(id) {
				let res = await this.$myRequest({
					url: 'service/detail',
					data: {
						id
					}
				});
				if (res && res.code == 200) {
					console.log(res.data);
					this.dataSource = res.data;
					this.name = res.data.name
				}
			},
			toDetail() {
				uni.navigateTo({
					url: "../detail/cooperDetail?id=1"
				})
			},
			async toPay() {
				uni.navigateBack({
					delta: 1
				})
			},
			async commitService() {
				let res = await this.$myRequest({
					url: 'service/danxiang',
					data: {
						layer_id: null,
						user_id: null,
						service_id: this.id,
					}
				});
				if (res && res.data) {
					console.log(res);
				}
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
	.imgbox image{
		margin-top: 9rpx;
		width: 100%;
		margin-bottom: 9rpx;
	}
	.yuai{
		left: 40rpx;
	}
	.danding{
		font-size: 28rpx;
	}
	.page {
		z-index: 1;
		position: relative;
		width: 750rpx;
		height: 1755rpx;
		background-color: rgba(248, 248, 248, 1);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding-top: 0rpx;
	}

	.mod1 {
		height: 332rpx;
		display: flex;
		flex-direction: column;
	}

	.block1 {}

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

		left: 40rpx;
		top: 208rpx;
		/* width: 300rpx; */
		height: 66rpx;
		position: absolute;
		flex-direction: row;
		display: flex;
	}

	.paragraph1 {
		z-index: 84;
		width: 300rpx;
		height: 66rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 24rpx;
		font-family: PingFangSC-Medium;
		line-height: 33rpx;
		text-align: start;
		overflow: hidden;
		text-overflow: ellipsis;
		text-justify: auto;
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
		/* height: 318rpx; */
		padding-bottom: 20rpx;
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
		/* height: 272rpx; */
		display: flex;
		flex-direction: column;
	}

	.info4 {
		z-index: 5;
		width: 220rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(64, 169, 255, 1);
		font-size: 32rpx;
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
.info5 rich-text{
	line-height: 40rpx;
	letter-spacing: 4rpx;
}
.danding rich-text{
	line-height: 40rpx;
	letter-spacing: 4rpx;
}
	.info5 {
		z-index: 7;
		width: 664rpx;
		/* height: 210rpx; */
		display: block;
		overflow-wrap: break-word;
		color: rgba(106, 106, 106, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Regular;
		line-height: 30rpx;
		text-align: left;
		margin-top: 16rpx;
		/* overflow: auto; */
		text-overflow: ellipsis;
	}

	.block3 {
		z-index: 10;
		/* height: 223rpx; */
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

	.group8 {
		z-index: auto;
		width: 664rpx;
		/* height: 184rpx; */
		display: flex;
		flex-direction: column;
	}

	.txt1 {
		z-index: 11;
		width: 220rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(64, 169, 255, 1);
		font-size: 32rpx;
		font-family: PingFangSC-Medium;
		white-space: nowrap;
		line-height: 33rpx;
		text-align: center;
		align-self: center;
	}

	.bd2 {
		z-index: 12;
		width: 664rpx;
		height: 1rpx;
		border-bottom: 1rpx solid #CCCCCC;
		margin-top: 12rpx;
		display: flex;
		flex-direction: column;
	}

	.bd3 {
		z-index: auto;
		width: 532rpx;
		height: 30rpx;
		margin-top: 16rpx;
		flex-direction: row;
		display: flex;
		justify-content: space-between;
	}

	.txt2 {
		z-index: 13;
		width: 110rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(106, 106, 106, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Semibold;
		white-space: nowrap;
		line-height: 30rpx;
		text-align: left;
	}

	.txt3 {
		z-index: 14;
		width: 418rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(106, 106, 106, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Regular;
		white-space: nowrap;
		line-height: 30rpx;
		text-align: left;
	}

	.bd4 {
		z-index: auto;
		width: 466rpx;
		height: 30rpx;
		margin-top: 16rpx;
		flex-direction: row;
		display: flex;
		justify-content: space-between;
	}

	.word3 {
		z-index: 15;
		width: 110rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(106, 106, 106, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Semibold;
		white-space: nowrap;
		line-height: 30rpx;
		text-align: left;
	}

	.info6 {
		z-index: 17;
		width: 352rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(106, 106, 106, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Regular;
		white-space: nowrap;
		line-height: 30rpx;
		text-align: left;
	}

	.bd5 {
		z-index: auto;
		width: 466rpx;
		height: 30rpx;
		margin-top: 16rpx;
		flex-direction: row;
		display: flex;
		justify-content: space-between;
	}

	.word4 {
		z-index: 16;
		width: 110rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(106, 106, 106, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Semibold;
		white-space: nowrap;
		line-height: 30rpx;
		text-align: left;
	}

	.word5 {
		z-index: 18;
		width: 352rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(106, 106, 106, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Regular;
		white-space: nowrap;
		line-height: 30rpx;
		text-align: left;
	}

	.block4 {
		z-index: 30;
		height: 242rpx;
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

	.mod3 {
		z-index: auto;
		width: 664rpx;
		height: 194rpx;
		display: flex;
		flex-direction: column;
	}

	.info7 {
		z-index: 31;
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

	.mod4 {
		z-index: 32;
		width: 664rpx;
		height: 1rpx;
		border-bottom: 1rpx solid #CCCCCC;
		margin-top: 12rpx;
		display: flex;
		flex-direction: column;
	}

	.mod5 {
		z-index: auto;
		width: 499rpx;
		height: 55rpx;
		flex-direction: row;
		display: flex;
		justify-content: space-between;
		margin: 40rpx 0 0 83rpx;
	}

	.img1 {
		z-index: 34;
		width: 55rpx;
		height: 55rpx;
	}

	.group9 {
		z-index: 68;
		width: 44rpx;
		height: 26rpx;
		background: url(../../static/icon/cooper_right.png) 0rpx 0rpx no-repeat;
		background-size: 44rpx 26rpx;
		margin-top: 16rpx;
		display: flex;
		flex-direction: column;
	}

	.pic3 {
		z-index: 41;
		width: 55rpx;
		height: 55rpx;
	}

	.group10 {
		z-index: 71;
		width: 44rpx;
		height: 26rpx;
		background: url(../../static/icon/cooper_right.png) 0rpx 0rpx no-repeat;
		background-size: 44rpx 26rpx;
		margin-top: 16rpx;
		display: flex;
		flex-direction: column;
	}

	.img2 {
		z-index: 50;
		width: 55rpx;
		height: 55rpx;
	}

	.group11 {
		z-index: 74;
		width: 44rpx;
		height: 26rpx;
		background: url(../../static/icon/cooper_right.png) 0rpx 0rpx no-repeat;
		background-size: 44rpx 26rpx;
		margin-top: 16rpx;
		display: flex;
		flex-direction: column;
	}

	.img3 {
		z-index: 62;
		width: 55rpx;
		height: 55rpx;
	}

	.mod6 {
		z-index: auto;
		width: 532rpx;
		height: 30rpx;
		flex-direction: row;
		display: flex;
		justify-content: space-between;
		margin: 23rpx 0 0 66rpx;
	}

	.word6 {
		z-index: 39;
		width: 88rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(106, 106, 106, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Medium;
		white-space: nowrap;
		line-height: 30rpx;
		text-align: left;
	}

	.txt4 {
		z-index: 48;
		width: 88rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(106, 106, 106, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Medium;
		white-space: nowrap;
		line-height: 30rpx;
		text-align: left;
	}

	.info8 {
		z-index: 60;
		width: 88rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(106, 106, 106, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Medium;
		white-space: nowrap;
		line-height: 30rpx;
		text-align: left;
	}

	.info9 {
		z-index: 67;
		width: 88rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(106, 106, 106, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Medium;
		white-space: nowrap;
		line-height: 30rpx;
		text-align: left;
	}

	.block5 {
		z-index: 20;
		height: 352rpx;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.11);
		align-self: center;
		margin-top: 16rpx;
		width: 710rpx;
		justify-content: flex-start;
		padding-top: 18rpx;
		align-items: center;
		display: flex;
		flex-direction: column;
	}

	.mod7 {
		z-index: auto;
		width: 664rpx;
		height: 312rpx;
		display: flex;
		flex-direction: column;
	}

	.word7 {
		z-index: 21;
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

	.block6 {
		z-index: 22;
		width: 664rpx;
		height: 1rpx;
		border-bottom: 1rpx solid #CCCCCC;
		margin-top: 12rpx;
		display: flex;
		flex-direction: column;
	}

	.word8 {
		z-index: 23;
		width: 330rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(106, 106, 106, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Semibold;
		white-space: nowrap;
		line-height: 30rpx;
		text-align: left;
		align-self: flex-start;
		margin-top: 16rpx;
	}

	.txt5 {
		z-index: 26;
		width: 506rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(117, 117, 117, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Regular;
		white-space: nowrap;
		line-height: 30rpx;
		text-align: left;
		align-self: flex-start;
		margin-top: 10rpx;
	}

	.txt6 {
		z-index: 24;
		width: 330rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(106, 106, 106, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Semibold;
		white-space: nowrap;
		line-height: 30rpx;
		text-align: left;
		align-self: flex-start;
		margin-top: 20rpx;
	}

	.info10 {
		z-index: 27;
		width: 506rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(117, 117, 117, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Regular;
		white-space: nowrap;
		line-height: 30rpx;
		text-align: left;
		align-self: flex-start;
		margin-top: 10rpx;
	}

	.info11 {
		z-index: 25;
		width: 330rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(106, 106, 106, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Semibold;
		white-space: nowrap;
		line-height: 30rpx;
		text-align: left;
		align-self: flex-start;
		margin-top: 20rpx;
	}

	.word9 {
		z-index: 28;
		width: 506rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(117, 117, 117, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Regular;
		white-space: nowrap;
		line-height: 30rpx;
		text-align: left;
		align-self: flex-start;
		margin-top: 10rpx;
	}

	.mod8 {
		z-index: 111;
		height: 151rpx;
		background-color: #FFFFFF;
		width: 750rpx;
		justify-content: flex-start;
		padding-top: 34rpx;
		align-items: center;
		position: absolute;
		left: 0rpx;
		top: 1600rpx;
		display: flex;
		flex-direction: column;
	}

	.box3 {
		z-index: auto;
		width: 582rpx;
		height: 76rpx;
		flex-direction: row;
		display: flex;
		justify-content: space-between;
	}

	.mod9 {
		z-index: 120;
		height: 76rpx;
		border-radius: 38rpx;
		background-color: rgba(255, 96, 96, 1);
		width: 254rpx;
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;
	}

	.mod10 {
		z-index: auto;
		width: 112rpx;
		height: 40rpx;
		flex-direction: row;
		display: flex;
		justify-content: space-between;
	}

	.icon2 {
		z-index: 123;
		width: 44rpx;
		height: 37rpx;
		margin-top: 2rpx;
	}

	.word10 {
		z-index: 122;
		width: 56rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Regular;
		white-space: nowrap;
		line-height: 40rpx;
		text-align: center;
	}

	.mod11 {
		z-index: 117;
		height: 76rpx;
		border-radius: 38rpx;
		background-color: rgba(64, 169, 255, 1);
		width: 254rpx;
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;
	}

	.word11 {
		z-index: 118;
		width: 112rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 28rpx;
		font-family: PingFangSC-Regular;
		white-space: nowrap;
		line-height: 40rpx;
		text-align: center;
	}
</style>
