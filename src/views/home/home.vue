<template>
  <div id="home">
      <navbar class="home-nav"><div slot="center">购物街</div></navbar>
       <tabcontrol :titles="['流行','新款','精选']" @tabclick="tabclick" ref="tabControl1" class="tab-control" v-show="isTabfixed"/>
          <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"
          :pull-up-load="true" @pullingUp="loadMore">
              <home-swiper :banners="banners" @swiperImageLoad='swiperLoad'/>
          <recommend-view :recommends="recommends"/>
          <div class="obj"></div>
          <feature-view/>
          <tabcontrol :titles="['流行','新款','精选']" @tabclick="tabclick" ref="tabControl2"/>
          <goodslist :goods="showGoods"/>
          </scroll>
          <!-- 组件不能直接监听点击，必须经过处理.native,就可以点击,v-on修饰符，监听组件根元素的原生事件 -->
          <backTop @click.native="backClick" v-show="isshow"/>     
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
import tabcontrol from "components/content/tabcontrol/tabcontrol"
import goodslist from "components/content/goods/goodslist"
import scroll from  'components/common/scroll/scroll'

import homeSwiper from './childComps/homeSwiper'
import recommendView from "./childComps/recommendView"     
import featureView from "./childComps/featureView"

import {getHomeMultidata,getHomeGoods} from "network/home"
import {itemListenerMinx,backTopmenu} from "components/common/mixin"

export default {
name:"home",
components: {
  navbar,
  homeSwiper,   
  recommendView,    
  featureView,     
  tabcontrol,
  goodslist,
  scroll
},
mixins:[itemListenerMinx,backTopmenu],
data(){
  return {
    banners:[],
    recommends:[],
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]},
    },
    //设置默认为“pop"
    currentType:'pop',
    tabOffsetTop:0,
    isTabfixed:false,
    saveY:0
  }
},
computed: {
  showGoods(){
    return this.goods[this.currentType].list
  }
},
destroyed () {
  console.log("destroyed");
},
//激活的时候,scrollTo(x,y,time)，设置离开之前的位置
activated () {
  setTimeout(() => {this.$refs.scroll.scrollTo(0,this.saveY,0)},10)
  this.$refs.scroll.refresh()
},
//记录离开的时候的位置
deactivated () {
  //1.保存y值
 this.saveY = this.$refs.scroll.getscrolly()
 //2.取消全局事件的监听，记得关闭，不关闭会一直叠加调用这个方法
 this.$bus.$off()
},
//生命周期函数
created(){
  this.getHomeMultidata()
  //请求数据，重名的时候this代表home里面封装的函数
  this.getHomeGoods('pop')
  this.getHomeGoods('new')
  this.getHomeGoods('sell')  
},

methods: {
  //事件监听相关方法
tabclick(index){
  //switch表达式 ，case穿透，适合根据index不同切换不同情况
switch(index){
  case 0:
    this.currentType = 'pop'
    break
  case 1:
    this.currentType = 'new'
    break
  case 2:
    this.currentType = 'sell'
}
//让两个tabcontrol的currentIndex保持一致
this.$refs.tabControl1.currentIndex = index;
this.$refs.tabControl2.currentIndex = index;
},

contentScroll(position){
  //1.条件为真，判断成立；反之，判断backTop是否显示
this.isshow = (-position.y) > 1000
//2.决定tabControl是否吸顶（position:fixed)
 this.isTabfixed = (-position.y) > this.tabOffsetTop
},

loadMore(){
this.getHomeGoods(this.currentType)
//当容器不是固定高度时，图片进行刷新扩大容器
//this.$refs.scroll.scroll.refresh()
},

swiperLoad(){
   //获取tabControl的offsetTop属性通过$el获取
  //所有组件都有一个属性$el:用于获取组件中的元素,不能直接通过组件获取offsetTop
 this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop 
},

  //网络请求相关方法 1.请求多个数据
   getHomeMultidata(){
     getHomeMultidata().then(res => {
    //console.log(res);
    //将函数调用的结果用变量保存起来,不然数据会被回收掉         
    this.banners = res.data.banner.list,
    this.recommends = res.data.recommend.list
  })},
   //2.请求商品数据
    getHomeGoods(type){
     const page = this.goods[type].page+1
    getHomeGoods(type,page).then(res =>{
      //...es6语法将数组里面的元素全部push进另一个数组（...xxx)  
    this.goods[type].list.push(...res.data.list)
    this.goods[type].page += 1
    //完成上拉加载更多
    this.$refs.scroll.finishPullUp()
    })
   }
}
}
</script>

<style scoped>
 /* scoped作用域，写的所有样式只会针对当前组件的作用域 */
#home{
  /* vh表示视口高度，百分之百视口100vh*/
  height: 100vh;
  position: relative;
}
.obj{
  width:100%;
  height: 15px;
  background-color: #f6f6f6;
}
.home-nav{
  background-color: #ff5777;
  color: #fff;
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
 /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;*/
}
/*.tabcontrol{
   到达设置的固定位置就黏住，不支持IE，适合移动端 
  position: sticky;
  top: 44px;
  z-index: 9;
}*/
 /* 可以通过计算指定内容的高度*/
/* .content{
  height:calc(100% - 93px);
  overflow:hidden;
  margin-top:44px
}*/
.content{
 overflow: hidden;
 /* 也可以定位，子绝父相，通过上下设置高度的方式*/
 position: absolute;
 top: 44px;
 bottom: 49px;
}
.tab-control{
  position: relative;
  z-index: 9;
}

</style>