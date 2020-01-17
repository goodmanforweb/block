<style lang=less>
	@import '../../assets/public.less';
	@import './noticeList.less';
	@import './noticeDetails.less';
</style>
<template lang="html">
	<div class="notice_wrapper notice_details_wrapper">
		<div class="zx_banner">
			<div class="notice-banner-inner wcr">
				<h3 class="f40 mb16">{{$t('noticebanner[0]')}}</h3>
				<p>{{$t('noticebanner[1]')}}</p>
			</div>
		</div>

		<div class="notice_list_wrapper details_container" v-loading="loader">
			<!-- 系统公告标题 -->
			<h1 class="content_title">
				{{data.title}}
			</h1>
			<!-- 标题时间 -->
			<h4 class="content_time">{{data.create_time}}</h4>
			<div class='content_cutoff'></div>
			<div class="content_html" v-html='data.content'></div>
			<div></div>
		</div>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				data: {},
				loader: false
			}
		},
		methods: {
			getDetail() {
				this.loader = true
				this.$http.get(this.$http.zixunDetails, {
					params: {
						id: this.$route.query.id
					}
				})
				.then((res) => {
					if (res.data.status == 200) {
						const data = res.data.data
						data.create_time = this.$public.timestampToTime1(data.create_time);
						this.data = data;
					}
				}).finally(() => {
					this.loader = false
				})
			},

		},

		created() {
			this.getDetail();
		},

	}
</script>