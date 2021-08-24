<template>
	<view>
		<!-- 页面主体 -->
		<view class="flex-column mx-center sx-center" style="width: 100%;  background-color: #FFFFFF;">
			<view style="width: 100%;">
				<!-- IM 消息展示区 -->
				<gui-im-message background="#ffffff" :msgs="msgs" group="group1" :userid="user_id">
				</gui-im-message>
				<!-- 底部提交区 -->
				<gui-im-input @sendText="sendText"></gui-im-input>
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
			this.layer_id = p.layer_id;
			this.user_id = this.$store.state.userInfo.user_id;
			this.userAvator = this.$store.state.userInfo.avater;
			this.userName = this.$store.state.userInfo.nickname;
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
				userName: '',
				userAvator: '',
				lawyerName: '',
				lawyerAvator: '',
				page: 1,
				limit: 10,
				user_id: '',
				source_id: '',
				layer_id: '',
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
					if (data && data.source_id) {
						var item = {
							group: 'group1',
							uindex: data.user_id,
							contentType: 'txt',
							uname: data.user_id == this.user_id ? this.userName : this.lawyerName,
							content: data.message,
							uface: data.user_id == this.user_id ? this.userAvator : this.lawyerAvator
						};
						this.msgs.push(item);
						this.pageScroll();
					}
				});
				uni.onSocketError((res) => {
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
					let result = await this.$myRequest({
						url: 'layer/detail',
						methods: 'GET',
						data: {
							user_id: '',
							layer_id: this.layer_id
						}
					});
					if (result && result.code == 200) {
						this.lawyerAvator = result.data.photo;
						this.lawyerName = result.data.name;
					}

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
						res.data.forEach(item => {
							// 		if (item.user_id == this.user_id && (!this.userAvator || !this.userName)) {
							// 			this.userName = item.user.name;
							// 			this.userAvator = item.user.avater;
							// 		}

							let d = {
								group: 'group1',
								uindex: item.user_id,
								uname: item.user_id == this.user_id ? this.userName : this
									.lawyerName,
								contentType: 'txt',
								content: item.message || '',
								uface: item.user_id == this.user_id ? this.userAvator : this
									.lawyerAvator
							};
							this.msgs.push(d);
						})
					}
					this.pageScroll();
					resolve(true);
				});

			}
		}
	}
</script>

<style>

</style>
