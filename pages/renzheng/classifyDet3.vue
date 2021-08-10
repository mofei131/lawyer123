<template>
	<view>
		<view class="modtitle">
			<view class="blue"></view>
			<view>第三步:资料设置</view>
		</view>
		<view class="collect">
			<!-- <view class="intitem">
				<view class="tips">执业证号：</view>
				<input class="gather" type="number" value="" placeholder="请输入号码" v-model="zhenghao" placeholder-style="color: #C1C2C3;"/>
			</view> -->
			<view class="intitem">
				<view class="tips">所属城市：</view>
				<picker class="gather" @change="anjianChange" :value="index" :range="array" range-key="years">
					<view class="flex-row">
						<text>{{array1[index1].years}}</text>
						<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
					</view>
				</picker>
			</view>
		<view class="boder"></view>
			<view class="intitem">
				<view class="tips">所属律所：</view>
				<input class="gather" type="text" value="" placeholder="请输入所属律所" v-model="unit" placeholder-style="color: #C1C2C3;"/>
			</view>
		<view class="boder"></view>
		<view class="intitem">
			<view class="tips">毕业院校：</view>
			<input class="gather" type="text" value="" placeholder="请输入毕业院校" v-model="college" placeholder-style="color: #C1C2C3;"/>
		</view>
		<view class="boder"></view>
			<view class="intitem">
				<view class="tips">学历：</view>
				<picker class="gather" @change="anjianChange1" :value="index1" :range="array1" range-key="record">
					<view class="flex-row">
						<text>{{array1[index1].record}}</text>
						<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
					</view>
				</picker>
			</view>
			<view class="boder"></view>
			<view class="intitem">
				<view class="tips">专业：</view>
				<input class="gather" type="text" value="" placeholder="请输入专业" v-model="major" placeholder-style="color: #C1C2C3;"/>
			</view>
			<view class="boder"></view>
			<view class="imgitem">
				<view class="imgtitle">个人简介：</view>
				<textarea class="mark" type="text" v-model="mark" placeholder="请输入你的个人简介" placeholder-style="color: #999999;"></textarea>
			</view>
			<!-- <view class="kong"></view> -->
			
	</view>
	<view class="next" @tap="submit()">提交</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				unit:'',
				college:'',
				array1: [{
					record: '本科',
				}, {
					record: '大专',
				}],
				index1: 0,
				major:'',
				mark:''
			}
		},
		methods:{
			anjianChange1(e) {
				this.index1 = e.detail.value;
			},
			submit(){
				
			}
		}
	}
</script>

<style>
	page{
		background: #F4F7F7;
	}
	.modtitle{
		width: 680rpx;
		margin: 20rpx auto;
		display: flex;
	}
	.blue{
		width: 6rpx;
		height: 28rpx;
		background: #40a9ff;
		margin-top: 6rpx;
	}
	.modtitle view{
		font-size: 28rpx;
		font-family: Helvetica;
		color: #51565D;
		margin-left: 9rpx;
	}
	.collect{
		width: 720rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
		padding-bottom: 30rpx;
	}
	.intitem{
		display: flex;
		height: 108rpx;
		width: 680rpx;
		margin: auto;
		padding-top: 35rpx;
		box-sizing: border-box;
	}
	.tips{
		width: 170rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.gather{
		width: 510rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #5D6168;
	}
	.boder{
		height: 1rpx;
		width: 680rpx;
		margin: auto;
		background: #E8E8E8;
	}
	.intitem picker{
		width: ;
	}
	.kong{
		width: 680rpx;
		height: 12rpx;
		background: #FAFAFA;
		margin: auto;
	}
	.imgtitle{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		width: 680rpx;
		margin: auto;
		margin-top: 30rpx;
		margin-bottom: 10rpx;
	}
	.classfiyimg{
		width: 680rpx;
		margin: auto;
		display: block;
	}
	.next{
		width: 680rpx;
		height: 76rpx;
		background: #40A9FF;
		border-radius: 39rpx;
		font-size: 28rpx;
		font-family: Helvetica;
		color: #FFFFFF;
		margin: 53rpx auto;
		text-align: center;
		padding-top: 20rpx;
		box-sizing: border-box;
	}
	fa-icon{
		margin-right: 20rpx;
	}
	.flex-row{
		display: flex;
		justify-content: space-between;
	}
	.mark{
		width: 710rpx;
		height: 280rpx;
		background: #F4F4F4;
		border-radius: 8rpx;
		margin: 20rpx auto;
		box-sizing: border-box;
		padding: 20rpx 30rpx 20rpx 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
	}
</style>
