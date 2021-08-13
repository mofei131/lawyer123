<template>
	<view class="flex-column mx-start sx-stretch b" style="padding: 20rpx;">
		<anli marginBottom="20rpx" :anli="anli"></anli>
	</view>
</template>

<script>
	import anli from '../components/anli/anli.vue'
	
	export default {
		components: {
			anli
		},
		onLoad() {
			this.getAnli();
		},
		data() {
			return {
				anli: [],
				page:1,
				limit:10
			}
		},
		methods: {
			async getAnli(){
				let res = await this.$myRequest({
					url: 'service/selectCase',
					methods: 'GET',
					data: {
						page: this.page,
						limit: this.limit,
						layer_id:'',
					}
				});
				if (res && res.code == 200) {
					console.log(res.data);
					this.anli = res.data;
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
	.b{
		background-color: $uni-bg-color;
	}
</style>
