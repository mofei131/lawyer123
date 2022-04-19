<template>
	<view>
		<view class="buldi">
			<view class="cityinput">
		<view class="uni-form-item uni-column">
			<pickcity anglecolor='#ffffff' @getcity="getCity"></pickcity>
		</view>
		<view class="inputs">
			<input type="text" placeholder="请输入搜索内容" confirm-type="search" @confirm="doSearch" v-model="sevalue"/>
			<image src="http://hlstore.yimetal.cn/2021/lawyer123/211129/%E6%90%9C%E7%B4%A2@2x.png" @click="search"></image>
		</view>
		</view>
		</view>
		<view class="banner">
			<swiper class="swiper" :autoplay="true" :interval="3000" indicator-dots indicator-color="#E5E5E5;" indicator-active-color="#40A9FF" circular>
					<swiper-item v-for="(item,index) in banner" :key="index" @click="tobandet(item)">
							<image class="hddetimg" :src="item.images"></image>
					</swiper-item>
			</swiper>
		</view>
		<view class="qiecard">
			<view :class="qie?'qiel':'qiea'" @click="huan(1)">进行中</view>
			<view :class="qie?'qiea':'qiel'" @click="huan(2)">即将开始</view>
		</view>
		<view class="datalist">
			<view class="lfix" v-for="(item,index) in dataList" :key="index" @click="topage(item.id)">
				<image :src="item.images[0]"></image>
				<view class="title">
					<view class="city">[{{item.address}}]<span>{{item.name}}</span></view>
					<!-- <view class="ftit"></view> -->
				</view>
				<view class="price">
					<view class="pshu">
					<view class="nprice">￥{{item.price}}</view>
					<view class="jprice" v-if="item.subprice != null ">￥{{item.subprice}}</view>
					</view>
					<view class="shengcheng" @click.stop="caixia(item)">点击生成海报</view>
				</view>
				<view class="livot">
					<view class="time">{{item.starttime}}</view>
					<view class="fan">
						返<span>￥{{item.fan}}</span>，团长返<span>￥{{item.tfan}}</span>
					</view>
				</view>
			</view>
		</view>
		<view class="huibox" @click="caixia" v-if="cai">
			<view class="haibaobox">
				<image :src="image" @click.stop="kan()" mode="aspectFit"></image>
			</view>
			<view class="btnfex">
				<view class="baocun" @click.stop="saveImgToLocal()">保存相册</view>
				<view class="baocun" @click.stop="copy()">软文复制</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	// import search from '../components/search/search.vue'
	import pickcity from '@/pages/components/pickcity/pickcity.vue'
	export default{
		components:{
			pickcity
		},
		data(){
			return{
				banner:[],
				qie:true,
				dataList:[],
				image:'',
				cai:false,
				openSettingBtnHidden: true,
				sevalue:'',
				page:1,
				limit:6,
				cityid:'',
				act_id:0
			}
		},
		onShow() {
			let that = this
			this.obtList()
			uni.request({
				url:'https://layer.boyaokj.cn/api/act/banner',
				success(res) {
					console.log(res.data.data)
					that.banner = res.data.data
				}
			})
		},
		methods:{
			tobandet(e){
				if(e.content.length != 0){
					uni.navigateTo({
						url:'../my/bandet2?id='+e.id
					})
				}
			},
			copy(){
				let wanqu = ''
				uni.request({
					url:'https://layer.boyaokj.cn/api/act/text',
					data:{
						act_id:this.act_id
					},
					success(res) {
						if(res.data.code == 200){
							// console.log(res.data.data)
							wanqu = res.data.data
							uni.showModal({
							    title: '复制内容',
							    content: res.data.data,
									confirmText:'复制',
							    success: function (res) {
							        if (res.confirm) {
							          uni.setClipboardData({
							          	data:wanqu,
							          	success:()=>{
							          		uni.showToast({
							          			title:'复制成功',
							          		})
							          	}
							          });
							        }else if (res.cancel) {
													console.log('用户点击取消');
											}
							    }
							});
						}else if(res.data.code == -1){
							uni.showToast({
								title:res.data.message,
								icon:'none'
							})
						}
					}
				})
			},
			topage(id){
				uni.navigateTo({
					url:'hddet?id='+id
				})
			},
			onReachBottom() {
				console.log("触发")
				this.page++
				this.obtList()
			},
			onPullDownRefresh() {
				console.log("触发了下拉刷新"),
				uni.stopPullDownRefresh()
			},
			// 查询列表
			obtList(){
				let that = this
				uni.request({
					url:'https://layer.boyaokj.cn/api/act/list',
					data:{
						page:this.page,
						limit:this.limit,
						name:this.sevalue,
						city_id:this.cityid,
						type:this.qie?'1':'2'
					},
					success(res) {
						console.log(res.data.data)
						if(res.data.code == 200){
							if(that.page == 1){
								that.dataList = res.data.data
							}else{
								if(res.data.data.length != 0){
									for(let i in res.data){
										that.dataList.push(res.data.data[i])
									}
								}else{
									uni.showToast({
										title:'没有更多数据',
										icon:'none'
									})
								}
							}
						}else{
							uni.showToast({
								title:res.data.message,
								icon:'none'
							})
						}
					}
				})
			},
			search(){
				this.page = 1
				this.cityid = ''
				this.obtList()
			},
			doSearch(e){
				this.sevalue = e.detail.value
				this.page = 1
				this.cityid = ''
				this.obtList()
			},
			getCity(e) {
				this.cityid = e.cityid
				this.page = 1
				this.obtList()
			},
			kan(){
				console.log('123')
			},
			caixia(e){
				let that = this
				uni.request({
					url:'https://layer.boyaokj.cn/api/act/poster',
					data:{
						user_id:uni.getStorageSync('userInfo').id,
						act_id:e.id
					},
					success(res) {
						that.image = res.data.data
					}
				})
				// this.image = e.poster
				this.act_id = e.id
				if(this.cai){
					this.cai = !this.cai
				}else{
					this.cai = !this.cai
				}
			},
			huan(e){
				if(e == 1){
					this.qie = true
				}else{
					this.qie = false
				}
				this.obtList()
			},
			//微信小程序保存到相册
				handleSetting(e){
					let that = this
						if (!e.detail.authSetting['scope.writePhotosAlbum']) {
									that.openSettingBtnHidden = false;
						} else {
								 that.openSettingBtnHidden = true;
						}
				},
				saveEwm:function(e){
					let that = this
						//获取相册授权
							 uni.getSetting({
								 success(res) {
									 if (!res.authSetting['scope.writePhotosAlbum']) {
										 uni.authorize({
											 scope: 'scope.writePhotosAlbum',
											 success() {
												 //这里是用户同意授权后的回调
												 that.saveImgToLocal();
											 },
											 fail() {//这里是用户拒绝授权后的回调
													 that.openSettingBtnHidden=false
											 }
										 })
									 } else {//用户已经授权过了
										 that.saveImgToLocal();
									 }
								 }
							 })
			        },
			        saveImgToLocal:function(e){
			            let that = this
			            uni.showModal({
										title: '提示',
										content: '确定保存到相册吗',
										success: function (res) {
											if (res.confirm) {
													uni.downloadFile({
														url: that.image,//图片地址
														success: (res) =>{
															if (res.statusCode === 200){
																	uni.saveImageToPhotosAlbum({
																			filePath: res.tempFilePath,
																			success: function() {
																					uni.showToast({
																							title: "保存成功",
																							icon: "none"
																					});
																					that.caixia()
																			},
																			fail: function() {
																					uni.showToast({
																							title: "保存失败",
																							icon: "none"
																					});
																					that.caixia()
																			}
																	});
															} 
													}
											}) 
										} else if (res.cancel) {
												
										}
								}
						});
						
				},
		}
	}
