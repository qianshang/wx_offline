const baseUrl = 'http://api.uskid.tech';

function request(url, method, params, success, failure) {
  wx.request({
    url: `${baseUrl}${url}`,
    method: method,
    data: params,
    success: function (res) {
      if (res.data.code == 0) {
        if (typeof (success) == 'function') {
          success(res.data.data);
        }
      } else {
        if (typeof (failure) == 'function') {
          failure(res.data.msg);
        }
      }
    },
    fail: function (err) {
      if (typeof (failure) == 'function') {
        failure('network error');
      }
    }
  })
}

function signin(mobile, password, success, failure) {
  request('/m/campus/parent/login', 'POST', {
    'phone': mobile,
    'password': password,
    'campusId': '20'
  }, success, failure)
}

function getUserInfo(token, success, failure) {
  request('/m/campus/child/info', 'GET', {'token': token}, success, failure)
}

function fetchVideos(token, page, pageSize, success, failure) {
  request('/m/campus/media/videos', 'GET', {'token': token, 'page': page, 'pageSize': pageSize}, success, failure)
}

function fetchAudios(token, page, pageSize, success, failure) {
  request('/m/campus/media/audios', 'GET', { 'token': token, 'page': page, 'pageSize': pageSize }, success, failure)
}

function fetchArticles(token, page, pageSize, keywords, success, failure) {
  request('/m/campus/media/articles', 'GET', { 'token': token, 'page': page, 'pageSize': pageSize, 'keywords': keywords }, success, failure)
}

module.exports = {
  login: signin,
  userInfo: getUserInfo,
  fetchVideos: fetchVideos,
  fetchAudios: fetchAudios,
  fetchArticles: fetchArticles
}
