<template>
	<div class="security_main">
		<div class="security_main_title">
			<h2>{{$t('security.header[0]')}}</h2>
		</div>
		<!--基本信息-->
		<div class="information">
			<div class="information_header">
				<h2>{{$t('security.main[0]')}}</h2>
			</div>
			<div class="information_cont">
				<ul class="lis_warp">
					<!-- 账号 -->
					<li class="lis">
						<span class="name">{{$t('security.main[1]')}}:</span>
						<span class="num">{{userData.mobile==false?userData.email:userData.mobile}}</span>
					</li>
					<li class="lis">
						<span class="name">UID:</span>
						<span class="num">{{userData.uid}}</span>
					</li>
					<!-- 账户等级 -->
					<li class="lis">
						<span class="name">{{$t('security.main[6]')}}:</span>
						<span class="num" v-if="money1 >wallone">--</span>
						<span class="num" v-else-if="money1 <= wallone && wallone < money2">{{$t('security.else1[0]')}}VIP1,{{$t('security.else1[1]')}}{{free1?free1:'--'}}%</span>
						<span class="num" v-else-if="money2 <= wallone && wallone < money3">{{$t('security.else1[0]')}}VIP2,{{$t('security.else1[1]')}}{{free2?free2:'--'}}%</span>
						<span class="num" v-else-if="money3 <= wallone && wallone < money4">{{$t('security.else1[0]')}}VIP3,{{$t('security.else1[1]')}}{{free3?free3:'--'}}%</span>
						<span class="num" v-else-if="money4 <= wallone && wallone < money5">{{$t('security.else1[0]')}}VIP4,{{$t('security.else1[1]')}}{{free4?free4:'--'}}%</span>
						<span class="num" v-else>{{$t('security.else1[0]')}}VIP5,{{$t('security.else1[1]')}}{{free5?free5:'--'}}%</span>
					</li>
					<!-- 密码 -->
					<li class="lis">
						<span class="name">{{$t('security.main[2]')}}:</span>
						<span class="num">{{userData.opwd}}</span>
						<a href="javascript:;" class="modify" @click="change_router('changeopwd')"><span>{{$t('security.main[3]')}}</span></a>
					</li>
					<!-- 资金密码 -->
					<li class="lis">
						<span class="name">{{$t('BITPUIChange.main[0]')}}</span>
						<span class="num">{{userData.tpwd==false?'--':userData.tpwd}}</span>
						<a href="javascript:;" class="modify" @click="change_router('changetpwd')" v-if="!userData.tpwd"><span>{{$t('security.main[5]')}}</span></a>
						<a href="javascript:;" class="modify" @click="change_router('changetpwd')" v-else ><span>{{$t('security.main[3]')}}</span></a>
					</li>
				</ul>
			</div>
		</div>
		<!--双重身份验证-->
		<div class="authentication">
			<div class="authentication_header">
				<h2>{{$t('security.main[7]')}}</h2>
			</div>
			<div class="authentication_cont">
				<ul class="lis_warp">
					<!-- 安全等级 -->
					<li class="lis gj_warp">
						<span class="name">{{$t('security.verification[1]')}}:</span>
						<span class="num">
							<div class="grade_warp">
								<span class="grade" v-if="userData.user_level == 1">{{$t('security.verification[2]')}}</span>
								<span class="grade" v-else-if="userData.user_level == 2">{{$t('security.verification[3]')}}</span>
								<span class="grade"  v-else-if="userData.user_level ==3">{{$t('security.verification[4]')}}</span>
								<span class="grade"  v-else>--</span>
							</div>
						</span>
						<a class="modify" v-if="userData.user_level"><span>{{$t('security.tip[0]')}}</span></a>
						<a class="modify" v-else><span>{{$t('security.tip[1]')}}</span></a>
						<span class="info">{{$t('security.tips[0]')}}</span>
					</li>
					<!-- 邮箱 -->
					<li class="lis">
						<span class="name">{{$t('security.verification[6]')}}:</span>
						<span class="num" v-if="userData.email">{{userData.email}}</span>
						<span class="num" v-else>{{$t('security.verification[13]')}}</span>
						<a href="javascript:;" class="modify" @click="change_router('changeemail')" v-if="!userData.email"><span>{{$t('security.tip[2]')}}
							</span></a>
						<a href="javascript:;" class="modify" v-else><span>{{$t('security.verification[14]')}}</span></a>
						<!-- {{$t('security.verification[7]')}} -->
						<span class="info">{{$t('BITPUIChange.main[1]')}}</span>
					</li>
					<!-- 手机号 -->
					<li class="lis">
						<span class="name">{{$t('security.verification[9]')}}:</span>
						<span class="num" v-if="userData.mobile">{{userData.mobile}}</span>
						<span class="num" v-else>{{$t('security.verification[13]')}}</span>
						<a href="javascript:;" class="modify" v-if="userData.mobile"><span>{{$t('security.verification[14]')}}</span></a>
						<a href="javascript:;" class="modify" @click="change_router('changemobile')" v-else><span>{{$t('security.tip[2]')}}</span></a>
						<span class="info">{{$t('security.verification[10]')}}</span>
					</li>
					<!-- 身份认证 -->
					<li class="lis">
						<span class="name">{{$t('security.tips[1]')}}</span>
						<span class="num" v-if="userData.status == 3">{{$t('security.tip[3]')}}</span>
						<span class="num" v-else>{{$t('security.tip[4]')}}</span>
						<a href="javascript:;" class="modify"  v-if="userData.status !=3" @click="change_router('/realname')"><span>{{$t('security.tip[6]')}}</span></a>
						<a href="javascript:;" class="modify" v-else-if="userData.status == 3 && userData.auth_status == 1" @click="change_router('/senior')"><span>{{$t('security.tip[7]')}}</span></a>
						<a href="javascript:;" class="modify" v-else-if="userData.status == 3 && userData.auth_status == 4" @click="change_router('/senior')"><span>{{$t('security.tipss[0]')}}</span></a>
						<a href="javascript:;" class="modify" v-else-if="userData.status == 3 && userData.auth_status == 2"><span>{{$t('identity.main[3]')}}</span></a>
						<a href="javascript:;" class="modify" v-else-if="userData.status == 3 && userData.auth_status == 3"><span>{{$t('security.tips[2]')}}</span></a>
						<span class="info">{{$t('security.verification[5]')}}</span>
					</li>
					<!-- 谷歌验证 -->
					 <li class="lis">
						<span class="name">{{$t('security.tips[3]')}}</span>
						<span class="num" v-if="userData.google == '0'">{{$t('security.tip[4]')}}</span>
						<span class="num" v-else>{{$t('security.tip[3]')}}</span>
						<a href="javascript:;" class="modify" @click="change_router('googleverify')" v-if="userData.google == 0"><span>{{$t('security.tip[5]')}}</span></a>
						<a href="javascript:;" class="modify" @click="close"  v-else-if="userData.google == 1 && userData.is_start_google == 1"> <span>{{$t('security.tip[8]')}}</span></a>
						<a href="javascript:;" class="modify" @click="open"  v-else-if="userData.google == 1 &&　userData.is_start_google == 0"> <span>{{$t('security.tip[9]')}}</span></a>
						<span class="info">{{$t('security.verification[15]')}}</span>
					</li>
					<!-- 商家验证 -->
					<li class="lis">
						<span class="name">{{$t('security.tips[4]')}}</span>
						<span class="num" v-if="userData.is_shop==0">{{$t('security.tip[4]')}}</span>
						<span class="num" v-else>{{$t('security.tip[3]')}}</span>
						<a href="javascript:;" v-if="userData.is_shop==0" class="modify" @click="auth"><span>{{$t('security.tip[5]')}}</span></a>
						<a href="javascript:;" v-else class="modify" @click="relieve"><span>{{$t('security.tip[10]')}}</span></a>
						<span class="info">{{$t('security.tips[5]')}}</span>
					</li>
				</ul>
			</div>
		</div>
		<!-- 支付方式 -->
		<div class="payment">
			<div class="payment_header">
				<h2>{{$t('security.pay[0]')}}</h2>
				<p class="tishi">{{$t('security.pay[1]')}}</p>
			</div>
			<div class="payment_cont">
				<div class="obox_null obox" v-show="payMethod.length == 0">
					<p>{{$t('security.pay[2]')}}</p>
					<p class="add_pay" @click="add_pay()">{{$t('security.pay[3]')}}</p>
				</div>
				<div class="obox_show obox" v-show="payMethod.length!=0">
					<ul class="lis_warp">
						<li class="lis" v-for="(v,k) in payMethod" :key="k">
							<i v-if="v.type == 'wx'">
								<i class="icon iconfont icon-weixin wx"></i>
							</i>
							<i v-else-if="v.type == 'alipay'">
								<i class="icon iconfont icon-zhifubao alipay"></i>
							</i>
							<i v-else-if="v.type == 'backcard'">
								<i class="icon iconfont icon-yinhangka car"></i>
							</i>
							<i v-else-if="v.type == 'paypal'">
								<i class="icon iconfont icon-socialpaypal paypal"></i>
							</i>
							<span class="type">{{v.tip}}</span>
							<span class="mobile">{{v.number}}</span>
							<span class="name">{{v.name}}</span>
							<span class="eit" @click="edit(v.id,v.type,k)" v-show="payMethod[k].status != 0">{{$t('security.pay[4]')}}</span>
							<span class="" v-show="payMethod[k].status == 0">{{$t('security.pay[5]')}}</span>
							<el-switch v-model="payMethod[k].status" @change="changeSwitch(payMethod[k].status , v.type)" active-color="#2A64F3" inactive-color="#dcdfe6" active-value='1' inactive-value='0'>
							</el-switch>
						</li>
					</ul>
					<div class="add_play" v-show="!(payMethod.length > 2)">
						<span @click="add_pay()">{{$t('security.pay[6]')}}</span>
					</div>
				</div>
			</div>
		</div>
		<!--支付弹框-->
		<div tabindex="-1" role="dialog" aria-modal="true" :aria-label="$t('security.popup[0]')" class="el-message-box__wrapper" style="z-index: 2064;" :style="isDisplay">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span>{{$t('security.popup[1]')}}</span>
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="close_moble">
						<i class="el-message-box__close el-icon-close" ></i>
					</button>
				</div>
				<div class="el-message-box__content">
					<div style="overflow: hidden;">
						<span class="type">{{$t('security.option[12]')}}</span>
						<el-select v-model="select_value" :placeholder="$t('security.popup[2]')" @change='change(select_value)' :disabled='dis' >
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
					<router-view/>
				</div>
			</div>
		</div>
		<!-- 申请成为商家弹框 -->
		<el-dialog class="beMerchantDialog" width='660px;' :title="$t('apply.main[7]')"
			:visible.sync="dialogMerchant" center>
			<div class="beMerchantdetail">
				<div class="dialog-content">
					<p class="pcolormain">{{$t('apply.main[8]')}}</p>
					<p class="content_p">{{$t('apply.main[9]')}}{{MMargin}}{{$t('apply.main[10]')}}
					</p>
				</div>
				<div class="dialog-content">
					<p class="pcolormain">{{$t('apply.main[11]')}}</p>
					<p class="content_p">{{$t('apply.main[12]')}}</p>
				</div>
			</div>
			<el-checkbox checked v-model="checked" class="isAgree">{{$t('apply.main[13]')}}{{MMargin}}USDT{{$t('apply.main[14]')}}</el-checkbox>
			<div slot="footer" class="dialog-footer el-message-box__btns" style="padding-right: 30px;overflow: hidden;">
				<el-button class="btns" type="primary" style="border: none;background:#87aaff;" @click="applyFor" :loading="loadingdata">{{$t('apply.main[15]')}}</el-button>
				<el-button class="btns btn-cancel" @click="dialogMerchant = false">{{$t('security.option[6]')}}</el-button>
			</div>
		</el-dialog>
		<!-- 关闭谷歌验证弹框 -->
		<el-dialog :title="$t('security.two[2]')"  width='660px;' :visible.sync="dialogFormVisible" class="closegoogle" center>
			<el-form :model="form">
				<el-form-item :label="$t('security.two[3]')" :label-width="formLabelWidth">
					<el-input v-model="form.dyGoodleCommand" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item :label="$t('security.two[4]')" :label-width="formLabelWidth">
					<el-input auto-complete="off" v-model="form.code"></el-input>
					<span class="send" @click="getCode()">{{btnCode.time}}</span>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="btn1" @click="dialogFormVisible = false">{{$t('security.two[5]')}}</el-button>
				<el-button class="btn2" type="primary" @click="closegoogle">{{$t('security.two[6]')}}</el-button>
			</div>
		</el-dialog>
		<!-- 开启谷歌验证弹框 -->
		<el-dialog :title="$t('security.two[7]')"  width='660px;' :visible.sync="dialogVisible" class="opengoogle" center>
			<el-form :model="form1">
				<el-form-item :label="$t('security.two[3]')" :label-width="formLabelWidth">
					<el-input v-model="form1.dyGoodleCommand" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="btn1" @click="dialogVisible = false">{{$t('security.two[5]')}}</el-button>
				<el-button class="btn2" type="primary" @click="opengoogle">{{$t('security.two[6]')}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import { constants } from 'fs';
import { fail } from 'assert';
import { setTimeout } from 'timers';
	export default {
		data() {
			return {
				MMargin:'',
				checked:'',
				value2: true,
				options: [
					{
					value: 'backcard',
					label: this.$t('security.option[0]')
					}, 
					{
					value: 'wx',
					label: this.$t('security.option[1]')
					}, 
					{
					value: 'alipay',
					label: this.$t('security.option[2]')
					}
				],
				select_value: 'backcard', //初始显示标志位
				dis:false,   //支付方式是否可改标志位
				activeName: 'first',
				isDisplay: 'display:none', //弹框标志位
				free1: '',
				free2: '',
				free3: '',
				free4: '',
				free5: '',
				wallone: 0,
        money1: 0,
        money2: 0,
        money3: 0,
        money4: 0,
        money5: 0,
				//用户个人信息
				userData: {
					mobile: '--', //账号
					uid: '--', //uid
					opwd: '--', //登录密码
					tpwd: '--', //交易密码
					email: '', //邮箱
					status: '', //安全登录
					google:'',//是否认证过谷歌
					is_start_google:'',//是否开启谷歌验证
					is_shop: '' 
				},
				//Payment method 支付方式列表
				payMethod: [],
				History: {
					size: 5, //显示条数
					LoginHistorySize: '', //登录历史页数
					LafeLogSize: '', //安全设置历史页数
					LoginHistory: [], //登录历史
					LafeLog: [], //安全设置历史
				},
				dialogMerchant: false,//成为商家
				dialogFormVisible: false,
				dialogVisible: false,
				formLabelWidth: '120px',
				btnCode: {
					time: this.$t('google_verify.script[0]'), //倒计时
					disabled: false
				},
				form: {
					dyGoodleCommand: '',
					mobile: '',
					code: '',
					act: ''
				},
				form1: {
					dyGoodleCommand: '',
					mobile: '',
					act: ''
				},
				loadingdata:false,
			};
		},
		methods: {
			gg() {
				console.log(this.userData);
			},
			getData() {
				var _this = this;
				//个人中心数据
				_this.$http.get(_this.$http.user_info, {params:{}}).then(function(response) {
					if(response.data.status == "200") {
						var tpwd = response.data.data.tpwd == false ? '' : response.data.data.tpwd; //登录密码
						var email = response.data.data.email == false ? '' : response.data.data.email; //登录密码
						var mobile = response.data.data.mobile == false ? '' : response.data.data.mobile; //登录密码
						// response.data.data.command; //登录密码
						_this.userData = {
							mobile: mobile, //账号
							uid: response.data.data.uid, //uid
							opwd: response.data.data.opwd,
							tpwd: tpwd, //交易密码
							email: email, //邮箱
							status: response.data.data.status, //安全登录 初级认证状态
							auth_status:response.data.data.auth_status, //高级认证状态
							user_level: response.data.data.user_level, //安全登录
							google:response.data.data.command,	 //谷歌验证
							is_start_google:response.data.data.is_start_google,//是否开启谷歌验证
							is_shop:response.data.data.is_shop, //商家认证
						};
						_this.MMargin = response.data.data.usdt; // 商家保证金
						_this.free1 = response.data.data.free_fee1
						_this.free2 = response.data.data.free_fee2
						_this.free3 = response.data.data.free_fee3
						_this.free4 = response.data.data.free_fee4
						_this.free5 = response.data.data.free_fee5
						_this.wallone = Number(response.data.data.wallone_usdt); //当前usdt的数量
						_this.money1 = Number(response.data.data.money1); //当前usdt的数量
						_this.money2 = Number(response.data.data.money2); //当前usdt的数量
						_this.money3 = Number(response.data.data.money3); //当前usdt的数量
						_this.money4 = Number(response.data.data.money4); //当前usdt的数量
						_this.money5 = Number(response.data.data.money5); //当前usdt的数量
						//缓存姓名
						sessionStorage.name = response.data.data.name;
						sessionStorage.is_start_google=response.data.data.is_start_google;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
				//获得支付方式列表
				_this.$http.post(_this.$http.pay_list, {}).then(function(response) {
					if(response.data.status == "200") {
						_this.payMethod = response.data.data;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			changestatus(value){
				const _this=this;
				let act;
				if(value){
					act=1;
				}else{
					act=0;
				}
				let data={
					act:act
				}
				_this.$http.post(_this.$http.set_google_state,data).then(function(res){
					if(res.data.status=='200'){
						_this.$public.msg(res.data.msg, 'success', _this);
						_this.getData();
					}else{
						_this.$public.msg(res.data.msg, 'error', _this);
					}
				})
			},
			//点击修改密码路由跳转
			change_router(whitch) {
				var _this = this;
				_this.$router.push({
					path: whitch
				})
			},
			//添加支付方式执行函数
			add_pay() {
				var _this = this;
				_this.dis = false;  //支付方式可修改
				if(_this.userData.status == '1' || _this.userData.status == '4' ) {
					_this.$confirm(_this.$t('security.option[3]'), _this.$t('security.option[4]'), {
						confirmButtonText: _this.$t('security.option[5]'),
						cancelButtonText: _this.$t('security.option[6]'),
						type: 'warning'
					}).then(() => {
						_this.$public.go('realname',10,_this);
					}).catch(() => {
						_this.$message({
							type: 'info',
							message:_this.$t('security.option[7]')
						});
					});
					return false;
				}else if(_this.userData.status =='2' ){
					_this.$public.msg(_this.$t('security.option[8]'), 'warning', _this);
					return false;
				}
				if(!_this.userData.tpwd){
					_this.$public.msg(_this.$t('security.one[3]'), 'warning', _this);
					return false;
				}
				_this.select_value = 'backcard'; //初始显示标志位
				_this.isDisplay = 'display:block';
				_this.$router.push({
					name: 'backcard',
					query: {
						type: 'backcard'
					}
				})
			},
			// 发送验证码
			getCode() {
				var _this = this;
				var mobile = sessionStorage.mobile;
				var vl = mobile.toString();
				if(vl.indexOf('@') == -1 ) { // 手机号
					_this.btnCode.disabled = true;
					_this.$http.post(_this.$http.send_sms, {
						mobile: mobile,
						type: 7
					}).then(function(response) {
						if(response.data.status == "200") {
							_this.$public.msg(response.data.msg, 'success', _this);
							_this.$public.setTime(_this); //倒计时函数封装
						} else {
							_this.btnCode.disabled = false;
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});
				} else {
					_this.btnCode.disabled = true;
					_this.$http.post(_this.$http.send_mail, {
						email: mobile
					}).then(function(response) {
						if(response.data.status == "200") {
							_this.$public.msg(response.data.msg, 'success', _this);
							_this.$public.setTime(_this); //倒计时函数封装
						} else {
							_this.btnCode.disabled = false;
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});
				}
			},
			close() {
				var _this = this;
				_this.dialogFormVisible = true;
			},
			open() {
				var _this = this;
				_this.dialogVisible = true;
			},
			// 关闭谷歌验证
			closegoogle() {
				const _this=this;
				var mobile = sessionStorage.mobile;
				if(_this.form.dyGoodleCommand==''){
					_this.$public.msg(_this.$t('security.one[4]'),'warning',_this)
					return false;
				}if(_this.form.code==''){
					_this.$public.msg(_this.$t('security.one[5]'),'warning',_this)
					return false;
				}
				let _data={
					dyGoodleCommand:_this.form.dyGoodleCommand,
					mobile: mobile,
					code:_this.form.code,
					act: 0
				}
				_this.$http.post(_this.$http.set_google_state, _data).then(res=>{
					if(res.data.status=='200'){
						_this.$public.msg(res.data.msg,'success',_this);
						_this.dialogFormVisible = false;
						_this.getData();
					}else{
						_this.$public.msg(res.data.msg,'success',_this);
					}
				})
			},
			// 开启谷歌验证
			opengoogle () {
				const _this=this;
				var mobile = sessionStorage.mobile;
				if(_this.form1.dyGoodleCommand==''){
					_this.$public.msg(_this.$t('security.one[4]'),'warning',_this)
					return false;
				}
				let _data={
					dyGoodleCommand:_this.form1.dyGoodleCommand,
					mobile: mobile,
					act: 1
				}
				_this.$http.post(_this.$http.set_google_state, _data).then(res=>{
					if(res.data.status=='200'){
						_this.$public.msg(res.data.msg,'success',_this);
							_this.dialogVisible = false;
								_this.getData();
					}else{
						_this.$public.msg(res.data.msg,'success',_this);
					}
				})
			},
			//关闭弹框
			close_moble() {
				var _this = this;
				_this.isDisplay = 'display:none';
				_this.$router.push({
					path: '/security',
				})
			},
			//下拉框改变执行函数
			change(value) {
				var _this = this;
				_this.$router.push({
					path: value,
					query: {
						type: value
					}
				})
			},
			//开光执行函数
			changeSwitch(switch_value, type) {
				var _this = this;
				_this.$http.post(_this.$http.set_pay_status, {
					type: type,
					val: switch_value
				}).then(function(response) {
					if(response.data.status == "200") {
						//						_this.$public.msg(response.data.msg, 'success', _this);
						_this.$public.msg(_this.$t('security.option[9]'), 'success', _this);
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});

			},
			//编辑执行函数
			edit(id, type, k) {
				var _this = this;
				_this.dis = true;  //支付方式不可修改
				if(_this.payMethod[k].status == 0) {
					_this.$public.msg(_this.$t('security.option[10]'), 'warning', _this);
					return false;
				}
				_this.isDisplay = 'display:block';
				_this.select_value = type;
				_this.$router.push({
					name: type,
					query: {
						type: type,
						id: id
					}
				})
			},
			// 商家认证
			auth() {
				var _this = this;
				if (JSON.parse(unescape(sessionStorage.getItem('account'))).ishavePay == 0) {
					_this.$public.msg(_this.$t("frenchcurrency.newhint[13]"), 'warning', _this);
					return false;
				}
				if (_this.userData.status != 3) {
					_this.$public.msg(_this.$t("security.one[2]"), 'warning', _this);
					return false;
				}
				_this.dialogMerchant = true;
			},
			// 解除商家认证
			relieve() {
				var _this = this;
				// _this.$confirm(_this.$t("security.one[6]"), _this.$t("security.one[7]"), {
				// 	confirmButtonText: _this.$t("security.one[8]"),
				// 	cancelButtonText: _this.$t("security.one[9]"),
				// 	type: 'warning'
				// }).then(() => {
					_this.$http.post(_this.$http.del_shop, { account: JSON.parse(unescape(sessionStorage.getItem('account')))}).then(function (response) {
						if (response.data.status == '200') {
							_this.$public.msg(response.data.msg, 'success', _this);
							_this.getData();
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function (error) { });
				// }).catch(() => { });
				return false;
			},
			//申请成为商家确认提交按钮
			applyFor() {
				var _this = this;
				console.log(_this.loadingdata)
				if(_this.loadingdata){
					return false;
				}else{
					_this.loadingdata = true;
				}
				if (!_this.checked) {
					_this.$public.msg(_this.$t("security.two[0]")+ _this.MMargin+_this.$t("security.two[1]") , 'warning', _this);
					_this.loadingdata = false;
					return false;
				} else {
					_this.$http.post(_this.$http.add_shop, {}).then(function (response) {
						if (response.data.status == '200') {
							_this.dialogMerchant = false;
							setTimeout(function(){
								_this.loadingdata = false;
							},500)
							_this.$public.msg(response.data.msg, 'success', _this);
							_this.getData();
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function (error) { })
				}
			},
		},
		created: function() {
			var _this = this;
			_this.getData();
			// _this.getLoginHistory(1);
			// _this.LafeLog(1);
			_this.$public.scrollTop(); //返回但最顶部函数
		},
		watch: {
			'$route': function(route) {
				var _this = this;
				_this.getData();
				if(route.query.flat == 'ok') {
					_this.isDisplay = 'display:none';
					_this.getData();
				}
			},
		}
	};
</script>
<style lang=less>
	@import '../../assets/public.less';
	@import './security.less';
	@import './change_pwd.less';
</style>
<style scoped="scoped">
	h2{
		font-weight: 700;
		font-size: 16px;
		color: #eee;
	}
	.index_main {
		background: #FFFFFF;
	}

	.el-message-box__wrapper {
		z-index: 1000 !important;
	}

	.el-message-box {
		width: 620px;
	}
	.v-modal {
		z-index: 999 !important;
	}
	.el-message-box__content {
		padding: 40px 20px 20px;
	}
	.el-message-box__header {
		padding-top: 25px;
		background: #eee;
	}
	.type{
    width: 20%;
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 14px;
    text-align: center;
		line-height: 46px;
	}
	
	.el-select {
		width: 77%;
		height: 46px;
	}
	.el-select>.el-input{
		height: 46px;
	}
	
</style>
