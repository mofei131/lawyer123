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
				url:'/pages/index/index'
			})
		},
		onLoad(p) {
			console.log(p);
			console.log(this.$store.state.userInfo);
			this.source_id = p.source_id;
			this.layer_id = p.layer_id;
			this.user_id = this.$store.state.userInfo.user_id;
			console.log('用户id：',this.user_id);
			// this.isSelf = this.user_id == this.$store.state.userInfo.user_id;



			if (this.$store.state.websocketConnect) {
				uni.sendSocketMessage({
					data: JSON.stringify({
						"action": "bind",
						"data": {
							"source_id": this.source_id,
						}
					}),
					fail(res) {
						uni.showToast({
							title: '聊天连接失败',
							icon: 'none'
						})
					}
				});
				uni.onSocketMessage((res) => {
					console.log('收到服务器内容：');
					let d = JSON.parse(res.data)
					console.log(d);
					if (d.type) return;
					let data = d.data;
					if (data.source_id) {
						var item = {
							group: 'group1',
							uindex: data.user_id,
							contentType: 'txt',
							uname: data.user_id == this.user_id ? this.userName : this.lawyerName,
							content: data.message,
							uface: data.user_id == this.user_id ? this.$store.state.userInfo.avater : this.lawyerAvator || "https://layer.boyaokj.cn/upload/20210813/1b54fb67409ad93d2eaf28ea20faa644.jpg"
						};
						this.msgs.push(item);
						this.pageScroll()
						console.log(this.msgs);
					}

				});

			} else {
				this.checkOpenSocket();
			}



		},
		onShow() {
			this.getMessage(this.source_id);
		},
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
				isSelf: true,
				page: 1,
				limit: 10,
				user_id: '',
				source_id: '',
				layer_id: '',
				msgs: [

				]
			}
		},
		methods: {

			...mapMutations(['commitWebsocketConnect', 'commitSocketInfo']),
			checkOpenSocket() {
				uni.sendSocketMessage({
					data: JSON.stringify({
						"action": "bind",
						"data": {
							"source_id": this.source_id,
						}
					}),
					success: res => {
						return;
					},
					fail: err => {
						// 未连接打开websocket连接
						this.openConnection();
					}
				});
			},
			openConnection() {
				// 打开连接
				uni.closeSocket(); // 确保已经关闭后再重新打开
				uni.connectSocket({
					url: 'wss://layer.boyaokj.cn/wss',
					header: {
						'content-type': 'application/json'
					},
					method: 'GET',
					success(res) {
						console.log('连接成功 connectSocket=', res);
					},
					fail: (err) => {

						console.log('连接失败 connectSocket=从连');

					}
				});
				uni.onSocketOpen(res => {
					console.log('====================连接成功==================');
					uni.sendSocketMessage({
						data: JSON.stringify({
							"action": "bind",
							"data": {
								"source_id": this.source_id,
							}
						}),
						fail(res) {
							uni.showToast({
								title: '聊天连接失败',
								icon: 'none'
							})
						}
					});

				});
				this.onSocketMessage(); // 打开成功监听服务器返回的消息
			},
			//	打开成功监听服务器返回的消息
			onSocketMessage() {
				// 消息
				this.timeout = 30000;
				this.timeoutObj = null;
				uni.onSocketMessage(res => {
					console.log(res)
					console.log('收到服务器内容：');

					this.getSocketMsg(res.data); // 监听到有新服务器消息
				});
			},
			// 监听到有新服务器消息
			getSocketMsg(reData) {
				// 监听到服务器消息
				let d = JSON.parse(reData)
				if (d.type) return;
				let data = d.data;
				if (data.source_id) {
					var item = {
						group: 'group1',
						uindex: data.user_id,
						contentType: 'txt',
						uname: data.user_id == this.user_id ? this.userName : this.lawyerName,
						content: data.message,
						uface: data.user_id == this.user_id ? this.$store.state.userInfo.avater : this.lawyerAvator || "https://layer.boyaokj.cn/upload/20210813/1b54fb67409ad93d2eaf28ea20faa644.jpg"
						

					};
					this.msgs.push(item);
				}
				console.log('收到服务器消息', reData);
				// this.reset(); // 检测心跳reset,防止长时间连接导致连接关闭
			},
			// 检测心跳reset
			reset() {
				clearInterval(this.timeoutObj);
				this.start(); // 启动心跳
			},
			// 启动心跳 start
			start() {
				this.timeoutObj = setInterval(function() {
					uni.sendSocketMessage({
						data: 'ping',
						success: res => {
							console.log('连接中....');
						},
						fail: err => {
							console.log('连接失败重新连接....');
							this.openConnection();
						}
					});
				}, this.timeout);
			},


			async sendText(msg) {
				console.log(msg);
				console.log(this.$store.state.userInfo.user_id);
				console.log(this.source_id);
				uni.sendSocketMessage({
					data: JSON.stringify({
						"action": "sendMessage",
						"data": {
							"source_id": this.source_id,
							"user_id": this.$store.state.userInfo.user_id,
							"message": msg
						}
					}),
					success() {
						console.log('发消息成功');
					},
					fail: (res) => {
						uni.showToast({
							title: '聊天连接失败',
							icon: 'none'
						})
						this.openConnection()
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
						if (item.user_id == this.user_id && (!this.userAvator || !this.userName)) {
							this.userName = item.user.name;
							this.userAvator = item.user.avater;
						}
						if (item.user_id != this.user_id && (!this.lawyerAvator || !this.lawyerName)) {
							this.lawyerName = item.layer_name;
							this.lawyerAvator = item.layer_photo;
						}
						let d = {
							group: 'group1',
							uindex: item.user_id,
							uname: item.user_id == this.user_id ? item.user.name : item.layer_name,
							contentType: 'txt',
							content: item.message || '',
							uface: item.user_id == this.user_id ? item.user.avater : item.layer_photo
						};
						this.msgs.push(d);
					})

				}
			}
		}
	}
</script>

<style>

</style>
