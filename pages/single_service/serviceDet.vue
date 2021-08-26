<template>
	<view>
				<view class="block2">
					<view class="group7">
						<!-- <text lines="1" decode="true" class="info4">～&nbsp;套餐介绍&nbsp;～</text> -->
						<!-- <view class="bd1"></view> -->
						<view class="info5">
							<rich-text :nodes="dataSource.intro"></rich-text>
						</view>
						
						
		
					</view>
				</view>
				<view class="form">
					<view class="item">
						<view class="mingm">公司名:</view>
						<input type="text" v-model="unit" />
					</view>
					<view class="item">
						<view class="mingm">联系人:</view>
						<input type="text" v-model="xingm" />
					</view>
					<view class="item">
						<view class="mingm">手机号:</view>
						<input type="number" v-model="dianhua" />
					</view>
				</view>
				<view class="flex-row mx-center sx-center" v-if="price != '' ">
					<view class="flex-txt-center jjm" @tap="commit"
						style="flex: 1 1 auto;margin: 20rpx;background-color: #57A9FF;color: #FFFFFF;">
						立即购买
					</view>
				</view>
			</view>
</template>

<script>
	export default {
		onLoad(param) {
			let that = this
			that.id = param.id
			this.price = param.price;
			let userInfo = this.$store.state.userInfo;
			this.layer_id = param.layer_id;
			this.user_id = userInfo.user_id;
			this.init();
			this.phone = param.phone;
			this.name = param.name
		},
		data() {
			return {
				price:'',
				layer_id: '',
				user_id: '',
				dataSource:{},
				phone:'',
				id:'',
				name:'',
				unit:'',
				xingm:'',
				dianhua:''
			}
		},
		// onShow() {
		// 	let that = this
		// 	uni.request({
		// 		url:'https://layer.boyaokj.cn/api/service/packageDetail',
		// 		method:'GET',
		// 		data:{
		// 			id: that.id
					
		// 		},
		// 		success(res) {
		// 			console.log(res.data)
		// 			that.dataSource = res.data;
		// 		}
		// 	})
		// },
		methods: {
			back(){
				uni.navigateBack({
					
				});
			},
			async init() {
				let that = this
				console.log(that.id)
				let res = await this.$myRequest({
					url: 'service/packageDetail',
					method: 'GET',
					data: {
						id: that.id
					},

				});
				if(res && res.code==-1){
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}else{
					if(res && res.data){
						console.log(res);
						this.dataSource = res.data;
					}
				}
			},
			async commit() {
				if (!this.unit) {
					uni.showToast({
						title: '请输入公司名称',
						icon: 'none',
					})
					return
				}
				if (!this.xingm) {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none',
					})
					return
				}
				if (!this.dianhua) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
					})
					return
				}
				let that = this
				let res = await this.$myRequest({
				url: 'service/buyPackage',
				methods: 'GET',
				data: {
					package_id:that.id,
					user_id:this.$store.state.userInfo.user_id,
					company:this.unit,
					name:this.xingm,
					mobile:this.dianhua
				}
				});
				
				if (res && res.code==200) {
				console.log(res.data.service_id);//只有指个参数
					uni.navigateTo({
						url: '../my/pay?id=' + res.data.service_id + '&price=' + that.price + '&typeId=' + that.id+'&name='+that.name
					})
				}else{
					uni.showToast({
						title: res.message,
						icon:'none'
					})
				}
			},

		},

	}
</script>

<style>
	.form{
		margin-bottom: 100rpx;
	}
	.item input{
		width: 550rpx;
		margin-left: 20rpx;
	}
	.item view{
		padding-left: 10rpx;
	}
	.item{
		width: 720rpx;
		height: 96rpx;
		background: #F4F7F7;
		border-radius: 14rpx;
		display: flex;
		align-items: center;
		margin: auto;
		margin-top: 16rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		box-sizing: border-box;
	}
	page{
		background-color: rgb(255,255,255)!important;
	}
	.jjm{
		height: 76rpx;border-radius:40rpx;
	}
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
		margin: 16rpx 0 150rpx 86rpx;
	}

	.paragraph1 {
		z-index: 84;
		width: 200rpx;
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
	}



	.mod2 {}

	.pic2 {
		z-index: 82;
		position: absolute;
		left: 419rpx;
		top: 71rpx;
		width: 294rpx;
		height: 210rpx;
	}

	.block2 {
		z-index: 4;
		/* height: 318rpx; */
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 1);
		/* box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.11); */
		align-self: center;
		margin-top: 20rpx;
		width: 710rpx;
		justify-content: flex-start;
		padding-top: 18rpx;
		align-items: center;
		display: flex;
		flex-direction: column;
		margin: 40rpx auto;
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
		/* height: 210rpx; */
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
</style>
