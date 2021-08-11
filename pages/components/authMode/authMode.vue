<template>
	<view v-if="dialogShow" class="flex-column mx-center sx-stretch" style="padding: 20rpx 0;animation: mymove 0.5s;position:fixed ;top: 0;left: 0;margin: 0 auto;background-color: #FFFFFF;height: 200rpx;width: 100%;border-radius:0 0 40rpx 40rpx;">
		<view class="flex-column mx-center sx-center" style="flex:1 1 auto;margin-top: 60rpx;">
			<view>授权提示</view>
			<view>小程序想获取用户头像等信息</view>
		</view>
		<view class="flex-row mx-center sx-center" style="flex:0 0 80rpx;padding: 20rpx;">
			<button @tap="close"  style="flex:1 1 auto;margin-right: 40rpx;" class="mini-btn" type="default" size="mini">取消</button>
			<button @tap="dialogConfirm" style="flex:1 1 auto" class="mini-btn" type="primary" size="mini">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
			
			
		},
		props: ['confirm'],
		mounted() {
			
		
		},
		data() {
			return {
			dialogShow:false
	
			}
		},
		computed: {
	
		},
		methods: {
			dialogConfirm(e) {
				this.$emit('confirm')
			},
			close(e) {
				this.dialogShow =false;
			},
			open(){
				this.dialogShow =true;
			},
	
	
		}
	}
</script>

<style>
</style>
