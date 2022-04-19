<template>
	<view>
		<view v-if="status == 1">
			<view class="option1">
				<view class="real" :class="[dian == 3?'qie':'']" @tap="decide()">直推（{{direct.count}}）</view>
				<view class="empty2" :class="[dian == 2?'qie':'']" @tap="decide2()">间推（{{indirect.count}}）</view>
				<view class="empty" :class="[dian == 1?'qie':'']" @tap="decide3()">业务员（{{indirect2.count}}）</view>
			</view>
			<view class="direct" v-if="dian == 3">
				<view class="directitem" v-for="(item,index) in direct.list" :key='index'>
					<image :src="item.avater"></image>
					<view>{{item.nickname}}</view>
				</view>
			</view>
			<view class="direct" v-if="dian == 2">
				<view class="directitem" v-for="(item,index) in indirect.list" :key='index'>
					<image :src="item.avater"></image>
					<view>{{item.nickname}}</view>
				</view>
			</view>
			<view class="direct" v-if="dian == 1">
				<view class="directitem" v-for="(item,index) in indirect2.list" :key='index'>
					<image :src="item.avater"></image>
					<view>{{item.nickname}}</view>
				</view>
			</view>
		</view>
	<view v-else>
		<view class="option">
			<view class="real" :class="[dian == 3?'qie':'']" @tap="decide()">直推（{{direct.count}}）</view>
			<view class="empty" :class="[dian == 2?'qie':'']" @tap="decide2()">间推（{{indirect.count}}）</view>
		</view>
		<view class="direct" v-if="dian == 3">
			<view class="directitem" v-for="(item,index) in direct.list" :key='index'>
				<image :src="item.avater"></image>
				<view>{{item.nickname}}</view>
			</view>
		</view>
		<view class="direct" v-if="dian == 2">
			<view class="directitem" v-for="(item,index) in indirect.list" :key='index'>
				<image :src="item.avater"></image>
				<view>{{item.nickname}}</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				judge:true,
				direct:[],
				indirect:[],
				indirect2:[],
				status:uni.getStorageSync('userInfo').status,
				dian:3,
				page:1,
				limit:20
			}
		},
		onLoad() {
			let that = this
			uni.request({
				url:'https://layer.boyaokj.cn/api/commission/getList',
				method:'GET',
				data:{
					user_id:uni.getStorageSync('userInfo').user_id,
					type:1,
					page:this.page,
					limit:this.limit
				},
				success(res) {
					that.direct = res.data.data
				}
			})
			uni.request({
				url:'https://layer.boyaokj.cn/api/commission/getList',
				method:'GET',
				data:{
					user_id:uni.getStorageSync('userInfo').user_id,
					type:2,
					page:this.page,
					limit:this.limit
				},
				success(res) {
					that.indirect = res.data.data
				}
			})
			uni.request({
				url:'https://layer.boyaokj.cn/api/commission/getList',
				method:'GET',
				data:{
					user_id:uni.getStorageSync('userInfo').user_id,
					type:3,
					page:this.page,
					limit:this.limit
				},
				success(res) {
					that.indirect2 = res.data.data
				}
			})
		},
		onReachBottom() {
			this.page +=1
			this.chang()
		},
		methods:{
			chang(){
				let that = this
				if(this.dian == 3){
					uni.request({
						url:'https://layer.boyaokj.cn/api/commission/getList',
						method:'GET',
						data:{
							user_id:uni.getStorageSync('userInfo').user_id,
							type:1,
							page:this.page,
							limit:this.limit
						},
						success(res) {
							if(res.data.data.list.length != 0){
								for(let i in res.data.data.list)
								that.direct.list.push(res.data.data.list[i])
							}else{
								uni.showToast({
									title:'没有了',
									icon:'none'
								})
							}
						}
					})
				}else if(this.dian == 2){
					uni.request({
						url:'https://layer.boyaokj.cn/api/commission/getList',
						method:'GET',
						data:{
							user_id:uni.getStorageSync('userInfo').user_id,
							type:2,
							page:this.page,
							limit:this.limit
						},
						success(res) {
							if(res.data.data.list.length != 0){
								for(let i in res.data.data.list)
								that.indirect.list.push(res.data.data.list[i])
							}else{
								uni.showToast({
									title:'没有了',
									icon:'none'
								})
							}
						}
					})
				}else{
					uni.request({
						url:'https://layer.boyaokj.cn/api/commission/getList',
						method:'GET',
						data:{
							user_id:uni.getStorageSync('userInfo').user_id,
							type:3,
							page:this.page,
							limit:this.limit
						},
						success(res) {
							if(res.data.data.list.length != 0){
								for(let i in res.data.data.list)
								that.indirect2.list.push(res.data.data.list[i])
							}else{
								uni.showToast({
									title:'没有了',
									icon:'none'
								})
							}
						}
					})
				}
			},
			decide3(){
					this.dian = 1
					this.page = 1
			},
			decide2(){
					this.dian = 2
					this.page = 1
			},
			decide(){
					this.dian = 3
					this.page = 1
			}
		}
	}
</script>

<style>
	page{
		background: #F4F7F7;
	}
	.option1{
		width: 710rpx;
		height: 63rpx;
		border-radius: 34rpx;
		/* border: 1px solid #40A9FF; */
		display: flex;
		margin: 25rpx auto;
	}
	.option{
		width: 470rpx;
		height: 63rpx;
		border-radius: 34rpx;
		/* border: 1px solid #40A9FF; */
		display: flex;
		margin: 25rpx auto;
	}
	.qie{
		background: #40A9FF!important;
		color: #FFFFFF!important;
	}
	.real{
		width: 240rpx;
		height: 63rpx;
		background: #fff;
		border-radius: 32px 0px 0px 32px;
		border: 1px solid #40A9FF;
		font-size: 25rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #464646;
		text-align: center;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.empty2{
		width: 240rpx;
		height: 63rpx;
		background: #fff;
		border: 1px solid #40A9FF;
		font-size: 25rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #464646;
		text-align: center;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.empty{
		width: 240rpx;
		height: 63rpx;
		background: #fff;
		border-radius:0px 32px 32px 0px;
		border: 1px solid #40A9FF;
		font-size: 25rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #464646;
		text-align: center;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.directitem{
		width: 710rpx;
		height: 108rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		display: flex;
		padding: 24rpx 0 24rpx 0;
		margin: auto;
		margin-bottom: 16rpx;
		box-sizing: border-box;
	}
	.directitem image{
		width: 56rpx;
		height: 56rpx;
		border: 4rpx solid #007AFF;
		border-radius: 36rpx;
		margin: 0 37rpx 0 30rpx;
	}
	.directitem view{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #666666;
		margin-top: 8rpx;
	}
</style>
