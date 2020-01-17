<style lang=less>
	@import "./exchange.less";

	.el-dropdown-menu__item a {
		display: flex;
		align-items: center;

	}

	.el-dropdown-menu__item a img {
		margin-right: 24px;
	}

	.HistoricalEntrustment #tab-third {
		display: none;
	}

	.HistoricalEntrustment .headertongji {
		display: none;
	}

	
	.exchange {

		

		
		.headertongji,
		.header_tongji,
		.tojingtotle,
		.title,
		.block {
			display: none !important;
		}

		.order_container {
			padding: 0 !important;
		}

		.el-card.content.is-always-shadow {
			border: none !important;
		}
	}

	.heyuey {
		.exchange {
			.new_price {
				color: #fff;
			}

			.gg_order_wrapper {
				background: transparent;
			}

			.el-table--border::after,
			.el-table--group::after,
			.el-table::before {
				display: none;
			}

			.el-card.content.is-always-shadow {
				border: none !important;
				background: #2b2b2b;
			}

			.el-table__row:hover {
				box-shadow: none;
				transition: all 0.4s;
				transform: scale(1.001);
			}

			

			

			.el-tabs__item {
				color: #eee;
			}

			.el-tabs__item.is-active {
				color: #409eff;
			}

			.el-tabs__nav-wrap::after {
				display: none;
			}

			.canuser,
			.el-form-item__label {
				color: #eee !important;
			}

			
		}
	}

	.tran-box {
		background: #fff;
		border-radius: 2px;
	}
	.tran-cont,.profit-lists{
		padding: 8px;
	}
    section.tran-box {
		.el-radio-group {
			display: flex;
			.el-radio-button {
				flex: 1
			}
			.el-radio-button__inner {
				padding:12px;
				display: block;
			}
			.el-radio-button.is-active .el-radio-button__inner {
				background: var(--textcolor)!important;
				border-color:var(--textcolor)!important;
			}
		}
		
	}
	.gqexchange .exchange_flex {
		.hangqing_nav {
			background: #f2f6f9;
			.item {
				color:#333!important
			}
		}
	}
	.makeAbargindiv {
		div.flex {
			margin: 10px auto;

			>label {
				flex-shrink: 0;
				width: 80px;
				font-size: 14px;
				margin-right: 16px;
				color: #333;
			}
		}
	}
	.exchange div.el-table__header-wrapper th, 
	.exchange div.el-table__header-wrapper tr {
		background: transparent
	}
	.el-button.el-button--red {
		background: var(--red);
		border-color:var(--red);
		color:#fff;
	}
	.el-button.el-button--green {
		background: var(--green);
		border-color:var(--green);
		color:#fff;
	}
	.table-cell-text {
		color: var(--green)
	}
	.table-cell-text-green {
		color:var(--green)
	}
	.table-cell-text-red {
		color:var(--red)
	}
