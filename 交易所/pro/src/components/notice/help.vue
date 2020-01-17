<style type="less" lang="less">
    @import './index.less';
    .box{
        color:#fff;
    }
    .on{
            color: @main;
        }
</style>
<template lang="html">
    <div class="help">
        <section class="helpmain">
            <h2 class="h1">{{$t("foter.mian[11]")}}</h2>
            <h3 class="h2">{{$t("foter.mian[12]")}}</h3>
            <section class="helpbox">
                <section class="content">
                    <div class="contentbox" v-show="tradingstatus=='1'">
                        <p v-html="getagree"></p>
                    </div>
                    <div class="contentbox" v-show="tradingstatus=='2'">
                        <p v-html="getagree"></p>
                    </div>
                    <div class="contentbox" v-show="tradingstatus=='3'">
                        <p v-html="getagree"></p>
                    </div>
                    <div class="contentbox" v-show="tradingstatus=='4'">
                        <p v-html="getagree"></p>
                    </div>
                    <div class="contentbox" v-show="tradingstatus=='5'">
                        <p v-html="getagree"></p>
                    </div>
                    <div class="contentbox" v-show="tradingstatus=='6'">
                        <p v-html="getagree"></p>
                    </div>
                    <div class="contentbox" v-show="tradingstatus=='7'">
                        <p v-html="getagree"></p>
                    </div>
                    <!-- <div class="contentbox" v-show="tradingstatus=='8'">
                        <p v-html="getagree"></p>
                    </div> -->
                </section>
                <section class="nav">
                    <ul class="box">
                        <li v-bind:class="tradingstatus=='1' ? 'list on' : 'list'" @click="Tradingstatus('1')">{{$t("foter.mian[4]")}}</li>
                        <li v-bind:class="tradingstatus=='2' ? 'list on' : 'list'" @click="Tradingstatus('2')">{{$t("foter.mian[8]")}}</li>
                        <li v-bind:class="tradingstatus=='3' ? 'list on' : 'list'" @click="Tradingstatus('3')">{{$t("foter.mian[14]")}}</li>
                        <li v-bind:class="tradingstatus=='4' ? 'list on' : 'list'" @click="Tradingstatus('4')">{{$t("foter.mian[16]")}}</li>
                        <li v-bind:class="tradingstatus=='5' ? 'list on' : 'list'" @click="Tradingstatus('5')">{{$t("foter.mian[6]")}}</li>
                        <li v-bind:class="tradingstatus=='6' ? 'list on' : 'list'" @click="Tradingstatus('6')">{{$t("foter.mian[10]")}}</li>
                       <li v-bind:class="tradingstatus=='7' ? 'list on' : 'list'" @click="Tradingstatus('7')">{{$t("ggOrder.other[0]")}}</li>
                    </ul>
                </section>
            </section>
        </section>
    </div>
</template>
<script>
    import surFace from "../notice/surface.vue"; //表格
    export default {
        data (){
            return {
                getagree:{},
                tradingstatus:'1',
                numtype:'',
                islange:'',
            }
        },
        watch:{
            '$route': function (to, from) {
                let _this = this;
                this.$public.scrollTop();
                _this.Tradingstatus(_this.$route.query.type);
                // getagreeData(_this.$route.query.type);
            }
        },
        methods:{
            Tradingstatus(numtype){
                let _this = this;
                _this.islange = _this.$cookies.get("language");

                _this.tradingstatus = numtype;

                if(_this.islange == 'Chinese'){
                    if(numtype == '1'){
                        _this.numtype = 'reg_agree';
                    }else if(numtype == '2'){
                        _this.numtype = 'trans_agree';
                    }else if(numtype == '3'){
                        _this.numtype = 'law_agree';
                    }else if(numtype == '4'){
                        _this.numtype = 'jygz';
                    }else if(numtype == '5'){
                        _this.numtype = 'faq';
                    }else if(numtype == '6'){
                        _this.numtype = 'fxq';
                    }else if(numtype == '7'){
                        _this.numtype = 'vip';
                    }
                }else{
                    if(numtype == '1'){
                        _this.numtype = 'reg_agree1';
                    }else if(numtype == '2'){
                        _this.numtype = 'trans_agree1';
                    }else if(numtype == '3'){
                        _this.numtype = 'law_agree1';
                    }else if(numtype == '4'){
                        _this.numtype = 'jygz1';
                    }else if(numtype == '5'){
                        _this.numtype = 'faq1';
                    }else if(numtype == '6'){
                        _this.numtype = 'fxq1';
                    }else if(numtype == '7'){
                        _this.numtype = 'vip1';
                    }
                }
            

                $.post(_this.$http.get_agree,{type:_this.numtype},function(response){
                    _this.getagree = response.data;
                });
            },
            // getagreeData(num){
            //     let _this = this;
            //     console.log('嘻嘻',num);
            //     _this.tradingstatus = num;
            //     $.post(_this.$http.get_agree,{type:_this.tradingstatus},function(response){
            //         _this.getagree = response.data;
            //     });
            // },
        },
        created(){
            // this.getagreeData(this.$route.query.type);
            this.Tradingstatus(this.$route.query.type);
            this.$public.scrollTop();
        },
        mounted(){},
        components: {
            surFace:surFace
        },
    }
</script>