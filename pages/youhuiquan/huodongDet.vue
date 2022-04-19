<template>
	<view style="position: relative;">
		<view class="shishi" :animation="animationData">
			<swiper class="swiper2" vertical circular :autoplay="true" :interval="10000" indicator-color="#E5E5E5;" indicator-active-color="#40A9FF" circular @animationfinish="finish()" duration="0">
					<swiper-item @touchmove.stop v-for="(item,index) in orderlist" :key="index">
							<!-- <image class="hddetimg" src="http://hlstore.yimetal.cn/2021/yibohui/a14479ca.png" mode="aspectFill"></image> -->
							<view class="xainzhi">最新订单:<view>{{item.nickname}}</view></view>
					</swiper-item>
			</swiper>
		</view>
		<view class="hdmk1">
			<swiper class="swiper" :autoplay="true" :interval="3000" indicator-dots indicator-color="#E5E5E5;" indicator-active-color="#FD5407" circular>
					<swiper-item v-for="(item,index) in dataDet.images" :key="index">
							<image class="hddetimg" :src="item"></image>
					</swiper-item>
			</swiper>
			<view class="dettit">
				<view class="title">{{dataDet.name}}</view>
				<view class="xiao">
					<image src="http://hlstore.yimetal.cn/2021/lawyer123/211129/%E7%83%AD%E5%BA%A6@2x.png"></image>
					<view class="hxiao">销量：<span>{{dataDet.sale}}</span></view>
				</view>
			</view>
			<view class="shujing">
				<view class="sjleft">
					<view class="nprice"><span>￥</span>{{dataDet.price}}</view>
					<view class="jprice" v-if="dataDet.subprice != null ">￥{{dataDet.subprice}}</view>
				</view>
				<view class="sjright">
					<view class="sjrleft">节省￥</view>
					<view class="sjrright">{{dataDet.subprice - dataDet.price}}</view>
				</view>
			</view>
			<view class="hui"></view>
			<view class="sandui">
				<view class="qiyi" v-for="(item,index) in dataDet.tag" :key="index">
					<image src="http://hlstore.yimetal.cn/2021/lawyer123/211129/%E5%BD%A2%E7%8A%B6@2x.png"></image>
					<view>{{item}}</view>
				</view>
				<button class="zhuanfa" open-type="share"></button>
			</view>
		</view>
		<view class="weizhi">
			<image src="http://hlstore.yimetal.cn/2021/lawyer123/211129/weizhi.png"></image>
			<view class="mingz">{{dataDet.address}}</view>
			<view class="daoh" @click="tomap()">导航</view>
		</view>
		<view class="detmk2" v-if="dataDet.recomment.length != 0">
			<view class="mk2tit">其他产品推荐</view>
			<view class="datlist" v-for="(item,index) in dataDet.recomment" :key="index">
				<view class="dmk2left">
					<image :src="childimg[index]"></image>
				</view>
				<view class="dmk2right"> 
					<view class="mk2tit2">{{item.name}}</view>
					<view class="plist">
						<view class="pfex">
						<view class="mk2nprice"><span>￥</span>{{item.price}}</view>
						<view class="mk2jprice" v-if="item.subprice != null ">￥{{item.subprice}}</view>
						</view>
						<view class="chakan" @click="childcha(item.id)">查看</view>
					</view>
				</view>
			</view>
		</view>
		<view class="detmk3">
			<view class="mk3tit">
				<view class="mk3xiangq">项目详情</view>
				<view class="mk3mobile">123法律商户合作电话：<span>400-0288-123</span></view>
			</view>
			<view class="hui"></view>
			<view class="cont">
				<rich-text  v-html = 'content'></rich-text>
			</view>
		</view>
		<view class="waibox">
		<view class="botbox">
			<view class="bboxleft">
				<view class="jieshu">距离抢购结束时间</view>
				<view class="jieshu"><span>{{day}}</span>天<span>{{hour}}</span>小时<span>{{minute}}</span>分<span>{{second}}</span>秒</view>
			</view>
			<view class="bboxright" @click="pay()" v-if="dataDet.start == 1">立即抢购</view>
			<view class="bboxright" v-if="dataDet.start == -1">未开始</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content: '',
				day:0,
				hour:0,
				minute:0,
				second:0,
				id:0,
				dataDet:'',
				ding:'',
				childimg:[],
				orderlist:[],
				suiji:3,
				animationData: {},
				shang:true,
				shou:'',
				fanh:[]
			}
		},
		onLoad(p) {
			if(p.scene){
				this.fanh = p.scene.split("_");
				this.id = this.fanh[0]
				uni.setStorageSync('scene',this.fanh[1])
			}else if(p.id){
				this.id = p.id
			}
			this.animation = uni.createAnimation()
			console.log(this.fanh)
		},
		onShareAppMessage(res) { 
			clearInterval(this.shou); 
			clearInterval(this.ding); 
					return {
						title: this.dataDet.name, 
						path: '/pages/youhuiquan/hddet?id='+this.dataDet.id+'&scene='+uni.getStorageSync('userInfo').id
					}
				},
		onShow() {
			let that = this
			this.optDet()
			uni.request({
				url:'https://layer.boyaokj.cn/api/act/ordershow',
				data:{
					act_id:this.id
				},
				success(res) {
					if(res.data.code == 200){
						console.log(res.data)
						that.orderlist = res.data.data
					}else if(res.data.code == -1){
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
					}
				}
			})
			let shou = setInterval(function(){
				that.sicai()
			},5000)
		},
		onUnload() {
			console.log('log')
			clearInterval(this.ding); 
			clearInterval(this.shou); 
			this.animationData = {}
		},
		methods:{
			sicai(){
				if(this.shang){
					this.animation.translateX(0).step({duration:500})
					this.animationData = this.animation.export()
					this.shang = !this.shang
					return
				}else{
					this.animation.translateX(300).step({duration:500})
					this.animationData = this.animation.export()
					this.shang = !this.shang
					return
				}
			},
			finish(){
				console.log(Math.ceil(Math.random()*10))
				this.suiji = Math.ceil(Math.random()*10)
			},
			pay(){
				let that = this
				uni.request({
					url:'https://layer.boyaokj.cn/api/service/act',
					method:'GET',
					data:{
						user_id:uni.getStorageSync('userInfo').id,
						act_id:this.dataDet.id,
						name:this.dataDet.name,
						mobile:uni.getStorageSync('userInfo').mobile,
					},
					success(res) {
						if(res.data.code == 200){
							uni.navigateTo({
								url:'../my/pay?id='+res.data.data.service_id+'&price='+that.dataDet.price+'&name='+that.dataDet.name
							})
						}else if(res.data.code == -1){
							uni.showToast({
								title:res.message,
								icon:'none'
							})
						}
					console.log(res)
					}
				})
			},
			childcha(id){
				clearInterval(this.ding); 
				this.id = id
				this.optDet()
			},
			tomap() {
				clearInterval(this.ding); 
				uni.openLocation({
					latitude: JSON.parse(this.dataDet.lat),
					// latitude:this.dataDet.lat,
					longitude: JSON.parse(this.dataDet.lng),
					// longitude:this.dataDet.lng,
					name: this.dataDet.name,
					address: this.dataDet.address
				});
			},
			optDet(){
				let that = this
				uni.request({
					url:'https://layer.boyaokj.cn/api/act/detail',
					data:{
						id:this.id
					},
					success(res) {
						let imglist = []
						if(res.data.code == 200){
							for(let i in res.data.data.recomment){
								imglist.push(Array.from(res.data.data.recomment[i].images.split('|'))[0])
							}
							that.childimg = imglist
							that.dataDet = res.data.data
							that.content = that.formatRichText(res.data.data.content)
							that.intervalTime(that.dataDet.endtime)
							that.ding = setInterval(function(){
								if(that.second == 0 && that.minute == 0 && that.hour == 0 && that.day == 0){
									clearInterval()
								}else if(that.second == 0){
									that.second = 60
									if(that.minute == 0){
										that.minute = 60
										if(that.hour == 0){
											that.hour = 24
											if(that.day != 0){
												that.day--
											}
										}else{
											that.hour--
										}
									}else{
										that.minute--
									}
								}else{
									that.second--
								}
							},1000)
						}else{
							uni.showToast({
								title:res.data.message,
								icon:'none'
							})
						}
					}
				})
			},
			// 计算时间差
			intervalTime(endTime) {
			    // var timestamp=new Date().getTime(); //计算当前时间戳
			    var date1 = (Date.parse(new Date()))/1000;//开始时间
			    var date2 = endTime; //结束时间
			    // var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数
			    var date3 =  (date2- date1)*1000; //时间差的毫秒数
			    //计算出相差天数
			    var days = Math.floor(date3 / (24 * 3600 * 1000));
			    //计算出小时数
			    var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
			    var hours = Math.floor(leave1 / (3600 * 1000));
			    //计算相差分钟数
			    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
			    var minutes = Math.floor(leave2 / (60 * 1000));
			    //计算相差秒数
			    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
			    var seconds = Math.round(leave3 / 1000);
					console.log(days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
					this.day = days
					this.hour = hours
					this.minute = minutes
					this.second = seconds
			},
			// that.content = that.formatRichText(res.data.data.data)
			formatRichText(html) {
					let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
						match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
						match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
						match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
						return match;
					});
					newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
						match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
						return match;
					});
					newContent = newContent.replace(/<br[^>]*\/>/gi, '');
					newContent = newContent.replace(/\<img/gi,
						'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
					return newContent;
				}
		}
	}
