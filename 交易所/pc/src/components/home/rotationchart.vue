<template lang="html">
  <!--{{banner}}-->
  <section class="rotation_chart">
    <el-carousel arrow="never" height="565px">
      <el-carousel-item v-for="(item,index) in banner" :key="index">
          <img :src="$http.bases+item.path" @click="utr_t(item.url)">
      </el-carousel-item>
    </el-carousel>
  </section>
</template>
<script>
  export default {
    props:['banner'],
    data() {
      return {

      }
    },

    methods: {
      utr_t: function(e) {
        var _this = this;
        console.log(e);
        window.location.href= e;
      }
    },

  }
</script>
<style lang='less'>
  .el-carousel{
    img{
      width:100%;
      height:100%;
      cursor: pointer;
    }
  }
  .el-carousel__indicator{
    button{
      width:14px;
      height:6px;
      border-radius:10px;
      background:#ffffff !important;
    }
  }
  .is-active{
    button{
      width:24px;
      height:6px;
      border-radius:10px;
      background:#87aaff !important;
    }
  }

</style>
