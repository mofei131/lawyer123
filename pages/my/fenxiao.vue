<template>
	<view>
		<view class="option">
			<view class="real" :class="[judge?'qie':'']" @tap="decide()">直推（{{direct.length}}）</view>
			<view class="empty" :class="[!judge?'qie':'']" @tap="decide()">间推（{{indirect.length}}）</view>
		</view>
		<view class="direct" v-if="judge">
			<view class="directitem" v-for="(item,index) in direct" :key='index'>
				<image :src="item.headimg"></image>
				<view>{{item.name}}</view>
			</view>
		</view>
		<view class="direct" v-if="!judge">
			<view class="directitem" v-for="(item,index) in indirect" :key='index'>
				<image :src="item.headimg"></image>
				<view>{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				judge:true,
				direct:[
					{id:0,name:'怎么肥四',headimg:'https://avatar.52pojie.cn/data/avatar/001/14/64/55_avatar_small.jpg'},
					{id:1,name:'怎么肥五',headimg:'https://avatar.52pojie.cn/data/avatar/001/14/64/55_avatar_small.jpg'},
					{id:2,name:'怎么肥六',headimg:'https://avatar.52pojie.cn/data/avatar/001/14/64/55_avatar_small.jpg'},
					{id:3,name:'怎么肥七',headimg:'https://avatar.52pojie.cn/data/avatar/001/14/64/55_avatar_small.jpg'}
				],
				indirect:[
					{id:0,name:'怎么肥零',headimg:'https://avatar.52pojie.cn/data/avatar/001/14/64/55_avatar_small.jpg'},
					{id:1,name:'怎么肥一',headimg:'https://avatar.52pojie.cn/data/avatar/001/14/64/55_avatar_small.jpg'},
					{id:2,name:'怎么肥二',headimg:'https://avatar.52pojie.cn/data/avatar/001/14/64/55_avatar_small.jpg'},
					{id:3,name:'怎么肥三',headimg:'https://avatar.52pojie.cn/data/avatar/001/14/64/55_avatar_small.jpg'},
					{id:3,name:'怎么肥肥',headimg:'https://avatar.52pojie.cn/data/avatar/001/14/64/55_avatar_small.jpg'}
				]
			}
		},
		methods:{
			decide(){
				// console.log(this.judge)
				if(this.judge){
					this.judge = false
				}else{
					this.judge = true
				}
			}
		}
	}
</script>

<style>
	page{
		background: #F4F7F7;
	}
	.option{
		width: 480rpx;
		height: 63rpx;
		border-radius: 32rpx;
		border: 1px solid #40A9FF;
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
		padding-top: 15rpx;
		box-sizing: border-box;
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
		padding-top: 15rpx;
		box-sizing: border-box;
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
