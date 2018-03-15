// pages/courseInfo/courseInfo.js
const app = getApp()
var network = require('../../network/network.js')
var util = require('../../utils/util.js')

const audioContext = wx.createInnerAudioContext()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    chapter: '',
    startTime: '',
    words: [],
    sentences: [],
    previews: [],
    playing: '',
    progress: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      chapter: options.chapter,
      startTime: options.starttime
    })

    wx.setNavigationBarTitle({
      title: options.chapter
    })
    this.getCourseInfo()
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

  getCourseInfo: function () {
    var that = this
    wx.showNavigationBarLoading()
    network.getCourseInfo(app.globalData.token, this.data.id, (info) => {
      console.log(info)
      var words = []
      var sentences = []
      var previews = []
      info.lessons.forEach(function (element) {
        words = words.concat(element.words.filter(that.checkString));
        sentences = sentences.concat(element.sentence.filter(that.checkString));
        previews = previews.concat(element.previewVideo)
      });
      console.log(previews)
      that.setData({
        words: words,
        sentences: sentences,
        previews: previews
      })
      wx.hideNavigationBarLoading()
    }, (msg) => {
      console.log(msg)
      wx.hideNavigationBarLoading()
    })
  },

  playVideo: function (e) {
    console.log(e)
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: `../videoPlay/videoPlay?url=${url}`,
    })
  },

  audioPlay: function (e) {
    var url = e.currentTarget.dataset.url

    if (this.data.playing === url) {
      audioContext.stop()
      this.setData({
        playing: ''
      })
    } else {
      audioContext.src = url
      var that = this
      audioContext.onTimeUpdate((e) => {

        that.setData({
          progress: util.time(audioContext.currentTime) + '/' + util.time(audioContext.duration)
        })
      })
      audioContext.onPlay(() => {
        console.log('play')
      })
      audioContext.onEnded(() => {
        that.setData({
          playing: '',
          progress: ''
        })
      })

      audioContext.play()
      this.setData({
        playing: url
      })
    }
  },

  checkString: function(e) {
    return !(e === undefined || e.trim() === "")
  }

})