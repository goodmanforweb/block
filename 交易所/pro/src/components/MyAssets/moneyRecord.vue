<style lang=less>
	@import '../../assets/public.less';
	@import './moneyRecord.less';
</style>
<template>
	<div class="money_record_wrapper">
		<HeaDer></HeaDer>
		<div class="money_record_container">
			<el-card class="box-card title">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/MyAssets' }">资产</el-breadcrumb-item>
					<el-breadcrumb-item>财务记录</el-breadcrumb-item>
				</el-breadcrumb>
			</el-card>
			<!--  交易记录 -->
			<!--<el-card class="box-card record_zuixin">
				<el-tabs v-model="activeName1">
					<el-tab-pane label="交易记录" name="first">
						<el-table :data="dealData" style="width: 100%" height="288">
							<el-table-column prop="addtime" label="时间">
								<template slot-scope="scope">
									<div>{{ $public.timestampToTime(scope.row.addtime) }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="cat" label="币种">
							</el-table-column>
							<el-table-column prop="type" label="类型">
							</el-table-column>
							<el-table-column prop="price" label="数量">
							</el-table-column>
							<el-table-column prop="state" label="状态" width="150">
								<template slot-scope="scope">
									<div v-if="scope.row.state == 1">已结算</div>
									<div v-else>未结算</div>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-pagination
						@current-change="handleCurrentChange" 
						layout="prev,pager, next" 
						prev-text="上一页" 
						next-text="下一页" 
						:page-size="5"
						background
						:total="JYtotal">
					</el-pagination>
				</el-tabs>
			</el-card>-->

			<!-- 充币、提币 -->
			<el-card class="box-card record_list">
				<el-tabs v-model="activeNumber" @tab-click="handleClick2">
					<el-tab-pane label="充币记录" name="chongBit">
						<table class="table" v-loading="loading">
							<tr>
								<td class="tb_url">提币地址</td>
								<th>提交时间</th>
								<th>审核时间</th>
								<th>提币数量</th>
								<th>状态</th>
							</tr>
							<tr v-for="(todo,index) in recordData1.res" :key="index">
								<td class="tb_url">{{todo.chongzhi_url}}</td>
								<td>{{ $public.timestampToTime(todo.addtime) }}</td>
								<td v-if="todo.check_time">{{ $public.timestampToTime(todo.check_time) }}</td>
								<td v-else> --</td>
								<td>{{ todo.price }}</td>
								<!--// 1 待审核 2到账中 3已拒绝 4已到账-->
								<td v-if="todo.state == 1">待审核</td>
								<td v-else-if="todo.state == 2">到账中</td>
								<td v-else-if = "todo.state == 3">已拒绝</td>
								<td v-else-if = "todo.state == 4">已到账</td>
								<td v-else>--</td>
							</tr>
						</table>
					</el-tab-pane>
					<el-tab-pane label="提币记录" name="tiBit">
						<table class="table" v-loading="loading">
							<tr>
								<td class="tb_url">提币地址</td>
								<th>提交时间</th>
								<th>审核时间</th>
								<th>提币数量</th>
								<th>状态</th>
							</tr>
							<tr v-for="(todo,index) in recordData2.res" :key="index">
								<td class="tb_url">{{todo.qianbao_url}}</td>
								<td>{{ $public.timestampToTime(todo.addtime) }}</td>
								<td v-if="todo.check_time">{{ $public.timestampToTime(todo.check_time) }}</td>
								<td v-else> --</td>
								<td>{{ todo.price }}</td>
								
								<td v-if="todo.state == 1">待审核</td>
								<td v-else-if="todo.state == 2">已审核</td>
								<td v-else-if = "todo.state == 3">拒绝</td>
								<td v-else >--</td>
							</tr>
						</table>
					</el-tab-pane>
					<el-tab-pane label="账单明细" name="alse">
						<table class="table" v-loading="loading">
							<tr>
								<th>时间</th>
								<th>数量</th>
								<th>事件</th>
							</tr>
							<tr v-for="(todo,index) in recordData3.res" :key="index">
								<td>{{ $public.timestampToTime(todo.addtime) }}</td>
								<td>{{ todo.price }}</td>
								<td v-if="todo.type">{{todo.type}} </td>
								<td v-else>{{ todo.memo }}</td>
							</tr>
						</table>
					</el-tab-pane>

					<div v-if="totalPage <= 0" class="notData">暂无数据</div>
					<div class="block button_pages" v-if="totalPage > 1">
						<i>第 {{ pageNum }} 页</i>
						<span @click="prevClick" v-if="prevBool">上一页</span>
						<span @click="nextClick" v-if="nextBool">下一页</span>
					</div>
				</el-tabs>
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
				loading: false,
				prevBool: false,
				nextBool: true,
				pageNum: 1, // 当前页数
				totalPage: null, // 总页数
				// totalNumber: null, // 总条数
				activeName1: 'first',
				activeNumber: 'chongBit',
				dealData: [], // 交易记录jiaoYiData1
				recordData1: [], //  充币
				recordData2: [], // 提币
				recordData3: [], // 其他
				JYPage: 1,
				JYtotal: 100,
				pid: '', //查询需要的条件
			}
		},
		methods: {
			handleCurrentChange(val) {
				var _this = this;
				_this.JYPage = val;
				_this.requestPublic();
			},
			prevClick: function() {
				var _this = this;
				_this.pageNum--;
				if(_this.pageNum <= 1) {
					_this.prevBool = false;
					_this.nextBool = true;
					eval('_this.' + _this.activeNumber + '()');
					return;
				} else {
					_this.nextBool = true;
					eval('_this.' + _this.activeNumber + '()');
				}
			},
			nextClick: function() {
				var _this = this;
				_this.pageNum++;
				if(_this.pageNum >= _this.totalPage) {
					eval('_this.' + _this.activeNumber + '()');
					_this.prevBool = true;
					_this.nextBool = false;
				} else {
					_this.prevBool = true;
					eval('_this.' + _this.activeNumber + '()');
				}
			},
			// 充币记录
			chongBit: function() {
				var _this = this;
				_this.$http.get(_this.$http.moneyDeal, {
						params: {
							type: 'recharge',
							"p": _this.pageNum,
							size: 5,
							pid: _this.pid
						}
					})
					.then((res) => {
						// _this.totalNumber = res.data.data.count;
						if(res.data.status == 200) {
							_this.recordData1 = res.data.data;
							_this.totalPage = Math.ceil(res.data.data.count / res.data.data.size);
							_this.pageNum = res.data.data.p;
						}
						setTimeout(function() {
							_this.loading = false;
						}, 500);
					});
			},
			// 提币记录
			tiBit: function() {
				var _this = this;
				_this.$http.get(_this.$http.moneyDeal, {
						params: {
							type: 'cash',
							"p": _this.pageNum,
							size: 5,
							pid: _this.pid
						}
					})
					.then((res) => {
						// _this.totalNumber = res.data.data.count;
						if(res.data.status == 200) {
							_this.recordData2 = res.data.data;
							_this.totalPage = Math.ceil(res.data.data.count / res.data.data.size);
							_this.pageNum = res.data.data.p;
						}
						setTimeout(function() {
							_this.loading = false;
						}, 500);
					});
			},
			//其他
			alse: function() {
				var _this = this;
				console.log("46546")
				if(_this.pid == "0") {
					_this.$http.get(_this.$http.caiWu, {
							params: {
								size: 5,
//								p: _this.JYPage
								"p": _this.pageNum,
							}
						})
						.then((res) => {
							if(res.data.status == 200) {
							_this.recordData3 = res.data.data;
							_this.totalPage = Math.ceil(res.data.data.count / res.data.data.size);
							_this.pageNum = res.data.data.p;
						}
						setTimeout(function() {
							_this.loading = false;
						}, 500);
							

						});

					return false;
				}else {
					_this.$http.get(_this.$http.re_asset, {
						params: {
							"p": _this.pageNum,
							size: 5,
							pid: _this.pid
						}
					})
					.then((res) => {
						// _this.totalNumber = res.data.data.count;
						if(res.data.status == 200) {
							_this.recordData3 = res.data.data;
							_this.totalPage = Math.ceil(res.data.data.count / res.data.data.size);
							_this.pageNum = res.data.data.p;
						}
						setTimeout(function() {
							_this.loading = false;
						}, 500);
					});
				};
			},
			handleClick2(tab, event) {
				var _this = this;
				_this.loading = true;
				_this.pageNum = null;
				_this.recordData1 = '';
				_this.recordData2 = '';
				eval('_this.' + _this.activeNumber + '()');
			},

		},
		created: function() {
			var _this = this;
			_this.pid = this.$route.query.pid;
//			_this.requestPublic();
			_this.chongBit();
		},
		// components: {
		// 	"HeaDer": Header,
		// 	"FooTer": Footer,
		// }
	}
</script>