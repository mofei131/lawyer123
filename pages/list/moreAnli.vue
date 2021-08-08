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
		data() {
			return {
				anli: [{
						id: 0,
						sort: '买卖合同',
						title: '发展提供高质量数据——第四次fd经济论坛第四次fd经济论坛',
						address: '山东青岛',
						name: '张三',
						portrait: 'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg',
						read: '1783'
					},
					{
						id: 1,
						sort: '婚姻家庭',
						title: '发展提供高质量数据——第四次fd经济论坛第四次fd经济论坛',
						address: '山东潍坊',
						name: '李四',
						portrait: 'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg',
						read: '32'
					},
					{
						id: 2,
						sort: '为高质量',
						title: '发展提供高质量数据——第四次fd经济论坛第四次fd经济论坛',
						address: '山东烟台',
						name: '王五',
						portrait: 'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg',
						read: '544'
					},
					{
						id: 3,
						sort: '为高质量',
						title: '发展提供高质量数据——第四次fd经济论坛第四次fd经济论坛',
						address: '山东日照',
						name: '赵六',
						portrait: 'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg',
						read: '6'
					},
				],
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
