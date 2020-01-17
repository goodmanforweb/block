<style lang=less>
	@import '../../assets/public.less';
	@import './noticeList.less';
	@import './noticeDetails.less';
</style>
<template lang="html">
	<div class="notice_details_wrapper">
		<!--<HeaDer></HeaDer>-->
		<div class="details_container">
			<!-- 系统公告标题 -->
			<h1 v-if='type == 2 || type==3' class="content_title">
				{{data.title}}
			</h1>
			<!-- 行情标题 -->
			<h1 v-else class="content_title">
				{{data.bm_title}}
			</h1>
			<!-- 公告时间 -->
			<h4 v-if='type == 2 || type==3' class="content_time">{{Time}}</h4>
			<!-- 标题时间 -->
			<h4 v-else class="content_time">{{data.issue_time}}</h4>
			<div class='content_cutoff'></div>
			<div class="content_html" v-html='Content'></div>
			<div></div>
		</div>
		<!--<FooTer></FooTer>-->
	</div>
</template>
<script>
//	import Header from "../../header/heaer.vue";
//	import Footer from "../../footer/footer.vue";
	export default {
		data() {
			return {
				data: {},
				content: '',
				time: '',
				type:'',
			}
		},
		methods: {
			requestPublic: function() {
					var _this = this
					var url =''
					if(_this.$route.query.zxtype == 1){
						url = _this.$http.gethqzx
					}else if(_this.$route.query.zxtype == 2){
						url = _this.$http.getxtzx
					}else{
						// 公告
						url = _this.$http.zixun_detail
					}
					_this.$http.get(url, {
							params: {
								"id": _this.$route.query.id
							}
						})
						.then((res) => {
							console.log(res);
							if(_this.$route.query.zxtype == 3){
							_this.data = res.data.data
							_this.content = res.data.data.content
							_this.time = res.data.data.create_time
							_this.type = 3
							}else{
							_this.data = res.data.data.data[0];
							_this.content = res.data.data.data[0].content
							_this.time = res.data.data.data[0].create_time
							_this.type = _this.$route.query.zxtype
							}

						});
			},
			
				},

		created: function() {
			var _this = this;
			_this.requestPublic();
			_this.$public.scrollTop();
		},

		computed: {
			Time(){
				return this.$public.timestampToTime(this.time)
			},
			Content(){
				//html 反转义
				return this.content
			}
		},
	
	}
</script>