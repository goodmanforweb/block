<style lang=less>
@import "../../assets/public.less";
@import "./aKeySell.less";
</style>
<template>
  <div class="aKeySell">
    <div class="oneKey_title">
      <div class="title">
        <h2>{{$t('zeusBi.cb[13]')}}</h2>
        <h6>{{$t('zeusBi.cb[14]')}}</h6>
      </div>
      <div class="info">
        <div class="item">
          <h6>{{$t('zeusBi.cb[15]')}}</h6>
          <p>
            {{$t('zeusBi.cb[4]')}}:
            <span class="green">￥{{Data.usdt_rmb}}</span>
          </p>
        </div>
        <div class="river"></div>
        <!-- 认证卖家 -->
        <!-- <div class="item">
          <h6>{{$t('zeusBi.cb[5]')}}</h6>
          <p>
            {{Data.shop_num}} {{$t('zeusBi.cb[6]')}}:
            <span class="saveYourLife">{{$t('zeusBi.cb[7]')}}</span>
          </p>
        </div> -->
      </div>
    </div>
    <div class="oneKey_form">
      <el-form :model="buyData" label-position="top" ref="form" label-width="100px" class="from">
        <el-form-item
          :label="$t('zeusBi.akey[0]')"
          prop="num"
          :rules="[{ required: true, message: $t('tiBit.main[17]'), trigger: 'blur' },]"
        >
          <span class="can_use">{{$t('tiBit.news[0]')}}{{Data.usable}}USDT</span>
          <el-input
            class="iptPrice"
            type="age"
            :placeholder="$t('tiBit.main[17]')"
            v-model="buyData.num"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('tiBit.main[16]') + ' (CNY)'" prop="total_num">
          <el-input class="iptNums" type="age" :disabled="true" v-model="money" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('tiBit.news[1]')">
          <el-row :gutter="20" style="marginBottom: 10px">
            <el-col :span="8">
              <el-input
                class="bank"
                type="text"
                v-model="buyData.bank_name"
                auto-complete="off"
                :placeholder="$t('tiBit.news[2]')"
              >
                <template slot="prepend">{{$t('tiBit.news[3]')}}</template>
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-input
                class="bank"
                type="text"
                v-model="buyData.username"
                auto-complete="off"
                :placeholder="$t('tiBit.news[4]')"
              >
                <template slot="prepend">{{$t('tiBit.news[5]')}}</template>
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-input
                class="bank"
                type="text"
                v-model="buyData.bank_open"
                auto-complete="off"
                :placeholder="$t('tiBit.news[6]')"
              >
                <template slot="prepend">{{$t('tiBit.news[7]')}}</template>
              </el-input>
            </el-col>
          </el-row>
          <el-input
            class="bank"
            type="text"
            v-model="buyData.bank_num"
            auto-complete="off"
            :placeholder="$t('tiBit.news[8]')"
          >
            <template slot="prepend">{{$t('tiBit.news[9]')}}</template>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('tiBit.news[10]')" prop="total_num">
          <el-input
            class="zijin_psw"
            type="password"
            v-model="buyData.tpwd"
            auto-complete="off"
            :placeholder="$t('tiBit.news[11]')"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            :loading="loading"
            class="btn-submit"
            type="primary"
            @click="submitData('form')"
          >{{$t('buy.header[4]')}}</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="oneKey_table">
      <h2>{{$t('cbanner.news[0]')}}</h2>
      <el-table :data="requestData" style="width: 100%">
        <template slot="empty">{{$t("cbanner.main[9]")}}</template>
        <el-table-column prop="addtime" :label="$t('cbanner.news[1]')" width="170">
          <template slot-scope="scope">
            <div>{{ $public.timestampToTime(scope.row.addtime) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="num" :label="$t('cbanner.news[2]')"></el-table-column>
        <el-table-column prop="username" :label="$t('cbanner.news[3]')"></el-table-column>
        <el-table-column prop="bank_name" :label="$t('cbanner.news[4]')"></el-table-column>
        <el-table-column prop="bank_open" :label="$t('cbanner.news[5]')"></el-table-column>
        <el-table-column prop="checktime" :label="$t('cbanner.news[6]')" width="170">
          <template slot-scope="scope">
            <div v-if="scope.row.checktime == '0'">-</div>
            <div v-else>{{ $public.timestampToTime(scope.row.checktime) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="state" :label="$t('cbanner.news[7]')">
          <template slot-scope="scope">
            <div v-if="scope.row.state == 1">{{$t('cbanner.news[8]')}}</div>
            <div v-if="scope.row.state == 2">{{$t('cbanner.news[9]')}}</div>
            <div v-if="scope.row.state == 3">{{$t('cbanner.news[10]')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="reason" :label="$t('cbanner.news[11]')" width="250">
          <template slot-scope="scope">
            <div v-if="scope.row.reason == null">-</div>
            <div v-else>{{scope.row.reason}}</div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="requestData.length"
        layout="prev, pager, next"
        :total="Number(total)"
        :page-size="5"
        :current-page="Number(page)"
        @current-change="changePage"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      Data: {},
      money: '',
      buyData: {
        num: '',
        bank_name: '',
        username: '',
        bank_open: '',
        bank_num: '',
        tpwd: ''
      },
      requestData: [],
      page: 1,
      total: '',
      size: 5
    }
  },
  watch: {
    'buyData.num' (n, o) {
      if (isNaN(Number(n))) {
        this.buyData.num = o
        return false
      }
      if (Number(n) > Number(this.Data.usable)) {
        this.$public.msg(this.$t('cbanner.news[12]'), 'warning', this)
        this.buyData.num = o
        return false
      }
      if (n.toString().indexOf('.') != -1 && n.split('.')[1].length > 4) {
        this.$public.msg(this.$t('cbanner.news[13]'), 'warning', this)
        this.buyData.num = o
        return false
      }
      this.money = Number(
        this.$public.Multiplication(
          Number(this.buyData.num),
          Number(this.Data.usdt_rmb)
        )
      ).toFixed(2)
    }
  },
  created () {
    this.getInfor()
    this.getList()
  },
  methods: {
    getInfor () {
      this.$http
        .post(this.$http.one_sell, {})
        .then(r => {
          if (r.data.status == '200') {
            this.Data = r.data.data
          } else {
            this.$public.msg(r.data.msg, 'error', this)
          }
        })
        .catch(r => {
          console.log(r)
        })
    },
    getList () {
      var _this = this
      _this.$http
        .post(_this.$http.sell_list, {
          p: _this.page,
          size: _this.size
        })
        .then(r => {
          if (r.data.status == '200') {
            _this.total = r.data.data.count
            _this.requestData = r.data.data.list
          } else {
            _this.$public.msg(r.data.msg, 'error', _this)
          }
        })
        .catch(r => {
          console.log(r)
        })
    },
    changePage (val) {
      this.page = val
      this.getList()
    },
    submitData (form) {
      var _this = this
      _this.$refs[form].validate(valid => {
        if (valid) {
          if (_this.buyData.bank_name == '') {
            _this.$public.msg(_this.$t('cbanner.news[14]'), 'error', _this)
            return false
          }
          if (_this.buyData.username == '') {
            _this.$public.msg(_this.$t('cbanner.news[15]'), 'error', _this)
            return false
          }
          if (_this.buyData.bank_open == '') {
            _this.$public.msg(_this.$t('cbanner.news[16]'), 'error', _this)
            return false
          }
          if (_this.buyData.bank_num == '') {
            _this.$public.msg(_this.$t('cbanner.news[17]'), 'error', _this)
            return false
          }
          if (!_this.$public.bank_car(_this.buyData.bank_num)) {
            _this.$public.msg(_this.$t('cbanner.news[18]'), 'error', _this)
            return false
          }
          if (_this.buyData.tpwd == '') {
            _this.$public.msg(_this.$t('cbanner.news[19]'), 'error', _this)
            return false
          }

          _this.loading = true
          _this.$http
            .post(_this.$http.do_sell, _this.buyData)
            .then(r => {
              _this.loading = false
              if (r.data.status == '200') {
                _this.$public.msg(
                  _this.$t('cbanner.news[20]'),
                  'success',
                  _this
                )
                _this.buyData = {
                  num: '',
                  bank_name: '',
                  username: '',
                  bank_open: '',
                  bank_num: '',
                  tpwd: ''
                }
                _this.page = 1
                _this.getList()
              } else {
                _this.$public.msg(r.data.msg, 'error', _this)
              }
            })
            .catch(r => {
              console.log(r)
            })
        }
      })
    }
  }
}
</script>
