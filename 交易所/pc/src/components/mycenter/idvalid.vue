<template>
    <div class="basic-info invalid-wrap">
        <div class="info-block">
            <div class="sub-title">
                {{$t('mycenter.idvalid[0]')}}
            </div>
            <el-form style="width: 60%" label-position="top" :model="userData" status-icon :rules="rules2"
                ref="userData" label-width="100px" @submit.native.prevent>
                <el-form-item :label="$t('mycenter.idvalid[1]')" prop="realname">
                    <el-input :placeholder="$t('mycenter.idvalid[2]')" v-model="userData.realname">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('mycenter.idvalid[3]')" prop="idcard">
                    <el-input :placeholder="$t('mycenter.idvalid[4]')" v-model="userData.idcard">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('mycenter.idvalid[5]')" prop="cardimg1">
                    
                    <el-upload
                    class="upload-box"
                    :action="uploadurl"
                    :on-success="e => handleUpload('cardimg1', e)"
                    :limit="1"
                    name="file_pic"
                    :show-file-list="false"
                    list-type="picture">
                    <div slot="trigger" class="upload-card flex v vc hc">
                            <template v-if="!pics.cardimg1.server_url">
                                    <div class="upload-pic"><img src="../../assets/img/card1.png" alt=""></div>
                                    <div class="upload-hint">{{$t('mycenter.idvalid[6]')}}</div>
                            </template>
                            <img style="object-fit:fill" :src="pics.cardimg1.server_url" >
                    </div>
                    </el-upload>
                </el-form-item>
                <el-form-item :label="$t('mycenter.idvalid[7]')" prop="cardimg2">
                        <el-upload
                    class="upload-box"
                    :action="uploadurl"
                    :on-success="e => handleUpload('cardimg2', e)"
                    :limit="1"
                    name="file_pic"
                    :show-file-list="false"
                    list-type="picture">
                    <div slot="trigger" class="upload-card flex v vc hc">
                            <template v-if="!pics.cardimg2.server_url">
                                    <div class="upload-pic"><img src="../../assets/img/card2.png" alt=""></div>
                                    <div class="upload-hint">{{$t('mycenter.idvalid[8]')}}</div>
        
                            </template>
                            <img style="object-fit:fill" :src="pics.cardimg2.server_url" >
                    </div>
                    </el-upload>
                    </el-form-item>
                    <el-form-item :label="$t('mycenter.idvalid[9]')" prop="cardimg3">
                            <el-upload
                    class="upload-box"
                    :action="uploadurl"
                    :on-success="e => handleUpload('cardimg3', e)"
                    :limit="1"
                    name="file_pic"
                    :show-file-list="false"
                    list-type="picture">
                    <div slot="trigger" class="upload-card flex v vc hc">
                            <template v-if="!pics.cardimg3.server_url">
                                    <div class="upload-pic"><img src="../../assets/img/card3.png" alt=""></div>
                                <div class="upload-hint">{{$t('mycenter.idvalid[10]')}}</div>
                            </template>
                            <img style="object-fit:fill" :src="pics.cardimg3.server_url" >
                    </div>
                    </el-upload>
                        </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit" style="width:100%" :loading="loading">{{$t('mycenter.idvalid[11]')}}</el-button>
                </el-form-item>
            </el-form>



        </div>
    </div>
</template>
<script>
    // { required: true, message: '请输入活动名称', trigger: 'blur' },
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                    if (value === '') {
                        return callback(new Error(this.$t('mycenter.idvalid[4]')));
                    } else {
                    if (value) {
                        if(this.$i18n.locale == "Chinese") {
                            if(!this.$public.isCardID(value)) {
                                return callback(this.$t('mycenter.idvalid[12]'));
                            }
                        }
                        else if ((value + '').length < 8) {
                            return callback(this.$t('mycenter.idvalid[12]'));
                        }
                    }
                callback();
                }
            };
            return {
                uploadurl: this.$http.upload,
                loading: false,
                userData: {
                    realname:'',
                    mobile: window.sessionStorage.getItem('mobile'),
                    idcard:'',
                    cardimg1:'',
                    cardimg2:'',
                    cardimg3:''
                },
                pics: {
                    cardimg1:'',
                    cardimg2:'',
                    cardimg3:''
                },

                rules2: {
                    realname: [{ required: true, message: this.$t('mycenter.idvalid[2]'), trigger: 'blur' }],
                    idcard:[{ validator: validatePass, trigger: 'blur' }],
                    cardimg1: [{ required: true, message: this.$t('mycenter.idvalid[6]'), trigger: 'blur' }],
                    cardimg2: [{ required: true, message: this.$t('mycenter.idvalid[8]'), trigger: 'blur' }],
                    cardimg3: [{ required: true, message: this.$t('mycenter.idvalid[10]'), trigger: 'blur' }],

                }
            }
        },
        created() {
            console.log(this)
        },
        methods: {
            submit() {
                this.$refs.userData.validate((valid) => {
                    if (valid) {
                        if(!this.userData.mobile)return false;
                        const data = {...this.userData};
                        this.loading = true
                        this.$http.post(this.$http.idvalid, {data}).then(res => {
                            if(res.data.status == 200) {
                                this.$message.success(res.data.msg)
                            }
                            else {
                                this.$message.warning(res.data.msg)
                            }
                        }).catch(err => {
                            this.$message.warning(err.data.msg)
                        }).finally(() => {
                            this.loading = false;
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            toUploadPics() {

            },
            handleUpload(type, e,r) {
                if(e.status == 200) {
                    this.pics[type] = e.data;
                    this.userData[type] = e.data.url
                }
                
                console.log(e,r)
            },
            handlePreview() {
                console.log(e,r,90)
            }
        },
    }
</script>
<style lang="less">
    @import "./style.less";
    .invalid-wrap {
        padding-bottom: 80px;
    }
    .upload-box {
        width: 100%;
        .el-upload {
            width: 100%
        }
    }
    .upload-card {
        border: 1px solid rgba(102, 102, 102, 0.144);
        border-radius: 4px;
        height: 200px;
        text-align: center;
    }
    .upload-pic {
        width: 50%;
    }
    .upload-hint {
        color:#666;
        font-size: 12px;
        line-height: 20px
    }
</style>