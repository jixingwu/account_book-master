//logs.js
var util = require('../../utils/util.js')
Page({
    data: {
        logs: []
    },
    onLoad: function () {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(function (log) {
                return util.formatTime(new Date(log))
            })
        })
    },

    // 消费
    gotoComsumption: function () {
        wx.navigateTo({
            url: './consumption/consumption'
        })
    },

    // 入账
    gotoEarn: function () {
        wx.navigateTo({
            url: './earn/earn'
        })
    },
})
