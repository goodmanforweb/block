<style lang=less>
@import "../../assets/public.less";
@import "./frenchOrder.less";
.ss_reason {
  resize: none;
  height: 100px;
  border: 1px solid #eee;
  width: 295px;
}
</style>
<template lang="html">
	<section class="frenchOrder">
		<div class="frenchOrder_mian" style="min-height: 650px;">
			<!-- <div class="frenchOrder_header_text">{{$t('frenchOrder.main[0]')}}</div> -->
			<div class="frenchcurrency_header">
				<h1 class="order_tishi" v-if="order.type == '1'">{{$t('frenchOrder.main[2]')}}
					<span v-if="order.oop_name">{{order.oop_name}}</span>
					<span v-else="order.oop_mobile">{{order.oop_mobile}}</span>
					<span class="col">{{$t('frenchOrder.main[3]')}}</span>{{order.total_num}}USDT
				</h1>

				<h1 class="order_tishi" v-else>{{$t('frenchOrder.main[2]')}}
					<span v-if="order.oop_name">{{order.oop_name}}</span>
					<span v-else="order.oop_mobile">{{order.oop_mobile}}</span>
					<span class="col">{{$t('frenchOrder.main[4]')}}</span>{{order.total_num}}USDT
				</h1>

				<div class="order_two">
						<h2 class="order_hao">{{$t('frenchOrder.main[1]')}}{{order.order_num}}</h2>
						<h6 v-if="order.status=='1'">{{$t('frenchOrder.main[8]')}}</h6>			<!--待付款 -->
						<h6 v-if="order.status=='2' && order.type == '2'">{{$t('frenchOrder.main[13]')}}</h6>		<!--已付款 -->
						<h6 v-if="order.status=='2' && order.type == '1'">{{$t('frenchOrder.main[35]')}}</h6>		     <!--代放币 -->
						<h6 v-if="order.status=='3'">{{$t('frenchOrder.main[15]')}}</h6>    <!--已完成 -->
						<h6 v-if="order.status=='4'">{{$t('frenchOrder.main[16]')}}</h6>    <!--申诉中 -->
						<h6 v-if="order.status=='5'">{{$t('frenchOrder.main[18]')}}</h6>		<!--取消 -->
				</div>

				<h3 class="order_dan">{{$t('frenchOrder.main[5]')}}：{{order.price}}&nbspCNY</h3>
				<h3 class="order_dan">{{$t('frenchOrder.main[35]')}}：{{order.total_num}}&nbspUSDT</h3>
				<h4 class="order_zong">{{$t('frenchOrder.main[6]')}}：<span>{{order.total_price}}&nbspCNY</span></h4>
			</div>
			<!-- 对方联系方式 -->
			<div class="ohterQQ">
				<h6>{{$t("fbOrder.other[1]")}}：{{order.oop_name}}</h6>
				<h6>{{$t("fbOrder.other[0]")}}：{{order.oop_mobile}}
				</h6>

			</div>

			<!-- 付款方式 -->
			<ul class="Payment_method">
				<h2>{{$t("fbOrder.other[2]")}}：</h2>
				<li class="" v-for='item in order.pay_list'>
					<i class="iconfont icon-weixin" v-if='item.type == "wx"'></i>
					<i class="iconfont icon-zhifubao" v-else-if='item.type == "alipay"'></i>
					<i class="iconfont icon-yinhangka" v-else-if='item.type == "backcard"'></i>
					<i class="iconfont icon-socialpaypal" v-else-if='item.type == "paypal"'></i>
					<!-- <span>{{item.tip}}</span> -->
					<p v-if="item.type == 'backcard'">{{$t("fbOrder.other[3]")}}</p>
					<!-- <p class="num" id="para">{{item.number}}</p> -->
					<input type="text" v-if="item.type == 'backcard'" id="para" v-model="item.number" readonly>
					<p v-else>{{item.number}}</p>
					<!-- 收款人姓名： -->
					<p v-if="item.type=='backcard'">{{$t("fbOrder.other[4]")}}：</p>
					<p>{{item.bank}}</p>
					<!-- 开户银行和支行： -->
					<p v-if="item.type=='backcard'">{{$t("fbOrder.other[5]")}}：</p>
					<p>{{item.branch}}</p>
					<el-popover placement="right" width="220" trigger="hover" v-if='item.img'>
						<img :src="item.img" width="220">
						<i slot="reference" class="iconfont icon-erweima"></i>
					</el-popover>
					<!-- 复制 -->
					<!-- <span @click="copy('para')" class="copy" v-if="item.type == 'backcard'">{{$t('frenchOrder.main[38]')}}</span> -->
				</li>
			</ul>
			<!-- 出售订单 -->
			<div class="Payment_results" v-if="order.type == '1'">
				<h1 class="results_header" v-if="order.status=='1'">{{$t('frenchOrder.main[8]')}}{{order.oop_name}} {{$t('frenchOrder.main[9]')}} <span class="time">{{countdowntime}}</span><span>{{$t('frenchOrder.main[10]')}},{{$t('frenchOrder.main[11]')}}:{{order.refer}}</span></h1>

				<div class="results_main" v-if="order.status=='1'">
					<div class="results_btn one">{{$t('frenchOrder.main[12]')}}</div>
					<!--<div class="results_text">
						<i class="el-icon-warning"></i> 付款成功后,请点击按钮告知对方
					</div>-->
				</div>

				<h1 class="results_header" v-if="order.status=='2'">{{$t('frenchOrder.main[34]')}}({{order.refer}})</h1>

				<!-- 图标提醒 -->

				<div class="results_text" style="display:flex;" v-if="order.status=='2'">
					<i class="el-icon-warning" style="color:#2A64F3 !important;line-height: 30px;margin-right:10px;"></i>
					<p style="color:#bbbbbb !important;line-height:30px;">{{$t('frenchOrder.main[37]')}}“<span   style="color:#2A64F3 !important;">{{$t('frenchOrder.main[38]')}}</span>”
						{{$t('frenchOrder.main[39]')}}<span class="payTime">{{payTime}}</span><br>
						{{$t('frenchOrder.main[40]')}};
					</p>
				</div>

				<div class="results_main" v-if="order.status=='2'">
					<div class="results_btn one" @click="YesGet()">{{$t('frenchOrder.main[14]')}}</div>
					<span class="shensu" @click="Submissioncomplaint()">{{$t('frenchOrder.main[33]')}}</span>
				</div>

				<h1 class="results_header" v-if="order.status=='3'">{{$t('frenchOrder.main[29]')}}：&nbsp{{order.refer}}</h1>
				<div class="results_main" v-if="order.status=='3'">
					<div class="falr">
						<i class="el-icon-success"></i>
					</div>
					<!--<span class="ok">开始交易吧！</span>-->
				</div>
				<h1 class="results_header" v-if="order.status=='4'">{{$t('frenchOrder.news[0]')}}{{order.command}} &nbsp&nbsp{{$t('frenchOrder.news[1]')}}:{{order.refer}}</h1>
				<div class="results_main" v-if="order.status=='4'">
					<div class="there">
						{{$t('frenchOrder.tip[1]')}}
					</div>
				</div>
				<div class="results_main" v-else-if="order.status=='5'">
					<div class="results_btn">{{$t('frenchOrder.main[18]')}}</div>
					<div class="results_text">
						<i class="el-icon-warning"></i> {{$t('frenchOrder.main[19]')}}
					</div>
				</div>
			</div>
			<!-- 购买订单 -->
			<div class="Payment_results" v-else>
				<h1 class="results_header" v-if="order.status=='1'">{{$t('frenchOrder.main[20]')}}，{{$t('frenchOrder.main[21]')}}  <span class="time">{{countdowntime}}</span><span>{{$t('frenchOrder.main[22]')}}{{order.oop_name}}{{$t('frenchOrder.main[23]')}}{{order.num}}&nbsp&nbsp&nbsp{{$t('frenchOrder.main[24]')}}:&nbsp{{order.refer}}</span></h1>
				<div class="results_text" style="display:flex;" v-if="order.status=='1'">
						<i class="el-icon-warning" style="color:#2A64F3 !important;line-height: 30px;margin-right:10px;"></i>
						<p style="color:#bbbbbb !important;line-height:30px;">
							{{$t('frenchOrder.main[43]')}}
							<span style="color:#2A64F3">{{$t('frenchOrder.main[44]')}}</span>
							<br>
							{{$t('frenchOrder.main[46]')}}
						</p>
					</div>
				<div class="results_main" v-if="order.status=='1'">
					<div class="results_btn one" @click="signorder()">{{$t('frenchOrder.main[25]')}}</div>

					<div class="Cancellation">
							<span @click="Cancellation()" v-show="order.status == 1">{{$t('frenchOrder.main[32]')}}</span>
							<span @click="Submissioncomplaint()" v-show="Number(order.status) == 2 &&  order.type == '1' ">{{$t('frenchOrder.main[33]')}}</span>
						</div>
				</div>
				<h1 class="results_header" v-if="order.status=='2'">{{$t('frenchOrder.main[27]')}}:{{order.refer}}</h1>
				<div class="results_main" v-if="order.status=='2'">
					<!--<div class="results_btn one" @click="YesGet()">等待对方放币</div>-->
					<div class="results_btn two">{{$t('frenchOrder.main[28]')}}</div>
					<span class="payTime">{{payTime}}</span>
				</div>
				<h1 class="results_header" v-if="order.status=='3'">{{$t('frenchOrder.main[29]')}}：&nbsp{{order.refer}}</h1>
				<div class="results_main" v-if="order.status=='3'">
					<div class="falr">
						<i class="el-icon-success"></i>
					</div>
					<!--<span class="ok">开始交易吧！</span>-->
				</div>
				<h1 class="results_header" v-if="order.status=='4'">{{$t('frenchOrder.news[0]')}}：{{order.command}} &nbsp&nbsp{{$t('frenchOrder.news[1]')}}:{{order.refer}}</h1>
				<div class="results_main" v-if="order.status=='4'">
					<div class="there">
						<!-- {{$t('frenchOrder.tip[0]')}} -->
						{{$t('frenchOrder.otherTip[0]')}}
					</div>
				</div>
				<div class="results_main" v-else-if="order.status=='5'">
					<div class="results_btn">{{$t('frenchOrder.main[18]')}}</div>
					<div class="results_text">
						<i class="el-icon-warning"></i> {{$t('frenchOrder.main[19]')}}
					</div>
				</div>
			</div>
			<ul class="Agreement_mian">
				<h6>{{$t('frenchOrder.main[36]')}}</h6>
				<li v-for="item in Agreement" v-show="order.type==2">{{item.text}}</li>
				<li v-for="item in Agreement2" v-show="order.type== 1">{{item.text}}</li>
			</ul>
		</div>
		<!-- 弹出框 -->
		<el-dialog :title="$t('frenchOrder.popup[0]')" width="440px" :visible.sync="dialogTableVisible">
			<div>
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item :label="$t('frenchOrder.popup[1]')">
						<el-select v-model="form.ss_type" :placeholder="$t('frenchOrder.popup[2]')">
							<!--<el-option label="对方未放行" value="对方未放行"></el-option>-->
							<el-option :label="$t('frenchOrder.popup[3]')" :value="$t('frenchOrder.popup[3]')"></el-option>
							<el-option :label="$t('frenchOrder.popup[4]')" :value="$t('frenchOrder.popup[4]')"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item :label="$t('frenchOrder.popup[5]')">
						<!-- <el-input type="textarea" v-model="form.ss_reason"></el-input> -->
						<textarea  v-model="form.ss_reason" class="ss_reason">
						</textarea>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTableVisible = false">{{$t('frenchOrder.popup[6]')}}</el-button>
				<el-button type="primary" @click="Submission()">{{$t('frenchOrder.popup[7]')}}</el-button>
			</div>
		</el-dialog>
		<!--交易弹窗-->
		<div tabindex="-1"  role="dialog" aria-modal="true" :aria-label="$t('frenchOrder.popup[8]')" class="el-message-box__wrapper" style="z-index: 2088;" v-show="shows">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span>{{$t('frenchOrder.main[14]')}}</span>
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn"  @click="shows = false">
						<i class="el-message-box__close el-icon-close" @click="shows = false"></i>
					</button>
				</div>
				<div class="el-message-box__content">
					<!---->
					<div class="el-message-box__message">
						<p>{{$t('frenchOrder.popup[9]')}}</p>
					</div>
					<div class="el-message-box__input">
						<div class="el-input">
							<input type="password" autocomplete="off" placeholder="" class="el-input__inner" v-model="tpwd">
						</div>
						<div class="el-message-box__errormsg" style="visibility: hidden;"></div>
					</div>
				</div>
				<div class="el-message-box__btns"><button type="button" class="el-button el-button--default el-button--small" @click="shows = false">
					<span>{{$t('frenchOrder.popup[6]')}}</span>
				</button>
					<button type="button" class="el-button el-button--default el-button--small el-button--primary " @click="overOrder()">
					<span>{{$t('frenchOrder.popup[7]')}}</span>
				</button>
				</div>
			</div>
		</div>
		<div class="v-modal" tabindex="0" style="z-index: 200;" v-show="shows"></div>

	</section>
