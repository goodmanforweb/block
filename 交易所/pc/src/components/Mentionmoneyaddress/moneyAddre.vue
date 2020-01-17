<style lang=less>
	@import '../../assets/public.less';
	@import './moneyAddre.less';
</style>
<template>
	<div class="money_addre_wrapper">
		<HeaDer></HeaDer>
		
		<div class="money_addre_container">
			<div class="money_addre_main_title">
				<h2>{{$t('moneyAddre.main[0]')}}</h2>
			</div>
			<div class="bit_addre">
				<el-form :label-position="labelPosition" status-icon :model="ruleForm" :rules="rules" ref="ruleForm">
					<div class="selectWarp">
						<el-form-item :label="$t('moneyAddre.main[1]')">
							<el-select v-model="pname" :placeholder="$t('moneyAddre.main[2]')">
								<el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="bigWarp">
						<el-form-item :label="$t('moneyAddre.main[3]')" prop="addUrl">
							<el-input v-model="ruleForm.addUrl"></el-input>
						</el-form-item>
						<el-form-item :label="$t('moneyAddre.main[4]')" prop="beizhu">
							<el-input v-model="ruleForm.beizhu" type="textarea"></el-input>
						</el-form-item>
					</div>
				</el-form>
				<el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading">{{$t('moneyAddre.main[5]')}}</el-button>
			</div>

			<div class="addre_list">
				<h2>{{$t('moneyAddre.one[0]')}}</h2>
				<el-table :data="addrList" style="width: 100%" height="500">
					<el-table-column prop="qiaobao_url" :label="$t('moneyAddre.one[1]')" width="370" align="left">
					</el-table-column>
					<el-table-column prop="type" :label="$t('moneyAddre.one[2]')" width="250" :formatter="isType" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.name=='btc'">BTC</span>
							<span v-if="scope.row.name=='eth'">ETH</span>
						</template>
					</el-table-column>
					<el-table-column prop="notes" :label="$t('moneyAddre.main[4]')" width="320" align="center">
					</el-table-column>
					<el-table-column prop="id" :label="$t('moneyAddre.main[6]')" width="340" align="center">
						<template slot-scope="scope">
							<el-button @click.native.prevent="deleteRow(scope, addrList)" type="primary" plain size="small">
								{{$t("transfer.other[0]")}}
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<FooTer></FooTer>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				addLoading:false,
				routeData: {}, // 接受传递的路由参数
				labelPosition: 'left', // form 文字排版
				addrList: [], // 地址列表数据
				ruleForm: { // 规则接收值
					name: 'USDT',
					addUrl: '',
					beizhu: '',
				},
				rules: { // 验证规则
					addUrl: [{
							required: true,
							message: this.$t('moneyAddre.main[8]'),
							trigger: 'blur'
						},
						{
							max: 255,
							message: this.$t('moneyAddre.main[9]'),
							trigger: 'blur'
						}
					],
					beizhu: [{
							required: true,
							message: this.$t('moneyAddre.main[10]'),
							trigger: 'blur'
						},
						{
							min: 1,
							max: 50,
							message: this.$t('moneyAddre.main[11]'),
							trigger: 'blur'
						}
					],
				},
				options: [
					{
						value: 'btc',
						label: '比特币系提币地址'
					},{
						value: 'eth',
						label: '以太坊系提币地址'
					},
				], 
			
				value: '', // 下拉框默认值
				pname: ''
			}
		},
		methods: {
			submitForm(formName) { // 添加事件函数
				var _this = this;
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						if(!_this.pname){
							_this.$public.msg(_this.$t('moneyAddre.main[12]'), 'warning', _this);
							return false;
						}
						_this.addRow();
					} else {
						return false;
					}
				});
			},
			addRow: function() { // 添加请求
				var _this = this;
				_this.addLoading = true;
				_this.$http.post(_this.$http.deltAddre, {
						qiaobao_url: _this.ruleForm.addUrl,
						notes: _this.ruleForm.beizhu,
						type:_this.pname
					})
					.then((res) => {
						_this.addLoading = false;
						if(res.data.status == 200) {
							_this.$public.msg(res.data.msg, 'success', _this);
							_this.requestData();
						} else {
							_this.$public.msg(res.data.msg, 'warning', _this);
						}
						_this.ruleForm.addUrl = '';
						_this.ruleForm.beizhu = '';
					});
			},
			deleteRow(scope, rows) { // 删除请求
				var _this = this;
				_this.$confirm(_this.$t('moneyAddre.main[13]'), _this.$t('moneyAddre.main[14]'), {
					confirmButtonText: _this.$t('moneyAddre.main[15]'),
					cancelButtonText: _this.$t('moneyAddre.main[16]'),
					type: 'warning'
				}).then(() => {
					var $id = scope.row.id;
					var sendData = {
						qiaobao_url:scope.row.qiaobao_url,
						notes:scope.row.notes,
						act:'del',
						id:$id,
						type:scope.row.type
					}
					_this.$http.post(_this.$http.deltAddre, sendData)
						.then((res) => {
							if(res.data.status == '200'){
								rows.splice(scope.$index, 1);
							}
							_this.$message({
								message: res.data.msg,
								type: 'success'
							});
						});
				}).catch(() => {
					_this.$message({
						type: 'info',
						message: _this.$t('moneyAddre.main[17]')
					});
				});

			},
			requestData: function() { // 默认地址列表数据请求
				var _this = this;
				_this.$http.get(_this.$http.addrList, {params: {}}).then((res) => {
					if (res.data.status == '200') {
						console.log(res.data.data)
						// if(res.data.data.usdt) {
						// 	for(var i = 0; i < res.data.data.USDT.length; i++) {
						// 		_this.addrList.push(res.data.data.USDT[i]);
						// 		res.data.data.USDT[i].name = 'usdt';
						// 	}
						// }
						if(res.data.data.eth) {
							for(var i = 0; i < res.data.data.eth.length; i++) {
								_this.addrList.push(res.data.data.eth[i]);
								res.data.data.eth[i].name = 'eth';
							}
						}
						if(res.data.data.btc) {
							for(var i = 0; i < res.data.data.btc.length; i++) {
								_this.addrList.push(res.data.data.btc[i])
								res.data.data.btc[i].name = 'btc';
							}
						}
					}
				});
			},
			isType: function(cellValue) {
				if(cellValue.type === "btc") {
					return this.$t('moneyAddre.main[18]');
				} else if(cellValue.type === "eth") {
					return this.$t('moneyAddre.main[19]');
				}
			}
		},
		created: function() {
			var _this = this;
			_this.routeData = this.$route.query;
			_this.value = this.$route.query.code;
			_this.pname = this.$route.query.pname;
			_this.requestData();
		},
	}
</script>