<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">
		<view class="flex-column mx-end sx-stretch" style="background-color: #40A9FF;height: 128rpx;">
			<uni-nav-bar :fixed="false" :border="false" left-icon="arrowleft" color="#ffffff" background-color="#40A9FF"
				@clickLeft="back">
				<view class="flex-txt-center" style="flex: 1 1 auto;font-size: 26rpx;margin-left: -16rpx;">
					{{typeData && typeData.name}}</view>
			</uni-nav-bar>
		</view>
		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 20rpx;">

			<view class="flex-row mx-center sx-center"
				style="padding: 20rpx;flex: 0 0 160rpx;background-color: #C0DDFF;border-radius: 20rpx;">
				<view v-if="typeData" class="backImgCenter cooper_check_icon"
					:style="{backgroundImage: `url(${typeData && typeData.url})`}">
				</view>
				<view class="flex-column mx-evenly sx-stretch" style="flex: 1 1 auto;" @click="goToPage">
					<view>{{typeData && typeData.name}}</view>
					<view class="ellipsis" style="width: 512rpx;font-size: 26rpx;color: rgba(102,102,102,1);">
						399元/每千字以内，专业律师帮您奥凯合同的坑</view>
				</view>
				<fa-icon type="angle-right" color="gray"></fa-icon>
			</view>

			<cooperTabar @searchChange="searchChange"></cooperTabar>
			<lawyercard1 :zixun="true" :isbuy="true" :lawyerlist="lawyerList" @buy="buy"></lawyercard1>



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
			}
		},
		components: {
			cooperTabar,
			lawyercard1
		},
		data() {
			return {
				lawyerList: [],
				id: '',
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
				typeData: null
			}
		},
		methods: {
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
						url: '../my/pay?id=' + res.data.service_id + '&price=' + item.service_price + '&typeId=' + this.detailId
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
	.cooper_check_icon {
		margin-right: 10rpx;
		flex: 0 0 116rpx;
		height: 116rpx;
	}
</style>
