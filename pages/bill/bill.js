    // pages/bill/bill.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bill_arr_bat : [],
        bill_arr : [],
        earn_sum : 0,
        consum_sum : 0,
        isShow : false,
        date : '',
        check_value_arr : [],
        items: [
            {name: 'MG', value: '玫瑰'},
            {name: 'XQ', value: '绣球'},
            {name: 'BH', value: '百合'},
            {name: 'XRK', value: '向日葵'},
            {name: 'CJ', value: '雏菊'},
            {name: 'JL', value: '剑兰'},
            {name: 'C1', value: '自定义1'},
            {name: 'C2', value: '自定义2'},
            {name: 'wx', value: '微信'},
            {name: 'tb', value: '淘宝'},
            {name: 'jd', value: '京东'},
            {name: 'xj', value: '现金'},
            {name: 'qt', value: '其它'}
        ]
    },

    // 多选框
    checkboxChange: function(e) {
        this.setData({
            check_value_arr: e.detail.value
        });
    },

    // 确定搜索过滤
    confirmSearch(){
        var query_condition = {
            check_value_arr: this.data.check_value_arr,
            date: this.data.date
        };
        var result = this.fetchBillArr(query_condition);
        var earnConsum = this.getEarnAndConsum(result);
        this.setData({
            bill_arr: result, 
            earn_sum: earnConsum.earn,
            consum_sum: earnConsum.consum,
            isShow: false
        });
        
    },

    // 取消或者重置搜索
    cancelSearch(){
        var result = this.fetchBillArr();
        var earnConsum = this.getEarnAndConsum(result);
        this.setData({
            bill_arr: result, 
            earn_sum: earnConsum.earn,
            consum_sum: earnConsum.consum,
            isShow: false
        });
    },

    // 返回查询数据
    fetchBillArr(query_condition){
        var bill_arr = this.data.bill_arr_bat || [];
        console.log(query_condition);
        if( query_condition ){
            var date = query_condition.date;
            var check_value_arr = query_condition.check_value_arr;
            if(date){
                var arr = [];
                bill_arr.forEach((item,index) => {
                    if(item.date == date){
                        arr.push(item);
                    }
                });
                bill_arr = arr;
            }
            if(check_value_arr.length){
                var arr = [];
                check_value_arr.forEach((item,index) => {
                    bill_arr.forEach((it,i) => {
                        if(it.billTypeNumber == item){
                            arr.push(it);
                        }
                    });
                });
                bill_arr = arr;
            }
        }
        return bill_arr;
    },
    // 删除一条数据
    delOne: function(e){
        let _this = this;
        wx.showModal({
            title: '删除',
            content: '确定删除吗？删除后数据无法恢复',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定');
                    let index = e.currentTarget.dataset.index;
                    _this.data.bill_arr.splice(index, 1);
                    wx.setStorage({
                        key: "bill_arr",
                        data: _this.data.bill_arr
                    });
                    _this.showToast();
                    _this.getStorageData();
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        });
    },

    // 显示删除成功提示
    showToast() {
        wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
        });
    },

    // 获取key为“bill_arr”的数据
    getStorageData(){
        var _this = this;
        wx.getStorage({
            key: 'bill_arr',
            success: function (res) {
                let result = _this.getEarnAndConsum(res.data);
                console.log(result);
                _this.setData({
                    bill_arr_bat: res.data, 
                    bill_arr: res.data,
                    earn_sum: result.earn,
                    consum_sum: result.consum
                });
            }
        });
    },
    
    // 求花费和入账的分别和
    getEarnAndConsum(data){
        let result = {};
        let earn = [];
        let consum = [];
        for(let item of data){
            if(item.consumption_or_earn){
                earn.push(item);
            }else{
                consum.push(item);
            }
        }
        result.earn = this.getSum(earn);
        result.consum = this.getSum(consum);
        return result;
    },

    // 求和
    getSum(data){
        let sum = 0;
        for(let item of data){
            sum +=item.sum_value - 0;
        }
        return parseInt(sum);
    },

    // 是否展开筛选框
    selectResult(){
        var check_value_arr = [];
        var isShow = this.data.isShow;
        this.setData({
            check_value_arr: check_value_arr,
            isShow : !isShow
        });
    },

    // 日期控制
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
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