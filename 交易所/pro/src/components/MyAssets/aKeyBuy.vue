<style lang=less>
@import "../../assets/public.less";
@import "./aKeyBuy.less";
</style>
    <template>
  <div class="aKeyBuy" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="oneKey_title">
      <div class="title">
        <h2>{{$t('zeusBi.cb[1]')}}</h2>
        <h6>{{$t('zeusBi.cb[2]')}}</h6>
      </div>
    </div>
    <div class="oneKey_form">
      <el-form :model="buyData" label-position="top" ref="form" label-width="100px" class="from">
        <el-form-item
          :label="$t('zeusBi.cb[8]')"
          prop="total_price"
          :rules="[{ required: true, message: $t('zeusBi.cb[9]'), trigger: 'blur' },]"
          style="marginBottom: 60px"
        >
          <el-input
            class="iptPrice"
            type="age"
            :placeholder="placeHolder"
            v-model="buyData.total_price"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="btn-submit"
            type="primary"
            @click="submitForm('form')"
          >{{$t('buy.header[2]')}}</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tip">
      <h1>{{$t('zeusBi.news[2]')}}</h1>
      <p>{{$t('zeusBi.news[3]')}}</p>
      <p>{{$t('zeusBi.news[4]')}}</p>
    </div>
    <div v-html="htmlCode" id="fromsubmit" style="display:none;"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tpwd: '',
      min: '100',
      loading: false,
      dialogVisible: false,
      buyData: {
        total_price: ''
      },
      requestData1: [],
      htmlCode: '',
      fullscreenLoading: false,
      resStatue: '',
      placeHolder: ''
    }
  },
  created () {
    // 获取订单信息
    this.$http
      .post(this.$http.one_buy, {})
      .then(r => {
        if (r.data.status == '200') {
          this.min = r.data.data.buy_min
          this.placeHolder =
            this.$t('zeusBi.news[0]') +
            r.data.data.buy_min +
            this.$t('zeusBi.news[1]')
        } else if (r.data.status == '0') {
          // this.$router.go(-1)
          this.resStatue = r.data.status
          this.placeHolder = this.$t('zeusBi.news[5]')
          console.log(this.placeHolder)
          this.$public.msg(r.data.msg, 'error', this)
        } else {
          this.$public.msg(r.data.msg, 'error', this)
        }
      })
      .catch(r => {
        console.log(r)
      })
  },
  watch: {
    'buyData.total_price' (n, o) {
      if (isNaN(Number(n))) {
        this.buyData.total_price = o
        return false
      }
      if (n.toString().indexOf('.') != -1 && n.split('.')[1].length > 2) {
        this.$public.msg(this.$t('cbanner.news[21]'), 'warning', this)
        this.buyData.num = o
        return false
      }
    }
  },
  methods: {
    submitForm (form) {
      var _this = this
      if (_this.resStatue == '0') {
        _this.$public.msg(_this.$t('cbanner.news[23]'), 'error', _this)
        return false
      }
      _this.$refs[form].validate(valid => {
        if (valid) {
          if (Number(_this.min) > Number(_this.buyData.total_price)) {
            _this.$public.msg(_this.$t('cbanner.news[22]'), 'error', _this)
            return false
          }
          _this.loading = true
          _this.$http
            .post(_this.$http.goldEntry, {
              amount: Number(_this.buyData.total_price)
            })
            .then(r => {
              _this.loading = false
              if (r.data.status == '200') {
                _this.fullscreenLoading = true
                _this.htmlCode = r.data.data.info
                window.setTimeout(function () {
                  document.pay.submit()
                }, 100)
              } else {
                _this.$public.msg(r.data.msg, 'error', this)
              }
            })
            .catch(r => {
              _this.loading = false
            })
        }
      })
    }
  }
}
</script>
