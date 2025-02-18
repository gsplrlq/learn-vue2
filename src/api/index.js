import http from 'utils/http.js'

// 获取验证码
export function upload (data) {
  return http.post('/client/fileTable/uploadSign', data)
}

// 获取验证码
export function sendSmsCode (data) {
  return http.post('/public/base/smscode/send', data)
}
// 验证验证码
export function verifySmsCode (data) {
  return http.post('/public/base/smscode/verifySmsCode', data)
}

// 用户登录
export function userLogin (data) {
  return http.post('/client/user/public/login', data)
}
// 用户注册接口
export function userRegister (data) {
  return http.post('/client/user/public/register', data)
}

// 账号信息
export function getUserInfo () {
  return http.get('/client/user/user/getUserInfo')
}
// 编辑账号绑定信息
export function updateUserAvatar (data) {
  return http.post('/client/user/user/updateAttr', data)
}
export function updateUserPhone (data) {
  return http.post('/client/user/user/updatePhone', data)
}
export function updateUserPwd (data) {
  return http.post('/client/user/user/updatePwd', data)
}
export function updateUserName (data) {
  return http.post('/client/user/user/updateUserName', data)
}
export function updateUserIdCard (data) {
  return http.post('/client/user/user/updateIdCard', data)
}
export function updateUserAddress (data) {
  return http.post('/client/user/user/updateAddress', data)
}


// 获取用户课程信息接口
export function getUserCourse (data) {
  return http.post('/client/course/owner/page', data)
}
// 获取用户考试信息接口
export function getUserExam (data) {
  return http.post('/client/userExam/page', data)
}
// 获取用户证书信息接口
export function getUserCertificateInfo (data) {
  return http.post('/client/userCertificateInfo/page', data)
}
// 获取用户笔记信息接口
export function getCourseNote (data) {
  return http.post('/client/courseNote/page', data)
}


// 是否存在未读消息
export function getNotReadNotice () {
  return http.get('/client/msgCenterInfo/unread')
}
// 分页获取消息中心列表
export function getNoticeList (data) {
  return http.post(`/client/msgCenterInfo/page`, data)
}
// 消息已读
export function noticeReadOne (data) {
  return http.post('/client/msgCenterInfo/mark', data)
}

// home page
export function postBannerList () {
  return http.post('/public/client/banner/list')
}
export function getHomeCategoryList () {
  return http.get('/client/category/main/list')
}
export function getHomeCourse () {
  return http.post('public/client/course/main/list')
}

// course page
// 课程导航
export function getLessonNav () {
  return http.get('/client/category/list')
}
// 课程列表
export function getLessonList (data) {
  return http.post('public/client/course/page', data)
}
// 课程详情
export function getLessonDetail (id) {
  return http.get(`public/client/course/details/${id}`)
}
// 课程章节
export function getLessonChapter (data) {
  return http.post('/client/chapter/list', data)
}
// 课程章节 - 视频播放凭证
export function getVideoAuth (data) {
  return http.post('/client/fileTable/video/auth', data)
}
// 课程章节 - 视频历史记录
export function createStudyHistory (data) {
  return http.post('/client/studyHistory/createOrUpdate', data)
}
// 满意度测评
export function createEvaluation (data) {
  return http.post('/client/satisfactionEvaluation/create', data)
}
export function updateEvaluation (data) {
  return http.post('/client/satisfactionEvaluation/update', data)
}

// 课程问答
export function getLessonQa (data) {
  return http.post('/public/client/courseQuestionAnswer/page', data)
}
export function getLessonQaCreate (data) {
  return http.post('/client/courseQuestionAnswer/create', data)
}
// 课程笔记
export function getLessonNote (data) {
  return http.post('/public/client/courseNote/page', data)
}
export function getLessonNoteCreate (data) {
  return http.post('/client/courseNote/create', data)
}
// 课程评价
export function getLessoEvaluate (data) {
  return http.post('/public/client/courseEvaluate/page', data)
}
export function getLessoEvaluateCreate (data) {
  return http.post('/client/courseEvaluate/create', data)
}

// orders
// 订单列表
export function getOrderList (data) {
  return http.post('/client/orders/page', data)
}
// 订单详情
export function getOrderInfo (orderSn) {
  return http.get(`/client/orders/details/${orderSn}`)
}
// 创建订单
export function createOrder (data) {
  return http.post('/client/orders/create', data)
}
// 取消订单
export function cancelOrder (data) {
  return http.post('/client/orders/cancel', data)
}
// 删除订单
export function deleteOrder (data) {
  return http.post('/client/orders/delete', data)
}
// 获取支付链接
export function getPayUrl (data) {
  return http.post('/client/pay/getPayUrl', data)
}
// 查询订单支付结果
export function getPayResult (data) {
  return http.post('/client/pay/getPayResult', data)
}

// 培训套餐
export function getTrainList (data) {
  return http.post('/public/client/trainingPackage/page', data)
}
export function getTrainDetail (id) {
  return http.get(`/public/client/trainingPackage/details/${id}`)
}

// 在线考试
export function getExamList (data) {
  return http.post('/client/examInfo/page', data)
}
export function getExamDetail (id) {
  return http.get(`/client/examInfo/startExam/${id}`)
}
export function putExam (data) {
  return http.post('/client/examInfo/submit', data)
}
export function getExamResult (id) {
  return http.get(`/client/userExam/details/${id}`)
}

// 签到
export function getSignIn (trainingCourseId) {
  return http.get(`/client/offlineTrainingCourse/detail/${trainingCourseId}`)
}
export function submitSignIn (data) {
  return http.post('/client/offlineTrainingCourse/submit', data)
}