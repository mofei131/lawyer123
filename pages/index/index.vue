<template>
	<view>
		<search></search>

		<swiper class="swiper flex-column mx-start sx-stretch" circular :indicator-dots="true" :autoplay="true"
			interval="3000" duration="500">
			<swiper-item class="flex-column mx-start sx-stretch">
				<view class="swiper-item backImgFull" :style="{backgroundImage: 'url(/static/images/banner.png)'}">
				</view>
			</swiper-item>
			<swiper-item class="flex-column mx-start sx-stretch">
				<view class="swiper-item backImgFull" style="background-image: url(/static/images/banner.png)"></view>
			</swiper-item>
		</swiper>

		<iconlist :item='item1'></iconlist>
		<iconlist :item='item2'></iconlist>
		<view class="modtitle" @tap="toYouxuan">
			<view class="modleft">
				<view class="blue"></view>
				<view class="modone">优选律师</view>
			</view>
			<view class="more">
				<view>全部</view>
				<image src="@/static/images/righticon.png"></image>
			</view>
		</view>
		<!-- <swiper class="beg" display-multiple-items='6'>
			<swiper-item class="beglist" v-for="(item,index) in begood" :key="index">
				<view class="beglisttitle">{{item.title}}</view>
			</swiper-item>  
			
		</swiper> -->
		<scroll-view class="top-menu-view" scroll-x="true" :scroll-left="scrollLeft">
			<block v-for="(menuTab,index) in youXuanList" :key="index">
				<view class="menu-topic-view" v-bind:id="'tabNum'+index" @click="swichMenu(index)">
					<view :class="[currentTab==index ? 'menu-topic-act' : 'menu-topic']">
						<view class="menu-topic-txt">{{menuTab.name}}</view>
						<view class="menu-topic-bottom">
							<view class="menu-topic-bottom-color"></view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>

		<lawyercard :lawyerlist='lawyercard'></lawyercard>
		<view class="case">
			<view class="modtitle">
				<view class="modleft">
					<view class="blue"></view>
					<view class="modone">精选咨询案例</view>
				</view>
				<navigator url="../list/moreAnli" class="more">
					<view>更多案例</view>
					<image src="@/static/images/righticon.png"></image>
				</navigator>
			</view>
		</view>

		<anli :showBottomBorder="true" :anli="anli"></anli>
		<view class="case">
			<view class="modtitle">
				<view class="modleft">
					<view class="blue"></view>
					<view class="modone">每日学法</view>
				</view>
				<navigator url="../list/moreStudy" class="more">
					<view>查看更多</view>
					<image src="@/static/images/righticon.png"></image>
				</navigator>
			</view>
		</view>
		<study :learn="learn"></study>


	</view>
</template>

