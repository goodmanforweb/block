<template>
    <div class="basic-info assetdetail">
        <div class="info-block">
            <div class="sub-title">
                {{$t('mycenter.assetdetail[0]')}}
            </div>
        </div>
        <div class="control-tabs" v-loading="loader">
            <div class="c-tab">
                <span>{{$t('mycenter.assetdetail[1]')}}</span>
                <el-radio-group v-model="coin">
                    <!-- <el-radio-button label="all">{{$t('mycenter.assetdetail[2]')}}</el-radio-button> -->
                    <el-radio-button :label="el.pid" v-for="(el, key) in assetLists" :key="key">{{el.pname}}</el-radio-button>
                </el-radio-group>
            </div>
            <div class="c-tab">
                <span>{{$t('mycenter.assetdetail[3]')}}</span>
                <el-radio-group v-model="type">
                    <el-radio-button label="cb">{{$t('mycenter.assetdetail[4]')}}</el-radio-button>
                    <el-radio-button label="tb">{{$t('mycenter.assetdetail[5]')}}</el-radio-button>
                    <el-radio-button label="other">{{$t('mycenter.assetdetail[6]')}}</el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div class="tbb-table-box" v-loading="loading">
            <el-table style="width:100%" :data="recordData1" v-if="type=='cb'">
                <el-table-column prop="chongzhi_url" :label="$t('mycenter.assetdetail[7]')">
                </el-table-column>
                <el-table-column prop="addtime" :label="$t('mycenter.assetdetail[8]')">
                </el-table-column>
                <el-table-column prop="check_time" :label="$t('mycenter.assetdetail[9]')">
                </el-table-column>
                <el-table-column prop="price" :label="$t('mycenter.assetdetail[10]')">
                </el-table-column>
            </el-table>
            <el-table style="width:100%" :data="recordData2" v-if="type=='tb'">
                <el-table-column prop="qianbao_url" :label="$t('mycenter.assetdetail[11]')">
                </el-table-column>
                <el-table-column prop="addtime" :label="$t('mycenter.assetdetail[8]')">
                </el-table-column>
                <el-table-column prop="check_time" :label="$t('mycenter.assetdetail[9]')">
                </el-table-column>
                <el-table-column prop="price" :label="$t('mycenter.assetdetail[12]')">
                </el-table-column>
                <el-table-column prop="state" :label="$t('mycenter.assetdetail[16]')">
                    <template slot-scope="scope">
                            <span v-if="scope.row.state == 1">{{$t('moneyRecord.main[8]')}}</span>
                            <span v-else-if="scope.row.state == 2">{{$t('moneyRecord.main[14]')}}</span>
                            <span v-else-if = "scope.row.state == 3">{{$t('moneyRecord.main[15]')}}</span>
                            <span v-else-if = "scope.row.state == 4">{{$t('moneyRecord.new[1]')}}</span>
                            <span v-else >{{$t('moneyRecord.new[0]')}}</span>
                    </template>
                    </el-table-column>
            </el-table>
            <el-table style="width:100%" :data="recordData3" v-if="type=='other'">
                <el-table-column prop="type" :label="$t('mycenter.assetdetail[13]')">
                </el-table-column>
                <el-table-column prop="addtime" :label="$t('mycenter.assetdetail[14]')">
                </el-table-column>
                <el-table-column prop="price" :label="$t('mycenter.assetdetail[15]')">
                </el-table-column>
            </el-table>
        </div>

        <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="15"
                layout="total, prev, pager, next" :total="totalPage">
            </el-pagination>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                type:'cb',
                coin: 'all',
                assetLists:[],
                recordData1: [],
                recordData2: [],
                recordData3: [],
                pageNum: 1,
                totalPage: 1,
                loading: false,
                loader: false

            }
        },
        computed: {
            pid() {
                return this.coin;
            }
        },
        created() {
            const {pid, type} = this.$route.query;
            this.type = type;
            this.coin = pid;
            this.getAssetLists();
        },
        watch: {
            type: {
                immediate:true,
                handler() {
                    this.reset();
                    this.getAssetRecord();
                }
            },
            coin:{
                immediate:true,
                handler() {
                    this.reset();
                    this.getAssetRecord();
                }
            },
        },
        methods: {
            handleCurrentChange(v) {
                this.pageNum = v;
                this.getAssetRecord();
            },
            reset() {
                this.pageNum = 1
                this.totalPage = 1
                this.loading = false
            },
            getAssetLists() {
                this.loader = true;
                this.$http.get(this.$http.ziChan, {params: {}}).then((res) => {
					if (res.data.status == '200'){
                        this.assetLists = res.data.data.asset;
                        this.$nextTick(() => {
                            this.coin = this.assetLists[0].pid;
                        })
					}
				}).finally(() => {
                    this.loader = false;
                })
            },
            getAssetRecord() {
                if(this.type == 'cb') {
                    this.loading = true;
                    this.chongBit();
                }
                else if(this.type == 'tb') {
                    this.loading = true;
                    this.tiBit();
                }
                else if(this.type == 'other') {
                    this.loading = true;
                    this.alse();
                }
            },
            // 充币记录
			chongBit() {
				this.$http.get(this.$http.moneyDeal, {
						params: {
							type: 'recharge',
							"p": this.pageNum,
							size: 10,
							pid: this.pid
						}
					})
					.then((res) => {
						if(res.data.status == '200') {
							this.recordData1 = res.data.data.map(el => {
                                el.addtime = el.addtime ? this.$public.timestampToTime(el.addtime) : '---';
                                el.check_time = el.check_time ? this.$public.timestampToTime(el.check_time) : '---';
                                return el;
                            });
							this.totalPage = Math.ceil(res.data.data.count / res.data.data.size);
							this.pageNum = res.data.data.p;
						}
						
					}).finally(() => {
                            this.loading = false;
                        })
			},
			// 提币记录
			tiBit() {
				this.$http.get(this.$http.moneyDeal, {
						params: {
							type: 'cash',
							"p": this.pageNum,
							size: 10,
							pid: this.pid
						}
					})
					.then((res) => {
						if(res.data.status == '200') {
							this.recordData2 = res.data.data.map(el => {
                                el.addtime = el.addtime ? this.$public.timestampToTime(el.addtime) : '---';
                                el.check_time = el.check_time ? this.$public.timestampToTime(el.check_time) : '---';
                                return el;
                            });
							this.totalPage = Math.ceil(res.data.data.count / res.data.data.size);
							this.pageNum = res.data.data.p;
						}
						
					}).finally(() => {
                            this.loading = false;
                        })
			},
			//其他
			alse() {
				if(this.pid == "0") {
					this.$http.get(this.$http.caiWu, {
							params: {
								size: 10,
								pid: this.pid,
								p: this.pageNum,
							}
						})
						.then((res) => {
							if(res.data.status == 200) {
							this.recordData3 = res.data.data.map(el => {
                                el.addtime = el.addtime ? this.$public.timestampToTime(el.addtime) : '---';
                                el.check_time = el.check_time ? this.$public.timestampToTime(el.check_time) : '---';
                                el.type = el.type || el.memo;
                                return el;
                            });
							this.totalPage = Math.ceil(res.data.data.count / res.data.data.size);
							this.pageNum = res.data.data.p;
						}
	
						}).finally(() => {
                            this.loading = false;
                        })
					return false;
				}else {
					this.$http.get(this.$http.re_asset, {
						params: {
							"p": this.pageNum,
							size: 10,
							pid: this.pid
						}
					})
					.then((res) => {
						if(res.data.status == 200) {
							this.recordData3 = res.data.data.map(el => {
                                el.addtime = el.addtime ? this.$public.timestampToTime(el.addtime) : '---';
                                el.check_time = el.check_time ? this.$public.timestampToTime(el.check_time) : '---';
                                el.type = el.type || el.memo;
                                return el;
                            });
							this.totalPage = Math.ceil(res.data.data.count / res.data.data.size);
							this.pageNum = res.data.data.p;
						}
						
					}).finally(() => {
                            this.loading = false;
                        })
				}
			},
            go(id, type) {
                if (type == 1) {
                    this.$router.push({ name: 'tb', query: { id } })
                }
                else {
                    this.$router.push({ name: 'tb', query: { id } })
                }
            }
        }
    }
</script>
<style lang="less">
    @import "./style.less";

    .tbb-table-box {
        margin: 20px auto 60px;
    }
    .c-tab {
        .el-radio-button.is-active {
            .el-radio-button__inner {
                
                border-bottom: 2px solid #009dfa
            }
        }
        .el-radio-button {
            .el-radio-button__inner {
                border-radius: 0;
                color:#000;
                border:none;
                box-shadow:none;
                background-color:transparent
            }
            
        }
    }
    
</style>