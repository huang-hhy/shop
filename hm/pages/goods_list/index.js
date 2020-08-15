/* 
上拉加载数据
	1获取总页数：=总条数/页容量
				=Math.ceil(total/pagesize)
	2 判断当前页面是否大于总页面,是就提示没有数据了，否则加载数据
		this.QueryParams.pagenum>=this.totalPages
		
下拉刷新页面
1、触发下拉刷新事件
2、重置 数据 数组
3、重置页码，设置为1
4、重新发送请求
5、数据请求回来后需要手动关闭等待效果
 */

//0 引入用来发送请求的方法
	import {
		request
	} from "../../request/index.js";
// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	tabs:[
		{
			id:0,
			value:"综合",
			isActive:true
		},
		{
			id:1,
			value:"销量",
			isActive:false
		},
		{
			id:2,
			value:"价格",
			isActive:false
		}
	],
	goodsList:[]
  },
  
  //接口要的参数
  QueryParams:{
	  query:"",
	  cid:"",
	  pagenum:1,
	  pagesize:10
  },

//标题点击事件，从子组件传递过来
handleTabsItemChange(e){
	 // console.log(e);
	const {index}=e.detail;
	let {tabs}=this.data;
	tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
	/* tabs.forEach(function(v,i){
		i===index?v.isActive=true:v.isActive=false
	}); */
	this.setData({
		tabs
	});
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	// console.log(options);
	this.QueryParams.cid=options.cid||"";
	this.QueryParams.query=options.query||"";
	this.getGoodsList();
	
	
  },

//总页数
totalPages:1,

//获取商品列表数据
async getGoodsList(){
	const res=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",data:this.QueryParams});
	// console.log(res);
	//获取总条数
	const total=res.total;
	//计算总页数
	this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
	// console.log(this.totalPages);
	this.setData({
		goodsList:[...this.data.goodsList,...res.goods]
	})
	//关闭下拉刷新的窗口
	wx.stopPullDownRefresh();
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
	// console.log('刷新');
	//1、重置数组
	this.setData({
		goodsList:[]
	})
	//2、重置页码
	this.QueryParams.pagenum=1;
	//3、发送请求
	this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   * 总页数=Math.ceil(总条数 / 页容量)
   * 				（23 / 10）=3
   */
  onReachBottom: function () {
	// console.log('页面触底');
	if(this.QueryParams.pagenum>=this.totalPages){
		// console.log('没有数据了');
		wx.showToast({
			title:'没有下一页数据了'
		})
	}else{
		// console.log('有数据');
		this.QueryParams.pagenum++;
		this.getGoodsList();
	}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})