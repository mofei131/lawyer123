<template>
	<view>
		<view class="contractlist">
			<view class="contractitem" v-for="(item,index) in contract" @click="toUrl(item.id)">
				<view>{{item.name}}</view>
				<image src="../../static/icon/myrighticon.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				contract:[
					{id:0,name:'合同1'},
					{id:1,name:'合同2合同2合同2合同2合同2合同2合同2合同2合同2合同2合同2合同2合同2合同2合同2合同2合同2合同2合同2合同2合同2合同2'},
					{id:2,name:'合同3合同2合同2合同2合同2合同2合同2合同2合同2合同2合同2'},
				]
			}
		},
		methods:{
			toUrl(e){
				uni.navigateTo({
					url:'./contractDet?id='+e
				})
			}
		}
	}
</script>

<style>
	page{
		background: #F4F7F7;
	}
	.contractitem{
		width: 720rpx;
		height: 96rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		display: flex;
		margin: 20rpx auto;
		justify-content: space-between;
		padding-left: 27rpx;
		padding-right: 27rpx;
		box-sizing: border-box;
		padding-top: 27rpx;
	}
	.contractitem image{
		width: 19rpx;
		height: 32rpx;
	}
	.contractitem view{
		width: 600rpx;
		white-space:nowrap;
		   overflow:hidden;
		   text-overflow:ellipsis;
	}
</style>
