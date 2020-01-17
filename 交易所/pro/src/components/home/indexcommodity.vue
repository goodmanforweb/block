<style lang=less>
	.btclist_box {
		position: relative;
		top: -114px;
		z-index: 999;
	}
	.btclist ul li .div {
		padding: 20px 12px;
	}
</style>
<template lang="html">
	<section>
		<div class="btclist">
			<ul class="btclist-item">
				<li v-show="item.code != 'KEIEX_usdt'" v-for="(item,index) in list" :key="index" v-if="index<5"
					:data_code='item.code' class="btclist_box wow animate bounceInUp" :data-wow-delay="(index)*(0.25)+'s'">
					<div v-if="item.change < 0" class="div col_1" ref="col_one">
						<div>
							<span class="name">{{$public.InterceptingAdd(item.name)}}<span class="name-d">/USDT</span></span>
							<span v-if="item.change < 0" class="col col_one">{{item.changeRate}}</span>
							<span v-else class="col col_two">{{item.changeRate}}</span>
						</div>
						<div class="money"> {{item.price}}</div>
					</div>
					<div v-else="item.change < 0" class="div col_2" ref="col_two">
						<div>
							<span class="name">{{$public.InterceptingAdd(item.name)}}<span class="name-d">/USDT</span></span>
							<span v-if="item.change < 0" class="col col_one">{{item.changeRate}}</span>
							<span v-else class="col col_two">{{item.changeRate}}</span>
						</div>
						<div class="money"> {{item.price}}</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="hangqingWarp" v-if="list.length != 0 ">
			<ul class="hangq_top wow animate bounceInUp" data-wow-delay="1s">
				<li>{{$t("home.main[27]")}}</li>
				<li>{{$t("home.main[28]")}}</li>
				<li>{{$t("home.main[29]")}}</li>
				<li>{{$t("home.main[30]")}}</li>
				<li>{{$t("home.main[31]")}}</li>
				<li>{{$t("home.main[32]")}}</li>
				<li>{{$t("home.main[33]")}}</li>
			</ul>
			<ul class="hangqwingul wow animate bounceInUp" data-wow-delay="1s">
				<!-- // <router-link v-for="(item,index) in list" :to="{path:'/exchange',query:{account:item.code}}" :key="index"> -->
				<a href="javascript:;" v-show="item.code != 'KEIEX_usdt'" v-for="(item,index) in list"
					:data_code='item.code' @click="gourl(item.code,index,item.price)" class="indexcommodity_box" :key="index">
					<li
					class="row"
					:class="{'row-active':index%2 != 0}">
						<!--1-->
						<div class="hang_1">
							<img :src="coinImg(item.name)" alt="" />
							<p>{{$public.InterceptingAdd(item.name)}} <span>/ USDT</span></p>
						</div>
						<!--2-->
						<div class="hang_2">
							<p class="priceone">{{ Number(item.price).toFixed($public.savePoint(item.code)) }}/￥{{ Number(item.cnyPrice).toFixed(2) }}</p>
						</div>
						<aside>
							<p class="title">
								<!--{{$public.InterceptingAdd(item.name)}} / USDT-->
								<span v-if="item.change > 0" class="changeRate">
									<span class="fall" style="color: #00bc80 !important;">{{item.changeRate}}</span>
									<!-- <i class="el-icon-caret-top fall"></i> -->
								</span>
								<span v-else class="changeRate">
									<span class="rise" style="color: #fe5955 !important;">{{item.changeRate}}</span>
									<!-- <i class="el-icon-caret-bottom rise"></i> -->
								</span>
							</p>
						</aside>
						<!--4-->
						<div class="hang_4">
							<p class="high">{{item.high}}</p>
						</div>
						<!--5-->
						<div class="hang_5">
							<p class="low">{{item.low}}</p>
						</div>
						<!--6-->
						<aside class="hang_6">
							<p class="allNum">
								<span class="numWarp">{{item.volume.toFixed(2)}}</span>
								<span>USDT</span>
							</p>
						</aside>
						<div class="hang_7">
							<img class="jy_1" src="../../assets/img/jiaoyi-icon.png" alt="">
							<img class="jy_2" src="../../assets/img/jy_2.png" alt="">
						</div>
					</li>
				</a>
				<!-- </router-link> -->
			</ul>
		</div>
		<div class="hangqingWarp" v-else>
			<div class="nolistWarp">
				<img src="../../assets/image/timg.gif" alt="" style="width: 90px;" />
			</div>
		</div>
	</section>
