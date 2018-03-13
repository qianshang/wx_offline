const baseUrl = 'http://api.uskid.tech';
// const baseUrl = 'http://api.uskid.com';

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

function fetchCampus(mobile, success, failure) {
  request("/m/campus/parent/campus", 'GET', { "phone": mobile }, (data) => {
    var campusId = data[0].campusId
    if (campusId) {
      success(campusId)
    } else (
      failure('error')
    )
  }, failure)
}

function signin(mobile, password, success, failure) {
  fetchCampus(mobile, (campusId) => {
    request('/m/campus/parent/login', 'POST', {
      'phone': mobile,
      'password': password,
      'campusId': campusId
    }, success, failure)
  }, failure)
}

function getUserInfo(token, success, failure) {
  request('/m/campus/child/info', 'GET', { 'token': token }, success, failure)
}

function getCourseInfo(token, id, success, failure) {
  request('/m/campus/booking/info', 'GET', { 'token': token, 'bookingId': id }, success, failure)
}

function fetchVideos(token, page, pageSize, success, failure) {
  request('/m/campus/media/videos', 'GET', { 'token': token, 'page': page, 'pageSize': pageSize }, success, failure)
}

function fetchAudios(token, page, pageSize, success, failure) {
  request('/m/campus/media/audios', 'GET', { 'token': token, 'page': page, 'pageSize': pageSize }, success, failure)
}

function fetchArticles(token, page, pageSize, keywords, success, failure) {
  request('/m/campus/media/articles', 'GET', { 'token': token, 'page': page, 'pageSize': pageSize, 'keywords': keywords }, success, failure)
}

function fetchFutureCourses(token, page, pageSize, success, failure) {
  request('/m/campus/booking/after', 'GET', { 'token': token, 'page': page, 'pageSize': pageSize }, success, failure)
}

function fetchHistoryCourses(token, page, pageSize, success, failure) {
  request('/m/campus/booking/before', 'GET', { 'token': token, 'page': page, 'pageSize': pageSize }, success, failure)
}

module.exports = {
  login: signin,
  userInfo: getUserInfo,
  fetchVideos: fetchVideos,
  fetchAudios: fetchAudios,
  fetchArticles: fetchArticles,
  fetchFutureCourses: fetchFutureCourses,
  fetchHistoryCourses: fetchHistoryCourses,
  getCourseInfo: getCourseInfo
}
