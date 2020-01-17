<style lang=less>
	@import '../../assets/public.less';
	@import './apply.less';
</style>

<!--
		buy 和buy 的less 在apply.less

	-->
<template>
	<div class="sell_main">
		<div class="sell_main_wrap">
				<div class="sellBuy_title">
						<h2>{{$t('buy.header[0]')}}</h2>
						<p>{{$t('buy.header[1]')}}</p>
					</div>
					<div class="form_warp">
						<el-form :label-position="labelPosition" :model="buyData" status-icon :rules="rules2" ref="buyData"  class="demo-ruleForm el-form--label-top">
							<el-form-item :label="$t('buy.main[0]')" prop="price">
								<el-input v-model.number="buyData.price" auto-complete="off" type="number"></el-input>
							</el-form-item>
			
							<el-form-item :label="$t('buy.main[1]')" prop="trans_num">
								<el-input v-model.trans_number="buyData.trans_num" auto-complete="off" type="number"></el-input>
			
							</el-form-item>
							<div class="limit">
								<el-form-item :label="$t('buy.main[2]')" prop="max_price">
									<el-input v-model.number="buyData.max_price" auto-complete="off" :placeholder="$t('buy.main[3]')"  type="number"></el-input>
									<span class="cny">CNY</span>
								</el-form-item>
			
								<el-form-item label="." prop="min_price">
									<el-input v-model.number="buyData.min_price" auto-complete="off" :placeholder="$t('buy.main[4]')" type="number"></el-input>
									<span class="cny">CNY</span>
								</el-form-item>
							</div>
							<el-form-item>
								<span style="color:#fff;">
									{{$t('buy.main[5]')}}
									<!-- <span class="tishi">
										<i class="el-icon-info"></i>
										{{$t('buy.main[6]')}}
									</span> -->
								</span>
								<ul class="lis_warp">
									<li v-for="(v,k) in pay_list" v-show="v.status == 1">
										<i v-if="v.type == 'wx'">
											<i class="icon iconfont icon-weixin wx"></i>
										</i>
										<i v-else-if="v.type == 'alipay'">
											<i class="icon iconfont icon-zhifubao alipay"></i>
										</i>
										<i v-else-if="v.type == 'backcard'">
											<i class="icon iconfont icon-yinhangka car"></i>
										</i>
										<i v-else-if="v.type == 'paypal'">
											<i class="icon iconfont icon-socialpaypal paypal"></i>
										</i>
										<span class="type">{{v.tip}}</span>
			
										<el-checkbox v-model="buyData.pay_wx" :true-label='1' false-label='0' @change='changeAct(v.type)' v-if="v.type == 'wx'"></el-checkbox>
										<el-checkbox v-model="buyData.pay_backcard" :true-label='1' false-label='0' @change='changeAct(v.type)' v-else-if="v.type == 'backcard'"></el-checkbox>
										<el-checkbox v-model="buyData.pay_alipay" :true-label='1' false-label='0' @change='changeAct(v.type)' v-else-if="v.type == 'alipay'"></el-checkbox>
										<el-checkbox v-model="buyData.pay_paypal" :true-label='1' false-label='0' @change='changeAct(v.type)' v-else-if="v.type == 'paypal'"></el-checkbox>
			
			
									</li>
								</ul>
			
								<router-link to="/security">
									<div class="add_pay">
										<p>{{$t('buy.main[7]')}}</p>
									</div>
								</router-link>
							</el-form-item>
			
			
							<el-form-item>
								<el-button type="primary" @click="submitForm('buyData')" :loading="loading">{{$t('buy.main[8]')}}</el-button>
							</el-form-item>
						</el-form>
					</div>
					<div class="sellBuy_list">
						<div class="sellBuy_title">
							<h2>{{$t('buy.main[9]')}}</h2>
						</div>
						<div class="sellBuy_title_warp">
							<div class="sellBuy_nav">
								<span class="dingdan">{{$t('buy.main[10]')}}</span>
								<span>{{$t('buy.main[11]')}}</span>
								<span>{{$t('buy.main[12]')}}</span>
								<span>{{$t('buy.main[13]')}}</span>
								<span>{{$t('buy.main[14]')}}</span>
								<span>{{$t('buy.main[15]')}}</span>
								<span class="todo">{{$t('buy.main[16]')}}</span>
							</div>
							<p class="no_list" v-show="buy.buy_list.length <= 0">{{$t('buy.main[17]')}}</p>
							<ul class="sellBuy_lis_warp" v-show="buy.buy_list.length > 0">
								<li class="sellBuy_lis" v-for="(v,k) in buy.buy_list">
									<span class="dingdan">{{v.order_no}}</span>
									<span>{{v.trans_num}}</span>
									<span>{{v.deals_num}}</span>
									<span>{{v.totalprice}}</span>
									<span>{{v.price}}</span>
									<span>{{$public.timestampToTime(v.add_time)}}</span>
			
			
									<p>
										<span class="todo" v-if="v.status == '1'" @click="pmmaRev(v.id)">{{$t('buy.main[18]')}}</span>
										<span class="todo" v-if="v.status == '2'">已完成</span>
										<span class="todo" v-if="v.status == '3'">已撤单</span>
									</p>
									<!-- <span class="todo" @click="pmmaRev(v.id)">{{$t('buy.main[18]')}}</span> -->
								</li>
							</ul>
							<el-pagination background layout="prev, pager, next" v-show="buy.buy_list.length > 0" :total="parseInt(buy.totle)" @current-change="current_change" :page-size='buy.size'></el-pagination>
			
						</div>
					</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			var _this = this;
			var trans_num = (rule, value, callback) => {
				if(!_this.$public.Ints(value)) {
					return callback(new Error(_this.$t('buy.script[0]')));
				} else if(value.toString().indexOf('.') != -1 && value.toString().split(".")[1].length > 4) {
					return callback(new Error(_this.$t('buy.script[1]')));
				} else {
					callback();
				}

			};
			var min_price = (rule, value, callback) => {
				if(!_this.$public.Ints(value)) {
					return callback(new Error(_this.$t('buy.script[2]')));
				} else if(value.toString().indexOf('.') != -1 && value.toString().split(".")[1].length > 2) {
					return callback(new Error(_this.$t('buy.script[3]')));
				} else {
					callback();
				}
			};
			var max_price = (rule, value, callback) => {
				if(!_this.$public.Ints(value)) {
					return callback(new Error(_this.$t('buy.script[4]')));
				} else if(value.toString().indexOf('.') != -1 && value.toString().split(".")[1].length > 2) {
					return callback(new Error(_this.$t('buy.script[5]')));
				} else {
					callback();
				}
			};
			var price = (rule, value, callback) => {
				if(!_this.$public.Ints(value)) {
					return callback(new Error(_this.$t('buy.script[6]')));
				} else if(value.toString().indexOf('.') != -1 && value.toString().split(".")[1].length > 2) {
					return callback(new Error(_this.$t('buy.script[7]')));
				} else {
					callback();
				}
			};

			return {
				buyData: {
					trans_num: '', //数量
					min_price: '', //最小
					max_price: '', //最大
					price: '', //价格
					//					pay_type: [], //选择支付方式
					pay_wx: 0, //微信
					pay_alipay: 0, //支付宝
					pay_backcard: 0, //银行卡
					pay_paypal:0,//paypal
					type: 'pmma', //下单类型
					tpwd:'',      //支付密码

				},
				wallone:'', //钱包余额
				pay_list: [], //支付方式列表
				buy: {
					buy_list: [], //出售列表
					totle: 2, //总条数
					size: 5 //每页显示条数
				},
				loading: false,
				rules2: {
					trans_num: [{
						validator: trans_num,
						trigger: 'blur'
					}],
					min_price: [{
						validator: min_price,
						trigger: 'blur'
					}],
					max_price: [{
						validator: max_price,
						trigger: 'blur'
					}],
					price: [{
						validator: price,
						trigger: 'blur'
					}]
				},
				labelPosition: 'center', //插件自带

			}

		},
		methods: {
			submitForm(formName) {
				var _this = this;
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						if(_this.buyData.min_price > _this.buyData.max_price) {
							_this.$public.msg(_this.$t('buy.script[8]'), 'warning', _this);
							return false
						} else if(_this.buyData.pay_wx == 0 && _this.buyData.pay_backcard == 0 && _this.buyData.pay_alipay == 0) {
							_this.$public.msg(_this.$t('buy.script[9]'), 'warning', _this);
							return false
						}else if(_this.buyData.min_price <_this.buyData.price){
							_this.$public.msg(_this.$t('buy.script[10]'), 'warning', _this);
							return false;
						}else if(Number(_this.buyData.price)*Number(_this.buyData.trans_num)<Number(_this.buyData.min_price) ){
							_this.$public.msg(_this.$t('buy.script[11]'), 'warning', _this);
							_this.buyData.min_price = '';
							return false;
						}

						this.$prompt('资金密码', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								inputPlaceholder:'请输入资金密码',
								inputType:'password'
							}).then(({ value }) => {
								_this.buyData.tpwd = value;
								_this.$http.post(_this.$http.pmma, _this.buyData).then(function(response) {
										if(response.data.status == "200") {
											_this.$public.msg(response.data.msg, 'success', _this);
											_this.getUserData();
											_this.getbuyData();
											_this.$public.go('/frenchcurrency',500,_this);
											_this.dataNull();
										} else {
											// _this.dataNull();
											_this.$public.msg(response.data.msg, 'warning', _this);
										}
									}).catch(function(error) {});

							}).catch(() => {
								this.$message({
									type: 'info',
									message: '取消'
								});       
							});
					} else {
						return false
					}
				});
			},
			//支付方式列表
			getData() {

				var _this = this;
				_this.$http.post(_this.$http.pay_list, {}).then(function(response) {
					if(response.data.status == "200") {
						_this.pay_list = response.data.data;

					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			//获得个人中心数据和出售列表数据
			getUserData() {
				var _this = this;
				_this.$http.post(_this.$http.user_info, {}).then(function(response) {
					if(response.data.status == "200") {
						_this.wallone = response.data.data.wallone;

					} else {}
				}).catch(function(error) {});
			},
				//获取出售列表数据
			getbuyData(i){
				var _this = this;

				_this.$http.get(_this.$http.pmmaList, {
					params: {
						type: _this.buyData.type,
						size: _this.buy.size,
						p:i,
					}
				}).then(function(response) {
					if(response.data.status == "200") {
						_this.buy.buy_list = response.data.data.res;
						_this.buy.totle = response.data.data.count;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			//分页处理函数
			current_change(i) {
				var _this = this;
				_this.getbuyData(i);
			},
			//
			changeAct(i) {},
			//撤单
			pmmaRev(id) {
				var _this = this;
				_this.$confirm(_this.$t('buy.script[12]'),_this.$t('buy.script[13]'), {
					confirmButtonText: _this.$t('buy.script[14]'),
					cancelButtonText: _this.$t('buy.script[15]'),
					type: 'warning'
				}).then(() => {
					_this.$http.post(_this.$http.pmmaRev, {
						type: _this.buyData.type,
						id: id
					}).then(function(response) {
						if(response.data.status == "200") {
							_this.$public.msg(response.data.msg, 'success', _this);
							_this.getbuyData();
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});

				}).catch(() => {
					_this.$message({
						type: 'info',
						message: _this.$t('buy.script[16]')
					});
				});

			},
			get_price() {
				var _this = this;
				_this.$http.get(_this.$http.get_price,{params:{}}).then(function(response) {
					if(response.data.status == "200") {
						_this.buyData.price =response.data.data.price;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			//数据清空
			dataNull() {
				var _this = this;
				_this.buyData = {
					trans_num: '', //数量
					min_price: '', //最小
					max_price: '', //最大
//					price: '', //价格
					pay_wx: 0, //微信
					pay_alipay: 0, //支付宝
					pay_backcard: 0, //银行卡
					type: 'pmma' //下单类型
				}
			}
		},
		created: function() {
			var _this = this;
			_this.get_price();  //获得默认价格
			_this.getData();
			_this.getUserData();
			_this.getbuyData(1);

		},

	}
</script>

<style>

</style>
