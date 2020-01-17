<style lang=less>
	@import '../../assets/public.less';
	@import './frenchcurrency.less';
	.frenchcurrency .frenchcurrency_main .el-radio-button__inner{
		background:none !important;
		color: #ffffff;
		/* border: 1px solid #eee !important; */
	} 
	.frenchcurrency .frenchcurrency_main .is-active .el-radio-button__inner{
		/* background-color: #409EFF !important; */
		border-left:none !important;
		color: #eee;
		box-shadow:none !important;
	}
	.is-active .tab_p1{
		color:@main;
	}
</style>
<template lang="html">
	<section class="frenchcurrency">
		<div class="frenchcurrency_main">
			<ul class="frenchcurrency_header">
				<!--<li class="frenchcurrency_name">
					<h1>购买</h1>
					<p>USDT</p>
				</li>-->
				<!-- <li class="frenchcurrency_name">
					<h1>USDT</h1> 
					<h2><span>{{$t('frenchCurrency.main[0]')}}{{sankaojia}}CNY</span></h2>
				</li> -->
				<li class="frenchcurrency_name1">
					<div style="margin-top: 15px;">
					  	<!-- <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
					    	<el-button slot="append" icon="el-icon-search"></el-button>
					  	</el-input> -->
					  	<el-radio-group v-model="tabPosition">
					  		<el-radio-button label="sell">
									<p class="tab_p1">{{$t('frenchCurrency.main[2]')}}</p>
									<p class="tab_p2">{{$t('frenchCurrency.main[0]')}}<span>{{sankaojia}}CNY</span></p>
								</el-radio-button>
						    <el-radio-button label="pmma">
									<p class="tab_p1">{{$t('frenchCurrency.main[1]')}}</p>
									<p class="tab_p2">{{$t('frenchCurrency.main[0]')}}<span>{{sankaojia}}CNY</span></p>
								</el-radio-button>
						</el-radio-group>
					</div>
				</li>
			</ul>
			<section class="frenchcurrency_jiaoyi">
				<ul class="frenchcurrency_jiaoyi_header">
					<li class="frenchcurrency_jiaoyi_list one1" style="text-align:left;padding-left: 3%;box-sizing:border-box;">{{$t('frenchCurrency.main[3]')}}</li>
					<li class="frenchcurrency_jiaoyi_list one2 navOne2">{{$t('frenchCurrency.main[4]')}}</li>
					<li class="frenchcurrency_jiaoyi_list one3">{{$t('frenchCurrency.main[5]')}}</li>
					<li class="frenchcurrency_jiaoyi_list one4">{{$t('frenchCurrency.main[6]')}}</li>
					<li class="frenchcurrency_jiaoyi_list one5" >{{$t('frenchCurrency.main[7]')}}</li>
					<li class="frenchcurrency_jiaoyi_list one6">{{$t('frenchCurrency.main[8]')}}</li>
				</ul>
				<section class="Blocktrade">
					<div class="Period_box" v-show="trData.length==0">{{$t('frenchCurrency.main[9]')}}</div>
					<ol class="Blocktrade_mian" v-for="item in trData" >
						<li class="Blocktrade_list one1 contOne1"> 
								<!-- @click="go_details(item.account)" -->
							<p class="Blocktrade_name">
								<span>{{InterceptingCharacter(item.realname)}}</span>
								<!-- <sub class="el-badge__content is-dot"></sub> -->
							</p>
							<h1 class="Blocktrade_name_ab">
								<span>{{item.realname}}</span>
								<!-- (<span>{{item.cd_num}}</span>|
								<span>{{item.rate}}%</span>) -->
								<i class="iconfont icon-zhuanshi"></i>
							</h1>
						</li>
						<li class="Blocktrade_list one2">
							<span class="Blocktrade_num">{{item.amount}}</span>USDT
						</li>
						<li class="Blocktrade_list one3">
							<span class="Blocktrade_num">{{item.min_price}}</span>~
							<span class="Blocktrade_num">{{item.max_price}}</span>CNY
						</li>
						<li class="Blocktrade_list one4 color" style="color:#56c182 !important;">
							<span class="Blocktrade_num ">{{item.price}}</span>CNY
						</li>
						<li class="Blocktrade_list one5">
							<el-tooltip class="item" effect="dark" :content="$t('frenchCurrency.main[10]')" v-if="item.pay_backcard=='1'" placement="top">
										<!-- <i class="iconfont icon-yinhangka "></i> -->
										<img src="../../assets/img/yh_icon.png" alt="">
						    </el-tooltip>
							<el-tooltip class="item" v-if="item.pay_alipay=='1'" effect="dark" :content="$t('frenchCurrency.main[11]')" placement="top">
										<!-- <i class="iconfont icon-zhifubao"></i> -->
										<img src="../../assets/img/zf_icon.png" alt="">
						    </el-tooltip>
						    <el-tooltip class="item" v-if="item.pay_wx=='1'" effect="dark" :content="$t('frenchCurrency.main[12]')" placement="top">
										<!-- <i class="iconfont icon-weixin"></i> -->
										<img src="../../assets/img/wx_icon.png" alt="">
						    </el-tooltip>
						    <!-- <el-tooltip class="item" v-if="item.paypal=='1'" effect="dark" :content="$t('frenchCurrency.main[19]')" placement="top">
						      	<i class="iconfont icon-socialpaypal"></i>
						    </el-tooltip> -->
						</li>
						<li class="Blocktrade_list one6">
							<h2 class="el-button el-button--primary el-button--mini" v-if="tabPosition=='sell'"  @click="dialogFormVisibles(item.price,item.min_price,item.max_price,item.order_no,'1',item.amount,item.account)">{{$t('frenchCurrency.main[14]')}}</h2>
							<h2 class="el-button el-button--primary el-button--mini" v-else  @click="dialogFormVisibles(item.price,item.min_price,item.max_price,item.order_no,'2',item.amount,item.account)">{{$t('frenchCurrency.main[13]')}}</h2>
						</li>
					</ol>
				</section>
			</section>
			<section class="Period_main" v-show="trData.length != 0">
				<el-pagination background layout="prev, pager, next" :total="parseInt(isPage.isCount)" :page-size='isPage.isSize' @current-change="pageChange"></el-pagination>
			</section>
			<!--弹框-->
			<el-dialog class="tan" :title="title" width="564px" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item :label="$t('frenchCurrency.other[0]')" v-if="tabPosition=='sell'" :label-width="formLabelWidth">
						<el-input v-model="form.cny" @focus='cny_focus=1' @blur='cny_focus=0' auto-complete="off" :placeholder="$t('frenchCurrency.other[1]')"></el-input>
						<span>CNY</span>
					</el-form-item>
					<el-form-item :label="$t('frenchCurrency.other[2]')" v-else :label-width="formLabelWidth">
							<el-input v-model="form.cny" @focus='cny_focus=1' @blur='cny_focus=0' auto-complete="off" :placeholder="$t('frenchCurrency.other[3]')"></el-input>
							<span>CNY</span>
						</el-form-item>

					<el-form-item :label="$t('frenchCurrency.other[4]')" v-if="tabPosition=='sell'" :label-width="formLabelWidth">
						<el-input v-model="form.num" @focus='num_focus=1' @blur='num_focus=0' auto-complete="off" :placeholder="$t('frenchCurrency.other[5]') "></el-input>
						<span>USDT</span>
					</el-form-item>

					
					<el-form-item :label="$t('frenchCurrency.other[6]')" v-else :label-width="formLabelWidth">
						<el-input v-model="form.num" @focus='num_focus=1' @blur='num_focus=0' auto-complete="off" :placeholder="$t('frenchCurrency.other[7]') "></el-input>
						<span>USDT</span>
					</el-form-item>




					<el-form-item :label="$t('frenchCurrency.main[16]')" :label-width="formLabelWidth">
						<el-input v-model="form.tpwd" auto-complete="off" type="password" :placeholder="$t('exchangeCoin.Newaddition[0]')"></el-input>
					</el-form-item>
				</el-form> 
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="OrderDown()">{{$t('frenchCurrency.main[18]')}}</el-button>
					<el-button @click="dialogFormVisible = false">{{$t('frenchCurrency.main[17]')}}</el-button>
				</div>
			</el-dialog>
		</div>
	</section>
