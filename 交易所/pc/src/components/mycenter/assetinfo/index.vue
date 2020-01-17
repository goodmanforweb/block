<template>
    <div class="basic-info assetinfo">
        <div class="info-block">
            <div class="sub-title">
                {{$t('mycenter.assetinfo[0]')}}
            </div>
            <div class="asset-ex" style="margin: 20px auto">
                <el-row :gutter="16" type="flex" align="middle">
                    <el-col :span="2">{{$t('mycenter.assetinfo[7]')}}</el-col>
                    <el-col :span="8">
                        <el-select style="width:100px" v-model="form2.excointype" @change="handleExType">
                            <el-option :label="t.pname" :value="t.code" v-for="(t,i) in canExLists" :key="i">
                            </el-option>
                        </el-select>
                        <el-input-number :max="canExMax" :min='0' v-model="form2.excoinnum" type="number" :precision="4"
                            :controls="false" controls-position="right">

                        </el-input-number>
                    </el-col>
                    <el-col :span="1">
                        <img width="25" src="../../../assets/img/link.png" alt="">
                    </el-col>
                    <el-col :span="8">
                        <el-input type="number" :disabled="true" :placeholder="$t('mycenter.assetinfo[13]')"
                            v-model="form2.excointonum">
                            <el-select :loading="loader2" slot="prepend" style="width:100px"
                                v-model="form2.excointotype">
                                <el-option :label="t.ex_name" :value="t.ex_name" v-for="(t,i) in exToLists" :key="i">
                                </el-option>
                            </el-select>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button @click="handleEX" type='primary'>{{$t('mycenter.assetinfo[8]')}}</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-table style="width:100%" v-loading="loader" :data="tableData">
                <el-table-column prop="pname" :label="$t('mycenter.assetinfo[1]')">
                </el-table-column>
                <el-table-column prop="usable" :label="$t('mycenter.assetinfo[2]')">
                </el-table-column>
                <el-table-column prop="frost" :label="$t('mycenter.assetinfo[3]')">
                </el-table-column>
                <el-table-column :label="$t('mycenter.assetinfo[4]')">
                    <template slot-scope="{row}">
                        <div>
                            <el-button type="text" @click="go(row.pid, 1)">{{$t('mycenter.assetinfo[5]')}}</el-button>
                            <el-button type="text" @click="go(row.pid, 2)">{{$t('mycenter.assetinfo[6]')}}</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog :title="$t('mycenter.assetinfo[7]')" :visible.sync="centerDialogVisible" width="30%" center>
            <div>
                <h4 style="margin:0 auto 20px;font-size:20px;text-align: center">{{$t('mycenter.assetinfo[9]', {coin: form2.excoinnum + coinType,coin2: form2.excointonum + form2.excointotype})}}
                </h4>
                <el-input type="password" v-model="assetpass" :placeholder="$t('mycenter.assetinfo[10]')"></el-input>
            </div>
            <div slot="footer" class="dialog-footer flex">
                <el-button class="flex1" @click="centerDialogVisible = false">{{$t('mycenter.assetinfo[12]')}}
                </el-button>
                <el-button class="flex1" :loading="loader3" type="primary" @click="handleSubmitEx">
                    {{$t('mycenter.assetinfo[11]')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                loader2: false,
                loader3: false,
                loader: false,
                canExLists: [],
                exToLists: [],
                form2: {
                    excoinnum: '',
                    excointype: '',
                    excointonum: '',
                    excointotype: ''
                },
                canExMax: 0,
                centerDialogVisible: false,
                assetpass: ''
            }
        },
        created() {
            this.getLists();
            this.getCanEx();
        },
        watch: {
            'form2.excoinnum': function (n) {
                if (this.form2.excointotype) {
                    const target = this.exToLists.find(el => el.ex_name == this.form2.excointotype);
                    if (target) {
                        const times = this.$public.Multiplication;
                        this.form2.excointonum = times(n, target.ex_rate) || 0;
                    }

                }
            }
        },
        computed: {
            coinType() {
                if(this.form2.excointype) {
                    return this.form2.excointype.split('_')[0].toUpperCase()
                }
                return ''
            }
        },
        methods: {
            handleSubmitEx() {
                if (!this.assetpass) {
                    return this.$message.warning(this.$t('mycenter.assetinfo[10]'));
                }
                this.submitEx();
            },
            submitEx() {
                this.loader3 = true;
                const { excointype, excointotype, excoinnum } = this.form2;
                const data = {
                    coin: this.coinType,
                    ex_coin: excointotype,
                    num: excoinnum,
                    tpwd: this.assetpass
                };
                this.$http.post(this.$http.exchange, data).then(res => {
                    if (res.data.status == 200) {
                        this.$message.success(res.data.msg);
                    }
                    else {
                        this.$message.warning(res.data.msg);
                    }
                }).finally(() => {
                    this.loader3 = false
                })
            },
            handleExType(code) {
                this.setCanMax(code);
                this.getExToLists(code);
            },
            setCanMax(code) {
                const target = this.tableData.find(el => el.mark == code);
                if (target) {
                    this.canExMax = Number(target.usable);
                }
            },
            getExToLists(code) {
                this.loader2 = true;
                this.$http.get(this.$http.thisCoinList, { params: { coin: code } }).then((res) => {
                    if (res.data.status == '200') {
                        this.exToLists = res.data.data;
                        if (this.exToLists.length == 1) {
                            this.$nextTick(() => {
                                this.form2.excointotype = this.exToLists[0].ex_name;
                            })
                        }
                    }
                }).finally(() => {
                    this.loader2 = false
                })
            },
            check() {
                if (Object.values(this.form2).some(el => !el)) {
                    return false
                }
                return true
            },
            handleEX() {
                this.centerDialogVisible = this.check()
            },
            getCanEx() {
                this.loader = true;
                this.$http.get(this.$http.coinList, { params: {} }).then((res) => {
                    if (res.data.status == 200) {
                        this.canExLists = res.data.data;
                    }
                }).finally(() => {
                    this.loader = false
                })
            },
            go(id, type) {
                if (type == 1) {
                    this.$router.push({ name: 'cb', query: { id } })
                }
                else {
                    this.$router.push({ name: 'tb', query: { id } })
                }
            },
            getLists() {
                this.loader = true;
                this.$http.get(this.$http.ziChan, { params: {} }).then((res) => {
                    if (res.data.status == '200') {
                        this.tableData = res.data.data.asset;
                    }
                }).finally(() => {
                    this.loader = false
                })
            }
        }
    }
</script>
<style lang="less">
    @import "../style.less";
</style>