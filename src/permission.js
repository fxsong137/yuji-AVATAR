import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // 没有重定向白名单 也就是登录页面
// 全局前置守卫 当一个导航触发时,守卫按照创建顺序调用，且是异步解析执行,此时导航在所有
// 守卫resolve完前一直处于等待中
// 这里的守卫接收了3个参数  to:即将进入的目标路由对象 from:当前导航正要离开的路由  next:一定要调用该方法来resolve()这个钩子,执行效果依赖next方法的调用参数
router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()

  // 设置网页项目名称
  document.title = getPageTitle(to.meta.title)

  // 获取token
  const hasToken = getToken()
  // 判断token是否存在
  if (hasToken) {
    // to.path 是路由地址 判断是不是login登录页面路由
    if (to.path === '/login') {
      // 如果已登录则重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 获取用户信息
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // 出现异常 清除token
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 不存在token令牌*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单 直接去
      next()
    } else {
      // 没有访问权限的全部重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
