<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">


		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 20rpx;">
			<view class="flex-column mx-evenly sx-stretch" v-for="(item,index) in dataSource" :key="index"
				style="flex: 0 0 auto;background-color: #FFFFFF;border-radius: 20rpx;padding: 20rpx;margin-bottom: 20rpx;" @click="toDetail(item)">
				<view class="ellipsis" style="flex:0 0 auto;font-size: 24rpx;width: 600rpx;font-family:PingFangSC-Semibold;">
					<text>{{item.name}}</text>
				</view>
				<view class="ellipsis-3" style="flex: 0 0 90rpx;font-size: 22rpx;margin-top: 9rpx;color: rgba(106,106,106,1);">
					{{item.intro}}
				</view>
				<view class="flex-row mx-between sx-center" style="flex: 0 0 auto;margin-top: 20rpx;padding: 0;">
					<text style="color: rgba(255,77,79,1);font-size: 36rpx;">￥{{item.price}}</text>

					<view v-if="item.buy"
						style="background-color: #40A9FF;color: #FFFFFF; font-size: 26rpx;padding: 5rpx; border-radius: 6rpx;">
						已购买</view>
					<view v-else @tap="toPay(item)"
						style="background-color: #40A9FF;color: #FFFFFF; font-size: 26rpx;padding: 5rpx; border-radius: 6rpx;">
						立即购买</view>
				</view>
			</view>
			<view v-if="dataSource.length<1" style="text-align: center;font-size: 36rpx;color: gray;margin-top: 20rpx;">
				没有数据哦!</view>
		</view>



	</view>
</template>

<script>
	export default {
		onLoad(p) {
			console.log(p);
			let userInfo = this.$store.state.userInfo;
			console.log(userInfo);
			if (!p || !p.cid || !userInfo) {
				uni.showToast({
					title: '参数有误！',
					icon: 'none'
				})
				return;
			}
			this.id = p.cid;
			this.user_id = userInfo.user_id;
			this.drawInit(p.cid, p.name);
		},
		data() {
			return {
				// id: null,
				user_id: null,
				dataSource: [],
				// isPay: false,
			}
		},
		methods: {

			async drawInit(cid, name) {
				console.log({
					cid,
					name,
					user_id: this.user_id
				});
				let res = await this.$myRequest({
					url: 'agreement/list',
					method: 'GET',
					data: {
						cid,
						name: name,
						user_id: this.user_id
					}
				});
				if (res && res.data) {
					console.log(res);
					this.dataSource = res.data
				}
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			async toDetail(item) {
				// if (item.buy) {

					uni.navigateTo({
						url: '../detail/cooperDetail?coopid=' + item.id+'&buy='+item.buy+'&price='+item.price+'&link='+item.link
					})

				// } else {
				// 	uni.showToast({
				// 		title: '请先购买',
				// 		icon: 'none'
				// 	})
				// }

			},
			

			async toPay(item) {
				console.log(item);
				//跳转到支付页面；支付成功，请求
				let res = await this.$myRequest({
					url: 'service/agreement',
					methods: 'GET',
					data: {
						user_id: this.$store.state.userInfo.user_id,
						agreement_id: item.id
					}
				});
				if (res.code == 200) {
					console.log(res);

					uni.navigateTo({
						url: '../my/pay?id=' + res.data.service_id + '&price=' + item.price + '&typeId=11'+"&emitName=goCoodetail"
					})
					uni.$on('goCoodetail', res => {
						uni.navigateTo({
							url: '/pages/detail/cooperDetail?coopid=' + item.id
						})
					});


				} else {
					uni.showToast({
						title: res.message,
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style>

</style>
