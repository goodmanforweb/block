<style lang=less>
	@import '../assets/public.less';
	@import './login.less';
	@import './mian.less';
</style>
<template lang="html">
	<div class="main mainy trans " >
		<!-- <HeaDer></HeaDer> -->
		<div class="login_main">
			<div>
				<!-- 登录主题 -->
				<div class="content_warp sb">
					<!-- 登录左 -->
					<div class="prompt">
						<div class="avatar">
							<img src="../assets/img/logint.png" alt="">
						</div>
						<div class="l-info bcr">
							<p>{{$t('login.main[9]')}}</p>
							<p>{{$t('login.main[6]')}}</p>
						</div>
						<el-button type="text" @click="go_reg()">{{$t('login.main[7]')}}</el-button>
					</div>
					<!-- 登录右 -->
					<div class="form_warp flex v hc">
						<el-form :label-position="labelPosition" :model="userData" status-icon :rules="rules2"
							ref="userData" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
							<!-- 登录账号 -->
							<el-form-item :label="$t('login.form[0]')" prop="mobile">
								<el-input :placeholder="$t('BITPUILogin.login[3]')" 
									v-model="userData.mobile">
								</el-input>
							</el-form-item>
							<!-- 登录密码 -->
							<el-form-item :label="$t('login.form[1]')" prop="opwd">
								<el-input :placeholder="$t('BITPUILogin.login[4]')" type="password"
									 v-model="userData.opwd">
								</el-input>
							</el-form-item>
							<div class="primary_btn">
								<el-form-item>
									<el-button type="primary" @click="submitForm('userData')" :loading="loading">
										{{$t('login.main[4]')}}
									</el-button>
									<div class="have">
										<span @click="forget_pwd()"
											style="font-size:12px;">{{$t('login.main[5]')}}</span>
									</div>
								</el-form-item>
							</div>
						</el-form>
					</div>
				</div>
			</div>
		</div>
		<!-- <FooTer :ctrlBg="true"></FooTer> -->
	</div>