<script>
	import search from '../components/search/search.vue'
	import iconlist from '../components/iconlist/iconlist.vue'
	import lawyercard from '../components/lawyercard/lawyercard.vue'
	import anli from '../components/anli/anli.vue'
	import study from '../components/study/study.vue'

	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		components: {
			search,
			study,
			iconlist,
			anli,
			lawyercard
		},
		data() {
			return {
				youXuanList: [],
				scrollLeft: 0,
				isClickChange: false,
				currentTab: 0,
				item1: {
					title: '咨询律师',
					zixun: [{
							id: 0,
							name: "图文咨询",
							url: "/static/icon/icon1.png"
						},
						{
							id: 1,
							name: "电话咨询",
							url: "/static/icon/icon2.png"
						},
						{
							id: 2,
							name: "见面咨询",
							url: "/static/icon/icon3.png"
						},
						{
							id: 3,
							name: "聘请律师",
							url: "/static/icon/icon4.png"
						},
					],
				},
				item2: {
					title: '单项服务',
					zixun: [{
							id: 4,
							name: "合同下载",
							url: "/static/icon/icon5.png"
						},
						{
							id: 5,
							name: "合同审核/起草",
							url: "/static/icon/icon6.png"
						},
						{
							id: 6,
							name: "律师函",
							url: "/static/icon/icon7.png"
						},
						{
							id: 7,
							name: "债务催收指导",
							url: "/static/icon/icon8.png"
						},
						{
							id: 8,
							name: "起诉状/答辩状",
							url: "/static/icon/icon9.png"
						},
						{
							id: 9,
							name: "代写借/欠条",
							url: "/static/icon/icon10.png"
						},
						{
							id: 10,
							name: "刑事会见",
							url: "/static/icon/icon11.png"
						},
						{
							id: 11,
							name: "其他",
							url: "/static/icon/icon12.png"
						},
					]
				},
				begood: [{
						id: 0,
						title: "婚姻家庭"
					},
					{
						id: 1,
						title: "交通事故"
					},
					{
						id: 2,
						title: "劳动纠纷"
					},
					{
						id: 3,
						title: "合同纠纷"
					},
					{
						id: 4,
						title: "婚姻家庭"
					},
					{
						id: 5,
						title: "交通事故"
					},
					{
						id: 6,
						title: "劳动纠纷"
					},
					{
						id: 7,
						title: "合同纠纷"
					},
					{
						id: 8,
						title: "婚姻家庭"
					},
					{
						id: 9,
						title: "交通事故"
					},
					{
						id: 10,
						title: "劳动纠纷"
					},
					{
						id: 11,
						title: "合同纠纷"
					},
				],
				lawyercard: [],
				anli: [],
				learn: []
			}
		},
		async onLoad() {
			let userInfo = this.$store.state.userInfo;
			if (!userInfo || !userInfo.user_id) {
				await this.getWxCode();
				console.log(this.$store.state);
			}
			this.getProvinceCity();
			this.getBussinessTypes();
			this.getLawyerLevels();
			this.getWorkAges();
			this.getYouXuanLvshi();
			this.getLearn();
			this.getAnli();


			uni.getSystemInfo({
				success: (res) => {
					// console.log(res);
					this.commitWindowHeight(res.windowHeight);
				}
			})
		},
		computed: {
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters([
				'getWindowHeight',
			]),
			// ...mapState('module1', {
			// 	module1State: state => state
			// }),
			// ...mapGetters('module1', {
			// 	getNameA: 'getNameA',
			// 	getModuleA: 'getModuleA'
			// }),
			// ...mapGetters('module2', {
			// 	getName2: 'getNameA',
			// 	getModule2: 'getModule2'
			// }),

		},
		methods: {
			...mapMutations(['commitWindowHeight']), // 将 `this.increment()` 映射为 `this.$store.commit('increment'); `
			...mapActions([
				'getProvinceCity', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
				'getBussinessTypes',
				'getLawyerLevels', 'getWorkAges', 'getWxCode'
			]),
			// ...mapActions("module1",{
			// 	udpateNameByAction:"udpateNameByAction"
			// }),


			//这一步放到登录那里做

			swichMenu: async function(current) { //点击其中一个 menu

				if (this.currentTab == current) {
					return false;
				} else {
					this.currentTab = current;
					//更新card

					this.lawyercard = this.youXuanList[this.currentTab].layer || [];
				}
			},
			toYouxuan() {
				uni.switchTab({
					url: '../zhaolvshi/zhaolvshi'
				})
			},
			async getYouXuanLvshi() {
				let res = await this.$myRequest({
					url: 'layer/getCaseTypeLayer',
					methods: 'GET',
					data: {}
				});
				if (res && res.code == 200) {
					// console.log(res.data);
					this.youXuanList = res.data;
					this.lawyercard = res.data[this.currentTab].layer || [];
				} else {
					uni.showToast({
						title: '优选律师请求数据失败',
						icon: 'none'
					})
				}
			},
			async getLearn() {
				// console.log('------------->>>>>');
				// console.log(this.$store.state);
				let res = await this.$myRequest({
					url: 'article/list',
					methods: 'GET',
					data: {
						page: 1,
						limit: 5,
						user_id: this.$store.state.userInfo.user_id
					}
				});
				if (res && res.code == 200) {
					// console.log(res.data);
					this.learn = res.data;
				} else {
					uni.showToast({
						title: '每日学法数据获取异常',
						icon: 'none'
					})
				}
			},
			async getAnli() {
				let res = await this.$myRequest({
					url: 'service/selectCase',
					methods: 'GET',
					data: {
						page: 1,
						limit: 5,
						layer_id: '',
					}
				});
				if (res && res.code == 200) {
					// console.log(res.data);
					this.anli = res.data;
				} else {
					uni.showToast({
						title: '每日学法数据获取异常',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style>
	.swiper {
		height: 400rpx;
	}

	.swiper-item {
		flex: 1 1 auto;
	}

	.banner image {
		width: 750rpx;
	}

	.modtitle {
		display: flex;
		justify-content: space-between;
		width: 690rpx;
		margin: auto;
		box-sizing: border-box;
		margin-top: 16rpx;
	}

	.modleft,
	.more {
		display: flex;
		box-sizing: border-box;
	}

	.more image {
		width: 11rpx;
		height: 21rpx;
		/* margin-top: 6rpx; */
		margin: auto;
	}

	.blue {
		width: 6rpx;
		height: auto;
		background: #40A9FF;
		/* margin-top: 8rpx */
	}

	.modone {
		color: #51565D;
		font-size: 28rpx;
		font-weight: 500;
		margin-left: 8rpx;
	}

	.more view {
		color: #919191;
		font-size: 24rpx;
		font-weight: 400;
		margin-right: 13rpx;
	}

	.beg {
		width: 710rpx;
		margin: auto;
		margin-top: 12rpx;
		height: 80rpx;
		border-radius: 14rpx 14rpx 0rpx 0rpx;
		background: rgb(9, 109, 217, .1);
		box-sizing: border-box;
	}

	.beglist {
		width: 177.5rpx;
	}

	.beglisttitle {
		text-align: center;
		height: 80rpx;
		padding-top: 19rpx;
		color: #333333;
		font-size: 24rpx;
		font-weight: 400;
	}

	.case {
		height: 80rpx;
		border-radius: 14rpx 14rpx 0rpx 0rpx;
		background: rgb(9, 109, 217, .1);
		box-sizing: border-box;
		width: 710rpx;
		margin: auto;
		padding-top: 10rpx;
		margin-top: 50rpx;
	}




	.body-view {
		height: 100%;
		width: 100%;
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		align-items: flex-start;
		justify-content: center;
		border-radius: 14px 14px 0px 0px;
		height: 80rpx;
		width: 710rpx;
		margin: auto;
	}

	.top-menu-view {
		background: rgb(9, 109, 217, .1) !important;
		border: 0 !important;
	}

	.top-menu-view {
		display: flex;
		white-space: nowrap;
		width: 100%;
		background-color: #FFFFFF;
		height: 86rpx;
		border-top: 1px solid #d8dbe6;
		border-bottom: 1px solid #d8dbe6;
	}

	.top-menu-view .menu-topic-view {
		display: inline-block;
		white-space: nowrap;
		height: 86rpx;
		position: relative;
	}

	.top-menu-view .menu-topic-view .menu-topic {
		margin-left: 30rpx;
		margin-right: 10rpx;
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-menu-view .menu-topic-view .menu-topic:first-child {
		margin-left: 30rpx;
	}

	/* .top-menu-view .menu-topic-view:last-child  .menu-topic{
	     margin-right: 80rpx;
	 } */

	.top-menu-view .menu-topic-view .menu-topic .menu-topic-txt {
		font-size: 30rpx;
		color: #303133;
	}

	.top-menu-view .menu-topic-view .menu-topic .menu-topic-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	.top-menu-view .menu-topic-view .menu-topic .menu-topic-bottom .menu-topic-bottom-color {
		width: 88rpx;
		height: 6rpx;
	}

	.top-menu-view .menu-topic-view .menu-topic-act {
		margin-left: 30rpx;
		margin-right: 10rpx;
		position: relative;
		height: 90%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-menu-view .menu-topic-view:last-child .menu-topic-act {
		margin-right: 80rpx;
	}

	.top-menu-view .menu-topic-view .menu-topic-act .menu-topic-txt {
		font-size: 30rpx;
		color: #40A9FF;
		font-weight: 600;
	}

	.top-menu-view .menu-topic-view .menu-topic-act .menu-topic-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.top-menu-view .menu-topic-view .menu-topic-act .menu-topic-bottom .menu-topic-bottom-color {
		width: 88rpx;
		height: 6rpx;
		background: #40A9FF;
	}
</style>
