<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">
		
		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 20rpx;">

			<view class="flex-row mx-center sx-center"
				style="padding: 20rpx;flex: 0 0 160rpx;background-color: #C0DDFF;border-radius: 20rpx;">

				<image class="cooper_check_icon" mode="aspectFit" :src="typeData && typeData.url"></image>

				<view class="flex-column mx-evenly sx-stretch" style="flex: 1 1 auto;" @click="goToPage">
					<view>{{typeData && typeData.name}}</view>
					<!-- <view class="ellipsis">
						399元/每千字以内，专业律师帮您奥凯合同的坑</view> -->
						<view v-if="id == 5" lines="1" class="ellipsis">帮您绕开别人掉过的“坑”，让您放心前行</view>
						<view v-else-if="id == 6" lines="1" class="ellipsis">用法律手段将欠款追回，向对方提出正式警告，促成纠纷解决</view>
						<view v-else-if="id == 7" lines="1" class="ellipsis">通过专业的谈判技巧迫使债务人偿还欠款</view>
						<view v-else-if="id == 8" lines="1" class="ellipsis">让法官更好的明了案情，理解当事人的诉求，争取主动</view>
						<view v-else-if="id == 9" lines="1" class="ellipsis">让借贷关系更清楚、明了，专业性强</view>
						<view v-else-if="id == 10" lines="1" class="ellipsis">专业刑事律师代理看守所会见，保护嫌疑人的合法利益</view>
				</view>
				<fa-icon type="angle-right" color="gray"></fa-icon>
			</view>
			<view class="baiboc">
			<view class="option">
				<view class="real" :class="[type == 1?'qie':'']" @tap="decide()">平台自有律师</view>
				<view class="empty" :class="[type == 2?'qie':'']" @tap="decide2()">平台入驻律师</view>
			</view>
			</view>
			<cooperTabar @searchChange="searchChange"></cooperTabar>
			
			<lawyercard1 :zixun="false" :isbuy="true" :lawyerlist="lawyerList" @buy="buy"></lawyercard1>



		</view>


	</view>
</template>

<script>
	import cooperTabar from '@/pages/components/cooperTabar/cooperTabar.vue'
	import lawyercard1 from '@/pages/components/lawyercard1/lawyercard1.vue'
	export default {
		onLoad(p) {
			console.log(p);
			this.id = p && p.id;
			let obj = this.list.find(item => item.id == this.id);
			if (obj) {
				this.typeData = obj;
				this.detailId = obj.detailId;
				uni.setNavigationBarTitle({
					title: obj.name
				});
			}
		},
		components: {
			cooperTabar,
			lawyercard1
		},
		data() {
			return {
				type:1,
				lawyerList: [],
				id: '',
				list: [{
						id: 5,
						name: "合同审核/起草",
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
				typeData: null
			}
		},
		methods: {
			decide2(){
				if(this.type == 1){
					this.type = 2
					this.dian();
				}
			},
			decide(){
				if(this.type == 2){
					this.type = 1
					this.dian();
				}
			},
			dian(){
				let that = this
				uni.request({
					url:'https://layer.boyaokj.cn/api/layer/list',
					method:'GET',
					data:{
						// page: 1,
						// limit: 10,
						// name: that.name,
						// case_type: that.case_type,
						// cityid: that.cityid,
						// level: that.level,
						// age: that.age,
						// service_id: '',
						// type:that.type,
						// service_id: that.detailId,
						// page: this.page,
						// limit: this.limit,
						service_id: this.detailId,
						type:this.type,
					},
					success(res) {
						that.lawyerList = res.data.data
					}
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			async searchChange(e) {
				console.log('----请求律师列表的信息 ------>');
				console.log({
					page: this.page,
					limit: this.limit,
					...e,
					service_id: this.detailId,
				});
				let res = await this.$myRequest({
					url: 'layer/list',
					data: {
						page: this.page,
						limit: this.limit,
						service_id: this.detailId,
						type:this.type,
						...e
					}
				});
				if (res && res.data) {
					console.log(res);
					this.lawyerList = res.data;
				}
			},
			async buy(item) {
				console.log( {
						layer_id: item.id,
						user_id: this.$store.state.userInfo.user_id,
						service_id: item.service_id
					});
				let res = await this.$myRequest({
					url: 'service/danxiang',
					method: 'GET',
					data: {
						layer_id: item.id,
						user_id: this.$store.state.userInfo.user_id,
						service_id: item.service_id
					}
				});
				if (res && res.code==200) {
					uni.navigateTo({
						url: '../my/pay?id=' + res.data.service_id + '&price=' + item.service_price + '&typeId=' + this.detailId + '&phone='+item.mobile
					})
				}else{
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
				

				
			},
			goToPage() {
				uni.navigateTo({
					url: './cooperProcess?id=' + this.id
				})
			}


		}
	}
</script>

<style>
	.baiboc{
		width: 710rpx;
		height: 100rpx;
		background-color: #fff;
		border-radius: 16rpx 16rpx 0 0;
	}
	.empty{
		width: 240rpx;
		height: 63rpx;
		background: #fff;
		border-radius:0px 26px 26px 0px;
		border: 1px solid #40A9FF;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #464646;
		text-align: center;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.option{
		width: 470rpx;
		height: 63rpx;
		border-radius: 60rpx;
		/* border: 1px solid #40A9FF; */
		display: flex;
		margin: 30rpx auto;
		margin-top: 20rpx;
	}
	.qie{
		background: #40A9FF!important;
		color: #FFFFFF!important;
	}
	.real{
		width: 240rpx;
		height: 63rpx;
		background: #fff;
		border-radius: 26px 0px 0px 26px;
		border: 1px solid #40A9FF;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #464646;
		text-align: center;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.ellipsis{
		width: 512rpx;font-size: 26rpx;color: rgba(102,102,102,1);
	}
	.cooper_check_icon {
		margin-right: 10rpx;
		flex: 0 0 116rpx;
		height: 92.8rpx;
	}
</style>
