<template lang="html">
	<section class="MainArea_box">
    	<ul class="MainArea_main" v-if="Marketmain">
      		<li :data_code="item.code" v-for="(item,index) in Marketmain" :key="index" class="MainArea_list" @click="handleClick(item.code)">
        		<p class="MainArea_list_name">{{item.name}}</p>
        		<p class="MainArea_list_jige" v-if="item.change > 0"><span>{{item.price}}</span></p>
        		<p class="MainArea_list_jige" v-else><span>{{item.price}}</span></p>
        		<p class="MainArea_list_fu">{{item.changeRate}}</p>
      		</li>
    	</ul>
    	<ul class="MainArea_main" v-else>
			<p style="text-align: center; padding: 100px 0; color: #999; font-size: 12px;">{{$t('Quotation.main[0]')}}...</p>
    	</ul>
  	</section>
</template>
<script>
	export default {
		props:['Marketmain'],
		data() {
			return {}
		},
		watch: {},
		methods: {
			onSubmit:function(){},
			handleClick:function(enevt){
				var _this = this;
				if(enevt != 'kt_usdt'){
					_this.$emit('modifyfun', enevt);
				}else {
					_this.$message.error(_this.$t('exchangeCoin.Newaddition[2]'));
				};
			},
		},	
		// 路由改变时
		beforeRouteLeave(to, from, next) {
		},
		created: function() {
		},
		components: {}
	}
</script>