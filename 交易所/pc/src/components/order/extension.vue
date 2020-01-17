<style lang=less>
@import "../../assets/public.less";
@import "./extension.less";
</style>
  <template lang="html">
    <div class="extension_body">
        <div class="extension_banner">
            <!-- <img src="../../assets/img/pro-banner.png" alt=""> -->
            <div>
              <h5>{{$t('cbanner.main[7]')}}</h5>
              <p>{{$t('cbanner.main[8]')}}</p>
            </div>
        </div>
        <div class="bgbg">
          <div class="extension_top">
              <ul class="top_my">
                  <li>
                    <!-- <img src="../../assets/img/pro-2.png" alt=""> -->
                    <div>
                      <span class="two">{{user.ttl}}</span>
                      <span class="one">{{$t('extension.tip[0]')}}</span>
                    </div>
                  </li>
                  <li>
                    <!-- <img src="../../assets/img/pro-1.png" alt=""> -->
                    <div>
                      <span class="two">{{user.force?user.force:'0'}}</span>
                      <span class="one">{{$t('BITPUITuiguang.main[0]')}}</span>
                    </div>
                  </li>
              </ul>
              <div class="code">
                  <div class="code_left">
                      <img :src="codeData.qrc" alt="">
                      <div>
                        <p class="p_1">{{$t('extension.tip[2]')}}</p>
                        <p class="p_2">{{$t('extension.tip[3]')}}</p>
                        <a href="javascript:;" @click="modle = true;">{{$t('BITPUITuiguang.main[1]')}}</a>
                      </div>
                  </div>
                  <div class="code_right">
                      <h5>{{$t('extension.tip[4]')}}</h5>
                      <!-- <p id="addInput">{{codeData.codeUrl}}</p> -->
                      <el-input auto-complete="off" id="addInput" v-model="codeData.url" readonly></el-input>
                      <span @click="copy('addInput')">{{$t('extension.tip[5]')}}</span>
                  </div>
              </div>
          </div>
        </div>
        <!-- 收到三条数据时 -->
        <div class="middle" v-if="paiming.length==3">
          <table></table>
          <div class="mTop"><span>{{$t('BITPUITuiguang.main[2]')}}</span></div>
          <div class="mBottom">
            <div class="d_1">
              <div>
                <p class="p_1" >{{paiming[2].name}}</p>
                <p class="p_2">{{$t('BITPUITuiguang.paiming[0]')}}</p>
                <p class="p_3">{{paiming[2].money}}</span></p>
              </div>
            </div>
            <div class="d_2">
              <div>
                <p class="p_1" >{{paiming[0].name}}</p>
                <p class="p_2">{{$t('BITPUITuiguang.paiming[0]')}}</p>
                <p class="p_3">{{paiming[0].money}}<span>USDT</span></p>
              </div>
            </div>
            <div class="d_3">
              <div>
                <p class="p_1">{{paiming[1].name}}</p>
                <p class="p_2">{{$t('BITPUITuiguang.paiming[0]')}}</p>
                <p class="p_3">{{paiming[1].money}}<span>USDT</span></p>
              </div>
            </div>
          </div>
        </div>
  <!-- 收到二条数据时 -->
        <div class="middle" v-else-if="paiming.length==2">
          <table></table>
          <div class="mTop"><span>{{$t('BITPUITuiguang.main[2]')}}</span></div>
          <div class="mBottom">
            <div class="d_1">
              <div>
                <p class="p_1" >{{$t('BITPUITuiguang.paiming[1]')}}</p>
                <p class="p_2">{{$t('BITPUITuiguang.paiming[0]')}}</p>
                <p class="p_3">0</span>USDT</p>
              </div>
            </div>
            <div class="d_2">
              <div>
                <p class="p_1" >{{paiming[0].name}}</p>
                <p class="p_2">{{$t('BITPUITuiguang.paiming[0]')}}</p>
                <p class="p_3">{{paiming[0].money}}<span>USDT</span></p>
              </div>
            </div>
            <div class="d_3">
              <div>
                <p class="p_1">{{paiming[1].name}}</p>
                <p class="p_2">{{$t('BITPUITuiguang.paiming[0]')}}</p>
                <p class="p_3">{{paiming[1].money}}<span>USDT</span></p>
              </div>
            </div>
          </div>
        </div>
