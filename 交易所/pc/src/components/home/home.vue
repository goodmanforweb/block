<style lang=less>
	@import './home.less';
	.contact-us-section {
		height: 284px;
		background: url(../../assets/img/contactusbar.png) no-repeat center;
		background-size: cover;
		color:#fff;
		span {
			cursor: pointer;
			background-color: #22c6eb;
			line-height: 60px;
			border-radius: 30px;
			text-align: center;
			color:#fff;
			padding:0 20px;
			&:hover {
				opacity: .7;
			}
		}
	}
	.inner {
		width: 1280px;
    height: 100%;
    margin: 0 auto;
	}
</style>
<template lang="html">
	<div class="index_main">
		<div id="home">
			<section class="rotation">
				<div class="banner flex v hc">
					<div class="bannercenter">
						<div class="text">
							<p class="p_1">{{$t('bhome[0]')}}</p>
							<p class="p_2">{{$t('bhome[1]')}}</p>
							<p class="p_3">{{$t('bhome[2]')}}</p>
						</div>
						
					</div>
				</div>
			</section>


			<!--交易挖矿平台-->
			<section class="bannerCenter">
				<div class="bannerheader">
					<IndexCommodity></IndexCommodity>
				</div>
			</section>
			<div class="middle">
				<div class="bg">
					<div class="top center">
						<table></table>
						<div>
							<p class="p_1">{{$t("BITPUIHome.BITPUIMain[5]")}}</p>
							<p class="p_2"></p>
							<p class="p_3">
									{{$t("BITPUIHome.BITPUIMain[6]")}}
							</p>
						</div>
					</div>

					<div class="bottom">
						<div class="item">
							<div class="itemImg">
								<img src="../../assets/img/bc1.png" alt="">
							</div>
							<h1 class="center">{{$t("BITPUIHome.BITPUIMain[7]")}}</h1>
							<p>{{$t("BITPUIHome.BITPUIMain[8]")}}</p>
						</div>
						<div class="item">
							<div class="itemImg">
								<img src="../../assets/img/bc2.png" alt="">
							</div>
							<h1 class="center">{{$t("BITPUIHome.BITPUIMain[9]")}}</h1>
							<p>{{$t("BITPUIHome.BITPUIMain[10]")}}</p>
						</div>
						<div class="item">
							<div class="itemImg">
								<img src="../../assets/img/bc3.png" alt="">
							</div>
							<h1 class="center">{{$t("BITPUIHome.BITPUIMain[11]")}}</h1>
							<p>{{$t("BITPUIHome.BITPUIMain[12]")}}</p>
						</div>
						<div class="item">
							<div class="itemImg">
								<img src="../../assets/img/bc4.png" alt="">
							</div>
							<h1 class="center">{{$t("BITPUIHome.BITPUIMain[13]")}}</h1>
							<p>{{$t("BITPUIHome.BITPUIMain[14]")}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="contact-us-section">
				<div class="inner flex v hc">
					<p class="f46 wcr">{{$t('contct[0]')}}</p>
					<div class="flex sb vc f26">
						<p >{{$t('contct[1]')}}</p>
						<span>{{$t('contct[2]')}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
	</div>
</template>

<script>
	import Sowingmap from "./sowingMap.vue";
	import IndexCommodity from "./indexcommodity.vue";
	import { WOW } from 'wowjs';
	import RotationChart from "./rotationchart.vue";
	// import Btclist from "./btclist.vue"
	export default {
		data() {
			var _this = this;
			var mobile = (rule, value, callback) => {
				value = value.toString();
				if (value.indexOf('@') == -1) {
					if (!_this.$public.checkMobile(value)) {
						return callback(new Error(_this.$t('register.tips[0]')));
					} else {
						this.ismobile = 1;
						callback();
					}

				} else {
					if (!_this.$public.email(value)) {
						return callback(new Error(_this.$t('register.tips[0]')));
					} else {
						this.ismobile = 2;
						callback();
					}
				}
			};
			return {
				yuanli: '',
				btn_qiao: false,
				qd: '',
				account: '',
				list: new Array(),
				dialogFormVisible: false,
				tankuang: false,
				swiper: "",
				userData: {
					mobile: ""
				},
				input4: "",
				rules2: {
					mobile: [{
						validator: mobile,
						trigger: 'blur'
					}],
				},
				bannerData: [],
				ggData: [],
			}
		},
		methods: {
			heyue(){
				var _this = this;
				if(!sessionStorage.getItem("token")){
					_this.$public.msg(_this.$t('tips.main[3]'), 'warning', _this);
				this.$router.push({name:'login'});
					_this.$router.push({ path: "/login"});
					return ;
				}
				this.$router.push({name:'exchange'});
			},
			// 签到
			Signin() {
				var _this = this;
				_this.$http.post(_this.$http.user_sign, {}).then(res => {
					if (res.data.status == '200') {
						// _this.$message({
						//   message: res.data.msg,
						//   type: "success"
						// });
						_this.yuanli = res.data.data[0];
						_this.btn_qiao = true;
						_this.getUserData();
					} else {
						_this.$message({
							message: res.data.msg,
							type: "warning"
						});
					}
				});
			},

			getUserData() {
				var _this = this;
				if (!sessionStorage.account) {
					return false;
				}
				_this.$http.post(_this.$http.user_info, {})
					.then(function (response) {
						if (response.data.status == "200") {
							_this.qd = response.data.data.qd;
						} else {
							_this.$public.msg(response.data.msg, "warning", _this);
						}
					})
					.catch(function (error) { });
			},

			requestPublic: function () {
				var _this = this;
				_this.$http.get(_this.$http.zixunList, {
					params: {}
				}).then((res) => {
					// _this.list = res.data.data.res;
					for (var i = 0, j = res.data.data.res.length; i < j; i += 4) {
						_this.list.push(res.data.data.res.slice(i, i + 4));
					};
					window.setTimeout(function () {
						_this.swiper = new Swiper('.swiper-container', {
							pagination: {
								el: '.swiper-pagination',
								type: 'fraction',
							},
							prevButton: '.swiper-button-prev',
							nextButton: '.swiper-button-next',
						});
					}, 1000);
				});
			},
			goUrl(url) {
				if (url == 'windows' || url == 'mac') {
					this.tankuang = true;
					return false;
				}

				this.dialogFormVisible = true;
			},
			registration() {
				var _this = this;
				_this.$refs['userData'].validate((valid) => {
					if (valid) {
						_this.$router.push({ path: "/register", query: { mobile: _this.userData.mobile } });
					} else {
						return false
					}
				});


			},
			//轮播图
			getBanner() {
				let _this = this;
				_this.$http.get(_this.$http.bannerfind, { params: { type: 2 } }).then((res) => {

					_this.bannerData = res.data.data;

				});
			},
			// 公告
			getgg() {
				let _this = this;
				_this.$http.get(_this.$http.getxtzx, { params: {} }).then((res) => {

					_this.ggData = res.data.data.res;

				});
			},



			// yincang
			btn_btn() {
				var _this = this;
				_this.btn_qiao = false;
			},
		},
		created: function () {
			var _this = this;
			_this.requestPublic();
			_this.getBanner();
			_this.getUserData();
			_this.getgg();
		},
		mounted: function () {
			var _this = this;
			_this.account = JSON.parse(sessionStorage.getItem('account'));
			new WOW().init();
		},
		components: {
			"Sowingmap": Sowingmap,
			"IndexCommodity": IndexCommodity,
			"RotationChart": RotationChart,
			// "Btclist":Btclist
		}
	}
</script>