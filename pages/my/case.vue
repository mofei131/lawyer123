<template>
	<view>
		<ordercard :list = 'list'></ordercard>
	</view>
</template>

<script>
	import ordercard from '../components/ordercard/ordercard.vue'
	export default{
		components:{
			ordercard
		},
		data(){
			return{
				page:1,
				limit:10,
				list:[],	
			}
		},
		onLoad(p) {
			let that = this
			uni.request({
				url:'https://layer.boyaokj.cn/api/order/anjian_list',
				method:'GET',
				data:{
					user_id:uni.getStorageSync('userInfo').user_id,
					page:that.page,
					limit:that.limit
				},
				success(res) {
					console.log(res.data.data)
					that.list = res.data.data
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
					url:'https://layer.boyaokj.cn/api/order/anjian_list',
					method:'GET',
					data:{
						user_id:uni.getStorageSync('userInfo').user_id,
						page:that.page,
						limit:that.limit
					},
					success(res) {
						for(let i in res.data.data){
							that.list.push(res.data.data[i])
							console.log()
						}
					}
				})
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
</style>
