<style lang=less>
	@import '../../assets/public.less';
	@import './moneyAddre.less';
</style>
<template>
	<div class="money_addre_wrapper">
		<HeaDer></HeaDer>
		<div class="money_addre_container">
			<el-card class="box-card title">
				<el-breadcrumb>
					<!--<el-breadcrumb-item :to="routeData.url">-->
					<!--{{routeData.name}}-->
					<!--账户提现-->
					<!--</el-breadcrumb-item>-->
					<el-breadcrumb-item>{{$t('moneyAddre.header[0]')}}</el-breadcrumb-item>
				</el-breadcrumb>
			</el-card>
			<el-card class="box-card bit_addre">

				<el-form :label-position="labelPosition" label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm">
					<div class="selectWarp">
						<el-form-item :label="$t('moneyAddre.main[0]')">
							<el-select v-model="pname" :placeholder="$t('moneyAddre.main[1]')">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="bigWarp">
						<el-form-item :label="$t('moneyAddre.main[2]')" prop="addUrl">
							<el-input v-model="ruleForm.addUrl"></el-input>
						</el-form-item>
						<el-form-item :label="$t('moneyAddre.main[3]')" prop="beizhu">
							<el-input v-model="ruleForm.beizhu"></el-input>
						</el-form-item>
					</div>
				</el-form>
				<el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading">{{$t('moneyAddre.main[4]')}}</el-button>
			</el-card>
			<el-card class="box-card addre_list">
				<el-table :data="addrList" style="width: 100%" height="500">
					<el-table-column prop="type" :label="$t('moneyAddre.main[5]')" width="200" :formatter="isType">
					</el-table-column>
					<el-table-column prop="qiaobao_url" :label="$t('moneyAddre.main[6]')">
					</el-table-column>
					<el-table-column prop="notes" :label="$t('moneyAddre.main[7]')">
					</el-table-column>
					<el-table-column prop="id" :label="$t('moneyAddre.main[8]')" width="100">
						<template slot-scope="scope">
							<el-button @click.native.prevent="deleteRow(scope, addrList)" type="primary" plain size="small">
								{{$t('moneyAddre.main[9]')}}
							</el-button>
						</template>
					</el-table-column>
				</el-table>

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
				addLoading:false,
				routeData: {}, // 接受传递的路由参数
				labelPosition: 'top', // form 文字排版
				addrList: [], // 地址列表数据
				ruleForm: { // 规则接收值
					name: 'USDT',
					addUrl: '',
					beizhu: '',
				},
				rules: { // 验证规则
					addUrl: [{
							required: true,
							message: this.$t('moneyAddre.script[0]'),
							trigger: 'blur'
						},
						{
							max: 255,
							message: this.$t('moneyAddre.script[1]'),
							trigger: 'blur'
						}
					],
					beizhu: [{
							required: true,
							message: this.$t('moneyAddre.script[2]'),
							trigger: 'blur'
						},
						{
							min: 1,
							max: 50,
							message: this.$t('moneyAddre.script[3]'),
							trigger: 'blur'
						}
					],
				},
				options: [{
					value: 'btc',
					label: this.$t('moneyAddre.script[4]')
				}], // 下拉框值
				
//				{
//					value: 'eth',
//					label: '以太坊'
//				}, 
			
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
							_this.$public.msg(_this.$t('moneyAddre.script[5]'), 'warning', _this);
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
				_this.$confirm(_this.$t('moneyAddre.script[6]'), _this.$t('moneyAddre.script[7]'), {
					confirmButtonText: _this.$t('moneyAddre.script[8]'),
					cancelButtonText: _this.$t('moneyAddre.script[9]'),
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
//					rows.splice(scope.$index, 1);
					
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
						message: _this.$t('moneyAddre.script[10]')
					});
				});

			},
			requestData: function() { // 默认地址列表数据请求
				var _this = this;
				_this.$http.get(_this.$http.addrList, {
						params: {}
					})
					.then((res) => {
						_this.addrList = res.data.data.btc;
						for(var i = 0; i < res.data.data.eth.length; i++) {
							_this.addrList.push(res.data.data.eth[i]);
						}
					});
			},
			isType: function(cellValue) {
				if(cellValue.type === "btc") {
					return _this.$t('moneyAddre.script[11]');
				} else if(cellValue.type === "eth") {
					return _this.$t('moneyAddre.script[12]');
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
		// components: {
		// 	"HeaDer": Header,
		// 	"FooTer": Footer,
		// }
	}
</script>