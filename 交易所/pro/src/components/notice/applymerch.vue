<style type="less" lang="less">
    @import './applymerch.less';
</style>
<template lang="html">
    <div class="applymerch">
        <div class="apply_bannet">
            <div>
                <h5>{{$t('cbanner.main[0]')}}</h5>
                <p>{{$t('cbanner.main[1]')}}</p>
            </div>
        </div>
        <div class="apply_center">
            <p v-html="getagree"></p>
            <div class="apply_statement">
            <p>
                {{$t('applymerch.main[0]')}}
            </p>
            <p>
                {{$t('applymerch.main[1]')}}
            </p>
            </div>
        </div>
        
    </div>
</template>
<script>
    import surFace from "../notice/surface.vue"; //表格
    export default {
        data (){
            return {
              getagree:{},
              numtype:''
            }
        },

        methods:{
            
          sqss(){
                let _this = this;
                _this.islange = _this.$cookies.get("language");
                if(_this.islange == 'Chinese'){
                    _this.numtype = 'sqss';
                }else{
                    _this.numtype = 'sqss1';
                }
                $.post(_this.$http.get_agree,{type:_this.numtype},function(response){
                    _this.getagree = response.data;
                });
            },
        },
        created(){
          
        },
        mounted(){
          this.sqss();
          this.$public.scrollTop();
        },
        components: {
            
        },
    }
</script>