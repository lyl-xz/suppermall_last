<template>
<div>
  <navbar>
    <div slot="left"  class="back" @click="backClick">
      <img src="~assets/img/back.svg" alt="">
    </div>
  <div slot="center" class="title">
    <div class="title-item" 
    v-for="(item,index) in titles" :key="index"
    :class="{active:index == currentIndex}"
    @click="change(index)"
    >{{item}}</div>
  </div>
</navbar>
</div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'

export default {
name:"detailChild",
components: {
  navbar
},
data(){
  return{
    titles:['商品','参数','评论','推荐'],
    currentIndex:0
    }
},
methods: {
  change(index){
    this.currentIndex = index
    this.$emit('titleClick',index)
  },
  backClick(){
    //返回一个，或者go(-1)
this.$router.back()
  },

}
}
</script>

<style scoped>
.title{
  display: flex;
  font-size: 13px;
  text-align: center;
}
.title-item{
  flex: 1;
}
.active{
  color:var(--color-high-text);
}
.back img{
  margin-top:12px ;
}
</style>