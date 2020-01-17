<style lang=less>
	@import '../../assets/public.less';
	@import './change_pwd.less';
</style>
<template>
	<div class="change_opwd_main">
		<div class="change_opwd_main_title">
			<h2 class="title" @click="go_back">账号安全</h2>
			<span>></span>
			<h2>更换绑定手机</h2>
		</div>
		<div class="change_opwd_main_header">
			<h2>
				更换绑定手机
				<span class="tishi">
					<i class="el-icon-info"></i>
					<!-- 更换绑定手机后24小时禁止提币 -->
				</span>
			</h2>
		</div>
		<div class="form_warp tpwd">
			<div class="form_cont">
				<el-form :label-position="labelPosition" :model="userData" status-icon :rules="rules2" ref="userData" label-width="100px" class="demo-ruleForm">
					<el-form-item label="手机号码" prop="mobile">
						<el-input type="text" v-model="userData.mobile" auto-complete="off"></el-input>
					</el-form-item>
					<div class="code_warp">
						<el-form-item label="短信验证码" prop="code">
							<el-input v-model.number="userData.code" auto-complete="off"></el-input>
						</el-form-item>
						<div class="btn_code" @click="getCode()">
							<el-input type="button" :value='btnCode.time' :disabled='btnCode.disabled'></el-input>
						</div>
					</div>

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
			var code = (rule, value, callback) => {
				if(!_this.$public.code(value)) {
					return callback(new Error('验证码格式有误'));
				} else {
					callback();
				}
			};
			var validatemobile = (rule, value, callback) => {
				if(!_this.$public.checkMobile(value)) {
					callback(new Error('请输入有效的手机号'));
				} else {
					callback();
				}
			};
			return {
				userData: {
					code: '', //验证码
					mobile: '' //新手机号

				},
				btnCode: {
					time: '获取验证码', //倒计时
					disabled: false
				},
				rules2: {
					code: [{
						validator: code,
						trigger: 'blur'
					}],
					mobile: [{
						validator: validatemobile,
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
						_this.$http.post(_this.$http.binding_mobile,_this.userData).then(function(response) {
							if(response.data.status == "200") {
								_this.$public.msg(response.data.msg+'，请重新登录', 'success', _this);
								//重新登录
								_this.$public.go('login',10,_this);								
							} else {
								_this.$public.msg(response.data.msg, 'warning', _this);
								_this.userData.code = '';
							}
							_this.loading = false; //防止表单重复提交标志
							
						}).catch(function(error) {});
						
						
					} else {
						return false
					}
				});
			},
			//获取验证码
			getCode() {
				var _this = this;
				
				if(_this.userData.mobile == sessionStorage.mobile){
					_this.$public.msg('更换的手机号不能和原手机号一样', 'warning', _this);
					return false;					
				}else if(!_this.$public.checkMobile(_this.userData.mobile)) {
					_this.$public.msg('请输入有效的手机号', 'warning', _this);
					return false;
				}
				_this.btnCode.disabled = true;				
				//请求接口 成功后执行此函数				
				_this.$http.post(_this.$http.send_sms, {
					mobile: _this.userData.mobile,
					type: 3
				}).then(function(response) {
					if(response.data.status == "200") {
						_this.$public.msg(response.data.msg, 'success', _this);
						_this.$public.setTime(_this); //倒计时函数封装
					} else {
						_this.btnCode.disabled = false;						
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
				
				
			},
			//返回上一页
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