<style lang=less>
	@import '../../../assets/public.less';
	@import './change_pwd.less';
</style>
<template>
	<div class="change_opwd_main">
		<div class="change_opwd_main_title">
			<h2 class="title" @click="go_back">{{$t("change_email.header[0]")}}</h2>
			<span>></span>
			<h2>{{$t("change_email.header[1]")}}</h2>
			<span class="right">邮箱绑定后不可更改</span>
		</div>
		<div class="form_warp tpwd">
			<div class="form_cont">
				<el-form :label-position="labelPosition" :model="userData" status-icon :rules="rules2" ref="userData" label-width="100px" class="demo-ruleForm">
					<el-form-item :label='$t("change_email.header[1]")' prop="email">
						<el-input type="email" v-model="userData.email" auto-complete="off"></el-input>
					</el-form-item>
					<div class="code_warp">
						<el-form-item :label='$t("change_email.script[2]")' prop="code">
							<el-input v-model.number="userData.code" auto-complete="off"></el-input>
						</el-form-item>
						<div class="btn_code" @click="getCode()">
							<el-input type="button" :value='btnCode.time' :disabled='btnCode.disabled'></el-input>
						</div>
					</div>
					<el-form-item>
						<el-button type="primary" @click="submitForm('userData')" :loading="loading">{{$t("change_email.main[3]")}}</el-button>
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
					return callback(new Error(_this.$t("change_email.script[3]")));
				} else {
					callback();
				}
			};
			var validateemail = (rule, value, callback) => {
				if(!_this.$public.email(value)) {
					callback(new Error(_this.$t("change_email.script[0]")));
				} else {
					callback();
				}
			};
			return {
				userData: {
					code: '', //验证码
					email: '', //新邮箱
					mobile: '' //手机号

				},
				btnCode: {
					time: _this.$t("change_email.script[1]"), //倒计时
					disabled: false
				},
				rules2: {
					code: [{
						validator: code,
						trigger: 'blur'
					}],
					email: [{
						validator: validateemail,
						trigger: 'blur'
					}],
				},
				labelPosition: 'top', //插件自带
				loading: false, //防止表单重复提交标志
			};
		},
		methods: {
			//注册执行函数
			submitForm(formName) {
				var _this = this;

				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.loading = true; //防止表单重复提交标志
						_this.$http.post(_this.$http.binding_email, _this.userData).then(function(response) {
							_this.loading = false; //防止表单重复提交标志
							if(response.data.status == "200") {
								_this.$public.msg(response.data.msg, 'success', _this);
								setTimeout(function() {
									// _this.$router.go(-1); //返回上一层
									_this.$public.go('security',100,_this);
								}, 10)
							} else {
								_this.$public.msg(response.data.msg, 'warning', _this);
							}
						}).catch(function(error) {});

					} else {
						return false
					}
				});
			},
//			//获取验证码
			getCode() {
				var _this = this;
				if(!_this.$public.email(_this.userData.email)) {
					_this.$public.msg(_this.$t("change_email.script[0]"), 'warning', _this);
					return false;
				}
				_this.btnCode.disabled = true;
				_this.$http.post(_this.$http.send_mail, {
					email: _this.userData.email
				}).then(function(response) {
					if(response.data.status == "200") {
						_this.$public.msg(response.data.msg, 'success', _this);
						_this.$public.setTime(_this); //倒计时函数封装
					} else {
						_this.btnCode.disabled = false;
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});

				//请求接口 成功后执行此函数				
			},
			//返回上一页
			go_back() {
				var _this = this;
				_this.$router.go(-1); //返回上一层
			}

		},
		created: function() {
			var _this = this;
			_this.userData.mobile = sessionStorage.mobile;
			_this.$public.scrollTop(); //返回但最顶部函数
		}
	}
</script>
