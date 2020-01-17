<template>
    <div class="basic-info">
        <div class="info-block">
            <div class="sub-title">
                {{$t('mycenter.base[0]')}}
            </div>
            <div class="info-row flex vc">
                <label>{{$t('mycenter.base[1]')}}:</label>
                <span class="label-value">{{res.email}}</span>
                <el-button type="text"></el-button>
            </div>
            <div class="info-row flex vc">
                <label>UID:</label>
                <span class="label-value">{{res.uid}}</span>
                <el-button type="text"></el-button>
            </div>
            <div class="info-row flex vc">
                <label>{{$t('mycenter.base[2]')}}:</label>
                <span class="label-value">{{res.opwd}}</span>
                <el-button type="text" @click="$router.push({name:'fixloginpass'})">{{$t('mycenter.base[4]')}}</el-button>
            </div>
            <div class="info-row flex vc">
                <label>{{$t('mycenter.base[3]')}}:</label>
                <span class="label-value">{{res.tpwd == false ? '--' : res.tpwd}}</span>
                <el-button type="text" @click="$router.push({name:'setassetpass'})">{{res.tpwd ? $t('mycenter.base[4]') : $t('mycenter.base[19]')}}</el-button>
            </div>

        </div>
        <div class="info-block">
            <div class="sub-title">
                {{$t('mycenter.base[5]')}}
            </div>
            <div class="info-row flex vc">
                <label>{{$t('mycenter.base[6]')}}</label>
                <span class="label-value">{{res.status == 3 ? $t('security.tip[3]') : $t('security.tip[4]')}}</span>
                <el-button type="text" @click="$router.push({name:'idvalid'})">
                        <span v-if="res.status !=3" >{{$t('security.tip[6]')}}</span>
                        <span v-else-if="res.status == 3 && res.auth_status == 1" >{{$t('security.tip[7]')}}</span>
                        <span v-else-if="res.status == 3 && res.auth_status == 4" >{{$t('security.tipss[0]')}}</span>
                        <span v-else-if="res.status == 3 && res.auth_status == 2">{{$t('identity.main[3]')}}</span>
                        <span v-else-if="res.status == 3 && res.auth_status == 3">{{$t('security.tips[2]')}}</span>
                </el-button>
                
                <span class="label-hint">({{$t('security.verification[5]')}})</span>
            </div>
            <div class="info-row flex vc">
                <label>{{$t('mycenter.base[7]')}}</label>
                <span class="label-value">{{res.google == '0' ? $t('security.tip[3]') : $t('security.tip[4]')}}</span>
                <el-button type="text">
						<span @click="$router.push({name:'googlecheck'})" v-if="!res.google">{{$t('security.tip[5]')}}</span>
						<span @click="dialogFormVisible = true"  >{{$t('security.tip[8]')}}</span>
						<span  @click="dialogFormVisible2 = true"  >{{$t('security.tip[9]')}}</span>
 
                       <!-- <span @click="change_router('googleverify')" v-if="res.google == 0">{{$t('security.tip[5]')}}</span>
                       <span @click="close"  v-else-if="res.google == 1 && res.is_start_google == 1">{{$t('security.tip[8]')}}</span>
                       <span  @click="open"  v-else-if="res.google == 1 &&　res.is_start_google == 0">{{$t('security.tip[9]')}}</span> -->
                </el-button>
                <span class="label-hint">({{$t('security.verification[15]')}})</span>

            </div>

        </div>
        <div class="info-block">
            <div class="sub-title">
                {{$t('mycenter.base[15]')}}
            </div>
            <div class="info-row flex info-table-hd">
                <span class="flex1">{{$t('mycenter.base[16]')}}</span>
                <span class="flex1">{{$t('mycenter.base[17]')}}</span>
                <span class="flex1">{{$t('mycenter.base[18]')}}</span>
            </div>
            <div class="info-row flex info-table-bd" v-for="(el, index) in loginrecord" :key="index">
                <span class="flex1">{{el.time}}</span>
                <span class="flex1">{{el.ip}}</span>
                <span class="flex1">{{el.AgentInfo}}</span>
            </div>
            


        </div>
        
        <el-dialog class="xel-dialog" :title="$t('mycenter.dialoggoogle[0]')" :visible.sync="dialogFormVisible"
            width="500px">
            <el-form label-position="top" :model="form" status-icon :rules="rules" label-width="100px"
                @submit.native.prevent>
                <el-form-item :label="$t('mycenter.dialoggoogle[1]')" prop="dyGoodleCommand">
                    <el-input :placeholder="$t('mycenter.dialoggoogle[2]')" v-model="form.dyGoodleCommand">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('mycenter.dialoggoogle[3]')" prop="mobile">
                    <el-input :placeholder="$t('mycenter.dialoggoogle[4]')" v-model="form.code">
                        <el-button slot="append"  type="code" @click="getCode()" class="getcode">{{btnCode.time}}</el-button>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer flex">

                <el-button class="flex1"  @click="dialogFormVisible = false">
                    {{$t('mycenter.dialoggoogle[7]')}}
                </el-button>
                <el-button class="flex1" type="primary" @click="closegoogle">{{$t('mycenter.dialoggoogle[6]')}}
                </el-button>
            </div>
        </el-dialog>
        <el-dialog class="xel-dialog" :title="$t('mycenter.dialoggoogle[8]')" :visible.sync="dialogFormVisible2"
            width="500px">
            <el-form label-position="top" :model="form1" status-icon :rules="rules1" label-width="100px"
                @submit.native.prevent>
                <el-form-item :label="$t('mycenter.dialoggoogle[1]')" prop="mobile">
                    <el-input :placeholder="$t('mycenter.dialoggoogle[2]')" v-model="form1.dyGoodleCommand">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer flex">

                <el-button class="flex1"  @click="dialogFormVisible2 = false">
                    {{$t('mycenter.dialoggoogle[7]')}}
                </el-button>
                <el-button class="flex1" type="primary" @click="opengoogle">{{$t('mycenter.dialoggoogle[6]')}}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dialogFormVisible: false,
                dialogFormVisible2: false,
                res: {

                },
                rules2: {},
                res: {},
                formLabelWidth: '120px',
				btnCode: {
					time: this.$t('google_verify.script[0]'), //倒计时
					disabled: false
				},
				form: {
					dyGoodleCommand: '',
					mobile: '',
					code: '',
					act: ''
				},
				form1: {
					dyGoodleCommand: '',
					mobile: '',
					act: ''
				},
				rules: {

				},
				rules1: {

				},
				loadingdata:false,
				loginrecord:[]
            }
        },
        created() {
			this.getData();
			this.getLoginRecord();
        },
        methods: {
			getLoginRecord() {
				this.$http.get(this.$http.user_aq,{params:{}}).then(res => {
					if(res.data.status == 200) {
						this.loginrecord = res.data.data.login_log;
					}
				})
			},
            getData() {
                this.$http.get(this.$http.user_info, {params:{}}).then((response) => {
					if(response.data.status == "200") {
						this.res = response.data.data;
					} else {
                        this.$message.warning(response.data.msg)
					}
				}).catch((error) => {

                });
				
            },
            changestatus(value){
				const _this=this;
				let act;
				if(value){
					act=1;
				}else{
					act=0;
				}
				let data={
					act:act
				}
				_this.$http.post(_this.$http.set_google_state,data).then(function(res){
					if(res.data.status=='200'){
						_this.$public.msg(res.data.msg, 'success', _this);
						_this.getData();
					}else{
						_this.$public.msg(res.data.msg, 'error', _this);
					}
				})
			},
			
			
			// 发送验证码
			getCode() {
				var _this = this;
				var mobile = sessionStorage.mobile;
				var vl = mobile.toString();
				if(vl.indexOf('@') == -1 ) { // 手机号
					_this.btnCode.disabled = true;
					_this.$http.post(_this.$http.send_sms, {
						mobile: mobile,
						type: 7
					}).then(function(response) {
						if(response.data.status == "200") {
							_this.$public.msg(response.data.msg, 'success', _this);
							_this.$public.setTime(_this); //倒计时函数封装
						} else {
							_this.btnCode.disabled = false;
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});
				} else {
					_this.btnCode.disabled = true;
					_this.$http.post(_this.$http.send_mail, {
						email: mobile
					}).then(function(response) {
						if(response.data.status == "200") {
							_this.$public.msg(response.data.msg, 'success', _this);
							_this.$public.setTime(_this); //倒计时函数封装
						} else {
							_this.btnCode.disabled = false;
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});
				}
			},
			// 关闭谷歌验证
			closegoogle() {
				const _this=this;
				var mobile = sessionStorage.getItem('mobile');
				if(_this.form.dyGoodleCommand==''){
					_this.$public.msg(_this.$t('security.one[4]'),'warning',_this)
					return false;
				}if(_this.form.code==''){
					_this.$public.msg(_this.$t('security.one[5]'),'warning',_this)
					return false;
				}
				let _data={
					dyGoodleCommand:_this.form.dyGoodleCommand,
					mobile: mobile,
					code:_this.form.code,
					act: 0
				}
				_this.$http.post(_this.$http.set_google_state, _data).then(res=>{
					if(res.data.status=='200'){
						_this.$public.msg(res.data.msg,'success',_this);
						_this.dialogFormVisible = false;
						_this.getData();
					}else{
						_this.$public.msg(res.data.msg,'success',_this);
					}
				})
			},
			// 开启谷歌验证
			opengoogle () {
				const _this=this;
				var mobile = sessionStorage.getItem('mobile');
				if(_this.form1.dyGoodleCommand==''){
					_this.$public.msg(_this.$t('security.one[4]'),'warning',_this)
					return false;
				}
				let _data={
					dyGoodleCommand:_this.form1.dyGoodleCommand,
					mobile: mobile,
					act: 1
				}
				_this.$http.post(_this.$http.set_google_state, _data).then(res=>{
					if(res.data.status=='200'){
						_this.$public.msg(res.data.msg,'success',_this);
							_this.dialogVisible = false;
								_this.getData();
					}else{
						_this.$public.msg(res.data.msg,'success',_this);
					}
				})
			},
			//关闭弹框
			close_moble() {
				var _this = this;
				_this.isDisplay = 'display:none';
				_this.$router.push({
					path: '/security',
				})
			},
			//下拉框改变执行函数
			change(value) {
				var _this = this;
				_this.$router.push({
					path: value,
					query: {
						type: value
					}
				})
			},
			//开光执行函数
			changeSwitch(switch_value, type) {
				var _this = this;
				_this.$http.post(_this.$http.set_pay_status, {
					type: type,
					val: switch_value
				}).then(function(response) {
					if(response.data.status == "200") {
						//						_this.$public.msg(response.data.msg, 'success', _this);
						_this.$public.msg(_this.$t('security.option[9]'), 'success', _this);
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});

			},
			//编辑执行函数
			edit(id, type, k) {
				var _this = this;
				_this.dis = true;  //支付方式不可修改
				if(_this.payMethod[k].status == 0) {
					_this.$public.msg(_this.$t('security.option[10]'), 'warning', _this);
					return false;
				}
				_this.isDisplay = 'display:block';
				_this.select_value = type;
				_this.$router.push({
					name: type,
					query: {
						type: type,
						id: id
					}
				})
			},
			// 商家认证
			auth() {
				var _this = this;
				if (JSON.parse(unescape(sessionStorage.getItem('account'))).ishavePay == 0) {
					_this.$public.msg(_this.$t("frenchcurrency.newhint[13]"), 'warning', _this);
					return false;
				}
				if (_this.userData.status != 3) {
					_this.$public.msg(_this.$t("security.one[2]"), 'warning', _this);
					return false;
				}
				_this.dialogMerchant = true;
			},
			// 解除商家认证
			relieve() {
				var _this = this;
				// _this.$confirm(_this.$t("security.one[6]"), _this.$t("security.one[7]"), {
				// 	confirmButtonText: _this.$t("security.one[8]"),
				// 	cancelButtonText: _this.$t("security.one[9]"),
				// 	type: 'warning'
				// }).then(() => {
					_this.$http.post(_this.$http.del_shop, { account: JSON.parse(unescape(sessionStorage.getItem('account')))}).then(function (response) {
						if (response.data.status == '200') {
							_this.$public.msg(response.data.msg, 'success', _this);
							_this.getData();
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function (error) { });
				// }).catch(() => { });
				return false;
			},
			//申请成为商家确认提交按钮
			applyFor() {
                var _this = this;
				console.log(_this.loadingdata)
				if(_this.loadingdata){
					return false;
				}else{
					_this.loadingdata = true;
				}
				if (!_this.checked) {
					_this.$public.msg(_this.$t("security.two[0]")+ _this.MMargin+_this.$t("security.two[1]") , 'warning', _this);
					_this.loadingdata = false;
					return false;
				} else {
					_this.$http.post(_this.$http.add_shop, {}).then(function (response) {
						if (response.data.status == '200') {
							_this.dialogMerchant = false;
							setTimeout(function(){
								_this.loadingdata = false;
							},500)
							_this.$public.msg(response.data.msg, 'success', _this);
							_this.getData();
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function (error) { })
				}
			},
        },
    }
</script>
<style lang="less">
    @import "../style.less";

    .xel-dialog {
        .el-dialog {
            border-radius: 8px;
        }

        .el-dialog__footer {
            padding-bottom: 40px
        }
    }
</style>