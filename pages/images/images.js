// pages/images/images.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imageList: []
	},

	// 打开相册
	openCamera() {
		// 打开相册
		wx.chooseImage({
			success: function (res) {
				// 获取图片信息
				wx.getImageInfo({
					src: res.tempFilePaths[0],
					success: function (res) {
						console.log(res.width);
						console.log(res.height);
						console.log(res);

						// 保存图片
						// wx.saveImageToPhotosAlbum({
						// 	filePath: res.path,
						// 	success(res) {
						// 		console.log(res);
						// 		console.log('保存图片成功');
						// 		wx.showToast({
						// 			title: '保存成功',
						// 			icon: 'success',
						// 			duration: 2000
						// 		});
						// 	}
						// });
					}
				});

			}
		});
	},

	// 选择图片
	chooseImg(){
		var that = this;
		// 打开相册
		wx.chooseImage({
			count: 9, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				that.setData({
					imageList: res.tempFilePaths 
				});
			}
		});
	},

	// 预览图片
	previewImage(e){
		var current = e.target.dataset.src;
		console.log(current);
		wx.previewImage({
			current: current,
			urls: this.data.imageList
		});
	},

	// 保存图片
	saveImage(){
		wx.saveImageToPhotosAlbum({
			filePath: this.data.imageList[0],
			success(res) {
				console.log(res);
				console.log('保存图片成功');
				wx.showToast({
					title: '保存成功',
					icon: 'success',
					duration: 2000
				});
			}
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