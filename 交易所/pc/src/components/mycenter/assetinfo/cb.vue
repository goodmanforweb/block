<template>
    <div class="basic-info assetinfo cbbox">
        <div class="info-block">
            <div class="sub-title">
                {{$t('mycenter.cb[0]')}}
            </div>
        </div>
        <el-form style="width: 60%" label-position="top"  status-icon 
            label-width="100px" @submit.native.prevent>
            <el-form-item :label="$t('mycenter.cb[1]')" >
                <el-select style="width:100%" v-model="form.pid">
                    <el-option v-for="(el, key) in lists" :key="key" :label="el.pname" :value="el.pid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="text">{{$t('mycenter.cb[2]')}}</el-button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-button type="text" @click="open5">{{$t('mycenter.cb[3]')}}</el-button>
                <el-row>
                    <el-input class="cb-input" :value="cb.url" :diabled="true"></el-input>
                </el-row>
            </el-form-item>
            <el-form-item>
                <!-- <el-button style="width: 120px">{{$t('mycenter.cb[4]')}}</el-button> -->
            </el-form-item>
        </el-form>
        <div class="check-record-link f14">
            <router-link :to="{name:'assetdetail',query: {pid: form.pid, type:'cb'}}">{{$t('mycenter.cb[5]')}}</router-link>
        </div>


        <div class="hint-box">
            <h4 class="bcr fw">{{$t('mycenter.cb[6]')}}</h4>
            <p>{{$t('mycenter.cb[7]')}}</p>
            <p>{{$t('mycenter.cb[8]')}}</p>
            <p>{{$t('mycenter.cb[9]')}}</p>
            <p>{{$t('mycenter.cb[10]')}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                lists: [],
                form: {
                    pid: ''
                },
                cb: {}
            }
        },
        created() {
            this.form.pid = this.$route.query.id+'';
            this.getLists();
        },
        watch: {
            'form.pid': {
                immediate: true,
                handler() {
                    this.getCBInfo();
                }
            }
        },
        methods: {
            open5() {
                const qrc = this.cb.qrc;
                var urls = this.$http.bases;
                if (!qrc) return;
                this.$alert(
                    '<div class="cbCodeDiv"><img class="codeImg" src="' +
                    urls + qrc +
                    '" alt="" /></div>',
                    this.$t('chongBit.main[5]'),
                    {
                        dangerouslyUseHTMLString: true,
                        callback: action => { }
                    }
                )
            },
            getLists() {
                this.loader = true;
                this.$http.get(this.$http.ziChan, { params: {} }).then((res) => {
                    if (res.data.status == '200') {
                        this.lists = res.data.data.asset;
                        
                    }
                }).finally(() => {
                    this.loader = false
                })
            },
            getCBInfo() {
                if (!this.form.pid) return;
                this.$http
                    .get(this.$http.goPay, {
                        params: {
                            pid: this.form.pid
                        }
                    })
                    .then(res => {
                        this.cb = res.data.data
                    })
            },
            go(id, type) {
                if (type == 1) {
                    this.$router.push({ name: 'cb', query: { id } })
                }
                else {
                    this.$router.push({ name: 'tb', query: { id } })
                }
            }
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