// pages/video/video.js
const app = getApp()
var network = require('../../network/network.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videos: [],
    video: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setNavigationBarTitle({
    //   title: '视频'
    // })
    this.fetchVideos()
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
  
  },

  fetchVideos: function() {
    wx.showNavigationBarLoading();
    var that = this

    network.fetchVideos(app.globalData.token, 1, 20, (data) => {
      console.log(data)
      that.setData({
        videos: data,
        video: data[0].url
      });

      wx.hideNavigationBarLoading();
    }, (msg) => {
      console.log(msg)
      wx.hideNavigationBarLoading();
    })
  },

  playVideo: function(e) {
    console.log(e)
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: `../videoPlay/videoPlay?url=${url}`,
    })
  }
})