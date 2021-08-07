<template>
	<view>
		<view class="orderlist">
			<view class="orderitem" v-for="(item,index) in list">
				<view class="top">
					<view>订单号:{{item.code}}</view>
					<view class="state" v-if="item.state == 0">已付款</view>
					<view class="state" v-if="item.state == 1">已完成</view>
				</view>
				<view class="cont">
					<view class="contleft">
						<image :src="item.headimg"></image>
					</view>
					<view class="contright">
						<view>{{item.name}}</view>
						<view>{{item.service}}</view>
						<view>￥{{item.price}}</view>
					</view>
				</view>
				<view class="bottom">
					<view v-if="item.state != -1">
						<view class="btn" v-if="item.state == 0">
							<view>联系律师</view>
						</view>
						<view class="btn" v-if="item.state == 1">
							<view>评价</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['list'],
	}
</script>

<style>
</style>
