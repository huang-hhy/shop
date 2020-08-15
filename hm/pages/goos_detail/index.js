/* 
2：双击图片大图显示
	 1、给轮播图绑定点击事件
	 2、调用小程序api previewImage
3：点击 加入购物车
	1、绑定点击事件
	2、获取缓存中购物车数据，数组格式
	3、判断商品是否已经存在
	4、已经存在，执行购物车数量++，重新把购物车数据填充会数组
	5、不存在，直接给购物车添加一个新元素，重新把购物车数据填充会数组
	6、弹出提示
 */
//0 引入用来发送请求的方法
	import {
		request
	} from "../../request/index.js";
// pages/goos_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	goodsObj:{}
  },

//商品对象
GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	const {goods_id}=options;
	 // console.log(goods_id);
	this.getGoodsDetail(goods_id);
  },

//获取商品详情数据
async getGoodsDetail(goods_id){
	 const goodsObj=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",data:{goods_id}});
	 this.GoodsInfo=goodsObj;
	 this.setData({
		 goodsObj:{
			 goods_name:goodsObj.goods_name,
			 goods_price:goodsObj.goods_price,
			 goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
			 pics:goodsObj.pics
		 }
	 })
	 // console.log(goodsObj);
	/* wx.request({
		url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
		data: {goods_id: 43986},
		success: (res)=>{
		console.log(res)
		// 这样就可以拿到数据了
		}
		}) */
},

//点击轮播图
handlePrevewImage(e){
	// console.log('预览');
	console.log(e);
	//1、先构造要预览的图片数组
	const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
	//2、接收传递过来的图片url
	const current=e.currentTarget.dataset.url;
	wx.previewImage({
		current,
		urls
	});
},

//点击加入购物车
handleCartAdd(){
	// console.log("购物车");
	//1、获取缓存中的购物车数组
	let cart=wx.getStorageSync("cart")||[];
	//2、判断商品是否存在购物车数组中
	let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
	if(index===-1){
		//3、不存在第一次添加
		this.GoodsInfo.num=1;
		this.GoodsInfo.checked=true;
		cart.push(this.GoodsInfo);
	}else{
		//4、已存在num++
		cart[index].num++;
	}
	//5、把购物车重新添加回缓存中
	wx.setStorageSync("cart",cart);
	//6、弹窗提示
	wx.showToast({
		title:'加入成功',
		icon:'success',
		mask:true
	});
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