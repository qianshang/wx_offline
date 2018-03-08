// pages/articles/articles.js
const app = getApp();
var network = require('../../network/network.js');
const pageSize = 10;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: [],
    isAllData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startPullDownRefresh();
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
    this.fetchData(1, true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var count = this.data.articles.length
    if (count > 0 && this.data.isAllData == false) {
      this.fetchData(Math.floor(count / pageSize) + 1, false);
    }
  },

  /**
   * 获取数据
   */
  fetchData: function (page, refresh) {
    wx.showNavigationBarLoading()
    var that = this
    network.fetchArticles(app.globalData.token, page, pageSize, '', (data) => {
      that.setData({
        articles: refresh ? data : that.data.articles.concat(data),
        isAllData: data.length < pageSize
      });
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh();
    }, (msg) => {
      console.log(msg);
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    });
  },

  onArticleClick: function (item) {
    var title = item.currentTarget.dataset.item.title;
    var url = item.currentTarget.dataset.item.url;
    wx.navigateTo({
      url: `../web/web?title=${title}&url=${url}`,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})