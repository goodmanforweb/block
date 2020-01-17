<style lang=less>
	.el-message-box__header{
		background: #eeeeee;
	}
	.el-message-box__btns{
		display: flex;
		justify-content: space-between;


	}
	.el-message-box__btns button{
		width: 150px;
	}
	.el-message-box__btns button:nth-child(2){
		background: #2A64F3;
		border-color: #2A64F3;
	}
	.el-message-box__btns button:nth-child(1):hover{
		background: #ffffff;
		color: #606266;
		border-color: #DCDFE6;
	}
	.el-message-box__header span{
		color: #000 !important;
	}
	p.fr.canWall {
		color: #2A64F3!important;
		font-size: 14px;
		line-height: 28px;
	}

	.Sellout span.el-radio-button__inner {
		/* width: 6.8vw; */
		height: 40px;
		line-height: 25px;
		margin-right: 1.2vw;
		border-radius: 0px;
	}

	.el-radio-button:last-child span.el-radio-button__inner {
		margin-right: 0;
	}

	.el-radio-button__inner {
		border-left: 1px solid #dcdfe6;
	}

	.heyuey {

		Sellout {
			.el-radio-button__inner {
				border: none;
				color: #eee;
				background-color: #263146;
			}
		}

		.el-radio-button:first-child .el-radio-button__inner,
		.el-radio-button:last-child .el-radio-button__inner {
			border: none;
			border-radius: 0px;
		}

	}
