<template>
	<view>
		<view class="modtitle">
			<view class="blue"></view>
			<view>第三步:资料设置</view>
		</view>
		<view class="collect">
			<view class="intitem">
				<view class="tips">所属城市：</view>
				<pickcity @getcity="getCity"></pickcity>
			</view>
		<view class="boder"></view>
			<view class="intitem">
				<view class="tips">所属律所：</view>
				<input class="gather" type="text" value="" placeholder="请输入所属律所" v-model="unit" placeholder-style="color: #C1C2C3;"/>
			</view>
		<view class="boder"></view>
		<view class="intitem">
			<view class="tips">毕业院校：</view>
			<input class="gather" type="text" value="" placeholder="请输入毕业院校" v-model="college" placeholder-style="color: #C1C2C3;"/>
		</view>
		<view class="boder"></view>
			<view class="intitem">
				<view class="tips">学历：</view>
				<picker class="gather" @change="anjianChange1" :value="index1" :range="array1" range-key="record">
					<view class="flex-row">
						<text>{{array1[index1].record}}</text>
						<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
					</view>
				</picker>
			</view>
			<view class="boder"></view>
			<view class="intitem">
				<view class="tips">专业：</view>
				<input class="gather" type="text" value="" placeholder="请输入专业" v-model="major" placeholder-style="color: #C1C2C3;"/>
			</view>
			<view class="boder"></view>
			<view class="imgitem">
				<view class="imgtitle">个人简介：</view>
				<textarea class="mark" type="text" v-model="mark" placeholder="请输入你的个人简介" placeholder-style="color: #999999;"></textarea>
			</view>
			<!-- <view class="kong"></view> -->
			
	</view>
	<view class="next" @tap="show()">提交</view>
	<!-- <tankuang :box='box' v-show="hide" v-on:submit="submit" v-on:show="show" v-on:cak="cak"></tankuang> -->
	<view class="xiyibox" v-show="hide">
		<view class="boxwite">
			<view class="tishi">提示</view>
			<view class="flec">
				<image @tap="agreementSuccess" class="fix"
					:src="agreement==true?'../../static/icon/ty0.png':'../../static/icon/ty1.png'" style="width: 46rpx;
	  height: 46rpx;"></image>
			<view class="yuedu">请阅读并同意<text class="shixia" @tap="cak()">《{{box.title}}》</text></view>
			</view>
			<view class="binglie">
				<!-- <view class="ck" @tap="cak()">查看协议</view> -->
				<view class="ty2"  v-if="agreement==true">同意协议</view>
					<view class="ty" @tap="submit()"  v-if="agreement==false">同意协议</view>
			</view>
			<image src="@/static/icon/closeicon.png" class="close" @tap="show()"></image>
		</view>
	</view>
	</view>
</template>

<script>
	import pickcity from '../components/pickcity/pickcity.vue'
	import tankuang from '../components/tankuang/tankuang.vue'
	export default{
		components:{
			pickcity,
			tankuang
		},
		data(){
			return{
				hide:false,
				agreement:true,
				box:{
					title:'平台律师服务协议'
				},
				city:'',
				unit:'',
				college:'',
				array1: [{
					record: '无',id:0
				}, {
					record: '小学',id:1
				}, {
					record: '中学',id:2
				}, {
					record: '专科',id:3
				}, {
					record: '本科',id:4
				}, {
					record: '硕士',id:5
				}, {
					record: '博士',id:6
				}],
				index1: 0,
				major:'',
				mark:'',
				type:'',
				name:'',
				mobile:'',
				gender:'',
				photo:'',
				idcard:'',
				idcard_fan:'',
				zhiyezhenghao:'',
				zhiyenianxian:'',
				shehuizhiwu:'',
				zhiyezhengshu_xingming:'',
				zheyezhengshu_nianjian:'',
				cifacongyezhezhengshu:''
			}
		},
		onLoad(){
			let that = this
			uni.getStorage({
			key:"type",
			success(e){
				that.type = e.data
			}
			}) 
				uni.getStorage({
				key:'cache1',
				success(e){
				that.name = e.data.name
				that.mobile = e.data.mobile
				that.gender = e.data.gender
				that.photo = e.data.photo
				// that.idcard = e.data.idcard
				// that.idcard_fan = e.data.idcard_fan
				}
				})
				 uni.getStorage({
					key:'cache2',
					success(e){
						console.log(e.data.shehuizhiwu)
						that.zhiyezhenghao = e.data.zhiyezhenghao
						that.zhiyenianxian = e.data.zhiyenianxian
						that.shehuizhiwu = e.data.shehuizhiwu
						that.zhiyezhengshu_xingming = e.data.zhiyezhengshu_xingming
						that.zheyezhengshu_nianjian = e.data.zheyezhengshu_nianjian
						that.cifacongyezhezhengshu = e.data.cifacongyezhezhengshu
					}
				})
		},
		methods:{
			agreementSuccess() {
				this.agreement = !this.agreement;
			},
			cak(){
				uni.navigateTo({
					url:'../components/tankuang/xiyipingtai'
				})
			},
			show(){
				this.hide = !this.hide
			},
			getCity(e){
				this.city = e.cityid
			},
			anjianChange1(e) {
				this.index1 = e.detail.value;
			},
			submit(){
				if (!this.unit) {
					uni.showToast({
						title: '请输入所属律所',
						icon: 'none',
					})
					return
				}
				if (!this.college) {
					uni.showToast({
						title: '请输入毕业院校',
						icon: 'none',
					})
					return
				}
				if (!this.major) {
					uni.showToast({
						title: '请输入所属专业',
						icon: 'none',
					})
					return
				}
				if (!this.mark) {
					uni.showToast({
						title: '请输入简介',
						icon: 'none',
					})
					return
				}
				let that = this
				uni.request({
					url: 'https://layer.boyaokj.cn/api/layer/auth',
					method: 'POST',
					data: {
						// user_id: uni.getStorageSync('userInfo').id,
						user_id: uni.getStorageSync('userInfo').user_id,
						type:that.type,
						name:that.name,
						mobile:that.mobile,
						gender:that.gender,
						photo:that.photo,
						// idcard:that.idcard,
						// idcard_fan:that.idcard_fan,
						zhiyezhenghao:that.zhiyezhenghao,
						zhiyenianxian:that.zhiyenianxian,
						shehuizhiwu:that.shehuizhiwu,
						zhiyezhengshu_xingming:that.zhiyezhengshu_xingming,
						zheyezhengshu_nianjian:that.zheyezhengshu_nianjian,
						cifacongyezhezhengshu:that.cifacongyezhezhengshu,
						city:that.city,
						lvsuo:that.unit,
						school:that.college,
						xueli:that.array1[that.index1].id,
						zhuanye:that.major,
						jianjie:that.mark
					},
					success(res){
						that.hide = !that.hide
						uni.removeStorage({key: 'type',})
						uni.removeStorage({key: 'cache1',})
						uni.removeStorage({key: 'cache2'})
						if(res.data.code == 200){
							uni.showToast({
								title: '提交成功',
								duration:1000
							})
							setTimeout(function() {
							uni.switchTab({
								url:'../my/mine'
							})
							},1000)
						}else if(res.data.message == '您已经申请过,请勿重复申请'){
							uni.showToast({
								title: '您已认证，请勿重复认证',
								icon:'error'
							})
							uni.removeStorage({key: 'type',})
							uni.removeStorage({key: 'cache1',})
							uni.removeStorage({key: 'cache2'})
						}
						else{
							uni.showToast({
								title: '请确保信息完整',
								icon:'error'
							})
						}
					},fail(res){
						uni.showToast({
							title: '提交失败',
						})
					}
			})
		}
		}
	}
