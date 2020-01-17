<template lang="html">
  <div class="header" :class="[isFixed?'fixeds':'']">
    <div class="header_box" :style="isFixed?'height:70px':'height:70px'">
      <section class="header_transaction">
        <ul class="transaction_main">
          <li class="transaction_list logo" @click="changeUrl('/home')">
            <!-- <img src="../../assets/img/logo.png" class="logoImg"> -->
            Zeus
          </li>
          <li :class="$route.path==v.url?'transaction_list active':'transaction_list'" v-for="v in headerNav"
            v-show="v.status" @click="changeUrl(v.url)">{{v.name}}</li>
          <li>

          </li>
        </ul>
        <!-- <div class="gonggao" style="color:white" > -->
        <div class="gonggao" style="color:white">
            <div class="div">
              <router-link class="a" to="zixunList?zxtype=3">{{$t('tradingNotice.main[0]')}}</router-link>
              <div class="swiper-container">
                  <div class="swiper-wrapper">
                      <div v-for="i in zxList" class="swiper-slide"><router-link :to="`zixunDetails?zxtype=3&id=`+i.id">{{i.title}}</router-link></div>
                      <!-- <div v-for="(i,index) in zxList" class="swiper-slide" :key="index">{{i.title}}</div> -->
                      <!-- <div v-for="(i,index) in zxList" class="swiper-slide" :key="index">{{i.title}}</div> -->
                  </div>
              </div>
            </div>
          </div>

      </section>
      
      <section class="header_personal">
        <!-- 未登录 -->
        <ul class="personal_main" v-if="!isLogin" :id="isFixed?'pos':''">
          <!-- 登录注册 -->
          <li class="personal_list loginlist loginOrRegActive">
            <router-link to="/Login">
              <i class="iconfont icon-zhuanhuan1"></i>{{$t("header.state[0]")}}
            </router-link>
          </li>
          <li class="personal_list loginlist">
            <router-link to="/Register">
              <i class="iconfont icon-zhuanhuan1"></i>{{$t("header.state[1]")}}
            </router-link>
          </li>
          <!-- 白天日间切换 -->
          <li class="personal_list">
						<el-dropdown @command="changeDay">
							<span class="el-dropdown-link changeTime">
						    <img src="../../assets/image/index/day.png" v-if="changeBgData == 'day'"/>
						    <img src="../../assets/image/index/night.png" v-if="changeBgData == 'night'"/>
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
          <ul class="personal_main login" v-else >
              <li class="personal_list" >
                  <el-dropdown  trigger="click"> 
                    <span class="el-dropdown-link">
                      <i class="iconfont icon-wode"></i>{{ phone }}
                      <!-- <img v-if="wallone < money1" src="../../assets/img/v0.png" alt="">
      
                      <img v-else-if="wallone >= money1 && wallone < money2 " src="../../assets/img/v1.png" alt="">
      
                      <img v-else-if="wallone >= money2 && wallone < money3" src="../../assets/img/V2.png" alt="">
      
                      <img v-else-if="wallone >= money3 && wallone < money4" src="../../assets/img/V3.png" alt="">
      
                      <img v-else-if="wallone >= money4 && wallone < money5" src="../../assets/img/V4.png" alt="">
                      <img v-else src="../../assets/img/V5.png" alt=""> -->
      
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu    divided slot="dropdown" :class="changeBgData == 'day' ? 'bai' : 'hei'">
                      <el-dropdown-item :divided="true">
                        <router-link to="/MyAssets">
                          <!-- 我的资产 -->
                          <img src="../../assets/img/myzc.png" alt="">
                          {{$t("header.list[0]")}}
                        </router-link>
                      </el-dropdown-item>
      
                      <el-dropdown-item :divided="true">
                        <router-link to="/security">
                          <!-- 账号安全 -->
                          <img src="../../assets/img/zhaq.png" alt="">
                          {{$t("header.list[1]")}}
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item :divided="true">
                        <a @click="goUrl">
                          <!-- 身份验证 -->
                          <img src="../../assets/img/sfrz.png" alt="">
                          {{$t("header.list[2]")}}
                        </a>
                      </el-dropdown-item>
                      
                        <!-- 提币地址 -->
                      <el-dropdown-item :divided="true" v-if="is_deposit == 1">
                        <router-link to="/Mentionmoneyaddress">
                          <img src="../../assets/img/tib.png" alt="">
                          {{$t("header.list[3]")}}
                        </router-link>
                      </el-dropdown-item>
      
                      <el-dropdown-item :divided="true">
                        <router-link to="/promotion">
                          <!-- 我的推广 -->
                          <img src="../../assets/img/mytg.png" alt="">
                          {{$t("header.list[5]")}}
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item :divided="true">
                        <span @click="signOut">
                          <router-link to="">
                            <!-- 退出登录 -->
                            <img src="../../assets/img/tc.png" alt="">
                            {{$t("header.list[4]")}}
                          </router-link>
                        </span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
          <li v-show="orderUrl" class="personal_list">
            <router-link :to="orderUrl">
              <i class="iconfont icon-dingdan"></i>{{$t("header.navlist[4]")}}
            </router-link>
          </li>

          <li class="personal_list">
						<el-dropdown  @command="changeDay">
							<span class="el-dropdown-link changeTime">
						    <img src="../../assets/image/index/day.png" v-if="changeBgData == 'day'"/>
						    <img src="../../assets/image/index/night.png" v-if="changeBgData == 'night'"/>

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

  export default {
    props: ["isFixed"],
    data() {
      return {
        ggShow: true,
        ph:true,
        mySwiper:null,
        hp:false,
        list: "",
        Routing: "",
        activeUrl: "/",
        Routingtype: false,
        isLogin: false,
        account: null,
        zxList:[],
        wallone: 0,
        money1: 0,
        money2: 0,
        money3: 0,
        money4: 0,
        money5: 0,
        token: null,
        phone: null,
        active: true,
        is_deposit:"",
        isRouter: 0,
        activeClass: "blue",
        ziCanStatus: true, //控制资产的显示和隐藏
        is_apply: "", //经纪人状态判断
        apply_reason: "", //拒绝原因
        status: "", //判断没有没实名认证
        auth_status:"",
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
            status: true
          },
          // {
          //   name: this.$t("header.navlist[1]"),
          //   url: "/frenchcurrency",
          //   status: true
          // },
          {
            name: this.$t("header.navlist[2]"),
            url: "/exchange",
            status: true
          },
          // {
          //   name: this.$t("header.navlist[3]"),
          //   url: "/apply",
          //   status: false
          // },
          {
            name: this.$t("header.navlist[7]"),
            url: "/daywak",
            status: true
          },
          {
            name: this.$t("header.navlist[8]"),
            url: "/zixunList",
            status: true
          },
          {
            name: this.$t("header.other[1]"),
            url: "/ranking",
            status: true
          },
        ],
				view:{
				// 发布交易显示url
					// apply_show : ['/frenchcurrency', '/apply','/buy','sell'],
				// 公告轮播隐藏url
					gg_hide  : ['/coincoin', '/frenchcurrency', '/apply','/buy','/sell','/zixunList'],
				// 登录拦截
					refuse : ['/ranking'],
				// 订单控制
					orderShow : {
						// val中包含的地址会显示订单，订单跳转地址为key
						'/ggOrder': ['/exchange'],
						'/fbOrder': ['/frenchcurrency'],
						'/shopOrder': ['/shopIndex', '/payment' ,'/shopIndex' , '/Details', '/payment','/addSite']
					}
				},
        auth_status:""
      };
    },
    methods: {
			// 视图控制
			viewCtrl(path) {
				// 以下逻辑不用动 只修改this.view
				if(!this.view.apply_show || this.view.apply_show.includes(path)){
					this.headerNav[3].status = true
				}else{
					this.headerNav[3].status = false
				}

				if(this.view.gg_hide.includes(path)){
					this.ggShow = false
				}else{
					this.ggShow = true
				}
				if(this.view.refuse && this.view.refuse.includes(path)){
					if(!sessionStorage.token){
						this.$public.msg(this.$t("purchase.sell[7]"), 'warning', this);
						this.$public.go("/Login", 100, this);
					}
				}
				for(var i in this.view.orderShow){
					if(this.view.orderShow[i].includes(path)){
						this.orderUrl = i 
						return
					}else{
						this.orderUrl = ""
					}
					
				}
				
			},
		
      getZxList() {
        this.$http.post(this.$http.getxtzx, {size:10}).then(r=>{
          this.zxList = r.data.data.res
          if(r.data.status=="200"){
            this.$nextTick(()=>{
              this.mySwiper = new Swiper ('.swiper-container', {
              direction: 'vertical', // 垂直切换选项
              speed:300,
              loop: true, // 循环模式选项
              observer: true,//动态加载数据是正常运行
              // observeParents:true,//当swiper的父元素变化是更新swiper
              autoplay:{
                delay:2000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
              }
          })
            })

          }
          
        }).catch(r=>{
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
        if(this.$route.path=="/exchange"){
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
            _this.isLogin = false
            _this.$public.go("login", 100, _this);
          })
          .catch(() => { });
      },
      goUrl(url) { // 身份验证信息跳转
        var _this = this;
        if (_this.status == '1') {
          _this.$public.go("senior", 100, _this);
        } else {
          if (_this.status == '3') {
            this.$public.msg(_this.$t('header.tips[5]'), "success", _this);
            return false;
          // } else if (_this.status == '1') {
          //   _this.$public.go("senior", 100, _this);
          } else if (_this.status == '2') {
            // this.$public.msg("您身份认证正在审核，请耐心等待", "success", _this);
            this.$public.msg(_this.$t('header.tips[6]'), "warning", _this);
            return false;
          } else if (_this.status == '4') {
            this.$public.msg(_this.$t('header.tips[7]'), "warning", _this);
            _this.$public.go("senior", 1000, _this);
          }
        }
      },
      changeUrl(url) {
        var _this = this;
        this.activeUrl = url;
        this.$router.push({path:url})
      },
      
      getisLogin() { // 
        var _this = this;
        _this.account = window.sessionStorage.account;
        _this.token = window.sessionStorage.token;
        if (_this.account && _this.token) {
          _this.isLogin = true;
          _this.phone = _this.$public.phoneEncryption(sessionStorage.mobile)

        }else{
          _this.isLogin = false;

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
              _this.is_deposit = response.data.data.is_deposit;
              //是否实名认证
              _this.status = response.data.data.status; //初级
              sessionStorage.setItem('is_deposit', _this.is_deposit)
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
      this.getZxList()
      var _this = this;

      if (_this.$route.path == "/frenchcurrency" || _this.$route.path == "/apply") {
        _this.headerNav[3].status = true;
      } else {
        // _this.headerNav[3].status = false;
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
      _this.getisLogin();
      _this.defaultChangColor();
      _this.requestPublic();
      _this.getUserData();
      this.viewCtrl(this.$route.path)
      if(this.$cookies.get("changeBg")){
        if(this.$cookies.get("changeBg")=="night"){
          $("#main").removeClass("mainb");
          $("#main").addClass("mainy");
          this.changeBgData = "night";
        }else{
          $("#main").removeClass("mainy");
          $("#main").addClass("mainb");
          this.changeBgData = "day";
        }

      }else{
          $("#main").removeClass("mainb");
          $("#main").addClass("mainy");
          this.changeBgData = "night";
      }

      if (_this.$cookies.get("language")) {
        _this.$i18n.locale = _this.$cookies.get("language");
        _this.islange = _this.$cookies.get("language");
      } else {
        _this.$cookies.set("language", "Chinese", 60 * 60 * 24 * 30);
      }

      
    },
    watch: {
      $route(to, from) {
        var _this = this;
        this.activeUrl = to.path;
        this.getisLogin()
        if (to.path.indexOf("/zixunDetails") != -1) {
          this.$router.go(0);
        }
        this.viewCtrl(to.path)
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
.el-dropdown-menu__item{
  line-height: 45px;
}
.el-dropdown-menu__item a{
  width: 130px;
}
.el-dropdown-menu__item--divided{
  border-top:1px solid rgba(66,69,94,1);
  margin-top: -1px;
}
.popper__arrow{
  display: none !important;
}
.changeTime{
  position: relative;
  top: 2px;
}
.el-dropdown-menu{
  border: 0 !important;
  margin: 0;
  padding: 0;
  box-shadow:0px 5px 10px 0px rgba(24,27,44,0.53);
}
.el-dropdown-link{
  &:hover{
    cursor: pointer;
  }
}
.header_transaction{
  width: 900px;
  position: relative;
}
  .gonggao{
    float: left;
    width: 250px;
    line-height: 70px;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    .div{
      width:200px;
      display:inline-block;
      height:30px;
      line-height:30px;
      padding-left:65px;
      border-radius:15px;
      background:#182447FF;
      vertical-align: middle;
      overflow: hidden;
      font-size: 12px;
      color:#D8DCF3FF;
      position: relative;
      .a{
        display:inline-block;
        width:58px;
        height:31px;
        position: absolute;
        left: 0;
        background:rgba(52,108,245,1);
        border-radius:15px;
        text-align:center;
      }
    }
  }
  .el-icon-edit-outline {
    position: relative;
    left: -6px;
  }

  .hei{
    background: #1b2143;
  }
  .bai{
    background: #ffffff;
    .el-dropdown-menu__item--divided{
      border-color:#d2d4e5;
    }

  }
  .el-popper .popper__arrow, .el-popper .popper__arrow::after{
    display: none !important;
  }
  .el-dropdown-menu__item--divided:before{
      height: 0;
    }
  .iconfont {
    font-size: 14px;
    position: relative;
    left: -4px;
    color: #2A64F3;
  }
  #pos li {
    height: 70px;
    line-height: 70px;
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
  .hei{
    .el-dropdown-menu__item a {
      color: #e6e6e6;
      display: flex;
      align-items: center;
    }
  }
  .bai{
    .el-dropdown-menu__item a {
      color: #666666;
      display: flex;
      align-items: center;
    }
  }
  .el-dropdown-menu__item a img {
    margin-right: 24px;
  }
  .el-dropdown-menu__item:not(.is-disabled):hover{
    color: #2A64F3;
  }
</style>