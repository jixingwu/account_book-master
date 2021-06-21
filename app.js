    //app.js
App({
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)
    },

    getUserInfo: function(cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: function(res) {
                that.globalData.userInfo = res.userInfo
                typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },
    // 获取用户浏览器的locastroge大小
    getLocastroge: function(){
        wx.getStorageInfo({
            success: function (res) {
                console.log(res.keys)
                console.log(res.currentSize)
                console.log(res.limitSize)
            }
        })
    },
    globalData: {
        userInfo: null
    }
})

// "pages/splash/splash",