<template>
	<view class="flex-column mx-start sx-stretch" style="padding: 20rpx;background-color: #F8F8F8;">
		<lawyercard1  :lawyerlist="lawyerList" @buy="buy"></lawyercard1>

		<view class="flex-column mx-start sx-stretch" style="border-radius: 20rpx;background-color: #FFFFFF;">
			<view class="flex-row mx-start sx-center ld_title_wrap">
				<view style="background-color: #007AFF;width: 8rpx;height: 40rpx;margin:0 10rpx 0 20rpx;"></view>
				<view style="">个人介绍</view>
			</view>
			<view class="flex-column mx-start sx-stretch"
				style="flex: 0 0 400rpx;padding: 20rpx;line-height: 36rpx;font-size: 25rpx ;color: rgba(153,153,153,1);">
				<view class="flex-row mx-start sx-center">
					<view style="flex: 0 0 120rpx;">毕业院校：</view>
					<view style="flex: 1 1 auto"> xx学校</view>
				</view>
				<view class="flex-row mx-start sx-center">
					<view style="flex: 0 0 120rpx;">学历：</view>
					<view style="flex: 1 1 auto"> 硕士</view>
				</view>
				<view class="flex-row mx-start sx-center">
					<view style="flex: 0 0 120rpx;">就读专业：</view>
					<view style="flex: 1 1 auto"> 法学</view>
				</view>
				<view class="flex-row mx-start sx-center">
					<view style="flex: 0 0 120rpx;">就职律所：</view>
					<view style="flex: 1 1 auto"> 潍坊事务所所</view>
				</view>
				<view class="flex-row mx-start sx-start" style="margin-top: 20rpx;">
					<view style="flex: 0 0 120rpx;">个人简介：</view>
					<view style="flex: 1 1 auto ;height: 200rpx;overflow: auto;">
						精法以专业、勤勉以敬业。张律师待人以诚，立世以信，法律专业知识扎实、办事认真负责、办案经验丰富，成功代理了多起劳动争议仲裁诉讼及其他民事纠纷案件。精通国家劳动人事法规政策,&nbsp;能够防范企业经营风险和用工风险。致力于企业法律服务的研究与开发，积极的拓展企业法律顾问服务,真正做到急企业之所急，想企业之所想。
					</view>
				</view>

			</view>
		</view>
		<view class="flex-row mx-start sx-center" style="flex: 0 0 auto;margin: 40rpx 0; color: gray;">
			<view class="flex-row mx-start sx-center"
				style="flex: 1 1 auto;padding: 10rpx;background-color: #FFFFFF;margin-right: 20rpx;border-radius: 10rpx;">
				<view class="backImgCenter"
					style="background-image: url(../../static/icon/icon1.png);flex: 0 0 92rpx;height: 92rpx;margin: 10rpx;">
				</view>
				<view class="flex-column" style="flex: 1 1 auto;line-height: 36rpx;font-size: 26rpx;">
					<text>图文详情</text>
					<text>￥28元/30分钟</text>
				</view>
				<fa-icon type="angle-right" color="gray"></fa-icon>
			</view>
			<view class="flex-row mx-start sx-center"
				style="flex: 1 1 auto;padding: 10rpx;background-color: #FFFFFF;border-radius: 10rpx">
				<view class="backImgCenter"
					style="background-image: url(../../static/icon/icon2.png);flex: 0 0 92rpx;height: 92rpx;margin: 10rpx;">
				</view>
				<view class="flex-column" style="flex: 1 1 auto;line-height: 36rpx;font-size: 26rpx;">
					<text>图文详情</text>
					<text>￥28元/30分钟</text>
				</view>
				<fa-icon type="angle-right" color="gray"></fa-icon>
			</view>
		</view>

		<view class="flex-column mx-start sx-stretch" style="border-radius: 20rpx;background-color: #FFFFFF;">
			<view class="flex-row mx-start sx-center ld_title_wrap">
				<view style="background-color: #007AFF;width: 8rpx;height: 40rpx;margin:0 10rpx 0 20rpx;"></view>
				<view style="">成功案例</view>
			</view>
			<anli :anli="anli"></anli>

		</view>
		<view class="flex-row mx-center sx-center">
			<view class="flex-txt-center" @tap="tuTuwenPage"
				style="flex: 1 1 auto;margin: 20rpx;height: 60rpx;border-radius:30rpx;background-color: rgba(255,96,96,1);;color: #FFFFFF;">
				图文咨询
			</view>
			<view class="flex-txt-center" @tap="toDianhuaPage"
				style="flex: 1 1 auto;margin: 20rpx;height: 60rpx;border-radius:30rpx;background-color: #57A9FF;color: #FFFFFF;">
				电话咨询
			</view>
		</view>


	</view>
</template>

<script>
	import anli from '../components/anli/anli.vue'
	import lawyercard1 from '@/pages/components/lawyercard1/lawyercard1.vue'
	export default {
		components: {
			anli,
			lawyercard1
		},
		data() {
			return {
				lawyerList: [{
					field: [{
							name: "交通",
							class: 'green'
						},
						{
							name: "婚姻",
							class: 'blue'
						},
						{
							name: "合同",
							class: 'pink'
						},
						{
							name: "审核",
							class: 'purple'
						},
						{
							name: "诉状",
							class: 'yellow'
						}
					],
				}, ],
				anli: [{
						id: 0,
						sort: '买卖合同',
						title: '发展提供高质量数据——第四次fd经济论坛第四次fd经济论坛',
						address: '山东青岛',
						name: '张三',
						portrait: 'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg',
						read: '1783'
					},
					{
						id: 1,
						sort: '婚姻家庭',
						title: '发展提供高质量数据——第四次fd经济论坛第四次fd经济论坛',
						address: '山东潍坊',
						name: '李四',
						portrait: 'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg',
						read: '32'
					},
					{
						id: 2,
						sort: '为高质量',
						title: '发展提供高质量数据——第四次fd经济论坛第四次fd经济论坛',
						address: '山东烟台',
						name: '王五',
						portrait: 'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg',
						read: '544'
					},
					{
						id: 3,
						sort: '为高质量',
						title: '发展提供高质量数据——第四次fd经济论坛第四次fd经济论坛',
						address: '山东日照',
						name: '赵六',
						portrait: 'https://avatar.csdnimg.cn/1/E/4/3_guorui_java_1609847720.jpg',
						read: '6'
					},
				],
			}
		},
		methods: {
			tuTuwenPage(){
				uni.navigateTo({
					url:'../service_zhixun/tuwen'
				})
			},
			toDianhuaPage(){
				uni.navigateTo({
					url:'../service_zhixun/dianhua'
				})
			}
		}
	}
</script>

<style>
	.list-item {
		padding: 20rpx;
		flex: 0 0 auto;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}

	.ld_title_wrap {
		background-color: rgba(9, 109, 217, 0.1);
		flex: 0 0 97rpx;

	}
</style>
