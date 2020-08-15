/* 
1:输入框绑定，值改变事件，input
	1、获取到输入框的值
	2、判断合法性
	3、检验通过，把输入框的值发送到后台
	4、返回的数据打印到页面
 */
// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	userinfo:{}
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
	const userinfo=wx.getStorageSync("userinfo");
	this.setData({
		userinfo
	})
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