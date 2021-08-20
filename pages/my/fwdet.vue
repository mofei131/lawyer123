<template>
	<view>
		<view class="box">
			<view class="item">
				<view class="title">真实姓名:</view>
				<input disabled="true" type="text" v-model="name" />
			</view>
			<view class="item">
				<view class="title">手机号码:</view>
				<input disabled="true" type="number" v-model="phone" />
			</view>
			<view class="item">
				<view class="title">所在地:</view>
				<input disabled="true" type="text" v-model="address" />
			</view>
			<view class="item">
				<view class="title">案件类型:</view>
				<picker disabled="true" class="gather" @change="anjianChange" :value="index1" :range="array1" range-key="name">
					<view class="flex-row">
						<text>{{array1[index1].name}}</text>
					</view>
				</picker>
			</view>
			<view class="item">
				<view class="title">预算律师费:</view>
				<input disabled="true" type="text" v-model="price" />
			</view>
			<view class="duoshuru">
				<view class="dstitle">诉求</view>
				<textarea disabled="true" v-model="suqiu" placeholder="请描述诉求详情"></textarea>
			</view>
			<view class="duoshuru">
				<view class="dstitle">案件详情</view>
				<textarea disabled="true" v-model="anjian" placeholder="请描述案件详情"></textarea>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:'',
				phone:'',
				address:'',
				array1: [],
				index1: 0,
				price:'',
				suqiu:'',
				anjian:'',
				
			}
		},
		onLoad(p) {
			let that = this
			console.log(p)
			uni.request({
				url:'https://layer.boyaokj.cn/api/layer/getCaseType',
				success(res) {
					that.array1 = res.data.data
					console.log(res.data.data)
				}
			})
			uni.request({
				url:'https://layer.boyaokj.cn/api/service/getSourceDetail',
				method:'GET',
				data:{
					source_id:p.id
				},
				success(res) {
					console.log(res.data.data)
					that.name = res.data.data.name
					that.phone = res.data.data.mobile
					that.address = res.data.data.address
					that.index1 = res.data.data.case_type
					that.price = res.data.data.money
					that.suqiu = res.data.data.suqiu
					that.anjian = res.data.data.detail
				}
			})
		},
		methods:{
			anjianChange(e) {
				this.index1 = e.detail.value;
			},
		}
	}
</script>

<style>
	page{
		background: #F4F7F7;
	}
	.gather{
		width:520rpx;
		margin-left:30rpx;
		color:#5D6168;
		font-size:28rpx;
	}
	.btn{
		width: 680rpx;
		height: 76rpx;
		background: #40A9FF;
		border-radius: 39rpx;
		margin: auto;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 270rpx;
	}
	.duoshuru textarea{
		width: 681rpx;
		height: 151rpx;
		background: #F4F4F4;
		border-radius: 8rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		padding: 18rpx 10rpx 18rpx 10rpx;
		box-sizing: border-box;
	}
	.duoshuru{
		width: 680rpx;
		margin: auto;
	}
	.dstitle{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #51565D;
		margin: 33rpx 0 20rpx 0;
	}
	.item input{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #5D6168;
		margin-left: 30rpx;
		width: 520rpx;
	}
	.title{
		width: 168rpx;
		text-align-last: justify;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.box{
		width: 720rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: 25rpx auto;
		box-sizing: border-box;
		padding-bottom: 39rpx;
	}
	.item{
		height: 103rpx;
		width: 680rpx;
		margin: auto;
		border-bottom: 1rpx solid #e8e8e8;
		display: flex;
		align-items: center;
	}
</style>
