<template>
    <div class="basic-info assetinfo tbBox">
        <div class="info-block">
            <div class="sub-title">
                {{$t('mycenter.tb[0]')}}
            </div>
        </div>
        <el-form  label-position="top" :model="form" status-icon :rules="rules2" ref="userData"
            label-width="100px" @submit.native.prevent>
            <el-form-item :label="$t('mycenter.tb[1]')" prop="address">
                <el-input style="width: 400px;" v-model="form.address"></el-input>
                <el-select v-model="form.address" :placeholder="$t('mycenter.tb[2]')">
                    <el-option v-for="(op, key) in options" :key="key" :value="op.qiaobao_url" :label="op.qiaobao_url">
                        <span style="float: left">{{ op.qiaobao_url }}</span> &nbsp;&nbsp;
                        <span style="float: right; color: #8492a6; font-size: 13px">{{op.notes}}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('mycenter.tb[3]')" prop="num">
                <div>
                    <el-input style="width: 400px;" :placeholder="$t('mycenter.tb[4]')" type="number" :min=1 :max="biNum" v-model="form.num">
                    </el-input>
                    <div class="maxNum">{{$t('mycenter.tb[5]')}}:{{biNum}}</div>
                </div>

            </el-form-item>
            <el-form-item :label="$t('mycenter.tb[6]')" prop="tpwd">
                <el-input style="width: 400px;" :placeholder="$t('mycenter.tb[7]')" v-model="form.tpwd">
                </el-input>
            </el-form-item>
            <el-form-item :label="$t('mycenter.tb[8]')" prop="code">
                <el-input style="width: 400px;" :placeholder="$t('mycenter.tb[9]')" v-model="form.code">
                    <el-button @click="getCode" slot="append" type="code" :disabled="btnCode.disabled">{{btnCode.time}}</el-button>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 400px;" @click="submit" :loading="loader">{{$t('mycenter.tb[11]')}}</el-button>
            </el-form-item>
        </el-form>

        <div class="hint-box">

            <p>{{$t('mycenter.tb[12]')}}</p>
            <p>{{$t('mycenter.tb[13]')}}</p>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                rules2: {
                    address: [
                        {
                            required: true,
                            message: this.$t('mycenter.tb[2]'),
                            trigger: 'blur'
                        }
                    ],
                    num: [{ required: true, message: this.$t('mycenter.tb[4]'), trigger: 'blur' }],
                    tpwd: [{ required: true, message: this.$t('mycenter.tb[7]'), trigger: 'blur' }],
                    code: [{ required: true, message: this.$t('mycenter.tb[9]'), trigger: 'blur' }]
                },
                form: {
                    address: '',
                    account: window.sessionStorage.getItem('account'),
                    code: '',
                    tpwd: '',
                    pid: '',
                    num: ''
                },

                btnCode: {
                    time: this.$t('mycenter.tb[10]'),
                    disabled: false
                },
                biNum: 0
            }
        },
        created() {
            this.form.pid = this.$route.query.id;
            this.getLists();
        },
        methods: {
            // 获得提币限制条件
            get_tb() {
                this.$http
                    .get(this.$http.get_tb, { params: { pid: this.pid } })
                    .then(response => {
                        if (response.data.status == "200") {
                            this.limit = response.data.data;
                            this.biNum = response.data.data.balance
                        }
                    })
                    .catch(function (error) { });
            },
            submit() {
                this.$refs.userData.validate(valid => {
                    if (valid) {
                        this.save();
                    }
                })
            },
            save() {
                this.loader = true;
                const data = { ...this.form };
                if (!data.pid || !data.account) return;
                this.$http.post(this.$http.goBit, { data }).then(res => {
                    this.$message.success(this.$t('mycenter.tb[14]'));
                    this.reset();
                }).finally(() => {
                    this.loader = false
                })
            },
            reset() {
                this.form = Object.assign(this.form, {
                    code: ''
                })
            },
            getLists() {
                this.$http.get(this.$http.addrList, { params: {} })
                    .then((res) => {
                        this.options = res.data.data.btc.concat(res.data.data.eth)
                    });
            },
            go(id, type) {
                if (type == 1) {
                    this.$router.push({ name: 'tb', query: { id } })
                }
                else {
                    this.$router.push({ name: 'tb', query: { id } })
                }
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
        }
    }
</script>
<style lang="less">
    @import "../style.less";

    .el-tabs__nav-wrap::after {
        height: 0;
        display: none;
    }

    .el-tabs__active-bar {
        display: none;
    }

    .check-record-link {
        margin: 30px auto;
    }

    .hint-box {
        h4 {
            margin-bottom: 16px;
        }

        p {
            font-size: 12px;
            color: #666;
            line-height: 20px;
        }
    }
</style>