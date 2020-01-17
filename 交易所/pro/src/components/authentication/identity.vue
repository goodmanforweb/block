<style lang=less>
	@import '../../assets/public.less';
	@import './identity.less';
</style>
<template>
	<div class="identity_main">
		<div class="identity_header">
			<h2>
				{{$t('identity.header[0]')}} 
				<span class="tishi"> <i class="el-icon-info"></i> {{$t('identity.header[1]')}}</span>
			</h2>
		</div>
		<div class="identity_cont">
			<ul class="lis_warp">
				<li class="lis">
					<span>{{$t('identity.main[0]')}}</span>
					<span class="name" v-if="userData.status!='4'&&userData.name">{{userData.name}}</span>
					<span class="car" v-if="userData.status!='4'&&userData.name">{{userData.idcard}}</span>
					<span class="name" v-if="userData.status=='4'&&userData.name">{{$t('identity.main[1]')}}</span>
					<span class="exit" v-if="userData.status == 1" @click="route('realname')">{{$t('identity.main[2]')}}</span>
					<span class="exit" v-else-if="userData.status == 2">{{$t('identity.main[3]')}}</span>
					<span class="exit" v-else-if="userData.status == 3">{{$t('identity.main[4]')}}</span>
					<span class="exit" v-else-if="userData.status == 4" @click="route('auth_error')">{{$t('identity.main[5]')}}</span>
					<!-- <span class="exit" @click="route('realname')" v-show="!userData.smrz">认证</span>
					<span class="exit" v-show="userData.smrz" style="color: #909399; cursor: default;">已认证</span> -->
				</li>
				<li class="lis">
					<span>{{$t('identity.main[6]')}}</span>
					<span class="status" v-if="userData.auth_status == 1">{{$t('identity.main[7]')}}</span>
					<!-- <span class="status" v-else-if="userData.auth_status == 2">审核中</span> -->
					<!-- <span class="status" v-else-if="userData.auth_status == 3">审核通过</span> -->
					<span class="status" v-else-if="userData.auth_status == 4">{{$t('identity.main[8]')}}</span>
					<span class="exit" @click="route('senior')" v-if="userData.auth_status == 1">{{$t('identity.main[9]')}}</span>
					<span class="exit"  v-if="userData.auth_status == 2">{{$t('identity.main[10]')}}</span>
					<span class="exit"  v-if="userData.auth_status == 3" style="color: #909399; cursor: default;">{{$t('identity.main[11]')}}</span>
					<span class="exit" @click="route('auth_error')" v-if="userData.auth_status == 4">{{$t('identity.main[12]')}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userData:{
					name:'',
					smrz:'',
					status:'',
					idcard:'',
					auth_status:''
				},   //用户信息
				mobile:'',
			};
		},
		methods: {
			route(whitch) {
				var _this = this;
				if(whitch == 'senior' && _this.userData.status != '3'){
						_this.$public.msg(_this.$t('identity.script[0]'),'warning' ,_this);
						return false
				}
				_this.$router.push({
					path: whitch
				})
			},
			//请求个人中心数据
			getData() {
				var _this = this;
				_this.$http.post(_this.$http.user_info, {}).then(function(response) {
					if(response.data.status == "200") {
						var idcard = response.data.data.idcard == false ? '' : response.data.data.idcard
						_this.userData= {
							name:response.data.data.name,  //姓名
							smrz:response.data.data.smrz,   //身份认证状态
							status:response.data.data.status,  // 初级认证状态
							idcard:idcard,    //身份证号码
							auth_status:response.data.data.auth_status,    //身份证号码
						}
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			}
		},
		created:function(){
			var _this = this;		
			_this.getData();
			_this.mobile=sessionStorage.getItem('mobile');
			// console.log(_this.mobile);
			_this.$public.scrollTop();  //返回但最顶部函数
		}
	}
</script>

<style>

</style>