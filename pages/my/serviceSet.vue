<template>
	<view>
		<view class="modtitle">
			<view class="blue"></view>
			<view>服务设置</view>
		</view>
		<view class="collect">
			<view class="intitem">
				<view class="tips">图文资讯：</view>
				<input class="gather" type="digit" value="" placeholder="请手动输入图文咨询价格" v-model="chat" placeholder-style="color: #C1C2C3;"/>
			</view>
		<view class="boder"></view>
		<view class="intitem">
				<view class="tips">电话咨询：</view>
				<input class="gather" type="digit" value="" placeholder="请手动输入电话咨询价格" v-model="phone" placeholder-style="color: #C1C2C3;"/>
			</view>
		<view class="boder"></view>
		<view class="intitem">
				<view class="tips">见面资讯：</view>
				<input class="gather" type="digit" value="" placeholder="请手动输入见面咨询价格" v-model="meet" placeholder-style="color: #C1C2C3;"/>
			</view>
		<view class="boder"></view>
		<view class="intitem">
				<view class="tips">聘请律师：</view>
				<input class="gather" type="digit" value="" placeholder="请手动输入受聘价格" v-model="emplay" placeholder-style="color: #C1C2C3;"/>
			</view>
			<view class="boder" style="margin-bottom: 10rpx;"></view>
			<view class="boder"></view>
			<view class="intitem">
					<view class="tips2">擅长领域：</view>
					<view class="tipint">请手动输入擅长领域</view>
				</view>
			<view class="labellist">
				<view class="labelitem" v-for="(item,index) in type" :key="index" :class="{ clever: cardlist.indexOf(item.id) != -1 }" @tap="select(item.id)">
					{{item.name}}
				</view>
			</view>
			<view class="boder"></view>
			<view class="servicepirce" v-for="(item,index) in sevedata" :key="index">
				<view class="sevname">{{item.service}}：</view>
				<input type="digit" value="" class="serviceinp" placeholder="请手动输入服务价格" v-model="item.price" placeholder-style="color: #C1C2C3;"/>
				<image src="../../static/icon/deleteicon.png" @tap="delect(item.id)"></image>
			</view>
			<view class="addmore" @tap="cancel()">
				<image src="../../static/icon/addicon.png"></image>
				<view>添加更多服务项目</view>
			</view>
	</view>
	<view class="molde" v-show="molde">
		<view class="eject">
			<view class="ejtitle">是否添加新的案件聘请服务</view>
			<picker class="gather" @change="anjianChange1" :value="index1" :range="array1" range-key="name">
				<view class="flex-row">
					<text>{{array1[index1].name}}</text>
					<fa-icon type="angle-down" color="gray" style="margin-left:16rpx;"></fa-icon>
				</view>
			</picker>
			<view class="twobtn">
				<view @tap="cancel()">取消</view>
				<view @tap="press()">确定</view>
			</view>
		</view>
	</view>
	<view class="next" @tap="toUrl()">保存</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				chat:'',
				phone:'',
				meet:'',
				emplay:'',
				type:[],
				cardlist:[],
				raw:false,
				ji:'',
				array1: [],
				index1: 0,
				molde:false,
				sevedata:[],
				zancun:'',
				zancunid:''
			}
		},
		onLoad(){
			let that = this
			uni.request({
				url:'https://layer.boyaokj.cn/api/layer/getCaseType',
				success(res) {
					that.type = res.data.data
				}
			})
			uni.request({
				url:'https://layer.boyaokj.cn/api/service/getOtherService',
				success(res) {
					console.log(res.data.data)
					that.array1 = res.data.data
					that.zancun = res.data.data[0].name
					that.zancunid = res.data.data[0].id
				}
			})
		},
		onShow() {
			let that = this
			uni.request({
				url:'https://layer.boyaokj.cn/api/layer/getSettting',
				method:'GET',
				data:{
					user_id:uni.getStorageSync('userInfo').user_id
				},
				success(res) {
					console.log(res.data.data)
					that.chat = res.data.data.tuwen
					that.phone = res.data.data.dianhua
					that.meet = res.data.data.jianmian
					that.emplay = res.data.data.pinqing
					for(let i in res.data.data.case_type){
						that.cardlist.push(res.data.data.case_type[i].id)
					}
					for(let y in res.data.data.more_service){
						that.sevedata.push({
							id:res.data.data.more_service[y].service_id,
							service:that.type[res.data.data.more_service[y].service_id].name,
							price:res.data.data.more_service[y].price
						})
					}
				}
			})
		},
		methods:{
			delect(id){
				console.log(id)
				this.sevedata = this.sevedata.filter(item => item.id !== id)
			},
			toUrl(){
				if (!this.chat) {
					uni.showToast({
						title: '请输入图文咨询价格',
						icon: 'none',
					})
					return
				}
				if (!this.phone) {
					uni.showToast({
						title: '请输入电话咨询价格',
						icon: 'none',
					})
					return
				}
				if (!this.meet) {
					uni.showToast({
						title: '请输入见面咨询价格',
						icon: 'none',
					})
					return
				}
				if (!this.emplay) {
					uni.showToast({
						title: '请输入受聘价格',
						icon: 'none',
					})
					return
					}
				let that = this
				let setting =[
					{id:1,price:that.chat},
					{id:2,price:that.phone},
					{id:3,price:that.meet},
					{id:10,price:that.emplay},
				]
				for(let i in that.sevedata){
					if (!that.sevedata[i].price) {
						uni.showToast({
							title: '请输入自定义服务价格',
							icon: 'none',
						})
						return
						}
					setting.push({
						id:that.sevedata[i].id,
						price:that.sevedata[i].price
					})
				}
				let paramsJson = JSON.stringify(setting);
				// console.log(paramsJson)
				// console.log(JSON.stringify(that.cardlist).replace(/\[|]/g, ''))
				uni.request({
					url:'https://layer.boyaokj.cn/api/layer/setting',
					method: 'POST',
					data:{
						user_id:uni.getStorageSync('userInfo').id,
						setting:paramsJson,
						area:JSON.stringify(that.cardlist).replace(/\[|]/g, '')
					},
					success(res) {
						if(res.data.code == 200){
							uni.showToast({
								title: '提交成功',
								duration:1000
							})
							setTimeout(function() {
							uni.switchTab({
								url:'./mine'
							})
							},1000)
					}
					}
				})
			},
			select(index) {
		let that = this;
		if (that.cardlist.indexOf(index) == -1) {
			that.cardlist.push(index); //选中添加到数组里
		} else {
			that.cardlist.splice(that.cardlist.indexOf(index), 1); //取消
				}
			},
			anjianChange1(e) {
				let that = this
				this.index1 = e.detail.value;
				this.zancun = this.array1[e.detail.value].name
				this.zancunid = this.array1[e.detail.value].id
				console.log(that.sevedata)
			},
			cancel(){
				this.molde = !this.molde
			},
			press(){
				let that = this
				this.sevedata.push({
					service:this.zancun,
					id:this.zancunid,
				})
				this.molde = !this.molde
			}
	},
	}