</script>

<style>
	.cityinput{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.inputs image{
		position:absolute;
		width: 36rpx;
		height: 36rpx;
		top: 12rpx;
		left: 12rpx;
	}
	.inputs input{
		width: 581rpx;
		height: 56rpx;
		background: #FFFFFF;
		border-radius: 33rpx;
		border: 1rpx solid #40A9FF;
		padding:  0 27rpx 0 55rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.inputs{
		position: relative;
	}
	.uni-column{
		color: #fff;
	}
	.search input{
		width: 460rpx!important;
	}
	.btnfex{
		width: 700rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin: auto;
		margin-top: 20rpx;
	}
	.baocun{
		width: 280rpx;
		height: 83rpx;
		background: #3E9FFE;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
		border-radius:14rpx;
	}
	.haibaobox image{
		width: 520rpx;
		height: 810rpx;
		display: block;
		margin: auto;
	}
	.haibaobox{
		margin: auto;
		margin-bottom: 20rpx;
		margin-top: 30%;
		margin-bottom: 0;
	}
	.huibox{
		position: fixed;
		z-index: 2;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,.3);
		width: 100%;
		height: 100%;
	}
	.pshu{
		display: flex;
		align-items: flex-end;
	}
	.fan span{
		color: #F5222D;
	}
	.fan{
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #7C7C7C;
	}
	.time{
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #7C7C7C;
	}
	.livot{
		display: flex;
		margin-top: 18rpx;
		justify-content: space-between;
		align-items: center;
	}
	.shengcheng{
		width: 150rpx;
		height: 44rpx;
		background: #40A9FF;
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	.jprice{
		font-size: 14rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		margin-left: 8rpx;
		text-decoration:line-through;
	}
	.nprice{
		font-size: 21rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #F5222D;
	}
	.price{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 6rpx;
	}
	.title{
		width: 304rpx;
		display: flex;
		margin-top: 12rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.lfix image{
		width: 312rpx;
		/* height: 312rpx; */
		height: 234rpx;
	}
	.lfix{
		width: 344rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 19rpx 0rpx rgba(0, 0, 0, 0.11), 0rpx 0rpx 19rpx 0rpx rgba(0, 0, 0, 0.11);
		border-radius: 8rpx;
		padding: 13rpx 16rpx 13rpx 16rpx;
		box-sizing: border-box;
		margin-bottom: 15rpx;
	}
	.datalist{
		width: 702rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin: auto;
	}
	.qiea{
		font-size: 26rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #51565D;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.qiel{
		height: 50rpx;
		border-bottom: 4rpx solid #40A9FF;
		font-size: 26rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #40A9FF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	page{
		background: #F4F7F7;
	}
	.qiecard{
		width: 702rpx;
		height: 72rpx;
		background: #FFFFFF;   
		border-radius: 14rpx;
		margin: 20rpx auto;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.swiper image{
		width: 710rpx;
		height: 293rpx;
	}
	.swiper{
		height: 293rpx;
		width: 710rpx;
		margin: 18rpx auto;
		margin-bottom: 0;
	}
	.search{
		    width: 580rpx!important;
	}
	.dropDown{
		width: 700rpx!important;
		margin: auto;
		top: 20rpx!important;
	}
	.buldi{
		background-color: #40A9FF;
		width: 750rpx;
		height: 93rpx;
	}
</style>
