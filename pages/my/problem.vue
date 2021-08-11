<template>
	<view class="about">
		<!-- <view v-html="content"></view> -->
		<rich-text  :nodes = 'content'></rich-text>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content: ''
			}
		},
		onLoad() {
			// let that = this
			// this.http.ajax({
			// 	url: 'index/xieyi',
			// 	method: 'GET',
			// 	data: {
			// 		name: 'guanyu',
			// 	},
			// 	success: function(res) {
			// 		that.content = res.data.value
			// 	}
			// });
		},
	}
</script>

<style>
</style>
