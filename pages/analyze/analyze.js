// pages/analyze/analyze.js
// var Chart = require('../../utils/Chart.min.js');
var wxCharts = require('../../utils/wxcharts.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bill_arr: [],
        consumption_chart_arr: [0, 0, 0, 0, 0, 0, 0, 0],
        earn_chart_arr: [0, 0, 0],
        consumption_chart_data : [],
        earn_chart_data : [],
    },

    // 获取key为“bill_arr”的数据
    getStorageData() {
        var _this = this;
        wx.getStorage({
            key: 'bill_arr',
            success: function (res) {
                _this.setData({
                    bill_arr: res.data
                });
                let temp = _this.changeDataFormat();
                _this.data.consumption_chart_data = temp.consum;
                _this.data.earn_chart_data = temp.earn;
                _this.getChart('consumption-chart', _this.data.consumption_chart_data);
                _this.getChart('earn-chart', _this.data.earn_chart_data);
            }
        });
    },

    // 修改数据格式
    changeDataFormat(){
        console.log(this.data.bill_arr);
        let allData = {};
        let earnArr = [];
        let consumArr = [];
        this.data.bill_arr.forEach((item, index) => {
            if (item.consumption_or_earn){
                if (item.account_type -0 == 0 ){
                    this.data.earn_chart_arr[0] = this.data.earn_chart_arr[0] + (+item.sum_value);
                }
                else if (item.account_type -0 == 1){
                    this.data.earn_chart_arr[1] = this.data.earn_chart_arr[1] + (+item.sum_value);
                }else{
                    this.data.earn_chart_arr[2] = this.data.earn_chart_arr[2] + (+item.sum_value);
                }
            }else{
                if (item.account_type -0 == 0){
                    this.data.consumption_chart_arr[0] = this.data.consumption_chart_arr[0] + (+item.sum_value);
                }
                else if (item.account_type -0 == 1){
                    this.data.consumption_chart_arr[1] = this.data.consumption_chart_arr[1] + (+item.sum_value);
                }
                else if (item.account_type -0 == 2) {
                    this.data.consumption_chart_arr[2] = this.data.consumption_chart_arr[2] + (+item.sum_value);
                }
                else if (item.account_type -0 == 3) {
                    this.data.consumption_chart_arr[3] = this.data.consumption_chart_arr[3] + (+item.sum_value);
                }
                else if (item.account_type -0 == 4) {
                    this.data.consumption_chart_arr[4] = this.data.consumption_chart_arr[4] + (+item.sum_value);
                }
                else if (item.account_type -0 == 5) {
                    this.data.consumption_chart_arr[5] = this.data.consumption_chart_arr[5] + (+item.sum_value);
                }
                else if (item.account_type -0 == 6) {
                    this.data.consumption_chart_arr[6] = this.data.consumption_chart_arr[6] + (+item.sum_value);
                }
                else{
                    this.data.consumption_chart_arr[7] = this.data.consumption_chart_arr[7] + (+item.sum_value);
                }
            }
        });
        let earnText = ["基本工资", "公司福利", "其它入账"];
        let consumText = ["水果零食", "餐饮伙食", "出行旅游", "网上购物", "生活日常", "租房水电", "医疗药物", "其它消费"];
        let earnColor = ['#67C23A', '#E6A23C', '#F56C6C'];
        let consumColor = ['#67C23A', '#E6A23C', '#F56C6C', '#3B58D9', '#9E3FC1', '#6C6868', '#22BCAD', '#BC3C22'];
        allData.earn = this.dataFormat(earnText, this.data.earn_chart_arr, earnColor);
        allData.consum = this.dataFormat(consumText, this.data.consumption_chart_arr, consumColor);
        return allData;
    },

    // 数据格式转换
    dataFormat(arr, dataArr, color){
        let data = [];
        for(let i = 0; i<arr.length; i++){
            data.push({ 'name' : arr[i], 'data' : dataArr[i], 'color': color[i] });
        }
        return data;
    },
    getChart(str, data){
        new wxCharts({
            canvasId: str,
            type: 'pie',
            series: data,
            width: 350,
            height: 300,
            dataLabel: true
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        this.getStorageData();
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
