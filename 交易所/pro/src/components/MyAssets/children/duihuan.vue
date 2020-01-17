<style lang=less>
	@import '../../../assets/public.less';
	.duihuan{
		width: 1280px;
		margin: 0 auto;
		padding: 50px 0;
		min-height: 600px;
	}
</style>
<template>
	<div class="duihuan" v-html="requestData">
		
	</div>
</template>
<script>
	export default {
		data() {
			return {
				requestData:''
			}
		},
		methods: {
			duihuan:function(){
				var _this = this;
				_this.$http.get(_this.$http.duihuan, {
						params: {}
					})
					.then((res) => {
						_this.requestData = res.data.data;
						console.log(res.data.data)
					});
				// duihuan
			}
			
		},
		created: function() {
			this.duihuan();
			
			
		},
		
	}
</script>