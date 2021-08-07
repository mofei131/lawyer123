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
				list:[
					{
						code:'12408372859',//订单号
						state:0,//是否完成(0已完成，1已付款,-1没有事件按钮)
						name:'王长田',
						service:'电话咨询服务',
						headimg:'https://avatar.52pojie.cn/data/avatar/001/14/64/55_avatar_small.jpg',
						price:'1398.00'
					},{
						code:'12408372860',//订单号
						state:1,//是否完成(0已完成，1已付款,-1没有事件按钮)
						name:'王长田',
						service:'图文咨询服务',
						headimg:'https://avatar.52pojie.cn/data/avatar/001/14/64/55_avatar_small.jpg',
						price:'1698.00'
					}
				]
			}
		}
	}
</script>

<style>
</style>
