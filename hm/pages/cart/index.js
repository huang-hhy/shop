/* 
1:获取收货地址
	1、绑定点击事件
	2、直接调用小程序api：wx.chooseAddress(但是有问题，提示选择权限时选择取消之后就不能再选择了)
	2、正确方法：先调用wx.getSetting方法
		1、授权确定时scope.address: true
		2、授权取消时scope.address: false
		3、没有点击获取收货地址时没有授权确定时scope.address这个属性
		
2:页面加载完毕
	1、获取本地存储中的地址数据
	2、把数据设置给data中的一个变量
	
3:onShow
	0、回到商品详情页面，第一次添加商品时手动添加一个属性checked
	1、获取缓存中的购物车数组
	2、把购物车数据填充到data中
	
	
4：全选显示
	1、onShow 获取缓存中购物车数组
	2、把购物车中的商品数据，所有的商品都被选中，checked=true
	
	
5：总价格、总数量
	1、都需要商品被选中才计算
	2、获取购物车数组
	3、遍历
	4、判断商品是否被选中
	5、总价格+=商品的单价*商品的数量
	5、总数量+=商品的数量
	6、把计算后的价格和数量设置会data中
	
	
6:商品选中
	1、绑定change事件
	2、获取到被修改的商品对象
	3、商品对象的选中状态 取反
	4、重新填回data中和缓存中
	5、重新计算全选、总价格、总数量
	
	
7:全选反选
	1、为全选复选框绑定事件 change
	2、获取data中的全选变量allChecked
	3、直接取反allChecked=！allChecked
	4、遍历购物车数组，让里面商品选中状态跟随allChecked改变而改变
	5、把购物车数组和allChecked重新设置回data和缓存中
	
	
8：商品数量的编辑
	1、为+-绑定同一个点击事件，区分的关键为自定义属性
	2、传递被单击的商品id
	3、获取data中的购物车数组，来获取需要被修改的商品对象
	4、直接修改商品对象的数量num
	5、把cart数组重新设置回缓存和data中
	
	
9:点击结算
	1、判断是否有商品
	2、判断是否有收货地址
	3、如果都有跳转的支付页面
 */

import {  getSetting,scopeAddress,openSetting,showToast } from "../../utils/asyncWx.js";

// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	address:{},
	cart:[],
	allChecked:false,
	totalPrice:0,
	totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

//点击收货地址
async handleChooseAddress(){
	// console.log('哈哈哈');
	//获取收货地址
	/* wx.chooseAddress({
		success:(result)=> {
			console.log(result);
		}
	}); */
	
	wx.getSetting({
		success:(result) => {
			// console.log(result);
			const scopeAddress=result.authSetting["scope.address"];
			if(scopeAddress===true||scopeAddress===undefined){
				wx.chooseAddress({
					success:(result1)=> {
						// console.log(result1);
						wx.setStorageSync("result1",result1);
					}
				});
			}else{
				//以前拒绝过授权权限
				wx.openSetting({
					success:(result2)=>{
						wx.chooseAddress({
							success:(result3)=> {
								console.log(result3);
							}
						});
					}
				});
			}
		},
	});
	/* try{
		const res1=await getSetting();
		const scopeAddress=res1.authSetting["scope.address"];
		if(scopeAddress===false){
			await openSetting();
		}
		const address=await chooseAddress();
		// console.log(res2);
		wx.setStorageSync("address",address);
	}catch(e){
		//TODO handle the exception
		console.log(e);
	} */
	
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
	// 1、获取本地存储中的地址数据
	const address=wx.getStorageSync("result1");
	const cart=wx.getStorageSync("cart")||[];
	//计算全选
	// const allChecked=cart.length?cart.every(v=>v.checked):false;
	let allChecked=true;
	//总价格总数量
	let totalPrice=0;
	let totalNum=0;
	cart.forEach(v=>{
		if(v.checked){
			totalPrice+=v.num*v.goods_price;
			totalNum+=v.num;
		}else{
			allChecked=false;
		}
	})
	allChecked=cart.length!=0?allChecked:false;
	
	this.setData({
		address,
		cart,
		allChecked,
		totalPrice,
		totalNum
	})
  },

//商品全选功能
handleItemAllCheck(){
	let {cart,allChecked}=this.data;
	allChecked=!allChecked;
	cart.forEach(v=>v.checked=allChecked);
	this.setCart(cart);
},

setCart(cart){	
	let allChecked=true;
	//总价格总数量
	let totalPrice=0;
	let totalNum=0;
	cart.forEach(v=>{
		if(v.checked){
			totalPrice+=v.num*v.goods_price;
			totalNum+=v.num;
		}else{
			allChecked=false;
		}
	})
	allChecked=cart.length!=0?allChecked:false;
	this.setData({
		cart,
		totalPrice,totalNum,allChecked
	});
	wx.setStorageSync("cart",cart);
},

//商品的选中
handeItemChange(e){
	const goods_id=e.currentTarget.dataset.id;
	 // console.log(goods_id);
	let {cart}=this.data;
	// console.log(cart);
	let index=cart.findIndex(v=>v.goods_id===goods_id);
	cart[index].checked=!cart[index].checked;
	this.setData({
		cart
	});
	wx.setStorageSync("cart",cart);
	
	let allChecked=true;
	//总价格总数量
	let totalPrice=0;
	let totalNum=0;
	cart.forEach(v=>{
		if(v.checked){
			totalPrice+=v.num*v.goods_price;
			totalNum+=v.num;
		}else{
			allChecked=false;
		}
	})
	allChecked=cart.length!=0?allChecked:false;
	this.setData({
		cart,
		totalPrice,totalNum,allChecked
	});
},

//商品数量的编辑
handleItemNumEdit(e){
	const {operation,id}=e.currentTarget.dataset;
	// console.log(operation,id);
	let {cart}=this.data;
	const index=cart.findIndex(v=>v.goods_id===id);
	if(cart[index].num<=1&&operation===-1){
		wx.showModal({
			title:'提示',
			content:'你是否要删除',
			success :(res)=> {
				if(res.confirm){
					cart.splice(index,1);
					this.setCart(cart);
								
			}else if(res.cancel){
				console.log('用户取消了');
			}
			}
		})
	}else{
		cart[index].num+=operation;
		this.setCart(cart);
	}
	
},


//点击结算
async bandlePay(){
	const {address,totalNum}=this.data;
	if(!address.userName){
		await showToast({title:"你还没有收货地址"});
		return;
	}
	if(totalNum===0){
		await showToast({title:"你还没有选购商品"});
		return;
	}
	
	wx.navigateTo({
		url:'/pages/pay/index'
	});
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