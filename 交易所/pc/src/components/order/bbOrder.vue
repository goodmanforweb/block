<style lang=less>
	@import '../../assets/public.less';
	@import './bbOrder.less';
</style>
<template>
	<div class="bb_order_wrapper">
		<!--<HeaDer></HeaDer>-->
		<div class="order_container">
			<el-card class="content">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane :label="$t('bbOrder.main[0]')" name="first" class="nowDeal">
						<el-table :data="requestData1" style="width: 100%" :row-key="getRowKeys" :expand-row-keys="expands" height="600" v-loading="loading">
							<!-- 下拉菜单 start -->
							<el-table-column type="expand">
								<template slot-scope="props">
									<el-form label-position="right" inline class="demo-table-expand drop_down">
										<el-form-item :label="$t('bbOrder.main[1]')">
											<span v-if="props.row.trade_time==0">--</span>
											<span v-else>{{ $public.timestampToTime(props.row.trade_time) }}</span>
										</el-form-item>
										<el-form-item :label="$t('bbOrder.main[2]')">
											<span>{{ props.row.cjprice }}</span>
										</el-form-item>
										<el-form-item :label="$t('bbOrder.main[3]')">
											<span>{{ props.row.cjnum }}</span>
										</el-form-item>
										<el-form-item :label="$t('bbOrder.main[4]')">
											<span>{{ props.row.totalprice }}</span>
										</el-form-item>
										<el-form-item :label="$t('bbOrder.main[5]')">
											<span>{{ props.row.fee }}</span>
										</el-form-item>
										<el-form-item :label="$t('bbOrder.main[6]')">
											<span v-if="props.row.otype ==1">{{$t('bbOrder.main[7]')}}</span>
											<span v-else>{{$t('bbOrder.main[8]')}}</span>
										</el-form-item>
									</el-form>
								</template>
							</el-table-column>
							<!-- 下拉菜单 end -->
							<el-table-column prop="add_time" :label="$t('bbOrder.main[9]')">
								<template slot-scope="scope">
									<div>{{ $public.timestampToTime(scope.row.add_time) }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="pname" :label="$t('bbOrder.main[10]')">
							</el-table-column>
							<el-table-column prop="type" :label="$t('bbOrder.main[11]')">
								<template slot-scope="scope">
									<div v-if="scope.row.type == 1 " class="green">{{$t('bbOrder.main[12]')}}</div>
									<div v-else class="red">{{$t('bbOrder.main[13]')}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="wtprice" :label="$t('bbOrder.main[14]')">
							</el-table-column>
							<el-table-column prop="wtnum" :label="$t('bbOrder.main[15]')">
							</el-table-column>
							<el-table-column prop="status" :label="$t('bbOrder.main[16]')">
								<template slot-scope="scope">
									<div v-if="scope.row.status == 0">{{$t('bbOrder.main[17]')}}</div>
									<div v-else-if="scope.row.status == 1">{{$t('bbOrder.main[18]')}}</div>
									<div v-else-if="scope.row.status == 2">{{$t('bbOrder.main[19]')}}</div>
									<div v-else>{{$t('bbOrder.main[20]')}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="id" :label="$t('bbOrder.main[21]')">
								<template slot-scope="scope">
									<el-button v-if="scope.row.status==0 ||	 scope.row.status==1" @click.native.prevent="deleteRow(scope, requestData1)" type="primary" plain size="small">
										<span>{{$t('bbOrder.main[22]')}}</span>
									</el-button>
									<el-button v-else disabled @click.native.prevent="deleteRow(scope, requestData1)" type="primary" plain size="small">
										<span>{{$t('bbOrder.main[22]')}}</span>
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane :label="$t('bbOrder.main[23]')" name="second" class="historyWt">
						<el-table :data="requestData2" style="width: 100%" height="600" v-loading="loading">
							<!-- 下拉菜单 start -->
							<el-table-column type="expand">
								<template slot-scope="props">
									<el-form label-position="left" inline class="demo-table-expand drop_down">
										<el-form-item :label="$t('bbOrder.main[1]')">
											<span>{{ $public.timestampToTime(props.row.trade_time) }}</span>
										</el-form-item>
										<el-form-item :label="$t('bbOrder.main[2]')">
											<span>{{ props.row.cjprice }}</span>
										</el-form-item>
										<el-form-item :label="$t('bbOrder.main[3]')">
											<span>{{ props.row.cjnum }}</span>
										</el-form-item>
										<el-form-item :label="$t('bbOrder.main[4]')">
											<span>{{ props.row.totalprice }}</span>
										</el-form-item>
										<el-form-item :label="$t('bbOrder.main[5]')">
											<span>{{ props.row.fee }}</span>
										</el-form-item>
										<el-form-item :label="$t('bbOrder.main[6]')">
											<span v-if="props.row.otype ==1">{{$t('bbOrder.main[7]')}}</span>
											<span v-else>{{$t('bbOrder.main[8]')}}</span>
										</el-form-item>
									</el-form>
								</template>
							</el-table-column>
							<!-- 下拉菜单 end -->
							<el-table-column prop="add_time" :label="$t('bbOrder.main[9]')">
								<template slot-scope="scope">
									<div>{{ $public.timestampToTime(scope.row.add_time) }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="pname" :label="$t('bbOrder.main[10]')">
							</el-table-column>
							<el-table-column prop="type" :label="$t('bbOrder.main[11]')">
								<template slot-scope="scope">
									<div v-if="scope.row.type == 1 " class="green">{{$t('bbOrder.main[12]')}}</div>
									<div v-else class="red">{{$t('bbOrder.main[13]')}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="wtprice" :label="$t('bbOrder.main[14]')">
							</el-table-column>
							<el-table-column prop="wtnum" :label="$t('bbOrder.main[15]')">
								<template slot-scope="scope">
									<div v-if="scope.row.wtnum > 0 ">{{ scope.row.wtnum }}</div>
									<div v-else>{{ scope.row.totalprice }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="status" :label="$t('bbOrder.main[16]')">
								<template slot-scope="scope">
									<div v-if="scope.row.status == 0">{{$t('bbOrder.main[17]')}}</div>
									<div v-else-if="scope.row.status == 1">{{$t('bbOrder.main[18]')}}</div>
									<div v-else-if="scope.row.status == 2">{{$t('bbOrder.main[19]')}}</div>
									<div v-else>{{$t('bbOrder.main[20]')}}</div>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs>
				<div class="right">
					<div class="bitType">{{$t('bbOrder.main[24]')}}</div>
					<span>/</span>
					<el-select v-model="selectValue" :placeholder="$t('bbOrder.main[25]')">
						<el-option key="" :label="$t('bbOrder.main[26]')" value="">
						</el-option>
						<!--<el-option v-for="item in options" :key="item.mark" :label="item.pname" :value="item.mark">
						</el-option>-->
						<el-option key="qb_usdt" label="BF/USDT" value="qb_usdt">
						</el-option>
						<el-option key="btc_usdt" label="BTC/USDT" value="btc_usdt">
						</el-option>
						<el-option key="eth_usdt" label="ETH/USDT" value="eth_usdt">
						</el-option>
					</el-select>
					<el-button @click="searchBtn" type="primary">{{$t('bbOrder.main[27]')}}</el-button>
				</div>
			</el-card>
		</div>
		<!--<FooTer></FooTer>-->
	</div>
</template>
<script>
//	import Header from "../../header/heaer.vue";
//	import Footer from "../../footer/footer.vue";
	export default {
		data() {
			return {
				loading: true,
				isActive: true,
				show: true,
				activeName: 'first',
				requestData1: [],
				requestData2: [],
				options: [{
					mark: 'USDT',
					pname: 'USDT'
				}],
				selectLabel: '',
				selectValue: '',
				expands: [], // 要展开的行，数值的元素是row的key值
			}
		},
		methods: {
			getRowKeys(row) { // 获取每行的orderid
				return row.orders_id;
			},
			handleClick(tab, event) { // 切换事件
				var _this = this;
				_this.getBitType();
				_this.loading = true;
				if(_this.activeName == 'first') {
					_this.requestPublic(3, 'requestData1', null);
				} else {
					_this.requestPublic(4, 'requestData2', null);
				}
			},
			deleteRow(scope, rows) { // 撤单请求
				var _this = this;
				_this.$confirm(_this.$t('bbOrder.main[28]'), _this.$t('bbOrder.main[29]'), {
					confirmButtonText: _this.$t('bbOrder.main[30]'),
					cancelButtonText: _this.$t('bbOrder.main[31]'),
					type: 'warning'
				}).then(() => {
					var orders_id = scope.row.orders_id;
					var mobile = sessionStorage.getItem('mobile');
					_this.$http.post(_this.$http.dealCancel, {
							'mobile': mobile,
							'order_id': orders_id
						})
						.then((res) => {
							if(res.data.status == 200) {
								rows.splice(scope.$index, 1);
								_this.$message({
									message: res.data.msg,
									type: 'success'
								});
							} else {
								_this.$message({
									message: res.data.msg,
									type: 'warning'
								});
							}
						});
				}).catch(() => {
					_this.$message({
						type: 'info',
						message: _this.$t('bbOrder.main[32]')
					});
				});
			},
			searchBtn() { // 搜索按钮事件
				var _this = this;
				//				if(_this.selectValue == '') {
				//					_this.$public.msg('搜索值为空，请选择搜索条件', 'warning', _this);
				//				} else {
				//					
				//				}

				_this.loading = true;
				if(_this.activeName == 'first') {
					_this.requestPublic(3, 'requestData1', _this.selectValue);
				} else {
					_this.requestPublic(4, 'requestData2', _this.selectValue);
				}
			},
			getBitType: function() { // 获取币种信息
				var _this = this;
				_this.$http.post(_this.$http.getPro, {})
					.then((res) => {
						_this.selectLabel = res.data.data[0].pname;
						//						_this.selectValue = res.data.data[0].mark;
						_this.selectValue = '';
						_this.options = res.data.data;
					});
			},
			requestPublic: function(status, dataType, code) { // 默认请求、初始化请求
				var _this = this;
				var dataType = dataType;
				var mobile = sessionStorage.getItem('mobile');
				_this.$http.post(_this.$http.tranlist, {
						mobile: mobile,
						status: status,
						code: code
					})
					.then((res) => {
						_this.requestData1 = [];
						_this.requestData2 = [];
						setTimeout(function() {
							_this[eval('dataType')] = res.data.data;
							_this.loading = false;
							if(_this.requestData1.length >= 1) { // 默认打开委托第一行
								_this.expands.push(_this.requestData1[0].orders_id);
							}
						}, 500);
					});
			}
		},
		created: function() {
			var _this = this;
			_this.getBitType();
			_this.requestPublic(3, 'requestData1');
		},
//		components: {
//			"HeaDer": Header,
//			"FooTer": Footer,
//		}
	}
</script>