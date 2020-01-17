<style lang=less>
/* import { constants } from 'http2'; */
/* @import { error } from 'util'; */
	@import '../../../assets/public.less';
	@import './../identity.less';
</style>
<template>
	<div class="real_name_main">
		<div class="real_name_title">
			<h2>{{$t('real_name.header[1]')}}</h2>
			<p>{{$t('real_name.header[3]')}}</p>
		</div>
		<div class="real_name_cont">
			<div class="form_cont">
				<el-form :label-position="labelPosition"  :model="userData" status-icon :rules="rules2" ref="userDate"  label-width="80px" class="demo-ruleForm">
					<el-form-item :label="$t('real_name.verification[0]')" prop="realname">
						<el-input :placeholder="$t('real_name.verification[9]')"  v-model="userData.realname" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item :label="$t('real_name.verification[1]')" prop="card_num">
					  <el-input :placeholder="$t('real_name.verification[10]')"  v-model="userData.card_num" >
					  </el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="real_name_submit">
				<el-button type="primary" @click="submitForm('userDate')" :loading="loading">{{$t('real_name.verification[8]')}}</el-button>
				<span class="rn_tips">{{$t('real_name.verification[11]')}}，<span >{{$t('real_name.verification[12]')}}！</span></span>
			</div>
		</div>
		
	</div>
</template>
<script>
	export default {
		data() {
			var _this = this;
			var realname = (rule, value, callback) => {
				if(!_this.$public.name(value)) {
					callback(new Error(_this.$t('real_name.script[0]')));
				} else {
					callback();
				}
			};
			var card_num = (rule, value, callback) => {
				if (value == ''){
					callback(new Error(_this.$t('real_name.verification[10]')));
				}else{
					callback()
				}
				// if(_this.$public.idCard(value)!= true) {
				// 	callback(new Error(_this.$public.idCard(value)));
				// } else {
				// 	callback();
				// }
			};
			return {
				userData: {
					realname: '', //姓名
					card_num: '', //身份证号,
					type: 1
				},
				userStatus:{
        		status: '', //初级认证     "1",// 用户状态 1 未认证 2 待审核 3 已通过  4拒绝   普通
        		auth_status: '' //高级认证状态 1 未认证 2 待审核 3 已通过  4拒绝
      			},
				rules2: {
					card_num: [{
						validator: card_num,
						trigger: 'blur'
					}],
					realname: [{
						validator: realname,
						trigger: 'blur'
					}],
				},
				labelPosition: 'left', //插件自带
				loading: false, //防止表单重复提交标志	
			};
		},
		methods: {
			//初级认证
			submitForm(formrealname) {
				var _this = this;
				_this.$refs[formrealname].validate((valid) => {
					if(valid) {
						_this.loading = true; //防止表单重复提交标志
						_this.$http.post(_this.$http.set_sm, _this.userData).then(function(response) {
							if(response.data.status == "200") {
								_this.$public.msg(response.data.msg, 'success', _this);
								_this.$http.post(_this.$http.user_info, {})
									.then(function (response) {
										if (response.data.status == "200") {
											sessionStorage.status = response.data.data.status;
										} else {
											_this.$public.msg(response.data.msg, "warning", _this);
										}
									})
									.catch(function (error) { });
								setTimeout(function() {
									_this.$router.go(-1); //返回上一层
								}, 10)
							} else {
								_this.$public.msg(response.data.msg, 'warning', _this);
									_this.loading = false;
							}
						}).catch(function(error) {});
					} else {
						return false
					}
				});
			},
			go_back() {
				var _this = this;
				_this.$router.go(-1); //返回上一层
			},
		},
		created:function(){
			this.ismobile=sessionStorage.getItem('mobile');
			// console.log(this.ismobile);
			// if(this.$public.checkMobile(this.ismobile)){
			// 	this.userData.mobile=this.ismobile;
			// 	this.emails='';
			// 	this.mobiles=this.ismobile;
			// }else{
			// 	this.emails=this.ismobile;
			// 	this.mobiles="";
			// 	this.userData.email=this.ismobile;
			// }
			// this.getData()
		}
	}
</script>

<style>
.el-input-group__prepend{
	width: 70px;
	border:none;
	background-color: transparent;
}
.real_name_main .real_name_submit .el-button{
	background: #2A64F3;
}
</style>