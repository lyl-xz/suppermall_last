import {debounce} from "./utils"
import backTop from "components/content/backTop/backTop"

//创建一个混入对象
export const itemListenerMinx = {
  data () {
    return {
      itemImgListener:"",
      newRefresh:""
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () => {
      this.newRefresh()
    }
    //监听图片加载完成
    this.$bus.$on('ItemImageload',this.itemImgListener)
    console.log("我是混入");
  }
}
export const backTopmenu = {
  components: {
    backTop
  },
  data(){
    return {
      isshow:false
    }
  },
  methods: {
    backClick(){
      //父访问子,500ms回到顶部
    this.$refs.scroll.scrollTo(0,0,500)
    }
  }
}