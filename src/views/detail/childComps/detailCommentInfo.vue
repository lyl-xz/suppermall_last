<template>
  <div v-if="Object.keys(commentInfo).length !==0" class="comment-info">
   <div class="title">
     <span class="title-text">用户评价</span>
     <span class="more" >更多</span>
   </div>
   <div class="username">
  <img :src="commentInfo.user.avatar" alt="">
  <div class="uname">{{commentInfo.user.uname}}</div>
   </div>
   <div class="content-text">{{commentInfo.content}}</div>
   <div class="bottom-text">
     <span class="date">{{commentInfo.created | ShowDate}}</span>
    <span>{{commentInfo.style}}</span>
   </div>
   <div class="imgInfo">
     <img v-for="(item,index) in commentInfo.images" :key="index" :src="item" alt="">
     </div>
  </div>
</template>

<script>
import {formatDate} from "components/common/utils"

export default {
name:"detailCommentInfo",
props:{
  commentInfo:{
    type:Object,
    default(){
      return {}
    }
  }
},
filters: {
  ShowDate(value){
    //1.现将时间戳转成date对象
    const date = new Date(value*1000)
    //2.将date进行格式化
    return formatDate(date)
  }
}
}
</script>     

<style scoped>
.comment-info{
   padding: 10px 10px 25px 10px;
  border-bottom: 5px solid #f2f5f8;
}
.title{
  display: flex;
  border-bottom: 1px solid #f2f5f8;
  justify-content: space-between;
}
.title span{
  margin-bottom:10px ;
  font-size:14px ;
}
.username{
  display: flex;
  margin-top:10px ;
}
.username img{
width: 30px;
height: 30px;
border-radius:15px ;
}
.uname{
  font: bold 14px/30px 'Microsoft Yahei';
   height: 30px;
   line-height: 30px;
   padding-left: 5px;
}
.content-text{
  margin-top:10px ;
  font-size: 13px;
}
.bottom-text{
  margin-top:7px ;
}
.bottom-text span{
  font-size:12px ;
}
.imgInfo{
  margin-top:10px ;
}
.imgInfo img{
  width: 100px;
  height: 100px;
  margin-left:7px ;
}
</style>