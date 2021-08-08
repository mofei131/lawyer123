<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">
		<view class="">
			<uni-nav-bar :fixed="true" :border="false" left-icon="arrowleft" :title="typeData && typeData.name" color="#333333"
				background-color="#FFFFFF" @clickLeft="back">
				<!-- <block slot="right">
					<view class="city">
						<view><text class="uni-nav-bar-text">123</text></view>
						<uni-icons type="arrowdown" color="#333333" size="22" />
					</view>
				</block> -->

			</uni-nav-bar>
		</view>

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
						<text lines="1" class="info3">{{typeData && typeData.name}}</text>
					</view>
					<view class="group4">
						<text lines="1" class="paragraph1">专业律师为您审查合同,最大限度保障您的利益</text>
					</view>
					<view  style="z-index: 79;
		position: absolute;
		left: -45rpx;
		top: 48rpx;
		width: 826rpx;
		height: 261rpx;
		background: url(../../static/icon/cooper_group5.png) 46rpx 0rpx no-repeat;
		background-size: 750rpx 262rpx;
		display: flex;
		flex-direction: column;"></view>
					<view  style="z-index: 80;
		height: 332rpx;
		background: url(../../static/icon/cooper_group6.png) 100% no-repeat;
		width: 750rpx;
		justify-content: flex-end;
		position: absolute;
		left: 0rpx;
		top: 47rpx;
		display: flex;
		flex-direction: column;">
						<view  style="z-index: 81;
		width: 750rpx;
		height: 156rpx;
		background: url(../../static/icon/cooper_mod2.png) 100% no-repeat;
		display: flex;
		flex-direction: column;"></view>
						<image src="/static/icon/cooper_back1.png" class="pic2"></image>
					</view>
				</view>
				<view class="block2">
					<view class="group7">
						<text lines="1" decode="true" class="info4">～&nbsp;产品介绍&nbsp;～</text>
						<view class="bd1"></view>
						<text lines="1"
							class="info5">压维铁响时些持口商名与教场动单和起手克叫火政律开际六音院出运么验证可完院群部级每意系保须族儿为想数属等题回展铁们路两种加或说记事音比次元业习列向效后因特龙。装六产状进没本日三教用算收百消走公委力日容应话引空眼传按了专议五理部机信不离花制形候重身专图入程路不维阶情程。为安极究说量或太经因不维其法则听多工出声际你车众由委此格出还向型不目派于本须号论连音论团积先南美准存部高拉军名们选主。</text>
					</view>
				</view>
				<view class="block3">
					<view class="group8">
						<text lines="1" decode="true" class="txt1">～&nbsp;服务说明&nbsp;～</text>
						<view class="bd2"></view>
						<view class="flex-column" style="overflow: auto;">
							<view class="bd3">
								<text lines="1" class="txt2">服务说明：</text>
								<text lines="1" class="txt3">不限制见面咨询时间，把问题分析咨询清楚</text>
							</view>
							<view class="bd4">
								<text lines="1" class="word3">售后服务：</text>
								<text lines="1" class="info6">下单付款后，，专属客服马上联系您</text>
							</view>
							<view class="bd5">
								<text lines="1" class="word4">服务时限：</text>
								<text lines="1" class="word5">下单付款后，，专属客服马上联系您</text>
							</view>
							<view class="bd5">
								<text lines="1" class="word4">服务时限：</text>
								<text lines="1" class="word5">下单付款后，，专属客服马上联系您</text>
							</view>
							<view class="bd5">
								<text lines="1" class="word4">服务时限：</text>
								<text lines="1" class="word5">下单付款后，，专属客服马上联系您</text>
							</view>
						</view>

					</view>
				</view>
				<view class="block4">
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
					</view>
				</view>
				<view class="block5">
					<view class="mod7">
						<text lines="1" decode="true" class="word7">～&nbsp;常见问题&nbsp;～</text>
						<view class="block6"></view>
						<view class="flex-column" style="overflow: auto;">
							<text lines="1" class="word8">问：下单购买后什么时候联系我？</text>
							<text lines="1" class="txt5">答：下单付款后，专属客服马上联系您，无需等待！</text>
							<text lines="1" class="txt6">问：下单购买后什么时候联系我？</text>
							<text lines="1" class="info10">答：下单付款后，专属客服马上联系您，无需等待！</text>
							<text lines="1" class="info11">问：下单购买后什么时候联系我？</text>
							<text lines="1" class="word9">答：下单付款后，专属客服马上联系您，无需等待！</text>
							<text lines="1" class="info11">问：下单购买后什么时候联系我？</text>
							<text lines="1" class="word9">答：下单付款后，专属客服马上联系您，无需等待！</text>
							<text lines="1" class="info11">问：下单购买后什么时候联系我？</text>
							<text lines="1" class="word9">答：下单付款后，专属客服马上联系您，无需等待！</text>
						</view>

					</view>
				</view>
			</view>
			<view class="mod8">
				<view class="box3">
					<view class="mod9">
						<view class="mod10">
							<image
								src="/static/icon/cooper_p4.png"
								class="icon2"></image>
							<text lines="1" class="word10">客服</text>
						</view>
					</view>
					<button bindtap="onClick" class="mod11">
						<text lines="1" class="word11">立即购买</text>
					</button>
				</view>
			</view>
		</view>



	</view>
</template>

<script>
	export default {
		onLoad(p) {
			console.log(p);
			console.log(p);
			this.id = p && p.id;
			let obj = this.list.find(item=>item.id==this.id);
			if(obj){
				this.typeData = obj;
			}
		},
		data() {
			return {
				content: "双方都",
				id:'',
				list:[
					{id:5,name:"合同审核",url:"/static/icon/icon6.png"},
					{id:6,name:"律师函",url:"/static/icon/icon7.png"},
					{id:7,name:"债务催收指导",url:"/static/icon/icon8.png"},
					{id:8,name:"起诉状/答辩状",url:"/static/icon/icon9.png"},
					{id:9,name:"代写借/欠条",url:"/static/icon/icon10.png"},
					{id:10,name:"刑事会见",url:"/static/icon/icon11.png"},
				
				],
				typeData:'',
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
		height: 1664rpx;
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
		height: 1590rpx;
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

	

	.mod2 {
		
	}

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
		height: 318rpx;
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
		height: 272rpx;
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
		height: 210rpx;
		display: block;
		overflow-wrap: break-word;
		color: rgba(106, 106, 106, 1);
		font-size: 22rpx;
		font-family: PingFangSC-Regular;
		line-height: 30rpx;
		text-align: left;
		margin-top: 16rpx;
		overflow: auto;
		text-overflow: ellipsis;
	}

	.block3 {
		z-index: 10;
		height: 223rpx;
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
		height: 184rpx;
		display: flex;
		flex-direction: column;
	}

	.txt1 {
		z-index: 11;
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
		top: 1513rpx;
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
