<style lang=less>
	@import '../../../assets/public.less';
	@import '../identity.less';
</style>
<template>
	<div class="identity_main">
		<div class="auth_error">
			<h3>{{$t('auth_error.main[0]')}}</h3>
			<p>{{$t('auth_error.main[1]')}}：{{userData.apply_reason}}</p>
			<span @click="route()">{{$t('auth_error.main[2]')}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userData:{
					apply_reason:'',
				}   //用户信息

			};
		},
		methods: {
			route() {
				var _this = this;
				if(_this.userData.status == '3'){
					_this.$router.push({
						path: 'senior'
					})
				}else{
					_this.$router.push({
						path: 'realname'
					})
				}
				
			},
			//请求个人中心数据
			getData() {
				var _this = this;
				_this.$http.post(_this.$http.user_info, {}).then(function(response) {
					if(response.data.status == "200") {
						console.log(111);
						_this.userData.apply_reason=response.data.data.apply_reason;  //失败原因
						_this.userData.status=response.data.data.status;  //初级验证是否通过
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			}
		},
		created:function(){
			var _this = this;		
			_this.getData();
		}
	}
</script>

<style>

</style>