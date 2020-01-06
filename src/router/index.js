import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 *当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 *hidden: true // (默认 false)
 *
 *当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 *redirect: 'noRedirect'
 *
 *当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *若你想不管路由下面的 children 声明的个数都显示你的根路由
 *你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 *alwaysShow: true
 *
 *name: 'router-name' //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 *meta: {
 * roles: ['admin', 'editor'] //设置该路由进入的权限，支持多个权限叠加
 * title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
 * icon: 'svg-name' //设置该路由的图标
 * noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
 * breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示
 *}
 **/
// constantRoutes:所有权限通用路由表  代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。
export const constantRoutes = [
  {
    // 根路由
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/index/index'),
      meta: { title: '首页', icon: 'dashboard' }
      // title:设置该路由在侧边栏和面包屑中展示的名字
      // icon:设置该路由的图标
    }]
  },
  /* 这里需要注意一下，一般侧边栏有两种形式即：submenu 和 直接 el-menu-item。 一个是嵌套子菜单，另一个则是直接一个链接。如下图：
     在 Sidebar 中已经帮你做了判断，当你一个路由下面的 children 声明的路由大于>1 个时，自动会变成嵌套的模式。
     如果子路由正好等于一个就会默认将子路由作为根路由显示在侧边栏中，
     若不想这样，可以通过设置在根路由中设置alwaysShow: true来取消这一特性。如：
  */
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true// 不在侧边栏线上出现
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true// 不在侧边栏线上出现
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userInfo',
    name: 'User',
    meta: { title: '个人中心', icon: 'user01' },
    children: [
      {
        path: 'userInfo',
        name: 'UserInfo',
        component: () => import('@/views/user/userInfo'),
        meta: { title: '详细信息', icon: 'table' }
      },
      {
        path: 'realName',
        name: 'RealName',
        component: () => import('@/views/user/realName'),
        meta: { title: '实名', icon: 'tree' }
      }
    ]
  },

  {
    path: '/api',
    component: Layout,
    redirect: '/api',
    name: 'api',
    children: [{
      path: 'api',
      name: 'Api',
      component: () => import('@/views/api/index'),
      meta: { title: 'API', icon: 'API' }
    },
    {
      // API详情
      path: 'details',
      name: 'details',
      component: () => import('@/views/api/details/apiDetails'),
      meta: { title: '详情' },
      hidden: true

    }]
  },
  {
    path: '/cost',
    component: Layout,
    redirect: '/cost/balance',
    name: 'Cost',
    meta: { title: '费用', icon: 'feiyong' },
    children: [
      {
        path: 'balance',
        name: 'Balance',
        component: () => import('@/views/cost/balance'),
        meta: { title: '余额', icon: 'table' }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/cost/order'),
        meta: { title: '订单', icon: 'tree' }
      },
      {
        path: 'invoice',
        name: 'Invoice',
        component: () => import('@/views/cost/invoice'),
        meta: { title: '发票', icon: 'tree' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 动态清除注册的路由
// 所有的 vue-router 注册的路由信息都是存放在matcher之中的，所以当我们想清空路由的时候，我们只要新建一个空的Router实例，
// 将它的matcher重新赋值给我们之前定义的路由就可以了。巧妙的实现了动态路由的清除。
// 现在我们只需要调用resetRouter，就能得到一个空的路有实例，之后你就可以重新addRoutes你想要的路由了
const createRouter = () => new Router({
  // 模式mode: 'history', // 需要浏览器服务支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
/* END 动态清除路由 END */
export default router

