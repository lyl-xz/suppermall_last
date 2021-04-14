<template>
  <div class="goodItem" @click="itemClick">
    <img :src="showImage" alt="" @load = "imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="icon">☆</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
name:"goodsItem",
//从父组件中取出数据
props:{
  goodsItem:{
    type:Object,
    default(){
   return {}
    }
  }
},
computed: {
  showImage(){
    return this.goodsItem.image || this.goodsItem.show.img
  }
},
methods: {
  imageLoad(){
    this.$bus.$emit('ItemImageload')
  },
  itemClick(){
    //设置路由地址显示的路径
    this.$router.push("/detail/" + this.goodsItem.iid)
  }
}
}
</script>

<style>
.goodItem{
  padding-bottom: 44px;
  position: relative;
  width: 47%;
}
.goodItem img{
  width: 100%;
  border-radius:5px ;
  
}
.goods-info{
  font-size:12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p{
  overflow: hidden;
   /* 文本溢出时显示省略号来代表被修剪的文本 */
  text-overflow: ellipsis;
  /* 段落文本不进行换行 */
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price{
  color:var(--color-high-text);
  margin-right: 20px;
}


</style>