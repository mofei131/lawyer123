<template>
	<view class="flex-column mx-start sx-stretch" style="background-color: #F4F7F7;min-height: 750px;">

		<view class="flex-column mx-start sx-stretch" style="flex: 0 0 auto;padding: 20rpx;">

			<view class="flex-row mx-center sx-center">
				<uni-search-bar style="flex:0 0 600rpx;" border="1rpx solid #fff" placeholder="请输入模板名称"
					bgColor="#ffffff" :cancel-text="text" radius="100" :focus="true" v-model="name" @input="input" 
					@cancel="cancel" @clear="clear">
				</uni-search-bar>
				<view style="padding: 10rpx;font-size: 32rpx;border-radius: 10rpx;background-color: #0095ff;color: #FFFFFF;"
					@tap="search">搜索</view>
			</view>


			<uni-collapse :accordion="true" >
				<!-- 因为list默认带一条分隔线，所以使用 titleBorder="none" 取消面板的分隔线 -->

				<uni-collapse-item v-for="(item,index) in dataSource" :key="item.id" class="collapse-item"
					title-border="none" :border="false">
					<template v-slot:title>
						<view
							:class="['flex-row','mx-between', 'sx-center','collapse-line',currentIndex!='' && currentIndex==0?'current':'']">
							<view>{{item.name}}</view>
							<!-- <view>{{item.value}}</view> -->
							<view style="color: #40A9FF;">{{item.count}}</view>
						</view>

					</template>
					<view class="content flex-column">
						<view @tap="todetail(item1)" v-for="(item1,index1) in item.child" :key="item1.id"
							class="collapse-content flex-txt-left-center">
							{{item1.name}}<text class="shuzi">{{item1.count}}</text>
						</view>
					</view>
				</uni-collapse-item>
				

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
				name: '',
				cid: '',
				text: '',
				user_id: '',
				currentIndex: '',
				dataSource: [],
				wid:''
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
					this.dataSource = res.data
				}
			},

			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			search() {
				this.todetail2();
			},
			input(res) {
				this.name = res;
				console.log('----input:', res)
			},
			clear(res) {
				
			},
			blur(res) {
				
			},
			cancel(res) {
				
			},
			// todetail(item1){
			// 	// console.log(this.name)
			// 	if(item1){
			// 		this.cid = item1.id;
			// 		// this.name = item1.name;
					
			// 	}
			// 	uni.navigateTo({
			// 		// url: `../list/cooperModuleList?cid=${this.cid}`
			// 		url: `../list/cooperModuleList?cid=${this.cid}&name=${this.name}`
			// 	})
			// },
			todetail(item1){
				// console.log(this.name)
				if(item1){
					this.cid = item1.id;
					// this.name = item1.name;
					uni.navigateTo({
						// url: `../list/cooperModuleList?cid=${this.cid}`
						url: `../list/cooperModuleList?cid=${this.cid}&name=0`
					})
				}
			},
			todetail2(){
					uni.navigateTo({
						// url: `../list/cooperModuleList?cid=${this.cid}`
						url: `../list/cooperModuleList?cid=${this.wid}&name=${this.name}`
					})
			},
		}
	}
</script>

<style>
	.content{
		display: flex;
		flex-wrap: wrap;
		flex-direction: inherit;
	}
	.shuzi{
		color: #40A9FF;
		margin-left: 10rpx;
	}
	.collapse-content{
		width: 350rpx!important;
		box-sizing: border-box;
		justify-content: center;
		height: 80rpx!important;
		margin: unset!important;
		
	}
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
		border-top: 1rpx solid #e8e8e8;
		padding: 0 20rpx;
		width: 600rpx;
		margin: auto;
	}

	.current {
		color: #40A9FF;
	}
</style>
