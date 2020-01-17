<style lang=less>
	@import "./exchange.less";

	.el-dropdown-menu__item a {
		display: flex;
		align-items: center;

	}

	.el-dropdown-menu__item a img {
		margin-right: 24px;
	}

	.HistoricalEntrustment .gg_order_wrapper .order_container {
		/* min-width: 1000px; */
	}

	.HistoricalEntrustment #tab-third {
		display: none;
	}

	.HistoricalEntrustment .headertongji {
		display: none;
	}

	.historyWt {
		.el-table {
			height: 333px !important;
		}
	}

	.exchange {

		.el-radio-button:first-child .el-radio-button__inner {
			border-radius: 0;
		}

		.el-table__empty-text {
			/* margin-top: -220px; */
		}

		/* .el-table{
			height: 320px;
		}*/
		.historyWt .el-table__body-wrapper {
			height: 270px;
		}

		.gg_order_wrapper .order_container .content {
			/* height: 460px !important;
			min-height: 460px !important; */
		}

		.new_price {
			height: 34px;
			line-height: 32px;
			/* padding-left: 10px;/ */
			color: #333;
			/* border-bottom: 1px solid #e4e7ed; */
		}

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

		.gg_order_wrapper .order_container .content {
			/* height: 300px; */
		}
	}

	.heyuey {
		.exchange {
			.new_price {
				color: #fff;
				/* border-bottom: 1px solid #3b4c6e; */
			}

			.gg_order_wrapper {
				background: transparent;
			}

			.el-table--border::after,
			.el-table--group::after,
			.el-table::before {
				/* background-color:#192241;
       */
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

			.el-table--enable-row-hover .el-table__body tr:hover>td {
				background: #262a45;
			}

			.has-gutter {

				tr,
				th {
					background: #252525;
					color: #fff;
				}
			}

			tbody {

				tr,
				th {
					background: #192241 !important;
					color: #eee;
				}
			}

			.el-tabs__item {
				color: #eee;
			}

			.el-tabs__item.is-active {
				color: #409eff;
			}

			.el-tabs__nav-wrap::after {
				/* background-color: #3b4c6e; */
				display: none;
			}

			.el-table th.is-leaf,
			.transaction_main {
				/* border-color: #3b4c6e !important; */
			}

			.announcementList {
				background-color: #192241;
			}

			.canuser,
			.el-form-item__label {
				color: #eee !important;
			}

			.el-table td {
				border-color: #3b4c6e !important;
			}
		}
	}
</style>
<template>
	<div class="exchange">
		<!-- <div class="klineheaderWrap">
			<div class="klogo" @click="changeurl('/')">
				<img src="../../assets/img/c_logo.png" alt="">
			</div>
			<div class="kcenter">
				<div class="codesType">
					<el-dropdown @command="handleCommand">
						<span class="el-dropdown-link codesname">
							{{codeName}}
							<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item v-for="(item,index) in Marketdatamain" :key="index" :command='item.code'
								v-if="Marketdatamain.length>0" :data_code="item.code">
								{{(item.code.split("_")[0]).toUpperCase()}}/{{(item.code.split("_")[1]).toUpperCase()}}

							</el-dropdown-item>
							<el-dropdown-item v-else>暂无数据</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<Quotationheader :Marketheader="Marketdataheader"></Quotationheader>
			</div>
			<div class="kright" v-if="LoginState">
				<div class="exchangeorder" @click="changeurl('/ggOrder')"><i
						class="iconfont icon-dingdan"></i>{{$t("header.navlist[4]")}}</div>
				<el-dropdown class="mine">
					<span class="el-dropdown-link">
						<i class="iconfont icon-wode"></i>{{ phone }}
						<img v-if="wallone < money1" src="" alt="">

						<img v-else-if="money1 <= wallone && wallone < money2" src="../../assets/img/v1.png" alt="">

						<img v-else-if="money2 <= wallone && wallone < money3" src="../../assets/img/V2.png" alt="">

						<img v-else-if="money3 <= wallone && wallone < money4" src="../../assets/img/V3.png" alt="">

						<img v-else-if="money4 <= wallone && wallone < money5" src="../../assets/img/V4.png" alt="">

						<img v-else src="../../assets/img/V5.png" alt="">
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown" class="icon_quan">

						<el-dropdown-item :divided="true">
							<router-link to="/MyAssets">
								<img src="../../assets/img/myzc.png" alt="">
								{{$t("header.list[0]")}}
							</router-link>
						</el-dropdown-item>

						<el-dropdown-item :divided="true">
							<router-link to="/security">
								<img src="../../assets/img/zhaq.png" alt="">
								{{$t("header.list[1]")}}
							</router-link>
						</el-dropdown-item>
						<el-dropdown-item :divided="true">
							<a @click="goUrl">
								<img src="../../assets/img/sfrz.png" alt="">
								{{$t("header.list[2]")}}
							</a>

						</el-dropdown-item>

						<el-dropdown-item :divided="true">
							<router-link to="/promotion">
								<img src="../../assets/img/mytg.png" alt="">
								{{$t("header.list[5]")}}
							</router-link>
						</el-dropdown-item>

						<el-dropdown-item :divided="true">
							<router-link to="/Mentionmoneyaddress">
								<img src="../../assets/img/tib.png" alt="">
								{{$t("header.list[3]")}}
							</router-link>
						</el-dropdown-item>
						<el-dropdown-item :divided="true">
							<router-link to="/yuanli">
								<img src="../../assets/img/yuanli.png" alt="">
								{{$t("header.list[8]")}}
							</router-link>
						</el-dropdown-item>


						<el-dropdown-item :divided="true">
							<span @click="signOut">
								<router-link to="">
									<img src="../../assets/img/tc.png" alt="">
									{{$t("header.list[4]")}}
								</router-link>
							</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<el-dropdown @command="handleCommandlangeuage">
					<p>
						<span class="el-dropdown-link linkBorder">
							<img class="lanImg" src="../../assets/img/icon_China.png" alt=""
								v-if="islange == 'Chinese'">
							<img class="lanImg" src="../../assets/img/yinwen.png" alt="" v-else>
							<img class="arrowr" src="../../assets/img/xuanze.png" alt="">
						</span>
					</p>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="Chinese">{{$t("header.day[2]")}}</el-dropdown-item>
						<el-dropdown-item command="English">{{$t("header.day[3]")}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="kright" v-else>
				<span class="logins kbtn" @click="changeurl('/login')">{{$t("header.state[0]")}}</span>
				<span class="registers kbtn" @click="changeurl('/register')">{{$t("header.state[1]")}}</span>
				<el-dropdown @command="handleCommandlangeuage">
					<p>
						<span class="el-dropdown-link linkBorder">
							<img class="lanImg" src="../../assets/img/icon_China.png" alt=""
								v-if="islange == 'Chinese'">
							<img class="lanImg" src="../../assets/img/yinwen.png" alt="" v-else>
							<img class="arrowr" src="../../assets/img/xuanze.png" alt="">
						</span>
					</p>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="Chinese">{{$t("header.day[2]")}}</el-dropdown-item>
						<el-dropdown-item command="English">{{$t("header.day[3]")}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div> -->

		<div class="exchange_flex">
			<div class="exchange_mian">
				<div class="klinediv">
					
					<div class="hangqing">
						<div class="hangqing_nav">
							<div class="item">USDT</div>
						</div>
						<div class="hangqing_list">
							<!-- {{Marketdatamain}} -->
							<div class="hangqing_list_item" 
							v-for="(item,index) in Marketdatamain" :key="index"
							@click="handleCommand(item.code)"
							>
								<div class="coin">
									<img :src="coinImg(item.name)" alt="">
									<div class="coinInfo">
										<div :class="'coinInfo_name'">{{item.name}}</div>
										<div :class="'coinInfo_cny'+' cny-'+item.code">≈{{item.cnyPrice}}</div>
									</div>
								</div>
								<div class="coinPrice">
									<div :class="'coinPrice_now'+' price-'+item.code">{{item.price}}</div>
									<div :class="item.changeRate.indexOf('-')>-1?'coinPrice_rate fall'+' rate-'+item.code:'coinPrice_rate rise'+' rate-'+item.code">{{item.changeRate}}</div>
								</div>
							</div>
						</div>

					</div>
					<div style="flex-grow: 1">
						<!-- k线头部 -->
						<Quotationheader :Marketheader="Marketdataheader"></Quotationheader>
						<!--k 线-->
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
					</div>


					<!-- <section>
						<bInformation :marketPurchase="marketPurchase"></bInformation>
					</section> -->
				</div>
				<section class="HistoricalEntrustment mt10">
					<!--  v-if="islogin" -->
					<!--当前委托 -->
					<!--<Currententrustmen @changeData="listenToMyBoy" ref="Currententrustmen" :Code="marketPurchase.code"></Currententrustmen>-->
					<div>
						<div :class="$t('currlanguage')=='cn'? 'tojingtotles' : 'tojingtotles modelEn'">
							<!-- <span>{{$t('index.KLine[10]')}}: {{tongjiData.totaldeposit}}</span> -->
							<span>{{$t('index.KLine[12]')}}: {{tongjiData.risk}}</span>
							<span>{{$t('index.KLine[11]')}}: {{tongjiData.yingkui}}</span>
						</div>
						<ggOrder :changeactive="updateOrder" :part="true" @changeData="listenToMyBoy" ref="offTime1" :price="marketPurchase.PriceData" :Code="marketPurchase.code"></ggOrder>
					</div>
				</section>
			</div>
			<div class="makeAbargindiv">
				<div class="makeAbargin">
					<div class="makeAbarginItem makeAbarginLeft">
						<div class="deepMerge">
							<span class="label">{{$t("index.other[0]")}}</span>
							<el-select  v-model="deepMergeModel" placeholder="请选择">
								<el-option
								v-for="item in deepMerge"
								:key="item.val"
								:label="item.label"
								:value="item.val">
								</el-option>
							</el-select>
						</div>
						<div class="tabNav">
							<el-tabs type="border-card">
								<el-tab-pane>
									<span slot="label">
										<img src="../../assets/img/coin1.png" alt="">
									</span>
									<div class="transaction_main" v-if="PurchaseData">
										<h3 class="transaction_nav">
											<!-- <p class="PurchaseData_name">{{$t('index.KLine[4]')}}</p> -->
											<p class="PurchaseData_name">{{$t('index.KLine[5]')}}<span>(USDT)</span></p>
											<p class="PurchaseData_name">
												{{$t('index.KLine[6]')}}<span>({{marketPurchase.code.split("_")[0].toUpperCase()}})</span>
											</p>
											<p class="PurchaseData_name">{{$t('index.KLine[19]')}}<span>(USDT)</span>
											</p>
										</h3>
										<div class="relativebs">
											<div class="new_price">
												<!-- {{$t('index.header[1]')}}: -->
												<span class="cnyprice rise"
													v-if="Marketdataheader.change>0">{{Number(Marketdataheader.price).toFixed(4)}}<i>↑</i></span>
												<span class="cnyprice fall"
													v-else>{{Marketdataheader.price}}<i>↓</i></span>
												<span
													class="cny">￥{{Number(Marketdataheader.cnyPrice).toFixed(2)}}</span>
											</div>
											<div class="buyselldiv buyselldivsell">
												<ul class="SelloutData buysell">
													<li class="PurchaseData_list"
														v-for="(item, index) in PurchaseData.sell" :key="index">
														<!-- <p class="PurchaseData_name fall">
														{{$t('index.KLine[7]')}}{{ PurchaseData.sell.length - index}}
													</p> -->
														<p :style="`width:`+renderBgWdith(PurchaseData.sell, item.totalSize)+'%'" class="sellBg"></p>
														<p class="PurchaseData_name fall">
															{{transDeepMerge(item.price)}}
														</p>
														<p class="PurchaseData_name">
															{{Number(item.totalSize).toFixed(4)}}
														</p>
														<p class="PurchaseData_name">
															{{Number(item.price*item.totalSize).toFixed(4)}}
														</p>
													</li>
												</ul>
											</div>
											<div class="buyselldiv buyselldivbuy">
												<ul class="PurchaseData buysell">
													<li class="PurchaseData_list "
														v-for="(item, index) in PurchaseData.buy" :key="index">
														<!-- <p class="PurchaseData_name">
														{{$t('index.KLine[8]')}}{{index+1}}
													</p> -->
														<p :style="`width:`+renderBgWdith(PurchaseData.buy, item.totalSize)+'%'"  class="buyBg"></p>
														<p class="PurchaseData_name rise">
															{{transDeepMerge(item.price)}}
														</p>
														<p class="PurchaseData_name">
															{{Number(item.totalSize).toFixed(4)}}
														</p>
														<p class="PurchaseData_name">
															{{Number(item.price*item.totalSize).toFixed(4)}}
														</p>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div v-else class="transaction_main"
										style="text-align: center; padding-top: 100px;">
										<img src="../../assets/image/timg.gif" width="80">
										<p style="color:#999;font-size: 12px; text-align: center;">
											{{$t('index.KLine[9]')}}...</p>
									</div>
								</el-tab-pane>
								<el-tab-pane>
									<span slot="label">
										<img src="../../assets/img/coin2.png" alt="">
									</span>
									<div class="transaction_main" v-if="PurchaseData">
										<h3 class="transaction_nav">
											<!-- <p class="PurchaseData_name">{{$t('index.KLine[4]')}}</p> -->
											<p class="PurchaseData_name">{{$t('index.KLine[5]')}}<span>(USDT)</span></p>
											<p class="PurchaseData_name">
												{{$t('index.KLine[6]')}}<span>({{marketPurchase.code.split("_")[0].toUpperCase()}})</span>
											</p>
											<p class="PurchaseData_name">{{$t('index.KLine[19]')}}<span>(USDT)</span>
											</p>
										</h3>
										<div class="relativebs">
											<div class="buyselldiv buyselldivbuy top0">
												<ul class="SelloutData buysell">
													<li class="PurchaseData_list"
														v-for="(item, index) in PurchaseData.buy" :key="index">
														<!-- <p class="PurchaseData_name rise">
														{{$t('index.KLine[8]')}}{{index+1}}
													</p> -->
														<p :style="`width:`+renderBgWdith(PurchaseData.buy, item.totalSize)+'%'"  class="buyBg"></p>
														<p class="PurchaseData_name rise">
															{{Number(item.price).toFixed(4)}}
														</p>
														<p class="PurchaseData_name">
															{{Number(item.totalSize).toFixed(4)}}
														</p>
														<p class="PurchaseData_name">
															{{Number(item.price*item.totalSize).toFixed(4)}}
														</p>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div v-else class="transaction_main"
										style="text-align: center; padding-top: 100px;">
										<img src="../../assets/image/timg.gif" width="80">
										<p style="color:#999;font-size: 12px; text-align: center;">
											{{$t('index.KLine[9]')}}...</p>
									</div>
								</el-tab-pane>
								<el-tab-pane>
									<span slot="label">
										<img src="../../assets/img/coin3.png" alt="">
									</span>
									<div class="transaction_main" v-if="PurchaseData">
										<h3 class="transaction_nav">
											<!-- <p class="PurchaseData_name">{{$t('index.KLine[4]')}}</p> -->
											<p class="PurchaseData_name">{{$t('index.KLine[5]')}}<span>(USDT)</span></p>
											<p class="PurchaseData_name">
												{{$t('index.KLine[6]')}}<span>({{marketPurchase.code.split("_")[0].toUpperCase()}})</span>
											</p>
											<p class="PurchaseData_name">{{$t('index.KLine[19]')}}<span>(USDT)</span>
											</p>
										</h3>
										<div class="relativebs">
											<div class="buyselldiv buyselldivsell bottom0">
												<ul class="PurchaseData buysell">
													<li class="PurchaseData_list"
														v-for="(item, index) in PurchaseData.sell" :key="index">
														<!-- <p class="PurchaseData_name fall">
													{{$t('index.KLine[7]')}}{{ PurchaseData.sell.length - index}}</p> -->
														<p :style="`width:`+renderBgWdith(PurchaseData.sell, item.totalSize)+'%'"  class="sellBg"></p>
														<p class="PurchaseData_name fall">
															{{Number(item.price).toFixed(4)}}
														</p>
														<p class="PurchaseData_name">
															{{Number(item.totalSize).toFixed(4)}}
														</p>
														<p class="PurchaseData_name">
															{{Number(item.price*item.totalSize).toFixed(4)}}
														</p>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div v-else class="transaction_main"
										style="text-align: center; padding-top: 100px;">
										<img src="../../assets/image/timg.gif" width="80">
										<p style="color:#999;font-size: 12px; text-align: center;">
											{{$t('index.KLine[9]')}}...</p>
									</div>
								</el-tab-pane>
							</el-tabs>
						</div>
					</div>
					<!-- 实时成交 -->
					<div class="makeAbarginItem makeAbarginRight">
						<p class="makeAbarginItemP topP">
							<span>{{$t('index.KLine[16]')}}</span>
							<span>{{$t('index.KLine[17]')}}</span>
							<span>{{$t('index.KLine[18]')}}</span>
						</p>
						<ul id="realTimeTemp">
							<!-- 暂无数据 -->
							<li class="makeAbarginItemP makeAbarginItemli makeAbarginItemlis">{{$t('index.KLine[15]')}}
							</li>
						</ul>
					 </div>
				</div>
				<section class="transaction mt10">
					<div class="transaction_box">
						<el-tabs v-model="activeName">
							<el-tab-pane :label="$t('index.KLine[3]')" name="second">
								<Purchase @changeData="listenToMyBoy" :ModifyState="false" :Data="marketPurchase">
								</Purchase>
								<Sellout @changeData="listenToMyBoy" :ModifyState="false" :Data="marketPurchase">
								</Sellout>
							</el-tab-pane>
							<el-tab-pane :label="$t('index.KLine[2]')" name="first">
								<Purchase @changeData="listenToMyBoy" :ModifyState="true" :Data="marketPurchase">
								</Purchase>
								<Sellout @changeData="listenToMyBoy" :ModifyState="true" :Data="marketPurchase">
								</Sellout>
							</el-tab-pane>
						</el-tabs>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>
<script>
	import Purchase from "./transaction/purchase.vue";
	import Header from "../main/header.vue";
	import Sellout from "./transaction/sellout.vue";
	import Quotation from "./Quotation.vue";
	import Quotationheader from "./Quotationheader.vue";
	// import klineheader from "./klineheader.vue";
	import TradingNotice from "./tradingNotice.vue";
	import bInformation from "./transaction/bInformation.vue"
	//	import Currententrustmen from "./Currententrustmen.vue"; //委托
	import ggOrder from "../order/ggOrder.vue"; //委托
	import { log } from 'util';
	import { setTimeout } from 'timers';

	export default {
		data() {
			return {
				updateOrder:false,
				deepMergeModel:4,
				deepMerge:[
				{label: this.$t("index.other[1]"),val:2},
				{label:this.$t("index.other[1]"),val:4}
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
				setMainTiemOut:null,
				MainDatapushTime:"", // 计时器
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
			transDeepMerge(val){
				var _val = String(Number(val).toFixed(4)).split(".")
				if(this.deepMergeModel == 4){
					return Number(val).toFixed(4)
				}else{	
					var arr = _val[1].split("")
					arr.splice(2,2,"00")
					_val[1] = arr.join("")
					return _val.join(".")
				}
				
			},
			goUrl(url) { // 身份验证信息跳转
				var _this = this;
				if (_this.status != 3) {
					_this.$public.go("realname", 100, _this);
				} else {
					// if (_this.auth_status == 3) 1{
					// 	// this.$public.msg("您身份认证已经通过!", "success", _this);
					// 	this.$public.msg(_this.$t('header.tips[5]'), "success", _this);
					// 	return false;
					// } else if (_this.auth_status == 1) {
					// 	_this.$public.go("senior", 100, _this);
					// } else if (_this.auth_status == 2) {
					// 	// this.$public.msg("您身份认证正在审核，请耐心等待", "success", _this);
					// 	this.$public.msg(_this.$t('header.tips[6]'), "success", _this);
					// 	return false;
					// } else if (_this.auth_status == 4) {
					// 	this.$public.msg(_this.$t('header.tips[7]'), "warning", _this);
					// 	_this.$public.go("senior", 1000, _this);
					// }
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
					var temp="" // 模板
					var datanum = JSON.parse(evnt.data);
					var filterStatus = (status)=>{
						if(status == 'buy'){
							return 'rise'
						}else{
							return 'fall'
						}

					}
					// connet.Purchaseshuju = datanum.data;
					for(var i=0;i<datanum.data.length;i++){
						var item=datanum.data[i]
						var li =`
						 <li class="makeAbarginItemP makeAbarginItemli">
							    <span class="${filterStatus(item.dc)}">${item.price}</span>
								<span>${Number(item.amount).toFixed(4)}</span>
								<span>${connet.$public.timestampToTimess(item.dt)}</span>
						 </li>
							`
						 temp +=li
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
				switch(val){
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
				this.updateOrder= !this.updateOrder
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
				if(_this.MainDatapushTime){_this.MainDatapushTime.clear()}
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
				// var dommain = document.getElementsByClassName("MainArea_list"),
				// var dommain = document.getElementsByClassName("kcenter"),
				// 	codedata = [],
				// 	pricedata = [],
				// 	yudengyuprice = [],
				// 	changeRatedata = [],
				// 	high = [],
				// 	low = [],
				// 	volume = [];
				// for (var i = 0; i < $(dommain).find('.el-dropdown-menu__item').length; i++) {
				// 	// codedata[i] = dommain[i].getAttribute("data_code");
				// 	// pricedata[i] = dommain[i].children[1];
				// 	// changeRatedata[i] = dommain[i].children[2];
				// 	codedata.push($(dommain).find('.el-dropdown-menu__item')[i].getAttribute("data_code"));
				// }
				// pricedata.push($(dommain).find('.span')[0]);
				// yudengyuprice.push($(dommain).find('.cnyspan')[0]);
				// changeRatedata.push($(dommain).find('.changeRate')[0]);
				// high.push($(dommain).find('.high')[0]);
				// low.push($(dommain).find('.low')[0]);
				// volume.push($(dommain).find('.volume')[0]);
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
					var cnyNode = document.querySelector('.cny-'+datanum.code)
					var priceNode = document.querySelector('.price-'+datanum.code)
					var rateNode = document.querySelector('.rate-'+datanum.code)
					cnyNode.innerHTML = `≈${datanum.cnyPrice}`
					priceNode.innerHTML = `${datanum.price}`
					rateNode.innerHTML = `${datanum.changeRate}`
					_this.changeColor(rateNode, datanum.changeRate)

					// for (var i = 0; i < codedata.length; i++) {
					// if (code == datanum.code) {
					// 	if (datanum.change > 0) {
					// 		$(pricedata[i]).html(Number(datanum.price).toFixed(4));
					// 		$(changeRatedata[i]).html(datanum.changeRate);
					// 		// pricedata[i].innerHTML = '<span style="color:#03be87">' + datanum.price + "</span>";
					// 		// changeRatedata[i].innerHTML = '<span style="color:#03be87">' + datanum.changeRate + "</span>";
					// 	} else {
					// 		$(pricedata[i]).html(Number(datanum.price).toFixed(4));
					// 		$(changeRatedata[i]).html(datanum.changeRate);
					// 		// pricedata[i].innerHTML = '<span style="color:#e66b41">' + datanum.price + "</span>";
					// 		// changeRatedata[i].innerHTML = '<span style="color:#e66b41">' + datanum.changeRate + "</span>";
					// 	}
					// 	_this.changeColor(high, Number(datanum.high).toFixed(4));
					// 	_this.changeColor(low, Number(datanum.low).toFixed(4));
					// 	_this.changeColor(volume, Number(datanum.volume).toFixed(4) + "USDT");
					// }
					
					// if (code == datanum.code) {
					// 	// _this.Marketdatamainbox = datanum;
					// }

					// 重要 给子组件赋值
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
				if(num.indexOf("-")>-1){
					dom.classList.add('fall')
					dom.classList.remove('rise')
				}else{
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
					var datanum = JSON.parse(evnt.data);
					connet.PurchaseData = datanum; //join
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
				arr.sort((a,b)=>b.totalSize-a.totalSize)
				max=arr[0].totalSize
				return ((this.$public.Division(Number(num), Number(max)))*100).toFixed(2)
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
			if(_this.setMainTiemOut){
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
			Purchase: Purchase,
			Sellout: Sellout,
			Quotation: Quotation,
			Header,
			Quotationheader: Quotationheader,
			TradingNotice: TradingNotice,
			bInformation: bInformation,
			//			"Currententrustmen": Currententrustmen, //委托
			ggOrder: ggOrder,
			// klineheader: klineheader
		}
	}; 0
</script>