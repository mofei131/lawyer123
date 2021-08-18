<template>
	<view>
		<!-- 页面主体 -->
		<view class="flex-column mx-start sx-stretch" slot="gBody" style="width: 100%;  background-color: #F4F7F7;min-height: 1200rpx;">


			<view style="width: 100%;">

				<!-- IM 消息展示区 -->
				<gui-im-message background="#F4F7F7" :msgs="msgs" group="group1" :rightname='false' :userid="user_id">
				</gui-im-message>
				<!-- 底部提交区 -->
				<gui-im-input v-if="false"  @sendText="sendText"></gui-im-input>
			</view>

		</view>
	</view>
</template>

<script>
	import guiImMessage from '../../components/gui-im-message.vue'
	import guiImInput from '../../components/gui-im-input.vue'
	export default {
		onLoad(p) {
			console.log(p);
			this.source_id = p.source_id;
			this.layer_id = p.layer_id;
			this.user_id = p.user_id;

		},
		onShow() {
			this.getMessage();
		},
		components: {
			guiImMessage,
			guiImInput
		},
		data() {
			return {
				isSelf:true,
				page: 1,
				limit: 10,
				user_id: '',
				source_id: '',
				layer_id: '',
				msgs: [
					// {
					// 	group: 'group1',
					// 	uindex: 123,
					// 	uname: '小米',
					// 	contentType: 'txt',
					// 	content: "s假数据假数据",
					// 	uface: 'https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/13.png'
					// },
			
				]
			}
		},
		methods: {
			// async sendText(msg) {
			// 	//提交给 IM 服务返回消息数据，添加到消息列表中
			// 	//模拟IM 服务端返回消息
			// 	console.log('-----发送消息-----');
			// 	var item = {
			// 		group: 'group1',
			// 		uindex: this.$store.state.userInfo.user_id,
			// 		contentType: 'txt',
			// 		content: msg,
			// 		uface: 'https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/13.png'
			// 	};
			// 	let res = await this.$myRequest({
			// 	url: 'message/sendMessage',
			// 	methods: 'GET',
			// 	data: {
			// 		// source_id:this.source_id,
			// 		// user_id:this.$store.state.userInfo.user_id,
			// 		// message:msg
			// 		source_id:60,
			// 		user_id:45,
			// 		message:msg
			// 	}
			// 	});
			// 	if (res && res.code==200) {
			// 		console.log(res);
			// 		this.getMessage();
			// 	}else{
			// 		uni.showToast({
			// 			title:res.message,
			// 			icon:'none'
			// 		})
			// 	}
				

			// },
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
						source_id:this.source_id
					}
				});
				console.log(res);
				if (res && res.code == 200) {
					console.log(res);
					let arr = res.data.map(item => {
						let d = {
							group: 'group1',
							uindex: item.user_id,
							uname: item.user_id==this.user_id?item.user.name:item.layer_name,
							contentType: 'txt',
							content: item.message||'',
							uface: item.user_id==this.user_id?item.user.avater:item.layer_photo
						};
						return d;
					})
					this.msgs = arr;

				}
			}
		}
	}
</script>

<style>

</style>
