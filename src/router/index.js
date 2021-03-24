import Vue from 'vue'
import VueRouter from 'vue-router'
//懒加载
const home = () => import('../views/home/home')
const category = () => import('../views/category/category')
const profile = () => import('../views/profile/profile')
const cart = () => import('../views/cart/cart')


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
  }
  ],
  mode:"history"
})
export default router
