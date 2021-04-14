<template>
<div class="cart">
  <!-- 导航 -->
  <navbar class="nav-bar">
    <div slot="center">购物车({{length}})</div>
    </navbar>
  <scroll class="content" ref="scroll">
     <!-- 商品列表 -->
    <cart-list/>
      </scroll>
      <!-- 底部汇总 -->
    <cart-bottom-bar/>
</div>
  
</template>
<script>
import scroll from 'components/common/scroll/scroll'
import navbar from 'components/common/navbar/navbar'
import {mapGetters} from "vuex"
import cartList from './childComps/cartList'
import cartBottomBar from './childComps/cartBottomBar'

export default {
name:"cart",
components: {
    scroll,
  navbar,
  cartList,
 cartBottomBar
},
computed: {
  //mapGetters辅助函数仅仅是将store中的getter映射到局部计算属性
  
  //两种语法 1.使用对象展开运算符getter混入computed对象中
  //...mapGetters(['cartListLength','cartList' ])
  //也可以自定义名字映射方法，使用对象的形式
  ...mapGetters({length:'cartListLength'
  })
  },
  //激活网页的时候刷新
activated () {
  this.$refs.scroll.refresh()
}
}

</script>

<style scoped>
.cart{
  height: 100vh;
}
.content{
  height:calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
.nav-bar{
  background-color:var(--color-tint);
  color: #fff;
}

</style>