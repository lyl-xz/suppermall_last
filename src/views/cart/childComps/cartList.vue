<template>
  <div class="cart-list" >
     <cartlistItem  v-for="(item,index) in cartList" :key="index" :item-info="item"/> 
  </div>
</template>

<script>
import {mapGetters} from "vuex"

import cartlistItem from './cartlistItem'

export default {
name:"cartList",
components: {
   cartlistItem 
},
computed: {
  ...mapGetters(['cartList'])
},

}
</script>
<style scoped>


</style>