<style lang=less>
	@import '../../assets/public.less';
	@import './noticeList.less';
	@import './noticeDetails.less';
</style>
<template lang="html">
	<div class="notice_wrapper xt_consult">
		<div class="zx_banner" :class="{'zx_banner-cn':$cookies.get('language')=='Chinese', 'zx_banner-en':$cookies.get('language')!='Chinese'}">
		</div>
		<div  class="notice_list_wrapper">
			<!-- 侧边导航 -->
			<div class='notice_list_side'>
				<el-radio-group v-model="noticeType" @change='changeData(noticeType)' text-color='#fff' fill='#7C9BE6'		>
					<!-- 行情资讯 -->
					<el-radio-button  :label="$t('zixunList.main[7]')" ></el-radio-button>
					<!-- 交易指南 -->
					<el-radio-button :label="$t('zixunList.main[8]')"></el-radio-button>
					<el-radio-button :label="$t('zixunList.main[11]')"></el-radio-button>
				</el-radio-group>	    
			</div>
			<!-- 右侧主内容 -->
			<div class='notice_list_content'>
				<!-- data列表 -->
				<ul class='nlc_ul' v-if="noticeType==$t('zixunList.main[7]')">
					<li class="nlc_ul_li" v-for='(i, idx) in newsData' :key='i.id' @click='goDetail(i.id, 1)'>
						<!-- if防止地址未返回时提示alt信息 -->
						<img v-if='i.pic_addr'  :src='i.pic_addr' :alt="$t('zixunList.main[9]')" ></img>
						<p >{{i.abstract}}</p>
					</li>
				</ul>
				<ul class='nlc_ul' v-else-if="noticeType==$t('zixunList.main[11]')">
					<li class="nlc_ul_li xtgg" v-for='i in newsData' :key='i.id'>
						<p >{{i.title}}</p>
						<a @click='goDetail(i.id, 3)'>{{$t('zixunList.main[10]')}}</a>
					</li>
				</ul>
				<ul class='nlc_ul' v-else>
					<li class="nlc_ul_li xtgg" v-for='i in newsData' :key='i.id'>
						<p >{{i.title}}</p>
						<a @click='goDetail(i.id, 2)'>{{$t('zixunList.main[10]')}}</a>
					</li>
				</ul>
				<el-pagination  background class="nlc_pagin" :currentPage="Number(pageNum)" layout="prev, pager, next" :total="parseInt(isPage.isCount)" :page-size='isPage.isSize' @current-change="pageChange"></el-pagination>
			</div>
			
		</div>
		</div>
		
	</div>
</template>
<script>
	export default {
		data() {
			return {
				noticeType:this.$t('zixunList.main[7]'),
				routerData: {}, // 上个界面router传递的name、id
				newsData: [], // 列表数据
				pageNum: 1, // 当前页数
				totalPage: null, // 总页数
				prevBool: false,
				nextBool: true,
				isPage:{
					isCount:'', //总数据
					p:1,  //当前页
					isSize:10 //每页多少条
				},
			}
		},
		methods: {
			add() {
				this.pageNum++
			},
			changeData (v) {
				var _this = this;
				//zixunList.main[7] 行情资讯
				if(v==this.$t('zixunList.main[7]')){
					_this.$router.push({name:'zixunList',query:{zxtype:1}})
					_this.requestPublic(this.$http.gethqzx, 1, 1)
					_this.pageNum = 1
				}else if(v==this.$t('zixunList.main[11]')){
					_this.$router.push({name:'zixunList',query:{zxtype:3}})
					_this.requestPublic(this.$http.getxtzx, 1, 3)
					_this.pageNum = 1
				}else{
					_this.$router.push({name:'zixunList',query:{zxtype:2}})
					_this.requestPublic(this.$http.getjyzn, 1, 2)
					_this.pageNum = 1
				}
				_this.pageNum= '1';
			},
			goDetail (id, t){
				var _this = this
				sessionStorage.setItem('pageNum', _this.pageNum)
				if (t==1 || t == 3){
					_this.$router.push({
						name: 'zixunDetails',
						query:{
							zxtype:t,
							id: id
						}
				})
				}else{
					_this.$router.push({
						name: 'ggDetails',
						query:{
							zxtype:t,
							id: id
						}
				})
				}
				

			},
			requestPublic: function(url, toNum, type) {
				var _this = this;
				_this.pageNum = toNum
				var sendData={}
				if( type == 1){
					sendData.p=toNum
					sendData.s=_this.isPage.isSize
				}else if(type ==2){
					sendData.p=toNum
					sendData.s=_this.isPage.isSize
				}else{
					sendData.p=toNum
					sendData.size=_this.isPage.isSize
				}

				_this.$http.post(url, sendData)
					.then((res) => {
						if( type ==2 ){
							_this.newsData = res.data.data.data
							_this.totalPage = Math.ceil(res.data.data.sum / res.data.data.nownums);
							_this.isPage.isCount = res.data.data.sum
						}else if(type ==1){
							_this.newsData = res.data.data.data
							_this.totalPage = Math.ceil(res.data.data.sum / res.data.data.nownums);
							_this.isPage.isCount = res.data.data.sum
						}else{
							_this.newsData = res.data.data.res
							// _this.totalPage = Math.ceil(res.data.data.sum / res.data.data.nownums);
							_this.isPage.isCount = res.data.data.count
						}
						
					});
			},
			pageChange: function(page) {
				var _this = this;
				_this.pageNum = page;
				//zixunList.main[7] 行情资讯
				if(_this.noticeType==_this.$t('zixunList.main[7]')){
					_this.requestPublic(_this.$http.gethqzx, page, 1)
				}else if(_this.noticeType==_this.$t('zixunList.main[11]')){
					_this.requestPublic(_this.$http.getxtzx, page, 3)
				}else{
					_this.requestPublic(_this.$http.getjyzn, page, 2)
				}
			},
			init: function() {
				var _this = this;
				// 保存页数回退时返回
				if(sessionStorage.getItem('pageNum')){
					_this.pageNum = sessionStorage.getItem('pageNum')
				}
				_this.routerData = _this.$route.query;
				if( _this.routerData.zxtype === '2' ){
					_this.requestPublic(this.$http.getjyzn, _this.pageNum, 2)
					//zixunList.main[8] 系统公告
					_this.noticeType = this.$t('zixunList.main[8]')
				}else if(_this.routerData.zxtype === '1' || !_this.routerData.zxtype){
					_this.requestPublic(this.$http.gethqzx, _this.pageNum, 1)
					_this.noticeType = this.$t('zixunList.main[7]')
				}else{
					_this.requestPublic(this.$http.getxtzx, _this.pageNum, 3)
					_this.noticeType = this.$t('zixunList.main[11]')				}
			}
			
		},
		computed: {
			iszxType(){
				return this.routerData.zxtype
			}
		},
		created: function() {
			var _this = this;
			_this.init(_this.$http.gethqzx);
			_this.$public.scrollTop();
			_this.$http.post(_this.$http.huoqugg, {params:{}}).then(function(response) {
			})
		},
		watch:{
		
		}

	}
</script>