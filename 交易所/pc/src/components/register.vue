<style lang=less>
	@import '../assets/public.less';
	@import './register.less';
	@import './mian.less';
	.el-checkbox__input.is-checked+.el-checkbox__label {
		color:var(--textcolor)
	}
	.el-message-box__wrapper {
		.el-message-box__content {
			max-height: 80vh;
			overflow-y: auto;
		}
		.el-message-box__btns {
			button {
				display: block;
			width: 200px;
			margin: 0 auto;
			}
		}
		.pre-box {
			white-space: pre-wrap!important;
word-wrap: break-word!important;
*white-space:normal!important;
		}
	}

</style>
<template>
	<div class="register main" >
		<!-- <HeaDer :is-fixed="isFixed"></HeaDer> -->
		<div class="register_main mainy" >
			<div>
				<!-- 注册主题 -->
				<div class="content_warp">
					<!-- 注册左 -->
					<div class="prompt flex v sa">
						<div class="avatar">
							<img src="../assets/img/logint.png" alt="">
						</div>
						<div>
							<div class="l-info bcr">
								<p>{{$t('login.main[9]')}}</p>
								<p>{{$t('login.main[6]')}}</p>
							</div>
							<el-button type="text" @click="go_login()">{{$t('BITPUILogin.reg[1]')}}</el-button>
	
						</div>
					</div>
					<!-- 注册右 -->
					<div class="form_warp">
	
						<el-form :label-position="labelPosition" :model="userData" status-icon :rules="rules2" ref="userData"
							label-width="100px" class="demo-ruleForm" @submit.native.prevent>
							
							<el-form-item :label="$t('register.main[0]')"  prop="mobile">
								<el-input :placeholder="$t('BITPUILogin.reg[4]')"  v-model="userData.mobile" >
								</el-input>
							</el-form-item>
							<!-- 验证码 -->
							<el-form-item :label="$t('register.main[1]')" prop="code">
								<el-input v-model="userData.code" auto-complete="off" :placeholder="$t('tips.tishi[2]')">
									<el-button slot="append" @click="getCode()" :disabled='btnCode.disabled' type="code">{{btnCode.time}}</el-button>
								</el-input>
							</el-form-item>
							
							<el-form-item :label="$t('register.main[2]')" prop="validateopwd">
									<el-input :placeholder="$t('BITPUILogin.reg[5]')"  v-model="userData.opwd" type="password">
									</el-input>
							</el-form-item>
							<el-form-item :label="$t('register.main[3]')" prop="validateopwd2">
									<el-input :placeholder="$t('BITPUILogin.reg[6]')"  v-model="userData.opwd1" type="password">
									</el-input>
							</el-form-item>
							<el-form-item :label="$t('register.main[4]')" prop="tjuser">
									<el-input :placeholder="$t('BITPUILogin.reg[7]')"  v-model="userData.tjuser">
									</el-input>
							</el-form-item>
							<el-checkbox v-model="checked">{{$t('BITPUILogin.reg[8]')}}</el-checkbox>
							<a href="javascript:;" @click="look_agress()" class="f14 textColor">{{$t('BITPUILogin.reg[9]')}}</a>
							<div class="primary_btn">
								<el-form-item class="btnnn" id="regBtn">
									<el-button type="primary" @click="submitForm('userData')" :loading="loading">
											{{$t('BITPUILogin.reg[10]')}}
									</el-button>
								</el-form-item>
							</div>
						</el-form>
					</div>

				</div>
			</div>

			<!--弹框-->
			<div tabindex="-1" role="dialog" aria-modal="true" :aria-label="$t('register.popup[0]')" class="el-message-box__wrapper" style="z-index: 2017;" v-show="messageMoble">
				<div class="el-message-box">
					<div class="yhbox">
						<div class="el-message-box__header">
							<div class="el-message-box__title">
								<span>{{$t('register.popup[1]')}}</span>
							</div>
							<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="messageMoble = false">
								<i class="el-message-box__close el-icon-close"></i>
							</button>
						</div>
						<div class="el-message-box__content">
							<div class="el-message-box__message">
								<pre class="pre-box"></pre>
							</div>
							<div class="el-message-box__input" style="display: none;">
								<div class="el-input">
									<input type="text" autocomplete="off" placeholder="" class="el-input__inner">

								</div>
								<div class="el-message-box__errormsg" style="visibility: hidden;"></div>
							</div>
						</div>
						<div class="el-message-box__btns">
							<button type="button" class="el-button el-button--default el-button--small el-button--primary " @click="messageMoble = false">
								<span>{{$t('register.popup[2]')}}</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="v-modal" tabindex="0" style="z-index: 2016;" v-show="messageMoble"></div>
		</div>
		<!-- <FooTer :ctrlBg="true"></FooTer> -->
	</div>
