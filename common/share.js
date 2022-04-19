export default {
	onShareAppMessage: function (ops) {
	    wx.showShareMenu({
	      withShareTicket: true,
	      menus: ['shareAppMessage', 'shareTimeline']
	    })
	},
	  onShareTimeline: function () {
	    return {
	      title: '123法律服务',
	      query: {
				scene:uni.getStorageSync('userInfo').user_id
	        // key: 'value' //要携带的参数
	      },
				// imageUrl: 'http://hlstore.yimetal.cn/2021/tuochebang/my_touxiang.png'
	    }		
	  },
}