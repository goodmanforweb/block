<style lang=less>
	@import '../../assets/public.less';
	@import './ziChan.less';
</style>
<template lang="html">
	<div class="zi_chan_wrapper">
		<div class="zi_chan_container">
			<!-- <header class="top">{{$t("ziChan.name")}}</header> -->
		<el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark">{{$t('zeusHome.zeusUpdateHome[14]')}}</div></el-col>
</el-row>
			<div class="zi_chan_content">
				  <div class="assetList" v-for="(item,index) in requestData" :key="index" v-if="item.mark == 'usdt_usdt'">
					  <img src="../../assets/img/usdt-zc.png" class="coinLogo" alt="">
					  <div class="item name">USDT</div>
					  <div class="item money">
						 {{$t("transfer.verification[3]")}}
						  <br>
						  {{item.usable}}
					  </div>
					  <div class="item money">
					
						   {{$t("exchangeCoin.main3[2]")}}<br>
						  {{item.frost}}
					  </div>
					  <div class="item actionBar">
						  <div class="btn chongbi" @click="handleClick(item,'/chongBit')" ><div class="cover"> {{$t("chongBit.main[1]")}}</div></div>
						  <div class="btn tibi" v-if="userinfo.is_deposit == 1"  @click="handleClick(item,'/tiBit')"><div class="cover">{{$t("tiBit.header[0]")}}</div></div>
						  <div class="btn detail" @click="handleClick(item,'/moneyRecord')"><div class="cover">{{$t("ziChan.canten[2]")}}</div></div>
					  </div>
				  </div>
					  <img v-if="requestData.length ==0" src="../../assets/image/loading.png" class="imgLoading" alt="">
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
				is_deposit:"",
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
							if(_this.userinfo.status ==2){
								this.$public.msg(_this.$t('header.tips[6]'), "warning", _this);
								return
							}
							if(_this.userinfo.status == 1 ||  _this.userinfo.status == 4){
							// if(_this.userinfo.status == 3){
								_this.$confirm(_this.$t("security.option[3]"), _this.$t('security.option[4]'), {
									confirmButtonText: _this.$t('security.option[5]'),
									cancelButtonText: _this.$t('security.option[6]'),
									type: 'warning'
								}).then(() => {
									_this.$public.go('senior',10,_this);
								})
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
						console.log(_this.requestData);
						
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
			window.scrollTo(0, 0); //回到顶部
			this.exchangelist();
		},
	}
</script>