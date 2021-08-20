<template>
	<view class="box">
		<lawyercard1 :showline="true" :zixun="true"  @updatefollow="updateFollow" :lawyerlist="lawyerList" @buy="buy" class="dis"></lawyercard1>
	</view>
</template>

<script>
	import lawyercard1 from '@/pages/components/lawyercard1/lawyercard1.vue'
	export default{
		components: {
			lawyercard1
		},
		data(){
			return{
				isMore: true,
				page: 1,
				limit: 10,
				lawyerList: [],
				id: '',
				name: '',
				case_type: '',
				cityid: '',
				level: '',
				age: '',
				typeData: null,
				ttt: null,
			}
		},
		onLoad() {
			let that = this
			uni.request({
				url:'https://layer.boyaokj.cn/api/layer/myFollow',
				method:'GET',
				data:{
					user_id:uni.getStorageSync('userInfo').user_id,
					page:1,
					limit:10
				},
				success(res) {
					console.log(res.data.data)
					that.lawyerList = res.data.data
				}
			})
		},
		onReachBottom() {
			let that = this
		  that.getnewsList();
		},
		methods:{
			updateFollow(fllow){
				this.lawyerList[0].follow = fllow==1?0:1;
			},
			getnewsList(){
				let that = this
				that.page++
				uni.request({
					url:'https://layer.boyaokj.cn/api/layer/myFollow',
					method:'GET',
					data:{
						user_id:uni.getStorageSync('userInfo').user_id,
						page:that.page,
						limit:that.limit
					},
					success(res) {
						for(let i in res.data.data){
							that.lawyerList.push(res.data.data[i])
						}
					}
				})
			}
		}
	}
</script>

<style>
	page{
		background: #F4F7F7;
	}
	.serviceBtn{
		display: none;
	}
	.dis{
		margin-top: 20rpx;
	}
</style>
