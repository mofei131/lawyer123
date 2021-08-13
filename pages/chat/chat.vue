<template>
	<view>
		<!-- 页面主体 -->
		<view class="flex-column mx-center sx-center" slot="gBody" style="width: 100%;  background-color: #F7F7F7">


			<view style="width: 100%;">

				<!-- IM 消息展示区 -->
				<gui-im-message background="#F7F7F7" :msgs="msgs" group="group1" :userid="user_id">
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
	export default {

		onLoad(p) {
			this.source_id = p.source_id;
			this.layer_id = p.layer_id;
			this.user_id = this.$store.state.userInfo.user_id;
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
			}
			uni.onSocketMessage((res) => {
				console.log('收到服务器内容：');
				let d = JSON.parse(res.data)
				console.log(d);
				if (d.type) return;
				let data = d.data;
				if (data.service_id) {
					var item = {
						group: 'group1',
						uindex: data.user_id,
						contentType: 'txt',
						uname: '小米',
						content: data.message,
						uface: 'https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/13.png'
					};
					this.msgs.push(item);
				}

			});
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
				isSelf: true,
				page: 1,
				limit: 10,
				user_id: '',
				source_id: '',
				layer_id: '',
				msgs: [{
						group: 'group1',
						uindex: 123,
						uname: '小米',
						contentType: 'txt',
						content: "s水电费水电费",
						uface: 'https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/13.png'
					},
					{
						group: 'group1',
						uindex: 123,
						uname: '小米',
						contentType: 'txt',
						content: "s水电费水电费",
						uface: 'https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/13.png'
					},

				]
			}
		},
		methods: {
			async sendText(msg) {
				console.log(msg);
				// console.log(this.$store.state.userInfo.user_id);
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
						uni.showToast({
							title: '发送成功',
							duration: 500
						})
					},
					fail(res) {
						uni.showToast({
							title: '聊天连接失败',
							icon: 'none'
						})
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
					url: 'service/selectCaseDetail',
					methods: 'GET',
					data: {
						source_id: this.source_id
					}
				});
				if (res && res.code == 200) {
					console.log(res);
					res.data.forEach(item => {
						let d = {
							group: 'group1',
							uindex: item.user_id,
							uname: '小米',
							contentType: 'txt',
							content: item.message,
							uface: 'https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/13.png'
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