</script>

<style>
	.servicepirce{
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		width: 680rpx;
		margin: auto;
		margin-top: 13rpx;
	}
	.servicepirce view{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		/* margin-top: 10rpx; */
		width: 240rpx;
	}
	.servicepirce input{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.servicepirce image{
		width: 60rpx;
		height: 60rpx;
	}
	.twobtn view:nth-child(1){
		width: 334rpx;
		height: 76rpx;
		border-radius: 39rpx;
		border: 1px solid #1890FF;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #1890FF;
		text-align: center;
		padding-top: 18rpx;
		box-sizing: border-box;
	}
	.twobtn view:nth-child(2){
		width: 334rpx;
		height: 76rpx;
		border-radius: 39rpx;
		border: 1px solid #1890FF;
		background: #1890FF;;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #fff;
		text-align: center;
		padding-top: 18rpx;
		box-sizing: border-box;
	}
	.twobtn{
		display: flex;
		justify-content: space-around;
		margin-top: 78rpx;
	}
	.gather{
		margin: auto;
	}
	.flex-row{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		margin: auto;
		text-align: center;
		justify-content: center;
	}
	.ejtitle{
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		text-align: center;
		margin-bottom: 44rpx;
	}
	.eject{
		width: 720rpx;
		height: 368rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		position: fixed;
		top: 25%;
		margin-left: 15rpx;
		padding-top: 68rpx;
		box-sizing: border-box;
	}
	.molde{
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgb(0,0,0,.5);
		z-index: 5;
	}
	page{
		background: #F4F7F7;
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
		padding-bottom: 45rpx;
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
		margin-top: 15rpx;
	}
	.tips2{
		width: 170rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
	}
	.tipint{
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #c1c2c3;
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
	.labellist{
		width: 680rpx;
		margin: auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.labelitem{
		width: 116rpx;
		height: 32rpx;
		border-radius: 2rpx;
		border: 1px solid #999999;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #51565D;
		text-align: center;
		margin-bottom: 20rpx;
	}
	.clever{
		color: #40A9FF;
		border: 1rpx solid #40A9FF;
	}
	.addmore{
		display: flex;
		margin: auto;
		justify-content: space-around;
		width: 305rpx;
		margin-top: 40rpx;
	}
	.addmore image{
		width: 48rpx;
		height:48rpx;
	}
	.addmore view{
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #40A9FF;
	}
	.sevname{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		}
</style>
