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
				list:[
					// {
					// 	code:'12408372859',//订单号
					// 	state:-1,//是否完成(0已完成，1已付款,-1没有事件按钮)
					// 	name:'企业法律顾问服务',
					// 	service:'3',
					// 	headimg:'https://avatar.52pojie.cn/data/avatar/001/14/64/55_avatar_small.jpg',
					// 	price:'69.00'
					// },{
					// 	code:'12408372860',//订单号
					// 	state:-1,//是否完成(0已完成，1已付款,-1没有事件按钮)
					// 	name:'企业法律顾问服务',
					// 	service:'1',
					// 	headimg:'https://avatar.52pojie.cn/data/avatar/001/14/64/55_avatar_small.jpg',
					// 	price:'98.00'
					// }
				]
			}
		},
		onLoad(p) {
			// console.log(p)
			let that = this
			uni.request({
				url:'https://layer.boyaokj.cn/api/order/jiaoyi_list',
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
				let page = that.page+1
				let limit = that.limit+10
				uni.request({
					url:'https://layer.boyaokj.cn/api/order/jiaoyi_list',
					method:'GET',
					data:{
						user_id:uni.getStorageSync('userInfo').user_id,
						page:page,
						limit:limit
					},
					success(res) {
						if(res.data.data = []){
							uni.showToast({
								title: '没有更多了',
								icon: 'none',
							})
						}else{
							for(let i in res.data.data){
								that.list.push(res.data.data[i])
							}
						}
						
					}
				})
			}
		}
	}
</script>

<style>
</style>
