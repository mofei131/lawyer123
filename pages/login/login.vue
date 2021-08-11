<template>
	<view>
		<!-- <view class="flex-row mx-center sx-center">
			<image src="/static/images/banner.png" class="title-img"></image>
		</view> -->
		<view class="page-login">
			<view v-if="canIUse||canIGetUserProfile">
				<view class='login-header'>
					<image style="width: 140rpx; height: 140rpx;" mode="aspectFit" src="@/static/icon/icon1.png">
					</image>
					<view class="name">登录</view>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称、头像、地区等)</text>
				</view>

				<view class="login-box">
					<!--新版登录方式-->
					<button v-if="canIGetUserProfile" class='login-btn' type='primary' @click="bindGetUserInfo"> 授权登录
					</button>
					<!--旧版登录方式-->
					<button v-else class='login-btn' type='primary' open-type="getUserInfo" withCredentials="true"
						lang="zh_CN" @getuserinfo="bindGetUserInfo"> 授权登录 </button>
				</view>
			</view>
			<view v-else class="text-center">
				请升级微信版本
			</view>
		</view>






		<view style="margin-top:80rpx;">
			<form @submit="submit">
				<view class="flex-column mx-center sx-center ">
					<view class="flex-row mx-between sx-center  ">
						<text style="font-size: 36rpx;color:#EBEBEB;">账户</text>
						<!-- <text class="gui-text-small" style="color:#EBEBEB;">手机号登录》</text> -->
					</view>
					<view class="flex-column mx-center sx-center " style="margin: 20rpx 0;">
						<input type="text" class=""
							style="padding-left: 20rpx;opacity: 0.39;width: 636rpx;height:96rpx;line-height:96rpx;"
							name="username" placeholder="登录账户" />
					</view>
					<view class="flex-row mx-between sx-center  ">
						<text style="font-size: 36rpx;color:#EBEBEB;">密码</text>
					</view>
					<view class="flex-column mx-center sx-center " style="margin: 20rpx 0;">
						<input type="password" class=""
							style="padding-left: 20rpx;opacity: 0.39;width: 636rpx;height:96rpx;line-height:96rpx;"
							name="password" placeholder="登录密码" />
					</view>
					<view class="gui-flex gui-rows gui-justify-content-end  ">
						<text class="gui-text-small" style="color:#EBEBEB;" @tap="forgetPwd">忘记密码？</text>
					</view>
					<view class="flex-column mx-center sx-center ">
						<button class=" denglu" formType="submit" style="border: 0px;"><text
								class="gui-color-white -text">登 录</text></button>
						<button class=" create" style="border: 0px;"><text class="gui-color-white -text"
								@tap="tozhuce">创建账户</text></button>

					</view>

				</view>

			</form>
		</view>

	</view>
</template>

