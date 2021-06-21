//获取应用实例
var app = getApp()
Page({
    onShareAppMessage: function (res) {
      return {
        title: 'ECharts 可以在微信小程序中使用啦！',
        path: '/pages/index/index',
        success: function () {},
        fail: function () {}
      }
    },
    data: {
        moviesData : [],
        userInfo: {}
    },
    //事件处理函数
    bindViewTap: function() {
        wx.switchTab({
            url: '../my/my'
        })
    },
    onLoad: function () {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo
            })
        })
        app.getLocastroge();
        wx.request({
            url: 'https://api.douban.com//v2/movie/top250',
            header: {
                'content-type': 'application/json' // 默认值
            },
            dataType:'JSONP',
            success: function (res) {
                console.log(res.data)
            }
        });
    },
    
    // 消费
    gotoComsumption: function(e) {
        wx.navigateTo({
            url: '../account/consumption/consumption'
        })
    },

    // 入账
    gotoEarn: function (e) {
        wx.navigateTo({
            url: '../account/earn/earn'
        })
    },
    // 打开分析图
    open: function () {
      wx.navigateTo({
		  url: '../pie/index'
      })
    },

    // 打开多图页面
    openMulTip(){
        wx.navigateTo({
            url: '../multiCharts/index'
        });
    },
	openImage(){
		wx.navigateTo({
			url: '../images/images',
		});
	},
})