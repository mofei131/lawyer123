<template>
	<view>
		<view class="head">
			<view class="search">
				<image src="@/static/images/search.png"></image>
				<input type="text" placeholder="请输入搜索内容" placeholder-style="color:#fff;font-size:20rpx;" />
			</view>
		</view>
		<view class="lawyerlist">
			<view class="lawyeritem" v-for="(item,index) in lawyer" :key="index">
				<view class="lawyeritemtop">
					<view class="lawyeritemtopleft">
						<image :src="item.portrait"></image>
					</view>
					<view class="lawyeritemtopright">
						<view class="name">{{item.name}}</view>
						<view class="seat">
							<view class="address">{{item.address}}</view>
							<view class="unit">{{item.unit}}</view>
						</view>
						<view class="field">
						<view class="label" v-for="(list,index1) in item.field" :key="index1" :class="list.class">{{list.name}}</view>
						</view>
						<view class="other">
							<view>职业年限：<text>{{item.workyer}}</text>年</view>
							<view>案例：<text>{{item.case}}</text>件</view>
							<view>好评：<text>{{item.praise}}</text>次</view>
						</view>
					</view>
				</view>
				<view class="lawyeritembottom">
					<view class="zixun_price">
						<view>图文咨询:<text>￥{{item.sms_price}}</text></view>
						<view>电话咨询:<text>￥{{item.phone_price}}</text></view>
						<view>见面咨询:<text>￥{{item.meet_price}}</text></view>
					</view>
					<view class="zixun_more">查看更多</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				lawyer:[
					{
						id:0,
						name:'王长田',
						portrait:'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg',
						address:'山东潍坊',
						unit:'山东衡明律师事务所',
						field:[{name:"交通",class:'green'},
						{name:"婚姻",class:'blue'},
						{name:"合同",class:'pink'},
						{name:"审核",class:'purple'},
						{name:"诉状",class:'yellow'}],
						workyer:9,
						case:968,
						praise:98,
						sms_price:87,
						phone_price:128,
						meet_price:345,
						state:1
					}
				]
			}
		}
	}
</script>

<style>
	.head{
		width: 750rpx;
		height: 176rpx;
		background: #40A9FF;
		padding-top: 80rpx;
		box-sizing: border-box;
	}
	.search{
		width: 500rpx;
		height: 44rpx;
		background: rgb(255,255,255,.34);
		border-radius: 32rpx;
		display: flex;
		margin-left: 15rpx;
	}
	.search image{
		width: 26rpx;
		height: 26rpx;
		margin: 9rpx 0 0 16rpx;
	}
	.search input{
		margin-left: 10rpx;
		color: #fff;
		width: 400rpx;
	}
	.lawyeritemtopleft{
		width: 148rpx;
	}
	.lawyeritemtopright{
		width: 546rpx;
		margin-left: 16rpx;
		position: relative;
	}
	.lawyeritemtopleft image{
		width: 125rpx;
		height: 125rpx;
		border-radius: 77rpx;
		margin-left: 23rpx;
	}
	.lawyeritemtop{
		display: flex;
	}
	.name{
		color: #333333;
		font-size: 28rpx;
		margin-bottom: 11rpx;
	}
	.seat{
		display: flex;
		color: #666;
		font-size: 24rpx;
		margin-bottom: 13rpx;
	}
	.field{
		display: flex;
		margin-bottom: 13rpx;
	}
	.label{
		width: 50rpx;
		height: 20rpx;
		background: #26CD93;
		border-radius: 2rpx;
		font-size: 14rpx;
		color: #fff;
		line-height: 22rpx;
		margin-right: 6rpx;
		text-align: center;
	}
	.gree{
		background: #26CD93;
	}
	.blue{
		background: #5F91F6;
	}
	.pink{
		background: #ED538A;
	}
	.purple{
		background: #6765FF;
	}
	.yellow{
		background: #E1B12F;
	}
	.other{
		display: flex;
		justify-content: space-between;
		color: #999999;
		font-size: 20rpx;
	}
	.other text{
		color: #FF4D4F;
	}
	.lawyeritemtop{
		padding: 24rpx 0 4rpx 0;
		border-bottom: 1rpx solid #ddd;
	}
	.lawyerlist{
		width: 710rpx;
		margin: auto;
	}
	.unit{
		margin-left: 10rpx;
	}
	.lawyeritembottom,.zixun_price{
		display: flex;
		justify-content: space-around;
	}
	.lawyeritembottom{
		width: 710rpx;
		margin: auto;
		margin-top: 16rpx;
	}
	.zixun_price{
		width: 560rpx;
	}
	.zixun_price view{
		width: 174rpx;
		height: 40rpx;
		border-radius: 4rpx;
		border: 1rpx solid #40A9FF;
	}
	.lawyeritembottom view{
		color: #40A9FF;
		font-size: 24rpx;
		text-align: center;
		/* line-height: 24px; */
	}
	.lawyeritembottom text{
		color: #FF4D4F;
	}
	.zixun_more{
		width: 120rpx;
		height: 40rpx;
		border-radius: 4rpx;
		border: 1rpx solid #40A9FF;
	}
</style>
