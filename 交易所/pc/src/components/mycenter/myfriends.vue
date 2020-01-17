<template>
    <div class="basic-info myfriends">
        <div class="info-block">
            <div class="sub-title">
                {{$t('mycenter.myfriends[0]')}}
            </div>
            <el-table style="width:100%" :data="tableData" v-loading="loader">
                <el-table-column prop="realname" label="UID" width="180">
                </el-table-column>
                <el-table-column prop="mail" :label="$t('mycenter.myfriends[1]')">
                </el-table-column>
                <el-table-column prop="reg_time" :label="$t('mycenter.myfriends[2]')">
                </el-table-column>
            </el-table>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                loader: false

            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                this.loader = true;
                this.$http
                    .get(this.$http.my_down, { params: {} })
                    .then(response => {
                        if (response.data.status == "200") {
                            this.tableData = response.data.data.list.map(el => {
                                el.reg_time = this.$public.timestampToTime1(el.reg_time)
                                return el;
                            })
                        }
                    })
                    .catch(function (error) { }).finally(() => {
                        this.loader = false
                    })
            },
        },
    }
</script>
<style lang="less">
    @import "./style.less";
</style>