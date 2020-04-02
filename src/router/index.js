import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/register",
    component: () => import("@/views/register/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/goods/add",
    component: () => import("@/views/goods/Add"),
    hidden: true
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   redirect: '/form/good',
  //   name: '商品管理',
  //   meta: { title: '商品管理', icon: 'form' },
  //   children: [
  //     {
  //       path: 'goods/good',
  //       name: '商品列表',
  //       component: () => import('@/views/goods/'),
  //       meta: { title: '商品列表', icon: 'nested' }
  //     }
  //   ]
  // },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    name: "主页",
    meta: { title: "主页", icon: "dashboard" },
    children: [
      {
        path: "/dashboard",
        name: "首页",
        component: () => import("@/views/dashboard"),
        meta: { title: "首页", icon: "table" }
      }
    ]
  },

  {
    path: "/",
    component: Layout,
    redirect: "/user/user",
    name: "用户管理",
    meta: { title: "用户管理", icon: "dashboard" },
    children: [
      {
        path: "/user/user",
        name: "用户列表",
        component: () => import("@/views//user/user"),
        meta: { title: "用户列表", icon: "table" }
      }
    ]
  },
  {
    path: "/power",
    component: Layout,
    redirect: "/power/table",
    name: "权限管理",
    meta: { title: "权限管理", icon: "example" },
    children: [
      {
        path: "/power/Rights",
        name: "用户权限",
        component: () => import("@/views/power/Rights"),
        meta: { title: "用户权限", icon: "nested" }
      },
      {
        path: "/power/Roles",
        name: "用户角色",
        component: () => import("@/views/power/Roles"),
        meta: { title: "用户角色", icon: "nested" }
      }
    ]
  },

  {
    path: "/form",
    component: Layout,
    redirect: "/form/table",
    name: "商品管理",
    meta: { title: "商品管理", icon: "form" },
    children: [
      {
        path: "goods/List",
        name: "商品列表",
        component: () => import("@/views/goods/List"),
        meta: { title: "商品列表", icon: "nested" }
      },
      {
        path: "goods/Params",
        name: "分类参数",
        component: () => import("@/views/goods/Params"),
        meta: { title: "分类参数", icon: "table" }
      },
      {
        path: "goods/Cate",
        name: "商品分类",
        component: () => import("@/views/goods/Cate"),
        meta: { title: "商品分类", icon: "tree" }
      },
      {
        path: "goods/add",
        name: "添加商品", //修改一下
        component: () => import("@/views/goods/Add"),
        meta: { title: "添加商品", icon: "tree" },
        hidden: true
      }
    ]
  },

  {
    path: "/order",
    component: Layout,
    redirect: "/order/Order",
    name: "订单管理",
    meta: {
      title: "订单管理",
      icon: "nested"
    },
    children: [
      {
        path: "Order",
        component: () => import("@/views/order/Order"),
        meta: { title: "订单列表" }
      }
    ]
  },

  {
    path: "/car",
    component: Layout,
    name: "购物车",
    meta: {
      title: "购物车",
      icon: "nested"
    },
    component: () => import("@/views/car/index")
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
