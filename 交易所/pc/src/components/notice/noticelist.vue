<style type="less" lang="less">
  @import './applymerch.less';
</style>
<template lang="html">
  <div class="applymerch">
      <div class="apply_bannet1">
          <!-- <img src="../../assets/img/gg_banner.png" alt=""> -->
          <div>
            <h5>{{$t('cbanner.main[4]')}}</h5>
            <p>{{$t('cbanner.main[5]')}}</p>
          </div>
      </div>
      <ul class="noticelist">
          <li v-for="(item,index) in ggData" :key="index">
            {{item.title}}
            <span @click="more(item.id)">{{$t('cbanner.main[6]')}}</span>
          </li>
      </ul>
      <el-pagination background layout="prev, pager, next" :total="parseInt(isPage.isCount)" :page-size='isPage.isSize' @current-change="pageChange"></el-pagination>
  </div>
</template>
<script>
  export default {
      data (){
          return {
            ggData:[],
            isPage:{
              isCount:4,  //一共有几页
              isSize:7,  //默认显示几页
              p:1,  //当前页
            },
          }
      },

      methods:{
        pageChange(i) {
				var _this = this;
				_this.getgg(i);

			},
    // 公告
			getgg(i) {
        let _this = this;
        let tradingdata = {
					type:_this.tabPosition,
					size:_this.isPage.isSize,
					p:i
				};
				_this.$http.get(_this.$http.getxtzx, { params:tradingdata}).then((res) => {

          _this.ggData = res.data.data.res;
          _this.isPage.isCount = res.data.data.count;

				});
      },
        more(mo){
          var _this = this;
          _this.$router.push({
						name: 'noticedata',
						query:{
              id: mo
						}
				})
        }
      },
      mounted(){
        
      },
      components: {
          
      },
      created: function () {
			var _this = this;
			_this.getgg();
		},
  }
</script>
<style>
    .noticelist{
      width:1280px;
      margin:40px auto;
      min-height:500px;
    }
    .apply_bannet1{
      height:450px;
      background:url(../../assets/img/gg_banner.png) no-repeat;
      display:flex;
      align-items:center;
    }
    .apply_bannet1 div{
      color:#fff;
      margin-left:320px;
    }
    .apply_bannet1 div h5{
      font-size:40px;
      line-height:80px;
    }
    .apply_bannet1 div p{
      font-size:20px;
    }
    
    .noticelist li{
        width:100%;
        height:90px;
        background:#2b2b2b;
        margin-bottom:20px;
        padding:15px 20px;
        box-sizing:border-box;
        color:#eeeeee;
        font-size:16px;
    }
    .noticelist li span{
      color:#87aaff;
      font-size:16px;
      cursor: pointer;
    }
    .is-background{
      text-align:center;
      padding-bottom: 10px;
    }
</style>