<script>
	export default {
		onLoad() {
			var _this = this;
			console.log(uni.getUserProfile);
			if (uni.getUserProfile) {
				this.canIGetUserProfile = true;
			}
			//判断若是版本不支持新版则采用旧版登录方式
			//查看是否授权
			if (!this.canIGetUserProfile) {
				console.log('----------------旧版获取用户信息');
				uni.getSetting({
					success: function(res) {
						if (res.authSetting['scope.userInfo']) {
							uni.getUserInfo({
								provider: 'weixin',
								success: function(res) {
									console.log(res);
									_this.userInfo = res.userInfo;
									try {
										_this.login();
									} catch (e) {}
								},
								fail(res) {}
							});
						} else {
							// 用户没有授权
							console.log('用户还没有授权');
						}
					}
				});
			}

		},
		data() {
			return {
				sessionKey: '',
				openId: '',
				nickName: null,
				avatarUrl: null,
				userInfo: {},
				canIUse: uni.canIUse('button.open-type.getUserInfo'),
				canIGetUserProfile: false,

			}
		},
		methods: {

			//登录授权
			bindGetUserInfo(e) {
				var _this = this;
				if (this.canIGetUserProfile) {
					//新版登录方式
					uni.getUserProfile({
						desc: '登录',
						success: (res) => {
							console.log('----------');
							console.log(res);
							_this.userInfo = res.userInfo;
							try {
								// _this.login();
							} catch (e) {}
						},
						fail: (res) => {
							console.log(res)
						}
					});
				} else {
					//旧版登录方式
					if (e.detail.userInfo) {
						//用户按了允许授权按钮
						//console.log('手动');
						console.log(e.detail.userInfo);
						_this.userInfo = e.detail.userInfo;
						try {
							_this.login();
						} catch (e) {}
					} else {
						console.log('用户拒绝了授权');
						//用户按了拒绝按钮
					}
				}
			},
			//登录
			login() {
				let _this = this;

				// 获取登录用户code
				uni.login({
					provider: 'weixin',
					success: async function(res) {
						//console.log(res);
						if (res.code) {
							let code = res.code;
				
							let res1 = await _this.$myRequest({
								url: 'wechat/login',
								data: {
									pid: 0,
									code
								}
							});
							// avater: null
							// city: null
							// country: null
							// create_time: "2021-08-10 14:42:26"
							// gender: null
							// id: 43
							// level: null
							// mobile: null
							// nickname: null
							// pid: 1
							// province: null
							// status: 0
							// token: "8579c449ef27a9bb782780840e23da35"
							// wallet: "0.00"
							console.log('==================================');
							console.log(res1);
							if (res1 && res.data) {
								console.log(res1);
							}
							//将用户登录code传递到后台置换用户SessionKey、OpenId等信息
							//...写用code置换SessionKey、OpenId的接口
							//置换成功调用登录方法_this.updateUserInfo();
						} else {
							uni.showToast({
								title: '登录失败！',
								duration: 2000
							});
							console.log('登录失败！' + res.errMsg)
						}
					},
				});
			},
			//向后台更新信息
			// updateUserInfo() {
			// 	uni.showLoading({
			// 		title: '登录中...'
			// 	});
			// 	let _this = this;
			// 	var params = {
			// 		openId: _this.openId,
			// 		nickName: _this.userInfo.nickName,
			// 		avatarUrl: _this.userInfo.avatarUrl,
			// 		gender: _this.userInfo.gender,
			// 		city: _this.userInfo.city,
			// 		province: _this.userInfo.province,
			// 		country: _this.userInfo.country,
			// 		unionId: '',
			// 	}
			// 	//console.log('登录');
			// 	//...后台登录的接口
			// },




			forgetPwd: function() {
				
			},
			tozhuce: function() {
				
			},
			async submit(e) {
				// 表单数据
				var formData = e.detail.value;
				console.log(formData);
				if (true) {
					let res = await this.$myRequest({
						url: 'user/login',
						method: 'POST',
						data: {
							mobile: formData.username,
							password: formData.password
						}

					});

					console.log(res);
					if (res.data.code > 0) {
						uni.setStorageSync('userInfo', res.data.data);
						uni.switchTab({
							url: '/pages/index/index'
						});
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					}


				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: 'none'
					});
				}
			}
		}
	}
</script>

<style>
	.login-logo {
		width: 180rpx;
		height: 180rpx;
		font-size: 80rpx;
		text-align: center;
		line-height: 120rpx;
		padding: 30rpx;
		border-radius: 18rpx;
	}

	.other-login-icons {
		width: 88rpx;
		height: 88rpx;
		text-align: center;
		font-size: 70rpx;
		margin: 20rpx;
	}

	.denglu {
		margin-top: 96rpx;
		background-color: #F53B6C;
		width: 436rpx;
		height: 96rpx;
		border-radius: 16rpx;
	}

	.create {
		background-color: #FA4D7B;
		width: 436rpx;
		height: 84rpx;
		border-radius: 16rpx;
		margin-top: 20rpx;
	}

	.title-img {
		width: 228rpx;
		height: 348rpx;
	}
</style>
