<style lang=less>
	@import '../../assets/public.less';
	@import './ziChan.less';
</style>
<template lang="html">
	<div class="zi_chan_wrapper">
		<div class="zi_chan_container">
			<header class="top">{{$t("ziChan.name")}}</header>
			<div class="zi_chan_content">
				<!-- 表格 -->
				<el-table :data="requestData" style="width: 100%;min-height: 300px;" :empty-text='$t("cbanner.main[9]")'>
					<el-table-column prop="pname" :label='$t("ziChan.list[0]")' width="250"><!-- 币种 -->
					</el-table-column>
					<el-table-column prop="usable" :label='$t("ziChan.list[1]")' width="250" align="center"><!-- 可用 -->
					</el-table-column>
					<el-table-column prop="frost" :label='$t("ziChan.list[2]")' width="320" align="center"><!-- 冻结 -->
					</el-table-column>
					<el-table-column :label='$t("ziChan.list[3]")' width="440" align="center"><!-- 操作 -->
						<template slot-scope="scope">
							<span v-if="scope.row.pname == 'USDT' ||scope.row.pname == 'BTC' || scope.row.pname == 'ETH' || scope.row.pname == 'GCT'" >
								<el-button @click="handleClick(scope.row,'/chongBit')" type="primary" plain size="small">{{$t("ziChan.canten[0]")}}</el-button>
								<el-button @click="handleClick(scope.row,'/tiBit')" type="primary" plain size="small">{{$t("ziChan.canten[1]")}}</el-button>
								<el-button @click="handleClick(scope.row,'/exchangeCoin')" type="" plain size="small">{{$t("ziChan.canten[4]")}}</el-button>
								<el-button @click="handleClick(scope.row,'/moneyRecord')" type="" plain size="small">{{$t("ziChan.canten[2]")}}</el-button>
							</span>
							<span v-else>
								<el-button @click="handleClick(scope.row,'/chongBit')" type="primary" plain size="small">{{$t("ziChan.canten[0]")}}</el-button>
								<el-button @click="handleClick(scope.row,'/tiBit')" type="primary" plain size="small">{{$t("ziChan.canten[1]")}}</el-button>
								<el-button @click="handleClick(scope.row,'/exchangeCoin')" type="" size="small" disabled>{{$t("ziChan.canten[4]")}}</el-button>
								<el-button @click="handleClick(scope.row,'/moneyRecord')" type="" plain size="small">{{$t("ziChan.canten[2]")}}</el-button>
							</span>
							
							
						</template>
					</el-table-column>
				</el-table>
				<div class="block button_pages" v-if="totalPage > 1">
					<i>{{$t("ziChan.page[0]")}} {{ pageNum }} {{$t("ziChan.page[1]")}}</i><!-- 第 {{ pageNum }} 页 -->
					<span @click="prevClick" v-if="prevBool">{{$t("ziChan.page[2]")}}</span><!-- 上一页 -->
					<span @click="nextClick" v-if="nextBool">{{$t("ziChan.page[3]")}}</span><!-- 下一页 -->
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				requestData: [], // 资产列表数据
				coinListData: [], // 可兑换币种
				prevBool: false,
				nextBool: true,
				pageNum: 1, // 当前页数
				totalPage: null, // 总页数
				userinfo:null,//个人信息
				// totalNumber: null, // 总条数
			}
		},
		methods: {
			// 上一页、下一页
			prevClick: function(page) {
				var _this = this;
				_this.pageNum--;
				if(_this.pageNum <= 1) {
					_this.prevBool = false;
					_this.nextBool = true;
					_this.requestPublic();
					return;
				} else {
					_this.nextBool = true;
					_this.requestPublic();
				}
			},
			nextClick: function(page) {
				var _this = this;
				_this.pageNum++;
				if(_this.pageNum >= _this.totalPage) {
					_this.requestPublic();
					_this.prevBool = true;
					_this.nextBool = false;
				} else {
					_this.prevBool = true;
					_this.requestPublic();
				}
			},
			// 点击交易事件
			handleClick: function(row,url) {
				// 本行信息
				var _this = this;
				if(url == '/moneyRecord'){
					//交易记录
					_this.$router.push({ path: url, query:{pid:row.pid}});
				}else{
					switch (url) {
						case "/tiBit":
							if(_this.userinfo.status != 3){
								_this.$confirm(_this.$t("security.option[3]"), _this.$t('security.option[4]'), {
									confirmButtonText: _this.$t('security.option[5]'),
									cancelButtonText: _this.$t('security.option[6]'),
									type: 'warning'
								}).then(() => {
									_this.$public.go('realname',10,_this);
								}).catch(() => {
									_this.$message({
										type: 'info',
										message:_this.$t('security.option[7]')
									});
								});
							}
							// else if(_this.userinfo.auth_status != "3"){
							// 	_this.$confirm(_this.$t("security.option[3]"), _this.$t('security.option[4]'), {
							// 		confirmButtonText: _this.$t('security.option[5]'),
							// 		cancelButtonText: _this.$t('security.option[6]'),
							// 		type: 'warning'
							// 	}).then(() => {
							// 		_this.$public.go('senior',10,_this);
									
							// 	}).catch(() => {
							// 		_this.$message({
							// 			type: 'info',
							// 			message:_this.$t('security.option[7]')
							// 		});
							// 	});
							// }
							else {
								_this.$router.push({ path: url, query:{pid:row.pid,pname:row.pname,mark:row.mark,usable:row.usable,frost:row.frost}});
							};
							break;
						default:
							_this.$router.push({ path: url, query:{pid:row.pid,pname:row.pname,mark:row.mark,usable:row.usable,frost:row.frost}});
							break;
					}			
				}	
			},
			// 资产列表数据请求
			requestPublic: function() {
				var _this = this;
				_this.$http.get(_this.$http.ziChan, {params: {p: _this.pageNum}}).then((res) => {
					if (res.data.status == '200'){
						for (var i = 0; i < res.data.data.asset.length; i++) {
							res.data.data.asset[i].coinList = false;
							for(var j = 0, length2 = _this.coinListData.length; j < length2; j++){
								if(_this.coinListData[j].pname == res.data.data.asset[i].pname){
									res.data.data.asset[i].coinList= true;
								};
							};
						};
						_this.requestData = res.data.data.asset;
					}
				});
			},
			exchangelist:function(){// 可兑换币种
				var _this = this;
				_this.$http.post(_this.$http.coinList, {}).then((res) => {
					if(res.data.status == 200 ){
						_this.coinListData = res.data.data;
						_this.requestPublic();
					}
				});
				_this.$http.post(_this.$http.user_info, {}).then((res) => {
					_this.userinfo = res.data.data;
				});
			}
		},
		created: function() {
			var _this = this;
			window.scrollTo(0, 0); //回到顶部
			_this.exchangelist();
		},
	}
</script>