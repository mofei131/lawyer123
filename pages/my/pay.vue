<template>
	<view>
		<view class="itemlist">
			<view class="listitem flex-row mx-start sx-center">
				<!-- <view v-if="typeInfo[arr.typeId]" class="backImgCenter imggg"
					:style="{backgroundImage: `url(${typeInfo[arr.typeId].url})`}"></view> -->
						<image v-if="name != ''" class="imggg" mode="aspectFit" src="@/static/icon/icon7.png"></image>
						<view v-if="name != ''" style="margin: 0 20rpx;flex:1 1 auto">{{name}}</view>
						<view v-if="name != ''" >{{price}}</view>
				<image v-if="typeInfo[arr.typeId]" class="imggg" mode="aspectFit" :src="typeInfo[arr.typeId].url"></image>
				<view v-if="typeInfo[arr.typeId]" style="margin: 0 20rpx;flex:1 1 auto">{{typeInfo[arr.typeId].name}}</view>
				<view>￥{{arr.price}}</view>
			</view>
			<view class="paylist">
				<view class="wxpay">
					<image src="@/static/icon/wxicon.png"></image>
					<view>微信支付</view>
				</view>
				<image @tap="agreementSuccess" class="fix"
					:src="agreement==true?'../../static/icon/ty1.png':'../../static/icon/ty0.png'"></image>
			</view>
			<view class="nowpay">
				<button @tap="show()">立即支付</button>
			</view>
		</view>
		<tankuang :box='box' v-show="hide" v-on:submit="submit" v-on:show="show" v-on:cak="cak"></tankuang>
	</view>
</template>



<script>
	import tankuang from '../components/tankuang/tankuang.vue'
	export default {
		components:{
			tankuang
		},
		data() {
			return {
				hide:false,
				box:{
					title:'常年法律顾问协议'
				},
				emitName:'',
				typeInfo: {
					1: {
						name: '图文咨询',
						url: '/static/icon/icon1.png'
					},
					2: {
						name: '电话咨询',
						url: '/static/icon/icon2.png'
					},
					3: {
						name: '见面咨询',
						url: '/static/icon/icon3.png'
					},
					4: {
						name: '合同审核',
						url: '/static/icon/icon6.png'
					},
					5: {
						name: '律师函',
						url: '/static/icon/icon7.png'
					},
					6: {
						name: '债务催收指导',
						url: '/static/icon/icon8.png'
					},
					7: {
						name: '代写起诉状/答辩状',
						url: '/static/icon/icon9.png'
					},
					8: {
						name: '代写借/欠条',
						url: '/static/icon/icon10.png'
					},
					9: {
						name: '刑事会见',
						url: '/static/icon/icon11.png'
					},
					10: {
						name: '聘请律师',
						url: '/static/icon/icon4.png'
					},
					11: {
						name: '合同模板',
						url: '/static/icon/icon5.png'
					},
					12: {
						name: '每日学法',
						url: '/static/icon/icon7.png'
					},
					// 13: {
					// 	name: '套餐1',
					// 	url: '/static/icon/icon7.png'
					// },
					// 14: {
					// 	name: '套餐2',
					// 	url: '/static/icon/icon7.png'
					// },
					// 15: {
					// 	name: '套餐3',
					// 	url: '/static/icon/icon7.png'
					// },
					// 16: {
					// 	name: '套餐4',
					// 	url: '/static/icon/icon7.png'
					// },
				},
				arr: {
					id: '',
					chapter: '',
					price: '',
					typeId: ''
				},
				agreement: true,
				name:'',
				price:'',
				id:''
			}
		},
		onLoad(options) {
			this.arr.id = options.id
			// this.arr.chapter = options.chapter
			this.arr.typeId = options.typeId || ''
			console.log(options);
			this.arr.price = options.price;
			this.emitName = options.emitName;
			this.name = options.name;
			this.id = options.id
		},
		computed: {

		},
		methods: {
			cak(){
				uni.navigateTo({
					url:'../components/tankuang/xiyichangnian'
				})
			},
			show(){
				this.hide = !this.hide
			},
			agreementSuccess() {
				this.agreement = !this.agreement;
			},
			async submit() {
				let emitName = this.emitName;
				console.log(emitName);
				if (this.agreement == false) {
					uni.showToast({
						title: "请勾选支付方式",
						icon: 'none'
					})
				} else {
					console.log("支付---------")
					console.log({
						user_id: this.$store.state.userInfo.user_id,
						source_id: this.arr.id
					});
					let res = await this.$myRequest({
						url: 'wechat/payCenter',
						methods: 'GET',
						data: {
							user_id: this.$store.state.userInfo.user_id,
							source_id: this.id
						}
					});
					console.log("之父1")
					console.log(res)
					if (res.code == -1) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					} else {
						console.log(res);
						let {appId,nonceStr,package:pp,paySign,signType,timeStamp,timestamp,orderno} = res.data;
	
						uni.getProvider({
							service:'payment',
							success:(res)=> {
								uni.requestPayment({
									timeStamp,
									provider:res.provider[0],
									orderInfo:{orderno:orderno},
									nonceStr,
									package:pp,
									signType,
									paySign,
									success: (res) => {
										//调整到成功页面
										uni.navigateTo({
											url:'/pages/my/finish?emitName='+emitName
										})
										
									},fail(res) {
										console.log(res);
										console.log(emitName);
										// if(emitName){
										// 	// console.log('---'+emitName);
										// 	uni.$emit(emitName,{ispay:true});
										// }
										
									}
								})
							},fail(res) {
							
								uni.showToast({
									title:'支付失败:'+res.errMsg,
									icon:'none'
								})
							}
						})
						
					}

				}

			}
		}
	}
</script>

<style>
	.itemlist {
		width: 710rpx;
		margin: auto;
	}

	.listitem {
		display: flex;
		height: 147rpx;
		justify-content: space-between;
		padding-top: 54rpx;
		box-sizing: border-box;
	}

	/* .listitem view:nth-child(1){
		margin: auto;
	} */
	.listitem view:nth-child(1) {
		color: #FF4D4F;
		font-size: 36rpx;
	}

	.wxpay {
		display: flex;
	}

	.wxpay image {
		width: 84rpx;
		height: 84rpx;
	}

	.wxpay view {
		margin: 24rpx 0 0 13rpx;
	}

	.fix {
		width: 40rpx;
		height: 40rpx;
		/* padding-top: 24rpx; */
		margin-top: 24rpx;
		box-sizing: border-box;
	}

	.paylist {
		display: flex;
		justify-content: space-between;
	}

	.nowpay button {
		width: 680rpx;
		height: 76rpx;
		background: #1890FF;
		border-radius: 39rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-size: 24rpx;
		text-align: center;
		display: block;
		line-height: 70rpx;
		color: #fff;
		margin-top: 154rpx;
	}

	.imggg {
		width: 80rpx;
		height: 80rpx;
	}
</style>