</template>
<script>
export default {
  data () {
    return {
      Agreement: [
        {
          text: this.$t('frenchOrder.script[0]')
        },
        {
          text: this.$t('frenchOrder.script[1]')
        },
        {
          text: this.$t('frenchOrder.script[2]')
        }
      ],
      Agreement2: [
        {
          text: this.$t('frenchOrder.script[3]')
        },
        {
          text: this.$t('frenchOrder.script[4]')
        },
        {
          text: this.$t('frenchOrder.script[5]')
        }
      ],
      order: {},
      TimeData: null,
      countdown: null,
      countdowntime: null,
      qr_time: null, // 确认支付倒计时
      payTime: null, // 渲染到页面的倒计时
      setIntervaltime: null,
      dialogTableVisible: false,
      shows: false,
      tpwd: '', // 资金密码
      form: {
        ss_type: this.$t('frenchOrder.script[6]'),
        ss_reason: ''
      },
      set: null, // 交易倒计时定时器
      payedSet: null // 待放行倒计时
    }
  },
  methods: {
    // 取消订单
    Cancellation () {
      var connet = this
      connet
        .$confirm(
          connet.$t('frenchOrder.script[7]'),
          connet.$t('frenchOrder.popup[8]'),
          {
            confirmButtonText: connet.$t('frenchOrder.popup[7]'),
            cancelButtonText: connet.$t('frenchOrder.popup[6]'),
            type: 'warning'
          }
        )
        .then(() => {
          if (connet.order.status != 1) {
            connet.$public.msg(
              connet.$t('frenchOrder.script[8]'),
              'warning',
              connet
            )
            return false
          }
          connet.Cancellationdata()
        })
        .catch(() => {
          connet.$message({
            type: 'info',
            message: connet.$t('frenchOrder.script[9]')
          })
        })
    },
    // 取消订单数据
    Cancellationdata () {
      var connet = this
      var re_order = {
        order_num: connet.order.order_num
      }
      connet.$http
        .post(connet.$http.re_order, re_order)
        .then(function (response) {
          if (response.data.status == '0') {
            //						connet.huqushuju();
            connet.getDataSet()
            connet.$message({
              type: 'success',
              message: connet.$t('frenchOrder.script[10]')
            })
            connet.$router.push({
              path: '/frenchcurrency'
            })
          } else {
            connet.$message({
              type: 'info',
              type: 'success',
              message: response.data.msg
            })
          }
        })
        .catch(function (error) {})
    },
    // 获取订单信息
    huqushuju () {
      var connet = this
      var hu = JSON.parse(unescape(window.sessionStorage.order))
      connet.CountDown(hu.data.order_num)
    },
    // 标记已付款
    signorder () {
      var connet = this
      connet
        .$confirm(
          connet.$t('frenchOrder.script[11]') +
            '<span style="color:red">' +
            connet.$t('frenchOrder.script[12]') +
            '</span>',
          connet.$t('frenchOrder.script[13]'),
          {
            confirmButtonText: connet.$t('frenchOrder.popup[7]'),
            cancelButtonText: connet.$t('frenchOrder.popup[6]'),
            type: 'warning',
            dangerouslyUseHTMLString: true
          }
        )
        .then(() => {
          var setOrderStatus = {
            order_no: connet.order.order_num
          }
          connet.$http
            .post(connet.$http.setOrderStatus, setOrderStatus)
            .then(function (response) {
              if (response.data.status == '200') {
                connet.getDataSet()
                connet.$message({
                  type: 'success',
                  message: connet.$t('frenchOrder.script[14]')
                })
              } else {
                connet.$message({
                  type: 'info',
                  message: response.data.msg
                })
              }
            })
            .catch(function (error) {})
        })
        .catch(() => {
          connet.$message({
            type: 'info',
            message: connet.$t('frenchOrder.script[9]')
          })
        })
    },
    // 倒计时（刷新数据接口）
    CountDown (order_num) {
      var connet = this
      connet.order_order_num = order_num //订单号
      var myData = new Date()
      //				clearInterval(connet.setIntervaltime);
      connet.getDataSet()
      connet.setIntervaltime = window.setInterval(function () {
        connet.getDataSet()
      }, 5000)
    },
    // 请求数据接口

    getDataSet () {
      var connet = this
      var orderDetaildata = {
        order_num: connet.order_order_num
      }
      connet.$http
        .post(connet.$http.orderDetail, orderDetaildata)
        .then(function (response) {
          if (response.data.status == '200') {
            connet.order = response.data.data
            connet.TimeData = response.data.data.add_time
            connet.countdown = response.data.data.down_time //订单倒计时
            connet.qr_time = response.data.data.qr_time //确定支付倒计时
            //						status = response.data.data.status;
            connet.chusouSet(
              response.data.data.status,
              response.data.data.down_time
            )
            //状态是2 定时器走起来
            if (response.data.data.status == 2) {
              connet.payed()
            } else {
              // 当是这个状态时 把这个定时器干掉
              clearInterval(connet.payedSet)
            }
          }
        })
        .catch(function (error) {})
    },
    // 待出售倒计时
    chusouSet (status, time) {
      // 需要两个参数（此时订单的状态，当前剩余时间）
      // 倒计时 执行函数
      var connet = this
      var shijian
      connet.set = window.setInterval(function () {
        switch (status) {
          case '1':
            shijian = time / 60
            connet.countdowntime =
              parseInt(shijian) +
              connet.$t('frenchOrder.script[15]') +
              (time % 60) +
              connet.$t('frenchOrder.script[16]')
            break;
          case '2':
            break
          default:
            window.clearInterval(connet.setIntervaltime)
            break;
        }
        time = time <= 0 ? 0 : --time
        if (time == 0) {
          connet.countdowntime = connet.$t('frenchOrder.script[18]') + '...';
          clearInterval(connet.set)
        }
      }, 1000)
    },
    // 待支付倒计时
    payed () {
      var _this = this
      //关闭交易倒计时 执行这个倒计时时说明交易倒计时已不存在
      window.clearInterval(_this.set)
      //为了防止意外多起定时器 先把自己给干掉
      window.clearInterval(_this.payedSet)
      _this.payedSet = setInterval(function () {
        var shi = _this.qr_time / 60
        _this.payTime =
          parseInt(shi) +
          _this.$t('frenchOrder.script[15]') +
          (_this.qr_time % 60) +
          _this.$t('frenchOrder.script[17]')
        _this.qr_time--
        if (_this.qr_time < 0) {
          _this.qr_time = 0
          _this.payTime = _this.$t('frenchOrder.script[18]') + '...';
          clearInterval(_this.payedSet)
        }
      }, 1000)
    },
    // 复制
    copy: function (para) {
      // 复制函数
      var _this = this
      var ele = document.getElementById(para)
      ele.select()
      document.execCommand('Copy')
      _this.$public.msg(_this.$t('google_verify.script[3]'), 'success', _this)
    },
    // 结束订单
    overOrder () {
      var _this = this
      if (!_this.$public.pwd(_this.tpwd)) {
        _this.$public.msg(
          connet.$t('frenchOrder.script[19]'),
          'warning',
          _this
        )
        return false
      }
      // 请求接口
      _this.$http
        .post(_this.$http.confirm, {
          order_no: _this.order.order_num,
          tpwd: _this.tpwd
        })
        .then(function (response) {
          if (response.data.status == '200') {
            _this.getDataSet()
            _this.$public.msg(response.data.msg, 'success', _this)
            _this.shows = false
          } else {
            _this.$public.msg(response.data.msg, 'warning', _this)
          }
        })
        .catch(function (error) {})
    },
    // 对方已付款请确认放币 点击事件
    YesGet () {
      var _this = this
      _this.tpwd = '';
      _this.shows = true
    },
    // 申诉点击弹框
    Submissioncomplaint () {
      var connet = this
      connet.form.ss_reason = '';
      connet.dialogTableVisible = true
    },
    // 申诉提交
    Submission () {
      var connet = this
      var ss_reason = connet.form.ss_reason.replace(/\s/g, '')
      if (!ss_reason) {
        connet.$public.msg(
          connet.$t('frenchOrder.script[20]'),
          'warning',
          connet
        )
        return false
      }
      connet.dialogTableVisible = false
      var post_allege = {
        order_num: connet.order.order_num,
        refer: connet.order.refer,
        ss_type: connet.form.ss_type,
        ss_reason: connet.form.ss_reason,
        shop_account: connet.order.oop_account,
        status: connet.order.status
      }
      connet.$http
        .post(connet.$http.post_allege, post_allege)
        .then(function (response) {
          if (response.data.status == '200') {
            connet.getDataSet()
            connet.$message({
              type: 'success',
              message: connet.$t('frenchOrder.script[21]')
            })
          } else {
            connet.$message({
              type: 'info',
              message: response.data.msg
            })
          }
        })
        .catch(function (error) {})
    },
    // 干掉定时器
    offTime () {
      var connet = this
      clearInterval(connet.setIntervaltime)
      clearInterval(connet.set)
      clearInterval(connet.payedSet)
    }
  },
  // 路由改变时
  beforeRouteLeave (to, from, next) {
    next()
  },
  watch: {
    'form.ss_reason': function (val, oval) {
      this.form.ss_reason = val
    }
  },
  created: function () {
    var connet = this
    connet.huqushuju()
  }
}
</script>
