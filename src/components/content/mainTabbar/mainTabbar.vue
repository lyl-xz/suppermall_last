<template>
  <tabbar>
  <tabbarItem path="/home">
     <img slot="item-icon" src="~assets/img/001.png" alt="">
     <img slot="item-icon-active" src="~assets/img/001-1.png" alt="">
    <div slot="item-text">首页</div>
  </tabbarItem>
  <tabbarItem path="/category" >
     <img slot="item-icon" src="~assets/img/002.png" alt="">
     <img slot="item-icon-active" src="~assets/img/002-1.png" alt="">
    <div slot="item-text">分类</div>
  </tabbarItem>
  <tabbarItem path="/cart">
      <img slot="item-icon" src="~assets/img/004.png" alt="">
      <img slot="item-icon-active" src="~assets/img/003-1.png" alt="">
    <div slot="item-text">购物车</div>
  </tabbarItem>
  <tabbarItem path="/profile">
      <img slot="item-icon" src="~assets/img/003.png" alt="">
      <img slot="item-icon-active" src="~assets/img/004-1.png" alt="">
    <div slot="item-text">我的</div>
  </tabbarItem>
</tabbar>
</template>

<script>
import tabbar from "../../common/tabbar/tabbar"
import tabbarItem from "../../common/tabbar/tabbarItem"
export default {
name:"mainTabbar",
components: {
  tabbar,
  tabbarItem
}
}
</script>

<style>

</style>