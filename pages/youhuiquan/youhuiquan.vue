<template>
    <view class="body-view">
        <!-- 头部 -->
        <scroll-view class="top-menu-view" scroll-x="true" :scroll-left="scrollLeft">
            <block v-for="(menuTab,index) in menuTabs" :key="index">
                <view class="menu-topic-view" v-bind:id="'tabNum'+index" @click="swichMenu(index)">
                    <view :class="[currentTab==index ? 'menu-topic-act' : 'menu-topic']">
                        <view class="menu-topic-txt">{{menuTab.title}}</view>
                        <view class="menu-topic-bottom">
                            <view class="menu-topic-bottom-color"></view>
                        </view>
                    </view>    
                </view>
            </block>
        </scroll-view>
        <!-- 右边小箭头 -->
        <!-- <view class="right-arrow"><text class="iconfont icon-arrow-right-o"></text> </view> -->
        <!-- 显示区域 -->
        <swiper :current="currentTab" class="swiper-box-list" duration="300" @change="swiperChange">
            <block v-for="(swiperDate,index1) in swiperDateList" :key="index1">
                <swiper-item>
                    <scroll-view class="swiper-topic-list" scroll-y="true" @scrolltolower="loadMore(index1)">
                        <block v-for="(swiperDate2,index2) in swiperDate" :key="index2">
                            <view class="tabContent">
                                <!-- 展示列表内容 -->
								{{swiperDate2.title}}
                            </view>
                        </block>
                    </scroll-view>
                </swiper-item>
            </block>
        </swiper>
    </view>

</template>

