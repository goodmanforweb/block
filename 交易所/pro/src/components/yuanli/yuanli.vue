<style lang=less>
	@import '../../assets/public.less';
	@import './yuanli.less';
</style>
<template>
	<div class="yuanli">
      <div class="yuanli_center">
          <div class="yuanli_title">
            <p>{{$t("yuanli.mian[0]")}}</p>
            <p>{{$t("yuanli.mian[1]")}}:{{force}}</p>
          </div>
          <div class="list_top">
            <div class="div_1">{{$t("yuanli.mian[2]")}}</div>
            <div class="div_2">{{$t("yuanli.mian[3]")}}</div>
            <div class="div_3">{{$t("yuanli.mian[4]")}}</div>
        </div>
        <ul class="list_cen">
            <li v-for="(item,index) in ylData" :key="index">
              <p class="p_1" v-if="item.type == 0">{{$t("yuanli.mian[5]")}}</p>
              <p class="p_1" v-if="item.type == 1">{{$t("yuanli.mian[6]")}}</p>
              <p class="p_1" v-if="item.type == 2">{{$t("yuanli.mian[7]")}}</p>
              <p class="p_1" v-if="item.type == 3">{{$t("yuanli.mian[8]")}}</p>
              <p class="p_2" v-if="item.type == 2">{{item.nums}}</p>
              <p class="p_2" v-else>+{{item.nums}}</p>
              <p class="p_3">{{item.time}}</p>
            </li>
        </ul>
      </div>

	</div>
</template>
<script>

	export default {
		data() {
			return {
        ylData:[],
        force:''
			}
		},
		methods: {
			getyl(){
				let _this = this;
				_this.$http.get(_this.$http.yuanlimingxi, {params:{}}).then((res) => {
						_this.ylData = res.data.data.data;
					});
      },
      getUserData() {
        var _this = this;
        _this.$http.post(_this.$http.user_info, {})
          .then(function (response) {
            _this.force = response.data.data.force;
          })
          .catch(function (error) { });
      },
		},
		created: function() {
			var _this = this;
      _this.getyl();
      _this.getUserData();
		},

	}
</script>