<style lang=less>
	@import '../../assets/public.less';
	@import './tiBit.less';
</style>
<template>
	<div class="ti_bit_wrapper">
		<HeaDer></HeaDer>
		<div class="ti_bit_container">
			<el-card class="box-card">
				<div class="title">账户提现</div>
			</el-card>
			<el-card class="box-card ti_top">
				<div class="right_title">
					<!--<span>账户总资产：{{ wallone }} USDT</span>-->
					<!--<div class="title_link" @click="gomoneyAdd">
						提币地址管理
					</div>-->
				</div>
				<el-card class="box-card ti_bit_inner">
					<el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="tiBit_form">
						<el-form-item label="提币地址" prop="addres" class="addreSelect">
							<el-input class="writeAdd" v-model="ruleForm.addres"></el-input>
							<el-select class="selectAdd" v-model="ruleForm.addres" placeholder="请选择提币地址">
								<el-option v-for="(todo,index) in getBitArray" :key="index" :label="todo.qiaobao_url" :value="todo.qiaobao_url">
									<span style="float: left">{{ todo.qiaobao_url }}</span> &nbsp;&nbsp;
									<span style="float: right; color: #8492a6; font-size: 13px">{{todo.notes}}</span>

								</el-option>

								<!--<el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
									<span style="float: left">{{ item.label }}</span>
									<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
								</el-option>-->

							</el-select>
						</el-form-item>
						<el-form-item label="数量" prop="num" class="highMoney">
							<el-input v-model.number="ruleForm.num" v-if="!limit.tb_min" :placeholder="'提币范围 ： '"></el-input>
							<el-input v-model.number="ruleForm.num" :placeholder="'提币范围 ： ' + limit.tb_min +'-'+ limit.tb_max" v-else></el-input>
						</el-form-item>
						<el-form-item label="交易密码" prop="pass">
							<el-input type="password" v-model="ruleForm.pass"></el-input>
						</el-form-item>

						<div class="code_warp">
							<el-form-item label="短信验证码" prop="code">
								<el-input v-model.number="ruleForm.code" auto-complete="off"></el-input>
							</el-form-item>
							<div class="btn_code" @click="getCode()">
								<el-input type="button" :value='btnCode.time' :disabled='btnCode.disabled'></el-input>
							</div>
						</div>

						<div class="money">
							<section class="section">
								<label>手续费</label>
								<div class="div">
									<span v-if="!limit.tb_fee">--</span>
									<span v-else>{{ limit.tb_fee }}</span>
									<span>{{pname}}</span>
								</div>
							</section>
							<section class="section">
								<label>到账数量</label>
								<div class="div">
									<span>{{ ruleForm.num }}</span>
									<span>{{pname}}</span>
								</div>
							</section>
						</div>
						<div class="tiBit">
							<div class="left">
								<span>温馨提示</span>
								<ul class="list">
									<!-- <li>最小提币数量：200 USDT。</li> -->
									<li>为保障资金安全，当您账户安全策略变更、密码修改、使用新地址提币，我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。</li>
									<li>请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</li>
								</ul>
							</div>
							<el-form-item>
								<el-button type="primary" class="goBit" @click="submitForm('ruleForm')">提币</el-button>
							</el-form-item>
						</div>
					</el-form>

				</el-card>
			</el-card>
		</div>
		<FooTer></FooTer>
	</div>
