import * as echarts from '../../ec-canvas/echarts';
Page({
	onShareAppMessage: function (res) {
		return {
			title: 'ECharts 可以在微信小程序中使用啦！',
			path: '/pages/index/index',
			success: function () { },
			fail: function () { }
		}
	},
	data: {
		ecEarn: {
			onInit: function (canvas, width, height) {
				const initChartEarn = echarts.init(canvas, null, {
					width: width,
					height: height
				});
				canvas.setChart(initChartEarn);

				// 将 initChartEarn 绑定到 this，以供其他函数访问
				this.initChartEarn = initChartEarn;
				initChartEarn.setOption(getEarnOption());
				return initChartEarn;
			}
		},
		ecConsum: {
			onInit: function (canvas, width, height) {
				const initChartConsum = echarts.init(canvas, null, {
					width: width,
					height: height
				});
				canvas.setChart(initChartConsum);

				// 将 initChartConsum 绑定到 this，以供其他函数访问
				this.initChartConsum = initChartConsum;
				initChartConsum.setOption(getConsumOption());

				return initChartConsum;
			}
		},
		bill_arr: [],
		consumption_chart_data: [],
		earn_chart_data: [],
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
				_this.setData({
					consumption_chart_data: temp.consum,
					earn_chart_data: temp.earn
				});
				// _this.data.consumption_chart_data = temp.consum;
				// _this.data.earn_chart_data = temp.earn;
				console.log(getCurrentPages());
			}
		});
	},

	// 修改数据格式
	changeDataFormat() {
		let allData = {};
		let earnArr = [];
		let consumArr = [];
		var consumption_chart_arr = [0, 0, 0, 0, 0, 0, 0, 0];
		var earn_chart_arr = [0, 0, 0];

		this.data.bill_arr.forEach((item, index) => {
			if (item.consumption_or_earn) {
				if (item.account_type - 0 == 0) {
					earn_chart_arr[0] = earn_chart_arr[0] + (+item.sum_value);
				}
				else if (item.account_type - 0 == 1) {
					earn_chart_arr[1] = earn_chart_arr[1] + (+item.sum_value);
				} else {
					earn_chart_arr[2] = earn_chart_arr[2] + (+item.sum_value);
				}
			} else {
				if (item.account_type - 0 == 0) {
					consumption_chart_arr[0] = consumption_chart_arr[0] + (+item.sum_value);
				}
				else if (item.account_type - 0 == 1) {
					consumption_chart_arr[1] = consumption_chart_arr[1] + (+item.sum_value);
				}
				else if (item.account_type - 0 == 2) {
					consumption_chart_arr[2] = consumption_chart_arr[2] + (+item.sum_value);
				}
				else if (item.account_type - 0 == 3) {
					consumption_chart_arr[3] = consumption_chart_arr[3] + (+item.sum_value);
				}
				else if (item.account_type - 0 == 4) {
					consumption_chart_arr[4] = consumption_chart_arr[4] + (+item.sum_value);
				}
				else if (item.account_type - 0 == 5) {
					consumption_chart_arr[5] = consumption_chart_arr[5] + (+item.sum_value);
				}
				else if (item.account_type - 0 == 6) {
					consumption_chart_arr[6] = consumption_chart_arr[6] + (+item.sum_value);
				}
				else {
					consumption_chart_arr[7] = consumption_chart_arr[7] + (+item.sum_value);
				}
			}
		});
		let earnText = ["基本工资", "公司福利", "其它入账"];
		let consumText = ["水果零食", "餐饮伙食", "出行旅游", "网上购物", "生活日常", "租房水电", "医疗药物", "其它消费"];
		allData.earn = this.dataFormat(earnText, earn_chart_arr);
		allData.consum = this.dataFormat(consumText, consumption_chart_arr);
		return allData;
	},

	// 数据格式转换
	dataFormat(arr, dataArr) {
		let data = [];
		for (let i = 0; i < arr.length; i++) {
			data.push({ 'name': arr[i], 'value': dataArr[i] });
		}
		return data;
	},

	onReady() {
	},

    /**
    * 生命周期函数--监听页面显示
    */
	onShow: function () {
		this.getStorageData();
	},

});

function getEarnOption() {
	console.log(getCurrentPages()[0].data.earn_chart_data);
	return {
		backgroundColor: "#ffffff",
		color: ['#67C23A', '#E6A23C', '#F56C6C'] ,
		// tooltip : {
		// trigger: 'item',
		// formatter: "{a} <br/>{b} : {c} ({d}%)"
		// },
		series: [{
			label: {
				normal: {
					fontSize: 14
				}
			},
			type: 'pie',
			center: ['50%', '50%'],
			radius: [0, '60%'],
			// data: [
			// 	{
			// 		value: 55,
			// 		name: '北京'
			// 	},
			// 	{
			// 		value: 20,
			// 		name: '武汉'
			// 	},
			// 	{
			// 		value: 10,
			// 		name: '杭州'
			// 	},
			// 	{
			// 		value: 20,
			// 		name: '广州'
			// 	},
			// 	{
			// 		value: 38,
			// 		name: '上海'
			// 	},
			// ],
			data: getCurrentPages()[0].data.earn_chart_data,
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 2, 2, 0.3)'
				}
			}
		}]
	};
}
function getConsumOption() {
	return {
		backgroundColor: "#ffffff",
		color: ['#67C23A', '#E6A23C', '#F56C6C', '#3B58D9', '#9E3FC1', '#6C6868', '#22BCAD', '#BC3C22'],
		// tooltip: {
		//  trigger: 'item',
		//  formatter: "{a} <br/>{b} : {c} ({d}%)"
		// },
		series: [{
			label: {
				normal: {
					fontSize: 14
				}
			},
			type: 'pie',
			center: ['50%', '50%'],
			radius: [0, '60%'],
			// data: [
			// 	{
			// 		value: 55,
			// 		name: '北京'
			// 	},
			// 	{
			// 		value: 20,
			// 		name: '武汉'
			// 	},
			// 	{
			// 		value: 10,
			// 		name: '杭州'
			// 	},
			// 	{
			// 		value: 20,
			// 		name: '广州'
			// 	},
			// 	{
			// 		value: 38,
			// 		name: '上海'
			// 	},
			// ],
			data: getCurrentPages()[0].data.consumption_chart_data,
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 2, 2, 0.3)'
				}
			}
		}]
	};
}