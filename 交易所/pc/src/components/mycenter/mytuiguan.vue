<template>
    <div class="basic-info mytuiguan">
        <div class="info-block">
            <div class="sub-title">
                {{$t('mycenter.mytuiguan[0]')}}
            </div>
            <el-table style="width:100%" :data="tableData">
                <el-table-column prop="user_down_id" label="UID" width="180">
                </el-table-column>
                <el-table-column prop="mobile" :label="$t('mycenter.mytuiguan[1]')">
                </el-table-column>
                <el-table-column prop="fee_yongjin" :label="$t('mycenter.mytuiguan[2]')">
                </el-table-column>
                <el-table-column prop="add_time" :label="$t('mycenter.mytuiguan[3]')">
                </el-table-column>
            </el-table>

            <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="15"
                layout="total, prev, pager, next" :total="totalPage">
            </el-pagination>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                totalPage: 1,
                pageNum: 1,
                loader: false

            }
        },
        created() {
            this.getBrokerCommission();
        },
        methods: {
            handleCurrentChange(v) {
                this.pageNum = v;
                this.getBrokerCommission();
            },
            //获取佣金信息
            getBrokerCommission() {
                this.loader = true;
                this.$http
                    .get(this.$http.getyjlists, { params: { p: this.pageNum } })
                    .then(response => {
                        if (response.data.status == "200") {
                            this.tableData = (response.data.data.res || []).map(el => {
                                el.add_time = this.$public.timestampToTime1(el.add_time);
                                return el;
                            })
                            this.totalPage = Number(response.data.data.count);
                        }
                    })
                    .catch(function (error) { }).finally(() => {
                        this.loader = false
                    })
            }
        },
    }
</script>
<style lang="less">
    @import "./style.less";
</style>