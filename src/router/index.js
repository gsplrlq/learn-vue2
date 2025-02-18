import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
import { getUserInfo } from 'utils/cache.js'
Vue.use(Router)

const Layout = () => import('../layout/index.vue') // 布局

const Home = () => import('pages/home/index.vue') // 首页路由
const CourseIndex = () => import('pages/course/index.vue') // 免费课程路由
const CourseDetail = () => import('pages/course-detail/index.vue') // 免费课程详情路由
const VideoIndex = () => import('pages/video/index.vue') // 免费课程路由
const LessonIndex = () => import('pages/lesson/index.vue') // 实战课程路由
const LessonDetail = () => import('pages/lesson-detail/index.vue') // 实战课程详情路由
const ExamIndex = () => import('pages/exam/index.vue') // 在线考试路由
const ExamDetail = () => import('pages/exam/exam-detail.vue') // 在线考试路由
const ExamResult = () => import('pages/exam/exam-result.vue') // 在线考试详情路由
const UserCenter = () => import('pages/user/index.vue') // 个人中心路由
const UserCourse = () => import('pages/user-course/index.vue') // 我的课程路由
const OrderIndex = () => import('pages/order/index.vue') // 订单中心路由
const NoticeIndex = () => import('pages/notice/index.vue') // 消息中心路由
const CartIndex = () => import('pages/cart/cart.vue') // 购物车路由
const CartConfirm = () => import('pages/cart/confirm.vue') // 购物车确认路由
const CartPay = () => import('pages/cart/pay.vue') // 购物车支付路由

const SignIn = () => import('pages/sign/index.vue') // 线下课签到路由 (手机端)

// const ReadIndex = () => import('pages/read/index.vue') // 专栏路由
// const ReadDetaiil = () => import('pages/read-detail/index.vue') // 专栏详情路由
// const QuestionIndex = () => import('pages/question/index.vue') // 猿问路由
// const ArticleIndex = () => import('pages/article/index.vue') // 手记路由
// const IntegralIndex = () => import('pages/integral/index.vue') // 积分商场路由

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component:Home 
      },
      {
        path: '/user',
        name: 'UserCenter',
        component:UserCenter,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/user/course',
        name: 'UserCourse',
        component: UserCourse,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/order',
        name: 'OrderIndex',
        component:OrderIndex,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/course',
        name: 'CourseIndex',
        component: CourseIndex,
      },
      {
        path: '/course/:id',
        name: 'CourseDetail',
        component: CourseDetail
      },
      {
        path: '/video/:id',
        name: 'VideoIndex',
        component: VideoIndex,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/lesson',
        name: 'LessonIndex',
        component:LessonIndex
      },
      {
        path: '/lesson/:id',
        name: 'LessonDetail',
        component: LessonDetail
      },
      {
        path: '/exam',
        name: 'ExamIndex',
        component:ExamIndex,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/exam/:id',
        name: 'ExamDetail',
        component: ExamDetail,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/exam/res/:id',
        name: 'ExamResult',
        component: ExamResult,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/notice',
        name: 'NoticeIndex',
        component:NoticeIndex,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/cart',
        name: 'CartIndex',
        component:CartIndex,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/cart/confirm/:id',
        name: 'CartConfirm',
        component:CartConfirm,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/cart/pay/:orderSn',
        name: 'CartPay',
        component:CartPay,
        meta: {
          requireAuth: true
        }
      },
    ]
  },

  {
    path: '/sign-in/:id',
    name: 'SignIn',
    component: SignIn,
  },

  // 放弃路由
  // {
  //   path: '/read',
  //   name: 'ReadIndex',
  //   component:ReadIndex,
  // },
  // {
  //   path: '/read/:id',
  //   name: 'ReadDetaiil',
  //   component:ReadDetaiil,
  // },
  // {
  //   path: '/question',
  //   name: 'QuestionIndex',
  //   component:QuestionIndex
  // },
  // {
  //   path: '/article',
  //   name: 'ArticleIndex',
  //   component:ArticleIndex
  // },
  // {
  //   path: '/integral',
  //   name: 'IntegralIndex',
  //   component: IntegralIndex
  // }
]
const router = new Router({
  routes: routes,
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  }
})

// 路由拦截
router.beforeEach((to, from, next) => {
  let userinfo = getUserInfo()
  if (to.meta.requireAuth) {
    if (userinfo.id) {
      next()
    } else{
      store.commit('login/SET_LOGIN_ACTION', 'login')
      store.commit('login/SET_SHOW_LOGIN', true)
      next('/home')
    }
  } else {
    next()
  }
})


export default router