</style>
<template lang="html">

	<div class="Sellout">
		<el-form ref="form" :model="form" size="mini" label-width="40px" label-position="left">
			<el-form-item class="keyong" :label="$t('sellout.sell[9]')">
				<p class="canWall" v-if="isLogin">{{Data.wallone}}USDT</p>
				<p class="canWall" v-else>0.0000USDT</p>
			</el-form-item>
			<el-form-item class="el-form-itemS" :label="$t('purchase.sell[0]')">
				<el-input v-model="sendData.newprice" :disabled="ModifyState"></el-input>
				<div class="icons" v-if="!ModifyState">
					<i class="el-icon-minus" @click="minusFn"></i>
					<span>|</span>
					<i class="el-icon-plus" @click="plusFn"></i>
				</div>
			</el-form-item>
			<el-form-item :label="$t('purchase.sell[1]')">
				<el-input :placeholder="pl+sendData.pcs_price+Data.code | normal" v-model="sendData.buynum">
					<!-- <template slot="append">{{Data.code | normal }}</template> -->
				</el-input>
				<span class="coinName">{{$t('purchase.sell[9]')}}</span>
				<div class="baifenbidiv">
					<span class="baifenbi" v-for="(item,index) in baifenbiarr" :class="active==index?'on':''"
						@click="baifenFn(item,index)">{{item}}</span>
				</div>
				<!-- <span class="coinName">{{Data.code | normal }}</span> -->
				<!-- 最大购买量 -->
				<!-- <div class="number" v-if="isLogin && form.maximum>=1">
					<span class="MaxLen">{{$t('purchase.sell[2]')}}{{form.maximum}}</span>
				</div>
				<div class="number" v-else>
					<span class="MaxLen">{{$t('purchase.sell[2]')}}0</span>
				</div> -->
			</el-form-item>
			<el-form-item class="gangganbeishu" :label="$t('purchase.sell[8]')">
				<!-- <el-radio-group v-model="sendData.leverage" size="mini">
					<el-radio-button v-for="(item,index) in Data.leverage.split(',')" :key="index" :label="item"
						v-if="index<3">
					</el-radio-button>
				</el-radio-group> -->
				<el-dropdown class="dropdown" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						<span>{{command}}</span><i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :command="item" v-for="(item,index) in Data.leverage.split(',')" :key="index"
							v-if="index<3">{{item}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-form-item>
			<!-- <div class="el-form-item stopWarp">
				<div class="stopwin fl">
					<h2>{{$t('purchase.sell[4]')}}: {{sendData.zy}}</h2>
					<div class="stopwin_box">
						<el-input v-if="isLogin && Data.stopwin !=0" v-model="sendData.zy" :show-tooltip="false"
							:min="0" type="number" size="mini"></el-input>
						<el-input v-else v-model="sendData.zy" :show-tooltip="false" :min="0" type="number" size="mini">
						</el-input>
					</div>
				</div>
				<div class="stoploss fr">
					<h2>{{$t('purchase.sell[5]')}}: {{sendData.zs}}</h2>
					<div class="stopwin_box">
						<el-input v-if="isLogin && Data.stoploss!=0 " v-model="sendData.zs" :show-tooltip="false"
							:min="0" type="number" size="mini"></el-input>
						<el-input v-else v-model="sendData.zs" :show-tooltip="false" :min="0" type="number" size="mini">
						</el-input>
					</div>
				</div>
			</div> -->
			<!-- <div class="jiaoyiAll">
				<el-form-item :label="$t('purchase.sell[3]')">
					<p v-if="isLogin"> :{{form.turnover}}USDT</p>
					<p v-else>:0.0000 USDT</p>
				</el-form-item>
			</div> -->
			<div class="jiaoyiAll">
				<!-- <el-form-item label="占用保证金" style="width:120px;"> -->
				<label class="el-form-item__label">{{$t('purchase.sell[10]')}}</label>
				<p v-if="isLogin">{{form.turnover}}USDT</p>
				<p v-else>0.0000 USDT</p>
				<!-- </el-form-item> -->
			</div>
			<!-- <el-form-item> -->
			<el-button v-if='isLogin' type="success" size="small" :loading="loadingsellout" @click="onSubmit">
				{{$t('purchase.sell[6]')}}</el-button>
			<router-link v-else to="/login">
				<el-button type="success" size="small" :loading="loadingsellout">
					{{$t('sellout.sell[7]')}}

				</el-button>
			</router-link>
			<!-- </el-form-item> -->
		</el-form>

	</div>
</template>
<script>
	export default {
		props: ["Data", "ModifyState"],
		data() {
			var _this = this;
			return {
				active: null,
				command: "",//杠杆倍数
				dialogFormVisible: true,
				activeName: "first",
				pl: _this.$t('sellout.sell[13]'),
				fee: "",//手续费
				form: {
					maximum: 0, //交易最大数量
					turnover: "" //交易额
				},
				//需要向后台传的数据
				sendData: {
					mobile: null, //手机号
					shopname: "", //code
					newprice: 0, //最新价格
					buynum: "", //买入数量
					type: 1, //市价 1 限价 2  （默认市价）
					otype: 1, //涨（买入） 1 跌 2（卖出）
					zy: 0, //止盈
					zs: 0, //止损
					leverage: null, //杠杆
					pcs_price: ""
				},
				loadingsellout: false, //防止重复提交
				isLogin: false, //判断有没有登录
				baifenbiarr: ["25%", "50%", "75%", "100%"],
				statuss: "",//高级认证状态
				baozhengjin:"",
			};
		},
		watch: {
			"Data.leveragemin": function (val, oval) {
				this.sendData.leverage = val;
				this.command = val;
			},
			"Data.code": function (val, oval) {
				this.sendData.newprice = Number(this.Data.PriceData).toFixed(4);
				this.sendData.buynum = "";
				this.sendData.zy = 0;
				this.sendData.zs = 0;
				this.sendData.leverage = this.Data.leveragemin;
				this.command = this.Data.leveragemin;
			},

			"sendData.leverage": function (val, oval) {
				this.maxCanBuy();
				this.allMoney();
			},
			"Data.pcs_price": function (val, oval) {
				var _this = this;
				_this.sendData.pcs_price = val;
				this.allMoney();
			},
			"Data.PriceData": function (val, oval) {
				var _this = this;
				if(_this.ModifyState){
					_this.sendData.newprice = Number(val).toFixed(4);
				}
				// _this.sendData.newprice = Number(val).toFixed(4);
				_this.sendData.shopname = _this.Data.code; //code
				this.maxCanBuy();
			},
			"Data.wallone": function (val, oval) {
				this.maxCanBuy();
				this.allMoney();
			},
			"Data.leverage": function (val, oval) {
				var _this = this;
				_this.command = val.split(",")[0];
			},
			"sendData.newprice": function (val, oval) {
				var _this = this;
				if(_this.ModifyState){
					_this.sendData.newprice = Number(val).toFixed(4);
				}
				//从新计算最大购买量和交易额
				if (!this.isLogin) return false;
				this.maxCanBuy();
				this.allMoney();
			},
			"ModifyState":function(val,oval){
				var _this = this;
			},
			"sendData.buynum": function (val, oval) {
				//从新计算最大购买量和交易额
				var _this = this;
				if (!val) {
					this.sendData.buynum = "";
				} else {
					_this.sendData.buynum = val.replace(/[^[1-9]\d]/g, '');
					if (Number(_this.sendData.buynum) > Number(this.form.maximum)) {
						this.sendData.buynum = this.form.maximum;
						return false;
					}
				}
				this.maxCanBuy();
				this.allMoney();
				if (typeof (val) == "string") {
					this.active = null;
				}
			},
			"Data.trans_fee": function (val, oval) {
				var _this = this;
			}
		},
		//过滤器
		filters: {
			normal: function (val) {
				var n = val.indexOf("_");
				if (n == -1) return "--";
				return val.toUpperCase().slice(0, n);
			}
		},
		methods: {
			baifenFn(item, index) {
				var _this = this;
				var number = _this.$public.toPoint(item);
				_this.active = index;
				_this.sendData.buynum = Math.floor(_this.$public.Multiplication(_this.form.maximum, number));
				_this.allMoney();
			},
			minusFn() {
				var _this = this;
				var price = _this.sendData.newprice;
				if (price.toString().indexOf(".") !== -1) {
					var n = price.toString().split(".")[1].length;
					_this.sendData.newprice = _this.$public.Subtraction(_this.sendData.newprice, Number(_this.$public.Division(1, Math.pow(10, n))));
					if (_this.sendData.newprice.toString().split(".")[1].length < n) {
						_this.sendData.newprice = Number(_this.sendData.newprice).toFixed(n);
					}
				} else {
					_this.sendData.newprice = _this.$public.Subtraction(_this.sendData.newprice, 1);
				}
				if (_this.sendData.newprice <= 0) {
					_this.sendData.newprice = 0;
				}
			},
			plusFn() {
				var _this = this;
				var price = _this.sendData.newprice;
				if (price.toString().indexOf(".") !== -1) {
					var n = price.toString().split(".")[1].length;
					_this.sendData.newprice = _this.$public.Addition(_this.sendData.newprice, Number(_this.$public.Division(1, Math.pow(10, n))));
					if (_this.sendData.newprice.toString().split(".")[1].length < n) {
						_this.sendData.newprice = Number(_this.sendData.newprice).toFixed(n);
					}
				} else {
					_this.sendData.newprice = _this.$public.Addition(_this.sendData.newprice, 1);
				}
			},
			// 杠杆倍数
			handleCommand(command) {
				var _this = this;
				_this.command = command;
				console.log(command);
				_this.sendData.leverage = command
				_this.allMoney();
				_this.maxCanBuy();
			},
			//最大购买量
			maxCanBuy() {
				//最大购买量  = 客户总钱数/(合约面值 *持仓均价 （手续费 + 1/杠杆） )

				//				 最大购买量  = 客户总钱数/(单价（手续费 + 1/杠杆） ) 整形
				//				其中价格  （买入）= 当前价格  + 点差 * 最小浮动价         （卖出）= 当前价格  - 点差 * 最小浮动价
				if (this.ModifyState) {
					var newPrice = Number(this.sendData.newprice) + Number(this.Data.spread * this.Data.var_price);
				} else {
					var newPrice = this.sendData.newprice;
				}
				// var newPrice =
				// 	Number(this.sendData.newprice) +
				// 	Number(this.Data.spread * this.Data.var_price); //价格从新计算
				// var maxNum = this.Data.wallone / (newPrice * (this.Data.trans_fee + 1 / this.sendData.leverage));
				var maxNum = this.Data.wallone / (this.sendData.pcs_price * newPrice * (this.Data.trans_fee + 1 / this.command));
				this.form.maximum = Math.floor(maxNum);
			},
			//最总交易额
			allMoney() {
				var _this = this;
				//交易总金额（保证金）= 合约面值 * 持仓合约数量 * 持仓均价 / 杠杆，
				//手续费= 合约面值 * 持仓合约数量 * 持仓均价 *手续费率，
				/*
					 总价格计算公式  价格* 数量（ 手续费率 + 1/杠杆  ）
					  其中价格  （买入）= 当前价格  + 点差 * 最小浮动价         （卖出）= 当前价格  - 点差 * 最小浮动价
				   * */
				//this.ModifyState==true市价
				if (this.ModifyState) {
					var newPrice = Number(this.sendData.newprice) + Number(this.Data.spread * this.Data.var_price);
				} else {
					var newPrice = this.sendData.newprice;
				}
				//   var newPrice = Number(this.sendData.newprice) + Number(this.Data.spread * this.Data.var_price); //价格从新计算
				// var allMoney = newPrice * this.sendData.buynum * (this.Data.trans_fee + 1 / this.command);
				var allMoney = this.sendData.pcs_price * newPrice * this.sendData.buynum * (this.Data.trans_fee + 1 / this.command);
				_this.baozhengjin = this.sendData.pcs_price * newPrice * this.sendData.buynum * (1 / this.command);
				if (!allMoney) {
					this.form.turnover = "0";
				} else {
					this.form.turnover = allMoney.toFixed(4);
				}
				this.fee = this.sendData.pcs_price * newPrice * this.sendData.buynum * this.Data.trans_fee;
			},
			userInfo: function () {
				var _this = this;
				_this.$http
					.post(_this.$http.user_info, {})
					.then(function (response) {
						if (response.data.status != "200") {
							_this.isLogin = false;
						} else {
							_this.isLogin = true;
							_this.status = response.data.data.auth_status;
							_this.statuss = response.data.data.status;
						}
					})
					.catch(function (error) { });
			},
			onSubmit: function () {
				//订单
				// ModifyState = true 市价 false 限价
				// 做多时：价格输入大于实时价时，在下单的时候提示“委托价应小于实时价
				if(!this.ModifyState){
					if( Number(this.sendData.newprice) > Number(this.Data.PriceData)){
						// 委托价应小于实时价
						this.$public.msg(this.$t('sb[0]'),'warning',this)
						return false
					}
				}
				var _this = this;
				var dis = null;
				// if (_this.statuss !== "3") {
				// 	_this.$public.msg(_this.$t("purchase.tips[0]"), "warning", _this);
				// 	return false;
				// }
				if (_this.sendData.zy < 0) {
					_this.$public.msg(_this.$t("tips.main[0]"), "warning", _this);
					return false;
				}
				if (_this.sendData.zy.toString().split(".").length > 1) {
					if (_this.sendData.zy.toString().split(".")[1]) {
						if (_this.sendData.zy.toString().split(".")[1].length > 4) {
							_this.$public.msg(_this.$t("tips.main[1]"), "warning", _this);
							return false;
						}
					}
				}
				if (_this.sendData.zs < 0) {
					_this.$public.msg(_this.$t("tips.main[2]"), "warning", _this);
					return false;
				}
				if (_this.sendData.zs.toString().split(".").length > 1) {
					if (_this.sendData.zs.toString().split(".")[1]) {
						if (_this.sendData.zs.toString().split(".")[1].length > 4) {
							_this.$public.msg(_this.$t("tips.main[1]"), "warning", _this);
							return false;
						}
					}
				}

				//				_this.loadingsellout = true;
				if (_this.ModifyState) {
					_this.sendData.type = 1;
					dis = _this.$t("purchase.script[0]");
				} else if (!_this.ModifyState) {
					_this.sendData.type = 2;
					dis = _this.$t("purchase.script[1]");
				}
				_this.sendData.mobile = sessionStorage.mobile; //手机号
				if (
					!_this.$public.dataDetection(_this.sendData, _this.Data.wallone, _this)
				) {
					return false;
				}
				const h = this.$createElement;
				this.$msgbox({
					title: _this.$t("purchase.script[2]"),
					message: h(
						"div",
						{
							style: "width: 70%;margin:0 auto"
						},
						[
							h(
								"div",
								{
									style: "overflow: hidden"
								},
								[
									h(
										"p",
										{
											style: "float:left;width:50%;"
										},
										[
											h("span", null, _this.$t("purchase.script[3]")),
											h(
												"span",
												{
													style: "color:#03c087"
												},
												_this.$t("purchase.script[4]")
											)
										]
									),
									h(
										"p",
										{
											style: "float:right;width:50%;"
										},
										[
											h("span", null, _this.$t("purchase.script[5]")),
											h("span", null, dis)
										]
									)
								]
							),
							h(
								"div",
								{
									style: "overflow: hidden"
								},
								[
									h(
										"p",
										{
											style: "float:left;width:50%;"
										},
										[
											h("span", null, _this.$t("purchase.script[6]")),
											h("span", null, _this.sendData.newprice)
										]
									),
									h(
										"p",
										{
											style: "float:right;width:50%;"
										},
										[
											h("span", null, _this.$t("header.option[0]")),
											h("span", null, Number(_this.baozhengjin).toFixed(4))
										]
									),
									// h(
									// 	"p",
									// 	{
									// 		style: "float:right"
									// 	},
									// 	[
									// 		h("span", null, _this.$t("purchase.script[7]")),
									// 		h("span", null, _this.sendData.zy)
									// 	]
									// )
								]
							),
							h(
								"div",
								{
									style: "overflow: hidden"
								},
								[
									h(
										"p",
										{
											style: "float:left;width:50%;"
										},
										[
											h("span", null, _this.$t("purchase.script[8]")),
											h("span", null, _this.sendData.buynum)
										]
									),
									h(
										"p",
										{
											style: "float:right;width:50%;"
										},
										[
											h("span", null, _this.$t("header.option[2]")),
											h("span", null, Number(_this.fee).toFixed(4))
										]
									),
									// h(
									// 	"p",
									// 	{
									// 		style: "float:right"
									// 	},
									// 	[
									// 		h("span", null, _this.$t("purchase.script[9]")),
									// 		h("span", null, _this.sendData.zs)
									// 	]
									// )
								]
							),
							h(
								"div",
								{
									style: "overflow: hidden"
								},
								[
									h(
										"p",
										{
											style: "float:left;width:50%;"
										},
										[
											h("span", null,  _this.$t("header.option[1]")),
											h("span", null, _this.command)
										]
									),
								]
							)
						]
					),
					showCancelButton: true,
					confirmButtonText: _this.$t("purchase.script[10]"),
					cancelButtonText: _this.$t("purchase.script[11]"),
					beforeClose: (action, instance, done) => {
						if (action === "confirm") {
							instance.confirmButtonLoading = true;
							instance.confirmButtonText = _this.$t("purchase.script[12]");
							//数据请求 开始下单
							done();
							_this.$http
								.post(_this.$http.add_order, _this.sendData)
								.then(function (response) {
									//								done();
									instance.confirmButtonLoading = false;
									if (response.data.status == "200") {
										_this.$public.msg(
											_this.$t("purchase.script[13]"),
											"success",
											_this
										);
										_this.sendData.buynum = "";
										_this.sendData.zy = 0;
										_this.sendData.zs = 0;
										_this.maxCanBuy();
										_this.allMoney();
										_this.$emit("changeData");
									} else {
										_this.$public.msg(response.data.msg, "warning", _this);
									}
								})
								.catch(function (error) { });
						} else {
							done();
						}
					}
				}).then(action => { });
			}
		},
		// 路由改变时
		beforeRouteLeave(to, from, next) { },
		mounted: function () {
			var _this = this;
			_this.userInfo();
			_this.sendData.shopname = _this.Data.code; //code
			setTimeout(function () {
				_this.sendData.newprice = Number(_this.Data.PriceData).toFixed(4); //最新价格
				_this.maxCanBuy();
				_this.allMoney();
			}, 1500);
			_this.command = _this.Data.leverage.split(",")[0];

		},
		components: {}
	};
</script>