</style>
<template>
	<div class="exchange gqexchange">
		<div class="exchange_flex">
			<div class="hangqing flex v">
				<div class="hangqing_nav">
					<div class="item fw">{{$t('gq[0]')}}</div>
				</div>
				<div class="hangqing_list flex1">
					<div class="hangqing_list_item" v-for="(item,index) in Marketdatamain" :key="index"
						@click="handleCommand(item.code)">
						<div class="coin">
							<img :src="coinImg(item.name)" alt="">
							<div class="coinInfo">
								<div :class="'coinInfo_name'">{{item.name}}</div>
								<div :class="'coinInfo_cny'+' cny-'+item.code">
									≈{{$public.toLowFixed(item.cnyPrice,item.code, 2)}}</div>
							</div>
						</div>
						<div class="coinPrice">
							<div :class="'coinPrice_now'+' price-'+item.code">
								{{$public.toLowFixed(item.price,item.code)}}</div>
							<div
								:class="item.changeRate.indexOf('-')>-1?'coinPrice_rate fall'+' rate-'+item.code:'coinPrice_rate rise'+' rate-'+item.code">
								{{item.changeRate}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex1 chart" ref="chart">
				<Quotationheader :Marketheader="Marketdataheader"></Quotationheader>
				<el-radio-group class="radiogroups" v-model="klinetab">
					<el-radio-button class="klinesbtn" :label="$t('index.KLine[13]')"></el-radio-button>
					<el-radio-button class="shendubtn" :label="$t('index.KLine[14]')"></el-radio-button>
				</el-radio-group>
				<section class="kine" v-if="klinetab == $t('index.KLine[13]')">
					<iframe id="fram" :src="'./static/index.html?timers=5&code=' + marketPurchase.code" width="100%"
						height="100%;"></iframe>
				</section>
				<section class="kine" v-else>
					<iframe id="fram" :src="'./static/indexsd.html?timers=5&code=' + marketPurchase.code" width="100%"
						height="100%;"></iframe>
				</section>
				<section class="HistoricalEntrustment">
					<div>
						<div :class="$t('currlanguage')=='cn'? 'tojingtotles' : 'tojingtotles modelEn'">
							<span>{{$t('index.KLine[11]')}}: {{tongjiData.yingkui}}</span>
							<span>{{$t('index.KLine[12]')}}: {{tongjiData.risk}}</span>
						</div>
						<ggOrder1 :changeactive="updateOrder" :part="true" @changeData="listenToMyBoy" ref="offTime1"
							:price="marketPurchase.PriceData" :Code="marketPurchase.code">
						</ggOrder1>
					</div>
				</section>
			</div>
			<div class="makeAbargindiv flex v" style="width:360px">
				<section class="tran-box" style="margin-bottom: 6px;">
					<div class="hangqing_nav">
						<div class="item fw">BTC/USDT</div>
					</div>
					<div class="tran-cont">
						<div class="flex vc">
							<label for="">{{$t('gq[1]')}}</label>
							<div class="flex1">
								<el-radio-group v-model="coin">
									<el-radio-button label="USDT">USDT</el-radio-button>
									<el-radio-button label="ETH">ETH</el-radio-button>
									<el-radio-button label="BTC">BTC</el-radio-button>
									<el-radio-button label="EOS">EOS</el-radio-button>
								</el-radio-group>
							</div>
						</div>
						<div class="flex vc">
							<label for="">{{$t('gq[2]')}}</label>
							<div class="flex1">
								<el-input v-model="input" :placeholder="$t('gq[3]')"></el-input>
							</div>
						</div>
						<div class="flex vc">
							<label for="">{{$t('gq[4]')}}</label>
							<div class="flex1">
								<el-radio-group v-model="time">
									<el-radio-button label="30">30s</el-radio-button>
									<el-radio-button label="60">60s</el-radio-button>
									<el-radio-button label="90">90s</el-radio-button>
								</el-radio-group>
							</div>
						</div>
						<div class="flex vc" style="margin:20px auto;">
							<label for="" style="width:90px;">{{$t('gq[5]')}}:</label>
							<div class="flex1">
								--%
							</div>
						</div>
						<div class="flex vc">
							<label for="">{{$t('gq[6]')}}:</label>
							<div class="flex1">
								--%
							</div>
						</div>
						<div class="flex sb vc" style="margin:20px auto;">
							<el-button @click="handleBuys('up')" class="flex1" type="green">{{$t('gq[7]')}}</el-button>
							<el-button @click="handleBuys('down')" class="flex1" type="red">{{$t('gq[8]')}}</el-button>
						</div>
					</div>
				</section>
				<div class="tran-box flex1">
					<div class="hangqing_nav">
						<div class="item fw">{{$t('gq[9]')}}</div>
					</div>
					<div class="profit-lists">
						<el-table :data="dataTable">
							<el-table-column
							prop=""
							:label="$t('gq[10]')"
							>
							<template slot-scope="{row}">
								<span :class="{'table-cell-text table-cell-text-red': '1'}"></span>
							</template>
							</el-table-column>
							<el-table-column
							prop=""
							:label="$t('gq[11]')"
							>

							</el-table-column>
							<el-table-column
							prop=""
							:label="$t('gq[12]')"
							>

							</el-table-column>
							<el-table-column
							prop=""
							:label="$t('gq[13]')"
							>

							</el-table-column>
						</el-table>

					</div>
				</div>
			</div>
		</div>


		<el-dialog
		:title="$t('gq[14]')"
		:visible.sync="centerDialogVisible"
		width="30%"
		center>
		<span>{{$t('gq[15]', {p:'2342342342'})}}</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="centerDialogVisible = false">{{$t('gq[16]')}}</el-button>
			<el-button type="primary" @click="handleBuy">{{$t('gq[17]')}}</el-button>
		</span>
		</el-dialog>





	</div>
</template>
<script>
	import Quotation from "./Quotation.vue";
	import Quotationheader from "./Quotationheader.vue";
	import ggOrder1 from "../order/ggOrder1.vue"; //委托

	export default {
		data() {
			return {
				centerDialogVisible: false,
				input:'',
				coin:'ETH',
				time:'',
				dataTable: [{},{}],
				eyeActive: false,
				updateOrder: false,
				deepMergeModel: 4,
				deepMerge: [
					{ label: this.$t("index.other[1]"), val: 2 },
					{ label: this.$t("index.other[2]"), val: 4 }
				],
				wallone: 0,
				money1: 0,
				money2: 0,
				money3: 0,
				money4: 0,
				money5: 0,
				islange: 'Chinese',
				klinetab: this.$t('index.KLine[13]'),//k线图深度图切换
				activeName: "first", //默认市价还是限价更改
				islogin: null, //是否登录
				setInter: null,
				setMainTiemOut: null,
				MainDatapushTime: "", // 计时器
				qd: "0", //判断签到状态
				//给组建传的值
				marketPurchase: {
					PriceData: 0, //最新价
					wallone: 0, //用户资产余额
					spread: 0, //点差
					var_price: 0, //最小浮动价
					trans_fee: 0, //手续费
					stopwin: 0, //止盈
					stoploss: 0, //止损
					num_min: 0, //最小购买量
					leverage: "0", //杠杆
					buyorsell: "",
					leveragemin: 0, //默认杠杆
					code: "btc_usdt", //控制code 重要字段不可随意更改
					pcs_price: ""
				}, //市价买入
				Marketdatamainbox: {}, //行情主数据盒子
				Marketdatamain: {}, //行情主数据
				PurchaseData: null, //买卖价数据
				Marketdataheader: {}, //K线图顶部的数据
				tableData: [],
				MainData: null, //主数据推送
				SalePriceData: null, //买卖价推送
				SalePriceDatas: null, //买卖价推送
				tongjiData: {
					keyong_price: "--", //可用资金
					totalusdt: "--", //动态权益
					totaldeposit: "--", //冻结保证金
					yingkui: "--", //浮动盈亏
					risk: "--" //风险率
				},
				codeName: "BTC/USDT",
				LoginState: false,//登录状态
				chengjiaoArr: [],
				chengjiaotable: "当前委托",
				Purchaseshuju: [],
				status: "",
				auth_status: "",
			};
		},
		watch: {},
		methods: {
			handleBuys(type) {
				if(type == 'up') {
					this.centerDialogVisible = true
				}
				else {
					this.centerDialogVisible = true
				}
			},
			handleBuy() {
				this.centerDialogVisible = false
			},
			setChartWidth() {
				this.$refs.chart.style.width = (window.innerWidth - 350 - 360) + 'px'
				window.addEventListener('resize', () => {
					this.$refs.chart.style.width = (window.innerWidth - 350 - 360) + 'px'
				}, false);
			},
			handleEye() {
				this.eyeActive = !this.eyeActive;
			},
			transDeepMerge(val) {
				var _val = String(Number(val).toFixed(4)).split(".")
				if (this.deepMergeModel == 4) {
					return Number(val).toFixed(4)
				} else {
					var arr = _val[1].split("")
					arr.splice(2, 2, "00")
					_val[1] = arr.join("")
					return _val.join(".")
				}
			},
			goUrl(url) { // 身份验证信息跳转
				var _this = this;
				if (_this.status != 3) {
					_this.$public.go("realname", 100, _this);
				} else {
				}
			},
			changeurl(url) {
				var _this = this;
				_this.$router.push(url);
			},
			tongji() {
				var _this = this;
				_this.$http.post(_this.$http.tongji, {
					mobile: sessionStorage.mobile
				}).then(function (response) {
					if (response.data.status == "200") {
						_this.tongjiData = response.data.data;
					}
				}).catch(function (error) { });
			},
			shishiDatapush(code) { // 买卖价推送
				var connet = this,
					sellbuytype = true;

				var ul = document.getElementById("realTimeTemp")
				// 首先判断是否 支持 WebSocket
				if ('WebSocket' in window) {
					connet.SalePriceDatas = new WebSocket(connet.$http.fivewsurl);
				} else if ('MozWebSocket' in window) {
					connet.SalePriceDatas = new MozWebSocket(connet.$http.fivewsurl);
				} else {
					connet.SalePriceDatas = new SockJS(connet.$http.fivewsurl);
				}
				// 打开时
				connet.SalePriceDatas.onopen = function (evnt) {
					var msg = {
						code: code
					};
					// 发送消息
					connet.SalePriceDatas.send(JSON.stringify(msg));
				};
				// 处理消息时
				connet.SalePriceDatas.onmessage = function (evnt) {
					var temp = "" // 模板
					var datanum = JSON.parse(evnt.data);
					var filterStatus = (status) => {
						if (status == 'buy') {
							return 'rise'
						} else {
							return 'fall'
						}

					}
					// connet.Purchaseshuju = datanum.data;
					for (var i = 0; i < datanum.data.length; i++) {
						var item = datanum.data[i]
						var li = `
						 <li class="makeAbarginItemP makeAbarginItemli">
							    <span class="${filterStatus(item.dc)}">${item.price}</span>
								<span>${Number(item.amount).toFixed(4)}</span>
								<span>${connet.$public.timestampToTimess(item.dt)}</span>
						 </li>
							`
						temp += li
					}
					ul.innerHTML = temp
				};
				connet.SalePriceDatas.onerror = function (evnt) {
					console.log("  websocket.onerror");
				};
				connet.SalePriceDatas.onclose = function (evnt) {
					console.log("  websocket.onclose");
				};
			},


			// 登录退出
			Signin() {
				var _this = this;
				_this.$http.post(_this.$http.user_sign, {}).then(res => {
					if (res.data.status == '1' || res.data.status == '4') {
						_this.$message({
							message: res.data.msg,
							type: "success"
						});
						_this.getUserData();
					} else {
						_this.$message({
							message: res.data.msg,
							type: "warning"
						});
					}
				});
			},
			signOut() {
				// 登出
				var _this = this;
				var _this = this;
				_this
					.$confirm(_this.$t("header.tips[0]"), _this.$t("header.tips[1]"), {
						confirmButtonText: _this.$t("header.tips[2]"),
						cancelButtonText: _this.$t("header.tips[3]"),
						type: "warning"
					})
					.then(() => {
						_this.$message({
							type: "success",
							message: _this.$t("header.tips[4]")
						});
						sessionStorage.clear();
						_this.$public.go("login", 100, _this);
					})
					.catch(() => { });
			},
			coinImg(val) {
				switch (val) {
					case 'BTC':
						return require("../../assets/image/ex/btc.png")
					case 'BCH':
						return require("../../assets/image/ex/bch.png")
					case 'ETC':
						return require("../../assets/image/ex/etc.png")
					case 'ETH':
						return require("../../assets/image/ex/eth.png")
					case 'LTC':
						return require("../../assets/image/ex/ltc.png")
					case 'EOS':
						return require("../../assets/image/ex/eos.png")
					case 'XRP':
						return require("../../assets/image/ex/xrp.png")

				}

			},

			// 获取个人信息
			getUserData() {
				var _this = this;
				if (!sessionStorage.account) {
					return false;
				}
				_this.$http
					.post(_this.$http.user_info, {})
					.then(function (response) {
						if (response.data.status == "200") {
							_this.is_apply = response.data.data.is_apply;
							_this.apply_reason = response.data.data.apply_reason;
							//是否实名认证
							_this.status = response.data.data.status; //初级
							_this.auth_status = response.data.data.auth_status; //高级
							_this.qd = response.data.data.qd;
							_this.wallone = Number(response.data.data.wallone); //当前usdt的数量
							_this.money1 = Number(response.data.data.money1); //当前usdt的数量
							_this.money2 = Number(response.data.data.money2); //当前usdt的数量
							_this.money3 = Number(response.data.data.money3); //当前usdt的数量
							_this.money4 = Number(response.data.data.money4); //当前usdt的数量
							_this.money5 = Number(response.data.data.money5); //当前usdt的数量
						} else {
							_this.$public.msg(response.data.msg, "warning", _this);
						}
					})
					.catch(function (error) { });
			},
			// 
			handleCommand(command) {
				var _this = this;
				_this.codeName = (command.split("_")[0]).toUpperCase() + "/" + (command.split("_")[1]).toUpperCase();
				_this.modifyshuju(command);
			},
			//要刷新的数据放在这个函数里面
			listenToMyBoy() {
				this.updateOrder = !this.updateOrder
				this.getdatamain();
				this.amount(); //个人资产数据
			},
			onSubmit: function () { },
			modifyshuju: function (envent) {
				//nav点击时修改
				var _this = this;
				_this.marketPurchase.code = envent;
				for (var i = 0; i < _this.Marketdatamainbox.length; i++) {
					if (_this.Marketdatamainbox[i].code == envent) {
						_this.Marketdataheader = _this.Marketdatamainbox[i];
						_this.marketPurchase.PriceData = Number(
							_this.Marketdatamainbox[i].price
						);
					}
				}
				_this.Obtain(envent);   //获取止盈和止损手续费等
				_this.amount(envent);   //获取用户余额
				_this.SalePriceDatapush(envent);    //买卖价推送
				_this.PurchaseData = null;          //买卖价数据
				_this.getTrading(envent);
				if (_this.MainData) _this.MainData.close();
				// debug 不清楚计时器会导致1s内多次点击时出问题
				if (_this.MainDatapushTime) {
					window.clearInterval(_this.MainDatapushTime)
				}
				_this.MainDatapushTime = window.setTimeout(function () {
					_this.MainDatapush(envent);
				}, 1000);
				if (_this.SalePriceDatas) _this.SalePriceDatas.close();
				_this.shishiDatapush(envent);
			},
			Obtain(codetype) {
				//获取止盈和止损手续费等
				var _this = this; //get_lever
				_this.$http
					.post(_this.$http.get_lever, { code: codetype })
					.then(function (response) {
						if (response.data.status == "200") {
							_this.marketPurchase.spread = Number(response.data.data.spread); //点差
							_this.marketPurchase.stoploss = Number(response.data.data.stoploss); //止损
							_this.marketPurchase.stopwin = Number(response.data.data.stopwin); //止盈
							_this.marketPurchase.pcs_price = Number(response.data.data.pcs_price);
							_this.marketPurchase.trans_fee = _this.$public.toPoint(
								response.data.data.trans_fee
							); //手续费
							_this.marketPurchase.var_price = Number(
								response.data.data.var_price
							); //最小浮动价
							_this.marketPurchase.leverage = response.data.data.leverage; //杠杆
							_this.marketPurchase.leveragemin = response.data.data.leverage.split(
								","
							)[0]; //杠杆
							_this.marketPurchase.num_min = Number(response.data.data.num_min); //最小购买量
						}
					})
					.catch(function (error) { });
			},
			amount(codetype) {
				//获取用户余额
				var _this = this;
				var xinxidata = {
					mobile: sessionStorage.mobile,
					code: _this.marketPurchase.code
				};
				_this.$http
					.post(_this.$http.user_info, {})
					.then(function (response) {
						if (response.data.status == "200") {
							_this.marketPurchase.wallone = Number(response.data.data.wallone_usdt); //用户余额                        //前端lyb修改用户余额
						}
					})
					.catch(function (error) { });
			},
			PriceSwitchingpurchase(type, what) {
				//点击买价卖价 修改
				var _this = this;
				_this.marketPurchase.buyorsell = what;
				_this.marketPurchase.PriceData = Number(
					_this.PurchaseData.sell[type].price
				);
			},
			getdatamain() {
				//获取数据
				var _this = this;
				if (!_this.marketPurchase.code) _this.marketPurchase.code = "btc_usdt"; //反正数据获取不到
				if (_this.$route.query.account) {
					_this.marketPurchase.code = _this.$route.query.account;
				}
				$.get(_this.$http.getNewInfo, {}, function (result) {
					if (result.status == "200") {
						_this.Marketdatamain = result.data;
						_this.Marketdatamainbox = result.data;
						for (var i = 0; i < result.data.length; i++) {
							if (_this.marketPurchase.code == result.data[i].code) {
								_this.Marketdataheader = result.data[i];
								_this.marketPurchase.PriceData = Number(result.data[i].price);
								_this.Obtain(result.data[i].code);
								_this.amount(result.data[i].code);
							}
						}
						_this.SalePriceDatapush(_this.marketPurchase.code); //买卖价
						_this.shishiDatapush(_this.marketPurchase.code);
						// if (_this.MainData) _this.MainData.close();
						_this.setMainTiemOut = window.setTimeout(function () {
							_this.MainDatapush(_this.marketPurchase.code);
						}, 1500);
					}
				});
			},
			MainDatapush(code) {
				// 主区数据推送
				var _this = this;
				// 首先判断是否 支持 WebSocket
				if ("WebSocket" in window) {
					_this.MainData = new WebSocket(_this.$http.MainwsUrl);
				} else if ("MozWebSocket" in window) {
					_this.MainData = new MozWebSocket(_this.$http.MainwsUrl);
				} else {
					_this.MainData = new SockJS(_this.$http.MainskUrl);
				}
				// 打开时
				_this.MainData.onopen = function (evnt) {
					var msg = {
						code: 'all'
					};
					_this.MainData.send(JSON.stringify(msg)); // 发送消息
				};
				// 处理消息时
				_this.MainData.onmessage = function (evnt) {
					if (evnt.data.split("{").length != "2") {
						return false;
					}
					var datanum = JSON.parse(evnt.data);
					// 第一次ajax请求动态添加class为靶点 推送时获取渲染
					var cnyNode = document.querySelector('.cny-' + datanum.code)
					var priceNode = document.querySelector('.price-' + datanum.code)
					var rateNode = document.querySelector('.rate-' + datanum.code)
					cnyNode.innerHTML = `≈${_this.$public.toLowFixed(datanum.cnyPrice, datanum.code, 2)}`
					priceNode.innerHTML = `${_this.$public.toLowFixed(datanum.price, datanum.code)}`
					rateNode.innerHTML = `${datanum.changeRate}`
					_this.changeColor(rateNode, datanum.changeRate)

					if (code == datanum.code) {
						_this.Marketdataheader = datanum;
						_this.marketPurchase.PriceData = datanum.price;
					}
				}
				// };
				_this.MainData.onerror = function (evnt) {
					console.log("  websocket.onerror");
				};
				_this.MainData.onclose = function (evnt) {
					console.log("  websocket.onclose");
				};
			},
			changeColor(dom, num) {
				// >-1说明为跌 渲染绿色
				if (num.indexOf("-") > -1) {
					dom.classList.add('fall')
					dom.classList.remove('rise')
				} else {
					dom.classList.add('rise')
					dom.classList.remove('fall')
				}


			},
			SalePriceDatapush(type) {
				// 买卖价推送
				var connet = this,
					sellbuytype = true;
				if (connet.SalePriceData) {
					connet.SalePriceData.close();
				}
				// 首先判断是否 支持 WebSocket
				if ("WebSocket" in window) {
					connet.SalePriceData = new WebSocket(connet.$http.SecondSalewsUrl);
				} else if ("MozWebSocket" in window) {
					connet.SalePriceData = new MozWebSocket(connet.$http.SecondSalewsUrl);
				} else {
					connet.SalePriceData = new SockJS(connet.$http.SecondSalewsUrl);
				}
				// 打开时
				connet.SalePriceData.onopen = function (evnt) {
					var msg = {
						code: type
					};
					// 发送消息
					connet.SalePriceData.send(JSON.stringify(msg));
				};

				// 处理消息时
				connet.SalePriceData.onmessage = function (evnt) {
					console.log(type);

					var datanum = JSON.parse(evnt.data);
					connet.PurchaseData = datanum; //join
					// var sellData;
					// var buyData ;
					connet.PurchaseData.sell = datanum.asks.reverse();
					connet.PurchaseData.buy = datanum.bids;



				};
				connet.SalePriceData.onerror = function (evnt) {
					console.log("  websocket.onerror");
				};
				connet.SalePriceData.onclose = function (evnt) {
					console.log("  websocket.onclose");
				};
			},
			// 计算背景宽度 当前数值/当前数组中最大数值 
			renderBgWdith(arr, num) { // 数组，当前值
				var max;
				// 获取最大值
				arr.sort((a, b) => b.totalSize - a.totalSize)
				max = arr[0].totalSize
				return ((this.$public.Division(Number(num), Number(max))) * 100).toFixed(2)
			},
			tongji() {
				var _this = this;
				_this.$http
					.post(_this.$http.tongji, {
						mobile: sessionStorage.mobile
					})
					.then(function (response) {
						if (response.data.status == "200") {

							_this.tongjiData = response.data.data;
						}
					})
					.catch(function (error) { });
			},
			handleCommandlangeuage(command) {
				var _this = this;
				// _this.$i18n.locale = command;
				_this.$cookies.set("language", command, 60 * 60 * 24 * 30);
				_this.$router.go(0);
			},
			// 实时成交
			getTrading(code) {
				var _this = this;
				var sendData = {
					// mobile: JSON.parse(unescape(sessionStorage.getItem('mobile'))),
					code: code
				}
				_this.$http.post(_this.$http.sschengjiao, sendData).then(function (response) {
					if (response.data.status == "200") {
						_this.chengjiaoArr = response.data.data;
					}
				}).catch(function (error) { })
			}
		},
		// 路由改变时
		beforeDestroy(to, from, next) {
			var _this = this;
			if (_this.MainData) _this.MainData.close();
			if (_this.SalePriceData) _this.SalePriceData.close();
			if (_this.SalePriceDatas) _this.SalePriceDatas.close();
			if (_this.setInter) {
				window.clearInterval(_this.setInter);
			}
			if (sessionStorage.token && sessionStorage.account) {
				_this.$refs.offTime1.offTime();
			}
			if (_this.setMainTiemOut) {
				window.clearTimeout(_this.setMainTiemOut);
			}
			// next();
		},
		created: function () {
			var _this = this;
			_this.marketPurchase.code = _this.$route.query.code;
			_this.islogin = sessionStorage.account;
			_this.getdatamain();
			// _this.MainDatapush(_this.marketPurchase.code);
			_this.setInter = setInterval(function () {
				// _this.getTrading(_this.marketPurchase.code);
				_this.tongji();
			}, 2000)
			window.scrollTo(0, 0); //回到顶部	
		},
		mounted() {
			this.setChartWidth()
			var _this = this;
			if (_this.$cookies.get("language")) {
				_this.$i18n.locale = _this.$cookies.get("language");
				_this.islange = _this.$cookies.get("language");
			} else {
				_this.$cookies.set("language", "Chinese", 60 * 60 * 24 * 30);
			}
			if (sessionStorage.getItem("mobile")) {
				_this.phone = _this.$public.phoneEncryption(
					sessionStorage.getItem("mobile")
				);
			}
			// 判断登录状态
			_this.account = window.sessionStorage.account;
			_this.token = window.sessionStorage.token;
			if (_this.account !== undefined && _this.token !== undefined) {
				_this.LoginState = true;
			}
			_this.getUserData();
			_this.getTrading(_this.marketPurchase.code);
			if (_this.$route.query.code) {
				_this.handleCommand(_this.$route.query.code);
			}
		},
		components: {
			Quotation,
			Quotationheader,
			ggOrder1
		}
	}; 
</script>