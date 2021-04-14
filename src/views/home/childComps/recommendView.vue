<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends":key="index" class="recommend_item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div class="text">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
 
<script>
export default {
name:"recommendView",
props: {
  recommends:{
    type:Array,
    default(){
      return[]
    }
  }
}
}
</script>

<style>
.recommend{
  display: flex;
  width:100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 10px 0;
}
.recommend_item{
  /* 均等分flex:1 */
  flex: 1;
}
.recommend_item img{
  width: 68px;
  height: 68px;
  margin-bottom:10px ;
}

</style>