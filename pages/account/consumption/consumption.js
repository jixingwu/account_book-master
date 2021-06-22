// pages/account/consumption/consumption.js

import Until from '../../../utils/util.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: Until.formatTime(new Date()).date,
        time: Until.formatTime(new Date()).time,
        rawData: [],
        multiArray: [['玫瑰', '绣球', '百合', '向日葵', '雏菊', '剑兰', '肥料', '保鲜剂'], ["红色", "白色", "黄色", "橙色", "紫色", "咖啡色", "奥斯汀", "多头"]],
        multiIndex: [0, 0],
        objectMultiArray: [],
        amount: '',
        unit_value: '',
        sum_value : '',
        remarks_value : '',
        oldStorageData : []
    },

    // 日期控制
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    // 时间控制
    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
    },

    bindMultiPickerChange: function(e){
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function(e){
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
          }
          data.multiIndex[e.detail.column] = e.detail.value;
          switch (e.detail.column) {
            case 0:
              switch (data.multiIndex[0]) {
                case 0://玫瑰
                  data.multiArray[1] = ["红色", "白色", "黄色", "橙色", "紫色", "咖啡色", "奥斯汀", "多头"];
                  break;
                case 1:// 绣球
                  data.multiArray[1] = ["0"];
                  break;
                case 2:// 百合
                  data.multiArray[1] = ["白色东方", "粉色东方", "黄色东方", "白色亚洲", "黄色亚洲", "红色亚洲", "黑色亚洲", "重瓣"];
                  break;
                case 3:// 向日葵
                  data.multiArray[1] = ["月光色", "红色", "黄色"];
                  break;
                case 4: //雏菊
                  data.multiArray[1] = ["粉色", "红色", "黄色", "橘色", "绿色", "白色", "单头"];
                  break;
                case 5: // 剑兰
                  data.multiArray[1] = ["0"];
                  break;
                case 6: // 肥料
                  data.multiArray[1] = ["一号", "二号", "A2", "液体海藻肥", "黄腐酸钾", "硫酸亚铁", "磷酸二氢钾"];
                  break;
                case 7: // 保鲜剂
                  data.multiArray[1] = ["TOG6", "TIG10", "保鲜剂", "灰霉水", "黄腐酸钾", "TOG STAR"];
                  break;
              }
              data.multiIndex[1] = 0;
              break;
          }
          this.setData(data);
    },
/*
    // 品种
    bindCountChange: function(e){
        this.setData({
            account_type: e.detail.value
        })
    },
*/
    // 数量
    bindAmount: function(e){
        this.setData({
            amount: e.detail.value
        })
    },
    // 单价
    bindUnit: function(e){
        this.setData({
            unit_value: e.detail.value
        })
    },

    // 金额, 总价
    bindCountValue: function(e){
        this.setData({
            sum_value: e.detail.value
        })
    },

    // 备注：
    bindRemarks: function (e) {
        this.setData({
            remarks_value: e.detail.value
        })
    },

    // 提交数据
    submitData : function(){
        if(!this.data.sum_value){
            this.showToast('请填写消费金额', 'loading');
            return;
        }
        if(isNaN(+this.data.sum_value)){
            this.showToast('消费金额错误', 'loading');
            return;
        }
        var bill = {
            _id: Date.parse(new Date()),
            date: this.data.date,
            time: this.data.time,
            amount: this.data.amount,
            unit_value: this.data.unit_value,
            sum_value: this.data.sum_value,
            remarks_value: this.data.remarks_value,
            //account_type: this.data.account_type,
            billTypeNumber: this.billTypeNumber(this.data.account_type - 0),
            consumption_or_earn: 0
        };
        this.data.oldStorageData.push(bill);
        wx.setStorage({
            key: "bill_arr",
            data: this.data.oldStorageData
        });
        this.showToast('记账成功', 'success');
        this.resetValue();
    },

    // 消费类型转换英文
    billTypeNumber(account_type) {
        switch (account_type) {
            case 0:
                account_type = 'MG';
                break;
            case 1:
                account_type = 'XQ';
                break;
            case 2:
                account_type = 'BH';
                break;
            case 3:
                account_type = 'XRK';
                break;
            case 4:
                account_type = 'CJ';
                break;
            case 5:
                account_type = 'JL';
                break;
            case 6:
                account_type = 'C1';
                break;
            case 7:
                account_type = 'C2';
                break;
        }
        return account_type;
    },

    // 显示记账成功提示
    showToast(title, icon){
        wx.showToast({
            title: title,
            icon: icon,
            duration: 2000
        });
    },

    // 重置数据
    resetValue(){
        this.setData({
            amount: '',
            unit_value: '',
            sum_value: '',
            remarks_value: '',
            date: Until.formatTime(new Date()).date,
            time: Until.formatTime(new Date()).time
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        wx.getStorage({
            key: 'bill_arr',
            success: function (res) {
                _this.setData({
                    oldStorageData : res.data
                });
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
    
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
    
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
    
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    
    }
})