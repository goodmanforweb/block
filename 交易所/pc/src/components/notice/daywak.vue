<style type="less" lang="less">
    @import './index.less';
</style> 
<template lang="html">
    <div class="wak"> 
        <table> </table>
        <div class="wa">
            <section class="wakmain">
                <div class="wa_left">
                    <img src="../../assets/image/index/sj.png" alt="">
                </div>
                <div class="wa_right">
                    <h5>{{$t('daywak.main[0]')}}</h5>
                    <p class="wa_p1">{{$t('daywak.main[1]')}}</p>
                    <ul>
                        <li>{{$t('daywak.main[2]')}}</li>
                        <li>{{$t('daywak.main[3]')}}</li>
                        <li>{{$t('daywak.main[4]')}}</li>
                    </ul>
                    <p class="wa_p2">{{$t('daywak.main[5]')}}</p>
                    <div class="bbtn">
                            <a href="https://admin.xjqgsp.com/upload/?id=De3184231231" target="_blank">
                        {{$t('daywak.main[6]')}}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
    export default {
        data (){
            return {
                
            }
        },
        watch:{

        },
        methods:{
			// btn(){
			// 	window.location.href = 'https://admin.xjqgsp.com/upload/?id=uu312838354';
			// }
        },
        created(){
          
        },
        mounted(){
            $('.main').addClass('trans')
        },
        beforeDestroy() {
            $('.main').removeClass('trans')
        },
        components: {},
    }
</script>