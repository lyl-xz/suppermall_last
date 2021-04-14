<template>
  <div class="tabcontrol">
 <div v-for="(item,index) in titles":key="index" class="title" :class="{active:index==currentIndex}" @click="tabclick(index)">
   <span>{{item}}</span>
 </div>
  </div>
</template>

<script>
export default {
name:"tabcontrol",
props: {
  titles:{
    type:Array,
    default(){
      return []
    }
  }
},
data(){
  return {
    currentIndex:0
  }
},
methods: {
  tabclick(index){
    this.currentIndex = index
    //子传父，方法tabclick和参数index一起传过去
    this.$emit('tabclick',index)
  }
}
}
</script>    

<style>
.tabcontrol{
  display: flex;
  text-align: center;
  font-size: 15px;
  background-color:#fff;
}
.title{
  flex: 1;
  margin-right: 20px;
  height: 40px;
  line-height: 40px;
}
.title span{
  padding: 5px;
}
.active{
  color:var(--color-high-text);
}
.active span{
 border-bottom: 3px solid var(--color-tint) ;
}
</style>