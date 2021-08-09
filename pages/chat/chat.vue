<template>
	<view>
		<!-- 页面主体 -->
		<view class="flex-column mx-center sx-center" slot="gBody"
			style="width: 100%;  background-color: #F7F7F7">
		
		
			<view style="width: 100%;">
		
				<!-- IM 消息展示区 -->
				<gui-im-message background="#F7F7F7" :msgs="msgs" group="group1" userid="1">
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
		components:{
			guiImMessage,
			guiImInput
		},
		data() {
			return {
				msgs:[
					{
						group: 'group1',
						uindex: 123,
						uname:'小米',
						contentType: 'txt',
						content: "s水电费水电费",
						uface: 'https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/13.png'
					},
					{
						group: 'group1',
						uindex: 123,
						uname:'小米',
						contentType: 'txt',
						content: "s水电费水电费",
						uface: 'https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/13.png'
					},
					
				]
			}
		},
		methods: {
			sendText(msg) {
				//提交给 IM 服务返回消息数据，添加到消息列表中
				//模拟IM 服务端返回消息
				
						var item = {
							group: 'group1',
							uindex: 1,
							contentType: 'txt',
							content: msg,
							uface: 'https://cmsuse.oss-cn-beijing.aliyuncs.com/g5/13.png'
						};
				
						this.msgs.push(item);

						this.pageScroll();
			
			},
			// 滚动条滚动 [ 有新消息可以自动滚动到底部 ]
			pageScroll: function() {
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 999999 + Math.random(),
						duration: 100
					});
				}, 200);
			}
		}
	}
</script>

<style>

</style>
