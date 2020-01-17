<style lang="less">
@import "../../../assets/public.less";
@import "./exchangeCoin.less";
.colorexchange {
  color: #337cde;
  cursor: pointer;
}
</style>
<template>
  <div class="exchangeCoin">
    <div class="wrap">
      <table></table>
      <h3 class="exchange_title">{{$t('zeusBi.dh[0]')}} >{{$t('exchangeCoin.main1[0]')}}</h3>
      <!-- 兑换 -->
      <section class="exchangeCont">
        <p class="title">
        </p>
        <el-form :label-position="labelPosition" label-width="80px" :model="sendData" class="exchangeForm">
          <div class="foom">
            <el-form-item class="log" :label="$t('exchangeCoin.tip[0]')">
              <el-input type="text" v-model="$route.query.pname"></el-input>
              <!-- <el-select v-model="value" label="dddd" placeholder class="coinType" @change="ischange(value)">
                <el-option v-for="(v,index) in formLabelAlign" :label="v.ex_name" :value="v.ex_name" :key="index" ></el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item class="lg" :label="$t('exchangeCoin.main3[0]')">
              <el-select v-model="value" placeholder class="coinType" @change="ischange(value)">
                <el-option v-for="(v,index) in formLabelAlign" :label="v.ex_name" :value="v.ex_name" :key="index" ></el-option>
              </el-select>
            </el-form-item>
            <div style="clear: both"></div>
          </div>
          <div>
            <el-form-item class="numleft" :label="$t('exchangeCoin.main3[3]')">
              <el-input v-model="sendData.num" type="num" :placeholder="$t('zeusBi.dh[3]')"></el-input>
              <p>{{$route.query.pname}}</p>
              <!-- <p class="ziChan">{{$t('exchangeCoin.main3[0]')}}：{{(sendData.num * ex_rate).toFixed(8)}} {{value}}</p> -->
            </el-form-item>
            <div class="numright">
              <span>{{$t('zeusBi.dh[1]')}}</span>
            </div>
          </div>


          <el-form-item :label="$t('exchangeCoin.tip[1]')">
            <el-input type="num" v-model="(sendData.num * ex_rate).toFixed(8)"></el-input>
            <p>{{value}}</p>
          </el-form-item>
          <el-form-item :label="$t('zeusBi.dh[2]')">
            <el-input type="password" v-model="sendData.tpwd" :placeholder="$t('exchangeCoin.Newaddition[0]')"></el-input>
          </el-form-item>
          <el-form-item class="clearfix">
            <el-button type="primary" class="exchangeBtn" @click="exchangeBtn" :loading="loading">{{$t('exchangeCoin.main1[0]')}}</el-button>
          </el-form-item>
        </el-form>
      </section>
      <div class="historyList">
        <h3 class="exchange_title">{{$t('exchangeCoin.tip[3]')}}</h3>
        <div class="listWarp">
          <template>
            <el-table :data="coinList" style="width: 100%">
              <template slot="empty">
                {{$t("cbanner.main[9]")}}
              </template>
							<el-table-column prop="pname" :label="$t('exchangeCoin.tip[0]')" width="200"></el-table-column>
							<el-table-column prop="expname" :label="$t('exchangeCoin.tip[6]')" width="200" align="center"></el-table-column>
              <el-table-column prop="num" :label="$t('exchangeCoin.main5[2]')" width="320" align="center"></el-table-column>
              <el-table-column prop="exnum" :label="$t('exchangeCoin.tip[4]')" width="230" align="center"></el-table-column>
							<el-table-column prop="addtime" :label="$t('exchangeCoin.tip[5]')" width="330" align="right">
                <template slot-scope="scope">
                  <div>{{ $public.timestampToTime(scope.row.addtime) }}</div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      value: "",
      labelPosition: "top",
      ex_rate: "", //汇率
      formLabelAlign: [],
      coinList: [],
      sendData: {
        num: "", //要兑换的数量
        ex_coin: "", //要兑换成的币种标识
        coin: "", //币种标识
        tpwd: "" //交易密码
      }
    };
  },
  methods: {
    //币种的兑换列表
    getCodeInfo() {
      var _this = this;
      _this.$http.get(_this.$http.thisCoinList, {params: {coin: _this.sendData.coin}}).then(res => {
          _this.formLabelAlign = res.data.data;
          _this.value = res.data.data[0].ex_name;
          _this.ex_rate = res.data.data[0].ex_rate;
          _this.sendData.ex_coin = res.data.data[0].ex_coin;
        });
    },
    //下拉列表发生变化时
    ischange(val) {
      var _this = this;
      for (var i = 0; i < _this.formLabelAlign.length; i++) {
        if (val == _this.formLabelAlign[i].ex_name) {
          _this.ex_rate = _this.formLabelAlign[i].ex_rate;
          _this.sendData.ex_coin = _this.formLabelAlign[i].ex_coin;    
        }
      }
    },
    //点击兑换执行函数
    exchangeBtn() {
      var _this = this;
      if (!_this.$public.Ints(_this.sendData.num)) {
        _this.$public.msg(_this.$t("exchangeCoin.main4[0]"),"warning",_this);
        return false;
      } else if (_this.sendData.num.toString().indexOf(".") != -1 && _this.sendData.num.toString().split(".")[1].length >4) {
        _this.$public.msg(_this.$t("exchangeCoin.main4[2]"),"warning",_this); //最大兑换数量不能大于可用余额
        return false;
      } else if (Number(_this.sendData.num) > Number(_this.$route.query.usable)) {
        _this.$public.msg(_this.$t("exchangeCoin.main4[1]"),"warning",_this ); //最大兑换数量不能大于可用余额
        return false;
      }
      // _this.loading = true;
      _this.$http.post(_this.$http.exchange, _this.sendData).then(function(response) {
          _this.loading = false;
          if (response.data.status == "200") {
            _this.$public.msg(response.data.msg, "success", _this);
            setTimeout(function() {_this.$public.go("MyAssets", 0, _this);}, 600);
          } else {
            _this.$public.msg(response.data.msg, "warning", _this);
          }
        })
        .catch(function(error) {});
    },
    //获得兑换记录列表
    getList() {
      var _this = this;
      _this.$http.post(_this.$http.ex_list, {}).then(function(response) {
          if (response.data.status == "200") {
            _this.coinList = response.data.data.list;
          }
        }).catch(function(error) {});
    }
  },
  created: function() {
    window.scrollTo(0, 0); //回到顶部
    var _this = this;
    // console.log(_this.$route.query);
    _this.sendData.coin = _this.$route.query.mark;
    _this.getCodeInfo();
    _this.getList();
  }
};
</script>