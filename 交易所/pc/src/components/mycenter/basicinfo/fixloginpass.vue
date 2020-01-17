<template>
    <div class="basic-info">
        <div class="info-block">
            <div class="sub-title">{{$t('mycenter.fixloginpass[0]')}}</div>
            <el-form style="width: 60%" label-position="top" :model="userData" status-icon :rules="rules" ref="userData"
                label-width="100px" @submit.native.prevent>
                <el-form-item :label="$t('mycenter.fixloginpass[1]')" prop="oldpwd">
                    <el-input :placeholder="$t('mycenter.fixloginpass[2]')" v-model="userData.oldpwd">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('mycenter.fixloginpass[3]')" prop="opwd">
                    <el-input :placeholder="$t('mycenter.fixloginpass[4]')" v-model="userData.opwd">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('mycenter.fixloginpass[5]')" prop="opwd1">
                    <el-input :placeholder="$t('mycenter.fixloginpass[6]')" v-model="userData.opwd1">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loading" style="width:80%" @click="submit">{{$t('mycenter.fixloginpass[7]')}}</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            var oldpwd = (rule, value, callback) => {
				if(!this.$public.pwd(value)) {
					return callback(new Error('请输入有效的密码'));
				} else {
					callback();
				}
			};
			var validateopwd = (rule, value, callback) => {
				if(!this.$public.pwd(value)) {
					callback(new Error('请输入有效的密码'));
				} else {
					callback();
				}
			};
			var validateopwd2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.userData.opwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
            return {
                loading: false,
                userData: {
					oldpwd: '', //原密码
					opwd: '', //新密码
					opwd1: '' //确认新密码

				},
				rules: {
					opwd: [{
						validator: validateopwd,
						trigger: 'blur'
					}],
					opwd1: [{
						validator: validateopwd2,
						trigger: 'blur'
					}],
					oldpwd: [{
						validator: oldpwd,
						trigger: 'blur'
					}]
				},
            }
        },
        methods: {
            submit() {
                this.$refs.userData.validate(valid => {
                    if(valid) {
                        this.save();
                    }
                })
            },
            save() {
                this.loading = true; //防止表单重复提交标志
                this.$http.post(this.$http.xiugai_pwd, {...this.userData}).then((response) => {
                    if(response.data.status == "200") {
                        this.$message.success(response.data.msg+ '，请重新登录');
                        //重新登录
                        setTimeout(() => {
                            this.$router.replace({name:'login'})
                        },2000)
                    } else {
                        this.$message.warning(response.data.msg);
                    }

                }).finally(() => {
                    this.loading = false
                })
            }
        },
    }
</script>
<style lang="less">
    @import "../style.less";
</style>