</script>

<style>
	.xainzhi{
		display: flex;
		align-items: center;
		background-color: rgba(0,0,0,.5);
		padding-left: 20rpx;
		border-radius: 40rpx;
		padding-right: 20rpx;
	}
	/* .xainzhi view{
		max-width: 240rpx;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	} */
	.shishi swiper{
		height: 45rpx;
		padding-left: 0;
	}
	.shishi{
		position: fixed;
		top: 110rpx;
		left: -600rpx;
		/* left: 0; */
		width: 600rpx;
		margin: auto;
		z-index: 99;
		padding-left: 0;
	}
	.shishi swiper-item{
		display: flex;
		align-items: center;
		color: #fff;
		box-sizing: border-box;
		font-size: 26rpx;
		letter-spacing: 2px;
		padding-left: 0;
	}
	.shishi swiper-item image{
		width: 40rpx;
		height: 40rpx;
		border-radius: 40rpx;
		margin-right: 10rpx;
	}
	.zfbox{
		padding: 10rpx 0rpx 0rpx 0;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-end;
	}
	.zhuanfa::before{
		width: 40rpx;
		height: 40rpx;
	}
	.zhuanfa::after{
		border: 0;
		background-size: 100%;
		/* background-color: #fff; */
		width: 40rpx;
		height: 40rpx;
	}
	.zhuanfa{
		width: 40rpx;
		height: 40rpx;
		/* background: #40A9FF; */
		/* border-radius: 25rpx; */
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: revert;
		border: 0rpx;
		background-image: url(http://hlstore.yimetal.cn/2021/lawyer123/zhuan.png);
		background-size: 100%;
		background-repeat: no-repeat;
		position: absolute;
		top: 0;
		right: 0rpx;
		padding: 0;
		}
	.bboxright{
		width: 210rpx;
		height: 72rpx;
		background: #40A9FF;
		border-radius: 40rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.jieshu span{
		color: #F75B63;
	}
	.jieshu{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.botbox{
		width: 750rpx;
		/* height: 108rpx; */
		background-color: #fff;
		padding: 40rpx 16rpx 40rpx 16rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.waibox{
		width: 750rpx;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	.mk3mobile span{
		color: #40A9FF;
	}
	.mk3mobile{
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.mk3xiangq{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #51565D;
	}
	.mk3tit{
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
	.detmk3{
		width: 702rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin: auto;
		padding: 16rpx 16rpx 20rpx 16rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
	}
	.chakan{
		width: 104rpx;
		height: 36rpx;
		background: #40A9FF;
		border-radius: 20rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.mk2jprice{
		font-size: 16rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		text-decoration:line-through;
	}
	.mk2nprice span{
		font-size: 21rpx;
	}
	.mk2nprice{
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #F5222D;
		margin-right: 16rpx;
	}
	.pfex{
		display: flex;
		align-items: flex-end;
	}
	.plist{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 10rpx;
		width: 520rpx;
	}
	.mk2tit2{
		width: 520rpx;
		height: 74rpx;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.dmk2left image{
		width: 128rpx;
		height: 128rpx;
	}
	.datlist{
		width: 670rpx;
		margin: auto;
		padding-top: 12rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1rpx solid #D2D2D2;
	}
	.mk2tit{
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #51565D;
		margin: 16rpx;
	}
	.detmk2{
		width: 702rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin: auto;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		padding-top: 16rpx;
	}
	.daoh{
		width: 104rpx;
		height: 36rpx;
		background: #40A9FF;
		border-radius: 20rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.mingz{
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		width: 450rpx;
		margin-right: 60rpx;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.weizhi image{
		width: 26rpx;
		height: 26rpx;
		margin-right: 10rpx;
	}
	.weizhi{
		width: 702rpx;
		height: 72rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: 20rpx auto;
		display: flex;
		align-items: center;
		padding: 0 25rpx 0 29rpx;
		box-sizing: border-box;
	}
	.sandui{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		position: relative;
	}
	.qiyi view{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		margin-left: 6rpx;
	}
	.qiyi image{
		width: 28rpx;
		height: 28rpx;
	}
	.qiyi{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-right: 36rpx;
	}
	.hui{
		width: 670rpx;
		height: 1rpx;
		background-color: #D2D2D2;
		margin: auto;
		margin-top: 12rpx;
		margin-bottom: 14rpx;
	}
	.sjrright{
		font-size: 34rpx;
		color: #F5222D;
	}
	.sjrleft{
		font-size: 25rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #F5222D;
	}
	.sjright{
		display: flex;
		align-items: flex-end;
	}
	.jprice{
		text-decoration:line-through;
		font-size: 17rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		margin-left: 20rpx;
	}
	.nprice span{
		font-size: 25rpx;
	}
	.nprice{
		font-size: 34rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #F5222D;
	}
	.sjleft{
		display: flex;
		align-items: flex-end;
	}
	.shujing{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 9rpx;
	}
	.hxiao span{
		color: #F5222D;
	}
	.hxiao{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #5D6168;
	}
	.xiao image{
		width: 19rpx;
		height: 22rpx;
		margin-right: 6rpx;
	}
	.xiao{
		display: flex;
		align-items: center;
	}
	.title{
		width: 480rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.dettit{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.hdmk1{
		width: 702rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin: auto;
		padding: 20rpx 16rpx 20rpx 16rpx;
		box-sizing: border-box;
		background-color: #fff;
		margin-top: 20rpx;
	}
	.swiper image{
		width: 670rpx;
		/* height: 293rpx; */
		height: 502rpx;
	}
	.swiper{
		/* height: 293rpx; */
		height: 502rpx;
		width: 710rpx;
		margin: 18rpx auto;
	}
	page{
		background-color: #F4F7F7;
		padding-bottom: 180rpx;
	}
</style>
