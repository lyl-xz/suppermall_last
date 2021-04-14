<template>
  <swiper>
        <swiper-item v-for="(item,index) in banners":key="index">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad">
          </a>
        </swiper-item>
      </swiper>
</template>

<script>
// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
name:"homeSwiper",
props: {
 banners:{
   type:Array,
   dafault(){           
     return []
   }
 }
},
data () {
  return {
    isload:false
  }
},
components: {
  Swiper,SwiperItem
},
methods: {
  //这种记录状态的方式可以巧妙得让事件只触发一次
  imageLoad(){
    if (!this.isload){
  this.$emit('swiperImageLoad')
  this.isload = true
    } 
  }
}
}
</script>

<style>

</style>