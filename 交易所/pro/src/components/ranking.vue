<!--  -->
<template>
  <div class="ranking_wrap">
      <div class="ranking">
          <!-- Zeus合约大赛排行榜 -->
          <h1>{{$t('ranking[0]')}}</h1>
          <h4>{{$t('ranking[1]')}}</h4>
          <div class="content">
              <div class="title">
                  <!-- 战队名称&宣言 -->
                  <span>{{$t('ranking[2]')}}</span>
                  <!-- 战队人数 -->
                  <span style="margin-left:130px">{{$t('ranking[3]')}}</span>
                  <!-- 当日收益率 -->
                  <span style="margin-left:10px">{{$t('ranking[4]')}}</span>
                  <!-- 总收益率 -->
                  <span style="margin-right:15px">{{$t('ranking[5]')}}</span>
              </div>
              <div v-for="(item,index) in list" :key="index" class="itme">
                  <div class="rank">
                      <img v-if="rank+index == 1" src="../assets/image/userCenter/NO.1.png" alt="">
                      <img v-else-if="rank+index == 2" src="../assets/image/userCenter/NO.2.png" alt="">
                      <img v-else-if="rank+index == 3" src="../assets/image/userCenter/NO.3.png" alt="">
                      <div v-else>{{rank+index}}</div>
                  </div>
                  <div class="info">
                      <span>{{item.team_name}}</span>
                      <p>{{item.team_describe}}</p>
                  </div>
                  <div class="num">{{item.team_number}}</div>
                  <div class="curDay">{{item.day_earn}}%</div>
                  <div class="total">{{item.total_earm}}%</div>
              </div>

          </div>
          <el-pagination
          background
          layout="prev, pager, next"
          :current-page="pageNum"
          @current-change="getList"
          :page-size="5"
          :total="total">
        </el-pagination>

      </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      list:[],
      pageNum:1,
      curPage:1,
      total:10,
    };
  },
  methods:{
    getList(page) {
      this.pageNum = page
      this.$http.get(this.$http.rank_list, {params:{p:this.pageNum,size:5}}).then((r)=>{
        if(r.data.status == 200){ 
          this.list = r.data.data.list
          this.total = Number(r.data.data.count)
          this.curPage = Number(r.data.data.p)
        }else{ 
          this.$public.msg(r.data.msg,'error',this)
        }
      })
    }
    
  },

  components: {},

  computed: {},

  created() {
    this.getList(1)
  },
  computed:{
    rank() {
      var num = (this.curPage - 1)*5+1
      return num
    }
  }
}

</script>
<style lang=less>
    @import "./ranking.less";
</style>