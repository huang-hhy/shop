//0 引入用来发送请求的方法
	import {
		request
	} from "../../request/index.js";

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	//左侧菜单数据
	leftMenuList:[],
	//右侧商品数据
	rightContent:[],
	//被点击的左侧菜单
	currentIndex:0,
	scrollTop:0
  },
//接口返回数据
Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	 //缓存
	 const Cates=wx.getStorageSync("cates");
	 if(!Cates){
		 this.getCates();
	 }else{
		 if(Date.now()-Cates.time>1000*10){
			 this.getCates();
		 }else{
			 // console.log("旧数据");
			 this.Cates=Cates.data;
			 //构造左侧数据
			 let leftMenuList=this.Cates.map(v=>v.cat_name);
			 //构造右侧商品数据
			 let rightContent=this.Cates[0].children;
			 this.setData({
			 	leftMenuList,
			 	rightContent
			 })
		 }
	 }
	 
	// this.getCates();
  },
  
  //获取分类数据
  async getCates(){
	/* request({
		url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"
	})  
	.then(res=>{
		// console.log(res);
		this.Cates=res.data.message;
		
		//把接口数据存在本地
		wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
		//构造左侧数据
		let leftMenuList=this.Cates.map(v=>v.cat_name);
		//构造右侧商品数据
		let rightContent=this.Cates[0].children;
		this.setData({
			leftMenuList,
			rightContent
		})
		
	}) */
	
	const res=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"});
	this.Cates=res;
	
	//把接口数据存在本地
	wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
	//构造左侧数据
	let leftMenuList=this.Cates.map(v=>v.cat_name);
	//构造右侧商品数据
	let rightContent=this.Cates[0].children;
	this.setData({
		leftMenuList,
		rightContent
	})
  },
  
  //左侧菜单点击事件
  handleItemTap(e){
	  // console.log(e)
	  const {index}=e.currentTarget.dataset;
	 /* this.setData({
		  currentIndex:index
	  }) */
	  //构造右侧商品数据
	  let rightContent=this.Cates[index].children;
	  
	  this.setData({
	  	currentIndex:index,
	  	rightContent,
		 //重新设计右边内容的scroll-view距离顶部的距离
		scrollTop:0
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