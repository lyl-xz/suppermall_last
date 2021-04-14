<template>
  <div class="goods">
  <goods-item v-for="(item,index) in goods" :key="index" :goodsItem="item"/>
  </div>
</template>

<script>
import goodsItem from './goodsItem'
export default {
name:"goodslist",
//从父组件中取出数据
props: {
  goods:{
    type:Array,
    default(){
     return []
    }
  }
},
components: {
  goodsItem
}
}
</script>

<style>
.goods{
  display: flex;
  /* 设置成弹性布局 */
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 4px;
}

</style>