<style lang=less>
	@import '../../../assets/public.less';
	@import './change_pwd.less';
</style>
<template>
	<div class="change_opwd_main">
		<div class="change_opwd_main_title">
			<h2 class="title" @click="go_back">{{$t('change_mobile.header[0]')}}</h2>
			<span>></span>
			<h2>{{$t('change_mobile.main[0]')}}</h2>
		</div>
		<!-- <div class="change_opwd_main_header">
			<h2>
				{{$t('change_mobile.main[0]')}}
				<span class="tishi">
					<i class="el-icon-info"></i>
				</span>
			</h2>
		</div> -->
		<div class="form_warp tpwd">
			<div class="form_cont">
				<el-form :label-position="labelPosition" :model="userData" status-icon :rules="rules2" ref="userData" label-width="100px" class="demo-ruleForm">
					
					
					<el-form-item :label="$t('change_mobile.verification[0]')" class="mcode">
							<el-select @change="changeMcode" name="mcode" id="quhao" v-model="userData.mcode">
								<el-option v-for="item in mCode" :key="item.value" :label="item.name" :value="item.id">
	
								</el-option>
							</el-select>
						<el-input type="text" v-model="userData.mobile" auto-complete="off" class="mInput"></el-input>
					</el-form-item>
					<div class="code_warp">
						<el-form-item :label="$t('change_mobile.verification[1]')" prop="code">
							<el-input v-model.number="userData.code" auto-complete="off"></el-input>
						</el-form-item>
						<div class="btn_code" @click="getCode()">
							<el-input type="button" :value='btnCode.time' :disabled='btnCode.disabled'></el-input>
						</div>
					</div>
					<el-form-item>
						<el-button type="primary" @click="submitForm('userData')" :loading="loading">{{$t('change_mobile.verification[2]')}}</el-button>
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
					return callback(new Error(_this.$t('change_mobile.script[0]')));
				} else {
					callback();
				}
			};
			var validatemobile = (rule, value, callback) => {
				if(!_this.$public.checkMobile(value)) {
					callback(new Error(_this.$t('change_mobile.script[1]')));
				} else {
					callback();
				}
			};
			return {
				userData: {
					code: '', //验证码
					mobile: '', //新手机号
					mcode:'',//手机号区号
				},
				btnCode: {
					time: _this.$t('change_mobile.script[2]'), //倒计时
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
			};
		},
		methods: {
			changeMcode(){
				sessionStorage.setItem('mcode',this.userData.mcode)
			},
			//注册执行函数
			submitForm(formName) {
				var _this = this;
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.loading = true; //防止表单重复提交标志
						_this.$http.post(_this.$http.binding_mobile,_this.userData).then(function(response) {
							if(response.data.status == "200") {
								_this.$public.msg(response.data.msg, 'success', _this);
								setTimeout(function() {
									_this.$router.go(-1); //返回上一层
								}, 10)						
							} else {
								_this.$public.msg(response.data.data.error, 'warning', _this);
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
				if(!_this.userData.mcode){
					_this.$public.msg(_this.$t('change[0]'),'warning',_this)
					return ;
				}
				if(!_this.userData.mobile){
					_this.$public.msg(_this.$t('change[1]'),'warning',_this)
					return ;
				}
				if(_this.userData.mobile == sessionStorage.mobile){
					_this.$public.msg(_this.$t('change_mobile.script[4]'), 'warning', _this);
					return false;					
				}else if(!_this.$public.checkMobile(_this.userData.mobile)) {
					_this.$public.msg(_this.$t('change_mobile.script[5]'), 'warning', _this);
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

					}else if(response.data.data.code == "108"){
						_this.btnCode.disabled = false;		
						_this.$public.msg(response.data.data.error, 'warning', _this);
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
			this.userData.mcode = this.mCode[0].id
			sessionStorage.setItem('mcode', this.userData.mcode)
			_this.$public.scrollTop(); //返回但最顶部函数
		}
	}
</script>

<style>

</style>