<!-- 收到一条数据时 -->
        <div class="middle" v-if="paiming.length==1">
          <table></table>
          <div class="mTop"><span>{{$t('BITPUITuiguang.main[2]')}}</span></div>
          <div class="mBottom">
            <div class="d_1">
              <div>
                <p class="p_1" >{{$t('BITPUITuiguang.paiming[1]')}}</p>
                <p class="p_2">{{$t('BITPUITuiguang.paiming[0]')}}</p>
                <p class="p_3">0</span>USDT</p>
              </div>
            </div>
            <div class="d_2">
              <div>
                <p class="p_1" >{{paiming[0].name}}</p>
                <p class="p_2">{{$t('BITPUITuiguang.paiming[0]')}}</p>
                <p class="p_3">{{paiming[0].money}}<span>USDT</span></p>
              </div>
            </div>
            <div class="d_3">
              <div>
                <p class="p_1">{{$t('BITPUITuiguang.paiming[1]')}}</p>
                <p class="p_2">{{$t('BITPUITuiguang.paiming[0]')}}</p>
                <p class="p_3">0<span>USDT</span></p>
              </div>
            </div>
          </div>
        </div>









        <div class="fan" v-if="yongjin">
          <div class="fTitle"><span>{{$t('BITPUITuiguang.main[3]')}}</span></div>
          <div class="text">
            {{guizeHtml}}
          </div>
          <table class="table">
            <tr class="tr_1">
              <td class="td_1">{{$t('BITPUITuiguang.main[10]')}}</td>
              <td class="td_2">{{$t('BITPUITuiguang.main[11]')}}</td>
              <td class="td_3">{{$t('BITPUITuiguang.main[12]')}}</td>
            </tr>
            <tr class="tr">
              <td class="td_1">L1</td>
              <td class="td_2">{{yongjin.free_rate1}}%</td>
              <td class="td_3">{{$t('BITPUITuiguang.main[16]')}}≥{{yongjin.lv1}}{{$t('BITPUITuiguang.main[17]')}}</td>
            </tr>
            <tr class="tr">
              <td class="td_1">L2</td>
              <td class="td_2">{{yongjin.free_rate2}}%</td>
              <td class="td_3">{{$t('BITPUITuiguang.main[16]')}}≥{{yongjin.lv2}}{{$t('BITPUITuiguang.main[17]')}}</td>
            </tr>
            <tr class="tr">
              <td class="td_1">L3</td>
              <td class="td_2">{{yongjin.free_rate3}}%</td>
              <td class="td_3">{{$t('BITPUITuiguang.main[16]')}}≥{{yongjin.lv3}}{{$t('BITPUITuiguang.main[17]')}}</td>
            </tr>
          </table>
        </div>
        <!-- 海报弹窗 -->
        <div class="modle" v-show="modle">
          <table></table>
          <div class="div">
              <p class="p_1">{{$t('BITPUITuiguang.main[13]')}}<span class="guanbi" @click="modleH"></span></p>
              <div class="bottom">
                <div class="flex">
                  <div v-for="(i,index) in haibao.qrc" :key="index">
                    <img :src="i" alt="">
                  </div>
                </div>
                <p class="p_2">{{$t('BITPUITuiguang.main[14]')}}</p>
                <p class="p_3"><a href="javascript:;" @click="modleH">{{$t('BITPUITuiguang.main[15]')}}</a></p>
              </div>
          </div>
        </div>
        <!-- TAP切换 -->
        <div class="extension_tab">
            <el-radio-group v-model="tabPosition" class="tabletit">
                <el-radio-button label="buy">
                  <span class="buy">{{$t('extension.tip[0]')}}</span>
                </el-radio-button>
                <el-radio-button label="sell">
                  <span class="sell">{{$t('BITPUITuiguang.main[0]')}}</span>
                </el-radio-button>
            </el-radio-group>
            <div class="table_list">
              <div v-if="tabPosition == 'buy'">
                  <ul class="table_tit1">
                      <li>{{$t('extension.tips[0]')}}</li>
                      <li>{{$t('extension.tips[1]')}}</li>
                      <li>{{$t('extension.tips[2]')}}</li>
                  </ul>
                  <ul class="table_body1">
                    <p class="null" v-if="clientData.length == 0">
                        {{$t('extension.tips[5]')}}
                    </p>
                    <li v-for="(item,index) in clientData" :key="index" v-else>
                      <div>{{item.realname}}</div>
                      <div>{{item.mobile || item.mail}}</div>
                      <div>{{$public.timestampToTime1(item.reg_time)}}</div>
                    </li>
                  </ul>
                  <el-pagination background layout="prev, pager, next" :total="totalPage" @current-change="current_change" :page-size='pagesize' :current-page.sync="pageNum" v-if="clientData.length > 0"></el-pagination>
              </div>
              <div v-else>
                  <ul class="table_tit1">
                      <li>{{$t('extension.tips[0]')}}</li>
                      <li>{{$t('extension.tips[3]')}}</li>
                      <li>{{$t('extension.tips[4]')}}</li>
                  </ul>
                  <ul class="table_body1">
                      <p class="null" v-if="commissionData.length==0">
                          {{$t('extension.tips[5]')}}
                      </p>
                      <li v-for="(item,index) in commissionData" :key="index" v-else>
                        <div>{{item.realname}}</div>
                        <div>{{(item.time).split(" ")[0]}}</div>
                        <div>{{item.nums}}</div>
                      </li>
                  </ul>
                  <el-pagination background layout="prev, pager, next" :total="totalPage" @current-change="current_change" :page-size='pagesize' :current-page.sync="pageNum" v-if="commissionData.length > 0"></el-pagination>
              </div>
            </div>
        </div>
    </div>  
  </template>
  <script>
