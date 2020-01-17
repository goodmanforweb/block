<!--高级认证-->
<!--
	身份认证和高级认证的css在identity.less
-->
<style lang=less>
	@import '../../assets/public.less';
	@import './identity.less';
</style>
<template>
	<div class="senior_main">
		<div class="senior_main_title">
			<h2 class="title" @click="go_back">身份认证发地方撒</h2>
			<span>></span>
			<h2>高级认证</h2>
		</div>
		<div class="senior_info">
			<div class="senior_info_header">
				<h2>个人身份高级认证</h2>
			</div>
		</div>
		<div class="senior_cont">
			<ul class="lis_warp">
				
				<li class="lis">
					<div class="title carId">
						<h2>身份证正面照：</h2>
					</div>
					<div class="img carId">
						<img :src="urlcardimg1" v-show="getData.cardimg1"/>
						<img src="../../assets/image/passport-home.png"  v-show="!getData.cardimg1"/>
						<p class="upload upload1"><i class="el-icon-upload2"></i>上传图片</p>
					</div>
					<div class="info carId">
						<span>必须能看清证件号和姓名，支持jpg/png/jpeg 大小不要超过2M</span>
					</div>
				</li>
				<li class="lis">
					<div class="title carId">
						<h2>身份证背面照：</h2>
					</div>
					<div class="img carId">
						<img :src="urlcardimg2" v-show="getData.cardimg2"/>
						<img src="../../assets/image/passport-home.png"  v-show="!getData.cardimg2"/>
						<p class="upload upload2"><i class="el-icon-upload2"></i>上传图片</p>
					</div>
					<div class="info carId">
						<!--<span>必须能看清证件号和姓名，支持jpg/png/jpeg</span>-->
					</div>
				</li>
				<li class="lis shouchiImg">
					<div class="title carId">
						<h2>手持身份证照：</h2>
					</div>
					<div class="img carId">
						<img :src="urlcardimg3" v-show="getData.cardimg3"/>
						<img src="../../assets/image/passport-home.png"  v-show="!getData.cardimg3"/>
						<p class="upload upload3"><i class="el-icon-upload2"></i>上传图片</p>
					</div>
					<div class="info carId">
						<span>请提供一张您手持证件照的照片</span>
						<ul class="info_lis_warp">
							<li>面部清晰可见,无遮挡,无妆容</li>
							<li>完整露出双手双臂</li>
							<li>证件照片及证件号清晰可见</li>
						</ul>
					</div>
				</li>
			</ul>
			<div class="btn_warp" @click="submit()">
				<el-button type="primary" :loading='isloading'>提交审核</el-button>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isloading: false,
				getData: {
					cardimg1: '',
					cardimg2: '',
					cardimg3: ''
				},
				urlcardimg1: 'src/assets/image/passport-home.png',
				urlcardimg2: 'src/assets/image/passport-home.png',
				urlcardimg3: 'src/assets/image/holding-passport.png'
			};
		},
		methods: {
			//点击提交按钮执行事件
			submit() {
				var _this = this;
				for(var key in _this.getData) {
					if(_this.getData[key] == '') {
						_this.$public.msg('请上传三张有效图片', 'warning', _this);
						return false;
					}
				}
				_this.isloading = true;
				_this.$http.post(_this.$http.set_img, _this.getData).then(function(response) {
					if(response.data.status == "200") {
						_this.isloading = false;
						_this.$public.msg(response.data.msg, 'success', _this);
						setTimeout(function() {
							_this.$router.go(-1); //返回上一层
						}, 10)
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			go_back() {
				var _this = this;
				_this.$router.push({
					path: 'authentication'
				}); //返回上一层
			},
			//图片预览执行函数
			uploadcardimg1() {
				var conent = this;
				conent.uploader = WebUploader.create({
					auto: true, // 选完文件后，是否自动上传 
					swf: '../../../static/upload_img/Uploader.swf', // swf文件路径 
					server: conent.$http.upload, // 文件接收服务端 
					pick: ".upload1", // 选择文件的按钮。可选
					// 只允许选择图片文件。 
					accept: {
						title: 'Images',
						extensions: 'jpg,jpeg,png',
						mimeTypes: 'image/jpg,image/jpeg,image/png'
					},
					thumb: {
						type: 'image/jpg,jpeg,png'
					},
					// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
					resize: true,
					fileNumLimit: 8, //限制上传个数
					fileSingleSizeLimit: 2048000 //限制单个上传图片的大小
				});
				// 上传成功
				conent.uploader.on('uploadSuccess', function(file, data) {

					conent.getData.cardimg1 = data.url;
					conent.urlcardimg1 = conent.$http.bases + data.url;
				});

			},
			uploadcardimg2() {
				var conent = this;
				conent.uploader = WebUploader.create({
					auto: true, // 选完文件后，是否自动上传 
					swf: '../../../static/upload_img/Uploader.swf', // swf文件路径 
					server: conent.$http.upload, // 文件接收服务端 
					pick: ".upload2", // 选择文件的按钮。可选
					// 只允许选择图片文件。 
					accept: {
						title: 'Images',
						extensions: 'jpg,jpeg,png',
						mimeTypes: 'image/jpg,image/jpeg,image/png'
					},
					thumb: {
						type: 'image/jpg,jpeg,png'
					},
					// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
					resize: true,
					fileNumLimit: 8, //限制上传个数
					fileSingleSizeLimit: 2048000 //限制单个上传图片的大小
				});
				// 上传成功
				conent.uploader.on('uploadSuccess', function(file, data) {

					conent.getData.cardimg2 = data.url;
					conent.urlcardimg2 = conent.$http.bases + data.url;
				});

			},
			uploadcardimg3() {
				var conent = this;
				conent.uploader = WebUploader.create({
					auto: true, // 选完文件后，是否自动上传 
					swf: '../../../static/upload_img/Uploader.swf', // swf文件路径 
					server: conent.$http.upload, // 文件接收服务端 
					pick: ".upload3", // 选择文件的按钮。可选
					// 只允许选择图片文件。 
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

					conent.getData.cardimg3 = data.url;
					conent.urlcardimg3 = conent.$http.bases + data.url;
				});
			},
		},
		mounted: function() {
			var _this = this;
			_this.uploadcardimg1();
			_this.uploadcardimg2();
			_this.uploadcardimg3();

		}
	}
</script>

<style scoped="scoped">

</style>