</template>
<script>
	export default {
		data(){
			return{
				title:'',
				dialogFormVisible:false,
				formLabelWidth:"80px",
				num_focus: '', // 数量 当获得焦点时为1 失去焦点时为0
				cny_focus: '', //人民币 当获得焦点时为1 失去焦点为0
				Sign: 1, //防止重复提示标志位
				form: {
					cny: '',
					num: '',
					tpwd: '',
					one_price: '', //单价
					min_price: '', //最小
					max_price: '', //最大
					order_no: "", //订单编号
					type: "", //购买1，出售2
					amount: '', //可购买数量
				},
				isPage:{
					isCount:4,  //一共有几页
					isSize:7,  //默认显示几页
					p:1,  //当前页
				},
		        trData:[],
		        sankaojia:"",
		        tabPosition:"sell",
		        headertext:this.$t('frenchCurrency.script[0]'),
		        userDataTongji: {
					wallone: '', // 用户余额
					account: '', //上个页面传过来的用户id号
					reg_time: '', //注册时间
					name: '',
					mobile: 0, //手机认证
					email: 0, //邮箱认证
					smrz: 0, //实名认证
					status: 0, //高级认证
					rate: '-', //完成率
					cd_num: '-', //成单
					three_num: '-', //30天
					shensu: '-', //申述
					shengsu: '-' //胜诉

				},
			}
		},
		watch:{
			tabPosition:function(){
				var connet = this;
	  			connet.DataAcquisition(1);
			},
			'form.cny': function(val, oval) {
				var _this = this;
				if(_this.num_focus == 1 && _this.cny_focus == 0) {
					//表示正在输入num 则取消cny的监听
					return false;
				} else if(isNaN(val)) {
					_this.$public.msg(_this.$t('frenchCurrency.script[1]'), 'warning', _this);
					_this.form.cny = '';
					return false
				} else if(val.toString().indexOf('.') != -1 && val.split(".")[1].length > 2) {
					_this.form.cny = Number(_this.form.cny).toFixed(2);
					if(_this.Sign != 1) return false
					_this.Sign++;
					_this.$public.msg(_this.$t('frenchCurrency.script[2]'), 'warning', _this);
					setTimeout(function() {
						_this.Sign = 1
					}, 1500);
					return false
				}
				//验证全过再进行计算
				_this.form.num = _this.$public.Division(_this.form.cny, _this.form.one_price).toFixed(4);
				_this.form.num = Number(_this.form.num) == 0 ? '' : _this.form.num;
			},
			'form.num': function(val, oval) {
				var _this = this;
				if(_this.num_focus == 0 && _this.cny_focus == 1) {
					//表示正在输入cny 则取消num的监听
					return false;
				} else if(isNaN(val)) {
					_this.$public.msg(_this.$t('frenchCurrency.script[3]'), 'warning', _this);
					_this.form.num = '';
					return false
				} else if(val.toString().indexOf('.') != -1 && val.split(".")[1].length > 4) {
					_this.form.num = Number(val).toFixed(4);
					if(_this.Sign != 1) return false
					_this.Sign++;
					_this.$public.msg(_this.$t('frenchCurrency.script[4]'), 'warning', _this);
					setTimeout(function() {
						_this.Sign = 1
					}, 1500);
					return false;
				}
				//验证全过再进行计算
				_this.form.cny = _this.$public.Multiplication(_this.form.one_price, _this.form.num).toFixed(2);
				_this.form.cny = Number(_this.form.cny) == 0 ? '' : _this.form.cny;
			}
		},
		methods:{
			// 获取个人
			getShopinfo() {
				var _this = this;
				_this.userDataTongji.account = _this.$route.query.account;
				if(!_this.userDataTongji.account) return false;
				_this.$http.post(_this.$http.cat_shopinfo, {
					account_shop: _this.userDataTongji.account,
					sell_size: _this.sell.sell_paging.size,
					pmma_size: _this.pmma.pmma_paging.size,
					sell_p: _this.sell.sell_paging.p,
					pmma_p: _this.pmma.pmma_paging.p
				}).then(function(response) {

					if(response.data.status == "200") {
						//						个人信息
						_this.userDataTongji.name = response.data.data.set_status.name;
						_this.userDataTongji.mobile = response.data.data.set_status.mobile;
						_this.userDataTongji.email = response.data.data.set_status.email;
						_this.userDataTongji.smrz = response.data.data.set_status.smrz;
						_this.userDataTongji.status = response.data.data.set_status.status;
						_this.userDataTongji.reg_time = response.data.data.set_status.reg_time;
						_this.userDataTongji.shengsu = response.data.data.shengsu;
						_this.userDataTongji.shensu = response.data.data.shensu;
						_this.userDataTongji.three_num = response.data.data.three_num;
						_this.userDataTongji.rate = response.data.data.rate;
						_this.userDataTongji.cd_num = response.data.data.cd_num;

						//出售信息
						_this.sell.sell_list = response.data.data.sell.res;
						_this.sell.sell_paging.count = response.data.data.sell.count;
						_this.sell.sell_paging.p = response.data.data.sell.p;

						//购买信息
						_this.pmma.pmma_list = response.data.data.pmma.res;
						_this.pmma.pmma_paging.count = response.data.data.pmma.count;
						_this.pmma.pmma_paging.p = response.data.data.pmma.p;

					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}


				}).catch(function(error) {});
			},
			// 确定购买
			OrderDown(){
				var _this = this;
				if(_this.form.type == 2) {
					//表示用户点的是出售 加一个余额判断
					if( Number( _this.form.num) > Number( _this.userDataTongji.wallone )) {
						_this.$public.msg(_this.$t('frenchCurrency.script[5]'), 'warning', _this);
						_this.nullData();
						return false;
					}
				}
				if(!_this.$public.Ints(_this.form.cny)) {
					_this.$public.msg(_this.$t('frenchCurrency.script[6]'), 'warning', _this);
					_this.nullData();
					return false
				} else if(!_this.$public.Ints(_this.form.num)) {
					_this.$public.msg(_this.$t('frenchCurrency.script[7]'), 'warning', _this);
					_this.nullData();
					return false
				} else if(Number(_this.form.num) > Number( _this.form.amount)) {
					_this.$public.msg(_this.$t('frenchCurrency.script[8]'), 'warning', _this);
					_this.nullData();
					return false
				} else if(Number(_this.form.cny) > Number(_this.form.max_price) || Number(_this.form.cny) < Number(_this.form.min_price) ) {
					_this.$public.msg(_this.$t('frenchCurrency.script[9]') + _this.form.min_price + '-' + _this.form.max_price + _this.$t('frenchCurrency.script[10]'), 'warning', _this);
					_this.nullData();
					return false
				} else if(!_this.$public.pwd(_this.form.tpwd)) {
					_this.$public.msg(_this.$t('frenchCurrency.script[11]'), 'warning', _this);
					return false
				} else {
					//去结算
					// _this.$public.msg('去结算', 'success', _this);
					_this.dialogFormVisible = false;
					var create_orderdata = {
						type:_this.form.type,
						tpwd:_this.form.tpwd,//资金密码，出售时需要，购买时不用此字段
						order_no:_this.form.order_no,
						total_num:_this.form.num,
						total_price:_this.form.cny,
					}
					_this.$http.post(_this.$http.create_order,create_orderdata).then(function(response){
						if (response.data.status=="200") {
							_this.$router.push({path: '/frenchorder'});
							window.sessionStorage.order = escape(JSON.stringify(response.data));
						}else {
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});
				}
			},
			// 截取第一字符
			InterceptingCharacter(character){
				if(character){
					return character.slice(0,1);
				}else{
					return 'A'
				}
			},
			pageChange(i) {
				var _this = this;
				_this.DataAcquisition(i);

			},
			// 列表获取
			DataAcquisition(i){
				var connet = this;
				connet.trData = [];
				if (connet.tabPosition == 'sell') {
					connet.headertext = connet.$t('frenchCurrency.script[12]');
				}else {
					connet.headertext = connet.$t('frenchCurrency.script[13]');
				};
				let tradingdata = {
					type:connet.tabPosition,
					size:connet.isPage.isSize,
					p:i
				};

		      	$.get(connet.$http.trading,tradingdata,function(result){
				    if(result.status == "200") {
				    	connet.trData = result.data.res;
				    	connet.isPage.isCount = result.data.count;
				    	connet.sankaojia = result.data.ck_price
				    }
				});
			},
			//数据清空
			nullData() {
				var _this = this;
				_this.form.cny = '';
				_this.form.num = '';
				_this.form.tpwd = '';
			},
			//点击头像去详情
			go_details(id){
				var _this = this;
				if(!sessionStorage.account || !sessionStorage.token) {
					_this.$public.confirm(_this.$t('frenchCurrency.script[16]'), 'login', _this);
					return false
				};
				_this.$router.push({path: 'frenchdetails',query:{account:id}});
			},
			dialogFormVisibles(val, min, max, order_no, type,amount,thisAccount) {
				var _this = this;
				if(_this.tabPosition=='sell'){
					_this.title = _this.$t("frenchCurrency.main[2]")
				}else{
					_this.title = _this.$t("frenchCurrency.main[1]")
				}
				if(!sessionStorage.account || !sessionStorage.token) {
					_this.$public.confirm(_this.$t('frenchCurrency.script[16]'), 'login', _this);
					return false
				};
				_this.form.one_price = val;
				_this.form.max_price = max;
				_this.form.min_price = min;
				_this.form.order_no = order_no;
				_this.form.amount = amount;
				_this.form.type = type;
				//判断一下自己不能买自己家的币
				if(thisAccount == sessionStorage.account){
					if(type == 1){
						_this.$public.msg(_this.$t('frenchCurrency.script[14]'), 'warning', _this);
					}else{
						_this.$public.msg(_this.$t('frenchCurrency.script[15]'), 'warning', _this);
					}
					return false
				};

				//请求个人接口，判断有没有设置交易密码及设置支付方式
				_this.$http.post(_this.$http.user_info, {}).then(function(response) {
					if(response.data.status == "200") {
						_this.userDataTongji.wallone = response.data.data.wallone;
						 if(response.data.data.status  == "1" || response.data.data.status  == "4") {
							_this.$confirm(_this.$t("security.option[3]"), _this.$t('security.option[4]'), {
								confirmButtonText: _this.$t('security.option[5]'),
								cancelButtonText: _this.$t('security.option[6]'),
								type: 'warning'
							}).then(() => {
								_this.$public.go('realname',10,_this);
							}).catch(() => {});
							return false;
						}else if(response.data.data.status  == "2"){
							_this.$message({
								message:_this.$t("security.option[8]"),
								type: "warning"
							});
							return false;
						}
						if(response.data.data.tpwd==false) {
							_this.$confirm(_this.$t("ziChan.Newplus[0]"), _this.$t('security.option[4]'), {
								confirmButtonText: _this.$t('security.option[5]'),
								cancelButtonText: _this.$t('security.option[6]'),
								type: 'warning'
							}).then(() => {
								_this.$public.go('changetpwd',10,_this);
							}).catch(() => {});
							return false;
							// return false;
						};
						if(response.data.data.pay_list == 0 && type == 2){
							_this.$public.confirm(_this.$t('frenchCurrency.script[18]'), 'security', _this);
							return false;
						} else {
							_this.nullData(); //清空数据
							_this.dialogFormVisible = true;
						}

					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}

				}).catch(function(error) {});
			},
		},
	  	created:function(){
	  		var connet = this;
	  		connet.getShopinfo();
	  		connet.DataAcquisition(1)
	  	},
	  	components:{}
	}



	//						} else if(!response.data.data.email) {
//							_this.$public.confirm('您还没有绑定邮箱，是否前往绑定?', 'security', _this);
//							return false;
//
//						} else if(!response.data.data.smrz || response.data.data.status == 1) {
//							_this.$public.confirm('您的身份认证信息不完善，是否前往身份认证?', 'identity', _this);
//							return false;
//						} else if(response.data.data.status == 2) {
//							_this.$public.msg('您的信息正在审核中，暂不能进行此操作', 'warning', _this);
//							return false;
//
//						} else if(response.data.data.status == 4) {
//							_this.$public.confirm('您高级认证失败，是否重新认证?', 'identity', _this);
//							return false;
</script>

