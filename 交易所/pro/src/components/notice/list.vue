<style type="less" lang="less">
    @import './index.less';
</style>
<template lang="html">
    <div class="notice">
        <section class="information">
            <h2 class="title"><router-link to="/notice">平台公告 > </router-link>{{notice.title}}</h2>
            <section class="box" style="margin:30px 0px;">
                <p v-html="notice.content"></p>
            </section>
        </section>
    </div>
</template>
<script>
    export default {
        data (){
            return {
                notice:'',
            }
        },
        watch:{},
        methods:{
            noticeData(){
                let _this = this;
                $.post(_this.$http.notice,{id:_this.$route.query.id},function(response){
                    _this.notice = response.data;
                });
            },
        },
        created(){
            this.noticeData();
            this.$public.scrollTop();
        },
        mounted(){},
        components: {},
    }
</script>