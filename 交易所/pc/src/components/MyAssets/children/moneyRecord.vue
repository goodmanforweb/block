<style lang=less>
	@import '../../../assets/public.less';
	@import './moneyRecord.less';
</style>
<template>
	<div class="money_record_wrapper">
		<div class="money_record_container">
			<div class="title">
				<h2>
					<span>{{$t('BITPUIBi.mx[0]')}} >{{$t('moneyRecord.tip[0]')}}</span>
				</h2>
			</div>

			<!-- 充币、提币 -->
			<div class="record_list">
				<el-tabs v-model="activeNumber" @tab-click="handleClick2">
					<el-tab-pane :label="$t('moneyRecord.main[2]')" name="chongBit" >
						<table class="table" v-loading="loading">
							<tr>
								<td class="tb_url">{{$t('moneyRecord.main[3]')}}</td>
								<th>{{$t('moneyRecord.main[4]')}}</th>
								<th>{{$t('moneyRecord.main[25]')}}</th>
								<th>{{$t('moneyRecord.main[6]')}}</th>
								<th>{{$t('moneyRecord.main[7]')}}</th>
							</tr>
							<tr v-for="(todo,index) in recordData1.res" :key="index">
								<td class="tb_url">{{todo.chongzhi_url}}</td>
								<td>{{ $public.timestampToTime(todo.addtime) }}</td>
								<td v-if="todo.check_time">{{ $public.timestampToTime(todo.check_time) }}</td>
								<td v-else> --</td>
								<td>{{ todo.price }}</td>
								<td v-if="todo.state == 1">{{$t('moneyRecord.main[9]')}}</td>
								<td v-else-if="todo.state == 2">{{$t('moneyRecord.main[11]')}}</td>
								<td v-else-if = "todo.state == 3">{{$t('moneyRecord.main[10]')}}</td>
								<td v-else-if = "todo.state == 4">{{$t('moneyRecord.new[1]')}}</td>
								<td v-else>{{$t('moneyRecord.new[0]')}}</td>
							</tr>
						</table>
					</el-tab-pane>
					<el-tab-pane :label="$t('moneyRecord.main[12]')" name="tiBit" >
						<table class="table" v-loading="loading">
							<tr>
								<td class="tb_url">{{$t('moneyRecord.main[13]')}}</td>
								<th>{{$t('moneyRecord.main[4]')}}</th>
								<th>{{$t('moneyRecord.main[5]')}}</th>
								<th>{{$t('moneyRecord.main[6]')}}</th>
								<th>{{$t('moneyRecord.main[7]')}}</th>
							</tr>
							<tr v-for="(todo,index) in recordData2.res" :key="index">
								<td class="tb_url">{{todo.qianbao_url}}</td>
								<td>{{ $public.timestampToTime(todo.addtime) }}</td>
								<td v-if="todo.check_time">{{ $public.timestampToTime(todo.check_time) }}</td>
								<td v-else> --</td>
								<td>{{ todo.price }}</td>
								
								<td v-if="todo.state == 1">{{$t('moneyRecord.main[8]')}}</td>
								<td v-else-if="todo.state == 2">{{$t('moneyRecord.main[14]')}}</td>
								<td v-else-if = "todo.state == 3">{{$t('moneyRecord.main[15]')}}</td>
								<td v-else-if = "todo.state == 4">{{$t('moneyRecord.new[1]')}}</td>
								<td v-else >{{$t('moneyRecord.new[0]')}}</td>
							</tr>
						</table>
					</el-tab-pane>
					<el-tab-pane :label="$t('moneyRecord.tip[1]')" name="alse">
						<table class="table" v-loading="loading">
							<tr>
								<th>{{$t('moneyRecord.main[17]')}}</th>
								<th>{{$t('moneyRecord.main[18]')}}</th>
								<th style="width:300px;">{{$t('moneyRecord.main[19]')}}</th>
							</tr>
							<tr v-for="(todo,index) in recordData3.res" :key="index">
								<td>{{ $public.timestampToTime(todo.addtime) }}</td>
								<td>{{ todo.price }}</td>
								<td v-if="todo.type" style="width:300px;">{{todo.type}} </td>
								<td v-else style="width:300px;">{{ todo.memo }}</td>
							</tr>
						</table>
					</el-tab-pane>
					<div v-if="totalPage <= 0" class="notData">{{$t('moneyRecord.main[20]')}}</div>
					<div class="block button_pages" v-if="totalPage > 1">
						<i>{{$t('moneyRecord.main[21]')}} {{ pageNum }} {{$t('moneyRecord.main[22]')}}</i>
						<span @click="prevClick" v-if="prevBool">{{$t('moneyRecord.main[23]')}}</span>
						<span @click="nextClick" v-if="nextBool">{{$t('moneyRecord.main[24]')}}</span>
					</div>
				</el-tabs>
			</div>
		</div>
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
						if(res.data.status == '200') {
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
						if(res.data.status == '200') {
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
				if(_this.pid == "0") {
					_this.$http.get(_this.$http.caiWu, {
							params: {
								size: 5,
								pid:_this.pid,
								p: _this.pageNum,
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
						if(res.data.status == 200) {
							_this.recordData3 = res.data.data;
							_this.totalPage = Math.ceil(res.data.data.count / res.data.data.size);
							_this.pageNum = res.data.data.p;
						}
						setTimeout(function() {
							_this.loading = false;
						}, 500);
					});
				}
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
			if(this.pid == 9){
				this.activeNumber = 'alse'
				this.alse();
			}
			_this.chongBit();
		},
	}
</script>