</template>
<script>
	import Verify from 'vue2-verify'
	export default {
		data() {
			var _this = this;
			var mobile = (rule, value, callback) => {
				value = value.toString();
				if (value.indexOf('@') == -1) {
					if (!_this.$public.checkMobile(value)) {
						return callback(new Error(_this.$t('login.script[0]')));
					} else {
						_this.ismobile = 1;
						callback();
					}
				} else {
					if (!_this.$public.email(value)) {
						return callback(new Error(_this.$t('login.script[0]')));
					} else {
						_this.ismobile = 2;
						callback();
					}
				}
			};
			var validateopwd = (rule, value, callback) => {
				if (!_this.$public.pwd(value)) {
					callback(new Error(_this.$t('login.script[1]')));
				} else {
					callback();
				}
			};
			return {
				clientHeight: '',
				auto_code: '', //图片验证码
				islange: 'Chinese', //语言切换
				labelPosition: 'top', //插件自带
				userData: {
					opwd: '', //用户密码
					mobile: '', //用户手机号
					mobilecode: ""
					// verify: '', //用户验证码
					// ispc:1	//判断用户验证码
				},
				rules2: {
					opwd: [{
						validator: validateopwd,
						trigger: 'blur'
					}],
					mobile: [{
						validator: mobile,
						trigger: 'blur'
					}],
					mobilecode: [{
						validator: mobile,
						trigger: 'blur'
					}]
				},
				btnCode: {
					time: this.$t('login.script[2]'), //倒计时
					disabled: false
				},
				activeName: "first",
				loading: false, //防止表单重复提交标志位
				unlock: null, //是否完成滑动解锁操作
				nums: 0,
				isDisplay: 'display:none', //控制弹框出现和消失
				active: 1,                   //控制登录状态显示内容
				isshow: true,
				ismobile: 1,
				yzcode: '',//登录时使用的验证码
				langchange: 'en',
			};
		},
		created: function () {
			var _this = this;
			console.log(_this.$router.history.current.path)
			if (_this.$router.history.current.path == "/login") {
				console.log(111)
			}
			$(document).keydown(function (e) {
				if (e.keyCode == 13) {
					if (_this.userData) {
						_this.submitForm("userData")
					}
				}
			})
		},
		methods: {
			handleClick() {
				var _this = this;
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


			toggle(index, flag) {
				const _this = this;
				_this.active = index;
				_this.isshow = flag;
			},
			getCode() {
				var _this = this;
				if (_this.ismobile == 1) {
					if (!_this.$public.checkMobile(_this.userData.mobilecode)) {
						_this.$public.msg(_this.$t('register.tips[0]'), 'warning', _this);
						return false;
					}
					_this.btnCode.disabled = true;
					//获取验证码
					_this.$http.post(_this.$http.send_sms, {
						mobile: _this.userData.mobilecode,
						type: 3
					}).then(function (response) {
						if (response.data.status == "200") {
							_this.$public.setTime(_this); //倒计时函数封装
							_this.phone = _this.userData.mobilecode //手机号保存
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
							_this.btnCode.disabled = false;
						}
					}).catch(function (error) { });
				} else {
					if (!_this.$public.email(_this.userData.mobilecode)) {
						_this.$public.msg(_this.$t('register.tips[0]'), 'warning', _this);
						return false;
					}
					_this.btnCode.disabled = true;
					//获取验证码
					_this.$http.post(_this.$http.send_mail, {
						email: _this.userData.mobilecode,
					}).then(function (response) {
						if (response.data.status == "200") {
							_this.$public.setTime(_this); //倒计时函数封装
							_this.phone = _this.userData.mobilecode //手机号保存
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
							_this.btnCode.disabled = false;
						}
					}).catch(function (error) { });
				}

				//请求接口 成功后执行此函数
			},
			submit1() {
				const _this = this;
				let data = {
					mobile: _this.userData.mobilecode,
					code: _this.yzcode
				}
				if (_this.userData.mobilecode == '') {
					_this.$public.msg(_this.$t('login.select[2]'), 'warning', _this);
					return false;
				}
				if (!_this.$public.code(_this.yzcode)) {
					_this.$public.msg(_this.$t('register.tips[1]'), 'warning', _this);
					return false;
				}
				_this.loading = true;
				$.post(_this.$http.code_login, data, function (response) {
					_this.loading = false;
					if (response.status == "200") {
						//缓存用户唯一编号和token
						if (response.data.is_start_google == '0') {
							sessionStorage.clear();
							sessionStorage.account = response.data.account;
							sessionStorage.token = response.data.token;
							sessionStorage.is_start_google = response.data.is_start_google;
							sessionStorage.mobile = _this.userData.mobilecode;
							_this.$public.msg(response.msg, 'success', _this);
							_this.$public.go('home', 10, _this);
							_this.loading = false;
						} else {
							sessionStorage.account1 = response.data.account;
							sessionStorage.token1 = response.data.token;
							_this.$public.go('googlecheck', 10, _this);
						}
					} else {
						_this.$public.msg(response.msg, 'warning', _this);
						// _this.loading = false;
					}
				})
			},
			//注册执行函数
			submitForm(formName) {
				var _this = this;
				_this.$refs[formName].validate((valid) => {
					var senddata = {
						mobile: _this.userData.mobile,
						opwd: _this.userData.opwd
					}
					$.post(_this.$http.user_login, senddata, function (response) {
						_this.loading = false;
						if (response.status == "200") {
							//缓存用户唯一编号和token
							if (response.data.is_start_google == '0') {
								sessionStorage.clear();
								sessionStorage.account = response.data.account;
								sessionStorage.token = response.data.token;
								sessionStorage.is_start_google = response.data.is_start_google;
								sessionStorage.mobile = _this.userData.mobile;
								
								_this.$store.commit('givenLoginInfo', {
									...response.data,
									mobile:_this.userData.mobile,
									phone: _this.$public.phoneEncryption(_this.userData.mobile)
         						});


								_this.$public.msg(response.msg, 'success', _this);
								_this.$public.go('home', 10, _this);
								_this.loading = false;

							} else {
								_this.$prompt('谷歌验证码', '安全验证', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									inputPlaceholder: "请输入谷歌验证码",
								}).then(({ value }) => {
									$.ajax({
										type: 'POST',
										url: _this.$http.check_google_code,
										headers: { "account": response.data.account, "token": response.data.token },
										data: {
											dyGoodleCommand: value
										},
										success: function (data) {
											if (data.status == '0') {
												_this.$public.msg(data.msg, 'warning', _this);
											} else {
												sessionStorage.clear();
												sessionStorage.account = response.data.account;
												sessionStorage.token = response.data.token;
												sessionStorage.is_start_google = response.data.is_start_google;
												sessionStorage.mobile = _this.userData.mobile;
												_this.$public.msg(response.msg, 'success', _this);
												_this.$public.go('home', 10, _this);
												_this.loading = false;
												_this.$public.msg(response.msg, 'success', _this);
												_this.$public.go('home', 10, _this);
											}
										},
										error: function (xhr, type) {

										}
									})
								}).catch(() => {
									_this.$message({
										type: 'info',
										message: '取消验证'
									});
								});
								sessionStorage.account1 = response.data.account;
								sessionStorage.token1 = response.data.token;
								sessionStorage.mobile1 = _this.userData.mobile;
								// _this.$public.go('googlecheck', 10, _this);
							}
						} else {
							_this.$public.msg(response.msg, 'warning', _this);
							// _this.loading = false;
						}
					})
				});
			},
			successVerch() {
				$('.verify-move-block').html('<i class="el-icon-check" style="color: #FFFFFF;"></i>')
				$('.verify-msg').html('成功');
				$('.verify-msg').css('color', '#333');
				this.valdationed();
			},
			successVeren() {
				$('.verify-move-block').html('<i class="el-icon-check" style="color: #FFFFFF;"></i>')
				$('.verify-msg').html('success');
				$('.verify-msg').css('color', '#333');
				this.valdationed();
			},
			suc() { },
			//点击去登录执行函数
			go_reg() {
				var _this = this;
				_this.$router.push({
					path: '/register'
				});

			},
			valdationed() {
				var _this = this;
				_this.unlock = 1; //滑动解锁完毕
				_this.isDisplay = 'display:block';

			},
			change_code() {
				var _this = this;
				_this.auto_code = _this.$http.auth_code + '?' + _this.nums++;
			},
			forget_pwd() {
				var _this = this;
				_this.$router.push({
					path: 'forgetpwd'
				})
			},
			changeH() {
				var _this = this;
				if (document.documentElement.clientHeight >= 753) {
					_this.clientHeight = document.documentElement.clientHeight;
				} else {
					_this.clientHeight = 753;
				}
			}
		},
		watch: {
			'$route': function (route) {
				var _this = this;

			},
		},
		mounted: function () {
			sessionStorage.clear();
			this.change_code();
			window.scrollTo(0, 0); //回到顶部
			window.onresize = function () {
				_this.changeH();
			}
			if (this.$cookies.get('changeBg') == 'night' || !this.$cookies.get('changeBg')) {
				$('#main').removeClass('mainb');
				$('#main').addClass('mainy');
			} else {
				$('#main').removeClass('mainy');
				$('#main').addClass('mainb');
			};
			var _this = this;
			if (_this.$cookies.get('language')) {
				_this.$i18n.locale = _this.$cookies.get('language');
				_this.islange = _this.$cookies.get('language');
			} else {
				_this.$cookies.set("language", 'Chinese', 60 * 60 * 24 * 30);
			}
		},
		components: {
			Verify
		}

	}
</script>
<style>

</style>