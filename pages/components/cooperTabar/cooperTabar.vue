<template>


	<view class="uni-list flex-row mx-evenly sx-center"
		style="margin: 20rpx 0;background-color: #FFFFFF;padding: 20rpx;border-radius: 10rpx;">
		<view class="uni-list-cell" style="margin-right: 40rpx;">


			<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex"
				:range="multiArray">
				<view class="uni-input flex-row">
					<!--{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，-->
					<text>{{multiArray[2][multiIndex[2]]}}</text>
					<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
				</view>
			</picker>



		</view>
		<view class="uni-list-cell" style="margin-right: 40rpx;">

			<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
				<view class="uni-input flex-row">
					<text>{{array[index].name}}</text>
					<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
				</view>
			</picker>

		</view>
		<view class="uni-list-cell" style="margin-right: 40rpx;">
			<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
				<view class="uni-input flex-row">
					<text>{{array[index].name}}</text>
					<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
				</view>
			</picker>
		</view>
		<view class="uni-list-cell" style="margin-right: 40rpx;">
			<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
				<view class="uni-input flex-row">
					<text>{{array[index].name}}</text>
					<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: ['searchChange'],
		data() {
			return {

				array: [{
					name: '中国'
				}, {
					name: '美国'
				}, {
					name: '巴西'
				}, {
					name: '日本'
				}],
				index: 0,
				multiArray: [
					['亚洲', '欧洲'],
					['中国', '日本'],
					['北京', '上海', '广州']
				],
				multiIndex: [0, 0, 0],


			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value;
				this.$emit("searchChange", 1)
			},
			bindMultiPickerColumnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				this.multiIndex[e.detail.column] = e.detail.value
				switch (e.detail.column) {
					case 0: //拖动第1列
						switch (this.multiIndex[0]) {
							case 0:
								this.multiArray[1] = ['中国', '日本']
								this.multiArray[2] = ['北京', '上海', '广州']
								break
							case 1:
								this.multiArray[1] = ['英国', '法国']
								this.multiArray[2] = ['伦敦', '曼彻斯特']
								break
						}
						this.multiIndex.splice(1, 1, 0)
						this.multiIndex.splice(2, 1, 0)
						break
					case 1: //拖动第2列
						switch (this.multiIndex[0]) { //判断第一列是什么
							case 0:
								switch (this.multiIndex[1]) {
									case 0:
										this.multiArray[2] = ['北京', '上海', '广州']
										break
									case 1:
										this.multiArray[2] = ['东京', '北海道']
										break
								}
								break
							case 1:
								switch (this.multiIndex[1]) {
									case 0:
										this.multiArray[2] = ['伦敦', '曼彻斯特']
										break
									case 1:
										this.multiArray[2] = ['巴黎', '马赛']
										break
								}
								break
						}
						this.multiIndex.splice(2, 1, 0)
						break
				}
				this.$forceUpdate()
			},



		}
	}
</script>

<style>
</style>
