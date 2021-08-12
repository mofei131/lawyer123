<template>
	<view class="flex-column mx-start sx-stretch b" style="padding: 20rpx;">
		<study marginBottom="20rpx" :learn="learn"></study>
	</view>
</template>

<script>
	import study from '../components/study/study.vue'

	export default {
		onLoad() {
			this.getLearn();
		},
		components: {
			study
		},
		data() {
			return {
				learn: []
			}
		},
		methods: {
			async getLearn() {
				let res = await this.$myRequest({
					url: 'article/list',
					methods: 'GET',
					data: {
						page: 1,
						limit: 5,
						user_id: this.$store.state.userInfo.user_id
					}
				});
				if (res && res.code == 200) {
					console.log(res.data);
					this.learn = res.data;
				} else {
					uni.showToast({
						title: '每日学法数据获取异常',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.b {
		background-color: $uni-bg-color;
	}
</style>
