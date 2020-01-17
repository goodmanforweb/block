<style lang=less>
	@import '../../assets/public.less';
	@import './fbOrder.less';
</style>
<template> 
	<div class="fb_order_wrapper">
		<!--<HeaDer></HeaDer>-->
		<div class="order_container">
			<el-card class="content">
				<el-tabs v-model="activeName" class="deal_tables" @tab-click="handleClick">
					<el-tab-pane :label="$t('fbOrder.main[0]')" name="first">
						<el-table :data="requestData1" style="width: 100%" height="600">
							<el-table-column prop="order_num" :label="$t('fbOrder.main[1]')" width="220">
							</el-table-column>
							<el-table-column prop="add_time" :label="$t('fbOrder.main[2]')" width="220">
								<template slot-scope="scope">
									<div>{{ $public.timestampToTime(scope.row.add_time) }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="price" :label="$t('fbOrder.main[3]')">
							</el-table-column>
							<el-table-column prop="total_num" :label="$t('fbOrder.main[4]')">
							</el-table-column>
							<el-table-column prop="total_price" :label="$t('fbOrder.main[5]')">
							</el-table-column>
							<!-- <el-table-column prop="sxfee" label="手续费">
							</el-table-column> -->
							<!-- <el-table-column :label="$t('fbOrder.main[6]')">
								<template slot-scope="scope">
									<div>--</div>
								</template>
							</el-table-column> -->
							<el-table-column prop="status" :label="$t('fbOrder.main[7]')">
								<template slot-scope="scope">
									<div v-if="scope.row.status == 1" >{{$t('fbOrder.main[8]')}}</div>
									<div v-if="scope.row.status == 2">{{$t('fbOrder.main[9]')}}</div>
									<div v-if="scope.row.status == 3">{{$t('fbOrder.main[10]')}}</div>
									<div v-if="scope.row.status == 4">{{$t('fbOrder.main[11]')}}</div>
									<div v-if="scope.row.status == 5">{{$t('fbOrder.main[12]')}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="id" :label="$t('fbOrder.main[13]')">
								<template slot-scope="scope">
									<el-button type="primary" plain size="small" @click="linkOrdersFun(scope.row)">
										<span>{{$t('fbOrder.main[14]')}}</span>
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane :label="$t('fbOrder.main[15]')" name="second">
						<el-table :data="requestData2" style="width: 100%" height="600">
							<el-table-column prop="order_num" :label="$t('fbOrder.main[1]')" width="220">
							</el-table-column>
							<el-table-column prop="add_time" :label="$t('fbOrder.main[2]')" width="220">
								<template slot-scope="scope">
									<div>{{ $public.timestampToTime(scope.row.add_time) }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="price" :label="$t('fbOrder.main[3]')">
							</el-table-column>
							<el-table-column prop="total_num" :label="$t('fbOrder.main[4]')">
							</el-table-column>
							<el-table-column prop="total_price" :label="$t('fbOrder.main[5]')">
							</el-table-column>
							<!-- <el-table-column prop="sxfee" label="手续费">
							</el-table-column> -->
							<!-- <el-table-column :label="$t('fbOrder.main[6]')" prop="sxfee">
								<template slot-scope="scope">
									<div>--</div>
								</template> -->
							<!--</el-table-column>-->
							<el-table-column prop="status" :label="$t('fbOrder.main[7]')">
								<template slot-scope="scope" >
									<div v-if="scope.row.status == 1">{{$t('fbOrder.main[8]')}}</div>
									<div v-if="scope.row.status == 2">{{$t('fbOrder.main[9]')}}</div>
									<div v-if="scope.row.status == 3">{{$t('fbOrder.main[10]')}}</div>
									<div v-if="scope.row.status == 4">{{$t('fbOrder.main[11]')}}</div>
									<div v-if="scope.row.status == 5">{{$t('fbOrder.main[12]')}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="id" :label="$t('fbOrder.main[13]')">
								<template slot-scope="scope">
									<el-button type="primary" plain size="small" @click="linkOrdersFun(scope.row)">
										<span>{{$t('fbOrder.main[14]')}}</span>
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>




				</el-tabs>
			</el-card>
		</div>
		<!--<FooTer></FooTer>-->
	</div>
</template>
<script>
//import Header from "../../header/heaer.vue";
//import Footer from "../../footer/footer.vue";
export default {
	data() {
		return {
			isActive: true,
			show: true,
			activeName: 'first',
			options: [{
				value: 'USDT',
				label: 'USDT'
			}],
			selectValue: 'USDT',
			requestData1: [],
 			requestData2: [],
		}
	},
	methods: {
		handleClick(tab, event) { // 切换事件
			var _this = this;
			if(_this.activeName == 'first'){
				_this.requestPublic('requestData1','getFbMx_pmma');
			} else {
				_this.requestPublic('requestData2','getFbMx_sell');
			}
		},
		requestPublic:function (status,url) {
			var _this = this;
			_this.$http.get(_this.$http[eval('url')], {params: {}})
			.then((res) => {
				_this[eval('status')] = res.data.data.res;
			});
		},
		linkOrdersFun:function (res) {
			var _this = this;
			var data = {};
			data.data = res;
			_this.$router.push({path: '/frenchorder'});
			window.sessionStorage.order = escape(JSON.stringify(data));
		},

	},
	created: function() {
		var _this = this;
		_this.requestPublic('requestData1','getFbMx_pmma');
	},
//	components: {
//		"HeaDer": Header,
//		"FooTer": Footer,
//	}
}
</script>
<style>
.demo-table-expand {
	font-size: 0;
}
.demo-table-expand label {
	width: 90px;
	color: #fff;
}
.demo-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 50%;
}
</style>
