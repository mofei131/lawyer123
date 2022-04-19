<template>
	<view class="flex-column mx-start sx-stretch" style="padding: 20rpx;">
		<view class="flex-row" style="margin-bottom: 20rpx;">
			<textarea v-model="content" placeholder-style="color: rgba(153,153,153,1);font-size: 28rpx;font-family: PingFangSC-Regular;"
				placeholder="请输入您的问题,以便更好的为您推荐律师"
				style="flex: 1 1 auto;padding: 18rpx 0 0 25rpx;height:280rpx;background-color: #F4F4F4;border-radius: 8rpx;font-size:28rpx" />
		</view>

		<view class="flex-column mx-start sx-stretch"
			style="padding: 20rpx;background-color: #F4F4F4;border-radius: 8rpx;">
			<view style="margin:0 0 20rpx 10rpx;color: rgba(106,106,106,1);font-size: 24rpx;font-family: PingFangSC-Medium;">
				请选择事类型
			</view>
			<view class="flex-row mx-evenly sx-start wrap" style="align-items: flex-start;">
				<view v-for="(item,index) in bussinessTypes" :key="index" :class="{choose_item:true,item_on:item.id==case_type}"
					@tap="caseTypeChange(item)">{{item.name}}</view>

			</view>

		</view>
		<view class="flex-column mx-center sx-stretch"
			style="margin-top: 20rpx;flex: 0 0 auto;padding: 20rpx;background-color: #F4F4F4;border-radius: 8rpx;color: #6A6A6A;font-size: 24rpx;font-family: PingFangSC-Regular;">
			<view class="flex-row mx-center sx-center">
				<input class="uni-input" disabled="true" v-model="address" placeholder-style="font-size:24rpx;color:#6A6A6A"
					placeholder="请选择事发地" style="flex:1 1 auto;">
				<view class="flex-row mx-center sx-center" style="flex: 0 0 auto;margin-left:20rpx;" @tap="searchKeyWord">
					<view style="flex: 0 0 auto;margin-right: 10rpx;">请选择事发地</view>
					<fa-icon type="angle-right" color="#6A6A6A"></fa-icon>
				</view>
			</view>
		</view>

		<!-- <view class="page-section page-section-gap" style="flex:0 0 300rpx">
			<view class="flex-row mx-center sx-center">

				<input v-model="searchAddress" placeholder="搜索关键字" style="">
				<view @tap="searchKeyWord" style="margin: 20rpx 10rpx; border: 1px solid gray;">搜索</view>
			</view>
			<map id="map1" ref="map1" style="width: 100%; height: 300rpx;" :latitude="latitude" :longitude="longitude"
				:markers="markers" @tap="tap">
			</map>
		</view> -->
		<view class="flex-row mx-center sx-center" style="" v-if="source_id == '' ">
			<view class="flex-txt-center tijiao" @tap="commit"
				style="flex: 1 1 auto;margin: 20rpx;background-color: #57A9FF;color: #FFFFFF;">
				提交咨询
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		onLoad(param) {
			this.price = param.price;
			let userInfo = this.$store.state.userInfo;
			this.bussinessTypes = this.$store.state.bussinessTypes;
			console.log(this.bussinessTypes);
			this.userInfo = userInfo;
			this.layer_id = param.layer_id;
			this.user_id = userInfo.user_id;
			this.source_id = param.source_id
			// uni.getLocation({
			// 	type: 'wgs84',
			// 	geocode: true,
			// 	success: (res) => {
			// 		this.latitude = res.latitude;
			// 		this.longitude = res.longitude;
			// 		this.markers[0].latitude = res.latitude;
			// 		this.markers[0].longitude = res.longitude;
			// 		//地图跳转到 指定经纬度 的页面，有导航按钮，切换到高德地图app
			// 		// uni.openLocation({   
			// 		//             latitude: res.latitude,
			// 		//             longitude: res.longitude,
			// 		//             success: function (res) {
			// 		// 				console.log(JSON.stringify(res));
			// 		//                 console.log('success');
			// 		//             }
			// 		//         });
			// 	},
			// 	fail(res) {
			// 		console.log(res);
			// 	}
			// });



		},
		data() {
			return {
				layer_id: '',
				userInfo: null,
				user_id: null,
				bussinessTypes: [],
				content: '',
				case_type: '',
				address: '',
				lng: '',
				lat: '',
				price:'',
				source_id:''

				// searchAddress: '',
				// title: 'map',
				// markers: [{
				// 		id: 1,
				// 		title: '123',
				// 		latitude: 23.043594,
				// 		longitude: 113.160704,
				// 		iconPath: '/static/icon/icon1.png'
				// 	},

				// ],
			}
		},
		onShow() {
			let that = this
			uni.request({
				url:'https://layer.boyaokj.cn/api/service/getSourceDetail',
				method:'GET',
				data:{
					source_id:this.source_id
				},
				success(res) {
					console.log(res.data.data)
					that.content = res.data.data.content
					that.address = res.data.data.address
					that.case_type = res.data.data.case_type
					// for(let i in that.bussinessTypes){
					// 	if(that.bussinessTypes[i].id == res.data.data.case_type){
					// 		console.log(that.bussinessTypes.index())
					// 	}
					// }
				}
			})
		},
		methods: {
			caseTypeChange(e) {
				this.case_type = e.id;
			},
			async commit() {
				//跳转支付页面

				let {
					layer_id,
					user_id,
					content,
					case_type,
					address,
					lng,
					lat
				} = this.$data;
				if (!layer_id || !user_id) {
					uni.showToast({
						title: '用户数据异常，请重新登录',
						icon: 'none'
					})
					return;
				}
				if (!content || (content + '').trim() == '') {
					uni.showToast({
						title: '请输入咨询内容',
						icon: 'none'
					})
					return;
				}
				if (!case_type) {
					uni.showToast({
						title: '请选择案件类型',
						icon: 'none'
					})
					return;
				}
				if (!address || !lng || !lat) {
					uni.showToast({
						title: '请选择事发地址！',
						icon: 'none'
					})
					return;
				}
				let data = {
					layer_id,
					user_id,
					content,
					case_type,
					address,
					lng,
					lat,
				}
				console.log(data);
				
				uni.showLoading({
					title:'正在提交...'
				})
				let res = await this.$myRequest({
					url: 'service/tuwen',
					data
				});
				console.log("提交支付")
				console.log(res);
				uni.hideLoading();
				if (res && res.code==200) {
		
					uni.navigateTo({
						url:'../my/pay?id='+res.data.service_id+'&price='+this.price+'&typeId=1' +'&emitName='+'tochat'
					})
					
					uni.$on('tochat',()=>{
						console.log(res.data.service_id+'&layer_id='+this.layer_id+'&user_id='+this.user_id)
						console.log('--------------------------');
						console.log('--------------------------'+res.data.service_id+'&layer_id='+this.layer_id+'&user_id='+this.user_id);
						uni.navigateTo({
							url:'../chat/chat?source_id='+res.data.service_id+'&layer_id='+this.layer_id+'&user_id='+this.user_id
						})
					})
				
				}else{
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
			},
			searchKeyWord() {
				console.log('---' + this.searchAddress);
				let mapContext = uni.createMapContext("map1");
				uni.chooseLocation({
					keyword: this.searchAddress,
					success: (res) => {
						console.log(res) //name address  latitude  longitude
						this.address = res.address;
						this.lng = res.longitude;
						this.lat = res.latitude;
						// mapContext.moveToLocation({
						// 	longitude: res.longitude,
						// 	latitude: res.latitude,
						// 	success: (e) => {
						// 		console.log(JSON.stringify(e));
						// 		this.markers[0].longitude = res.longitude;
						// 		this.markers[0].latitude = res.latitude;
						// 	}
						// })
					}
				})




			},

			// tap(e) {
			// 	console.log(e);
			// 	this.markers[0].latitude = e.detail.latitude;
			// 	this.markers[0].longitude = e.detail.longitude;

			// }


		}
	}
</script>

<style>
	.tijiao{
		height: 76rpx;border-radius:40rpx;
	}
	.choose_item {
		flex: 0 0 120rpx;
		padding: 10rpx 10rpx;
		margin: 0 10rpx 10rpx 0;
		background-color: #E6E6E6;
		font-size: 24rpx;
		color: rgba(102,102,102,1);
		text-align: center;
		border-radius: 10rpx;
		border: 2rpx solid #E6E6E6;

	}

	.item_on {
		border: 2rpx solid rgba(64,169,255,1); 
		color: rgba(64,169,255,1);
	}
</style>
