// pages/course/course.js
const app = getApp();
var network = require('../../network/network.js');
var dateUtil = require('../../utils/util.js')

const pageSize = 20

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [],
    futureIsSelected: null,
    isEmpty: false,
    contentHeight: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          contentHeight: res.windowHeight - res.windowWidth / 750 * 88
        })
      }
    })

    this.onFutureClick()
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

  onFutureClick: function() {
    if (this.data.futureIsSelected) {
      return
    }
    this.setData({
      futureIsSelected: true
    })

    var that = this
    wx.showNavigationBarLoading()
    network.fetchFutureCourses(app.globalData.token, 1, pageSize, (data) => {

      data.rows.map((item) => {
        item.time = dateUtil.formatTime(new Date(item.startTime))
      })
      console.log(data.rows)

      that.setData({
        courses: data.rows,
        isEmpty: !(data.rows && data.rows.length > 0)
      })
      wx.hideNavigationBarLoading()
    }, (msg) => {
      console.log(msg)
      wx.hideNavigationBarLoading()
    })
  },

  onHistoryClick: function() {
    if (!this.data.futureIsSelected) {
      return
    }
    this.setData({
      futureIsSelected: false
    })

    var that = this
    wx.showNavigationBarLoading()
    network.fetchHistoryCourses(app.globalData.token, 1, pageSize, (data) => {
      data.rows.map((item) => {
        item.time = dateUtil.formatTime(new Date(item.startTime))
      })

      console.log(data.rows)
      that.setData({
        courses: data.rows,
        isEmpty: !(data.rows && data.rows.length > 0)
      })
      wx.hideNavigationBarLoading()
    }, (msg) => {
      console.log(msg)
      wx.hideNavigationBarLoading()
    })
  }
})