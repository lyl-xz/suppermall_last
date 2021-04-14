<template>
  <div v-if="Object.keys(detailInfo).length !==0" class="goods-info">
    <div class="info-desc clear-fix">
   <div class="start"></div>
   <div class="desc">{{detailInfo.desc}}</div>
   <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="" @load = "imgLoad">
    </div>
  </div>
</template>

<script>
export default {
name:"detailGoodsInfo",
props: {
  detailInfo:{
    type:Object,
    default(){
      return {}
    }
  }
},
data(){
return{
  imagesLength:0,
  counter:0
}
},
methods: {
  imgLoad(){
    //用counter记录图片加载完成，判断所有图片都加载完，进行一次回调
    if (++this.counter == this.imagesLength){
      this.$emit('imageLoad')
    }          
  }
},
//watch监听属性的改变
watch: {
  detailInfo(){
    //获取图片的个数
    this.imagesLength = this.detailInfo.detailImage[0].list.length
  }
}
}
</script>

<style scoped>
.goods-info{
 position: relative;
 top: 15px;
 left: 0;
  border-bottom: 5px solid #f2f5f8;
}
.info-desc{
  margin:0 5px;
  font-size: 13px;
}
.info-key{
  margin:10px 5px 10px;
  font-size: 14px;
}

.info-list img{
  width: 100vw;
}

</style>