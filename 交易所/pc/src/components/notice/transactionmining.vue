<style lang=less>
	@import '../../assets/public.less';
	@import './agreement.less';
	.el-card__body{
		padding: 20px 40px;
	}
	.transactionmining{
		.transactionmining_header{
			display: flex;
			justify-content: center;
			.transactionmining_list{
				width: 350px;
				text-align: center;
				p{
					font-size: @hFontSize;
					color: @Bluecolor;
					line-height: 46px;
				}
				span{
					line-height: 40px;
				}
				&:nth-child(1){
					border-right: solid 1px #A8ABBE;
				}
			}
		}
		.transactionmining_box{
			margin-top: 50px;
		}
	}
</style>

<template lang="html">
	<div class="agreement_text_wrapper">
		<div class="agreement_text_container">
			<div class="img" v-if="$i18n.locale == 'Chinese'">
				<img src="../../assets/image/tbaddch.jpg"/>
			</div>
			<div class="img" v-else >
				<img src="../../assets/image/tbadden.jpg"/>
			</div>
			<el-card class="box-card agreement_text_content">
				<div class="transactionmining">
					<ul class="transactionmining_header">
						<li class="transactionmining_list">
							<p>{{trans_wk.usable}}</p>
							<span>{{$t("transactionmining.header[0]")}}</span>
						</li>
						<li class="transactionmining_list">
							<p>{{trans_wk.frost}}</p>
							<span>{{$t("transactionmining.header[1]")}}</span>
						</li>
					</ul>
					<div class="transactionmining_box">
						<div v-html="trans_wk.note"></div>
					</div>
				</div>
			</el-card>
		</div>
		
	</div>
</template>
<script>
export default {
	data() {
		return {
			trans_wk:{},
		}
	},
	methods: {
			// 协议数据请求
			requestPublic: function() {
				var _this = this;
				_this.$http.post(_this.$http.trans_wk, {}).then((res) => {
					_this.trans_wk = res.data.data;
				});
			}
		},
		created: function() {
			var _this = this;
			_this.requestPublic();
			window.scrollTo(0,0);  //回到顶部
		},
		watch: {}
		
	}
	</script>
	