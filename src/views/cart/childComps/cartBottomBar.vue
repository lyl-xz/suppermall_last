<template>
  <div class="bottom-bar">
    <div class="button">
   <check-button class="icon"></check-button>
   <span>全选</span>
    </div> 

    <div class="total">合计：{{totalPrice}}</div> 

     <div class="calculate">去计算 ({{checkLength}})</div>
  </div>
</template>

<script>
import checkButton from 'components/content/checkButton/checkButton'
export default {
 name:"cartBottomBar",
 components: {
   checkButton
 },
 computed: {
   totalPrice(){
     //reduce汇总，计算总和,toFixed(2)保留两位小数
     return "￥" + this.$store.state.cartList.filter(item => {
       return item.checked
     }).reduce((preValue,item) => {return preValue + item.price*item.count},0).toFixed(2)
   },
   checkLength(){
   return this.$store.state.cartList.filter(item => {
       return item.checked
     }).length
   }
 }
}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  line-height: 40px;
  background-color:#eee;
  position: relative;
  display: flex;
  font-size: 14px;
}
.button{
 display: flex;
align-items: center;
width: 100px;
}
.icon{
  margin: auto 5px auto 10px;
  width: 18px;
  height:18px;
  line-height: 18px;
}
.total{
margin-left:20px ;
flex: 1;
}
.calculate{
  background-color:rgb(250, 51, 51);
 width: 100px;
 text-align: center;
 color: #fff;
}
</style>