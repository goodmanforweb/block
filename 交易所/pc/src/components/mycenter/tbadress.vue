<template>
    <div class="basic-info tbadress">
        <div class="info-block">
            <div class="sub-title">
                {{$t('mycenter.tbadress[0]')}}
            </div>
        </div>
        <el-form class="tb-form" label-position="right" :model="form" status-icon :rules="rules" ref="userData"
            label-width="120px" @submit.native.prevent>
            <el-form-item :label="$t('mycenter.tbadress[1]')" prop="type">
                <el-select style="width:100%" :placeholder="$t('mycenter.tbadress[2]')" v-model="form.type">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>

                </el-select>
            </el-form-item>
            <el-form-item :label="$t('mycenter.tbadress[3]')" prop="qiaobao_url">
                <el-input :placeholder="$t('mycenter.tbadress[4]')" v-model="form.qiaobao_url">
                </el-input>

            </el-form-item>
            <el-form-item :label="$t('mycenter.tbadress[5]')" prop="notes">
                <el-input type="textarea" :placeholder="$t('mycenter.tbadress[6]')" v-model="form.notes">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%" @click="submit" :loading="loader">{{$t('mycenter.tbadress[7]')}}
                </el-button>
            </el-form-item>
        </el-form>

        <div class="tb-table-box">
            <h4 class="bcr" style="margin: 20px auto;">{{$t('mycenter.tbadress[8]')}}</h4>
            <el-table style="width:100%" :data="tableData">
                <el-table-column prop="type" :label="$t('mycenter.tbadress[9]')">
                </el-table-column>
                <el-table-column prop="qiaobao_url" :label="$t('mycenter.tbadress[10]')">
                </el-table-column>
                <el-table-column prop="notes" :label="$t('mycenter.tbadress[11]')">
                </el-table-column>
                <el-table-column :label="$t('mycenter.tbadress[12]')">
                    <template slot-scope="scope">
                        <el-button type="text" @click="delete(scope.row)">{{$t('mycenter.tbadress[13]')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                loader: false,
                tableData: [],
                form: {
                    type: '',
                    notes: '',
                    qiaobao_url: ''
                },
                rules: { // 验证规则
                    qiaobao_url: [{
                        required: true,
                        message: this.$t('mycenter.tbadress[4]'),
                        trigger: 'blur'
                    },
                    {
                        max: 255,
                        message: '长度过长，最多255个字符',
                        trigger: 'blur'
                    }
                    ],
                    notes: [{
                        required: true,
                        message: this.$t('mycenter.tbadress[6]'),
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 50,
                        message: '长度在 1 到 50 个字符',
                        trigger: 'blur'
                    }
                    ],
                    type: [{
                        required: true,
                        message: this.$t('mycenter.tbadress[2]'),
                        trigger: 'blur'
                    }]
                },
                options: [{
                    value: 'eth',
                    label: '以太坊'
                }, {
                    value: 'btc',
                    label: '比特币'
                }],

            }
        },
        created() {
            this.getLists();
        },
        methods: {
            submit() {
                this.$refs.userData.validate((valid) => {
                    if (valid) {
                        this.save();
                    } else {
                        return false;
                    }
                });
            },
            save() {
                this.loader = true
                this.$http.post(this.$http.deltAddre, { ...this.form })
                    .then((res) => {
                        this.loader = false;
                        if (res.data.status == 200) {
                            this.$message.success(res.data.msg);
                            this.getLists();
                        } else {
                            this.$message.warning(res.data.msg);
                        }
                        this.form = {
                            type: '',
                            notes: '',
                            qiaobao_url: ''
                        }
                    });
            },
            getLists() {
                this.$http.get(this.$http.addrList, {params: {}})
                .then((res) => {
                    this.tableData = res.data.data.btc.concat(res.data.data.eth)
                });
            },
            delete(row) {
                if(!row)return ;
				this.$confirm('是否确认删除该钱包地址?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const params = {
						qiaobao_url:row.qiaobao_url,
						notes:row.notes,
						act:'del',
						id:row.id,
						type:row.type
					}					
					this.$http.post(this.$http.deltAddre, params)
                    .then((res) => {
                        if(res.data.status == '200'){
                            this.getLists();
                        }
                        this.$message.success(res.data.msg);
                    });
				}).catch(() => {
					this.$message.info('已取消删除');
				});

            }
        }
    }
</script>
<style lang="less">
    @import "./style.less";

    .tb-form {
        width: 60%;
        margin: 60px auto;
        transform: translateX(-100px)
    }

    .tb-table-box {
        margin: 60px auto;
    }
</style>