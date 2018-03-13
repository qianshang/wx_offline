// pages/course/course.js
const app = getApp();
var network = require('../../network/network.js');
var dateUtil = require('../../utils/util.js');
var common = require('../../common/common.js')

const pageSize = 20

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [],
    futureIsSelected: null,
    isEmpty: false,
    contentHeight: 500,
    courseHistoryBgUrls: [
      '../../images/course/course_history_bg_yellow.png',
      '../../images/course/course_history_bg_blue.png',
      '../../images/course/course_history_bg_green.png'
    ],
    avatarPlaceholder: common.avatar,
    page: 0,
    isAll: false
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

  onFutureClick: function () {
    if (this.data.futureIsSelected) {
      return
    }
    this.setData({
      futureIsSelected: true,
      isAll: false
    })

    this.fetchFutureCourses(1)
  },

  onHistoryClick: function () {
    if (!this.data.futureIsSelected) {
      return
    }
    this.setData({
      futureIsSelected: false,
      isAll: false
    })

    this.fetchHistoryCourses(1)
  },

  fetchMoreCourses: function () {
    if (this.data.isAll) {
      return
    }
    if (this.data.futureIsSelected) {
      this.fetchFutureCourses(this.data.page + 1)
    } else {

      this.fetchHistoryCourses(this.data.page + 1)
    }
  },

  fetchHistoryCourses: function (p) {
    this.setData({
      page: p
    })
    var that = this
    wx.showNavigationBarLoading()
    network.fetchHistoryCourses(app.globalData.token, p, pageSize, (data) => {
      data.rows.map((item) => {
        item.time = dateUtil.mmddeeeHHmmZH_tiestamp(item.startTime)
      })

      console.log(data.rows)
      that.setData({
        courses: p <= 1 ? data.rows : that.data.courses.concat(data.rows),
        isEmpty: p <=1 && !(data.rows && data.rows.length > 0),
        isAll: data.rows.length < pageSize
      })
      wx.hideNavigationBarLoading()
    }, (msg) => {
      console.log(msg)
      wx.hideNavigationBarLoading()
    })
  },

  fetchFutureCourses: function (p) {
    this.setData({
      page: p
    })

    var that = this
    wx.showNavigationBarLoading()
    network.fetchFutureCourses(app.globalData.token, p, pageSize, (data) => {

      data.rows.map((item) => {
        item.time = dateUtil.mmddeeeHHmmZH_tiestamp(item.startTime)
      })
      console.log(data.rows)

      that.setData({
        courses: p <= 1 ? data.rows : that.data.courses.concat(data.rows),
        isEmpty: p <= 1 && !(data.rows && data.rows.length > 0),
        isAll: data.rows.length < pageSize
      })
      wx.hideNavigationBarLoading()
    }, (msg) => {
      console.log(msg)
      wx.hideNavigationBarLoading()
    })
  },

  showCourseInfo: function(e) {
    var id = e.currentTarget.dataset.id
    var chapter = e.currentTarget.dataset.chapter
    var startTime = dateUtil.mmddeeeHHmmZH_tiestamp(e.currentTarget.dataset.time)
    console.log(e)
    wx.navigateTo({
      url: `../courseInfo/courseInfo?id=${id}&chapter=${chapter}&starttime=${startTime}`,
    })
  }
})