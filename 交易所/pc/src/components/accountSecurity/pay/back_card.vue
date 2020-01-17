<style lang=less>
	@import '../../../assets/public.less';
	@import '../security.less';
</style>
<template>
	<div class="back_card_main">
		<el-form :model="getData" :label-position="labelPosition" status-icon :rules="rules2" ref="getData" label-width="20%" class="demo-ruleForm">
			<!-- <el-form-item :label="$t('back_card.main[0]')" prop="name">
				<el-input type="text" v-model="getData.name" auto-complete="off" :disabled="true">
				</el-input>
			</el-form-item> -->
			<el-form-item :label="$t('back_card.main[1]')" prop="bank">
				<el-input type="text" v-model="getData.bank" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="$t('back_card.main[2]')" prop="branch">
				<el-input type="text" v-model="getData.branch" auto-complete="off" :placeholder="$t('back_card.main[6]')"></el-input>
			</el-form-item>
			<el-form-item :label="$t('back_card.main[3]')" prop="bank_car">
				<el-input v-model="getData.bank_car"></el-input>
			</el-form-item>
			<el-form-item :label="$t('back_card.main[4]')" prop="tpwd">
				<el-input type="password" v-model="getData.tpwd" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>

		<div class="el-message-box__btns" style="margin-top: 15px;overflow: hidden;padding-right: 0">
			<button type="button" class="el-button el-button--default el-button--small el-button--primary btns" style="background: #2A64F3; border: none;" @click="submitForm()">
				<span>{{$t('security.one[0]')}}</span>
			</button>
			<button type="button" class="el-button el-button--default el-button--small btns btn-cancel " @click="gohistory">
				<span>{{$t('security.one[1]')}}</span>
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
			var bank = (rule, value, callback) => {
				if(!value) {
					callback(new Error(_this.$t('back_card.script[1]')));
				} else {
					callback();
				}
			};
			var branch = (rule, value, callback) => {
				if(!value) {
					callback(new Error(_this.$t('back_card.script[2]')));
				} else {
					callback();
				}
			};
			var bank_car = (rule, value, callback) => {
				if(!_this.$public.bank_car(value)) {
					callback(new Error(_this.$t('back_card.script[3]')));
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
					name: '111', //姓名
					bank: '', //开户银行
					branch: '', //开户支行
					bank_car: '', //银行卡号
					tpwd: '' //资金密码
				},
				rules2: {
					name: [{
						validator: name,
						trigger: 'blur'
					}],
					bank: [{
						validator: bank,
						trigger: 'blur'
					}],
					branch: [{
						validator: branch,
						trigger: 'blur'
					}],
					bank_car: [{
						validator: bank_car,
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
				if(!_this.getData.name) {
					_this.$public.msg(_this.$t('back_card.script[5]'), 'warning', _this);
					return false;
				} else if(!_this.getData.bank) {
					_this.$public.msg(_this.$t('back_card.script[6]'), 'warning', _this);
					return false;

				} else if(!_this.getData.branch) {
					_this.$public.msg(_this.$t('back_card.script[7]'), 'warning', _this);
					return false;

				} else if(!_this.$public.bank_car(_this.getData.bank_car)) {
					_this.$public.msg(_this.$t('back_card.script[8]'), 'warning', _this);
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
			},
			getEdit() {
				var _this = this;
				_this.$http.post(_this.$http.pay_edit, {
					id: _this.getData.id,
					type: _this.getData.type
				}).then(function(response) {
					if(response.data.status == "200") {					
						_this.getData.name = response.data.data[0].name;
						_this.getData.bank = response.data.data[0].bank;
						_this.getData.branch = response.data.data[0].branch;
						_this.getData.bank_car = response.data.data[0].bank_car;
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
			},
			gohistory() {
				this.$router.push({ path: '/security', query: { flat: 'ok' } });
			}
		},
		// 路由发生变化时
		beforeRouteLeave(to, from, next) {
			var _this = this;
			_this.getData = {
				id: '',
				type: '', //类型
				bank: '', //开户银行
				branch: '', //开户支行
				bank_car: '', //银行卡号
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