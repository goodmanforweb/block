<style lang=less>
	@import '../../assets/public.less';
	@import './noticeList.less';
	@import './noticeDetails.less';
</style>
<template lang="html">
	<div class="notice_wrapper xt_consult">
		<div class="zx_banner">
			<div class="notice-banner-inner wcr">
				<h3 class="f40 mb16">{{$t('noticebanner[0]')}}</h3>
				<p>{{$t('noticebanner[1]')}}</p>
			</div>
		</div>
		<div  class="notice_list_wrapper">
			<!-- 右侧主内容 -->
			<div class='notice_list_content'>
				<!-- data列表 -->
				<ul class='nlc_ul'>
					<li class="nlc_ul_li flex sb vc bcr" v-for='(i, idx) in newsData' :key='i.id' @click='goDetail(i.id, 1)'>
						<h4>{{i.title}}</h4>
						<span class="f12">{{i.create_time}}</span>
					</li>
				</ul>
				<el-pagination  background class="nlc_pagin" :currentPage="pageNum" layout="prev, pager, next" :total="total" :page-size='20' @current-change="pageChange"></el-pagination>
			</div>
			
		</div>
		</div>
		
	</div>
</template>
<script>
	export default {
		data() {
			return {
				newsData: [],
				total:1,
				pageNum:1
			}
		},
		created() {
			this.getLists();
		},
		methods: {
			goDetail(id) {
				if(!id)return;
				this.$router.push({name:'zixunDetails',query: {id}})
			},
			pageChange(v) {
				this.pageChange = v;
				this.getLists();
			},
			getLists() {
				this.$http.get(this.$http.zixunList, {params: {p: this.pageNum, size: 20}}).then(res => {
					if(res.data.status == 200) {
						this.total = Number(res.data.data.count || 0);
						this.newsData = (res.data.data.res || []).map(el => {
							el.create_time = this.$public.timestampToTime1(el.create_time);
							return el;
						});
					}
				})
			}
		},
	}
</script>