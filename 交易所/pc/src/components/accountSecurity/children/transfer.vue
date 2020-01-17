<style lang=less>
	@import '../../../assets/public.less';
	/*@import './moneyAddre.less';*/
	
	@import './transfer.less';
</style>
<template>
	<div class="transfer">
		<HeaDer></HeaDer>
		<div class="money_addre_container">
			<el-card class="box-card title">
				<el-breadcrumb>

					<el-breadcrumb-item>{{$t('transfer.header[0]')}}</el-breadcrumb-item>
				</el-breadcrumb>
			</el-card>
			<el-card class="box-card bit_addre">

				<el-form :label-position="labelPosition" label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm">

					<div class="bigWarp">
						<el-form-item :label="$t('transfer.verification[0]')" prop="ouid">
							<el-input v-model="ruleForm.ouid" :placeholder="$t('transfer.verification[1]')"></el-input>
						</el-form-item>
						<el-form-item :label="$t('transfer.verification[2]')" prop="price">
							<span class="canUserWall">( {{$t('transfer.verification[3]')}}：{{canuseBalance}} )</span>
							<el-input v-model="ruleForm.price" :placeholder="$t('transfer.verification[4]')"></el-input>
						</el-form-item>
						<el-form-item :label="$t('transfer.verification[5]')" prop="pwd">
							<el-input v-model="ruleForm.pwd" type='password' :placeholder="$t('transfer.verification[6]')"></el-input>
						</el-form-item>
					</div>

				</el-form>
				<p class="importent">
					<span>*{{$t('transfer.verification[7]')}}：</span> {{$t('transfer.verification[8]')}}
				</p>
				<el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading">{{$t('transfer.verification[9]')}}</el-button>
			</el-card>
			<el-card class="box-card addre_list">
				<el-table :data="addrList" style="width: 100%" height="500">
					<el-table-column prop="memo" :label="$t('transfer.verification[10]')" width='500'></el-table-column>
					<el-table-column prop="price" :label="$t('transfer.verification[11]')" width='500'></el-table-column>
					<el-table-column prop="dtime" :label="$t('transfer.verification[12]')"></el-table-column>

				</el-table>

			</el-card>
		</div>
		<FooTer></FooTer>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				addLoading: false,
				routeData: {}, // 接受传递的路由参数
				labelPosition: 'top', // form 文字排版
				addrList: [], // 地址列表数据
				ruleForm: { // 规则接收值
					ouid: '', //用户ID
					price: '', //转出数量
					pwd: '' //交易密码
				},
				userData:{
					tpwd:'',
					status:'',
				},
				canuseBalance :'--',
				rules: { // 验证规则
					ouid: [{
						required: true,
						message: this.$t('transfer.script[0]'),
						trigger: 'blur'
					}],
					price: [{
						required: true,
						message: this.$t('transfer.script[1]'),
						trigger: 'blur'
					}],
					pwd: [{
						required: true,
						message: this.$t('transfer.script[2]'),
						trigger: 'blur'
					}]
				},
			}
		},
		methods: {
			submitForm(formName) { // 添加事件函数
				var _this = this;
				this.$refs[formName].validate((valid) => {
					if(!valid) {
						return false;
					}
					if(!_this.$public.Ints(_this.ruleForm.price)){
						_this.$public.msg(_this.$t('transfer.script[3]'), 'warning', _this);
						return false;
					}else if(Number(_this.ruleForm.price)>Number(_this.canuseBalance)){
						_this.$public.msg(_this.$t('transfer.script[4]'), 'warning', _this);
						return false;
					}else if(!_this.userData.tpwd){
						_this.$public.confirm(_this.$t('transfer.script[5]'), 'security', _this);
						return false;
					}else if(_this.userData.status != 3){
						_this.$public.msg(_this.$t('transfer.script[6]'), 'warning', _this);
						return false;
					}else if(!_this.$public.pwd(_this.ruleForm.pwd)){
						_this.$public.msg(_this.$t('transfer.script[7]'), 'warning', _this);
						return false;
					}
					_this.addLoading = true;
					_this.$http.post(_this.$http.transfer, _this.ruleForm).then(function(response) {
						_this.addLoading = false;
						if(response.data.status == "200") {
							_this.$public.msg(response.data.msg, 'success', _this);
							_this.ruleForm.pwd='';
							_this.ruleForm.price='';
							_this.ruleForm.ouid='';
							//跟新数据
							_this.Record_Transfer();
							_this.get_balance();
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});

				});

			},
			get_balance() {
				var _this = this;
				//请求余额
				_this.$http.post(_this.$http.get_balance, {
					type:0
				}).then(function(response) {
					if(response.data.status == "200") {
						_this.canuseBalance = response.data.data.balance;
					}
				}).catch(function(error) {});
			},
			getuserData(){
				//请求用户信息 看有没有设置资金密码和实名认证
				var _this = this;
				_this.$http.post(_this.$http.user_info, {}).then(function(response) {
					if(response.data.status == "200") {
						_this.userData.tpwd = response.data.data.tpwd;
						_this.userData.status =  response.data.data.status;
					}
				}).catch(function(error) {});
				
			},
			//转张流水
			Record_Transfer(){
				var _this = this;
				_this.$http.get(_this.$http.Record_Transfer, {params:{}}).then(function(response) {
					if(response.data.status == "200") {
						console.log(response.data.data)
						_this.addrList = response.data.data;
					}
				}).catch(function(error) {});
			}
			

		},
		created: function() {
			var _this = this;
			_this.get_balance();
			_this.Record_Transfer();
			_this.getuserData();

		},

	}
</script>