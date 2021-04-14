<template>
  <div id="app">
    <!-- 加keep-alive路由缓存就不会销毁,exclude排除在外 -->
    <keep-alive exclude="detail"><router-view></router-view></keep-alive>
   <mainTabbar></mainTabbar>
  </div>
</template>

<script>
import mainTabbar from "./components/content/mainTabbar/mainTabbar"
export default {
  name: 'App',
  components: {
    mainTabbar
  }
}
</script>

<style>
@import "./assets/css/base.css";

</style>
