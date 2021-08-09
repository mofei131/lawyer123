<template>


	<view class="uni-list flex-row mx-between sx-center"
		style="margin-bottom: 20rpx;background-color: #FFFFFF;padding: 20rpx;border-radius: 10rpx;font-size: 28rpx;">
		<view class="uni-list-cell">
			<pickcity @getcity="getCity"></pickcity>
		</view>
		<view class="uni-list-cell">
			<picker @change="anjianChange" :value="index1" :range="array1" range-key="name">
				<view class=" flex-row mx-center sx-center">
					<text>{{array1[index1].name}}</text>
					<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
				</view>
			</picker>
		</view>
		<view class="uni-list-cell">
			<picker @change="lvshiChange" :value="index2" :range="array2" range-key="name">
				<view class=" flex-row mx-center sx-center">
					<text>{{array2[index2].name}}</text>
					<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
				</view>
			</picker>
		</view>
		<view class="uni-list-cell">
			<picker @change="workAgeChange" :value="index3" :range="array3" range-key="name">
				<view class=" flex-row mx-center sx-center">
					<text>{{array3[index3].name}}</text>
					<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	import pickcity from '@/pages/components/pickcity/pickcity.vue'

	export default {
		components: {
			pickcity
		},
		props: ['searchChange'],
		mounted() {

		},
		data() {
			return {
				
				array1: [{
					name: '刑事纠纷',
				}, {
					name: '交通事故',
				}],
				index1: 0,
				array2: [{
					name: '初级',
				}, {
					name: '中级',
				}],
				index2: 0,
				array3: [{
					name: '5年',
				}, {
					name: '10年',
				}],
				index3: 0,

			}
		},
		computed: {
			// citiesArr(){
			// 	console.log('===========');
			// 	let temp = this.$store.state.provinces;
			// 	let provinces = temp.map(item => item.province);
			// 	let cities = this.getCity(temp[0].provinceid);
			// 	return [provinces,cities]
			// }
		},
		methods: {
			getCity(e){
				console.log(e);
				this.$emit("searchChange", e)
			},
			anjianChange: function(e) {
				//返回选择的数组下标
				this.index1 = e.detail.value;
				this.$emit("searchChange", 1)
			},
			lvshiChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index2 = e.detail.value;
				this.$emit("searchChange", 1)
			},
			workAgeChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index3 = e.detail.value;
				this.$emit("searchChange", 1)
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value;
				this.$emit("searchChange", 1)
			},
			

		}
	}
</script>

<style>
	.uni-list-cell {
		flex: 0 0 auto;
	}
</style>
