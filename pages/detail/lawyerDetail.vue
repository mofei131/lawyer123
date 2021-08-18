<template>
	<view class="flex-column mx-start sx-stretch" style="padding: 20rpx;background-color: #F8F8F8;">
		<lawyercard1 @updatefollow="updateFollow" :lawyerlist="lawyerList" :follow='true' @buy="buy"></lawyercard1>

		<view class="flex-column mx-start sx-stretch" style="border-radius: 20rpx;background-color: #FFFFFF;">
			<view class="flex-row mx-start sx-center ld_title_wrap">
				<view style="background-color: #007AFF;width: 8rpx;height: 40rpx;margin:0 10rpx 0 20rpx;"></view>
				<view style="">个人介绍</view>
			</view>
			<view class="flex-column mx-start sx-stretch"
				style="flex: 0 0 400rpx;padding: 20rpx;line-height: 36rpx;font-size: 25rpx ;color: rgba(153,153,153,1);">
				<view class="flex-row mx-start sx-center">
					<view style="flex: 0 0 140rpx;">毕业院校：</view>
					<view style="flex: 1 1 auto"> {{lawyerList[0] && lawyerList[0].school}}</view>
				</view>
				<view class="flex-row mx-start sx-center">
					<view style="flex: 0 0 140rpx;">学历：</view>
					<view style="flex: 1 1 auto"> {{lawyerList[0] && lawyerList[0].xueli}}</view>
				</view>
				<view class="flex-row mx-start sx-center">
					<view style="flex: 0 0 140rpx;">就读专业：</view>
					<view style="flex: 1 1 auto"> {{lawyerList[0] && lawyerList[0].zhuanye}}</view>
				</view>
				<view class="flex-row mx-start sx-center">
					<view style="flex: 0 0 140rpx;">就职律所：</view>
					<view style="flex: 1 1 auto"> {{lawyerList[0] && lawyerList[0].lvsuo}}</view>
				</view>
				<view class="flex-row mx-start sx-start" style="margin-top: 20rpx;">
					<view style="flex: 0 0 140rpx;">个人简介：</view>
					<view style="flex: 1 1 auto ;height: 200rpx;overflow: auto;">
						{{lawyerList[0] && lawyerList[0].jianjie}}
					</view>
				</view>

			</view>
		</view>
		<view class="flex-row mx-start sx-center" style="flex: 0 0 auto;margin: 16rpx 0; color: gray;">
			<view @tap="tuTuwenPage" class="flex-row mx-start sx-center"
				style="flex: 1 1 auto;padding: 10rpx;background-color: #FFFFFF;margin-right: 20rpx;border-radius: 10rpx; width: 20%;">
				<!-- <view class="backImgCenter"
					style="background-image: url(/static/icon/icon1.png);flex: 0 0 92rpx;height: 92rpx;margin: 10rpx;">
				</view> -->
				<image style="flex: 0 0 92rpx;height: 92rpx;margin: 10rpx;" mode="aspectFit" src="/static/icon/icon1.png"></image>
				
				<view class="flex-column" style="flex: 1 1 auto;line-height: 36rpx;font-size: 26rpx;">
					<text>图文详情</text>
					<text>￥{{lawyerList[0] && lawyerList[0].price && lawyerList[0] && lawyerList[0].price.tuwen}}元</text>
				</view>
				<fa-icon type="angle-right" color="gray"></fa-icon>
			</view>
			<view @tap="toDianhuaPage" class="flex-row mx-start sx-center"
				style="flex: 1 1 auto;padding: 10rpx;background-color: #FFFFFF;border-radius: 10rpx;width: 20%;">
				<!-- <view class="backImgCenter"
					style="background-image: url(/static/icon/icon2.png);flex: 0 0 92rpx;height: 92rpx;margin: 10rpx;">
				</view> -->
				<image style="flex: 0 0 92rpx;height: 92rpx;margin: 10rpx;" mode="aspectFit" src="/static/icon/icon2.png"></image>
				<view  class="flex-column" style="flex: 1 1 auto;line-height: 36rpx;font-size: 26rpx;">
					<text>电话沟通</text>
					<text>{{lawyerList[0] && lawyerList[0].price && lawyerList[0] && lawyerList[0].price.dianhua}}元</text>
				</view>
				<fa-icon type="angle-right" color="gray"></fa-icon>
			</view>
		</view>

		<view class="flex-column mx-start sx-stretch" style="border-radius: 20rpx;background-color: #FFFFFF;">
			<view class="flex-row mx-start sx-center ld_title_wrap">
				<view style="background-color: #007AFF;width: 8rpx;height: 40rpx;margin:0 10rpx 0 20rpx;"></view>
				<view style="">成功案例</view>
			</view>
			<anli :anli="anli"></anli>

		</view>
		<!-- <view class="flex-row mx-center sx-center">
			<view class="flex-txt-center" @tap="tuTuwenPage"
				style="flex: 1 1 auto;margin: 20rpx;height: 60rpx;border-radius:30rpx;background-color: rgba(255,96,96,1);;color: #FFFFFF;">
				图文咨询
			</view>
			<view class="flex-txt-center" @tap="toDianhuaPage"
				style="flex: 1 1 auto;margin: 20rpx;height: 60rpx;border-radius:30rpx;background-color: #57A9FF;color: #FFFFFF;">
				电话咨询
			</view>
		</view> -->


	</view>
