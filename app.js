//app.js


var network = require('./network/network.js')

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: {},
    token: null
  },
  login: function (mobile, password, complete) {
    var that = this
    network.login(mobile,
      password, (data) => {
        that.globalData.token = data.token;
        that.userInfo(data.token, complete);
      }, (errMsg) => {
        complete(errMsg);
      })
  },
  userInfo: function (token, complete) {
    var that = this;
    network.userInfo(token, (data) => {
      that.globalData.userInfo = data;
      complete();
    }, (errMsg) => {
      complete(errMsg);
    })
  }
})