<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">
		<view class="">
			<uni-nav-bar :fixed="true" :border="false" left-icon="arrowleft" title="合同模板" color="#333333"
				background-color="#FFFFFF" @clickLeft="back">
				<!-- <block slot="right">
					<view class="city">
						<view><text class="uni-nav-bar-text">123</text></view>
						<uni-icons type="arrowdown" color="#333333" size="22" />
					</view>
				</block> -->

			</uni-nav-bar>
		</view>

		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 20rpx;">
			<view class="flex-column mx-evenly sx-stretch" v-for="(item,index) in dataSource"
				style="flex: 0 0 200rpx;background-color: #FFFFFF;border-radius: 20rpx;padding: 20rpx;">
				<view class="ellipsis" style="flex:0 0 auto;width: 200rpx;">
					<text>{{item.name}}</text>
				</view>
				<view class="ellipsis-3" style="flex: 1 1 auto;font-size: 22rpx;margin:16rpx 0;"
					@click="toDetail(item)">
					{{item.intro}}
				</view>
				<view class="flex-row mx-between sx-center" style="flex: 0 0 auto;">
					<text style="color: #FF4D4F;">￥{{item.buy}}</text>
					<view
						style="background-color: #40A9FF;color: #FFFFFF; font-size: 26rpx;padding: 5rpx; border-radius: 6rpx;">
						立即购买</view>
				</view>
			</view>
		</view>



	</view>
</template>

<script>
	export default {
		onLoad(p) {
			console.log(p);
			let userInfo = this.$store.state.userInfo;

			if (!p || !p.cid || !p.name || !userInfo) {
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
				id: null,
				user_id: null,
				dataSource: [],
				isPay: false,
			}
		},
		methods: {
			async drawInit(cid, name) {
				let res = await this.$myRequest({
					url: 'agreement/list',
					data: {
						cid,
						name,
						user_id: this.$store.state.userInfo.user_id
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
				let res = await this.$myRequest({
					url: 'agreement/detail',
					data: {
						id: this.id,
						user_id: this.user_id
					}
				});
				if (res && res.code==-1) {
					uni.showToast({
						title:res.message,
						icon:'none'
					})
					return;
				}
				uni.navigateTo({
					url: "../detail/cooperDetail?url="+item.link
				})
			}
		}
	}
</script>

<style>

</style>
