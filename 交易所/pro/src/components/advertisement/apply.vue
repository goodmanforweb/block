<style lang=less>
@import "../../assets/public.less";
@import "./apply.less";
</style> 
<template lang="html">
	<div class="apply_main">
		<div class="applyIng">
			<div class="apply_header">
				<h2>{{$t('apply.header[0]')}}</h2>
				<p>{{$t('apply.header[1]')}}</p>
			</div>
			<div class="apply_cont">
				<div class="sell" @click="rout('sell')">
					<img src="../../assets/img/sell.png" alt="" />
					<h2>{{$t('apply.main[0]')}}</h2>
					<p class="tishi">{{$t('apply.main[1]')}}</p>
				</div>
				<div class="buy" @click="rout('buy')">
					<img src="../../assets/img/buy.png" alt="" />
					<h2>{{$t('apply.main[2]')}}</h2>
					<p class="tishi"> {{$t('apply.main[3]')}}</p>
				</div>
			</div>
			<p class="removeApply" @click="removeApply" v-show="userData.is_shop == '1' || userData.is_shop == '3'">{{$t('apply.main[4]')}}</p>
			<div class="prompt">
				<p>
          <span>{{$t('apply.main[16]')}}</span>
					{{$t('apply.main[5]')}}
				</p>
			</div>
		</div>

		<div tabindex="-1" role="dialog" aria-modal="true" :aria-label="$t('apply.main[6]')" class="el-message-box__wrapper" style="z-index: 2045;" v-show="isDisplay">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span>{{$t('apply.main[7]')}}</span>
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="close_moble">
						<i class="el-message-box__close el-icon-close"></i>
					</button>
				</div>
				<div class="el-message-box__content">
					<div class="first">
						<h2>{{$t('apply.main[8]')}}</h2>
						<p class="info">
							{{$t('apply.main[9]')}}{{usdt}}{{$t('apply.main[10]')}}
						</p>
					</div>
					<div class="second">
						<h2>{{$t('apply.main[11]')}}</h2>
						<p class="info">
							<!--我们将在72小时内对您的商家申请资料进行审核，请保持通讯畅通，我们会自动与您取得联系。 <br /> 注：大宗交易区发布广告必须成为超级商家，商家满足交易效率高，信誉好并同意缴纳大额保证金即可申请为超级商家。-->
							{{$t('apply.main[12]')}}
						</p>
					</div>
					<div class="ck">
						<el-checkbox v-model="checked">{{$t('apply.main[13]')}}{{usdt}}USDT{{$t('apply.main[14]')}}</el-checkbox>
					</div>
				</div>
				<div class="el-message-box__btns">
          <el-button type="primary"  class="bnts_1" :disabled="!checked" @click='isok()'>{{$t('apply.main[15]')}}</el-button>
          <el-button type="primary" class="btns_2" @click="isno()">取消</el-button>
				</div>
			</div>
		</div>
		<div class="v-modal" tabindex="0" style="z-index: 2044;" v-show="isDisplay"></div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      isDisplay: false, //是否显示隐藏
      checked: false, //是否同意冻结usdt
      isbuy: "", //判断是出售还是求购
      usdt: "", //用户需要冻结的保证金

      userData: {
        tpwd: "", //是否设置资金密码
        email: "", //是否绑定邮箱
        is_shop: "", //判断是不是商家
        smrz: "", //判断有没有身份认证
        status: "", //判断有没有实名认证
        wallone: "", //用户钱包
        auth_status:"", //高级认证
      }
    };
  },
  methods: {
    //请求个人中心接口，判断是不是商家 和实名认证
    getData() {
      var _this = this;
      _this.$http
        .post(_this.$http.user_info, {})
        .then(function(response) {
          if (response.data.status == "200") {
            _this.userData.is_shop = response.data.data.is_shop;
            _this.userData.smrz = response.data.data.smrz;
            _this.userData.status = response.data.data.status;
            _this.userData.auth_status = response.data.data.auth_status;
            _this.userData.tpwd = response.data.data.tpwd;
            _this.userData.email = response.data.data.email;
            _this.userData.wallone = response.data.data.wallone;
            _this.usdt = response.data.data.usdt;
          } else if (response.data.status == "0") {
            _this.$public.confirm(_this.$t("apply.script[0]"), "login", _this);
          }
        })
        .catch(function(error) {});
    },
    //各种判断条件
    judge() {
      var _this = this;
      /*
				  else if(_this.userData.email == false) {
					_this.$public.confirm('您还没有绑定邮箱，是否前往绑定?', 'security', _this);
				}
				 * */
      if (!sessionStorage.account || !sessionStorage.token) {
        _this.$public.msg(_this.$t("apply.script[1]"), "warning", _this);
        _this.$public.go("login", 10, _this);
      } else if (!_this.userData.tpwd) {
        _this.$public.confirm(_this.$t("apply.script[2]"), "security", _this);
      } else if (_this.userData.smrz == false) {
        _this.$public.confirm(
          _this.$t("apply.script[3]"),
          "realname",
          _this
        );
        return false;
      } else if (_this.userData.status == 1) {
        _this.$public.confirm(
          _this.$t("apply.script[4]"),
          "realname",
          _this
        );
        return false;
      } else if (_this.userData.status == 2) {
        _this.$public.msg(_this.$t("apply.script[5]"), "warning", _this);
        return false;
      } else if (_this.userData.status == 4) {
        _this.$public.confirm(
          _this.$t("apply.script[6]"),
          "realname",
          _this
        );
        return false;
      }else {
        //判断是不是商家
        if (_this.userData.is_shop == "0") {
          //说明不是商家
          _this.openMobile();
        } else if (_this.userData.is_shop == "2") {
		  _this.$public.msg(_this.$t("apply.script[24]"), "warning", _this);
		  return false;
        } else if (_this.userData.is_shop == "3") {
		  _this.$public.msg(_this.$t("apply.script[25]"), "warning", _this);
		  return false;
        } else {
          return true;
        }
      }
    },
    openMobile() {
      var _this = this;
      this.$confirm(_this.$t("apply.script[7]"), _this.$t("apply.script[8]"), {
        confirmButtonText: _this.$t("apply.script[9]"),
        cancelButtonText: _this.$t("apply.script[10]"),
        type: "warning"
      })
        .then(() => {
          setTimeout(function() {
            _this.isDisplay = true;
          }, 500);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: _this.$t("apply.script[11]")
          });
        });
    },
    //解除商家
    removeApply() {
      var _this = this;
      this.$confirm(
        _this.$t("apply.script[12]"),
        _this.$t("apply.script[13]"),
        {
          confirmButtonText: _this.$t("apply.script[14]"),
          cancelButtonText: _this.$t("apply.script[15]"),
          type: "warning"
        }
      )
        .then(() => {
          //请求接口  解除成功后再请求个人中心接口
          _this.$http
            .post(_this.$http.del_shop, {})
            .then(function(response) {
              if (response.data.status == "200") {
                _this.$public.msg(
                  _this.$t("apply.script[16]"),
                  "success",
                  _this
                );
                _this.getData();
              } else {
                _this.$public.msg(response.data.msg, "warning", _this);
              }
            })
            .catch(function(error) {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: _this.$t("apply.script[17]")
          });
        });
    },
    close_moble() {
      var _this = this;
      _this.isDisplay = false;
    },
    //点击	出售、购买
    rout(val) {
      var _this = this;
      _this.isbuy = val;
      if (!_this.judge()) return false;
      _this.$router.push({
        path: val
      });
    },
    isok() {
      var _this = this;
      _this.close_moble();
      _this
        .$confirm(
          _this.$t("apply.script[18]") +
            _this.usdt +
            _this.$t("apply.script[19]"),
          _this.$t("apply.script[20]"),
          {
            confirmButtonText: _this.$t("apply.script[21]"),
            cancelButtonText: _this.$t("apply.script[22]"),
            type: "warning"
          }
        )
        .then(() => {
          //请求接口
          //					if(Number(_this.userData.wallone) < Number(_this.usdt)) {
          //						_this.$public.msg('您的余额不足，请充值', 'warning', _this);
          //						return false;
          //					}
          _this.$http
            .post(_this.$http.add_shop, {})
            .then(function(response) {
              if (response.data.status == "200") {
				_this.$public.msg(response.data.msg, "success", _this);
				_this.getData();
                //_this.$public.go(_this.isbuy, 10, _this);
              } else {
                _this.$public.msg(response.data.msg, "warning", _this);
              }
            })
            .catch(function(error) {});
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: _this.$t("apply.script[23]")
          });
        });
    },
    isno(){
      var _this = this;
      _this.isDisplay = false;
    }
  },
  created: function() {
    var _this = this;
    //
    _this.getData();
  }
};
</script>
