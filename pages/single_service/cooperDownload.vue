<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">

		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 20rpx;">

			<view class="flex-row mx-center sx-center">
				<uni-search-bar style="flex:0 0 600rpx;" border="1rpx solid #fff" placeholder="请输入模板名称"
					bgColor="#ffffff" :cancel-text="text" radius="100" @confirm="search" :focus="true"
					v-model="searchValue" @input="input" @cancel="cancel" @change="change" @clear="clear">
				</uni-search-bar>
			</view>


			<uni-collapse :accordion="true" @change="change">
				<!-- 因为list默认带一条分隔线，所以使用 titleBorder="none" 取消面板的分隔线 -->

				<uni-collapse-item v-for="(item,index) in dataSource" :key="item.id" class="collapse-item" title-border="none" :border="false">
					<template v-slot:title>
						<view
							:class="['flex-row','mx-between', 'sx-center','collapse-line',currentIndex!='' && currentIndex==0?'current':'']">
							<view>{{item.name}}</view>
							<!-- <view>{{item.value}}</view> -->
						</view>

					</template>
					<view class="content flex-column">
						<view @tap="todetail(item1)"  v-for="(item1,index1) in item.child" :key="item1.id" class="collapse-content flex-txt-left-center">
							{{item1.name}}</view>
					</view>
				</uni-collapse-item>



				<!-- <uni-collapse-item class="collapse-item" title-border="none" :border="false">
					<template v-slot:title>
						<view
							:class="['flex-row ','mx-between', 'sx-center','collapse-line',currentIndex==1?'current':'']">
							<view>企业公民常用合同</view>
							<view>123</view>
						</view>

					</template>
					<view class="content flex-column">
						<view class="collapse-content flex-txt-left-center">折叠内容主体，可自定义内容及样式</view>
						<view class="collapse-content flex-txt-left-center">折叠内容主体，可自定义内容及样式</view>
						<view class="collapse-content flex-txt-left-center">折叠内容主体，可自定义内容及样式</view>
					</view>
				</uni-collapse-item>
				<uni-collapse-item class="collapse-item" title-border="none" :border="false">
					<template v-slot:title>
						<view
							:class="['flex-row ','mx-between', 'sx-center','collapse-line',currentIndex==2?'current':'']">
							<view>借贷担保</view>
							<view>123</view>
						</view>

					</template>
					<view class="content flex-column">
						<view class="collapse-content flex-txt-left-center">折叠内容主体，可自定义内容及样式</view>
						<view class="collapse-content flex-txt-left-center">折叠内容主体，可自定义内容及样式</view>
						<view class="collapse-content flex-txt-left-center">折叠内容主体，可自定义内容及样式</view>
					</view>
				</uni-collapse-item>
				<uni-collapse-item class="collapse-item" title-border="none" :border="false">
					<template v-slot:title>
						<view
							:class="['flex-row ','mx-between', 'sx-center','collapse-line',currentIndex==3?'current':'']">
							<view>公用合同</view>
							<view>123</view>
						</view>

					</template>
					<view class="content flex-column">
						<view class="collapse-content flex-txt-left-center">折叠内容主体，可自定义内容及样式</view>
						<view class="collapse-content flex-txt-left-center">折叠内容主体，可自定义内容及样式</view>
						<view class="collapse-content flex-txt-left-center">折叠内容主体，可自定义内容及样式</view>
					</view>
				</uni-collapse-item> -->
			</uni-collapse>

		</view>


	</view>
</template>

<script>
	export default {
		components: {},
		onLoad() {
			this.getModelLevel1();
		},
		data() {
			return {
				text: '',
				currentIndex: '',
				searchValue: '',
				dataSource: []

			}
		},
		methods: {
			async getModelLevel1() {
				let res = await this.$myRequest({
					url: 'agreement/getClassify',
					data: {}
				});
				if (res && res.data) {
					console.log(res);
					this.dataSource =  res.data
				}
			},
			
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			input(res) {
				console.log('----input:', res)
			},
			clear(res) {
				uni.showToast({
					title: 'clear事件，输入值为：' + res.value,
					icon: 'none'
				})
			},
			blur(res) {
				uni.showToast({
					title: 'blur事件，输入值为：' + res.value,
					icon: 'none'
				})
			},
			cancel(res) {
				uni.showToast({
					title: '点击取消，输入值为：' + res.value,
					icon: 'none'
				})
			},
			change(e) {
				console.log(e);
				this.currentIndex = e;
			},
			todetail(item1){
				uni.navigateTo({
					url:`../list/cooperModuleList?cid=${item1.id}&name=${item1.name}`
				})
			}

		}
	}
</script>

<style>
	.collapse-item {
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.collapse-line {
		height: 100rpx;
		padding: 0 18rpx;
	}

	.collapse-content {
		height: 100rpx;
		;
		border-top: 2rpx solid #ccc;
		padding: 0 20rpx;
	}

	.current {
		color: #40A9FF;
	}
</style>


