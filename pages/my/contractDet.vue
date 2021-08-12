<template>
	<view>
		<view class="contractdet">
			<view  v-index = 'content'></view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content:'',
			}
		},
		onLoad(p){
			let that = this
			uni.request({
				url:'https://layer.boyaokj.cn/api/agreement/detail',
				method:'GET',
				data:{
					id:p.id,
					user_id:uni.getStorageSync('userInfo').id
				},
				success(res) {
					console.log(res.data.data.content)
					that.content = res.data.data.content
				}
			})
		}
	}
</script>

<style>
.contractdet{
	width: 710rpx;
	margin: auto;
	
}
</style>
