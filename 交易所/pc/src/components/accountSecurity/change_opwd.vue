<style lang=less>
	@import '../../assets/public.less';
	@import './change_pwd.less';
</style>
<template>
	<div class="change_opwd_main">
		<div class="change_opwd_main_title">
			<h2 class="title" @click="go_back">账号安全</h2>
			<span>></span>
			<h2>修改登录密码</h2>
		</div>
		<div class="change_opwd_main_header">
			<h2>
				修改登录密码
				<span class="tishi">
					<i class="el-icon-info"></i>
					<!-- 修改登录密码后24小时禁止提币 -->
				</span>
			</h2>
		</div>
		<div class="form_warp">
			<div class="form_cont">
				<el-form :label-position="labelPosition" :model="userData" status-icon :rules="rules2" ref="userData" label-width="100px" class="demo-ruleForm">
					<el-form-item label="原登录密码" prop="oldpwd">
						<el-input type="password" v-model.opwdword="userData.oldpwd" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="新登录密码" prop="opwd">
						<el-input type="password" v-model="userData.opwd" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="确认新密码" prop="opwd1">
						<el-input type="password" v-model="userData.opwd1" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('userData')" :loading="loading">修改</el-button>
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
			var oldpwd = (rule, value, callback) => {
				if(!_this.$public.pwd(value)) {
					return callback(new Error('请输入有效的密码'));
				} else {
					callback();
				}
			};
			var validateopwd = (rule, value, callback) => {
				if(!_this.$public.pwd(value)) {
					callback(new Error('请输入有效的密码'));
				} else {
					callback();
				}
			};
			var validateopwd2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.userData.opwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				userData: {
					oldpwd: '', //原密码
					opwd: '', //新密码
					opwd1: '' //确认新密码

				},
				rules2: {
					opwd: [{
						validator: validateopwd,
						trigger: 'blur'
					}],
					opwd1: [{
						validator: validateopwd2,
						trigger: 'blur'
					}],
					oldpwd: [{
						validator: oldpwd,
						trigger: 'blur'
					}]
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
						_this.$http.post(_this.$http.xiugai_pwd, _this.userData).then(function(response) {
							if(response.data.status == "200") {
								_this.$public.msg(response.data.msg + '，请重新登录', 'success', _this);
								//重新登录
								_this.$public.go('login', 10, _this);
							} else {
								_this.$public.msg(response.data.msg, 'warning', _this);
							}
							_this.loading = false; //防止表单重复提交标志

						}).catch(function(error) {});

					} else {
						return false
					}
				});
			},
			go_back() {
				var _this = this;
				_this.$router.go(-1); //返回上一层
			}

		},
		created: function() {
			var _this = this;
			_this.$public.scrollTop(); //返回但最顶部函数
		}
	}
</script>

<style>

</style>