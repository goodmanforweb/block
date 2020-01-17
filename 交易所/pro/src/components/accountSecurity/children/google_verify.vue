<style lang=less>
	@import '../../../assets/public.less';
	@import './google_verify.less';
</style>
<template> 
	<div class="google_verify">

		<div class="change_opwd_main_title">
			<h2>谷歌验证</h2>
		</div>
		<!-- <div class="change_opwd_main_header">
			<h2>
				{{$t('google_verify.header[2]')}}
				<span class="tishi">
					<i class="el-icon-info"></i>
					谷歌验证器是一款动态口令工具，工作原理类似短信动态验证。绑定后每30s生成一个动态验证码，验证码可用于登录，提现，修改安全设置等操作的安全验证
				</span>
			</h2>
		</div> -->
		<div class="form_warp">
			<div class="inner">
				<div class="tips">
					{{$t('google_verify.main[0]')}}
				</div>
				<div class="tips">
					<p class="info">
						<span>1</span>
						<span>{{$t('google_verify.main[1]')}}</span>
					</p>
					<p class="airticle">{{$t('google_verify.main[2]')}}</p>
					<p class="airticle">{{$t('google_verify.main[3]')}}</p>
					<p class="btns">
						<span class="btn">App Store</span>
						<span class="btn2">Google Play</span>
					</p>
				</div>
				<div class="tips">
					<p class="info">
						<span>2</span>
						<span>{{$t('google_verify.main[4]')}}</span>
					</p>
					<p class="airticle">{{$t('google_verify.main[5]')}}</p>
					<p class="airticle">{{$t('google_verify.main[6]')}}</p>
					<div class="step2">
						<img :src="userData.QrCodeurl">
						<p>
							<span class="security">{{$t('google_verify.main[7]')}}</span><br>
							<el-input auto-complete="off" style="width:200px" id="addInput" v-model="userData.secretKey"></el-input>
							<!-- <input :value="userData.secretKey" ></input> -->
							<span @click="copy('addInput')">{{$t('google_verify.main[8]')}}</span>
						</p>
					</div>
				</div>
				<div class="tips">
					<p class="info">
						<span>3</span>
						<span>{{$t('google_verify.verification[0]')}}</span>
					</p>
					<el-form :label-position="labelPosition" :model="userData" statu ref="userData" label-width="100px" class="demo-ruleForm" style="width:450px;">
						<el-form-item :label="$t('google_verify.verification[1]')" prop="realname">
							<el-input auto-complete="off" style="width:450px" v-model="userData.googleCode"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div class="tips">
					<p class="info">
						<span>4</span>
						<span>{{$t('google_verify.verification[2]')}}</span>
					</p>
					<el-form :label-position="labelPosition"  :model="userData" status-icon ref="userData" label-width="100px" class="demo-ruleForm" style="width:460px;">
						<el-form-item :label="$t('google_verify.verification[3]')" prop="realname">
							<el-input auto-complete="off" style="width:380px" v-model="userData.smsCode"></el-input>
							<span class="send" @click="getCode()"><span class="shu">|</span>{{btnCode.time}}</span>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
		<el-button class="google_btn" type="primary" @click="submitForm()">{{$t('google_verify.verification[4]')}}</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userData: {
					QrCodeurl: '', //二维码
					secretKey: '', //密钥
					googleCode:'',//谷歌验证码
					smsCode:'',//短信验证码
					mobile:''
				},
				btnCode: {
					time: this.$t('google_verify.script[0]'), //倒计时
					disabled: false
				},
				labelPosition: 'top'		
			};
		},
		methods: {
			//绑定执行函数
			submitForm(formName) {
				const _this=this;
				var mobile = sessionStorage.mobile;
				if(_this.userData.googleCode==''){
					_this.$public.msg(_this.$t('google_verify.script[1]'),'warning',_this)
					return false;
				}if(_this.userData.smsCode==''){
					_this.$public.msg(_this.$t('google_verify.script[2]'),'warning',_this)
					return false;
				}
				let _data={
					dyGoodleCommand:_this.userData.googleCode,
					code:_this.userData.smsCode,
					account:mobile
				}
				_this.$http.post(_this.$http.checkGoogleCommand,_data).then(res=>{
					if(res.data.status=='200'){
						_this.$public.msg(res.data.msg,'success',_this);
						_this.$public.go('/security', 100, _this);
					}else{
						_this.$public.msg(res.data.msg,'success',_this);
					}
				})
			},
			// 获取验证码
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
			getQrCode(){
				const _this=this;
				_this.$http.get(_this.$http.createGoogleCommand,{params:{account:sessionStorage.getItem('account')}}).then(function(res){
					if(res.data.status=='200'){
						_this.userData.QrCodeurl=res.data.data.local_url;
						_this.userData.secretKey=res.data.data.command;
					}
				})
			},
			go_back() {
				var _this = this;
				_this.$router.go(-1); //返回上一层
			},
			copy: function(para) { // 复制函数
				var _this = this;
				var ele = document.getElementById(para);
				ele.select();
				document.execCommand("Copy");
				_this.$public.msg(_this.$t('google_verify.script[3]'), 'success', _this);
			},
			addFocus: function(para) {
				var _this = this;
				var ele = document.getElementById(para);
				ele.setAttribute('disabled', 'disabled');
			},
			addOut: function(para) {
				var _this = this;
				var ele = document.getElementById(para);
				ele.removeAttribute('disabled');
			},
		},
		created: function() {
			var _this = this;
			_this.getQrCode();
			_this.userData.mobile = sessionStorage.getItem('mobile');
			_this.$public.scrollTop(); //返回但最顶部函数
			
		}

	}
</script>

<style>

</style>