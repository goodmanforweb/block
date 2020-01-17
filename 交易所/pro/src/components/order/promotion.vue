<style lang=less>
@import '../../assets/public.less';
.promotion_main{
	.promotionheader{
		width: 100%;
		height: 650px;
		background-image: url(../../assets/image/promotion.png);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
	}
	.promotion_header_box{
		width: 1280px;
		margin: 0 auto;
		padding: 20px 0;
		.promotion_h1,.promotion_h2{
			text-align: center;
		}
		.promotion_h1{
			margin-top: 260px;
			font-size: 48px;
			color: #c5cce8;
		}
		.promotion_h2{
			margin-top: 50px;
			font-size: 26px;
			color: #c5cce8;
		}
	}
	.promotion{
		width: 1280px;
	    margin: 0 auto;
	    padding: 20px 0;
		.is-always-shadow{
			margin-bottom: 20px;
		}
		.text_box{
			display: flex;
			justify-content: space-between;
			li{
				width: 50%;
				h2{
					margin-bottom: 20px;
				}
			}
			.text_left{
				img{
					width: 260px;
					height: 260px;
				}
			}
			.text_right{
				a{
					display: inline-block;
					margin-top: 5px;
				}
			}
		}
	}
	.pagination{
		margin-top: 20px;
		.el-pagination{
			text-align: right;
		}
	}
}
</style>
<template lang="html">
	<div class="promotion_main">
		<section class="promotion">
			<el-card class="box-card">
			  	<div slot="header" class="clearfix">
			    	<span>{{$t('promotion.mian[0]')}}</span><!-- 我的分享方式 -->
			  	</div>
			  	<div class="text item">
			    	<ul class="text_box">
			    		<li class="text_left">
			    			<h2>{{$t('promotion.mian[1]')}}</h2><!-- 专属二维码 -->
			    			<div>
			    				<img :src="linkurl.qrc">
			    				<!-- <a href="javascript:;" id="downLoad" @click="downloadImg()">{{$t('promotion.mian[2]')}}</a>下载二维码 -->
			    			</div>
			    		</li>
			    		<li class="text_right">
			    			<h2>{{$t('promotion.mian[3]')}}</h2><!-- 专属链接 -->
			    			<el-input v-model="linkurl.url" id="link"></el-input>
			    		</li>
			    	</ul>
			 	 </div>
			</el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="">
            <span style="margin-right: 50px;">{{$t('promotion.Extension[5]')}}</span>
            <!--<span>{{$t('promotion.Extension[1]')}}:{{tableData.today}}</span>-->
          </div>
        </div>
        <div class="text item">
          <ul class="text_box">
            <el-table :data="recordData.list" style="width: 100%" :empty-text="$t('moneyRecord.main[20]')">
              <el-table-column prop="realname" :label="$t('promotion.Extension[2]')" width="460">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="mobile" :label="$t('promotion.Extension[6]')" width="420">
                <template slot-scope="scope">
                  <span>{{scope.row.price}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="reg_time" :label="$t('promotion.Extension[4]')">
                <template slot-scope="scope">
                  <span >{{scope.row.addtime}}</span>
                </template>
              </el-table-column>
            </el-table>
          </ul>
          <div class="pagination">
            <el-pagination background :page-size="Number(recordData.size)" :current-page="Number(recordData.p)" layout="prev, pager, next" :total="Number(tableData.count)" @current-change="handleCurrentChange1"></el-pagination>
          </div>
        </div>
      </el-card>

			<el-card class="box-card">
			  	<div slot="header" class="clearfix">
			    	<div class="">
			    		<span style="margin-right: 50px;">{{$t('promotion.Extension[0]')}}:{{tableData.ttl}}</span>
			    		<span>{{$t('promotion.Extension[1]')}}:{{tableData.today}}</span>
			    	</div>
			  	</div>
			  	<div class="text item">
			    	<ul class="text_box">
			    		<el-table :data="tableData.list" style="width: 100%" :empty-text="$t('moneyRecord.main[20]')">
				      		<el-table-column prop="realname" :label="$t('promotion.Extension[2]')" width="460"></el-table-column>
							<el-table-column prop="mobile" :label="$t('promotion.Extension[3]')" width="420">
								<template slot-scope="scope">
									<span v-if="scope.row.mobile">{{scope.row.mobile}}</span>
									<span v-else>{{scope.row.mail}}</span>
								</template>
							</el-table-column>
				      		<el-table-column prop="reg_time" :label="$t('promotion.Extension[4]')">
				      			<template slot-scope="scope">
									<span >{{$public.timestampToTime(scope.row.reg_time)}}</span>
								</template>
				      		</el-table-column>
				    	</el-table>
			    	</ul>
			    	<div class="pagination">
			    		<el-pagination background :page-size="Number(tableData.size)" :current-page="Number(tableData.p)" layout="prev, pager, next" :total="Number(tableData.count)" @current-change="handleCurrentChange"></el-pagination>
			    	</div>
			 	</div>
			</el-card>
		</section>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				linkurl:{},
				tableData:{},
				prevBool: false,
				nextBool: true,
				pageNum: 1, // 当前页数
				totalPage: 2, // 总页数
        recordData:{},
			}
		},
		methods: {
			handleCurrentChange(val) {
        		this.getdata(val);
      		},
			requestPublic: function() {
				var _this = this;
				_this.$http.post(_this.$http.link, {}).then((res) => {
					if(res.data.status == 200) {
						_this.linkurl = res.data.data;
					};
				});
				_this.getdata('1');
        _this.getrecord('1');
			},
			getdata(num){
				var _this = this;
				_this.$http.post(_this.$http.my_down, {p:num,size:'5'}).then((res) => {
					if(res.data.status == 200) {
						_this.tableData = res.data.data;
					};
				});
			},

      //我的奖励
      handleCurrentChange1(val) {
        this.getrecord(val);
      },

      getrecord(num){
        var _this = this;
        _this.$http.post(_this.$http.my_record, {p:num,size:'5'}).then((res) => {
          if(res.data.status == 200) {
            _this.recordData = res.data.data;
          };
        });
      },

			//下载壁纸到桌面
			downloadImg() {
				var _this = this;
				// this.oDownLoad(this.linkurl.qrc,'_blank');
				// window.open(this.linkurl.qrc)
				//判断浏览器类型
				var image = new Image();
				 // 解决跨域 Canvas 污染问题
				image.setAttribute("crossOrigin", "anonymous");
				image.onload = function() {
				    var canvas = document.createElement("canvas");
				    canvas.width = image.width;
				    canvas.height = image.height;
				    var context = canvas.getContext("2d");
				    context.drawImage(image, 0, 0, image.width, image.height);
				    var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

				    var a = document.createElement("a"); // 生成一个a元素
				    var event = new MouseEvent("click"); // 创建一个单击事件
				    a.download = "KEIEX.png" || "photo"; // 设置图片名称
				    a.href = url; // 将生成的URL设置为a.href属性
				    a.dispatchEvent(event); // 触发a的单击事件
				};
				image.src = this.linkurl.qrc;
			},
			//复制信息
			copy(txt) {
				var _this = this;
				var Url2=document.getElementById("biao1");
				Url2.select(); // 选择对象
				document.execCommand("Copy"); // 执行浏览器复制命令
				console.log(Url2)
				_this.$public.msg("复制成功", 'success', _this);
			},
		},
		created: function() {
			var _this = this;
			_this.requestPublic();

		},
		mounted:function(){
			var _this = this;

		},
		components: {}
	}
</script>
