<template>
	<view>
		<ordercard :list = 'list'></ordercard>
	</view>
</template>

<script>
	import ordercard from '../components/ordercard2/ordercard2.vue'
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
			
		},
		onShow() {
			let that = this
			uni.request({
				url:'https://layer.boyaokj.cn/api/order/shouli_anjian_list',
				method:'GET',
				data:{
					user_id:uni.getStorageSync('userInfo').user_id,
					page:that.page,
					limit:that.limit
				},
				success(res) {
					console.log(res.data.data)
					that.list = res.data.data
					that.id = res.data.data.source_id
				}
			})
		},
		onReachBottom() {
			let that = this
		  that.getnewsList();
		},
		methods:{
			child(){
				this.$refs.child.det()
			},
			det(id){
				uni.navigateTo({
					url:'./fwdet?id='+id
				})
			},
			getnewsList(){
				let that = this
				that.page++
				uni.request({
					url:'https://layer.boyaokj.cn/api/order/shouli_anjian_list',
					method:'GET',
					data:{
						user_id:uni.getStorageSync('userInfo').user_id,
						page:that.page,
						limit:that.limit
					},
					success(res) {
						console.log(res.data.data)
						for(let i in res.data.data){
							that.list.push(res.data.data[i])
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
