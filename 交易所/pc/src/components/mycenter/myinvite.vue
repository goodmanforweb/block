<template>
    <div class="basic-info myinvite">
        <div class="info-block">
            <div class="sub-title">
                {{$t('mycenter.myinvite[0]')}}
            </div>
        </div>
        <div class="invite-banner-box flex v hc">
            <div class="in-ban-text">
                <h1>{{$t('mycenter.myinvite[1]')}}</h1>
                <p>{{$t('mycenter.myinvite[2]')}}</p>
            </div>
        </div>
        <div class="invite-cubes flex hc">
            <div class="invite-cube flex vc">
                <span>
                    <img src="../../assets/img/mykehu.png" alt="">
                </span>
                <div>
                    <p>{{$t('mycenter.myinvite[3]')}}</p>
                    <h4>{{user.ttl || 0}}</h4>
                </div>
            </div>
            <div class="invite-cube flex vc">
                <span>
                    <img src="../../assets/img/shangjin.png" alt="">
                </span>
                <div>
                    <p>{{$t('mycenter.myinvite[4]')}}</p>
                    <h4>{{user.total_yongjin || 0}}</h4>
                </div>
            </div>
        </div>

        <div class="in-fter flex sa">
            <div class="in-ercode-box flex">
                <div class="in-ercode">
                    <img :src="codeData.qrc" alt="" style="object-fit: fill">
                </div>
                <span class="in-hint graycolor f12">{{$t('mycenter.myinvite[5]')}}</span>
            </div>
            <div class="ertext-box">
                <div class="ertext bcr wrap" id="mylink">{{codeData.url}}</div>
                <el-button type="text" ref="copyBtn" data-clipboard-target="#mylink">{{$t('mycenter.myinvite[6]')}}
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import Clipboard from "clipboard";

    export default {
        data() {
            return {
                codeData: {},
                user: {}
            }
        },
        created() {
            this.getData();
            this.getCodeUrl();
        },
        mounted() {
            this.createCopy();
        },
        methods: {
            createCopy() {
                new Clipboard(this.$refs.copyBtn.$el).on("success", e => {
                    this.$message.success(this.$t('mycenter.myinvite[7]'));
                    e.clearSelection();
                });
            },
            getData(i) {
                this.$http
                    .get(this.$http.my_down, { params: {} })
                    .then(response => {
                        if (response.data.status == "200") {
                            this.user = response.data.data;
                        }
                    })
                    .catch(function (error) { });
            },
            getCodeUrl() {
                this.$http
                    .get(this.$http.user_link, { params: {} })
                    .then(response => {
                        this.codeData = response.data.data;
                    })
                    .catch(function (error) { });

            },
        },
    }
</script>
<style lang="less">
    @import "./style.less";
    .ertext {
        max-width: 180px;
    }
    .invite-banner-box {
        height: 120px;
        color: #fff;
        background: url(../../assets/img/tuiguanbanner.png) no-repeat center/cover;

        .in-ban-text {
            padding-left: 80px
        }

        h1 {
            font-weight: bolder;
            font-size: 30px;
            margin-bottom: 12px;
        }
    }

    .invite-cubes {
        margin: 30px auto 60px;
    }

    .invite-cube {
        border: 1px solid rgba(102, 102, 102, 0.1);
        padding: 16px;
        width: 160px;
        border-radius: 6px;
        margin: 20px 10px;

        img {
            width: 20px;
        }

        >div {
            margin-left: 16px;
        }

        p {
            color: #666;
            line-height: 26px;
        }

        h4 {
            color: #333;
            font-weight: bolder;
        }
    }

    .in-fter {
        align-items: flex-end
    }

    .in-ercode-box {
        align-items: flex-end
    }

    .in-ercode {
        img {
            width: 100%;
        }
        width: 100px;
        height: 100px;
        margin-right: 16px;
        background-color: darkblue;

    }

    .ertext-box {
        button {
            padding-bottom: 0
        }
    }
</style>