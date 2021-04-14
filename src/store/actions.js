import {ADD_COUNTER, ADD_TO_CART} from "./mutation-types"
export default{
  addCart(context,payload){
    //find函数1.查找之前的数组是否有该商品
   let oldProduct = context.state.cartList.find(item => item.iid ==payload.iid)
   //2，判断oldProduct,如果之前存在就count+1,如果不存在就默认为1
   if(oldProduct){
   //oldProduct.count += 1
   //用commit分别发射出两个函数
   context.commit(ADD_COUNTER,oldProduct)
   }else{
     payload.count = 1
    // state.cartList.push(payload)
    context.commit(ADD_TO_CART,payload)
   }
  }
}