<template>
	<view class="flex-column mx-start sx-stretch b" :style="{padding: '20rpx',minHeight: getWindowHeight}">
		<study marginBottom="20rpx" :learn="learn"></study>
		<view v-if="!isMore" style="text-align: center;font-size: 36rpx;color: gray;margin-top: 20rpx;">
			没有数据了!</view>
	</view>
</template>

<script>
	import study from '../components/study/study.vue'
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		onLoad() {
			this.getLearn();
		},
		components: {
			study
		},
		computed: {
			...mapGetters([
				'getWindowHeight',
			]),
		},
		data() {
			return {
				learn: [],
				page:1,
				limit:10,
				isMore:true
			}
		},
		onPullDownRefresh() {
			this.isMore = true;
			this.page = 1;
			this.learn = [];
			this.getLearn();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			uni.showNavigationBarLoading();
			this.isMore = true;
			this.getLearn();
			setTimeout(function() {
				uni.hideNavigationBarLoading()
			}, 1000);
		
		},
		methods: {
			async getLearn() {
				uni.showLoading({
					title:'加载中'
				})
				console.log({
						page: this.page,
						limit: this.limit,
						user_id: this.$store.state.userInfo.user_id
					});
				let res = await this.$myRequest({
					url: 'article/list',
					methods: 'GET',
					data: {
						page: this.page,
						limit: this.limit,
						user_id: this.$store.state.userInfo.user_id
					}
				});
				uni.hideLoading();
				if (res && res.code == 200) {
					console.log(res.data);
					
					if (res.data.length > 0) {
						console.log('有数据');
						for (let s of res.data) {
							console.log(s.id);
							let f = this.learn.find(item2 => item2.id == s.id);
							if (!f) {
								this.learn.push(s)
							}
						}
						this.page += 1;
					} else {
						console.log('无数据');
						this.isMore = false;
					}
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
