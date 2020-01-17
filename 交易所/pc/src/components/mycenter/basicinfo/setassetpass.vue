<template>
    <div class="basic-info">
        <div class="info-block">
            <div class="sub-title">{{$t('mycenter.setassetpass[0]')}}</div>
            <el-form style="width: 60%" label-position="top" :model="userData" :rules="rules2" ref="userData"
                label-width="100px" @submit.native.prevent>
                <el-form-item style="margin-bottom: 0" :label="$t('mycenter.setassetpass[1]')" prop="tpwd">
                    <div>
                        <el-input type="password" :placeholder="$t('mycenter.setassetpass[2]')" v-model="userData.tpwd">
                        </el-input>
                        <div class="textColor" v-if="userData.mobile">{{$t('mycenter.setassetpass[3]')}}: {{userData.mobile}}</div>
                    </div>
                </el-form-item>
                <el-form-item style="margin-bottom: 0" :label="$t('mycenter.setassetpass[10]')" prop="tpwd1">
                    <el-input type="password" :placeholder="$t('mycenter.setassetpass[2]')" v-model="userData.tpwd1">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('mycenter.setassetpass[4]')" prop="code">
                    <div class="flex">
                        <el-input :placeholder="$t('mycenter.setassetpass[5]')" v-model="userData.code"></el-input>
                        <el-button class="getcode" type="primary" @click="getCode">{{btnCode.time}}</el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 70%" @click="submit" :loading="loading">{{$t('mycenter.setassetpass[8]')}}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            var code = (rule, value, callback) => {
                if (!this.$public.code(value)) {
                    return callback(new Error('验证码格式有误'));
                } else {
                    callback();
                }
            };
            var validatetpwd = (rule, value, callback) => {
                if (!this.$public.pwd(value)) {
                    callback(new Error('请输入有效的密码'));
                } else {
                    callback();
                }
            };
            var validatetpwd2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.userData.tpwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                userData: {
                    code: '', //验证码
                    tpwd: '', //资金密码
                    tpwd1: '', //确认资金密码
                    mobile: window.sessionStorage.getItem('mobile') //手机号

                },
                btnCode: {
                    time: this.$t('mycenter.tb[10]'), //倒计时
                    disabled: false
                },
                rules2: {
                    code: [{
                        validator: code,
                        trigger: 'blur'
                    }],
                    tpwd: [{
                        validator: validatetpwd,
                        trigger: 'blur'
                    }],
                    tpwd1: [{
                        validator: validatetpwd2,
                        trigger: 'blur'
                    }]

                },
                loading: false,
            }
        },
        methods: {
            submit() {
                this.$refs.userData.validate(valid => {
                    if (valid) {
                        this.save();
                    }
                })
            },
            save() {
                if(!this.loading)return;
                this.loading = true; //防止表单重复提交标志
                this.$http.post(this.$http.reset_tpwd, this.userData).then(response => {
                    if (response.data.status == "200") {
                        this.$public.msg(response.data.msg, 'success', this);
                        setTimeout(function () {
                            this.$router.go(-1); //返回上一层
                        }, 800)
                    } else {
                        this.$public.msg(response.data.msg, 'warning', this);
                    }
                }).catch(function (error) { }).finally(() => {
                    this.loading = false
                })
            },
            startTicker() {
                this.btnCode = {
                    time: 59,
                    disabled: true
                }
                this.$message({
                    message: '验证码发送成功',
                    type: 'success'
                });
                let set = setInterval(() => {
                    this.btnCode.time--;
                    if (this.btnCode.time <= 0) {
                        this.btnCode = {
                            time: this.$t('mycenter.tb[10]'),
                            disabled: false
                        }
                        clearInterval(set);
                    }
                }, 1000)
            },
            getCode() {
                if (this.btnCode.disabled) return;
                const email = window.sessionStorage.getItem('mobile');
                if (!this.$public.email(email)) {
                    this.$message.warning(this.$t('register.tips[0]'));
                    return false;
                }
                this.btnCode.disabled = true;
                //获取验证码
                this.$http.post(this.$http.send_mail, {
                    email,
                }).then((response) => {
                    if (response.data.status == "200") {
                        this.startTicker();
                    } else {
                        this.$message.warning(response.data.msg);
                        this.btnCode.disabled = false;
                    }
                }).catch(error => {
                    this.btnCode.disabled = false;
                });
            },
        },
    }
</script>
<style lang="less" scoped>
    @import "../style.less";

    .getcode {
        margin-left: 16px;
    }
</style>