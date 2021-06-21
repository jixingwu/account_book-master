Page({
    data: {
        imgUrls: [
            '../../images/guide_1.jpg',
            '../../images/guide_2.jpg',
            '../../images/guide_3.jpg',
            '../../images/guide_4.jpg'
        ],
        indicatorDots: true,
        interval: 5000,
        duration: 1000
    },
    handleStart() {
        // TODO: 访问历史的问题
        wx.switchTab({
            url: '../index/index'
        })
    },
})