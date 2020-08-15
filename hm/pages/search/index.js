/* 
防抖：
	1、全局的定时器
 */
//0 引入用来发送请求的方法
	import {
		request
	} from "../../request/index.js";
// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	goods:[],
	isFocus:false,
	inpValue:""
  },
  
  TimeId:-1,
  
    //输入框值改变触发的事件
  handleInput(e){
  	  // console.log(e);
	  const {value}=e.detail;
	  if(!value.trim()){
		   clearTimeout(this.TimeId);
		  this.setData({
			  goods:[],
			  isFocus:false
		  })
		  return;
	  }
	  this.setData({
		  isFocus:true
	  })
	  clearTimeout(this.TimeId);
	  this.TimeId=setTimeout(()=>{
		   this.qsearch(value);
	  },1000)
	 
  },
  
  async qsearch(query){
	const res=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch",data:{query}});
	  console.log(res);
	  this.setData({
		  goods:res
	  })
  },

//点击取消按钮
handleCancel(){
	this.setData({
		inpValue:"",
		isFocus:false,
		goods:[]
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