<script>
	export default {
	        data() {
	            return {
	                scrollLeft: 0,
	                isClickChange: false,
	                currentTab: 0,
	                // Tab分类标题
	                menuTabs: [
						{id:0,title:"婚姻家庭"},
						{id:1,title:"交通事故"},
						{id:2,title:"劳动纠纷"},
						{id:3,title:"合同纠纷"},
						{id:4,title:"婚姻家庭"},
						{id:5,title:"交通事故"},
						{id:6,title:"劳动纠纷"},
						{id:7,title:"合同纠纷"},
						{id:8,title:"婚姻家庭"},
						{id:9,title:"交通事故"},
						{id:10,title:"劳动纠纷"},
						{id:11,title:"合同纠纷"},
						],
	                // Tab切换内容
	                swiperDateList: [
	                    [
							{
							        title: "2019“中国最好学科排名” 四川3所高校各有1个学科点入",
							        hot: "热",
							        type: "教育",
							        time: "2016.11.21"
							    },
							    {
							        title: "BW成都站2019有哪些b站up主嘉宾(时间+地点+门票)",
							        hot: "",
							        type: "民生热点",
							        time: "2016.11.21"
							    },
							    {
							        title: "成都：公积金贷款系统升级 最快15个工作日左右到账  最快15个工作日左右到账",
							        hot: "",
							        type: "住房",
							        time: "2016.11.21"
							    },
							    {
							        title: "成灌线刷天府通坐高铁预计 明年5月可实现",
							        hot: "",
							        type: "名生热点",
							        time: "2016.11.21"
							    },
							    {
							        title: "成都车主朋友注意!未安装ETC走成都绕城、成温邛...",
							        hot: "",
							        type: "交通",
							        time: "2016.11.21"
							    }
						],
	                    [
							{
							        title: "2019“中国最好学科排名” 四川3所高校各有1个学科点入",
							        hot: "热",
							        type: "教育",
							        time: "2016.11.21"
							    },
							    {
							        title: "BW成都站2019有哪些b站up主嘉宾(时间+地点+门票)",
							        hot: "",
							        type: "民生热点",
							        time: "2016.11.21"
							    },
							    {
							        title: "成都：公积金贷款系统升级 最快15个工作日左右到账  最快15个工作日左右到账",
							        hot: "",
							        type: "住房",
							        time: "2016.11.21"
							    },
							    {
							        title: "成灌线刷天府通坐高铁预计 明年5月可实现",
							        hot: "",
							        type: "名生热点",
							        time: "2016.11.21"
							    },
							    {
							        title: "成都车主朋友注意!未安装ETC走成都绕城、成温邛...",
							        hot: "",
							        type: "交通",
							        time: "2016.11.21"
							    }
						],
	                    [],
	                    [],
	                    [],
	                    [],
	                    []
	                ],
	                // 接口列表模拟数据
	                list: [{
	                        title: "2019“中国最好学科排名” 四川3所高校各有1个学科点入",
	                        hot: "热",
	                        type: "教育",
	                        time: "2016.11.21"
	                    },
	                    {
	                        title: "BW成都站2019有哪些b站up主嘉宾(时间+地点+门票)",
	                        hot: "",
	                        type: "民生热点",
	                        time: "2016.11.21"
	                    },
	                    {
	                        title: "成都：公积金贷款系统升级 最快15个工作日左右到账  最快15个工作日左右到账",
	                        hot: "",
	                        type: "住房",
	                        time: "2016.11.21"
	                    },
	                    {
	                        title: "成灌线刷天府通坐高铁预计 明年5月可实现",
	                        hot: "",
	                        type: "名生热点",
	                        time: "2016.11.21"
	                    },
	                    {
	                        title: "成都车主朋友注意!未安装ETC走成都绕城、成温邛...",
	                        hot: "",
	                        type: "交通",
	                        time: "2016.11.21"
	                    }
	                ],
	            }
	        },
	        onLoad: function() {
	            //初始化数据
	            for (var i = 0; i < this.swiperDateList.length; i++) {
	                this.getDateList(i);
	            }
	        },
	        methods: {
	            swichMenu: async function(current) { //点击其中一个 menu
	                if (this.currentTab == current) {
	                    return false;
	                } else {
	                    this.currentTab = current;
	                    this.setScrollLeft(current);
	                }
	            },
	            swiperChange: async function(e) {
	                let index = e.target.current;
	                this.setScrollLeft(index);
	                this.currentTab = index;
	            },
	            setScrollLeft: async function(tabIndex) {
	                let leftWidthSum = 0;
	                for (var i = 0; i <= tabIndex; i++) {
	                    let nowElement = await this.getWidth('tabNum' + i);
	                    leftWidthSum = leftWidthSum + nowElement.width;
	                }
	                let winWidth = uni.getSystemInfoSync().windowWidth;
	                this.scrollLeft = leftWidthSum > winWidth ? (leftWidthSum - winWidth) : 0
	            },
	            getWidth: function(id) { //得到元素的宽高
	                return new Promise((res, rej) => {
	                    uni.createSelectorQuery().select("#" + id).fields({
	                        size: true,
	                        scrollOffset: true
	                    }, (data) => {
	                        res(data);
	                    }).exec();
	                })
	            },
	            loadMore: function(tabIndex) {
	                console.log('正在加载更多数据。。。')
	            },
	            getDateList: function(tabIndex) {
	                for (var i = 0; i < 1; i++) {
	                    var entity = this.menuTabs[tabIndex].name + (this.swiperDateList[tabIndex].length);
	                    this.swiperDateList[tabIndex].push(entity);
	                }
	            },
	            
	        },
	    }
</script>

<style>
	 /* Tab切换 */
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
		.top-menu-view{
			background: rgb(9,109,217,.1)!important;
			border: 0!important;
		}
	    .body-view .right-arrow{
	        position: absolute;
	        top: 22rpx;
	        right: 0rpx;
	        padding-left: 60rpx;
	        padding-right: 20rpx;
	        line-height: 42rpx;
	        background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 60%);
	    }
	    .body-view .right-arrow .iconfont{
	       font-size: 24rpx;
	       font-family: iconfont;
	       color: #909399;
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
	        height:86rpx ;
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
	    .top-menu-view .menu-topic-view .menu-topic:first-child{
	        margin-left: 30rpx;
	    }
	    /* .top-menu-view .menu-topic-view:last-child  .menu-topic{
	        margin-right: 80rpx;
	    } */
	   
	    .top-menu-view .menu-topic-view .menu-topic .menu-topic-txt {
	        font-size: 30rpx;
	        color:#303133;
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
	   .top-menu-view .menu-topic-view:last-child  .menu-topic-act{
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
	    
	    .swiper-box-list {
	        flex: 1;
	        width: 100%;
	        height: auto;
	        background-color: #FFFFFF;
	    }
	
	    .swiper-topic-list {
	        height: 100%;
	        width: 100%;
	    }
		/* .tabContent{
			color: #000;
			font-size: 140rpx;
		} */
</style>
