<style lang=less>
	@import '../assets/public.less';
	@import './login.less';
	@import './mian.less';
</style>
<template lang="html">
	<div class="main mainy" id="main">
		<HeaDer></HeaDer>
		<div class="login_main">
			<div class="header_login">
				<h2 class="welcome_reg">{{$t('tips.tishi[4]')}}</h2>
			</div>
			<div class="form_warp">
				<div class="content_warp">
					<el-form :label-position="labelPosition" :model="userData" status-icon :rules="rules2" ref="userData" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
						<el-form-item :label="$t('tips.tishi[5]')" prop="dyGoodleCommand">
							<el-input v-model="userData.dyGoodleCommand" auto-complete="off" :placeholder="$t('tips.tishi[6]')"></el-input>
						</el-form-item>
						<div class="primary_btn">
							<el-form-item>
								<el-button type="primary" @click="submitForm('userData')" :loading="loading">{{$t('tips.tishi[7]')}}</el-button>
							</el-form-item>
						</div>
					</el-form>
				</div>
			</div>
		</div>
		<FooTer></FooTer>
	</div>
</template>
<script>
	import Header1 from "./main/header.vue";
	import Footer1 from "./main/footer.vue";
	// import Verify from 'vue2-verify'
	export default {
		data() {
			var _this = this;
			var dyGoodleCommand = (rule, value, callback) => {
				if(!_this.$public.code(value)) {
					return callback(new Error(_this.$t('tips.tishi[8]')));
				} else {
					callback();
				}
			};
			return {
				labelPosition: 'top', //插件自带
				userData: {
					dyGoodleCommand:'',
				},
				rules2: {
					dyGoodleCommand: [{
						validator: dyGoodleCommand,
						trigger: 'blur'
					}],
				},
				loading: false, //防止表单重复提交标志位
				nums: 0,
				isDisplay: 'display:none' //控制弹框出现和消失
			};
		},
		methods: {
			//注册执行函数
			submitForm(formName) {
				var _this = this;
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						//请求ajax 提交表单
						_this.loading = true;
						sessionStorage.account=sessionStorage.account1;
						sessionStorage.token=sessionStorage.token1;
						_this.$http.post(_this.$http.check_google_code, _this.userData).then(function(response) {
							_this.loading = false;
							if(response.data.status == "200") {
								sessionStorage.mobile = sessionStorage.mobile1;
								sessionStorage.removeItem('account1');
								sessionStorage.removeItem('token1');
								sessionStorage.removeItem('mobile1');
								_this.$public.msg(response.data.msg, 'warning', _this);
								_this.$public.go('home',10,_this);
							} else {
								_this.$public.msg(response.data.msg, 'warning', _this);
							}
						}).catch(function(error) {});
					} else {
						return false
					}
				});
			},
		},
		mounted: function() {
			if(this.$cookies.get('changeBg') == 'night'||!this.$cookies.get('changeBg')) {
				$('#main').removeClass('mainb');
				$('#main').addClass('mainy');
			} else {
				$('#main').removeClass('mainy');
				$('#main').addClass('mainb');
			}
		},
		components: {
			// Verify,
			"HeaDer":Header1,
		    "FooTer":Footer1,
		}

	}
</script>
<style>

</style>