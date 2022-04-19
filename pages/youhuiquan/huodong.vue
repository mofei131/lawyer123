<template>
	<view class="databox">
		<uni-search-bar style="flex:1 1 auto;" border="1rpx solid rgba(244,244,244,1)" placeholder="请输入活动名称"
			bgColor="rgba(244,244,244,1)" :cancel-text="closeText" radius="100" @confirm="search" :focus="true"
			v-model="name" @input="input" @clear="clear">
		</uni-search-bar>
		<view class="datalist" v-for="(item,index) in dataList" :key="index" @click="todet(item.id)">
			<view class="dlleft">
				<image :src="item.images[0]"></image>
			</view>
			<view class="dlright">
				<view class="dlrtop">
					<view class="iti">{{item.name}}</view>
				</view>
				<view class="dlrbot">
					<view class="dlrbot1">
						<view class="shangming">{{item.subtitle}}</view>
						<view class="jiage">￥{{item.price}}</view>
					</view>
					<view class="dlrbot2">
						<view class="riqi">{{item.starttime}} ~ {{item.endtime}} </view>
						<view class="goumai" @click.stop="topay(item)">立即购买</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				page:1,
				limit:10,
				name:'',
				dataList:[],
				closeText: '',
			}
		},
		onLoad() {
			let userInfo = uni.getStorageSync('userInfo');
			if (!userInfo || !userInfo.user_id || !userInfo.avater || !userInfo.nickname) {
				uni.switchTab({
					url:'../index/index'
				})
			}
		},
		onShow() {
			this.listcha()
		},
		onReachBottom() {
			this.page += 1
		  this.getnewsList();
		},
		methods:{
			input(e) {
				this.name = e;
				if (this.ttt) {
					clearTimeout(this.ttt)
				}
				this.ttt = setTimeout(() => {
					this.listcha();
				}, 1500)
			},
			listcha(){
				let that = this
				uni.request({
					url:'https://layer.boyaokj.cn/api/act/list',
					method:'GET',
					data:{
						page:this.page,
						limit:this.limit,
						name:this.name
					},
					success(res) {
						console.log(res.data.data)
						if(that.page == 1){
							that.dataList = res.data.data
						}else{
							if(res.data.data.length != 0){
								for(let i in res.data.data){
									that.dataList.push(res.data.data[i])
								}
							}
						}
					}
				})
			},
			topay(item){
				uni.navigateTo({
					url:'./hdpay?id='+item.id+'&name='+item.name+'&price='+item.price
				})
			},
			todet(id){
				uni.navigateTo({
					url:'./huodongDet?id='+id
				})
			}
		}
	}
</script>

<style>
	.databox{
		padding-top: 20rpx;
	}
	.goumai{
		width: 120rpx;
		height: 36rpx;
		background: #40A9FF;
		border-radius: 4rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.riqi{
		font-size: 21rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
	}
	.dlrbot2{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.dlrbot1{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}
	.jiage{
		font-size: 28rpx;
		font-family: Helvetica;
		color: #FF4D4F;
	}
	.shangming{
		font-size: 21rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		width: 320rpx;
		white-space:nowrap;
		overflow:hidden;
		text-overflow: ellipsis;
	}
	.dlright{
		width: 496rpx;
		margin-left: 18rpx;
	}
	.datalist{
		display: flex;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin-bottom: 20rpx;
		padding: 20rpx 17rpx;
		box-sizing: border-box;
		margin: auto;
	}
	.iti{
		height: 56rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #323232;
		line-height: 29rpx;
		display: -webkit-box;
		overflow: hidden;  
		-webkit-line-clamp: 2;
		 -webkit-box-orient: vertical;
	}
	.dlleft image{
		width: 196rpx;
		height: 142rpx;
		border-radius: 7rpx;
	}
	page{
		background: #F8F8F8;
	}
</style>
