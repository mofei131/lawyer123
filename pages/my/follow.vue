<template>
	<view>
		<lawyercard1 :zixun="true" :lawyerlist="lawyerList" @buy="buy"></lawyercard1>
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
					that.lawyerList = res.data.data
				}
			})
		},
		onReachBottom() {
			let that = this
		  that.getnewsList();
		},
		methods:{
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
</style>