</template>

<script>
	import anli from '../components/anli/anli.vue'
	import lawyercard1 from '@/pages/components/lawyercard1/lawyercard1.vue'
	export default {
		onLoad(p) {
			console.log(p.id + "=======" + this.$store.state.userInfo.user_id);
			this.lawyerid = p.id;
			this.getLawyer();
			this.getAnli();
		},
		components: {
			anli,
			lawyercard1
		},
		data() {
			return {
				lawyerid: null,
				lawyerList: [],
				anli: [],
			}
		},
		methods: {
			async getAnli() {
				let res = await this.$myRequest({
					url: 'service/selectCase',
					methods: 'GET',
					data: {
						page: 1,
						limit: 5,
						layer_id: this.lawyerid,
					}
				});
				if (res && res.code == 200) {
					console.log('====获取案例----');
					console.log(res.data);
					this.anli = res.data;
				} else {
					uni.showToast({
						title: '每日学法数据获取异常',
						icon: 'none'
					})
				}
			},
			async getLawyer(){
				this.lawyerList = [];
				let res = this.$myRequest({
					url: 'layer/detail',
					methods: 'GET',
					data: {
						layer_id:this.lawyerid,
						user_id: this.$store.state.userInfo.user_id
					}
				});
				res.then(data => {
					if (data.code == 200) {
						console.log("律师详情")
						console.log(data);
						this.lawyerList.push(data.data)
					} else {
						uni.showToast({
							title: data.message,
							icon: 'none'
						})
					}
				})
			},
			updateFollow(fllow){
				this.lawyerList[0].follow = fllow==1?0:1;
			},
			tuTuwenPage() {
				let lawyer = this.lawyerList[0];
				if (!lawyer) return;
				uni.navigateTo({
					url: '../service_zhixun/tuwen?layer_id=' + lawyer.id + '&price=' + lawyer.price.tuwen +
						'&typeId=1'
				})
			},
			async toDianhuaPage() {
				let lawyer = this.lawyerList[0];
				if (!lawyer) return;
				let layer_id = lawyer.id;
				let user_id = this.$store.state.userInfo.user_id;
				if (!layer_id || !user_id) {
					uni.showToast({
						title: '用户数据异常，请重新登录',
						icon: 'none'
					})
					return;
				}
				let data = {
					layer_id,
					user_id: this.$store.state.userInfo.user_id,
				}
				console.log(data);
				uni.showLoading({
					title: '请稍等'
				})
				let res = await this.$myRequest({
					url: 'service/dianhua',
					method: 'GET',
					data
				});
				uni.hideLoading();
				if (res && res.code == -1) {
					uni.showToast({
						title: res.message,
						icon: 'none'
					})
				} else {

					//跳转收银台
					uni.navigateTo({
						url: '../my/pay?id=' + res.data.service_id + '&price=' + lawyer.price.dianhua +
							'&typeId=2'+'&emitName=callphone'
					})
					uni.$on('callphone',()=>{
						uni.makePhoneCall({
							 phoneNumber: lawyer.mobile, 
						})
						
					})

				}
			}
		}
	}
</script>

<style>
	.list-item {
		padding: 20rpx;
		flex: 0 0 auto;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}

	.ld_title_wrap {
		background-color: rgba(9, 109, 217, 0.1);
		flex: 0 0 97rpx;

	}
</style>
