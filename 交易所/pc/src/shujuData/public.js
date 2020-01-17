let Public = new Object();

// 加法
Public.Addition = function(a, b) {
	var c, d, e;
	try {
		c = a.toString().split(".")[1].length;
	} catch(f) {
		c = 0;
	}
	try {
		d = b.toString().split(".")[1].length;
	} catch(f) {
		d = 0;
	}
	return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
};
// 减法
Public.Subtraction = function(a, b) {
	var c, d, e;
	try {
		c = a.toString().split(".")[1].length;
	} catch(f) {
		c = 0;
	}
	try {
		d = b.toString().split(".")[1].length;
	} catch(f) {
		d = 0;
	}
	return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
};
// 乘法
Public.Multiplication = function(arg1, arg2) {
	var arg1 = arg1 == '' ? 0 : arg1;
	var arg2 = arg2 == '' ? 0 : arg2;
	var r1, r2, m, n, q;
	if(parseInt(arg1) == arg1) {
		r1 = 0;
	} else {
		r1 = arg1.toString().split(".")[1].length;
	}
	if(parseInt(arg2) == arg2) {
		r2 = 0;
	} else {
		r2 = arg2.toString().split(".")[1].length;
	}
	m = Math.pow(10, r1);
	n = Math.pow(10, r2);
	q = m * n;
	var sum = (((arg1 * m) * (arg2 * n)) / q);
	return sum;
};
// 除法
Public.Division = function(a, b) {
	var a = a == '' ? 0 : a;
	var b = b == '' ? 0 : b;
	var c, d, e = 0,
		f = 0;
	try {
		e = a.toString().split(".")[1].length;
	} catch(g) {}
	try {
		f = b.toString().split(".")[1].length;
	} catch(g) {}
	return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
};
// 百分数转小数
Public.toPoint = function(percent) {
	var str=percent.replace("%","");
    str= str/100;
    return str;
};
// 时间戳转化
Public.timestampToTime = function(timestamp) {
	var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y, M, D, h, m, s;
	Y = date.getFullYear() + '-';
	M = (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
	h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
	m = (date.getMinutes()< 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
	s = (date.getSeconds()< 10 ? '0' + (date.getSeconds()) : date.getSeconds());
	return Y + M + D + h + m + s;
}
// 时间戳转化
Public.timestampToTimess = function(timestamp) {
	if(timestamp.length == 10){
		var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	}else{
		var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	}
	var Y, M, D, h, m, s;
	Y = date.getFullYear() + '-';
	M = (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
	h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
	m = (date.getMinutes()< 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
	s = (date.getSeconds()< 10 ? '0' + (date.getSeconds()) : date.getSeconds());
	return h + m + s;
}
//时间转换
Public.timestampToTime1 = function(timestamp) {
	if(timestamp.length < 13){
		timestamp = timestamp * 1000;
	};
	var date = new Date(timestamp);
	var Y, M, D, h, m, s;
	Y = date.getFullYear() + '年';
	M = (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
	D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日';
	return Y + M + D;
}
Public.toLowFixed = function (num, code, x ){
	var obj={
		'btc_usdt':2,
		'eth_usdt':2,
		'eos_usdt':4,
		'bch_usdt':2,
		'xrp_usdt':5,
		'etc_usdt':4,
		'ltc_usdt':2
	}
	var len = obj[code] ? obj[code] : 4
	x ? len = x : ""
	var _num = Number(num).toFixed(len + 1);
	return _num.substr(0, _num.length - 1)
	// return parseFloat(Number(_num.substr(0, _num.length - 1))) 
};
//时间转换
Public.timestampToTime2 = function(timestamp) {
	var date = new Date(timestamp);
	var Y, M, D, h, m, s;
	Y = date.getFullYear() + '-';
	M = (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
	return Y + M + D;
}
// 手机正则
Public.checkMobile = function(sMobile) {
	//	var reg = /^1[3|4|5|7|8|6|9][0-9]{9}$/;
	//	var phone = sMobile.toString().replace(/[ ]/g,"");

	var phone = $.trim(sMobile);
	// var reg = /^1\d{10}$/;
	if(isNaN(Number(phone))){
		return false
	}else{
		return true
	}
	// return reg.test(phone);
};
//验证邮箱
Public.email = function(em) {
  var reg=/^\w+@[0-9A-Za-z]+\.[a-z]{2,4}$/;
  return reg.test(em);
};
//验证护照
Public.passport = function(em) {
  // var re1 = /^[a-zA-Z]{5,17}$/;
  var reg = /^[a-zA-Z0-9]{5,17}$/;
  return reg.test(em);
};
//密码格式
Public.pwd = function(val) {
	var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/
	return reg.test(val);
};
//邮箱验证
Public.email = function(em) {
	var ema = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
	if(!ema.test(em)) {
		return false;
	} else {
		return true;
	}
};

Public.idCard=function(sId){
	var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
	var iSum=0 ;
	var info="" ;
	if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
	sId=sId.replace(/x$/i,"a");
	if(aCity[parseInt(sId.substr(0,2))]==null) return "你的身份证地区非法";
	var sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
	var d=new Date(sBirthday.replace(/-/g,"/")) ;
	if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法";
	for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
	if(iSum%11!=1) return "你输入的身份证号非法";
	//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
	return true;
}


//身份证号验证
Public.isCardID = function(sId) {
	var iSum=0 ;
	if(!/^\d{17}(\d|x)$/i.test(sId)) return false;
	for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
	if(iSum%11!=1) return false;
	return true;
}

//银行卡号验证
Public.bank_car = function(val) {

	//	var reg = /^(  \d{16}|\d{19}  )$/;
	//	if(!reg.test(val)){
	//		return false;
	//	};
	//	return true;

	if(!isNaN(val) && val.length > 10 && val.length < 20) {
		return true;
	} else {
		return false;
	}

}
Public.Eliminate = function(str) {
	var rs = "";
	for(var i = 0; i < str.length; i++) {
		rs = rs + str.substr(i, 1).replace(/^\s+/, '');
	}
	return rs;
}

//验证码格式验证
Public.code = function(val) {
	var reg = /^\d{6}$/;
	return reg.test(val);
}

Public.name = function(val){
	var reg1= /^([\u4e00-\u9fa5]){2,7}$/; //只能是中文，长度为2-7位
	var reg2 = /^[a-zA-Z\/ ]{2,20}$/;   //英文
	if(reg1.test(val) ||  reg2.test(val)){
		return true;
	}else{
		return false;
	}
//return reg2.test(val);
}
//验证是否为大于0的非空纯数字
Public.Ints = function(val) {
	if(!val) {
		return false;
	} else if(val <= 0) {
		return false;
	} else {
		return true;
	}
}
Public.isInteger = function (obj) {
	var obj = Number(obj);
    return Math.floor(obj) === obj
}
//倒计时执行函数封装

Public.setTime = function(_this) {
	_this.btnCode = {
		time: 59,
		disabled: true
	}
	_this.$message({
		message: '验证码发送成功',
		type: 'success'
	});
	var set = setInterval(function() {
		_this.btnCode.time--;
		if(_this.btnCode.time <= 0) {
			_this.btnCode = {
				time: '重获验证码',
				disabled: false
			}
			clearInterval(set);
		}
	}, 1000)

};
//提示信息封装
Public.msg = function(msg, type, _this) {
	_this.$message({
		showClose: true,
		message: msg,
		type: type
	});
};
//传一个手机号 返回手机号的前3位和后四位 其他的显示* (手机号加密)
Public.phoneEncryption = function(num) {
	//获得手机号的前3位
	var a = num.slice(0, 3);
	var b = num.slice(7);
	var ok = a + '****' + b;
	return ok;
}
Public.Trim = function(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
Public.codeImg = function(id) {

	// 生成验证码
	function yanzhenma(window, document) {
		var size = 4; //设置验证码长度
		function GVerify(options) { //创建一个图形验证码对象，接收options对象为参数
			this.options = { //默认options参数值
				id: "", //容器Id
				canvasId: "verifyCanvas", //canvas的ID
				width: "200", //默认canvas宽度
				height: "44", //默认canvas高度
				type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
				code: "",
			}
			if(Object.prototype.toString.call(options) == "[object Object]") { //判断传入参数类型
				for(var i in options) { //根据传入的参数，修改默认参数值
					this.options[i] = options[i];
				}
			} else {
				this.options.id = options;
			}

			this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
			this.options.letterArr = getAllLetter();

			this._init();
			this.refresh();
		}

		GVerify.prototype = {
			/**版本号**/
			version: '1.0.0',

			/**初始化方法**/
			_init: function() {
				var con = document.getElementById(this.options.id);
				var canvas = document.createElement("canvas");
				this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "200";
				this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "44";
				canvas.id = this.options.canvasId;
				canvas.width = this.options.width;
				canvas.height = this.options.height;
				canvas.style.cursor = "pointer";
				canvas.innerHTML = "您的浏览器版本不支持canvas";
				con.appendChild(canvas);
				var parent = this;
				canvas.onclick = function() {
					parent.refresh();
				}
			},

			/**生成验证码**/
			refresh: function() {
				this.options.code = "";
				var canvas = document.getElementById(this.options.canvasId);
				if(canvas.getContext) {
					var ctx = canvas.getContext('2d');
				} else {
					return;
				}
				ctx.textBaseline = "middle";
				ctx.fillStyle = randomColor(180, 240);
				ctx.fillRect(0, 0, this.options.width, this.options.height);

				if(this.options.type == "blend") { //判断验证码类型
					var txtArr = this.options.numArr.concat(this.options.letterArr);
				} else if(this.options.type == "number") {
					var txtArr = this.options.numArr;
				} else {
					var txtArr = this.options.letterArr;
				}

				for(var i = 1; i <= size; i++) {
					var txt = txtArr[randomNum(0, txtArr.length)];
					this.options.code += txt;
					ctx.font = randomNum(this.options.height, this.options.height) + 'px SimHei'; //随机生成字体大小
					ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
					ctx.shadowOffsetX = randomNum(-3, 3);
					ctx.shadowOffsetY = randomNum(-3, 3);
					ctx.shadowBlur = randomNum(-3, 3);
					ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
					var x = this.options.width / (size + 1) * i;
					var y = this.options.height / 2;
					var deg = randomNum(-30, 30);
					/**设置旋转角度和坐标原点**/
					ctx.translate(x, y);
					ctx.rotate(deg * Math.PI / 180);
					ctx.fillText(txt, 0, 0);
					/**恢复旋转角度和坐标原点**/
					ctx.rotate(-deg * Math.PI / 180);
					ctx.translate(-x, -y);
				}
				/**绘制干扰线**/
				for(var i = 0; i < 4; i++) {
					ctx.strokeStyle = randomColor(40, 180);
					ctx.beginPath();
					ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
					ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
					ctx.stroke();
				}
				/**绘制干扰点**/
				for(var i = 0; i < this.options.width / 4; i++) {
					ctx.fillStyle = randomColor(0, 255);
					ctx.beginPath();
					ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
					ctx.fill();
				}
			},

			/**验证验证码**/
			validate: function(code) {
				var code = code.toLowerCase();
				var v_code = this.options.code.toLowerCase();
				if(code == v_code) {
					return true;
				} else {
					this.refresh();
					return false;
				}
			}
		}
		/**生成字母数组**/
		function getAllLetter() {
			var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
			return letterStr.split(",");
		}
		/**生成一个随机数**/
		function randomNum(min, max) {
			return Math.floor(Math.random() * (max - min) + min);
		}
		/**生成一个随机色**/
		function randomColor(min, max) {
			var r = randomNum(min, max);
			var g = randomNum(min, max);
			var b = randomNum(min, max);
			return "rgb(" + r + "," + g + "," + b + ")";
		}
		window.GVerify = GVerify;
	}
	yanzhenma(window, document);

	new GVerify(id);

}
//页面路由跳转封装


Public.go = function(url, time, _this,data) {
    setTimeout(function() {
        _this.$router.push({
            path: url,
            query:data
        });
    }, time)
}
Public.scrollTop = function() {
	document.body.scrollTop = document.documentElement.scrollTop = 0;
}
//判断是否登录执行函数
Public.isLogin = function(_this) {
	if(!sessionStorage.account || !sessionStorage.token) {
		_this.$public.msg('请先登录', 'warning', _this);
		_this.$public.go('login', 1000, _this);
	}
}
//提示信息封装
Public.confirm = function(msg, what, _this) {
	_this.$confirm(msg, _this.$t('tancha.mian[0]'), {
		confirmButtonText: _this.$t('tancha.mian[1]'),
		cancelButtonText: _this.$t('tancha.mian[2]'),
		type: 'warning'
	}).then(() => {
		_this.$public.go(what, 800, _this);
	}).catch(() => {
		// _this.$message({
		// 	type: 'info',
		// 	message: '已取消'
		// });
	});
	return false;

}

// 修改币种显示
Public.InterceptingAdd = function(str){
	if (str.split('_')[1]) {
		return str.split('_')[0]+"/"+str.split('_')[1];
	}else {
		return str.split('_')[0]
	}
}
Public.parnt = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1}$)|(^[0-9]*\.[0-9]{2}$)|(^[0-9]*\.[0-9]{3}$)|(^[0-9]*\.[0-9]{4}$)/;

function mul(a, b) {
	var c = 0,
		d = a.toString(),
		e = b.toString();
	try {
		c += d.split(".")[1].length;
	} catch(f) {}
	try {
		c += e.split(".")[1].length;
	} catch(f) {}
	return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

/*
 //交易数据判断
 传入参数 o 要判断的数据 （对象）
 wellone 用户余额
 * */
Public.dataDetection = function (o,wellone,_this){
//mobile: null, //手机号
//shopname: '', //code
//newprice: 0, //最新价格
//buynum: 0, //买入数量
//type: 1, //市价 1 限价 2  （默认市价）
//otype: 1, //涨（买入） 1 跌 2（卖出）
//zy: 0, //止盈
//zs: 0 //止损
if(!o.mobile){
	_this.$public.msg(_this.$t('tips.main[3]'), 'warning', _this);
	return false;
}else if( !o.shopname || (o.type != 1 &&o.type != 2 )|| (o.otype != 1 &&o.otype != 2 )){
	//说明发生重大bug了
	_this.$public.msg(_this.$t('tips.main[4]'), 'warning', _this);
	return false;
}else if(!_this.$public.Ints(o.newprice)){
	_this.$public.msg(_this.$t('tips.main[5]'), 'warning', _this);
	return false;
}else if(!_this.$public.Ints(Number(o.buynum)) || !_this.$public.isInteger(o.buynum)){
	_this.$public.msg(_this.$t('tips.main[6]'), 'warning', _this);
	return false;
}
return true;
//用户余额先不做判断
}
//HTML反转义
Public.HTMLDecode = function(text){
	var temp = document.createElement("div");
	temp.innerHTML = text;
	var output = temp.innerText || temp.textContent;
	temp = null;
	return output;
}


export default Public;
