<template lang="">

    <div class="mycenter">
        <div class="mc-title">{{$t('mycenter.nav[0]')}}</div>
        <div class="mc-box flex">
            <div class="my-nav">
                <div class="my-nav-block"> 
                    <div class="my-nav-sub-title">
                        {{$t('mycenter.nav[1]')}}
                    </div>
                    <router-link to="/mycenter/basicinfo">{{$t('mycenter.nav[2]')}}</router-link>
                    <router-link to="/mycenter/idvalid">{{$t('mycenter.nav[3]')}}</router-link>
                </div>
                <div class="my-nav-block"> 
                    <div class="my-nav-sub-title">
                        {{$t('mycenter.nav[4]')}}
                    </div>
                    <router-link to="/mycenter/assetinfo">{{$t('mycenter.nav[5]')}}</router-link>
                    <router-link to="/mycenter/tbadress">{{$t('mycenter.nav[6]')}}</router-link>
                    <router-link to="/mycenter/assetdetail">{{$t('mycenter.nav[7]')}}</router-link>
                </div>
                <div class="my-nav-block"> 
                    <div class="my-nav-sub-title">
                        {{$t('mycenter.nav[8]')}}
                    </div>
                    <router-link to="/mycenter/myinvite">{{$t('mycenter.nav[9]')}}</router-link>
                    <router-link to="/mycenter/myfriends">{{$t('mycenter.nav[10]')}}</router-link>
                    <router-link to="/mycenter/mytuiguan">{{$t('mycenter.nav[11]')}}</router-link>
                </div>
            </div>
            <router-view class="flex1 mc-box-view"></router-view>
        </div>
    </div>
</template>

<script>
</script>
<style lang="less">
    .mycenter {
        overflow: hidden;
        border-radius: 10px;
        margin: 60px auto;
        max-width: 1280px;
        .mc-title {
            height: 60px;
            line-height: 60px;
            padding-left: 40px;
            background-color: #e0dfe8;
            font-weight: bold;
            color:#333;
            font-size: 24px;
        }
    }
    .my-nav {
        width: 130px;
        padding-left: 40px;
        padding-bottom: 80px;
        background-color: #f5f4fb;
    }
    .mc-box-view {
        padding: 30px 40px;
        background-color: #fff;
    }
.my-nav-block {
    >div {
        font-weight: bold;
        color:#333;
        font-size: 20px;
        margin: 20px 0;
    }
    a {
        display: block;
        color:#637282;
        line-height: 50px;
    }
    a.router-link-active,a:hover {
        color: #009dfa;
        font-weight: bolder
    }
}
</style>