</template>
<script>
	import Header1 from "./main/header.vue";
	import Footer1 from "./main/footer.vue";
	export default {
		data() {
			var _this = this;
			var mobile = (rule, value, callback) => {
				value=value.toString(); 
				if(value.indexOf('@')==-1){
					if(!_this.$public.checkMobile(value)) {
						return callback(new Error(_this.$t('register.tips[0]')));
					} else {
						this.ismobile=1;
						callback();
					}
				}else{
					if(!_this.$public.email(value)) {
						return callback(new Error(_this.$t('register.tips[0]')));
					} else {
						this.ismobile=2;
						callback();
					}
				}
			};
			var code = (rule, value, callback) => {
				if(!_this.$public.code(value)) {
					return callback(new Error(_this.$t('register.tips[1]')));
				} else {
					callback();
				}
			};
			var tjuser = (rule, value, callback) => {
				if(!value) {
					return callback(new Error(_this.$t('register.tips[2]')));
				} else {
					callback();
				}
			};
			var validateopwd = (rule, value, callback) => {
				if(!_this.$public.pwd(value)) {
					callback(new Error(_this.$t('register.tips[3]')));
				} else {
					callback();
				}
			};
			var validateopwd2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(_this.$t('register.tips[4]')));
				} else if(value !== this.userData.opwd) {
					callback(new Error(_this.$t('register.tips[5]')));
				} else {
					callback();
				}
			};
			return {
				loginTag:'1',
				isPhone:'true',
				islange: 'Chinese', //语言切换
				messageMoble: false,
				argeeData:'',  //用户协议
				userData: {
					opwd: '', //密码1
					opwd1: '', //密码2
					mobile: '', //手机号
					code: '', //验证码
					tjuser: '', //推荐码（必填）
					mcode:''
				},
				mCode: [
						{id: '86',name: this.$t('BITPUILogin.regmcode[0]')+' 86'},
                        {id: '33',name: this.$t('BITPUILogin.regmcode[1]')+ ' 33'},
						{id: '49',name: this.$t('BITPUILogin.regmcode[2]')+ ' 49'},
                        {id: '852',name: this.$t('BITPUILogin.regmcode[3]')+ ' 852'},
						{id: '91',name: this.$t('BITPUILogin.regmcode[4]')+ ' 91'},
						{id: '81',name: this.$t('BITPUILogin.regmcode[5]')+ ' 81'},
						{id: '60',name: this.$t('BITPUILogin.regmcode[6]')+ ' 60'},
						{id: '63',name: this.$t('BITPUILogin.regmcode[7]')+ ' 63'},
						{id: '7',name: this.$t('BITPUILogin.regmcode[8]')+ ' 7'},
						{id: '65',name: this.$t('BITPUILogin.regmcode[9]')+ ' 65'},
						{id: '82',name: this.$t('BITPUILogin.regmcode[10]')+ ' 82'},
						{id: '886',name: this.$t('BITPUILogin.regmcode[11]')+ ' 886'},
						{id: '66',name: this.$t('BITPUILogin.regmcode[12]')+ ' 66'},
						{id: '44',name: this.$t('BITPUILogin.regmcode[13]')+ ' 44'},
						{id: '1', name: this.$t('BITPUILogin.regmcode[14]')+ ' 1'}
					],
				isFixed:false,
				phone: '', //手机号二次验证
				rules2: {
					opwd: [{
						validator: validateopwd,
						trigger: 'blur'
					}],
					opwd1: [{
						validator: validateopwd2,
						trigger: 'blur'
					}],
					mobile: [{
						validator: mobile,
						trigger: 'blur'
					}],
					code: [{
						validator: code,
						trigger: 'blur'
					}],
					tjuser: [{
						validator: tjuser,
						trigger: 'blur'
					}]
				},
				labelPosition: 'top', //插件自带
				checked: false, //有没有选用户协议
				btnCode: {
					time: this.$t('register.tips[6]'), //倒计时
					disabled: false
				},
				loading: false, //防止表单重复提交标志,
				ismobile:1,
				mobiletype:false,//手机号输入状态
				type:'',
			};
		},
		methods: {
			changeMcode() {
				sessionStorage.setItem('mcode',this.userData.mcode)
			},
			//手机号或邮箱切换方法
			qiehuan(tab,event){
				var _this = this
				
				for(let key in _this.userData){
					_this.userData[key] = ""
					
				}

				if(tab.name == 1){
					_this.isPhone = true;
				}else{
					_this.isPhone = false;
				}
				_this.userData.mcode = '86'

			},
			// 注册中英文
			handleCommand(command) {
				var _this = this;
				// _this.$i18n.locale = command;
				_this.$cookies.set("language", command, 60 * 60 * 24 * 30);
				_this.$router.go(0);
			},
			// 返回首页
			backhome() {
				var _this = this;
				_this.$router.push("/home");
			},

			//注册执行函数
			submitForm(formName) {
				var _this = this;

				// if(!_this.userData.mcode){
				if(!_this.userData.mcode && this.isPhone){
					_this.$public.msg(_this.$t('change[0]'),'warning',_this)
					return ;
				}
				_this.$refs[formName].validate((valid) => {
					var sendData  = JSON.parse(JSON.stringify(this.userData)) 
					if(valid) {
						if(_this.checked == false) {
							_this.$public.msg(_this.$t('register.tips[7]'), 'warning', _this);
						} else if(_this.userData.mobile != _this.phone) {
							_this.$public.msg(_this.$t('register.tips[8]'), 'warning', _this);
						} else {
							_this.loading = true;
							if(_this.isPhone == false){
								delete sendData['mcode']
							}
							_this.$http.post(_this.$http.register, sendData).then(function(response) {
								_this.loading = false;
								if(response.data.status == "200") {
									_this.$public.msg(response.data.msg, 'success', _this);
									_this.$public.go('login', 10, _this);
									_this.loading = false;
								// }else if(response.data.data.code == "108"){
								// 	_this.btnCode.disabled = false;		
								// 	_this.$public.msg(response.data.data.error, 'warning', _this);
								} else {
									_this.$public.msg(response.data.msg, 'warning', _this);
								}
							}).catch(function(error) {});

						}
					} else {
						return false
					}
				});
			},
			//点击获取验证码
			getCode() {
				var _this = this;
				if(_this.ismobile==1){
					if(!_this.$public.checkMobile(_this.userData.mobile)) {
						_this.$public.msg(_this.$t('register.tips[0]'), 'warning', _this);
						return false;
					}
					if(!_this.userData.mobile){
						_this.$public.msg(_this.$t('change[1]'), 'warning', _this);
						return ;
					}
					_this.btnCode.disabled = true;
					//获取验证码
					_this.$http.post(_this.$http.send_sms, {
						mobile: _this.userData.mobile,
						type: 1,
					}).then(function(response) {
						if(response.data.status == "200") {
							_this.$public.setTime(_this); //倒计时函数封装
							_this.phone = _this.userData.mobile //手机号保存
						} else{
							_this.btnCode.disabled = false;	
							if(response.data.data){
								if(response.data.data.code){
									_this.$public.msg(response.data.data.error, 'warning', _this);
									return
								}
							}
							// _this.btnCode.disabled = false;	
							_this.$public.msg(response.data.msg, 'warning', _this);

						}
					}).catch(function(error) {console.log(error);
					});
				}else{
					if(!_this.$public.email(_this.userData.mobile)) {
						_this.$public.msg(_this.$t('register.tips[0]'), 'warning', _this);
						return false;
					}
					_this.btnCode.disabled = true;
					//获取验证码
					_this.$http.post(_this.$http.send_mail, {
						email: _this.userData.mobile,
					}).then(function(response) { 
						if(response.data.status == "200") {
							_this.$public.setTime(_this); //倒计时函数封装
							_this.phone = _this.userData.mobile //手机号保存
						}else {
							_this.$public.msg(response.data.msg, 'warning', _this);
							_this.btnCode.disabled = false;
						}
					}).catch(function(error) {console.log(error);
					});
				}

				//请求接口 成功后执行此函数
			},
			//查看用户协议
			look_agress() {
				var _this = this;
				if(_this.$cookies.get('language') == 'Chinese'){
					_this.type = 'reg_agree'
				}else{
					_this.type = 'reg_agree1'
				}
				_this.$http.get(_this.$http.agree, {
					params: {
						type: _this.type
					}
				}).then(function(response) {
					if(response.data.status == "200") {
						// console.log(response.data.data);
						$('.el-message-box__message pre').html(response.data.data);
						_this.messageMoble = true;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			//点击去登录执行函数
			go_login() {
				var _this = this;
				_this.$router.push({
					path: '/login'
				});
			},
			//忘记密码
			forgetpwd(){
				var _this = this;
				_this.$router.push({
					path: '/forgetpwd'
				});
			},
		},
		mounted:function(){
			var _this = this;
			_this.userData.tjuser = _this.$route.query.tjuser;
			if(_this.$cookies.get('changeBg') == 'night'||!_this.$cookies.get('changeBg')) {
				$('#main').removeClass('mainb');
				$('#main').addClass('mainy');
			} else {
				$('#main').removeClass('mainy');
				$('#main').addClass('mainb');
			};
			if(_this.$route.query.mobile){
				_this.userData.mobile = _this.$route.query.mobile;
				_this.mobiletype = true;
			};


			if (_this.$cookies.get('language')) {
				_this.$i18n.locale = _this.$cookies.get('language');
				_this.islange = _this.$cookies.get('language');
			} else {
				_this.$cookies.set("language", 'Chinese', 60 * 60 * 24 * 30);
			}
		},
		created: function() {
			var _this = this;
			//设置select默认值
			this.userData.mcode = this.mCode[0].id;
			 sessionStorage.setItem('mcode',this.userData.mcode)
		},
		components: {
			"HeaDer":Header1,
		    "FooTer":Footer1,
		}
	}
</script>
<style scoped>
	.el-message-box {
		width: 800px !important;
	}
</style>