</script>

<style>
	page{
		background: #F4F7F7;
	}
	.flex-row{
		width: 510rpx;
		justify-content: space-between!important;
	}
	.fa-angle-down{
		transform:rotate(-90deg);
	}
	.modtitle{
		width: 680rpx;
		margin: 20rpx auto;
		display: flex;
	}
	.blue{
		width: 6rpx;
		height: 28rpx;
		background: #40a9ff;
		margin-top: 6rpx;
	}
	.modtitle view{
		font-size: 28rpx;
		font-family: Helvetica;
		color: #51565D;
		margin-left: 9rpx;
	}
	.collect{
		width: 720rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin: auto;
		padding-bottom: 30rpx;
	}
	.intitem{
		display: flex;
		height: 108rpx;
		width: 680rpx;
		margin: auto;
		padding-top: 35rpx;
		box-sizing: border-box;
	}
	.tips{
		width: 170rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.gather{
		width: 510rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #5D6168;
	}
	.boder{
		height: 1rpx;
		width: 680rpx;
		margin: auto;
		background: #E8E8E8;
	}
	.intitem picker{
		width: ;
	}
	.kong{
		width: 680rpx;
		height: 12rpx;
		background: #FAFAFA;
		margin: auto;
	}
	.imgtitle{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		width: 680rpx;
		margin: auto;
		margin-top: 30rpx;
		margin-bottom: 10rpx;
	}
	.classfiyimg{
		width: 680rpx;
		margin: auto;
		display: block;
	}
	.next{
		width: 680rpx;
		height: 76rpx;
		background: #40A9FF;
		border-radius: 39rpx;
		font-size: 28rpx;
		font-family: Helvetica;
		color: #FFFFFF;
		margin: 53rpx auto;
		text-align: center;
		padding-top: 20rpx;
		box-sizing: border-box;
	}
	fa-icon{
		margin-right: 20rpx;
	}
	.flex-row{
		display: flex;
		justify-content: space-between;
	}
	.mark{
		width: 710rpx;
		height: 280rpx;
		background: #F4F4F4;
		border-radius: 8rpx;
		margin: 20rpx auto;
		box-sizing: border-box;
		padding: 20rpx 30rpx 20rpx 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
	}
	
	
	.fix{
		margin-top: 0;
	}
	.flec{
		display: flex;
		    justify-content: center;
	}
	.close{
		width: 66rpx;
		height: 66rpx;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 20;
	}
	.shixia{
		color: #1890FF;
		/* border-bottom: 1rpx solid #666; */
	}
	.tishi,.yuedu{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		text-align: center;
	}
	.tishi{
		margin-bottom: 40rpx;
	}
	.xiyibox{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		background: rgb(0,0,0,.5);
		z-index: 10;
		box-sizing: border-box;
		padding-top: 60%;
	}
	.boxwite{
		width: 720rpx;
		/* height: 368px; */
		background: #FFFFFF;
		border-radius: 14rpx;
		box-sizing: border-box;
		padding-top: 68rpx;
		margin: auto;
		height: 368rpx;
		position: relative;
	}
	.binglie{
		display: flex;
		justify-content: space-between;
		width: 680rpx;
		margin: auto;
		margin-top: 79rpx;
	}
	.binglie view{
		width: 334rpx;
	}
	.ck{
		height: 76rpx;
		border-radius: 39rpx;
		border: 1px solid #1890FF;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #1890FF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.ty{
		height: 76rpx;
		border-radius: 39rpx;
		border: 1px solid #1890FF;
		background: #1890FF;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: auto;
		
	}
	.ty2{
		height: 76rpx;
		border-radius: 39rpx;
		border: 1px solid #BDBDBD;
		background: #BDBDBD;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: auto;
		
	}
</style>
