<style lang=less>
	@import '../../../assets/public.less';
	@import '../security.less';
	.image{
		width: 50px;
		height: 50px;
	}
	.getData.ali_img{
		width: 200px;
		height: 200px;
	}
	.back_card_main{
		.el-message-box{
			.el-message-box__title{
				span{
					color: #666666 !important;
				}
			}
		}
	}
</style>
<template>
	<div class="back_card_main">
		<el-form :model="getData" :label-position="labelPosition" status-icon :rules="rules2" ref="getData" label-width="20%" class="demo-ruleForm">
			<!-- <el-form-item :label="$t('alipay.main[0]')" prop="name">
				<el-input type="text" v-model="getData.name" auto-complete="off" :disabled="true">
				</el-input>
			</el-form-item> -->
			<el-form-item :label="$t('alipay.main[1]')" prop="alipay">
				<el-input type="text" v-model="getData.alipay" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item :label="$t('alipay.main[2]')" prop="ali_img">
				<div class="erweima" style="border:1px solid #dcdfe6;border-radius: 3px;">
					<div class="img_warp">
						<el-popover placement="right" width="320" trigger="hover">
							<img  class="getData ali_img" v-if="getData.ali_img" :src="urlImg" width="320">
							<i slot="reference">
								<img class="getData ali_img" v-if="getData.ali_img" :src="urlImg">
							</i>
						</el-popover>
						<img class="image" v-if="!getData.ali_img" src="../../../assets/img/scewm-icon.png">
						<p class="imgUp">{{$t('alipay.main[3]')}}</p>
					</div>
				</div>
			</el-form-item>
			<el-form-item :label="$t('alipay.main[4]')" prop="tpwd">
				<el-input type="password" v-model="getData.tpwd" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<div class="el-message-box__btns" tyle="margin-top: 15px;overflow: hidden;padding-right: 0">
			<button type="button" class="el-button el-button--default el-button--small el-button--primary btns " style="background: #2A64F3; border: none;" @click="submitForm()">
				<span>{{$t('security.one[0]')}}</span>
			</button>
			<button type="button" class="el-button el-button--default el-button--small btns btn-cancel " @click="gohistory">
				<span>{{$t('security.one[1]')}}</span>
			</button>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			var _this = this;
			var name = (rule, value, callback) => {
				if(!value) {
					return callback(new Error(_this.$t('alipay.script[0]')));
				} else {
					callback();
				}
			};
			var alipay = (rule, value, callback) => {
				if(!value) {
					callback(new Error(_this.$t('alipay.script[1]')));
				} else {
					callback();
				}
			};
			var tpwd = (rule, value, callback) => {
				if(!_this.$public.pwd(value)) {
					callback(new Error(_this.$t('alipay.script[2]')));
				} else {
					callback();
				}
			};
			return {
				labelPosition: 'right', //插件自带
				uploader: "", //创建图片上传
				urlImg: '',
				getData: {
					act: '', //添加
					id: '',
					type: '', //类型
					name: '', //姓名
					alipay: '', //支付宝账号
					tpwd: '', //资金密码
					ali_img: '' //er二维码
				},
				rules2: {
					name: [{
						validator: name,
						trigger: 'blur'
					}],
					alipay: [{
						validator: alipay,
						trigger: 'blur'
					}],
					tpwd: [{
						validator: tpwd,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm() {
				var _this = this;
				if(!_this.getData.name) {
					_this.$public.msg(_this.$t('alipay.script[3]'), 'warning', _this);
					return false;
				} else if(!_this.getData.alipay) {
					_this.$public.msg(_this.$t('alipay.script[4]'), 'warning', _this);
					return false
				} else if(!_this.$public.pwd(_this.getData.tpwd)) {
					_this.$public.msg(_this.$t('alipay.script[5]'), 'warning', _this);
					return false
				}
				if(_this.getData.ali_img == '') {
					_this.$public.msg(_this.$t('alipay.script[6]'), 'warning', _this);
					return false
				}
				var pcAddPayWay = {
						act: _this.getData.act,
						type: 'alipay',
						tpwd: _this.getData.tpwd,
						alipay: _this.getData.alipay,
						ali_img: _this.getData.ali_img,
						pal_account: _this.getData.alipay,
					};
				//请求接口
				_this.$http.post(_this.$http.pay_add, pcAddPayWay).then(function(response) {
					if(response.data.status == "200") {
						_this.$public.msg(response.data.msg, 'success', _this);
						_this.$public.go('/security?flat=ok',10,_this); 
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			uploadImg() {
				var conent = this;
				conent.uploader = WebUploader.create({
					auto: true, // 选完文件后，是否自动上传 
					swf: '../../../static/upload_img/Uploader.swf', // swf文件路径 
					server: conent.$http.upload, // 文件接收服务端 
					pick: ".imgUp", // 选择文件的按钮。可选
					accept: {
						title: 'Images',
						extensions: 'jpg,jpeg,png',
						mimeTypes: 'image/jpg,image/jpeg,image/png'
					},
					thumb: {
						type: 'image/jpg,jpeg,png'
					},
					// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
					resize: false,
					fileNumLimit: 8, //限制上传个数
					fileSingleSizeLimit: 2048000 //限制单个上传图片的大小
				});
				// 上传成功
				conent.uploader.on('uploadSuccess', function(file, data) {

					conent.getData.ali_img = data.data.url;
					conent.urlImg =  data.data.server_url;

				});
			},
			getEdit() {
				var _this = this;
				_this.$http.post(_this.$http.pay_edit, {
					id: _this.getData.id,
					type: _this.getData.type
				}).then(function(response) {
					if(response.data.status == "200") {
						_this.getData.name = response.data.data[0].name;
						_this.getData.alipay = response.data.data[0].alipay;
						_this.getData.ali_img = response.data.data[0].ali_img;
						_this.urlImg =_this.$http.bases+response.data.data[0].ali_img;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			init() {
				var _this = this;
				_this.uploadImg();
				_this.getData.type = _this.$route.query.type //类型
				_this.getData.id = _this.$route.query.id //类型
				if(_this.$route.query.id == undefined) {
					_this.getData.name = sessionStorage.name;
					_this.getData.act = 'add';
				} else {
					_this.getData.act = 'edit';
					_this.getEdit();
				}
				
				
			},
			gohistory() {
				this.$router.push({ path: '/security', query: { flat: 'ok' } });
			}
		},
		mounted: function() {
			var _this = this;
			_this.init();
		},
	}
</script>