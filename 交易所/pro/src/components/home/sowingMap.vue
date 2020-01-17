<template lang="html">
	<section class="banners">
		<!-- <div class="inner">
			<div class="right">
				<img src="../../assets/image/index/indexsj.png">
			</div>
			<div class="left">
				<h3>{{$t("zeusHome.zeusSowingMap[0]")}}</h3>
				<p>{{$t("zeusHome.zeusSowingMap[1]")}}</p>
				<p>{{$t("zeusHome.zeusSowingMap[2]")}}</p>
				<p>{{$t("zeusHome.zeusSowingMap[3]")}}</p>
					<div class="btn">
						<a href="https://www.baidu.com" target="_blank">
								{{$t("zeusHome.zeusSowingMap[4]")}}
						</a>
						<a href="https://www.baidu.com" target="_blank">
								{{$t("zeusHome.zeusSowingMap[5]")}}
						</a>
					</div>
			</div>

		</div> -->

		<!-- 宙斯项目 -->
		<div class="zeus-c">
			<p class="title">{{$t("zeusHome.zeusUpdateHome[10]")}}</p>
			<ul class="item">
				<li class="list">
					<p class="list-desc">{{$t("zeusHome.zeusUpdateHome[11]")}}</p>
					<p class="list-desc">{{$t("zeusHome.zeusUpdateHome[12]")}}</p>
					<p class="list-desc">{{$t("zeusHome.zeusUpdateHome[13]")}}</p>
					<div class="btn">
						<a :href="$http.appDownload" target="_blank">
								{{$t("zeusHome.zeusSowingMap[5]")}}
						</a>
						<a :href="$http.appDownload" target="_blank">
								{{$t("zeusHome.zeusSowingMap[4]")}}
						</a>
					</div>
				</li>
				<li class="list">
					<img src="../../assets/img/pnone-map.png" class="img">
				</li>
			</ul>
		</div>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				link:'',
				slideDataArr: [],
				publicSrc: '',
				androidSrc: '',
				iosSrc: ''
			}
		},
		methods: {
			// btn(){
			// 	window.location.href = 'https://admin.xjqgsp.com/upload/?id=uu312838354';
			// }
			// 版本号
			getVersion() {
				this.$http.post( this.$http.version, { version: '3.0', type: '1' } ).then((res) => {
					// console.log('zzz',res)
				})
			}
		},
		created: function() {
			this.getVersion()
			var _this = this;
			_this.publicSrc = _this.$http.bases;
			_this.$http.get(_this.$http.publicData, {params: {}})
				.then((res) => {
					_this.slideDataArr = res.data.data.slide;
				});
			_this.$http.get(_this.$http.getlink, {params: {}})
			.then((res) => {
				_this.link = res.data.data;
			});
		},
	}
</script>
<style lang='less' scoped>
	.banners{
		min-width: 1280px;
		position: relative;
		/*padding:210px 0 150px 0;*/
		/* height:1102px; */
		/* padding-top:54px; */
		// background: #0C0C11FF;
		background: rgba(24, 27, 41);
		color: #ededef;
		.zeus-c {
			width: 1280px;
			margin: 0 auto;
			padding-bottom: 82px; 
			.title {
				margin-bottom: 40px;
				font-size: 36px;
				text-align: center;
				font-family: "Microsoft YaHei";
				color: rgb( 255, 255, 255 );
				font-weight: bold;
			}
			.item {
				width: 100%;
				overflow: hidden;
				.list {
					float: left;
					.list-desc {
						padding-top: 19px;
						font-size: 15px;
						font-family: "Microsoft YaHei";
						color: rgb( 255, 255, 255 );
					}
					.img {
						width: 100%;
						vertical-align: middle;
					}
				}
				.list:first-child {
					width: 45%;
					padding-top: 60px;
				}
				.list:last-child {
					width: 55%;
				}
			}
		}
	}
	.banners .inner{
		width: 1280px;
		margin: 0px auto;
		padding: 250px 0;
		overflow: hidden;
		/* padding-top: 180px; */
		display:flex;
		justify-content:space-between;
		position: relative;
	}
	.banners .inner .left{
		width: 480px;
		height: 371px;
	}
	.banners .inner .right{
		/* float: left; */
		width:761px;
		height:371px; 
		background: url('../../assets/image/index/ditu.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.banners .inner .right>img{
		position: absolute;
		left: -5px;
		top: 46px;
	}
  .banners .inner .left>img{
    margin-top:60px;
  }
	.banners .inner .left h3{
		font-size:42px;
		color: #ffffff;
		line-height:70px;
	}
	.banners .inner .left p{
		font-size:18px;
		color:#bbbbbb;
		/* margin-top:100px; */
		/* color: #ffffff; */
		line-height:40px;
	}
	.btn{
		//  :first-child{
		// 	display:inline-block;
		// 	width:180px;
		// 	height:48px;
		// 	background-size:100% 100%;
		// 	text-align:center;
		// 	line-height:48px;
		// 	cursor: pointer;
		// 	font-size:20px;
		// 	color:#fff;
		// 	margin-top:80px;
		// }
		// :last-child{
		// 	display:inline-block;
		// 	width:176px;
		// 	height:48px;
		// 	text-align:center;
		// 	background:url('../../assets/image/index/007.png') no-repeat;
		// 	line-height:44px;
		// 	cursor: pointer;
		// 	font-size:20px;
		// 	color:#fff;
		// 	margin-top:80px;
		// 	margin-left: 20px;
		// 	border: 2px solid #808082FF;
		// 	border-radius: 40px;
		// }
		:first-child{
			margin: 0;
			background: rgba(255, 165, 25);
		}
		a {
			background: rgba(42, 100, 242);
			display:inline-block;
			width:176px;
			height:48px;
			text-align:center;
			line-height:44px;
			cursor: pointer;
			font-size:20px;
			color:#fff;
			margin-top:80px;
			margin-left: 20px;
			border-radius: 40px;
		}
	}
	.inner .left ul{
		margin-bottom: 30px;
	}
	.inner .left ul li{
		height: 28px;
		line-height: 28px;
		font-size: 14px;
		color: #eeeeee;
		&:before{
			content: "";
			width: 5px;
			height: 5px;
			display: inline-block;
			background-color: #cfa972;
			border-radius: 50%;
			position: relative;
			top: -2px;
			margin-right: 5px;
		}
	}
	.left_upload{
		display: flex;
		flex-direction: row;
		.android,.ios{
			width: 190px;
			color: #5a6995;
			.android_upload{
				height: 190px;
				width: 190px;
			}
			.ios_upload{
				height: 190px;
				width: 190px;
			}
		}
		.android{
			margin-right: 70px;

		}
		.ios{

		}
		img{
			width: 158px;
			height: 158px;
			margin: 15px 15px;
		}
		p{
			text-align: center;
			line-height: 70px;
      color:#fff;
		}
	}
	.left p span{
		float: left;
		width: 198px;
		height: 48px;
		margin-right: 30px;
		cursor:pointer;
		background-color:rgba(255,255,255,.3);
	}

	/* .right .pos{
		height:352px;
		width:467px;
		position: absolute;
    	bottom: 0;
	} */
	/* .pos img{
		position: absolute;
		animation: moveleft 1s linear;
	}
	@keyframes moveleft{
		from{
			top: -50px;
		}
		to{
			top:0px;
		}
	} */
</style>
