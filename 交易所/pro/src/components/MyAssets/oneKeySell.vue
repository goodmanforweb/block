<style lang=less>
        @import '../../assets/public.less';
        @import './oneKey.less';
    </style>
    <template> 
        <div class="oneKey">
            <div class="oneKey_title">
                <div class="title">
                    <h2>{{$t('zeusBi.cb[1]')}}</h2>
                    <h6>{{$t('zeusBi.cb[2]')}}</h6>
                </div>
                <div class="info">
                    <div class="item">
                        <h6>{{$t('zeusBi.cb[3]')}}</h6>
                        <p>
                                {{$t('zeusBi.cb[4]')}}:<span class="green">{{Data.price}}CNY</span>
                        </p>
                    </div>
                    <div class="river"></div>
                    <div class="item">
                            <h6> {{$t('zeusBi.cb[5]')}}</h6>
                            <p>
                                {{Data.shop_num}} {{$t('zeusBi.cb[6]')}}:<span class="saveYourLife"> {{$t('zeusBi.cb[7]')}}</span>
                            </p>
                        </div>
                </div>
            </div>
            <div class="oneKey_form">
                    <el-form :model="buyData" label-position="top" ref="form" label-width="100px" class="from">
                            <el-form-item
                              :label="$t('zeusBi.cb[8]')"
                              prop="total_price"
                              :rules="[{ required: true, message: $t('zeusBi.cb[9]'), trigger: 'blur' },]"
                            >
                              <el-input class="iptPrice" type="age" :placeholder="`${$t('zeusBi.cb[10]')}${min} ${$t('zeusBi.cb[11]')}，${$t('zeusBi.cb[12]')}${max}${$t('zeusBi.cb[11]')}`" v-model="buyData.total_price" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item
                              :label="$t('tiBit.main[7]')"
                              prop="total_num"
                            >
                              <el-input class="iptNums" type="age" :disabled="true" v-model="buyData.total_num" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item  :label="$t('security.pay[0]')">
                                <div class="payList" v-for="(item,index) in payList">
                                    <div v-if="item.type == 'alipay'">
                                        <p>
                                                <img style="color:#357CE1; margin-right:5px" class="icon iconfont icon-zhifubao alipay" src="" alt="">
                                                {{item.number}}
                                        </p>
                                    </div>
                                    <div v-if="item.type == 'wx'">
                                        <p>
                                                <img style="color:#41C88A;margin-right: 5px" class="icon iconfont icon-weixin wx" src="" alt="">
                                                {{item.number}}
                                        </p>
                                    </div>
                                    
                                    <div v-if="item.type == 'backcard'">
                                        <p>
                                            <img style="color:#FFAC29;margin-right: 7px" class="icon iconfont icon-yinhangka car" src="" alt="">
                                            {{$t('back_card.main[3]')}}&nbsp;&nbsp; {{item.number}}&nbsp;&nbsp; {{item.bank}}&nbsp;&nbsp; {{item.branch}}
                                        </p>
                                    </div>
                                </div>


                                <div v-if="payList.length>3" @click="$router.push({path:'/security'})" style="cursor: pointer;color:#2A64F3;text-align: center;margin-top: 10px">{{$t('buy.main[7]')}}</div>
                            </el-form-item>

                            <el-form-item>
                              <el-button :loading="loading" class="btn-submit" type="primary" @click="submitForm('form')">{{$t('buy.header[2]')}}</el-button>
                            </el-form-item>
                          </el-form>

            </div>
            <div class="oneKey_table">
                    <h2>{{$t('buy.header[3]')}}</h2>
                    <el-table :data="requestData1" style="width: 100%" height="600">
                        <template slot="empty">
                            {{$t("cbanner.main[9]")}}
                        </template>
                        <el-table-column prop="order_num" :label="$t('fbOrder.main[1]')" width="220">
                        </el-table-column>
                        <el-table-column prop="add_time" :label="$t('fbOrder.main[2]')" width="220">
                            <template slot-scope="scope">
                                <div>{{ $public.timestampToTime(scope.row.add_time) }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" :label="$t('fbOrder.main[3]')">
                        </el-table-column>
                        <el-table-column prop="total_num" :label="$t('fbOrder.main[4]')">
                        </el-table-column>
                        <el-table-column prop="total_price" :label="$t('fbOrder.main[5]')">
                        </el-table-column>
                        <!-- <el-table-column prop="sxfee" label="手续费">
                        </el-table-column> -->
                        <!-- <el-table-column :label="$t('fbOrder.main[6]')">
                            <template slot-scope="scope">
                                <div>--</div>
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="status" :label="$t('fbOrder.main[7]')">
                            <template slot-scope="scope">
                                <div v-if="scope.row.status == 1" >{{$t('fbOrder.main[8]')}}</div>
                                <div v-if="scope.row.status == 2">{{$t('fbOrder.main[9]')}}</div>
                                <div v-if="scope.row.status == 3">{{$t('fbOrder.main[10]')}}</div>
                                <div v-if="scope.row.status == 4">{{$t('fbOrder.main[11]')}}</div>
                                <div v-if="scope.row.status == 5">{{$t('fbOrder.main[12]')}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="id" :label="$t('fbOrder.main[13]')">
                            <template slot-scope="scope">
                                <el-button type="primary" plain size="small" @click="linkOrdersFun(scope.row)">
                                    <span>{{$t('fbOrder.main[14]')}}</span>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                  <el-pagination
                  layout="prev, pager, next"
                  :total="Number(total)"
                  :page-size="5"	
                  :current-page="Number(page)"
                  @current-change="changePage"	
                  >
                </el-pagination>
            </div>
            <!-- // 资金密码 -->
            <el-dialog
            :title="$t('zeusBi.tb[4]')"
            :visible.sync="dialogVisible"
            width="350px"
            >
            <el-input type="password"  v-model="tpwd" placeholder=""></el-input>
            <span slot="footer" class="dialog-footer">

                <el-button @click="dialogVisible = false">{{$t('frenchDetails.main[23]')}}</el-button>
                <el-button type="primary" @click="submitBuy">{{$t('frenchDetails.main[24]')}}</el-button>
            </span>
            </el-dialog>
        </div>
    </template>
    <script>
        export default {
            data() {
                return {
                    tpwd:"",
                    max:"",
                    min:"",
                    page:1,
                    total:'',
                    loading:false,
                    Data:{},
                    dialogVisible:false,
                    // order:"",
                    payList:[],
                    buyData:{
                        total_price:"",
                        total_num:"",
                    },
                    requestData1: [],

                }
            },
            watch: {
                "buyData.total_price"(n,o) {
                    if(isNaN(Number(n))){
                        this.buyData.total_price = o
                        return false
                    }
                    this.buyData.total_num = Number(this.$public.Division(Number(this.buyData.total_price), Number(this.Data.price))).toFixed(4)
                    console.log(this.buyData.total_num);
                    
                }
            },
            created() {
                // 获取订单信息
                this.$http.post(this.$http.one_key_order,{}).then(r=>{
                    if(r.data.status=="200"){
                        this.Data = r.data.data
                        this.max =  r.data.data.max_price
                        this.min =  r.data.data.min_price
                    }else{
                        this.$public.msg(r.data.msg,"error",this)
                    }
                }).catch(r=>{
                    console.log(r);
                })
                // 获取支付方式
                this.$http.post(this.$http.pay_list,{}).then(r=>{
                    if(r.data.status=="200"){
                        this.payList = r.data.data
                    }else{
                        this.$public.msg(r.data.msg,"error",this)
                    }
                }).catch(r=>{
                    console.log(r);
                })

                this.requestPublic('requestData1','getFbMx_pmma');
            },
            methods: {
                changePage(page){
                    this.page = page
                    this.requestPublic('requestData1','getFbMx_pmma');
                },
                linkOrdersFun:function (res) {
                    var _this = this;
                    var data = {};
                    data.data = res;
                    _this.$router.push({path: '/frenchorder'});
                    window.sessionStorage.order = escape(JSON.stringify(data));
                },
                requestPublic(status,url) {
                    var _this = this;
                    _this.$http.get(_this.$http[eval('url')], {params: {
                        size:Number(5),
                        p:Number(this.page)
                    }})
                    .then((res) => {
                        _this[eval('status')] = res.data.data.res;
                        _this.total = res.data.data.count
                    });
                },
                submitBuy() {
                    var _this = this
                    if(this.tpwd == ""){
                        this.$public.msg('请输入资金密码', 'error',this)
                        return
                    }
                    this.dialogVisible = false
                    this.loading = true
                    var sendData = {
                        type : 1,
                        tpwd : _this.tpwd,
                        order_no : _this.Data.order_no,
                        ..._this.buyData
                    }
                    this.$http.post(this.$http.create_order, sendData).then(r=>{
                        this.loading = false
                        if(r.data.status == "200"){
                            this.$public.msg(r.data.msg,'success',this)
                            window.sessionStorage.order = escape(JSON.stringify(r.data));
                            this.$router.push({path:"/frenchorder"})

                        }else{
                            this.$public.msg(r.data.msg,'error',this)
                        }
                    }).catch(r=>{
                        this.loading = false
                    })


                },
                submitForm(form) {
                    this.$refs[form].validate(valid=>{
                        if(valid){
                            this.dialogVisible = true
                        }
                    })
                    
                }
            }

        }
    </script>