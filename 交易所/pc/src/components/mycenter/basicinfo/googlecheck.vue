<template>
    <div class="basic-info">
        <div class="info-block">
            <div class="sub-title">{{$t('mycenter.googlecheck[0]')}}</div>

            <div class="hint hint-a">
                {{$t('mycenter.googlecheck[1]')}}
            </div>

            <div class="g-block">
                <div class="g-title flex vc">
                    <span>1</span>
                    <span>{{$t('mycenter.googlecheck[2]')}}</span>
                </div>
                <div class="hint">
                    <p>{{$t('mycenter.googlecheck[3]')}}</p>
                    
                    <p>{{$t('mycenter.googlecheck[4]')}}</p>
                </div>
                <div class="g-icons flex g-cont">
                    <div class="g-icon-cube">
                        
                    </div>
                    <div class="g-icon-cube">
                        
                    </div>
                </div>
            </div>
            <div class="g-block" >
                <div class="g-title flex vc">
                    <span>2</span>
                    <span>{{$t('mycenter.googlecheck[5]')}}</span>
                </div>
                <div class="hint">{{$t('mycenter.googlecheck[6]')}}</div>
                <div class="g-cont g-cont-code flex ">
                    <div class="g-ercode">
                            <img :src="userData.QrCodeurl" style="object-fit: fill">
                    </div>
                    <span class="g-ertext" id="mylink">{{userData.secretKey}}</span>
                    <el-button type="text" ref="copyBtn" data-clipboard-target="#mylink">{{$t('mycenter.googlecheck[7]')}}</el-button>
                </div>
            </div>
            <el-form label-position="top"  status-icon 
                label-width="100px" @submit.native.prevent>
                <div class="g-block">
                    <div class="g-title flex vc">
                        <span>3</span>
                        <span>{{$t('mycenter.googlecheck[8]')}}</span>
                    </div>
                    <el-form-item style="margin-bottom: 0" :label="$t('mycenter.googlecheck[9]')" prop="mobile">

                        <el-input v-model="userData.googleCode">
                        </el-input>
                    </el-form-item>

                </div>
                <div class="g-block" style="border:none">
                    <div class="g-title flex vc">
                        <span>4</span>
                        <span>{{$t('mycenter.googlecheck[10]')}}</span>
                    </div>
                    <el-form-item :label="$t('mycenter.googlecheck[11]')" prop="mobile">

                        <el-input v-model="userData.smsCode">
                            <el-button type="code" @click="getCode()" :disabled="btnCode.diabled" slot="append" class="getcode">{{btnCode.time}}</el-button>
                        </el-input>
                    </el-form-item>

                </div>


                <el-form-item>
                    <el-button type="primary" style="width: 100%" @click="submitForm()" :loading="loading">{{$t('mycenter.googlecheck[13]')}}</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
    import Clipboard from "clipboard";

    export default {
        data() {
            return {
                loading: false,
                userData: {
					QrCodeurl: '', //二维码
					secretKey: '', //密钥
					googleCode:'',//谷歌验证码
					smsCode:'',//短信验证码
					mobile: sessionStorage.getItem('mobile')
				},
				btnCode: {
					time: this.$t('google_verify.script[0]'), //倒计时
					disabled: false
				},
            }
        },
        mounted() {
            this.getQrCode();
            this.createCopy();
        },
        methods: {
            createCopy() {
                new Clipboard(this.$refs.copyBtn.$el).on("success", e => {
                    this.$message.success(this.$t('google_verify.script[3]'));
                    e.clearSelection();
                });
            },
            //绑定执行函数
			submitForm(formName) {
				var mobile = sessionStorage.mobile;
				if(this.userData.googleCode==''){
					this.$public.msg(this.$t('google_verify.script[1]'),'warning',this)
					return false;
				}if(this.userData.smsCode==''){
					this.$public.msg(this.$t('google_verify.script[2]'),'warning',this)
					return false;
				}
				let _data={
					dyGoodleCommand:this.userData.googleCode,
					code:this.userData.smsCode,
					account:mobile
				}
				this.$http.post(this.$http.checkGoogleCommand,_data).then(res=>{
					if(res.data.status=='200'){
						this.$public.msg(res.data.msg,'success',this);
						setTimeout(() => {
                            this.$router.push({name: 'basicinfo'})
                        },2000)
					}else{
						this.$public.msg(res.data.msg,'warning',this);
					}
				})
			},
			// 获取验证码
			getCode() {
				var mobile = sessionStorage.mobile;
				var vl = mobile.toString();
				if(vl.indexOf('@') == -1 ) { // 手机号
					this.btnCode.disabled = true;
					this.$http.post(this.$http.send_sms, {
						mobile: mobile,
						type: 7
					}).then(response => {
						if(response.data.status == "200") {
							this.$public.msg(response.data.msg, 'success', this);
							this.$public.setTime(this); //倒计时函数封装
						} else {
							this.btnCode.disabled = false;
							this.$public.msg(response.data.msg, 'warning', this);
						}
					}).catch(function(error) {});
				} else {
					this.btnCode.disabled = true;
					this.$http.post(this.$http.send_mail, {
						email: mobile
					}).then(response => {
						if(response.data.status == "200") {
							this.$public.msg(response.data.msg, 'success', this);
							this.$public.setTime(this); //倒计时函数封装
						} else {
							this.btnCode.disabled = false;
							this.$public.msg(response.data.msg, 'warning', this);
						}
					}).catch(function(error) {});
				}
			},
			getQrCode(){
				this.$http.get(this.$http.createGoogleCommand,{params:{account:sessionStorage.getItem('account')}}).then(res => {
					if(res.data.status=='200'){
						this.userData.QrCodeurl=res.data.data.local_url;
						this.userData.secretKey=res.data.data.command;
					}
				})
			}
			
        },
    }
</script>
<style lang="less" scoped>
    @import "../style.less";
    .hint {
        color:#666;
        padding: 16px 0;
        font-size: 14px;
        line-height: 24px;
        margin-bottom: 20px
    }
    .hint-a {
        border-bottom: 1px solid #000;
        margin-bottom: 30px
    }
    .g-block {
        margin-bottom: 25px;
        padding-bottom: 40px;
        border-bottom: 1px solid rgba(102, 102, 102, 0.144)
    }
    .g-title {
        margin-bottom: 16px;
        span:first-child {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            color:#fff;
            font-size: 12px;
            line-height: 20px;
            text-align: center;
            background-color: #6185e5;
            margin-right: 25px
        }
        span:last-child {

        }
    }
    .g-ercode {
        width: 140px;
        height: 140px;
        background: darkblue;
        img {
            width: 100%
        }
    }
    .g-ertext {
        padding: 0 20px;
    }
    .g-cont-code {
        align-items: flex-end;
        button {
            padding:0;
        }
    }
    /deep/ .el-form-item__content {
        width: 480px
    }
    .g-icon-cube {
        border-radius: 4px;
        background-color: #000;
        color:#fff;
        height: 50px;
        width: 180px;
        margin: 0 20px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat
    }
    .g-icon-cube:first-of-type {
        background-image: url(../../../assets/img/store.png)
    }
    .g-icon-cube:last-of-type {
        background-image: url(../../../assets/img/googlec.png)
    }
</style>