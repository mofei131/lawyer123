<template>
	<view class="flex-column mx-start sx-stretch b" style="padding: 20rpx;">
		<anli marginBottom="20rpx" :anli="anli"></anli>
		<view v-if="!isMore" style="text-align: center;font-size: 36rpx;color: gray;margin-top: 20rpx;">
			没有数据了!</view>
	</view>
</template>

<script>
	import anli from '../components/anli/anli.vue'
	
	export default {
		components: {
			anli
		},
		onLoad(p) {
			this.name = p.name
			this.getAnli();
			
			// let that = this
			// uni.request({
			// 	url: 'https://layer.boyaokj.cn/api/service/selectCase',
			// 	methods: 'GET',
			// 	data: {
			// 		page: this.page,
			// 		limit: this.limit,
			// 		layer_id:'',
			// 		name:p.name
			// 	},
			// 	success(res) {
			// 		console.log(res.data)
			// 		 that.anli = res.data.data;
			// 		// for(let i in res.dat){
			// 		// 	that.anli.push(res.data[i])
			// 		// }
			// 	}
			// })
			
		},
		onPullDownRefresh() {
			this.isMore = true;
			this.page = 1;
			this.anli = [];
			this.getAnli();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			uni.showNavigationBarLoading();
			this.isMore=true;
			this.getAnli();
			setTimeout(function() {
				uni.hideNavigationBarLoading()
			}, 1000);
		
		},
		data() {
			return {
				anli: [],
				page:1,
				limit:10,
				name:null,
				isMore:true
			}
		},
		methods: {
			async getAnli(){
				uni.showLoading({
					title:'加载数据',
					icon:'none'
				})
				let res = await this.$myRequest({
					url: 'service/selectCase',
					methods: 'GET',
					data: {
						page: this.page,
						limit: this.limit,
						layer_id:'',
						name:this.name
					}
				});
				uni.hideLoading();
				if (res && res.code == 200) {
					console.log(res.data);
					if (res.data.length > 0) {
						console.log('有数据');
						for (let s of res.data) {
							let f = this.anli.find(item2 => item2.id == s.id);
							if (!f) {
								this.anli.push(s)
							}
						}
						this.page += 1;
					} else {
						console.log('无数据');
						this.isMore = false;
					}
					// this.anli = res.data;
				} else {
					uni.showToast({
						title: '请稍后再试',
						icon: 'none'
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.b{
		background-color: $uni-bg-color;
	}
</style>
