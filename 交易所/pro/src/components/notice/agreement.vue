<style lang=less>
	@import '../../assets/public.less';
	@import './agreement.less';
	.el-card__body{
		padding: 20px 40px;
	}
</style>

<template lang="html">
	<div class="agreement_text_wrapper">		
		<div class="agreement_text_container">
			<el-header class="top">
				<el-card class="box-card">
					<div class="title">{{ routerData.name }}</div>
				</el-card>
			</el-header>
				<div class="img" v-if="$i18n.locale == 'Chinese'">
					<img src="../../assets/image/yhxych.jpg" v-show="routerData.type=='reg_agree'"/><!-- 用户协议 -->
					<img src="../../assets/image/clausech.jpg" v-show="routerData.type=='trans_agree'"/><!-- 隐私条款 -->
					<!-- <img src="../../assets/image/jygz.jpg" v-show="routerData.type=='jygz'"/> --><!-- 交易规则 -->
					<img src="../../assets/image/aboutusch.jpg" v-show="routerData.type=='faq'"/><!-- 关于我们 -->
					<img src="../../assets/image/aboutusch.jpg" v-show="routerData.type=='fxq'"/><!-- 关于反洗钱 -->
				</div>
				<div v-else>
					<img src="../../assets/image/yhxyen.jpg" v-show="routerData.type=='reg_agree'"/><!-- 用户协议 -->
					<img src="../../assets/image/clauseen.jpg" v-show="routerData.type=='trans_agree'"/><!-- 隐私条款 -->
					<!-- <img src="../../assets/image/jygz.jpg" v-show="routerData.type=='jygz'"/> --><!-- 交易规则 -->
					<img src="../../assets/image/aboutusen.jpg" v-show="routerData.type=='faq'"/><!-- 关于我们 -->
					<img src="../../assets/image/aboutusen.jpg" v-show="routerData.type=='fxq'"/><!-- 关于反洗钱 -->
				</div>
			<el-card class="box-card agreement_text_content">
				<div v-show="!isshow" v-html="requestData"></div>
				
				<div class="fxq" v-show="isshow == 'fxq'">
					<h2>《 {{$t('agreement.main[0]')}} 》</h2>

					<!-- 第一条：制定的目的和依据 鉴于洗钱活动将严重危害数字资产交易的发展，助长和滋生腐败、败坏社会风气，损害用户的正当权益，破坏数字资产交易平台稳健经营的基础，加大数字资产交易平台的法律和运营风险，为预防洗钱和恐怖融资活动，全面履行反洗钱和反恐融资法律的相关规定，根据《反洗钱规则》、《用户协议》、《大额交易管理办法》等公司规定，制定本指引。 -->{{$t('agreement.main[1]')}} <br />
					
					<!-- 第二条：适用范围 本指引适用于在KEIEX平台交易的所有用户。用户应当在遵循其所在地国家或地区反洗钱和反恐融资方面的法律规定，在用户所在地区法律规定的范围内，执行本指引之规定。用户所在国家或者地区有更严格要求的，遵守其规定。 -->
					{{$t('agreement.main[2]')}}<br />
					
					<!-- 第三条：反洗钱和反恐怖融资 是指为了防范不法分子通过KEIEX平台进行交易从而掩饰、隐瞒毒品犯罪、黑社会性质的组织犯罪、恐怖活动犯罪、走私犯罪、贪污贿赂犯罪、金融诈骗犯罪、破坏金融管理秩序犯罪等违法所得及其收益的来源和性质的洗钱活动，依照相关法律和KEIEX反洗钱相关规定采取相关措施的行为。 -->
					{{$t('agreement.main[3]')}}<br />
					
					<!-- 第四条：KEIEX反洗钱相关规定（包括反恐怖融资，下同）相关规则包括《反洗钱规则》、《用户协议》中反洗钱的部分、《大额交易管理办法》与本指引。若本指引中规定的内容与其它规则相冲突，则本指引优先适用。 -->{{$t('agreement.main[4]')}}<br />
					
					<!-- 第五条：KEIEX平台反洗钱按照以下原则开展客户风险监控工作： -->{{$t('agreement.main[5]')}}<br />
					
					<!-- 全面性原则 -->{{$t('agreement.main[6]')}}<br />
					    <!-- KEIEX平台会综合考虑客户可能涉嫌洗钱的各类风险因素，采取合理方式对所有客户进行风险监控。 -->{{$t('agreement.main[7]')}}<br />
					<!-- 审慎性原则 -->{{$t('agreement.main[8]')}}<br />
					    <!-- KEIEX平台会在充分了解客户的基础上，提高对客户身份的识别能力，审慎进行客户风险监控。 -->{{$t('agreement.main[9]')}}<br />
					<!-- 持续性原则 -->{{$t('agreement.main[10]')}}<br />
					    <!-- KEIEX平台会对客户风险进行持续关注，根据实际情况适做出应对。 -->{{$t('agreement.main[11]')}}<br />
					<!-- 保密性原则 -->{{$t('agreement.main[12]')}}<br />
					    <!-- KEIEX平台所掌握的客户身份信息、交易信息和风险等级信息等予以严格保密，非依法律规定和监管要求，不会向任何单位和个人提供。 -->{{$t('agreement.main[13]')}}<br />
					<!-- 分级管理原则 -->{{$t('agreement.main[14]')}}<br />
					    <!-- KEIEX平台根据客户的风险等级，定期审核所保存的客户基本信息，对风险等级较高客户的审核应当严于对风险等级较低客户的审核。 -->{{$t('agreement.main[15]')}}<br />
					<!-- 第六条：个人用户文件之提交AND平台个人用户应当依据火币反洗钱相关规定提交以下信息和资料： -->{{$t('agreement.main[16]')}}<br />
					
					<!-- 个人姓名； -->{{$t('agreement.main[17]')}}<br />
					<!-- 身份证或护照复印件； -->{{$t('agreement.main[18]')}}<br />
					<!-- 其它应KEIEX要求应当提供之信息或文件。 -->{{$t('agreement.main[19]')}}<br />
					<!-- 第七条：机构用户文件之提交KEIEX机构用户应当依据KEIEX反洗钱相关规定提交以下信息和资料： -->{{$t('agreement.main[20]')}}<br />
					
					<!-- 公司名称； -->{{$t('agreement.main[21]')}}<br />
					<!-- 公司注册办公地址； -->{{$t('agreement.main[22]')}}<br />
					<!-- 公司法定代表人； -->{{$t('agreement.main[23]')}}<br />
					<!-- 公司法定代表人住所地； -->{{$t('agreement.main[24]')}}<br />
					<!-- 公司营业执照； -->{{$t('agreement.main[25]')}}<br />
					<!-- 公司法定代表人身份证或护照复印件； -->{{$t('agreement.main[26]')}}<br />
					<!-- 其它应KEIEX要求应当提供之信息或文件。 -->{{$t('agreement.main[27]')}}<br />
					<!-- 第八条：用户文件之审查 KEIEX平台会依据反洗钱相关规定中的客户识别制度对客户所提交的相关信息进行核实和记录，若KEIEX平台对于客户所提交的资料有疑问时，有权向相关主管机构或部门进行核实。 -->{{$t('agreement.main[28]')}}<br />
					
					<!-- 第九条：低风险用户之监测KEIEX平台会根据KEIEX反洗钱规定的具体要求对低风险用户进行检测，KEIEX平台保留对低风险用户进行调级的权利。 -->{{$t('agreement.main[29]')}}<br />
					
					<!-- 第十条：高风险用户之监测KEIEX平台对于高风险类别的客户，会于每半年进行一次审核，更新客户身份基本信息并了解其资金来源、资金用途、经济状况或者经营状况等信息。 -->{{$t('agreement.main[30]')}}<br />
					
					<!-- 第十一条：用户文件之保存 KEIEX平台会依法采取必要措施将客户身份资料和交易信息保存一定期限。参照国际通行规则，用户身份资料自业务关系结束后，客户交易信息自交易结束后，应至少保存五年。 -->{{$t('agreement.main[31]')}}<br />
					
					<!-- 第十二条： KEIEX用户应当注意以下事项： -->{{$t('agreement.main[32]')}}<br />
					
					<!-- 禁止将用户本人的账号出借给他人使用； -->{{$t('agreement.main[33]')}}<br />
					<!-- 禁止出租、出借用户本人身份证件； -->{{$t('agreement.main[34]')}}<br />
					<!-- 禁止出租、出借、透露用户本人的账户、银行卡、存折、密码等重要个人财产信息； -->{{$t('agreement.main[35]')}}<br />
					<!-- 用户应当主动配合KEIEX平台进行客户身份识别； -->{{$t('agreement.main[36]')}}<br />
					<!-- 在KEIEX平台进行交易时，选择并使用安全可靠的第三方金融机构进行支付活动。 -->{{$t('agreement.main[37]')}}<br />
					<!-- 第十三条：若KEIEX平台用户在平台交易时发现任何账户可能从事洗钱或恐怖融资活动，用户可以向KEIEX平台进行报告。 -->{{$t('agreement.main[38]')}}<br />
					
					<!-- 第十四条：指引之解释 本指引由KEIEX平台进行解释。 -->{{$t('agreement.main[39]')}}<br />
					
					<!-- 第十五条：生效期 本指引自发布之日起实施。 -->{{$t('agreement.main[40]')}}<br />

				</div>
				<div class="jygz" v-show="isshow == 'jygz'">
					<h2>{{$t('agreement.main[41]')}}</h2>
				
					<!-- 买方用户须知： -->{{$t('agreement.main[42]')}} <br />
					
					<!-- 1、请在“广告”规定的时间内完成付款，并点击确认付款按钮。买方主动取消订单或者订单超时取消，系统将记录买方取消订单一次。 -->{{$t('agreement.main[43]')}}<br />
					
					<!-- 2、买方当日累计3笔取消的，会限制当日买入功能。 -->{{$t('agreement.main[44]')}}<br />
					
					<!-- 3、发布求购广告，当天累计取消订单达到3笔的，系统会限制您当天的买入功能。 -->{{$t('agreement.main[45]')}}<br />
					
					<!-- 4、因为卖方未提供有效支付方式，导致系统记录买方取消订单，买方已因此被限制当天买入功能的，可以联系平台官方，要求解除限制。 -->{{$t('agreement.main[46]')}}<br />
					
					<!-- 5、请勿在未完成付款或不付款的情况下点击“我已付款”，该行为是属于恶意行为。当此类订单发生申诉，卖方可拒绝成交，情节严重的，系统将冻结买方账户。 -->{{$t('agreement.main[47]')}}<br />
					
					<!-- 6、您在10分钟内未付款且不回应卖方的，当此订单出现申诉时，卖方可拒绝成交。 -->{{$t('agreement.main[48]')}}<br />
					
					<!-- 7、请选择您本人的实名支付账户（如银行账户、支付宝账户、微信支付账户）来付款。如果您使用非实名账户或他人账户付款，当此订单出现申诉时，卖方可选择退款不成交。 -->{{$t('agreement.main[49]')}}<br />
					
					<!-- 8、为了保证交易的及时性，请选择实时到账的汇款方式，例如支付宝、微信支付、银行实时汇款等。为确保到款的及时性，节假日或工作日的17：00-9：00，超过5万以上的汇款请分批支付，请勿使用支付宝转银行卡、微信转银行卡方式支付。 -->{{$t('agreement.main[50]')}}<br />
					
					<!-- 9、买方点击“我已付款”两个小时后，卖方未收到付款，订单出现申诉时，卖方可以拒绝成交。 -->{{$t('agreement.main[51]')}}<br />
					
					<!-- 10、请核对卖方最新收款方式，确认收款账户准确性，如买方未按照订单生成的约定账户汇款，将自行承担资金安全风险。 -->{{$t('agreement.main[52]')}}<br />
					
					<!-- 11、进行中的订单对应的数字货币资产会锁定在平台；如您转账完成，并点击“我已付款”5分钟后，卖方未放币，则您可选择申诉，如您完全符合以上操作，我们会判定资产属于您。 -->{{$t('agreement.main[53]')}}<br />
					
					<!-- 12、如遇到付款账号实名和平台认证实名不一致，卖方有权选择以下操作： -->{{$t('agreement.main[54]')}}<br />
					
					<!-- 要求买方和付款方手持身份证或护照等，进行视频KYC，证明资金来源合法； -->{{$t('agreement.main[55]')}}<br />
					<!-- 原路退款不成交； -->{{$t('agreement.main[56]')}}<br />
					<!-- 扣押数字货币72小时不放行。72小时后，由卖方决定放行或者原路退款。 -->{{$t('agreement.main[57]')}}<br />
					
					<!-- 该“付款参考号”仅用于标识该笔汇款是对应于该笔订单，买方的汇款按约定到账的，视为已遵守交易规则。 -->{{$t('agreement.main[58]')}}<br />
					
					<!-- 请勿填写类似BTC、比特币、USDT等关键字，否则卖方可要求退款不成交。 -->{{$t('agreement.main[59]')}}<br />
					
					<!-- 卖方用户须知： -->{{$t('agreement.main[60]')}}<br />
					
					<!-- 1、当您在卖出时，请认真确认您所卖出的价格，因广告价格问题产生的申诉，如买方无违规操作，我们会判定资产属于买方。 -->{{$t('agreement.main[61]')}}<br />
					
					<!-- 2、买方点击“我已付款”5分钟后未收到账，卖方可选择申诉；如买方不遵循先付款后点击付款、付款不能在两小时以内到达账户或付款后订单取消，卖方可选择申诉，并退款不成交。 -->{{$t('agreement.main[62]')}}<br />
					
					<!-- 3、收款时请仔细核实，买方的付款账户实名信息与平台实名信息是否一致。如不一致，请注意收款风险，当此类订单发生申诉时，卖方可选择退款拒绝成交。因用户接受非实名付款，导致他人的支付账户被冻结的，平台会调查问题资金来源，并且有权直接冻结该用户平台账户、取消商家认证资格。 -->{{$t('agreement.main[63]')}}<br />
					
					<!-- 4、请在登录网银查看收款无误后，第一时间放行。买方无任何违规，买方标记订单状态为“已付款”后的20分钟以内，卖方无法完成放行的，当此订单发生申诉时，买方有权要求退款不成交，如卖方拒绝协调，我们会直接放行给买方并冻结卖方账户。 -->{{$t('agreement.main[64]')}}<br />
					
					<!-- 5、为了确保交易的及时性，请发布广告时务必确保能在线并及时处理订单；如您无法保证及时处理交易订单，请及时下架，以免造成不必要的申诉纠纷。 -->{{$t('agreement.main[65]')}}<br />
					
					<!-- 6、如遇到付款账号实名和平台认证实名不一致，卖方有权选择以下操作： -->{{$t('agreement.main[66]')}}<br />
					
					<!-- 要求买方和付款方手持身份证或护照等，进行视频KYC，证明资金来源合法； -->{{$t('agreement.main[67]')}}<br />
					<!-- 原路退款不成交； -->{{$t('agreement.main[68]')}}<br />
					<!-- 扣押数字货币72小时不放行。72小时后，由卖方决定放行或者原路退款。 -->{{$t('agreement.main[69]')}}<br />
					<!-- 注：对于交易纠纷，平台有最终裁判权。对于恶意冻结订单、恶意付款、利用交易涉嫌诈骗等行为，平台可选择冻结账户，必要时协助司法机关进行处理。 -->{{$t('agreement.main[70]')}}<br />
					
					<!-- Maker（广告主）用户须知： -->{{$t('agreement.main[71]')}}<br />
					
					<!-- 1、如您不在设备旁或离线无法及时处理订单，请提前下架广告。此类广告如产生订单，属于正常订单，按正常交易流程处理。 -->{{$t('agreement.main[72]')}}<br />
					
					<!-- 2、发布求购广告时，当天累计取消订单达到3笔的，系统会限制您当天的买入功能。 -->{{$t('agreement.main[73]')}}<br />
					
					<!-- 3、发布求购广告时，未付款订单≥5个，求购广告自动在列表页隐藏；付款完成至2个订单则显示。 -->{{$t('agreement.main[74]')}}<br />
					
					<!-- 4、商家收款时，请仔细核实买方的付款账户实名信息与买方的平台实名信息是否一致。 -->{{$t('agreement.main[75]')}}<br />
					
					<!-- 因商家接受非实名付款，导致他人的支付账户被冻结的，平台会调查问题资金来源，并且有权直接冻结该商家平台账户、取消商家认证资格。 -->{{$t('agreement.main[76]')}}<br />
					
					<!-- 规则内容会根据运营情况实时优化，请大家及时关注内容更新。 -->{{$t('agreement.main[77]')}}
				</div>
			</el-card>
		</div>
		
	</div>
</template>
<script>
export default {
	data() {
		return {
			routerData:{},
			requestData:this.$t('agreement.main[78]')+'...',
			isshow:null
		}
	},
	methods: {
			// 协议数据请求
			requestPublic: function() {
				var _this = this;
				if(_this.routerData.type == 'fxq'){
					
					_this.isshow = 'fxq'
					return false;
				}else if(_this.routerData.type == 'jygz'){
					_this.isshow = 'jygz'
					return false;
				}
				_this.$http.get(_this.$http.agree, {params: {type: _this.routerData.type}})
				.then((res) => {
					_this.isshow = null;
					_this.requestData = res.data.data;
				});
			}
		},
		created: function() {
			var _this = this;
			_this.routerData = _this.$route.query;
			_this.requestPublic();
			window.scrollTo(0,0);  //回到顶部
		},
		watch: {
			'$route.query.type': function () {
				var _this = this;
				window.scrollTo(0,0);  //回到顶部
				_this.routerData = _this.$route.query;
				_this.requestPublic();
			}
		}
		
	}
	</script>
	