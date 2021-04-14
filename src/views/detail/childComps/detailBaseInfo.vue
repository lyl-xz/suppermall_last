<template>
<!-- 首先判断是否是空的对象 -->
    <div v-if="Object.keys(goods).length !==0" class="base-info">
      <div class="info-title">{{goods.title}}</div>
      <div class="info-price">
        <span class="n-price">{{goods.newPrice}}</span>
        <span class="o-price">{{goods.oldPrice}}</span>
        <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
      </div>
      <div class="info-other">
        <span>{{goods.columns[0]}}</span>
         <span>{{goods.columns[1]}}</span>
         <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>
      <div class="info-service">
        <!-- 数字遍历，10，1-10从1开始 -->
        <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
          <!-- 所以取数字的时候后缀减1 -->
          <img :src="goods.services[index-1].icon" alt="">
          <span>{{goods.services[index-1].name}}</span>
        </span>
      </div>
      </div>  
</template>

<script>
export default {
name:"detailBaseInfo",             
 props:{
  goods:{
type:Object,
  default(){
    return {}
  }
  }  
 }
 }
</script>

<style scoped>
.base-info{
  margin-top:12px;
  padding: 0 8px;
  color: #999;
  border-bottom:5px solid #f2f5f8 ;
}
.info-title{
  font-size: 15px;
  color: #222;
}
.info-price{
 margin-top:8px ;
}
.n-price{
  font-size:19px;
  color: var(--color-high-text);
}
.o-price{
  font-size:13px;
  margin-left: 5px;
  /* 划横线 */
  text-decoration: line-through;
}
.discount{
  color: #fff;
  font-size:12px;
  padding: 2px 5px;
  background-color: var(--color-high-text);
  position: relative;
  top: -2px;
  border-radius: 9px;
}
.info-other {
  margin-top: 15px;
  line-height: 30px;
  font-size:13px;
  border-bottom: 1px solid rgba(100, 100, 100, .1);
  display: flex;
  /* 弹性布局可以实现两边靠边，中间等分的效果 */
  justify-content: space-between;
}
.info-service{
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}
.info-service-item img{
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}
.info-service-item span{
  font-size: 13px;
  color: #333;
}

</style>