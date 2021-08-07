<template>
	<view>
		<view class="contractdet">
			<rich-text  :nodes = 'content'></rich-text>
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
			console.log(p)
		}
	}
</script>

<style>
.contractdet{
	width: 710rpx;
	margin: auto;
}
</style>
