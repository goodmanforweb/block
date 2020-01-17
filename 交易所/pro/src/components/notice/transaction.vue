<style type="less" lang="less">
    @import './index.less';
    .nav{
        .on{
            color: #357ce1;
        }

    }
</style>
<template lang="html">
    <div class="help">
        <section class="helpmain">
            <h2 class="h1">{{$t("header.navlist[9]")}}</h2>
            <!-- <h3 class="h2">我们的客服团队时刻准备为您服务！ 您可以24/7全天候联系我们</h3> -->
            <section class="helpbox">
                <p v-html="getagree.trans_wk"></p>
            </section>
        </section>
    </div>
</template>
<script>
    export default {
        data (){
            return {
                getagree:{},
            }
        },
        watch:{

        },
        methods:{
          getagreeData(){
                let _this = this;
                $.post(_this.$http.get_agree,{},function(response){
                    console.log(response)
                    _this.getagree = response.data;
                });
            },
        },
        created(){
          this.getagreeData();
        },
        mounted(){},
        components: {},
    }
</script>