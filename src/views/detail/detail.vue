<template>
  <div id="detail">
  <detail-child class="detail-nav" @titleClick = "titleClick" ref="nav"></detail-child>
  <scroll class="content" ref="scroll" @scroll="contentscroll" :probe-type="3">
    <detail-swiper :top-images="topImages"/>
  <detail-base-info :goods="goods"/>
   <detail-shop-info :shop="shop"/> 
   <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/> 
   <detail-param-info :param-info="paramInfo" ref="params"/>
   <detail-comment-info :commentInfo="commentInfo" ref="comment" />
   <goodslist :goods="recommends" class="recommend-list" ref="recommend"/>
   </scroll>
    <detailnavbar @addCart="addToCart"/>
    <backTop @click.native="backClick" v-show="isshow"/>     
  </div>
</template>

<script>
import detailSwiper from "./childComps/detailSwiper"
import detailChild from "./childComps/detailChild"
import detailBaseInfo from "./childComps/detailBaseInfo"
import detailShopInfo from "./childComps/detailShopInfo"
import detailGoodsInfo from "./childComps/detailGoodsInfo"
import detailParamInfo from "./childComps/detailParamInfo"
import detailCommentInfo from "./childComps/detailCommentInfo"
import detailnavbar from "./childComps/detailnavbar"

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
import {itemListenerMinx,backTopmenu} from "components/common/mixin"
import {debounce} from "components/common/utils"

import scroll from 'components/common/scroll/scroll'
import goodslist from "components/content/goods/goodslist"


export default {
name:"detail",
components: {
 detailChild,
 detailSwiper,
 detailBaseInfo,
 detailShopInfo,
 detailGoodsInfo,
 detailParamInfo,
 detailCommentInfo,
 scroll,
 goodslist,
 detailnavbar
},
//混入的使用，组件之间共享代码
mixins:[itemListenerMinx,backTopmenu],
data(){
  return{
    iid:'',
    topImages:[],
    goods:{},
    shop:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommends:[],
    themeTopys:[],
    getThemeTopY:"",
    currentIndex:0
  }
},
created() {
  //1.保存传入的iid
  this.iid = this.$route.params.iid

  //2.根据iid请求详情数据
  getDetail(this.iid).then(res => {
    console.log(res);
    const data = res.result;
 //1.获取顶部的图片轮播数据
 this.topImages = data.itemInfo.topImages
 
  //2.获取商品信息
   this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

   //3.创建店铺信息
   this.shop = new Shop(data.shopInfo)

   //4.保存商品的详情数据
   this.detailInfo = data.detailInfo;

   //5.获取参数信息
   this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

   //6.获取评论信息
   if(data.rate.cRate !== 0){
 this.commentInfo = data.rate.list[0]
   } 

  })
  
  //3.请求推荐数据
  getRecommend().then(res => {
    console.log(res);
    this.recommends = res.data.list
  })

  //4.给getThemeTopy赋值（对给this.themeTopys赋值的操作进行防抖）
  this.getThemeTopY = debounce(() =>{
this.themeTopys = []
this.themeTopys.push(0);
//vm.$el 获取Vue实例关联的DOM元素；
this.themeTopys.push(this.$refs.params.$el.offsetTop-44);
this.themeTopys.push(this.$refs.comment.$el.offsetTop-44);
this.themeTopys.push(this.$refs.recommend.$el.offsetTop-44);
this.themeTopys.push(Number.MAX_VALUE);
  },100)
},
methods: {
  titleClick(index){
//console.log(index);
this.$refs.scroll.scrollTo(0,-this.themeTopys[index],300)
  },
  imageLoad(){
     /* 监听图片刷新 */
this.newRefresh()
//加载完回调执行函
this.getThemeTopY()
  },

  contentscroll(position){
    //是否显示回到顶部
    this.isshow = (-position.y) > 1000
    
   //1.获取y值
   const positionY = -position.y
   //2.position和主题中值进行对比
   //[0, 24696, 26046, 26359，Number.MAX_VALUE(最大值)],第一个区间[0,24696],index=0;第二个区间index=1,第三个区间,index=2,   第4个区间，超过26359,index=3
   //遍历this.themeTopys中的个数
   let length = this.themeTopys.length
      //内容滚动，显示正确的标题，判断在之间,最后一个值没有判断意义，所以减去1
  for(let i = 0; i < length-1;i++){
    //普通做法,||两边括号括起来
   //if (this.currentIndex !== i && ((i<length-1 && positionY>=this.themeTopys[i]&&positionY<this.themeTopys[i+1])||(i==length-1 && positionY>=this.themeTopys[i])))
    
    if(this.currentIndex !== i && (positionY>=this.themeTopys[i]&&positionY<this.themeTopys[i+1]))
    {
     this.currentIndex = i;
     //直接获取组件关联的数据
     this.$refs.nav.currentIndex = this.currentIndex
   }
  }
  },

  addToCart(){
    //1.获取购物车需要展示的信息
    const product = {};
    product.image = this.topImages[0];
    product.title = this.goods.title;
    product.desc = this.goods.desc;
    product.price = this.goods.realPrice;
    product.iid = this.iid;
    //2.将商品加入到购物车
    //this.$store.commit('addCart',product);
    this.$store.dispatch('addCart', product)
  }
},
//记得销毁关闭，不关闭会一直叠加调用这个方法
destroyed () {
  this.$bus.$off('ItemImageload',this.itemImgListener)
}
}

</script>

<style scoped>
#detail{
  position: relative;
  z-index: 100;
  background-color: #fff; 
  /* 百分之百视觉高度*/
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 101;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px - 49px);
}
.recommend-list{
  margin-top:20px ;
}
</style>