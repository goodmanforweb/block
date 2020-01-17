<template lang='html'>
<!-- import { setTimeout } from 'timers'; -->
	<section class="exchange_box">
		<ul class="Placeanorder_header_box">
		  	<!-- <li class="Placeanorder_list_header">
		    	<p>{{Marketheader.name}}<span>  </span></p>
		  	</li> --> 
		  	<li class="Placeanorder_list_conent">
				  <!-- {{Marketheader.name.replace("_","/")}} -->
					<!-- <p><span>{{$t('Quotationheader.main[0]')}} {{Marketheader.price}}</span></p> -->
				<p class="name">
					{{Marketheader.code && Marketheader.code.toUpperCase().replace("_","/")}}
				</p>
		    	<p class="cnyprice">
						<!-- <span class="span rise sprice" v-if="Number(Marketheader.change)>0">
							{{Number(Marketheader.price).toFixed(2)}}
						</span>
						<span class="span fall sprice" v-else>
							{{Number(Marketheader.price).toFixed(2)}}
						</span> -->
						<span class="span sprice">
								{{$public.toLowFixed(Marketheader.price,Marketheader.code)}}
						</span>
						<span class="cnyspan">
							 ≈{{Number(Marketheader.cnyPrice).toFixed(2)}} CNY
						</span>
					</p>
				<p>
					<span >
						{{$t('Quotationheader.main[1]')}}
					</span>  
					<span class="changeRate span1 rise" v-if="Number(Marketheader.change)>0">
						+{{Marketheader.changeRate}}
					</span>
					<span class="span1 fall" v-else>
						{{Marketheader.changeRate}}
					</span>
				</p>
				<p>
					<span>
						{{$t('Quotationheader.main[2]')}}
					</span>  
					<span class="span1 high num">
						{{$public.toLowFixed(Marketheader.high,Marketheader.code)}}
					</span>
				</p>
				<p>
					<span>
						{{$t('Quotationheader.main[3]')}}
					</span>  
					<span class="span1 low num">
						{{$public.toLowFixed(Marketheader.low,Marketheader.code)}}
					</span>
				</p>
				<p>
					<span>
						{{$t('Quotationheader.main[4]')}}
					</span>  
					<span class="span1 volume num">
						{{Number(Marketheader.volume).toFixed(4)}}USDT
					</span>
				</p>
		  	</li>
			 <!-- <div class="fr changeWarp">
				  <el-dropdown @command="changeLang">
					<span class="el-dropdown-link">
						 <img src="../../assets/image/index/day.png" v-if="changeBgData == 'd'"/>
						<img src="../../assets/image/index/night.png" v-if="changeBgData == 'n'"/>
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command='d'>{{$t("header.day[0]")}}</el-dropdown-item>
						<el-dropdown-item command='n'>{{$t("header.day[1]")}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			 </div> -->
			

		</ul>
	</section>
</template>
<script>
export default {
  props: ["Marketheader"],
  data() {
    return {
		changeBgData:'d'
	};
  },
  watch: {
		'Marketheader':function(){

		}
	},
  methods: {
    changeLang(url) {
	  this.$cookies.set("lineStatus", url, 60 * 60 * 24 * 30);
	  
	  this.$cookies.set("changeBgHeYue", url, 60 * 60 * 24 * 30);
      this.$router.go(0);
    }
  },
  // 路由改变时
  beforeRouteLeave(to, from, next) {},
  created: function() {
	  if(this.$cookies.get("changeBgHeYue")){
		  this.changeBgData = this.$cookies.get("changeBgHeYue");
	  }
  },
  mounted() {
    // if (this.$cookies.get("lineStatus") == "n") {
    //   // 夜间
    //   setTimeout(function() {
    //     $("#main").removeClass("mainy");
    //   }, 100);
    //   $("#main").addClass("heyuey");
    // } else {
    //   // 白天
    //   $("#main").removeClass("mainy heyuey");
    //   $("#main").addClass("mainb");
	// 	}
  },
  components: {}
};
</script>
<style lang='less'>
.changeWarp{
	padding-right: 50px !important;
	
} 
</style>
