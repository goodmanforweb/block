<style lang=less>
	@import './home.less';
</style>
<template lang="html">
	<div class="index_main">
		<div id="home">
			<!-- 签到按钮 -->
			<div class="signIn"  @click="Signin()" v-if="account && qd == '0'">
				<img src="../../assets/img/qiand_btn.png" alt="">
			</div>
			<!-- 
			 -->
			<div class="qiaod_btn" v-show="btn_qiao">
				<!-- <p>签到奖励&nbsp;&nbsp;{{yuanli}}&nbsp;原力</p> -->
				<p>{{$t("home.main[34]")}}&nbsp;&nbsp;{{yuanli}}&nbsp;{{$t("home.main[35]")}}</p>
				<div class="btn_1" @click="btn_btn">{{$t("home.main[36]")}}</div>
			</div>


			<!-- <section class="rotation">
				<table></table> -->
				<!-- <div class="banner"> -->
					<!-- <div class="bannercenter"> -->
						<!-- <div class="text"> -->
							<!-- <p class="p_1"><span>G</span>lobal<span class="s_l">C</span>reator<span class="s_l">C</span>oin</p> -->
							<!-- <p class="p_1"><span>Zeus</span></p>
							<p class="p_2">{{$t("zeusHome.zeusMain[0]")}}</p>
							<p class="p_3">Zeus  —— Perpetual contract model leader</p>
							<div><a href="javascript:;" @click="heyue">{{$t("zeusHome.zeusMain[1]")}}</a></div>
						</div> -->
						<!-- <div class="img"> -->
							<!-- <div class="div div_1">
								<span></span>
								<p class="p_1">{{$t("zeusHome.zeusMain[2]")}}</p>
								<p class="p_2">Perpetual contract</p>
							</div> -->
							<!-- <div class="div div_2">
								<span></span>
								<p class="p_1">{{$t("zeusHome.zeusMain[3]")}}</p>
								<p class="p_2">Legal currency transaction</p>
							</div> -->
							<!-- <div class="div div_3">
								<span></span>
								<p class="p_1">{{$t("zeusHome.zeusMain[4]")}}</p>
								<p class="p_2">Daily brushing</p>
							</div> -->
						<!-- </div> -->
					<!-- </div> -->
				<!-- </div> -->
			<!-- </section> -->

			
			<!-- 宙斯项目轮播 -->
			<div class="zeus-swiper">
				<div class="zeus-container" style="overflow: hidden;">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(item,i) in bannerData" :key="i">
							<img class="img" :src="$http.bases + item.path" alt="" style="width: 100%;">
						</div>
					</div>
				</div>
			</div>


			<!--交易挖矿平台-->
			<section class="bannerCenter">
				<div class="bannerheader">
					<IndexCommodity></IndexCommodity>
				</div>
			</section>
			<div class="middle">
				<!-- <div class="bg">
					<div class="top">
						<table></table>
						<div>
							<p class="p_1">{{$t("zeusHome.zeusMain[5]")}}</p>
							<p class="p_2"></p>
							<p class="p_3">
									{{$t("zeusHome.zeusMain[6]")}}
							</p>
						</div>
					</div>
					<div class="bottom">
						<div class="item">
							<div class="itemImg">
								<img src="../../assets/image/index/i1.png" alt="">
							</div>
							<h1>{{$t("zeusHome.zeusMain[7]")}}</h1>
							<p>{{$t("zeusHome.zeusMain[8]")}}</p>
						</div>
						<div class="item">
							<div class="itemImg">
								<img src="../../assets/image/index/i2.png" alt="">
							</div>
							<h1>{{$t("zeusHome.zeusMain[9]")}}</h1>
							<p>{{$t("zeusHome.zeusMain[10]")}}</p>
						</div>
						<div class="item">
							<div class="itemImg">
								<img src="../../assets/image/index/i3.png" alt="">
							</div>
							<h1>{{$t("zeusHome.zeusMain[11]")}}</h1>
							<p>{{$t("zeusHome.zeusMain[12]")}}</p>
						</div>
						<div class="item">
							<div class="itemImg">
								<img src="../../assets/image/index/i4.png" alt="">
							</div>
							<h1>{{$t("zeusHome.zeusMain[13]")}}</h1>
							<p>{{$t("zeusHome.zeusMain[14]")}}</p>
						</div>
					</div>
				</div> -->


				<!-- 宙斯项目 -->
				<div class="middle-title">
					<p class="title">{{$t("zeusHome.zeusUpdateHome[0]")}}</p>
					<span class="line"></span>
					<p class="desc">{{$t("zeusHome.zeusUpdateHome[1]")}}</p>
				</div>
				<ul class="middle-item">
					<li class="middle-list">
						<img src="../../assets/img/item_1.png">
						<p class="list-name">{{$t("zeusHome.zeusUpdateHome[2]")}}</p>
						<p class="list-desc">{{$t("zeusHome.zeusUpdateHome[3]")}}</p>
					</li>
					<li class="middle-list">
						<img src="../../assets/img/item_2.png">
						<p class="list-name">{{$t("zeusHome.zeusUpdateHome[4]")}}</p>
						<p class="list-desc">{{$t("zeusHome.zeusUpdateHome[5]")}}</p>
					</li>
					<li class="middle-list">
						<img src="../../assets/img/item_3.png">
						<p class="list-name">{{$t("zeusHome.zeusUpdateHome[6]")}}</p>
						<p class="list-desc">{{$t("zeusHome.zeusUpdateHome[7]")}}</p>
					</li>
					<li class="middle-list">
						<img src="../../assets/img/item_4.png">
						<p class="list-name">{{$t("zeusHome.zeusUpdateHome[8]")}}</p>
						<p class="list-desc">{{$t("zeusHome.zeusUpdateHome[9]")}}</p>
					</li>
				</ul>
			</div>

			<!--首页下载-->
			<section class="sowingmap">
				<Sowingmap></Sowingmap>
			</section>
			<!-- <el-dialog :title="$t('home.main[13]')" width="420px" :visible.sync="dialogFormVisible">
			<img src="../../assets/image/index/upload.png" alt="" />
			<div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false"  type="primary">{{$t("zeusHome.main[14]")}}zheshishenme</el-button>
			</div>
			</el-dialog> -->

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
							}
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
				let _this = this
				var type = this.$cookies.get('language') === 'Chinese' ? 2 : 3
				_this.$http.get(_this.$http.bannerfind, { params: { type } }).then((res) => {
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
			// 轮播图
			new Swiper ('.zeus-container', {
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        loop: true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
        onSlideChangeEnd: function(swiper){
        　　　swiper.update(); 
        　　　swiper.startAutoplay();
        　　  swiper.reLoop(); 
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}
    	})    
		},
		components: {
			"Sowingmap": Sowingmap,
			"IndexCommodity": IndexCommodity,
			"RotationChart": RotationChart,
			// "Btclist":Btclist
		}
	}
</script>