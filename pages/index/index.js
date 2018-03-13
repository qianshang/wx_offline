//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    mobile: '13601247906',
    password: 'uskid111111',
    userInfo: {},
    token: null,
    isLogined: false,
    isLogining: false,
  },
  onLoad: function () {
    this.onLogin()
    // var that = this
    // wx.showNavigationBarLoading();
    // app.userInfo(app.globalData.token, () => {
    //   that.setData({
    //     token: app.globalData.token,
    //     userInfo: app.globalData.userInfo,
    //     isLogined: true
    //   })
    //   wx.hideNavigationBarLoading()
    // });

    // if (app.globalData.token) {
    //   this.setData({
    //     token: app.globalData.token,
    //     isLogined: true
    //   })
    // } else {
    //   this.setData({
    //     token: null,
    //     isLogined: false
    //   })
    // }
  },
  onLogin: function () {
    this.setData({
      isLogining: true
    })
    var that = this;
    app.login(this.data.mobile, this.data.password, (msg) => {
      console.log(msg);
      that.setData({
        isLogining: false
      });
      if (msg === undefined ||
        msg === null ||
        msg === "") {
        console.log(app.globalData.userInfo);
        that.setData({
          token: app.globalData.token,
          userInfo: app.globalData.userInfo,
          isLogined: true
        });
      } else {
        wx.showToast({
          title: msg
        })
      }
    });
  },
  bindMobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bindPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  bindCourse: function() {
    wx.navigateTo({
      url: '../course/course',
    })
  },
  bindMediaVideo: function() {
    wx.navigateTo({
      url: '../video/video'
    })
  },
  bindMediaAudio: function() {
    wx.navigateTo({
      url: '../audio/audio',
    })
  },
  bindArticles: function () {
    wx.navigateTo({
      url: '../articles/articles',
    })
  },
  previewImage: function(e) {
    console.log(e);
    var url = e.currentTarget.dataset.imageurl
    console.log(url)
    wx.previewImage({
      urls: [e.currentTarget.dataset.imageurl]
    })
  }
})