</template>
<script>
	// import Header from "../../header/heaer.vue";
	// import Footer from "../../footer/footer.vue";
	export default {
		data() {
			return {
				labelPosition: 'top',
				wallone: '', // 账户总资产
				tb_fee: '', // 手续费
				pid: '',
				ruleForm: {
					addres: '',
					num: '',
					pass: '',
					code: ''
				},
				panme: '',
				getBitArray: [],
				rules: {
					addres: [{
						required: true,
						message: '请选择提币地址',
						trigger: 'blur'
					}],
					num: [{
							required: true,
							message: '请输入提币数量',
							trigger: 'change'
						},
						{
							type: 'number',
							message: '数量必须为数字值'
						}
					],
					pass: [{
						required: true,
						message: '请输入交易密码',
						trigger: 'change'
					}],
					code: [{
							required: true,
							message: '请输入验证码',
							trigger: 'change'
						},
						{
							type: 'number',
							message: '验证码必须为数字值'
						}
					]
				},
				btnCode: {
					time: '获取验证码', //倒计时
					disabled: false
				},
				limit: "", //提币限制
				code: '', //页面标示
				status:'' //判断是否实名认证
			}
		},
		methods: {
			submitForm(formName) {
				var _this = this;
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.goBit();
					} else {
						return false;
					}
				});
			},
			//			gomoneyAdd(){
			//				this.$router.push({ path: '/moneyAddre', query: { pname: this.pname }})
			////				<router-link :to="{path:'/moneyAddre',query: {url:'/tiBit',name: '账户提现'}}">提币地址管理</router-link>
			//			},
			getCode: function() {
				var _this = this;
				var mobile = sessionStorage.getItem('mobile');
				if(!mobile) {
					_this.$public.msg('请先登录', 'warning', _this);
					return;
				}
				_this.btnCode.disabled = true;
				//获取验证码
				_this.$http.post(_this.$http.send_sms, {
						mobile: mobile,
						type: 5
					})
					.then(function(res) {
						if(res.data.status == "200") {
							_this.$public.setTime(_this); //倒计时函数封装
						} else {
							_this.$public.msg('请先登录', 'warning', _this);
						}
					}).catch(function(error) {});
			},
			goBit: function() {
				var _this = this;
				if(_this.ruleForm.num > _this.limit.tb_max || _this.ruleForm.num < _this.limit.tb_min) {
					_this.$public.msg('提币数量在' + _this.limit.tb_min + '和' + _this.limit.tb_max + '之间', 'warning', _this);
					return false;
				} else if(_this.status == 1) {
					_this.$public.confirm('您还没有进行高级认证暂不能提币，是否前往身份认证?', 'identity', _this);
					return false;
				} else if(_this.status == 2) {
					_this.$public.msg('您的信息正在审核中，暂不能进行此操作', 'warning', _this);
					return false;
				} else if(_this.status == 4) {
					_this.$public.confirm('您高级认证失败暂不能提币，是否重新认证?', 'identity', _this);
					return false;
				}
				var mobile = sessionStorage.getItem('mobile');
				_this.$http.get(_this.$http.goBit, {
						params: {
							mobile: mobile,
							num: _this.ruleForm.num,
							tpwd: _this.ruleForm.pass,
							code: _this.ruleForm.code,
							qianbao_url: _this.ruleForm.addres,
							pid: _this.pid
						}
					})
					.then((res) => {
						if(res.data.status == 200) {
							_this.$public.msg(res.data.msg, 'success', _this);
							this.initForm();
						} else {
							_this.$public.msg(res.data.msg, 'warning', _this);
							this.initForm();
						}
					});
			},
			//获得提币限制条件
			get_tb() {
				var _this = this;
				_this.$http.get(_this.$http.get_tb, {
					params: {
						pid: _this.pid
					}
				}).then(function(response) {
					if(response.data.status == "200") {
						_this.limit = response.data.data
					}
				}).catch(function(error) {});
			},
			getData() {
				var _this = this;
				_this.$http.post(_this.$http.user_info, {}).then(function(response) {
					if(response.data.status == "200") {
						_this.status = response.data.data.status;
						

					} else if(response.data.status == "0") {
						_this.$public.confirm('您还没有登录，是否前往登录?', 'login', _this);
					}
				}).catch(function(error) {});

			},
			getBitAddre: function() {
				var _this = this;
				_this.$http.get(_this.$http.addrList, {
						params: {
							id: _this.pid
						}
					})
					.then((res) => {
						if(_this.pname == 'BTC' || _this.pname == 'USDT') {
							_this.getBitArray = res.data.data.btc;

						} else if(_this.pname == 'ETH' || _this.pname == 'BF') {
							_this.getBitArray = res.data.data.eth;
						} else {
							_this.getBitArray = res.data.data.eth;
						}
						_this.tb_fee = res.data.data.tb_fee;
						//						_this.wallone = res.data.data.wallone;
					});
			},
			initForm: function() {
				var _this = this;
				this.$refs['ruleForm'].resetFields();
			}
		},
		created: function() {
			//BTC 和  USDT是 比特币
			//_this.$public.msg('稍后开放', 'warning', _this);
			//ETH 和 BF  以太坊

			var _this = this;
			_this.code = this.$route.query.code;
			_this.pname = this.$route.query.pname;
			_this.pid = this.$route.query.pid;
			_this.getBitAddre();
			_this.get_tb();
			_this.getData();
		},
		// components: {
		// 	"HeaDer": Header,
		// 	"FooTer": Footer,
		// }
	}
</script>