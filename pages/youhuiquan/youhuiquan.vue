<template>
	<view class="flex-column mx-start sx-stretch" style="padding: 20rpx;min-height: 1000rpx;">
		<view class="flex-row mx-start sx-center">
			<view style="flex: 0 0 auto;">
				<pickcity @getcity="getCity"></pickcity>
			</view>
			<uni-search-bar style="flex:1 1 auto;" border="1rpx solid rgba(244,244,244,1)" placeholder="请输入模板名称"
				bgColor="rgba(244,244,244,1)" :cancel-text="closeText" radius="100" @confirm="search" :focus="true"
				v-model="searchValue" @input="input" @clear="clear">
			</uni-search-bar>
		</view>

		<view class="flex-row mx-center sx-center" style="margin: 20rpx;">
			<view :class="{quan_on:flag==1,quan_off:flag!=1}"
				style="line-height: 60rpx;text-align: center;flex: 0 0 200rpx;height: 60rpx;border-radius: 30rpx 0 0 30rpx;"
				@tap="flag=1">未使用</view>
			<view :class="{quan_on:flag==2,quan_off:flag!=2}"
				style="line-height: 60rpx;text-align: center;flex: 0 0 200rpx;height: 60rpx;border-radius: 0 30rpx 30rpx 0;"
				@tap="flag=2">不可用</view>
		</view>
		<view v-for="(item,index) in [1,2,3]" :key='index' class="flex-row mx-start sx-stretch backImgFull youhuiquan"
			style="background-image: url(../../static/images/youhuiquan.png);">
			<view class="flex-column mx-center sx-center" style="flex: 0 0 218rpx;">
				<view class="flex-row mx-center sx-center" style="color: rgba(255,255,255,1);">
					<text style="font-size: 32rpx;">￥</text>
					<text style="font-size: 57rpx;">1388</text>
				</view>
				<text style="color: rgba(255,255,255,0.5);font-size: 24rpx;">满40元可用</text>
			</view>
			<view class="flex-column mx-end sx-stretch" style="padding-left: 40rpx;flex: 1 1 auto;line-height: 36rpx;">

				<view class="flex-row mx-between sx-end" style="flex:1 1 auto;">
					<view class="flex-column mx-end sx-stretch">
						<view class="ellipsis quan_title">
							老王家肉火腿
						</view>
						<text style="color: rgba(255,255,255,0.5);font-size: 24rpx;">{{usertime('2020-2020')}}</text>

					</view>
					<view class="flex-row mx-center sx-center" style="align-self: center;margin-right: 20rpx;">
						<view class="flex-txt-center lingqu" style="background-color: rgba(182,100,247,1);">
							<text style="color: rgba(255,255,255,1);font-size: 24rpx;">立即领取</text>
						</view>
					</view>
				</view>
				<text lines="1" class="ellipsis" style="width:400rpx;color: rgba(255,255,255,0.5);margin-bottom: 20rpx;
										font-size: 24rpx;"> 贵州省毕节地区金沙县桃园路904号</text>

			</view>


		</view>




	</view>

</template>

<script>
	import pickcity from '@/pages/components/pickcity/pickcity.vue'

	export default {
		components: {
			pickcity
		},
		data() {
			return {
				flag: 1,
				array1: [{
					name: '北京',
				}, {
					name: '上海',
				}],
				index1: 0,

				closeText: '',
				searchValue: ''
			}
		},
		onLoad: function() {
			console.log(this.$store.state);
		},
		methods: {
			getCity(e){
				
			},
			input(e) {
				console.log(e);
			},
			clear(e) {
				console.log(e);
			},
			search(e) {

			},
			anjianChange: function(e) {
				//返回选择的数组下标
				this.index1 = e.detail.value;

			},
		},
		computed: {
			usertime(e) {
				return (e) => {
					console.log(this);
					console.log(e);
					return '2020.10.10 - 2020.20.20'
				}
			}
		}
	}
</script>

<style>
	.quan_on {
		border: 2rpx solid #65ADF6;
		background-color: #65ADF6;
		color: #FFFFFF;
	}

	.quan_off {
		border: 2rpx solid #65ADF6;
		background-color: #FFFFFF;
		color: gray;

	}

	.youhuiquan {
		flex: 0 0 173rpx;
		margin-bottom: 20rpx;
	}

	.quan_title {
		width: 270rpx;
		color: #FFFFFF;
		font-size: 26rpx;
		margin-bottom: 10rpx;
	}

	.lingqu {
		height: 48rpx;
		border-radius: 24rpx;
		width: 139rpx;
	}
</style>
