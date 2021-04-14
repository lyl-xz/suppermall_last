<template>
  <div class="tab-bar-item" @click="itemclick">
    <div v-if="!isactive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>  
    <div :style="activeStyle">
       <slot name="item-text"></slot>  
    </div>  
  </div>
</template>

<script>
export default {
name:"tabbarItem",
props: {
  path:String,
  activeColor:{
    type:String,
    default:'red'
  }
},
data(){
  return {
    //isactive:true
  }
},
//动态决定激活的路由改变颜色的方法，返回的是isactive的值
computed: {
  isactive(){
    //indexOf()如果要检索的字符串值没有出现，则该方法返回 -1,如果出现了 ！==-1
    return this.$route.path.indexOf(this.path) !== -1
  },
  activeStyle(){
    //条件判断语句
    return this.isactive ? {color:this.activeColor} : {}
  }
},        
methods: {
  itemclick(){
   this.$router.push(this.path).catch(err => {})
  }
}
}
</script>

<style>
/* 只能用这种方式导入 */
@import "../../../assets/css/base.css";

/* flex:1表示均分 */        
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: 3px;
   margin-bottom: 2px;
}

</style>