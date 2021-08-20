<template>
	<view>
		<view class="contractlist">
			<view class="contractitem" v-for="(item,index) in contract" @click="toUrl(item.agreement_id)" :key="index">
				<view>{{item.name}}</view>
				<image src="../../static/images/righticon.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				page:1,
				contract:[],
				limit:10
			}
		},
		onLoad(){
			let that = this
			uni.request({
				url:'https://layer.boyaokj.cn/api/agreement/myDownload',
				method:'GET',
				data:{
					user_id:uni.getStorageSync('userInfo').user_id,
					page:that.page,
					limit:10
				},
				success(res) {
					that.contract = res.data.data
				}
			})
		},
		onReachBottom() {
				this.searchChange()
		},
		methods:{
			toUrl(e){
				uni.navigateTo({
					url:'./contractDet?id='+e
				})
			},
			searchChange(e) {
						let that = this
						that.page++
						uni.request({
							url:'https://layer.boyaokj.cn/api/agreement/myDownload',
							method:'GET',
							data:{
								user_id:uni.getStorageSync('userInfo').user_id,
								page:that.page,
								limit:that.limit
							},
							success(res) {
								for(let i in res.data.data){
									that.contract.push(res.data.data[i])
								}
							}
						})
					}
		}
	}
</script>

<style>
	page{
		background: #F4F7F7;
		height: 100%;
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
