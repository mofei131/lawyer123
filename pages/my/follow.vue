<template>
	<view>
		<lawyercard1 :zixun="true" :lawyerlist="lawyerList" @buy="buy"></lawyercard1>
	</view>
</template>

<script>
	import lawyercard1 from '@/pages/components/lawyercard1/lawyercard1.vue'
	export default{
		components: {
			lawyercard1
		},
	}
</script>

<style>
</style>
