<style scoped lang="less">
  .copyright{
    div{
      color: #ffffff;
      font-size: 20px;
    }
  }
</style>
<template lang="html">
  <div :class="ctrlBg?'footer trans':'footer'">
  <!-- <div :class="class"> -->
    <div class="footerdiv">
      <section class="material_main">
        <ul class="share_box">
          <li class="share_list">
            <h2>{{$t("foter.mian[0]")}}</h2>
            <router-link :to="{ path: '/help', query: { type: '1' }}">
              {{$t("foter.mian[4]")}}
            </router-link>
            <router-link :to="{ path: '/help', query: { type: '2' }}">
              {{$t("foter.mian[8]")}}
            </router-link>
            <router-link :to="{ path: '/help', query: { type: '3' }}">
            <!-- 法律声明 -->
              {{$t("foter.mian[14]")}}
            </router-link>
          </li>
          <li class="share_list">
            <h2>{{$t("foter.mian[1]")}}</h2>
            <a :href="$http.appDownload" target="_blank">
              {{$t("foter.mian[5]")}}
            </a>
            <router-link :to="{ path: '/help', query: { type: '4' }}">
              <!-- 交易规则 -->
              {{$t("foter.mian[16]")}}
            </router-link>
            <router-link :to="{ path: '/zixunList', query: { zxtype: '2' }}">
              <!-- 交易指南 -->
              {{$t("foter.mian[17]")}}
            </router-link>
          </li>
          <li class="share_list">
            <h2>{{$t("foter.mian[2]")}}</h2>
            <router-link :to="{ path: '/help', query: { type: '5' }}">
              {{$t("foter.mian[6]")}}
            </router-link>
            <router-link :to="{ path: '/help', query: { type: '6' }}">
              {{$t("foter.mian[10]")}}
            </router-link>
          </li>
           <li class="share_list">
            <h2>{{$t("foter.mian[3]")}}</h2>
            <a href="javascript:;" target="_blank">
              {{$t("foter.mian[7]")}}：{{about_us.email}}
            </a>

            <div class="iconWarp">
              <a href="javasccript:;">
                <img  src="../../assets/img/f1.png"/>
              </a>
              <a href="javascript:;">
                <img  src="../../assets/img/f2.png"/>
              </a>
              <a href="javascript:;">
                  <img  src="../../assets/img/f3.png"/>
              </a>
            </div>
          </li>
        </ul>
      </section>
    </div>
    <div class="copyright">
      <!-- <div><img src="../../assets/img/h_logo.png" alt=""></div> -->
      <div>Zeus  {{$t('footer.main[11]')}}</div>
      <p>©2017 - 2020 Zeus All Rights Reserved</p>
    </div> 
  </div>
</template>
<script>
export default {
  props:['ctrlBg'],
  data() {
    return {
      class:['footer'],
        about_us:"",
    }
  },
  watch: {},
  methods: {
    aboutusData(){
        let _this = this;
        $.post(_this.$http.public_data,{},function(response){
            _this.about_us = response.data;
        });
    },
    upload(){
      //  this.$public.msg("尽请期待", 'warning', this);
    }
  },
  created() {

    this.aboutusData();
  },
  mounted() {
    if(this.$route.path=="/daywak"){
        // $('.footer').addClass('trans')
    }
  },
  watch: {
    "$route"(n,o) {
    //   if(n.path=="/daywak"){
    //     $('.footer').addClass('trans')
    // }
    }
  },
}

</script>
