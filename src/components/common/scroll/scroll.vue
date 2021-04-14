<template>
<!-- ref/children获取子组件 -->
<!-- ref如果是绑定在组件中的，那么通过“this.$refs.refname"获取到的是一个组件对象 -->
<!-- ref如果是绑定在元素中，那么通过“this.$refs.refname"获取到的是一个元素对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
      </div>   
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
name:"scroll",
//子要传给父的参数，变量
props: {
  probeType:{
    type:Number,
    default:0
  },
  pullUpLoad:{
    type:Boolean,
    default:false
  }
},
data(){
  return{
    scroll:null
  }
},
mounted () {
  //1.创建bscroll对象
  this.scroll = new BScroll(this.$refs.wrapper,{
    //参数设置属性
    observeDOM:true,
    //probeType:0/1/2(手指滚动)/3(只要是滚动)
    probeType:this.probeType,
    pullUpLoad:this.pullUpLoad
  })

  //2.监听滚动的位置，
 if (this.probeType == 2 || this.probeType == 3) {this.scroll.on('scroll',(position) => {
//console.log(position);
//传出一个自定义事件和参数
this.$emit('scroll',position)
  }) }

  //3.监听上拉事件,监听scroll滚动到底部，加一个判断再执行可以增强浏览器性能，跟pullUpLoad有关
 if(this.pullUpLoad) {this.scroll.on('pullingUp',() => {
    this.$emit('pullingUp')
  })}
},
methods:{
  scrollTo(x,y,time=300){
  this.scroll && this.scroll.scrollTo(x,y,time)
  },
  //终止上拉的方法
  finishPullUp(){
  this.scroll&&this.scroll.finishPullUp()
},
refresh(){
 this.scroll && this.scroll.refresh()
},
getscrolly(){
  return this.scroll ? this.scroll.y : 0
}
}
}
</script>

<style scoped>

</style>