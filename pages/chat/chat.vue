<template>
	<view>
		<view class="tishi">
			<view>友情提示：客户已在本平台下单，本次沟通时间为30分钟，请高效沟通。</view>
		</view>
		<!-- 页面主体 -->
		<view class="flex-column mx-center sx-center" style="width: 100%;  background-color: #FFFFFF;">
			<view style="width: 100%;">
				<!-- IM 消息展示区 -->
				<gui-im-message background="#ffffff" :msgs="msgs" group="group1" :userid="user_id">
				</gui-im-message>
				<!-- 底部提交区 -->
				<gui-im-input @sendText="sendText" @chooseImage="chooseImage"></gui-im-input>
			</view>

		</view>
	</view>
</template>

<script>
	import guiImMessage from '../../components/gui-im-message.vue'
	import guiImInput from '../../components/gui-im-input.vue'
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {

		onUnload() {
			uni.switchTab({
				url: '/pages/index/index'
			})
			uni.closeSocket({
				success:()=> {
					console.log('已关闭socket....');
					console.log("-------");
					console.log(this.socketTask);
				}
			})
		},
		async onLoad(p) {

			console.log("----p---");
			console.log(p);
			console.log(this.$store.state.userInfo);
			this.source_id = p.source_id;
			// this.layer_id = p.layer_id;
			this.user_id = this.$store.state.userInfo.user_id;
		},
		async onShow() {
			this.msgs=[];
			await this.getMessage();
			if(!this.socketTask || this.socketTask.readyState!=1){
				this.openConnection();
			}
			
		},
		onHide() {},
		components: {
			guiImMessage,
			guiImInput
		},
		data() {
			return {
				user_id: '',
				source_id: '',
				// layer_id: '',
				msgs: [],
				faildMessage: '',
				count:0,
			}
		},
		methods: {
			...mapMutations(['commitWebsocketConnect', 'commitSocketInfo']),

			openConnection() {
				// 打开连接
				uni.closeSocket(); // 确保已经关闭后再重新打开
				this.socketTask = uni.connectSocket({
					url: 'wss://layer.boyaokj.cn/wss',
					header: {
						'content-type': 'application/json'
					},
					method: 'GET',
					success(res) {
						console.log('连接成功 connectSocket=', res);
					},
					fail: (err) => {
						this.count++;
						uni.showToast({
							title: '你的网络开小差了，重连中！',
							icon: 'none',
							duration: 3000
						})
						if(this.count<10){
							setTimeout(() => {
								this.openConnection();
							}, 1000)
						}
						
					}
				});
				
				uni.onSocketOpen(res => {
					uni.sendSocketMessage({
						data: JSON.stringify({
							"action": "bind",
							"data": {
								"source_id": this.source_id,
							}
						}),
						success:()=> {
							if(this.faildMessage){
								this.sendText(this.faildMessage)
							}
						},
						fail:(res)=> {
							this.count++;
							uni.showToast({
								title: '你的网络开小差了，重连中！',
								icon: 'none',
								duration: 3000
							})
							if(this.count<10){
								setTimeout(() => {
									this.openConnection();
								}, 1000)
							}
						}
					});

				});
				uni.onSocketMessage(res => {
					// this.getSocketMsg(res.data); // 监听到有新服务器消息
					let d = JSON.parse(res.data)
					if (d.type) return;
					let data = d.data;
					let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\/])+$/;
					if (data && data.source_id) {
						var item = {
							group: 'group1',
							uindex: data.user_id,
							contentType: 'txt',
							uname: data.userinfo.name,
							content: data.message,
							uface: data.userinfo.avater
						};
						this.msgs.push(item);
						for(let i in this.msgs){
							if(reg.test(this.msgs[i].content)){
								this.msgs[i].contentType = 'img'
							}
						}
						this.pageScroll();
					}
				});
				uni.onSocketError((res) => {
					this.count++;
					uni.showToast({
						title: '你的网络开小差了3，重连中！',
						icon: 'none',
						duration: 3000
					})
					if(this.count<10){
						setTimeout(() => {
							this.openConnection();
						}, 1000)
					}
				});
			},
			async chooseImage(msg) {
				let that = this
				console.log("---->图片")
				console.log(msg)
				uni.sendSocketMessage({
					data: JSON.stringify({
						"action": "sendMessage",
						"data": {
							"source_id": this.source_id,
							"user_id": this.user_id,
							"message": msg
						}
					}),
					success:()=> {
						this.pageScroll();
						this.faildMessage = '';
					},
					fail: (res) => {
						this.faildMessage = msg;
						uni.showToast({
							title: '你的网络开小差了，重连中！',
							icon: 'none',
							duration: 3000
						})
				
						this.openConnection();
				
					}
				});
			},
			async sendText(msg) {
				uni.sendSocketMessage({
					data: JSON.stringify({
						"action": "sendMessage",
						"data": {
							"source_id": this.source_id,
							"user_id": this.user_id,
							"message": msg
						}
					}),
					success:()=> {
						this.pageScroll();
						this.faildMessage = '';
					},
					fail: (res) => {
						this.faildMessage = msg;
						uni.showToast({
							title: '你的网络开小差了，重连中！',
							icon: 'none',
							duration: 3000
						})

						this.openConnection();

					}
				});
			},
			// 滚动条滚动 [ 有新消息可以自动滚动到底部 ]
			pageScroll: function() {
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 999999 + Math.random(),
						duration: 100
					});
				}, 200);
			},
			async getMessage() {
				return new Promise(async (resolve, reject) => {
					let res = await this.$myRequest({
						url: 'message/list',
						methods: 'GET',
						data: {
							source_id: this.source_id
						}
					});
					if (res && res.code == 200) {
						console.log('=====================getmessage==============');
						console.log(res);
						let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\/])+$/;
						res.data.forEach(item => {
							let d = {
								group: 'group1',
								uindex: item.user_id,
								uname: item.user.name,
								contentType: 'txt',
								content: item.message || '',
								uface: item.user.avater
							};
							this.msgs.push(d);
						})
						for(let i in this.msgs){
							if(reg.test(this.msgs[i].content)){
								this.msgs[i].contentType = 'img'
							}
						}
					}
					this.pageScroll();
					resolve(true);
				});

			}
		}
	}
</script>

<style>
	.tishi{
		height: 50rpx;
		font-size: 22rpx;
		color: #333;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
	}
</style>