</template>
<script>
	import { WOW } from 'wowjs'
import { connect } from 'tls';
	export default {
		data() {
			return {
				list: [],
				second: [],
				MainData: "",
				SecondData: "",
				codedata: [],
				pricedata: [],
				cnyPriceData: [],
				changeRate: [],
				highdata: [],
				lowdata: [],
				volumedata: [],
				changedata: [],
				yuedengdata: [],
				onedata: [],
				twodata: []
			}
		},
		watch: {
			"list": function () {
				this.$nextTick(() => { // 在dom渲染完后,再执行动画
					var wow = new WOW({
						live: false
					})
					wow.init();
				})
			}
		},
		methods: {
			// 根据日间夜间切换list背景
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
					case 'DASH':
						return require("../../assets/image/ex/dash.png")
					case 'TRX':
						return require("../../assets/image/ex/trx.png")
					case 'HT':
						return require("../../assets/image/ex/ht.png")
				}
			},
			gourl(code, index, price) {
				var _this = this;
				if (!sessionStorage.account && !sessionStorage.token) {
					_this.$public.msg(_this.$t('tiBit.tips[14]'), 'warning', _this);
					_this.$public.go("/Login", 0, _this);
					return false;
				};

				_this.$public.go('/exchange', 10, _this, {
					code: code,
					index: index,
					urlPrice: Number(price).toFixed(_this.$public.savePoint(code))
				})


				// if(code != 'kt_usdt'){
				// 	_this.$public.go('/exchange',10,_this,{
				// 		code:code,
				// 		index:index
				// 	})
				// }else {
				// 	_this.$public.go('/exchange',10,_this,{
				// 		code:'btc_usdt',
				// 		index:index
				// 	})
				// }
			},

			// 获取主区数据
			GetDatamain() {
				var connet = this;
				$.get(connet.$http.getNewInfo, {}, function (result) {
					// console.log(result)
					if (result.status == "200") {
						connet.list = result.data;
						window.setTimeout(function () {
							connet.MainDatapush();
						}, 800)
					}
				});
			},
			// 主区数据推送
			MainDatapush() {
				var connet = this;
				//准备dom元素，存入数组
				window.setTimeout(function () {
					var domdata = $('.indexcommodity_box');
					var btclistdata = $('.btclist_box');
					for (var i = 0; i < domdata.length; i++) {
						connet.codedata.push(domdata[i].getAttribute('data_code'));
						connet.pricedata.push(domdata.eq(i).find('.priceone')[0]);
						connet.cnyPriceData.push(domdata.eq(i).find('.priceone')[0]);
						connet.changeRate.push(domdata.eq(i).find('.changeRate')[0]);
						connet.volumedata.push(domdata.eq(i).find('.numWarp')[0]).toFixed(4);
						connet.yuedengdata.push(domdata.eq(i).find('.yuedeng')[0]);
						connet.highdata.push(domdata.eq(i).find('.high')[0]);
						connet.lowdata.push(domdata.eq(i).find('.low')[0]);
					};
					for (var i = 0; i < btclistdata.length; i++) {
						connet.codedata.push(btclistdata[i].getAttribute('data_code'));
						connet.onedata.push(btclistdata.eq(i).find('.money')[0]);
						connet.twodata.push(btclistdata.eq(i).find('.col')[0]);
					}
				}, 1500);

				// 首先判断是否 支持 WebSocket
				if ('WebSocket' in window) {
					connet.MainData = new WebSocket(connet.$http.MainwsUrl);
				} else if ('MozWebSocket' in window) {
					connet.MainData = new MozWebSocket(connet.$http.MainwsUrl);
				} else {
					connet.MainData = new SockJS(connet.$http.MainskUrl);
				}
				// 打开时
				connet.MainData.onopen = function (evnt) {
					var msg = {
						code: "all"
					};
					// 发送消息
					connet.MainData.send(JSON.stringify(msg));
				};
				// 处理消息时
				connet.MainData.onmessage = function (evnt) {

					if(connet.$route.path !=='/home'){
						connet.MainData.close()
					}
					if (evnt.data.split('{').length != "2") {
						return false;
					};
					var datanum = JSON.parse(evnt.data);
					//					return;
					for (var i = 0; i < connet.codedata.length; i++) {
						if (datanum.code == connet.codedata[i]) {
							$(connet.pricedata[i]).html(Number(datanum.price).toFixed(connet.$public.savePoint(datanum.code)) + '/￥' + Number(datanum.cnyPrice).toFixed(2));
							$(connet.changeRate[i]).html(datanum.changeRate);
							$(connet.volumedata[i]).html(datanum.volume.toFixed(2));
							$(connet.highdata[i]).html(datanum.highdata);
							$(connet.lowdata[i]).html(datanum.lowdata);




							// $(connet.onedata[i]).html();
							$(connet.twodata[i]).html(datanum.changeRate);


							$(connet.onedata[i]).html( datanum.price);

							// connet.pricedata[i].innerHTML = datanum.price;
							// connet.changeRate[i].innerHTML =  datanum.changeRate;
							// connet.volumedata[i].innerHTML = datanum.volume.toFixed(4);
							// connet.highdata[i].innerHTML = datanum.high;
							// connet.lowdata[i].innerHTML = datanum.low;

							// connet.onedata[i].innerHTML = datanum.price;
							// connet.twodata[i].innerHTML = datanum.changeRate;

							//							connet.yuedengdata[i].innerHTML = '≈'+datanum.cnyPrice+'  CNY';
							// if (Number(datanum.change) < 0) {
							// 	// connet.changeRate[i].innerHTML = "<span class=rise>"+datanum.changeRate+"</span><i class='el-icon-caret-bottom rise'></i>"
							// 	$(connet.changeRate[i]).html("<span class=rise>" + datanum.changeRate + "</span><i class='el-icon-caret-bottom rise'></i>");
							// } else {
							// 	// connet.changeRate[i].innerHTML = "  <span class=fall>"+datanum.changeRate+"</span> <i class='el-icon-caret-top fall'></i>"
							// 	$(connet.changeRate[i]).html("<span class=fall>" + datanum.changeRate + "</span> <i class='el-icon-caret-top fall'></i>");
							// }
							if (Number(datanum.change) < 0) {
								// connet.changeRate[i].innerHTML = "<span class=rise>"+datanum.changeRate+"</span><i class='el-icon-caret-bottom rise'></i>"
								$(connet.changeRate[i]).html("<span class=rise>" + datanum.changeRate + "</span>");
							} else {
								// connet.changeRate[i].innerHTML = "  <span class=fall>"+datanum.changeRate+"</span> <i class='el-icon-caret-top fall'></i>"
								$(connet.changeRate[i]).html("<span class=fall>" + datanum.changeRate + "</span>");
							}
						};
					};

				};
				connet.MainData.onerror = function (evnt) {
					// console.log("  websocket.onerror");
				};
				connet.MainData.onclose = function (evnt) {
					// console.log("  websocket.onclose");
				};
			},
			// 创新区数据推送

			// 点击跳转
			RoutingJump(typenum) {
				var connet = this;
				connet.$router.push({
					path: '/exchange',
					query: {
						code: typenum
					}
				});
			},
		},
		// 路由改变时
		beforeRouteLeave(to, from, next) {
			var conent = this;
			conent.MainData.close();
			conent.SecondData.close();
			next()
		},
		created: function () {
			var connet = this;
			connet.GetDatamain();
		},
		mounted() {
			new WOW().init();
		},
		components: {

		}
	}
</script>