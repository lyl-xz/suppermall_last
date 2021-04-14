import Vue from 'vue'
import VueRouter from 'vue-router'
//懒加载
const home = () => import('../views/home/home')
const category = () => import('../views/category/category')
const profile = () => import('../views/profile/profile')
const cart = () => import('../views/cart/cart')
const detail = () => import('../views/detail/detail')

Vue.use(VueRouter)

 const router = new VueRouter({
  routes: [
   {
     path:'',
     redirect: '/home'
   },
   {
    path:'/home',
    component: home 
  },
  {
    path:'/category',
    
    component: category
  },
  {
    path:'/profile',
    component: profile
  },
  {
    path:'/cart',
    component: cart
  },
  {//动态路由的设置方式
    path:'/detail/:iid',
    component: detail
  }
  ],
  mode:"history"
})
export default router
