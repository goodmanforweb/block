<style lang=less>
	@import '../../assets/public.less';
	@import './chongBit.less';
</style>
<template>
	<div class="chong_bit_wrapper">
		<HeaDer></HeaDer>
		<div class="chong_bit_container">
			<el-card class="box-card">
				<div class="title">账户充值>充币</div>
			</el-card>
			<el-card class="box-card chong_top">
				<div class="right_title">
					<!--<span>账户总资产：{{ requestData.wallone }} USDT</span>-->
					<span>{{pname}} 充值</span>
					<div class="title_link">
						<!--<router-link :to="{path:'/moneyAddre',query: {url:'/chongBit',name: '账户充值'}}">提币地址管理</router-link>-->
					</div>
				</div>
				<el-card class="box-card chong_bit_block">
					<p class="public_font">充币地址</p>
					<div class="address">
						<input class="left" :value="requestData.url" id="addInput" placeholder="数据请求中..."></input>
						<p class="right">
							<span @click="copy('addInput')">复制</span>
							<el-button type="text" @click="open5">二维码</el-button>
						</p>
					</div>
					<p class="public_font seeRecord">查看
						<!--<router-link to="/moneyRecord">充币记录</router-link>跟踪状态</p>-->
						<!--<p>充币记录 跟踪状态</p>-->
						<a @click="seeRecord" style="cursor: pointer;">充币记录</a>跟踪状态</p>
						
					<p class="public_font">温馨提示:</p>
					<ul class="list">
						<li>请勿向上述地址充值任何非{{pname}}资产，否则资产将不可找回!</li>
						<li>您充值至上述地址后，需要整个网络节点的确认，1次网络确认后到账，6次网络确认后可提币。</li>
						<li>您的充值地址不会经常改变，可以重复充值,如有更改，我们会尽量通过网站公告或邮件通知您。</li>
						<li>请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</li>
					</ul>
				</el-card>
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
				requestData: {},
				pid:'',  //页面传值
				pname:''
			}
		},
		methods: {
			seeRecord(){
				var _this = this;
				_this.$router.push({ path: '/moneyRecord', query:{pid:_this.pid}});
			},
			requestPublic: function() { // 数据请求
				var _this = this;
				var mobile = sessionStorage.getItem('mobile');
				_this.$http.get(_this.$http.goPay, {
						params: {
							mobile: mobile,
							pid : _this.pid
//							code:code							
						}
					})
					.then((res) => {
						_this.requestData = res.data.data;
					});
			},
			copy: function(para) { // 复制函数
				var _this = this;
				var ele = document.getElementById(para);
				ele.select();
				document.execCommand("Copy");
				_this.$public.msg('复制成功', 'success', _this);
			},
			addFocus: function(para) {
				var _this = this;
				var ele = document.getElementById(para);
				ele.setAttribute('disabled', 'disabled');
			},
			addOut: function(para) {
				var _this = this;
				var ele = document.getElementById(para);
				ele.removeAttribute('disabled');
			},
			open5: function() { // 提示二维码函数
				var urls = this.$http.bases;
				this.$alert('<div class="cbCodeDiv"><img class="codeImg" src="' + urls + this.requestData.qrc + '" alt="" /></div>', '二维码', {
					dangerouslyUseHTMLString: true,
					callback: action => {}
				});

			}
		},
		created: function() {
			var _this = this;
			_this.pid = _this.$route.query.pid;
			_this.pname = _this.$route.query.pname;
			_this.requestPublic();
			
		},
		// components: {
		// 	"HeaDer": Header,
		// 	"FooTer": Footer,
		// }
	}
</script>