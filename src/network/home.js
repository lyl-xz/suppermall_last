import {request} from "./request"
//请求首页多个数据
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    //params传参
    params:{
      type,
      page
    }
  })
}
//函数调用->压入函数栈（保存函数调用过程中所有变量）
//函数调用结束->弹出函数栈（释放函数所有变量）
// function test(){
//   const names = ['why', 'aaa']
// }
// test()
//再调用一次，变量重新创建然后继续被回收掉
