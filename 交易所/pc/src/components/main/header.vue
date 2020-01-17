<template lang="html">
  <div class="header" :class="{notHome: $route.name != 'home'}">
    <div class="header_box" :style="isFixed?'height:60px':'60px'">
      <section class="header_transaction flex sb">
        <ul class="transaction_main flex vc">
          <li class="transaction_list" @click="changeUrl('/home')">
            <img src="../../assets/img/logo.png" class="logoImg">
          </li>
          <li :class="{active: $route.name == v.rname}" class="head-tab" v-for="v in headerNav"
            @click="changeUrl(v.url)">{{v.name}}</li>
         
        </ul>

        <div class="gonggao" style="color:white" v-show="ph">
          <div class="div">
            <router-link class="a" to="zixunList?zxtype=3">{{$t('tradingNotice.main[0]')}}</router-link>
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div v-for="i in zxList" class="swiper-slide">
                  <router-link :to="`zixunDetails?id=`+i.id">{{i.title}}</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section class="header_personal">
        <ul class="personal_main login">
          <li class="personal_list">
            <a @click="goOrder" class="order-tab" :class="{orderTabActive : $route.name== 'ggOrder'}">
              <i class="iconfont icon-dingdan"></i>{{$t("header.navlist[4]")}}
            </a>
          </li>
          <li class="personal_list">
            <template v-if="!logininfo.token">
              <i class="iconfont icon-wode"></i>
              <router-link class="login-tab" to="/login">{{$t('header.state[0]')}}</router-link>
              <router-link class="login-tab" to="/register">{{$t('header.state[1]')}}</router-link>
            </template>
            <el-dropdown v-else trigger="click">
              <span class="el-dropdown-link">
                <i class="iconfont icon-wode"></i>
                {{ logininfo.phone }}
              </span>
              <el-dropdown-menu slot="dropdown" :class="changeBgData == 'day' ? 'bai' : 'hei'">
                <el-dropdown-item :divided="true">
                  <router-link to="/mycenter/basicinfo">
                    {{ logininfo.mobile }}
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item :divided="true">
                  <router-link to="/mycenter/assetinfo">
                    <!-- 我的资产 -->
                    <img src="../../assets/img/zjgl-icon.png" alt="">
                    {{$t("header.list[0]")}}
                  </router-link>
                </el-dropdown-item>

                <el-dropdown-item :divided="true">
                  <router-link to="/mycenter/tbadress">
                    <!-- 账号安全 -->
                    <img src="../../assets/img/tbdz-gl-icon.png" alt="">
                    {{$t("header.list[1]")}}
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item :divided="true">
                  <router-link to="/mycenter/myinvite">
                    <!-- 身份验证 -->
                    <img src="../../assets/img/wytg-icon.png" alt="">
                    {{$t("header.list[2]")}}
                  </router-link>
                </el-dropdown-item>



                <el-dropdown-item :divided="true">
                  <span @click="signOut">
                    <a>
                      <!-- 退出登录 -->
                      <img src="../../assets/img/tcdl-icon.png" alt="">
                      {{$t("header.list[3]")}}
                    </a>
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="personal_list">
            <el-dropdown @command="changeDay">
              <span class="el-dropdown-link changeTime">
                <img src="../../assets/image/index/day.png" v-if="changeBgData == 'day'" />
                <img src="../../assets/image/index/night.png" v-if="changeBgData == 'night'" />

              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="day">{{$t("header.day[0]")}}</el-dropdown-item>
                <el-dropdown-item command="night">{{$t("header.day[1]")}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="personal_list">
            <el-dropdown @command="handleCommand">
              <p>
                <span class="el-dropdown-link linkBorder" v-if="islange == 'Chinese'">
                  <img src="../../assets/img/icon_China.png" alt="">
                  <img src="../../assets/img/xuanze.png" alt="">
                </span>
                <span class="el-dropdown-link linkBorder" v-else>
                  <img src="../../assets/img/yinwen.png" alt="">
                  <img src="../../assets/img/xuanze.png" alt="">
                </span>
              </p>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="Chinese">{{$t("header.day[2]")}}</el-dropdown-item>
                <el-dropdown-item command="English">{{$t("header.day[3]")}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
  export default {
    computed: {
      ...mapGetters(['logininfo']),
    },
    props: ["isFixed"],
    data() {
      return {
        ph: true,
        mySwiper: null,
        hp: false,
        list: "",
        Routing: "",
        activeUrl: "/",
        Routingtype: false,
        LoginState: false,
        account: null,
        zxList: [],
        wallone: 0,
        money1: 0,
        money2: 0,
        money3: 0,
        money4: 0,
        money5: 0,
        token: null,
        phone: null,
        active: true,
        isRouter: 0,
        activeClass: "blue",
        ziCanStatus: true, //控制资产的显示和隐藏
        is_apply: "", //经纪人状态判断
        apply_reason: "", //拒绝原因
        status: "", //判断没有没实名认证
        auth_status: "",
        qd: "0", //判断签到状态
        changeBgData: this.$cookies.get("changeBg")
          ? this.$cookies.get("changeBg")
          : "night",
        home: this.$router.path,
        islange: "Chinese", //语言切换
        headerNav: [
          {
            name: this.$t("header.navlist[6]"),
            url: "/home",
            rname:'home',
            status: true
          },
          {
            name: this.$t("header.navlist[1]"),
            url: "/hyexchange",
            rname:'hyexchange',
            status: true
          },
          {
            name: this.$t("header.navlist[2]"),
            url: "/gqexchange",
            rname:'gqexchange',
            status: true
          },
          {
            name: this.$t("header.navlist[7]"),
            url: "/help?type=5",
            rname:'help',
            status: true
          },
        ],
        auth_status: ""
      };
    },
    methods: {
      goOrder() {
        if (this.LoginState) {
          return this.$router.push({ name: 'login' })
        }
        this.$router.push({ name: 'ggOrder' })
      },
      getZxList() {
        this.$http.post(this.$http.getxtzx, { size: 3 }).then(r => {
          if (r.data.status == "200") {
            this.zxList = r.data.data.res
            this.mySwiper = new Swiper('.swiper-container', {
              direction: 'vertical', // 垂直切换选项
              loop: true, // 循环模式选项
              observer: true,//动态加载数据是正常运行
              observeParents: true,//当swiper的父元素变化是更新swiper
              autoplay: 1000
            })
          }

        }).catch(r => {
          console.log(r);
        })
      },
      changeDay(val) {
        var _this = this;
        _this.$cookies.set("changeBg", val, 60 * 60 * 24 * 30);
        if (_this.$cookies.get("changeBg") == "night") {
          $("#main").removeClass("mainb");
          $("#main").addClass("mainy");
          this.changeBgData = "night";
        } else {
          $("#main").removeClass("mainy");
          $("#main").addClass("mainb");
          this.changeBgData = "day";
        }
        // 刷新k线
        if (this.$route.path == "/exchange") {
          var ifm = document.getElementById('fram')
          ifm.contentWindow.location.reload(true);
        }


      },

      Signin() {
        var _this = this;

        _this.$http.post(_this.$http.user_sign, {}).then(res => {
          if (res.data.status == '1' || res.data.status == '4') {
            _this.$message({
              message: res.data.msg,
              type: "success"
            });
            _this.getUserData();
          } else {
            _this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        });
      },
      signOut() {
        // 登出
        var _this = this;
        _this
          .$confirm(_this.$t("header.tips[0]"), _this.$t("header.tips[1]"), {
            confirmButtonText: _this.$t("header.tips[2]"),
            cancelButtonText: _this.$t("header.tips[3]"),
            type: "warning"
          })
          .then(() => {
            _this.$message({
              type: "success",
              message: _this.$t("header.tips[4]")
            });
            sessionStorage.clear();
            _this.$public.go("login", 100, _this);
          })
          .catch(() => { });
      },
      goUrl(url) { // 身份验证信息跳转
        var _this = this;
        if (sessionStorage.status != '3') {
          _this.$public.go("realname", 100, _this);
        } else {
          if (_this.auth_status == '3') {
            // this.$public.msg("您身份认证已经通过!", "success", _this);
            this.$public.msg(_this.$t('header.tips[5]'), "success", _this);
            return false;
          } else if (_this.auth_status == '1') {
            _this.$public.go("senior", 100, _this);
          } else if (_this.auth_status == '2') {
            // this.$public.msg("您身份认证正在审核，请耐心等待", "success", _this);
            this.$public.msg(_this.$t('header.tips[6]'), "success", _this);
            return false;
          } else if (_this.auth_status == '4') {
            this.$public.msg(_this.$t('header.tips[7]'), "warning", _this);
            _this.$public.go("senior", 1000, _this);
          }
        }
      },
      changeUrl(url) {
        var _this = this;
        this.activeUrl = url;
        sessionStorage.activeUrl = url;
        switch (url) {
          case "/help?type=5":
            _this.headerNav[3].status = false;
            this.$router.push(url);
            _this.Routingtype = false;
          case "/home":
            _this.headerNav[3].status = false;
            _this.$public.go(url, 0, _this);
            _this.Routingtype = false;
            break;

          case "/daywak":
            _this.headerNav[3].status = false;
            _this.$public.go(url, 0, _this);
            _this.Routingtype = false;
            break;

          case "/hyexchange":
            _this.headerNav[3].status = false;
            _this.$public.go(url, 0, _this);
            _this.Routing = "/ggOrder"; // 杠杆交易
            _this.Routingtype = true;
            _this.isRouter = 0;
            _this.ziCanStatus = false;
            break;
          case "/gqexchange":
            _this.headerNav[3].status = false;
            _this.$public.go(url, 0, _this);
            _this.Routing = "/ggOrder"; // 杠杆交易
            _this.Routingtype = true;
            _this.isRouter = 0;
            _this.ziCanStatus = false;
            break;
          case "/zixunList":
            _this.headerNav[3].status = false;
            _this.$router.push({
              path: url
            });
            break;
          default:
            _this.Routingtype = false;
            _this.headerNav[3].status = false;
            break;
        }
      },
      ChangingRouting() { // 订单切换修改路由
        var _this = this;
        _this.account = window.sessionStorage.account;
        _this.token = window.sessionStorage.token;
        if (!_this.account && !_this.token) {
          _this.LoginState = true;
        }
      },
      defaultChangColor() { //订单路由显示
        var _this = this;
        switch (_this.$route.matched[0].path) {
          case "/frenchdetails":
          case "/frenchcurrency":
          case "/frenchorder":
          case "/fbOrder":
            _this.isRouter = 0; // 法币交易
            break;
          case "/currencyExchange":
            _this.isRouter = 1; // 币币交易
            break;
          case "/leveragedtrade":
            _this.isRouter = 2; // 杠杆交易
            break;
          case "/apply":
          case "/sell":
          case "/buy":
            _this.isRouter = 3; // 发布广告
            break;
          case "/ziChan":
          case "/moneyRecord":
            _this.isRouter = 4; // 资产
            break;
          case "/ggOrder":
            _this.isRouter = 5; // 订单
            break;
          default:
            _this.isRouter = null;
            break;
        }
      },

      getUserData() { // 获取基本信息
        var _this = this;
        if (!sessionStorage.account) {
          return false;
        }
        _this.$http.post(_this.$http.user_info, {})
          .then(function (response) {
            if (response.data.status == "200") {
              _this.is_apply = response.data.data.is_apply;
              _this.apply_reason = response.data.data.apply_reason;
              //是否实名认证
              _this.status = response.data.data.status; //初级
              sessionStorage.status = response.data.data.status;
              sessionStorage.mcode = response.data.data.mcode;
              _this.auth_status = response.data.data.auth_status; //高级
              _this.wallone = Number(response.data.data.wallone_usdt); //当前usdt的数量
              _this.money1 = Number(response.data.data.money1); //当前usdt的数量
              _this.money2 = Number(response.data.data.money2); //当前usdt的数量
              _this.money3 = Number(response.data.data.money3); //当前usdt的数量
              _this.money4 = Number(response.data.data.money4); //当前usdt的数量
              _this.money5 = Number(response.data.data.money5); //当前usdt的数量

            } else {
              _this.$public.msg(response.data.msg, "warning", _this);
            }
          })
          .catch(function (error) { });
      },
      handleCommand(command) { // 中英文
        var _this = this;
        // _this.$i18n.locale = command;
        _this.$cookies.set("language", command, 60 * 60 * 24 * 30);
        _this.$router.go(0);
      },
      requestPublic: function () {
        var _this = this;
      }
    },
    // 路由改变时
    beforeRouteLeave(to, from, next) {
    },
    mounted: function () {

      var _this = this;

      if (_this.$route.path == "/frenchcurrency" || _this.$route.path == "/apply") {
        _this.headerNav[3].status = true;
      } else {
        _this.headerNav[3].status = false;
      }
      if (_this.$route.path == "/exchange") {
        $(".footer").hide();
      } else {
        $(".footer").show();
      }
      _this.activeUrl = _this.$route.path


    },
    created: function () {
      var _this = this;
      _this.getZxList()
      _this.ChangingRouting();
      _this.defaultChangColor();
      _this.requestPublic();
      _this.getUserData();
      if (this.$cookies.get("changeBg")) {
        if (this.$cookies.get("changeBg") == "night") {
          $("#main").removeClass("mainb");
          $("#main").addClass("mainy");
          this.changeBgData = "night";
        } else {
          $("#main").removeClass("mainy");
          $("#main").addClass("mainb");
          this.changeBgData = "day";
        }

      } else {
        $("#main").removeClass("mainb");
        $("#main").addClass("mainy");
        this.changeBgData = "night";
      }
      if (sessionStorage.activeUrl) {
        this.activeUrl = sessionStorage.activeUrl;
      }
      if (_this.$cookies.get("language")) {
        _this.$i18n.locale = _this.$cookies.get("language");
        _this.islange = _this.$cookies.get("language");
      } else {
        _this.$cookies.set("language", "Chinese", 60 * 60 * 24 * 30);
      }
      if (sessionStorage.getItem("mobile")) {
        _this.phone = _this.$public.phoneEncryption(
          sessionStorage.getItem("mobile")
        );
      }

      if (this.$route.path == "/exchange") {
        _this.Routing = "/ggOrder"; // 法币交易
        _this.Routingtype = true;
      } else if (this.$route.path == 'frenchcurrency') {
        _this.Routing = "/fbOrder"; // 法币交易
        _this.Routingtype = true;
      } else {
        _this.Routingtype = false;
      }

    },
    watch: {
      $route(to, from) {
        var _this = this;
        if (to.path == "/home" || to.path == "/") {
        } else {
          //   mySwiper = new Swiper ('.swiper-container', {
          //   direction: 'vertical', // 垂直切换选项
          //   loop: true, // 循环模式选项
          //   autoplay: {
          //     delay: 3000,//1秒切换一次
          //     disableOnInteraction: false,
          //   },
          // })
        }
        if (to.path == "/frenchcurrency" || to.path == "/fbOrder") {
          this.ph = false;
        } else {
          this.ph = true;
          this.mySwiper.init()
        }
        this.activeUrl = to.path

        if (to.path == "/exchange") {
          _this.Routing = "/ggOrder"; // 法币交易
          _this.Routingtype = true;
        } else if (to.path == '/frenchcurrency') {
          _this.Routing = "/fbOrder"; // 法币交易
          _this.Routingtype = true;
        } else {
          _this.Routingtype = false;
        }





        if (
          to.path != "/home" &&
          to.path != "/frenchcurrency" &&
          to.path != "/exchange" &&
          to.path != "/apply" &&
          to.path != "/MyAssets" &&
          to.path != "/zixunList" &&
          to.path != "/daywak" &&
          to.path != "/fbOrder" &&
          to.path != "/ggOrder" &&
          to.path != "/frenchorder"
        ) {
          this.activeUrl = null;
        }

        if (to.path.indexOf("/zixunDetails") != -1) {
          this.$router.go(0);
        }
        if (to.path == "/exchange") {
          $(".footer").hide();
        } else {
          $(".footer").show();
        }
      }
    }
  };
</script>

<style scoped="scoped" lang="less">
  .notHome {
    background: linear-gradient(to right, #472f68, #2b2766, #230b6f);
  }
  .login-tab {
    color: #fff;
    font-size: 16px;
  }

  .homestyle {
    position: relative;
    z-index: 1;

    .header_box {
      background-color: transparent !important;
    }
  }

  .el-dropdown-menu__item a {
    width: 130px;
  }

  .el-dropdown-menu__item--divided {
    border: 0 !important;
  }

  .popper__arrow {
    display: none !important;
  }

  .changeTime {
    position: relative;
    top: 2px;
  }

  .el-dropdown-menu {
    border: 0 !important;
    margin: 0;
  }

  .header_transaction {
    width: 1000px;
    position: relative;
  }

  .gonggao {
    float: left;
    width: 250px;
    line-height: 60px;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;

    .div {
      background: #3c3c80;
      width: 260px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      padding-left: 65px;
      border-radius: 15px;
      vertical-align: middle;
      overflow: hidden;
      font-size: 12px;
      color: #fff;
      position: relative;

      .a {
        display: inline-block;
        width: 58px;
        height: 31px;
        position: absolute;
        left: 0;
        background: var(--main);
        border-radius: 15px;
        text-align: center;
      }
    }
  }

  .el-icon-edit-outline {
    position: relative;
    left: -6px;
  }

  .hei {
    background: #1b2143;
  }

  .bai {
    background: #ffffff;
  }

  .el-popper .popper__arrow,
  .el-popper .popper__arrow::after {
    display: none !important;
  }

  .el-dropdown-menu__item--divided:before {
    height: 0;
  }

  .iconfont {
    font-size: 14px;
    position: relative;
    left: -4px;
    color: #2A64F3;
  }

  #pos li {
    height: 60px;
    line-height: 60px;
  }

  .notice {
    position: relative;
    width: 230px;
  }

  .notice span {
    position: absolute;
    height: 38px;
    width: 58px;
    left: 0px;
    top: 50%;
    margin-top: -19px;
    border-radius: 17px;
    background-color: #2dc7cf;
    line-height: 38px;
    z-index: 33;
    text-align: center;
  }

  .notice .notice_text {
    position: absolute;
    left: 0px;
    top: 50%;
    z-index: 22;
    margin-top: -20px;
    width: 160px;
    height: 40px;
    background: #1b2143;
    border-radius: 17px;
    line-height: 40px;
    padding-left: 60px;
    color: #9fb9d4;
  }

  .hei {
    .el-dropdown-menu__item a {
      color: #e6e6e6;
      display: flex;
      align-items: center;
    }
  }

  .bai {
    .el-dropdown-menu__item a {
      color: #666666;
      display: flex;
      align-items: center;
    }
  }

  .el-dropdown-menu__item a img {
    margin-right: 24px;
  }

  .el-dropdown-menu__item:not(.is-disabled):hover {
    color: #2A64F3;
  }
</style>