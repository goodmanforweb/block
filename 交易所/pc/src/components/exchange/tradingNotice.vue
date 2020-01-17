<style lang=less>
	@import '../../assets/public.less';
	@import './exchange.less';
</style>
<template>
	<div class="tradingNotice">
		<h2>{{$t('tradingNotice.main[0]')}}</h2>
		<ul class="announcementList" v-if="annListData.length">
			<li class="list" v-for="(v,item) in annListData" @click="goUrl(v.id)" :key="item">
				<p class="title" :title="v.title">{{v.title}}</p>
				<span class="time">{{ $public.timestampToTime( v.create_time )}}</span>
			</li>
		</ul>
		<ul class="announcementList" v-else>
			<p style="text-align: center; padding-top: 50px; color: #999; font-size: 12px;">{{$t('tradingNotice.main[1]')}}</p>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				annListData: []
			}
		},
		methods: {
			goUrl(id) {
				this.$router.push({
					path: '/zixunDetails',
					query: {	
						article_id: id
					}
				})
			},
			getDataList(){
				var _this = this;
				this.$http.post(this.$http.zixunList, {
					p:1,
					size:10
				}).then(function(response) {
				if(response.data.status == "200") {
					_this.annListData = response.data.data.res;
				}else{
					_this.annListData = [];
				}
			}).catch(function(error) {});
				
				
			}
		},
		created(){
			this.getDataList();
		}
	};
</script>