<style lang=less >
	@import '../assets/public.less';
	@import './forget_pwd.less';
	@import './mian.less';
	@import './register.less';
	.forget_trans{
		background: url("../assets/image/bg.jpg") no-repeat;
		background-size: 100% 100%;
	}
</style>
	<template>
		<div class="forget_trans">
			<!-- <HeaDer></HeaDer> -->
			<div class="register_main" id="main">
				<div style="width:970px;margin:0 auto;padding:100px 0 40px 0;">
					<!-- 忘记密码 -->
					<div class="content_warp">
							<!-- 修改密码右 -->
						<div class="form_warp">
							<!-- <div class="right">{{$t('zeusLogin.for[0]')}}<a href="javascript:;" @click="go_login()">{{$t('zeusLogin.for[1]')}}</a></div> -->
							<div class="mima">{{$t('zeusLogin.for[2]')}}</div>
							<div class="right1">{{$t('zeusLogin.for[0]')}}<a href="javascript:;" @click="go_login()">{{$t('zeusLogin.for[1]')}}</a></div>
							<!-- <div>
								<el-tabs v-model="loginTag" @tab-click="qiehuan">
										<el-tab-pane :label="$t('change[2]')" name="1"></el-tab-pane>
										<el-tab-pane :label="$t('change[3]')" name="2"></el-tab-pane>
								</el-tabs>
							</div> -->
							<el-form :label-position="labelPosition" :model="userData" status-icon :rules="rules2" ref="userData"
								label-width="100px" class="demo-ruleForm" @submit.native.prevent>
							<!-- 登录账号 -->
								<!-- <el-form-item prop="mobile" class="flex" v-if="isPhone">
									<el-select @change="changeCode" name="code" id="quhao" v-model="userData.mcode">
										<el-option v-for="item in mCode" :key="item.value" :label="item.name" :value="item.id">
										</el-option>
										<option v-for="(i, index) in mCode" :key="index" :value="i.id">{{i.name}}</option>
									</el-select>
									<el-input :placeholder="$t('zeusLogin.reg[3]')" suffix-icon="el-icon-user" v-model="userData.mobile" class="flexItem">
									</el-input>
								</el-form-item> -->
								<!-- <el-form-item id="youxiang" prop="mobile" class="flex " v-else>
									<el-input :placeholder="$t('zeusLogin.reg[4]')" suffix-icon="el-icon-user" v-model="userData.mobile" class="flexItem">
									</el-input>
								</el-form-item> -->
								<el-form-item prop="mobile">
										<el-input :placeholder="$t('zeusLogin.login[3]')" suffix-icon="el-icon-user" v-model="userData.mobile">
											<i slot="prefix" class='account-icon'></i>
										</el-input> 
								</el-form-item>
								<!-- 验证码 -->
								<div class="code_warp">
									<el-form-item prop="code">
										<el-input v-model="userData.code" auto-complete="off" :placeholder="$t('tips.tishi[2]')">
											<i slot="prefix" class='account-icon2'></i>
										</el-input>
									</el-form-item>
									<div class="btn_code" @click="getCode()">
										<el-input type="text" :value="'| '+btnCode.time" :disabled='btnCode.disabled'></el-input>
										
									</div>
								</div>
								<el-form-item prop="opwd">
										<el-input :placeholder="$t('zeusLogin.for[4]')" suffix-icon="el-icon-lock" v-model="userData.opwd" type="password">
										<i slot="prefix" class='account-icon3'></i>
										</el-input>
								</el-form-item>
								<el-form-item prop="opwd1">
										<el-input :placeholder="$t('zeusLogin.for[5]')" suffix-icon="el-icon-lock" v-model="userData.opwd1" type="password">
										<i slot="prefix" class='account-icon3'></i>
										</el-input>
								</el-form-item>
								<div class="primary_btn">
									<el-form-item>
										<el-button type="primary" @click="submitForm('userData')" :loading="loading">
												{{$t('zeusLogin.for[6]')}}
										</el-button>
									</el-form-item>
								</div>
							</el-form>
						</div>
						<!-- 修改密码左 -->
						<div class="prompt">
								<div class="warp_prompt">
									<!-- <p><span>Zeus</span>.com</p> -->
									<p>Welcome to our website</p>
								</div>
								<div class="rules_pwd">
								<p>{{$t('zeusLogin.login[9]')}}</p>
							<p>{{$t('zeusLogin.login[6]')}}</p>
							<p>{{$t('zeusLogin.login[7]')}}</p>
							<p>{{$t('zeusLogin.login[8]')}}</p>	
										<!-- <p>领先的数字资产交易平台,打造</p>
							<p>多业务形态为一体的区块链生态圈</p>
							<p>5 年数字资产金融服务经验专业分布式架构</p>
							<p>和防 DDOS 攻击系统</p> -->
								</div>
							</div>
					
	
					</div>
				</div>
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
						return callback(new Error(_this.$t('forget_pwd.tips[0]')));
					} else {
						this.ismobile=1;
						callback();
					}
				}else{
					if(!_this.$public.email(value)) {
						return callback(new Error(_this.$t('forget_pwd.tips[1]')));
					} else {
						this.ismobile=2;
						callback();
					}
				}
			};
			var code = (rule, value, callback) => {
				if(!_this.$public.code(_this.userData.code)) {
					return callback(new Error(_this.$t('forget_pwd.tips[2]')));
				} else {
					callback();
				}
			};
			var opwd = (rule, value, callback) => {
				if(!_this.$public.pwd(value)) {
					callback(new Error(_this.$t('forget_pwd.tips[3]')));
				} else {
					callback();
				}
			};
			var opwd1 = (rule, value, callback) => {
				if(!_this.$public.pwd(value)) {
					callback(new Error(_this.$t('forget_pwd.tips[3]')));
				} else if(value !== this.userData.opwd) {
					callback(new Error(_this.$t('forget_pwd.tips[4]')));
				} else {
					callback();
				}
			};
			return {
				loginTag:'1',
				islange: 'Chinese', //语言切换
				labelPosition: 'top', //插件自带
				userData: {
					mobile: '', //手机号
					code: '', //短信验证码
					opwd: '', //密码1
					opwd1: '', //密码2
					// mcode:'',//手机区号
				},
				rules2: {
					mobile: [{
						validator: mobile,
						trigger: 'blur'
					}],
					code: [{
						validator: code,
						trigger: 'blur'
					}],
					opwd: [{
						validator: opwd,
						trigger: 'blur'
					}],
					opwd1: [{
						validator: opwd1,
						trigger: 'blur'
					}]
				},

				btnCode: {
					time: this.$t('forget_pwd.tips[8]'), //倒计时
					disabled: false
				},
				loading: false, //防止表单重复提交标志位
				whitchShow: 1, //哪一步显示
				ismobile:1,
				isPhone:true,
				mCode: [
					{id: '86',name: this.$t('zeusLogin.regmcode[0]')+' 86'},
					{id: '33',name: this.$t('zeusLogin.regmcode[1]')+ ' 33'},
					{id: '49',name: this.$t('zeusLogin.regmcode[2]')+ ' 49'},
					{id: '852',name: this.$t('zeusLogin.regmcode[3]')+ ' 852'},
					{id: '91',name: this.$t('zeusLogin.regmcode[4]')+ ' 91'},
					{id: '81',name: this.$t('zeusLogin.regmcode[5]')+ ' 81'},
					{id: '60',name: this.$t('zeusLogin.regmcode[6]')+ ' 60'},
					{id: '63',name: this.$t('zeusLogin.regmcode[7]')+ ' 63'},
					{id: '7',name: this.$t('zeusLogin.regmcode[8]')+ ' 7'},
					{id: '65',name: this.$t('zeusLogin.regmcode[9]')+ ' 65'},
					{id: '82',name: this.$t('zeusLogin.regmcode[10]')+ ' 82'},
					{id: '886',name: this.$t('zeusLogin.regmcode[11]')+ ' 886'},
					{id: '66',name: this.$t('zeusLogin.regmcode[12]')+ ' 66'},
					{id: '44',name: this.$t('zeusLogin.regmcode[13]')+ ' 44'},
					{id: '1', name: this.$t('zeusLogin.regmcode[14]')+ ' 1'}
				],
			}
		},
		methods: {
			changeCode() {
				sessionStorage.setItem('mcode',this.userData.mcode)
			},
			//手机号或邮箱切换方法
			qiehuan(tab,event){
				var _this = this
				if(tab.name == 1){
					_this.isPhone = true;
				}else{
					_this.isPhone = false;
				}
				_this.userData.mobile = ''
			},
			submitForm(formName) {
				var _this = this;
				_this.$refs[formName].validate((valid) => {
					if(valid) {
					// 	if(_this.checked == false) {
					// 		_this.$public.msg(_this.$t('register.tips[7]'), 'warning', _this);
					// 	} else if(_this.userData.mobile != _this.phone) {
					// 		_this.$public.msg(_this.$t('register.tips[8]'), 'warning', _this);
					// 	} else {
							_this.loading = true;
							_this.$http.post(_this.$http.reset_opwd, _this.userData).then(function(response) {
								_this.loading = false;
								if(response.data.status == "200") {
									_this.$public.msg(response.data.msg, 'success', _this);
									_this.$public.go('login', 10, _this);
									_this.loading = false;
								} else {
									_this.$public.msg(response.data.msg, 'warning', _this);
								}
							}).catch(function(error) {});

						// }
					// } else {
					// 	return false
					}
				});
			},
			//获取验证码
			getCode() {
				var _this = this;
				// if(!_this.userData.mcode){
				// 	_this.$public.msg(_this.$t('change[0]'),'warning',_this)
				// 	return ;
				// }
				if(_this.ismobile==1){
					if(!_this.$public.checkMobile(_this.userData.mobile)) {
						_this.$public.msg(_this.$t('register.tips[0]'), 'warning', _this);
						return false;
					}
					_this.btnCode.disabled = true;
					//获取验证码
					
					_this.$http.post(_this.$http.send_sms, {
						mobile: _this.userData.mobile,
						type: 2
					}).then(function(response) {
						if(response.data.status == "200") {
							_this.$public.setTime(_this); //倒计时函数封装
							_this.phone = _this.userData.mobile //手机号保存
						} else {
							_this.btnCode.disabled = false;
							if(response.data.data){
								if(response.data.data.code){
									_this.$public.msg(response.data.data.error, 'warning', _this);
									return
								}
							}
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});
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
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
							_this.btnCode.disabled = false;
						}
					}).catch(function(error) {});
				}

				//请求接口 成功后执行此函数
			},
			// 中英文切换
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
			
			//手机号验证提交函数
			submitmobile() {
				var _this = this;
				if(_this.userData.mobile.indexOf('@')==-1){
					if(!_this.$public.checkMobile(_this.userData.mobile)) {
						_this.$public.msg(_this.$t('forget_pwd.tips[1]'), 'warning', _this);
					} else {
						setTimeout(function() {
							_this.whitchShow = 2;
						}, 300)
					}
				}else{
					if(!_this.$public.email(_this.userData.mobile)) {
						_this.$public.msg(_this.$t('forget_pwd.tips[1]'), 'warning', _this);
					} else {
						setTimeout(function() {
							_this.whitchShow = 2;
						}, 300)
					}
				}

			},
			//验证码验证
			submitCode() {
				var _this = this;
				//验证验证码的正确性
				if(!_this.$public.code(_this.userData.code)) {
					_this.$public.msg(_this.$t('forget_pwd.tips[2]'), 'warning', _this);
				} else {
					let data={
						mobile:_this.userData.mobile,
						code:_this.userData.code
					}
					_this.$http.post(_this.$http.check_code,data).then(function(res){
						if(res.data.status=='200'){
							_this.whitchShow = 3;
						}else{
							_this.$public.msg(res.data.msg, 'warning', _this);
						}
					})

				}
			},
			submitPwd() {
				var _this = this;
				if(!_this.$public.pwd(_this.userData.opwd)) {
					_this.$public.msg(_this.$t('forget_pwd.tips[7]'), 'warning', _this);
					return false;

				} else if(_this.userData.opwd !== _this.userData.opwd) {
					_this.$public.msg(_this.$t('forget_pwd.tips[4]'), 'warning', _this);
					return false;
				}
				_this.loading = true;
				_this.$http.post(_this.$http.reset_opwd, _this.userData).then(function(response) {
					_this.loading = false;
					if(response.data.status == "200") {
						_this.$public.msg(response.data.msg, 'success', _this);
						_this.$public.go('login', 10, _this);
						_this.loading = false;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			//获取验证码执行函数
			get_code() {
				var _this = this;
				//获取验证码
				if(_this.ismobile==1){
					_this.btnCode.disabled = true;
					_this.$http.post(_this.$http.send_sms, {
						mobile: _this.userData.mobile,
						type:'2'

					}).then(function(response) {
						if(response.data.status == "200") {
							_this.$public.setTime(_this); //倒计时函数封装
						} else {
							_this.btnCode.disabled = false;
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});
				}else{
					if(!_this.$public.email(_this.userData.mobile)) {
						_this.$public.msg(_this.$t('forget_pwd.tips[1]'), 'warning', _this);
						return false;
					}
					_this.btnCode.disabled = true;
					//获取验证码
					_this.$http.post(_this.$http.send_mail, {
						email: _this.userData.mobile,
						type: 2
					}).then(function(response) {
						if(response.data.status == "200") {
							_this.$public.setTime(_this); //倒计时函数封装
							_this.phone = _this.userData.mobile //手机号保存
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
							_this.btnCode.disabled = false;
						}
					}).catch(function(error) {});
				}
			},
			go_reg() {
				var _this = this;
				_this.$router.push({
					path: '/register'
				});

			},
			//点击去登录执行函数
			go_login() {
				var _this = this;
				_this.$router.push({
					path: '/login'
				});
			}
		},
		components: {
			"HeaDer":Header1,
		    "FooTer":Footer1,
		},
		mounted:function(){
			if(this.$cookies.get('changeBg') == 'night'||!this.$cookies.get('changeBg')) {
				$('#main').removeClass('mainb');
				$('#main').addClass('mainy');
			} else {
				$('#main').removeClass('mainy');
				$('#main').addClass('mainb');
			}
		var _this = this;
		if (_this.$cookies.get('language')) {
				_this.$i18n.locale = _this.$cookies.get('language');
				_this.islange = _this.$cookies.get('language');
			} else {
				_this.$cookies.set("language", 'Chinese', 60 * 60 * 24 * 30);
			}
		},
		created: function() {
			// this.userData.mcode = this.mCode[0].id
			// sessionStorage.setItem('mcode',this.userData.mcode)

		},
	}
</script>

<style>

</style>
