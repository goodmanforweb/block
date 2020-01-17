<style lang=less>
@import "../../assets/public.less";
@import "./extension.less";
</style>
  <template lang="html">
    <div class="extension_body">
        <div class="extension_banner">
            <!-- <img src="../../assets/img/pro-banner.png" alt=""> -->
        </div>
        <div class="bgbg">
          <div class="extension_top">
              <div class="code">
                  <div class="codeImg">
                      <img :src="codeData.qrc" alt="">
                  </div>
                  <div class="code_left">
                      <div>
                        <p class="p_1">{{$t('extension.tip[2]')}}</p>
                        <p class="p_2">{{$t('extension.tip[3]')}}</p>
                        <a href="javascript:;" @click="modle = true;">{{$t('zeusTuiguang.main[1]')}}</a>
                      </div>
                  </div>
                  <div class="code_right">
                      <h5>{{$t('extension.tip[4]')}}</h5>
                      <!-- <p id="addInput">{{codeData.codeUrl}}</p> -->
                      <el-input auto-complete="off" id="addInput" v-model="codeData.url" readonly></el-input>
                      <span @click="copy('addInput')">{{$t('extension.tip[5]')}}</span>
                  </div>
              </div>
              <ul class="top_my">
                  <li>
                    <!-- <img src="../../assets/img/pro-2.png" alt=""> -->
                    <div>
                      <span class="two">{{user.ttl}}</span>
                      <span class="one">{{$t('extension.tip[0]')}}</span>
                    </div>
                  </li>
                  <div class="river"></div>
                  <li>
                    <!-- <img src="../../assets/img/pro-1.png" alt=""> -->
                    <div>
                      <span class="two">{{user.force?user.force:'0'}}</span>
                      <span class="one">{{$t('zeusTuiguang.main[0]')}}</span>
                    </div>
                  </li>
              </ul>

          </div>
        </div>
        <!-- 海报弹窗 -->
        <div class="modle" v-show="modle">
            <table></table>
            <div class="div">
                <p class="p_1">{{$t('zeusTuiguang.main[13]')}}<span class="guanbi" @click="modleH"></span></p>
                <div class="bottom">
                  <div class="flex">
                    <div v-for="(i,index) in haibao.qrc" :key="index">
                      <img :src="i" alt="">
                    </div>
                  </div>
                  <p class="p_2">{{$t('zeusTuiguang.main[14]')}}</p>
                  <p class="p_3"><a href="javascript:;" @click="modleH">{{$t('zeusTuiguang.main[15]')}}</a></p>
                </div>
            </div>
          </div>
        <!-- TAP切换 -->
        <div class="extension_tab">
            <el-table
            :empty-text="$t('buy.main[17]')"
            :data="clientData"
           >
            <el-table-column
              prop="realname"
              :label="$t('real_name.verification[0]')"
              >
            </el-table-column>
            <el-table-column
              prop="mobile"
              :label="$t('real_name.verification[6]')"
              >
            </el-table-column>
            <!-- 注册时间 -->
            <el-table-column
              prop="address"
              :label="$t('extension.tips[2]')">
              <template slot-scope="scop">
              {{$public.timestampToTime1(scop.row.reg_time)}}
              </template> 
            </el-table-column>
          </el-table>
          <el-pagination
          background
          layout="prev, pager, next"
          @current-change="getData"
          :current-page="pageNum"
          :total="totalPage">
        </el-pagination>

        </div>
    </div>  
  </template>
  <script>
export default {
  data() {
    return {
      haibao:'',
      yongjin: '',
      paiming:'',
      modle:false,
      user: [], //我的推广
      HomeInfoData: {}, //推广信息
      codeData: {}, //二维码信息
      clientData: [], //用户信息
      commissionData: [], //佣金信息
      guizeHtml:'',//富文本信息
      myfriends: "",
      yuanli: "",
      pageNum: 1, // 当前页数
      pagesize: 10, //每页页数
      totalPage: 10 // 总页数
    };
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
      this.pageNum = i
      _this.$http
        .get(_this.$http.my_down, { params: {p:_this.pageNum} })
        .then(function(response) {
          if (response.data.status == "200") {
            _this.user = response.data.data;
            _this.totalPage = Number(response.data.data.count)
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