import { constants } from "fs";
export default {
  data() {
    return {
      haibao:'',
      yongjin: '',
      paiming:'',
      modle:false,
      user: [], //我的推广
      tabPosition: "buy", //求购出售切换
      HomeInfoData: {}, //推广信息
      codeData: {}, //二维码信息
      clientData: [], //用户信息
      commissionData: [], //佣金信息
      guizeHtml:'',//富文本信息
      myfriends: "",
      yuanli: "",
      pageNum: 1, // 当前页数
      pagesize: 10, //每页页数
      totalPage: null // 总页数
    };
  },
  watch: {
    tabPosition: function(val, oval) {
      var _this = this;
      _this.pageNum = 1;
      if (_this.tabPosition == "buy") {
        _this.getBrokerMyClient(1);
      } else {
        _this.getBrokerCommission(1);
      }
    }
  },
  methods: {
    modleS(){
      var _this = this;
      _this.$http.post(_this.$http.link).then(function(response) {
          if (response.data.status == "200") {
            _this.haibao = response.data.data;
          }
        })
    },
    modleH(){
      var _this = this;
      _this.modle = false;
    },
    // 获取佣金信息
    geiMy_fee(){
      var _this = this;
      _this.$http.post(_this.$http.my_fee, { params: {} })
        .then(function(response) {
          if (response.data.status == "200") {
            if(_this.$t('currlanguage')=='cn'){
              _this.guizeHtml = _this.$public.HTMLDecode(response.data.data.fygz);
            }else{
              _this.guizeHtml = _this.$public.HTMLDecode(response.data.data.fygz1);
            }
            _this.yongjin = response.data.data.lvs;
            _this.paiming = response.data.data.paiming
          }
        })
    },
    getData(i) {
      var _this = this;
      _this.$http
        .get(_this.$http.my_down, { params: {} })
        .then(function(response) {
          if (response.data.status == "200") {
            _this.user = response.data.data;
            _this.clientData = response.data.data.list;
          }
        })
        .catch(function(error) {});
    },
    //复制
    copy: function(para) {
      // 复制函数
      var _this = this;
      var ele = document.getElementById(para);
      ele.select();
      document.execCommand("Copy");
      _this.$public.msg(_this.$t("google_verify.script[3]"), "success", _this);
    },
    current_change: function(i) {
      var _this = this;
      if (_this.tabPosition == "buy") {
        _this.getBrokerMyClient(i);
      }
      if (_this.tabPosition == "sell") {
        _this.getBrokerCommission(i);
      }
    },
    // 获取二维码
    getCodeUrl() {
      var _this = this;
      _this.$http
        .get(_this.$http.user_link, { params: {} })
        .then(function(response) {
          _this.codeData = response.data.data;
        })
        .catch(function(error) {});
        
    },
    //获取用户信息 
    getBrokerMyClient(i) {
      var _this = this;
      _this.$http
        .get(_this.$http.my_down, { params: { p: i, size:_this.pagesize} })
        .then(function(response) {
          if (response.data.status == "200") {
            _this.clientData = response.data.data.list;
            _this.totalPage = Number(response.data.data.count);
          }
        })
        .catch(function(error) {});
    },
    //获取佣金信息
    getBrokerCommission(i) {
      var _this = this;
      _this.$http
        .get(_this.$http.yjmx, { params: { p: i, size:_this.pagesize} })
        .then(function(response) {
          if (response.data.status == "200") {
            _this.commissionData = response.data.data.data;
            _this.totalPage = Number(response.data.data.sum);
          }
        })
        .catch(function(error) {});
    }
  },
  mounted: function() {
    var _this = this;
    _this.getData(_this.pageNum);
    _this.getCodeUrl();
    _this.getBrokerMyClient(_this.pageNum);
    _this.geiMy_fee();
    _this.modleS();
  }
};
</script>