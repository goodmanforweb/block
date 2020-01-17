<style lang=less>
	@import './mian.less';
	.main.big{
		min-width: 1600px !important;
	}
</style>
<template>
	<div class="main" id="main">
		<HeaDer ref="header" :is-fixed="isFixed"></HeaDer>
		<router-view></router-view>
		<FooTer></FooTer>
	</div>
</template>
<script>
	import Header1 from "./main/header.vue";
	import Footer1 from "./main/footer.vue";
	export default {
		data(){
			return{
				isFixed:true
			}
		},
		methods:{}, 
	  	created(){
			  const _this=this;
	  		if(_this.$cookies.get('language')) {
				_this.$i18n.locale = _this.$cookies.get('language');
			}else {
				_this.$cookies.set("language", 'Chinese', 60 * 60 * 24 * 30);
			}

	  	},
	  	mounted:function(){
				var _this = this;
				if(this.$route.path =='/exchange'){
				$("#main").addClass('big')
		    }
			if(!_this.$cookies.get('changeBg')||_this.$cookies.get('changeBg')=='night') {
				$('#main').removeClass('mainb');
				$('#main').addClass('mainy');
			} else {
				$('#main').removeClass('mainy');
				$('#main').addClass('mainb');
			}
			if(_this.$route.path=='/home'){
				_this.isFixed=true;
			}else{
				_this.isFixed=false;
			}
	  	},
	  	watch:{
		  $route(to,from){
		  	// console.log(to.path);
		    if(to.path =='/exchange'){
				this.isFixed=false;
				$("#main").addClass('big')
		    }else{
		    	this.isFixed=true;
			}
		  }
		},
	  	components:{
		    "HeaDer":Header1,
		    "FooTer":Footer1,
		}
	}
</script>