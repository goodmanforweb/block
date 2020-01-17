<style type="less" lang="less">
    @import './index.less';
    .notice{
        .nolist{
            text-align: center; 
            margin-top: 100px; 
        }
        .blockWarp{
            padding: 20px 0;
            .el-pagination{
                text-align: right;
            }
        }
    }
</style>
<template lang="html">
    <div class="notice">
        <section class="information">
            <h2 class="title"><p>平台公告</p></h2>
            <section class="box" v-if="notice_list.list.length>0">
                <router-link :to="{ path: '/noticelist', query: { id: item.id }}" class="header_logo" v-for="(item,index) in notice_list.list" :key="index">
                    <ul class="main">
                        <li class="list">{{item.title}}</li>
                        <li class="list">{{item.create_time}}</li>
                    </ul>
                </router-link>
            </section>
            <section v-else class="box nolist">
                <span>暂无公告</span>
            </section>

            <div class="blockWarp">

                <el-pagination background layout="prev, pager, next" :total="Number(notice_list.count)" :current-page="p" :page-size="notice_list.size" @current-change="currentchange"> </el-pagination>
               
            </div>
        </section>
    </div>
</template>
<script>
    export default {
        data (){
            return {
                notice_list:"",
                p:1,
            }
        },
        watch:{},
        methods:{
            noticelistData(){
                let _this = this;
                $.post(_this.$http.notice_list,{
                    p:_this.p
                },function(response){

                    _this.notice_list = response.data;
                });
            },
            currentchange(p){
                this.p = p;
                this.noticelistData();

            }
        },
        created(){
            this.noticelistData();
        },
        mounted(){},
        components: {},
    }
</script>