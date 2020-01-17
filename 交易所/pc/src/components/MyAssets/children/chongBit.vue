<style lang=less>
@import "../../../assets/public.less";
@import "./chongBit.less";
</style>
<template>
  <div class="chong_bit_wrapper">
    <div class="chong_bit_container">
      <div class="chong_bit_header">
        <div class="title">
          <span>{{$t('chongBit.main[0]')}} >{{$t('BITPUIBi.cb[0]')}}</span>
          <span @click="$router.push('/aKeyBuy')" class="right">{{$t('BITPUIBi.cb[1]')}}</span>
        </div>
      </div>
      <div class="chong_top">
        <div class="right_title">{{pname}} {{$t('chongBit.main[1]')}}</div>
        <div class="chong_bit_block">
          <p class="public_font">{{$t('chongBit.main[2]')}}</p>
          <div class="address">
            <input
              class="left"
              :value="requestData.url"
              id="addInput"
              :placeholder="$t('chongBit.main[3]')"
            />
            <p class="right">
              <span @click="copy('addInput')">{{$t('chongBit.main[4]')}}</span>
              <el-button type="text" @click="open5">{{$t('chongBit.main[5]')}}</el-button>
            </p>
          </div>
          <p class="public_font seeRecord">
            {{$t('chongBit.main[6]')}}
            <a
              @click="seeRecord"
              style="cursor: pointer;"
            >{{$t('chongBit.main[7]')}}</a>
            {{$t('chongBit.main[8]')}}
          </p>

          <p class="public_font">{{$t('chongBit.main[9]')}}:</p>
          <ul class="list">
            <li>{{$t('chongBit.main[10]')}}{{pname}}{{$t('chongBit.main[11]')}}</li>
            <li>{{$t('chongBit.main[12]')}}</li>
            <li>{{$t('chongBit.main[13]')}}</li>
            <li>{{$t('chongBit.main[14]')}}</li>
          </ul>
        </div>
      </div>
    </div>
    <FooTer></FooTer>
  </div>
</template>
<script>
// import Header from "../../header/heaer.vue";
// import Footer from "../../footer/footer.vue";
export default {
  data () {
    return {
      requestData: {},
      pid: '', // 页面传值
      pname: ''
    }
  },
  methods: {
    seeRecord () {
      var _this = this
      _this.$router.push({ path: '/moneyRecord', query: { pid: _this.pid } })
    },
    requestPublic: function () {
      // 数据请求
      var _this = this
      var mobile = sessionStorage.getItem('mobile')
      _this.$http
        .get(_this.$http.goPay, {
          params: {
            pid: _this.pid
          }
        })
        .then(res => {
          _this.requestData = res.data.data
        })
    },
    copy: function (para) {
      // 复制函数
      var _this = this
      var ele = document.getElementById(para)
      ele.select()
      document.execCommand('Copy')
      _this.$public.msg(_this.$t('chongBit.main[15]'), 'success', _this)
    },
    addFocus: function (para) {
      var _this = this
      var ele = document.getElementById(para)
      ele.setAttribute('disabled', 'disabled')
    },
    addOut: function (para) {
      var _this = this
      var ele = document.getElementById(para)
      ele.removeAttribute('disabled')
    },
    open5: function () {
      // 提示二维码函数
      var urls = this.$http.bases
      this.$alert(
        '<div class="cbCodeDiv"><img class="codeImg" src="' +
          urls +
          this.requestData.qrc +
          '" alt="" /></div>',
        this.$t('chongBit.main[5]'),
        {
          dangerouslyUseHTMLString: true,
          callback: action => {}
        }
      )
    }
  },
  created: function () {
    var _this = this
    _this.pid = _this.$route.query.pid
    _this.pname = _this.$route.query.pname
    _this.requestPublic()
  }
}
</script>
