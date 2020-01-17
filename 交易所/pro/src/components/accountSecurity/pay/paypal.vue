<style lang=less>
	@import '../../../assets/public.less';
	@import '../security.less';

</style>
<template>
	<div class="back_card_main">
		<el-form :model="getData" :label-position="labelPosition" status-icon :rules="rules2" ref="getData" label-width="100px" class="demo-ruleForm">
			<!-- <el-form-item :label="$t('back_card.main[0]')" prop="name">
				<el-input type="text" v-model="getData.name" auto-complete="off" :disabled="true">
				</el-input>
			</el-form-item> -->
			<el-form-item label="Paypal账户" prop="pal_account">
				<el-input type="text" v-model="getData.pal_account" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="$t('back_card.main[4]')" prop="tpwd">
				<el-input type="password" v-model="getData.tpwd" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>

		<div class="el-message-box__btns">
			<button type="button" class="el-button el-button--default el-button--small el-button--primary " @click="submitForm()">
				<span>{{$t('back_card.main[5]')}}</span>
			</button>
		</div>
	</div>
</template>
<script>
	export default {

		data() {
			var _this = this;
			var name = (rule, value, callback) => {
				if(!value) {
					return callback(new Error(_this.$t('back_card.script[0]')));
				} else {
					callback();
				}
			};
			var pal_account = (rule, value, callback) => {
				if(!value) {
					callback(new Error('paypal账号格式不正确'));
				} else {
					callback();
				}
			};
			var tpwd = (rule, value, callback) => {
				if(!_this.$public.pwd(value)) {
					callback(new Error(_this.$t('back_card.script[4]')));
				} else {
					callback();
				}
			};
			return {
				labelPosition: 'right',
				getData: {
					act: 'add', //添加还是编辑
					id: '',
					type: '', //类型
					name: '', //姓名
					pal_account: '', //paypal账号
					tpwd: '' //资金密码
				},
				rules2: {
					name: [{
						validator: name,
						trigger: 'blur'
					}],
					pal_account: [{
						validator: pal_account,
						trigger: 'blur'
					}],
					tpwd: [{
						validator: tpwd,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm() {

				var _this = this;
				//				_this.$refs[_this.getData].resetFields();
				if(!_this.getData.name) {
					_this.$public.msg(_this.$t('back_card.script[5]'), 'warning', _this);
					return false;
				} else if(!_this.$public.bank_car(_this.getData.pal_account)) {
					_this.$public.msg('paypal账号格式不正确', 'warning', _this);
					return false;
				} else if(!_this.$public.pwd(_this.getData.tpwd)) {
					_this.$public.msg(_this.$t('back_card.script[9]'), 'warning', _this);
					return false;
				}
				//请求接口
				_this.$http.post(_this.$http.pay_add, _this.getData).then(function(response) {
					if(response.data.status == "200") {
						_this.$public.msg(response.data.msg, 'success', _this);

						_this.$public.go('/security?flat=ok',10,_this); 
						

					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});

				//请求ajax发送数据
			},
			getEdit() {
				var _this = this;
				_this.$http.post(_this.$http.pay_edit, {
					id: _this.getData.id,
					type: _this.getData.type
				}).then(function(response) {
					if(response.data.status == "200") {					
						_this.getData.name = response.data.data[0].name;
						_this.getData.pal_account = response.data.data[0].pal_account;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},

			init() {
				var _this = this;
				_this.getData.type = _this.$route.query.type //类型
				_this.getData.id = _this.$route.query.id //类型		
				if(_this.$route.query.id == undefined) {
					_this.getData.name = sessionStorage.name;					
					_this.getData.act = 'add';
				} else {
					_this.getData.act = 'edit';
					_this.getEdit();
				}
			}
		},
		// 路由发生变化时
		beforeRouteLeave(to, from, next) {
			var _this = this;
			_this.getData = {
				id: '',
				type: '', //类型
				pal_account: '', //银行卡号
				tpwd: '' //资金密码
			};
			next()
		},

		created: function() {
			var _this = this;
			_this.init();
		},
	}
</script>

<style scoped="scoped">

</style>