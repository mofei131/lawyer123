 <template>
	 <view>
		 <view class="dropDown">
		 	<view class="uni-form-item uni-column">
		 		<picker mode=selector :range="diqu" :value="index">
		 			<label class="">{{diqu[index]}}</label>
		 		</picker>
		 	</view>
			<view class="downicon">
				<image src="@/static/images/back.png"></image>
			</view>
			<view class="search">
				<image src="@/static/images/search.png"></image>
				<input type="text" v-model="input" placeholder="请输入搜索内容" placeholder-style="color:#fff;font-size:28rpx;"/>
			</view>
		 </view>
	 </view>
</template>

<script>
	export default{
		data(){
			return{
				diqu:["奎文区","高新区","潍城区"],
				index:0,
				input:''
			}
		}
	}
</script>

<style>
	.dropDown{
		width: 520rpx;
		color: #fff;
		font-size: 24rpx;
		display: flex;
		position: absolute;
		top: 60rpx;
		z-index: 10;
		font-size: 24rpx;
	}
	.uni-column{
		margin-top: 16rpx;
		margin-left: 40rpx;
	}
	.downicon{
		padding-top: 12rpx;
	}
	.downicon image{
		width: 21.12rpx;
		height: 10.56rpx;
		margin-left: 8rpx;
	}
	.search{
		display: flex;
		width: 360rpx;
		height: 70rpx;
		background: rgb(255,255,255,.34);
		border-radius: 32rpx;
		margin: auto;
		box-sizing: border-box;
	}
	.search image{
		width: 30rpx;
		height: 30rpx;
		margin: 20rpx 0 0 14rpx;
	}
	.search input{
		width: 300rpx;
		margin: auto;
		height: 70rpx;
		box-sizing: border-box;
	}
</style>
