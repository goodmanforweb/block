<style lang=less>
	@import '../../../assets/public.less';
	@import './change_pwd.less';
</style>
<template>
	<div class="change_opwd_main">
		<div class="change_opwd_main_title">
			<h2 class="title" @click="go_back">{{$t("change_tpwd.header[0]")}}</h2>
			<span>></span>
			<h2>{{$t('BITPUIChange.zjPwd[0]')}}</h2>
		</div>
		<div class="form_warp tpwd">
			<div class="form_cont">
				<el-form :label-position="labelPosition" :model="userData" status-icon :rules="rules2" ref="userData" label-width="100px" class="demo-ruleForm">
					<el-form-item :label='$t("change_tpwd.one[0]")' prop="mobile">
						<el-input type="text" v-model="userData.mobile"  auto-complete="off"></el-input>
					</el-form-item>
					<div class="code_warp">
						<el-form-item :label='$t("change_tpwd.one[1]")' prop="code">
							<el-input v-model="userData.code" auto-complete="off"></el-input>
						</el-form-item>
						<div class="btn_code" @click="getCode()">
							<el-input type="button" :value='btnCode.time' :disabled='btnCode.disabled'></el-input>
						</div>
					</div>
					<el-form-item :label='$t("change_tpwd.verification[0]")' prop="tpwd">
						<el-input type="password" v-model="userData.tpwd" auto-complete="off" :placeholder="$t('BITPUIChange.zjPwd[1]')"></el-input>
					</el-form-item>
					<el-form-item :label='$t("change_tpwd.verification[1]")' prop="tpwd1">
						<el-input type="password" v-model="userData.tpwd1" auto-complete="off" :placeholder="$t('BITPUIChange.zjPwd[2]')"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('userData')" :loading="loading">{{$t("change_tpwd.verification[3]")}}</el-button>
					</el-form-item>
				</el-form>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			var _this = this;
			var code = (rule, value, callback) => {
				if(!_this.$public.code(value)) {
					return callback(new Error(_this.$t("change_tpwd.script[0]")));
				} else {
					callback();
				}
			};
			var validatetpwd = (rule, value, callback) => {
				if(!_this.$public.pwd(value)) {
					callback(new Error(_this.$t("change_tpwd.script[1]")));
				} else {
					callback();
				}
			};
			var validatetpwd2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(_this.$t("change_tpwd.script[2]")));
				} else if(value !== this.userData.tpwd) {
					callback(new Error(_this.$t("change_tpwd.script[3]")));
				} else {
					callback();
				}
			};
			return {
				userData: {
					code: '', //验证码
					tpwd: '', //资金密码
					tpwd1: '', //确认资金密码
					mobile: '' //手机号
				},
				btnCode: {
					time: _this.$t("change_tpwd.script[4]"), //倒计时
					disabled: false
				},
				rules2: {
					code: [{
						validator: code,
						trigger: 'blur'
					}],
					tpwd: [{
						validator: validatetpwd,
						trigger: 'blur'
					}],
					tpwd1: [{
						validator: validatetpwd2,
						trigger: 'blur'
					}]

				},
				labelPosition: 'top', //插件自带
				loading: false, //防止表单重复提交标志
        bothLo:'',
			};
		},
		methods: {
			//注册执行函数
			submitForm(formName) {
				var _this = this;
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.loading = true; //防止表单重复提交标志
						_this.$http.post(_this.$http.reset_tpwd, _this.userData).then(function(response) {
							_this.loading = false; //防止表单重复提交标志
							if(response.data.status == "200") {
								_this.$public.msg(response.data.msg, 'success', _this);
								setTimeout(function() {
									// _this.$router.go(-1); //返回上一层
									_this.$public.go('security',100,_this);
								}, 800)
							} else {
								_this.$public.msg(response.data.msg, 'warning', _this);
							}
						}).catch(function(error) {});

					} else {
						return false
					}
				});
			},
			getCode() {
				var _this = this;
				var mobile = sessionStorage.mobile;
				// if(!_this.$public.pwd(_this.userData.tpwd1)) {
				// 	_this.$public.msg(_this.$t("change_tpwd.script[5]"), 'warning', _this);
				// 	return false;
				// }
				if(mobile.indexOf('@')==-1){
					_this.btnCode.disabled = true;
					_this.$http.post(_this.$http.send_sms, {
						mobile: mobile,
						type: 4
					}).then(function(response) {
						if(response.data.status == "200") {
							_this.$public.msg(response.data.msg, 'success', _this);
							_this.$public.setTime(_this); //倒计时函数封装
						} else {
							_this.btnCode.disabled = false;
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});
				}else{
					_this.btnCode.disabled = true;
					//获取验证码
					_this.$http.post(_this.$http.send_mail, {
						email:mobile,
					}).then(function(response) {
						if(response.data.status == "200") {
							_this.$public.setTime(_this); //倒计时函数封装
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
							_this.btnCode.disabled = false;
						}
					}).catch(function(error) {});
				}
			},
			go_back() {
				var _this = this;
				_this.$router.go(-1); //返回上一层
			}
		},
		created: function() {
			var _this = this;
			_this.userData.mobile = sessionStorage.mobile;
			_this.$public.scrollTop(); //返回但最顶部函数
      var mobile = sessionStorage.getItem('mobile');
      if(mobile.length == 11){
        _this.bothLo = '1';
      }else {
        _this.bothLo = '2';
      }
		}

	}
</script>

<style>

</style>
