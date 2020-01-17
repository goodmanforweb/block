<style lang="less">
    @import url('./bInformation.less');
</style>

<template lang="html">
<div class='coin-type'>   
    <div class="coin-type bgcolormain">
        <p class="coin-type-jianjie">{{$t("index.CurrencyData[0]")}}</p>
        <div class="coin-content">
            <div class="coin-content-l">
                <h3>{{marketPurchase.code?marketPurchase.code.split("_")[0]:'--'}}</h3>
                <p class="name_c">{{marketPurchase.code?marketPurchase.code.split("_")[0]:'--'}}</p>
                <h6>{{$t("index.CurrencyData[1]")}}</h6>
                <p class="intro_coin" v-if="!CodeIntro">--</p>
                <p class="intro_coin" v-else>{{CodeIntro.memo}}</p>
                
            </div>
            <div class="coin-content-r">
                <ul>
                    <li class="coin-content-list">
                        <span class="coin-content-list-name">{{$t("index.CurrencyData[2]")}}</span>
                        <span class="coin-content-list-con" v-if="CodeIntro">{{CodeIntro.fxtime}}</span>
                        <span class="coin-content-list-con" v-else>--</span>
                    </li>
                    <li class="coin-content-list">
                        <span class="coin-content-list-con" v-if="!CodeIntro">{{CodeIntro.fxnum}}万</span>
                        <span class="coin-content-list-name" v-else>{{$t("index.CurrencyData[3]")}}</span>
                    </li>
                    <li class="coin-content-list">
                        <span class="coin-content-list-name">{{$t("index.CurrencyData[4]")}}</span>
                        <span class="coin-content-list-con" v-if="CodeIntro">{{CodeIntro.fxnum}}万</span>
                        <span class="coin-content-list-con" v-else>--</span>
                    </li>
                    <li class="coin-content-list">
                        <span class="coin-content-list-name">{{$t("index.CurrencyData[5]")}}</span>
                        <span class="coin-content-list-con" v-if="CodeIntro">{{CodeIntro.fxprice}}</span>
                        <span class="coin-content-list-con" v-else>--</span>
                    </li>
                    <li class="coin-content-list">
                        <span class="coin-content-list-name">{{$t("index.CurrencyData[6]")}}</span>
                        <!-- <span class="coin-content-list-con">{{CodeIntro.fxbook}}</span> -->
                    </li>
                    <li class="coin-content-list">
                        <span class="coin-content-list-name coin-content-list-nametit"
                            :title="CodeIntro.fxbook" v-if="CodeIntro">{{CodeIntro.fxbook}}</span>
                              <span class="coin-content-list-name coin-content-list-nametit" v-else>--</span>
                        <!-- <span class="coin-content-list-con">{{CodeIntro.fxbook}}</span> -->
                    </li>
                    <li class="coin-content-list">
                        <span class="coin-content-list-name">{{$t("index.CurrencyData[7]")}}</span>
                        <span class="coin-content-list-con" v-if="CodeIntro">{{CodeIntro.fxweb}}</span>
                        <span class="coin-content-list-con" v-else>--</span>
                    </li>
                
                </ul>
            </div>
        </div>
    </div>
</div>
	
</template>
<script>
export default {
props: ["marketPurchase"],
  data() {
    return {
        CodeIntro:{}
    };
  },
  watch: {
      'marketPurchase':function(){
          this.getcodeinfo();
      }
  },
  methods: {
    // 币种资料
    getcodeinfo() {
      var _this = this;
      _this.$http
        .get(_this.$http.get_info, {
          params: { code:_this.marketPurchase.code}
        })
        .then(function(response) {
          if (response.data.status == "200") {
              _this.CodeIntro = response.data.data;
          }
        })
        .catch(function(error) {});
    }
  },
  // 路由改变时
  beforeRouteLeave(to, from, next) {},
  mounted: function() {
      this.getcodeinfo();
  },
  components: {}
};
</script>