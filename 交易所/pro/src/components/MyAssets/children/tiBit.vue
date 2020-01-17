<style lang=less>
@import "../../../assets/public.less";
@import "./tiBit.less";
</style>
<template>
  <div class="ti_bit_wrapper">
    <table></table>
    <div class="ti_bit_container">
      <table></table>
      <div class="titles">
        <h2 style="padding-left: 30px">{{$t('zeusBi.tb[0]')}} >{{$t('tiBit.header[0]')}}</h2>
        <!-- <span @click="$router.push('/aKeySell')" class="right">{{$t('zeusBi.cb[13]')}}</span> -->
      </div>
      <div class="ti_top">
        <div class="ti_bit_inner">
          <el-form
            :label-position="labelPosition"
            status-icon
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="220px"
            class="tiBit_form"
          >
            <el-form-item :label="$t('tiBit.main[0]')" prop="addres" class="addreSelect">
              <el-input class="writeAdd" v-model="ruleForm.addres"></el-input>
              <el-select
                class="selectAdd"
                v-model="ruleForm.addres"
                :placeholder="$t('tiBit.main[1]')"
              >
                <el-option
                  v-for="(todo,index) in getBitArray"
                  :key="index"
                  :label="todo.qiaobao_url"
                  :value="todo.qiaobao_url"
                >
                  <span style="float: left">{{ todo.qiaobao_url }}</span> &nbsp;&nbsp;
                  <span
                    style="float: right; color: #8492a6; font-size: 13px"
                  >{{todo.notes}}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('tiBit.main[2]')" prop="num" class="highMoney">
              <el-input
                class="writeAdd"
                v-model.number="ruleForm.num"
                v-if="!limit.tb_min"
                :placeholder="$t('tiBit.main[3]')"
              ></el-input>
              <el-input v-model.number="ruleForm.num" :placeholder="$t('zeusBi.tb[3]')" v-else></el-input>
              <span>{{$t('zeusBi.tb[1]')}} {{biNum}}</span>
            </el-form-item>
            <el-form-item :label="$t('zeusBi.tb[2]')" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" :placeholder="$t('zeusBi.tb[4]')"></el-input>
            </el-form-item>
            <div class="code_warp">
              <el-form-item :label="$t('tiBit.main[5]')" prop="code">
                <el-input
                  v-model.number="ruleForm.code"
                  auto-complete="off"
                  :placeholder="$t('zeusBi.tb[5]')"
                ></el-input>
              </el-form-item>
              <div class="btn_code" @click="getCode()">
                <el-input type="button" :value="btnCode.time" :disabled="btnCode.disabled"></el-input>
              </div>
            </div>
            <el-form-item class="money" :label="$t('tiBit.main[6]')">
              <el-input v-if="limit.tb_fee" :placeholder="limit.tb_fee" disabled></el-input>
              <el-input v-else>--</el-input>
            </el-form-item>
            <el-form-item class="btn_sub">
              <el-button
                type="primary"
                class="goBit"
                :loading="loading"
                @click="submitForm('ruleForm')"
              >{{$t('tiBit.main[11]')}}</el-button>
            </el-form-item>
            <div class="tiBit">
              <div class="left">
                <span>{{$t('tiBit.main[8]')}}</span>
                <ul class="list">
                  <!-- <li>最小提币数量：200 USDT。</li> -->
                  <li>{{$t('tiBit.main[9]')}}</li>
                  <li>{{$t('tiBit.main[10]')}}</li>
                </ul>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog :title="$t('tiBit.main[12]')" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item :label="$t('tiBit.main[13]')" :label-width="formLabelWidth">
          <el-input v-model="dyGoodleCommand" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class="btn3">{{$t('tiBit.main[14]')}}</el-button>
        <el-button type="primary" @click="checkcode">{{$t('tiBit.main[15]')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
       loading:false,
      biNum: "",
      labelPosition: "top",
      wallone: "", // 账户总资产
      tb_fee: "", // 手续费
      pid: "",
      ruleForm: {
        addres: "",
        num: "",
        pass: "",
        code: ""
      },
      panme: "",
      getBitArray: [],
      rules: {
        addres: [
          {
            required: true,
            message: this.$t("tiBit.tips[0]"),
            trigger: "blur"
          }
        ],
        num: [
          {
            required: true,
            message: this.$t("tiBit.tips[1]"),
            trigger: "change"
          },
          {
            type: "number",
            message: this.$t("tiBit.tips[2]")
          }
        ],
        pass: [
          {
            required: true,
            message: this.$t("tiBit.tips[3]"),
            trigger: "change"
          }
        ],
        code: [
          {
            required: true,
            message: this.$t("tiBit.tips[4]"),
            trigger: "change"
          },
          {
            type: "number",
            message: this.$t("tiBit.tips[5]")
          }
        ]
      },
      btnCode: {
        time: this.$t("tiBit.tips[6]"), // 倒计时
        disabled: false
      },
      limit: "", // 提币限制
      code: "", // 页面标示
      status: "", // 判断是否实名认证
      dialogFormVisible: false,
      formLabelWidth: "80px",
      dyGoodleCommand: ""
    };
  },
  methods: {
    submitForm(formName) {
    
      var _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.goBit();
        } else {
          return false;
        }
      });
    },
    // 获取验证码函数
    getCode: function() {
      var _this = this;
      var mobile = sessionStorage.getItem("mobile");
      if (!mobile) {
        _this.$public.msg(_this.$t("tiBit.tips[7]"), "warning", _this);
        return;
      }
      if (mobile.indexOf("@") == -1) {
        _this.btnCode.disabled = true;

        //获取验证码
        _this.$http
          .post(_this.$http.send_sms, {
            mobile: mobile,
            type: 5
          })
          .then(function(res) {
            if (res.data.status == "200") {
              _this.$public.setTime(_this); //倒计时函数封装
            } else {
              _this.$public.msg(_this.$t("tiBit.tips[8]"), "warning", _this);
            }
          })
          .catch(function(error) {});
      } else {
        _this.btnCode.disabled = true;
        //获取验证码
        _this.$http
          .post(_this.$http.send_mail, {
            email: mobile
          })
          .then(function(response) {
             
            if (response.data.status == "200") {
              _this.$public.setTime(_this); //倒计时函数封装
            } else {
              _this.$public.msg(response.data.msg, "warning", _this);
              _this.btnCode.disabled = false;
            }
          })
          .catch(function(error) {
            _this.btnCode.disabled = false;
            _this.$public.msg(_this.$t("tips.main[4]"), "warning", _this);
          });
      }
    },
    // 提币
    goBit: function() {
      var _this = this;
      if (
        _this.ruleForm.num > _this.limit.tb_max ||
        _this.ruleForm.num < _this.limit.tb_min
      ) {
        _this.$public.msg(
          _this.$t("tiBit.tips[8]") +
            _this.limit.tb_min +
          _this.$t("tiBit.tips[9]") +
            _this.limit.tb_max +
            _this.$t("tiBit.tips[10]"),
          "warning",
          _this
        );
        return false;
      } else if (_this.auth_status == 1) {
        _this.$public.confirm(_this.$t("tiBit.tips[12]"), "identity", _this);
        return false;
      } else if (_this.auth_status == 2) {
        _this.$public.msg(_this.$t("tiBit.tips[13]"), "warning", _this);
        return false;
      } else if (_this.auth_status == 4) {
        _this.$public.confirm(_this.$t("tiBit.tips[14]"), "identity", _this);
        return false;
      }
      var mobile = sessionStorage.getItem("mobile");
      var is_start_google = sessionStorage.getItem("is_start_google");
      // if (is_start_google != "1") {
      if (true) {
        _this.loading = true
        _this.$http
          .post(_this.$http.goBit, {
            num: _this.ruleForm.num,
            pid: _this.pid,
            tpwd: _this.ruleForm.pass,
            code: _this.ruleForm.code,
            address: _this.ruleForm.addres,
            account: mobile
          })
          .then(res => {
          _this.loading = false
            if (res.data.status == "200") {
              _this.$public.msg(res.data.msg, "success", _this);
              this.initForm();
              setTimeout(function() {
                _this.$router.go(-1); //返回上一层
              }, 800);
            } else {
              _this.$public.msg(res.data.msg, "warning", _this);
              this.initForm();
            }
          }).catch((error)=>{_this.loading = false});
      }
      // } else {
      //   _this.dialogFormVisible = true;
      // }
    },
    // 弹出谷歌验证框
    checkcode() {
      const _this = this;
      var mobile = sessionStorage.getItem("mobile");
      if (_this.dyGoodleCommand == "") {
        _this.$public.msg("请输入谷歌验证码", "warning", _this);
        return false;
      }
      let data = {
        dyGoodleCommand: _this.dyGoodleCommand
      };
      _this.$http.post(_this.$http.check_google_code, data).then(function(res) {
        if (res.data.status == "200") {
          _this.dialogFormVisible = false;
          _this.$http
            .post(_this.$http.goBit, {
              num: _this.ruleForm.num,
              pid: _this.pid,
              tpwd: _this.ruleForm.pass,
              code: _this.ruleForm.code,
              address: _this.ruleForm.addres,
              account: mobile
            })
            .then(res => {
              if (res.data.status == "200") {
                _this.$public.msg(res.data.msg, "success", _this);
                this.initForm();
                setTimeout(function() {
                  _this.$router.go(-1); //返回上一层
                }, 800);
              } else {
                _this.$public.msg(res.data.msg, "warning", _this);
                _this.dialogFormVisible = false;
                this.initForm();
              }
            });
        } else {
          _this.$public.msg(res.data.msg, "warning", _this);
          _this.dialogFormVisible = false;
        }
      });
    },
    // 获得提币限制条件
    get_tb() {
      var _this = this;
      _this.$http
        .get(_this.$http.get_tb, { params: { pid: _this.pid } })
        .then(function(response) {
          if (response.data.status == "200") {
            _this.limit = response.data.data;
            _this.biNum = response.data.data.balance
            // 提币范围 手续费
          }
        })
        .catch(function(error) {});
    },
    getData() {
      var _this = this;
      _this.$http
        .post(_this.$http.user_info, {})
        .then(function(response) {
          if (response.data.status == "200") {
            _this.status = response.data.data.status;
          } else if (response.data.status == "0") {
            _this.$public.confirm(_this.$t("tiBit.tips[15]"), "login", _this);
          }
        })
        .catch(function(error) {});
    },
    getBitAddre: function() {
      var _this = this;
      _this.$http.get(_this.$http.addrList, { params: {} }).then(res => {
        if (res.data.status == "200") {
          if (_this.pname == "BTC" || _this.pname == "USDT") {
            _this.getBitArray = res.data.data.btc;
          } else if (_this.pname == "ETH" || _this.pname == "BF") {
            _this.getBitArray = res.data.data.eth;
          } else {
            _this.getBitArray = res.data.data.eth;
          }
          _this.tb_fee = res.data.data.tb_fee;
        }
      });
    },
    initForm: function() {
      var _this = this;
      this.$refs["ruleForm"].resetFields();
    }
  },
  created: function() {
    // BTC 和  USDT是 比特币
    // _this.$public.msg('稍后开放', 'warning', _this);
    // ETH 和 BF  以太坊
    var _this = this;
    _this.code = this.$route.query.code;
    _this.pname = this.$route.query.pname;
    _this.pid = this.$route.query.pid;
    _this.getBitAddre();
    _this.get_tb();
    _this.getData();
    // _this.biNum = _this.$route.query.usable;
  }
};
</script>
