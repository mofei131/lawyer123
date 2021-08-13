<template>
	<view>
		<view class="contractdet">
			<view  v-html="content"></view>
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
					user_id:uni.getStorageSync('userInfo').user_id
				},
				success(res) {
					// console.log(res.data.data.content)
					that.content = res.data.data.content
				}
			})
		}
	}
</script>

<style>
page{
		background: #F4F7F7;
	}
	.contractdet{
		width: 720rpx;
		margin: auto;
		border-radius: 10rpx;
		background: #fff;
		
		padding: 20rpx;
	}
</style>
