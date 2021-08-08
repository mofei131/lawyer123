<template>
	<view class="flex-column mx-start sx-stretch b" style="padding: 20rpx;">
		<study marginBottom="20rpx" :learn="learn"></study>
	</view>
</template>

<script>
	import study from '../components/study/study.vue'
	
	export default {
		components: {
			study
		},
		data() {
			return {
				learn: [{
						id: 0,
						cover: 'https://www.51sphere.com/upload/content/2021/04/25/39131619344825.jpg',
						title: '南方只要不被沃尔玛收购',
						content: '南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购',
						name: '朱海滨',
						status: '安心首席律师',
						stage: '69',
						price: 0
					},
					{
						id: 1,
						cover: 'https://www.51sphere.com/upload/content/2021/04/25/39131619344825.jpg',
						title: '南方只要不被沃尔玛收购',
						content: '南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购',
						name: '朱海滨',
						status: '安心首席律师',
						stage: '5',
						price: 0
					},
					{
						id: 2,
						cover: 'https://www.51sphere.com/upload/content/2021/04/25/39131619344825.jpg',
						title: '南方只要不被沃尔玛收购',
						content: '南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购南方只要不被沃尔玛收购',
						name: '朱海滨',
						status: '安心首席律师',
						stage: '15',
						price: 192.00
					}
				]
			}
		},
		methods: {
		
		}
	}
</script>

<style lang="scss" scoped>
	.b{
		background-color: $uni-bg-color;
	}
</style>
