webpackJsonp([28],{EMT2:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("mvHQ"),n=s.n(a),i=s("0w2Z"),o=s("vMJZ"),l={data:function(){return{dialogVisible:!1,isTelLogin:this.$public.checkMobile(sessionStorage.getItem("mobile")),dialogTitle:this.$t("center.baseInfo[35]"),isShowTelCode:!1,telCodeText:this.$t("center.baseInfo[36]"),baseInfo:{account:"",UID:"",loginPwd:"",moneyPwd:"******",hasSetMoneyPwd:!1},safety:{level:"",email:"",tel:"",identityVerify:"",identityVerifyText:this.$t("center.baseInfo[37]"),ableGoIdentityVerify:!0,status:"",heigherStatus:"",gooleVerify:"",isGooleVerify:!0,isGooleOpen:!0},dialog:{title:this.$t("center.baseInfo[38]"),gooleCode:"",telCode:"",telCodeText:this.$t("center.baseInfo[39]"),countDownNumber:60,countDownTimer:null,ableGetCode:!0,getCodeLoading:!1},loginHistoryList:[],sessionData:{}}},created:function(){var e=this;this.baseInfo.account=this.$public.phoneEncryption(sessionStorage.getItem("mobile")),this.getUserInfo(),this.sessionData=JSON.parse(sessionStorage.getItem("userInfo")),Object(o.l)().then(function(t){200==t.data.status?e.loginHistoryList=t.data.data.login_log.slice(0,3):e.$public.msg(t.data.msg,"error",e)}),this.telCodeText=this.isTelLogin?this.$t("center.baseInfo[40]"):this.$t("center.baseInfo[41]")},watch:{},methods:{bindTel:function(){this.$router.push({path:"/center/baseInfo/bindTel"})},bindEmail:function(){this.$router.push({path:"/center/baseInfo/bindEmail"})},resetPwd:function(){this.$router.push({path:"/center/baseInfo/resetPwd"})},resetMoneyPwd:function(){this.$router.push({path:"/center/baseInfo/maneyPwd"})},bindGoole:function(){this.$router.push({path:"/center/baseInfo/gooleVerify"})},goIdentityVerify:function(){3!=this.status?this.$router.push({path:"/center/identity/lowerIdentity"}):3==this.status&&this.$router.push({path:"/center/identity/heigherIdentity"})},closeGoole:function(){this.isShowTelCode=!0,this.dialog.title=this.$t("center.baseInfo[42]"),this.dialogVisible=!0},openGoole:function(){this.dialog.title=this.$t("center.baseInfo[43]"),this.dialogVisible=!0},closeDialog:function(){this.dialog.gooleCode="",this.dialog.telCode="",this.dialogVisible=!1},verify:function(){var e=this;if(this.$public.code(this.dialog.gooleCode)){var t={dyGoodleCommand:this.dialog.gooleCode,mobile:sessionStorage.getItem("mobile"),act:this.isShowTelCode?0:1};this.isShowTelCode&&(t.code=this.dialog.telCode),Object(o.r)(t).then(function(t){200==t.data.status?(e.getUserInfo(),e.$public.msg(e.$t("center.baseInfo[45]"),"success",e),e.dialogVisible=!1):e.$public.msg(t.data.msg,"error",e)},function(){e.$public.msg(e.$t("center.baseInfo[46]"),"error",e)})}else this.$public.msg(this.$t("center.baseInfo[44]"),"warning",this)},getUserInfo:function(){var e=this;Object(i.j)().then(function(t){if(200==t.data.status){sessionStorage.setItem("userInfo",n()(t.data.data)),e.baseInfo.UID=t.data.data.uid,e.baseInfo.loginPwd=t.data.data.opwd,e.baseInfo.hasSetMoneyPwd=t.data.data.tpwd,1==t.data.data.user_level?e.safety.level=e.$t("center.baseInfo[47]"):2==t.data.data.user_level?e.safety.level=e.$t("center.baseInfo[48]"):3==t.data.data.user_level&&(e.safety.level=e.$t("center.baseInfo[49]")),e.safety.email=t.data.data.email?e.$t("center.baseInfo[50]"):e.$t("center.baseInfo[51]"),e.safety.tel=t.data.data.mobile?e.$t("center.baseInfo[50]"):e.$t("center.baseInfo[51]");var s=e.status=t.data.data.status,a=e.heigherStatus=t.data.data.auth_status;1==s?(e.safety.identityVerify=e.$t("center.baseInfo[52]"),e.safety.identityVerifyText=e.$t("center.baseInfo[53]"),e.safety.ableGoIdentityVerify=!0):2==s?(e.safety.identityVerify=e.$t("center.baseInfo[54]"),e.safety.identityVerifyText=e.$t("center.baseInfo[54]"),e.safety.ableGoIdentityVerify=!1):3==s?(e.safety.identityVerify=e.$t("center.baseInfo[55]"),e.safety.identityVerifyText=e.$t("center.baseInfo[56]"),e.safety.ableGoIdentityVerify=!0):4==s&&(e.safety.identityVerify=e.$t("center.baseInfo[57]"),e.safety.identityVerifyText=e.$t("center.baseInfo[58]"),e.safety.ableGoIdentityVerify=!0),1==a&&3==s?(e.safety.identityVerify=e.$t("center.baseInfo[59]"),e.safety.identityVerifyText=e.$t("center.baseInfo[60]"),e.safety.ableGoIdentityVerify=!0):2==a&&3==s?(e.safety.identityVerify=e.$t("center.baseInfo[61]"),e.safety.identityVerifyText=e.$t("center.baseInfo[62]"),e.safety.ableGoIdentityVerify=!1):3==a&&3==s?(e.safety.identityVerify=e.$t("center.baseInfo[63]"),e.safety.identityVerifyText=e.$t("center.baseInfo[63]"),e.safety.ableGoIdentityVerify=!1):4==a&&3==s&&(e.safety.identityVerify=e.$t("center.baseInfo[64]"),e.safety.identityVerifyText=e.$t("center.baseInfo[65]"),e.safety.ableGoIdentityVerify=!0),e.safety.isGooleVerify=0!=t.data.data.command,e.safety.gooleVerify=0!=t.data.data.command?e.$t("center.baseInfo[50]"):e.$t("center.baseInfo[51]"),e.safety.isGooleOpen=0!=t.data.data.is_start_google}else e.$public.msg(t.data.msg,"error",e)})},countDown:function(){var e=this,t=this.dialog.countDownNumber;this.dialog.countDownTimer=setInterval(function(){if(e.dialog.countDownTimer&&t<=0)return clearInterval(e.dialog.countDownTimer),e.dialog.telCodeText=e.$t("center.baseInfo[66]"),void(e.dialog.ableGetCode=!0);e.dialog.telCodeText=t,t--},1e3)},getCodeRequest:function(){var e=this;if(this.dialog.ableGetCode)if(this.dialog.ableGetCode=!1,this.dialog.getCodeLoading=!0,this.isTelLogin){var t={mobile:sessionStorage.getItem("mobile"),mcode:this.sessionData.mcode,type:7};Object(i.i)(t).then(function(t){e.dialog.getCodeLoading=!1,200==t.data.status?(e.$public.msg(e.$t("center.baseInfo[67]"),"success",e),e.countDown()):(e.$public.msg(t.data.msg,"error",e),e.dialog.ableGetCode=!0)},function(){e.$public.msg(e.$t("center.baseInfo[68]"),"error",e),e.dialog.ableGetCode=!0,e.dialog.getCodeLoading=!1})}else{var s={email:sessionStorage.getItem("mobile")};Object(i.h)(s).then(function(t){e.dialog.getCodeLoading=!1,200==t.data.status?(e.$public.msg(e.$t("center.baseInfo[67]"),"success",e),e.countDown()):(e.$public.msg(t.data.msg,"error",e),e.dialog.ableGetCode=!0)},function(){e.$public.msg(e.$t("center.baseInfo[68]"),"error",e),e.dialog.ableGetCode=!0,e.dialog.getCodeLoading=!1})}}}},r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"base-info"},[s("p",{staticClass:"title"},[s("span"),e._v("\n        "+e._s(e.$t("center.index[2]"))+"\n    ")]),e._v(" "),s("el-form",{staticClass:"base-info-form",attrs:{model:e.baseInfo}},[s("el-form-item",{staticClass:"base-info-form-item",attrs:{label:e.$t("center.baseInfo[0]")}},[s("el-input",{attrs:{disabled:""},model:{value:e.baseInfo.account,callback:function(t){e.$set(e.baseInfo,"account",t)},expression:"baseInfo.account"}})],1),e._v(" "),s("el-form-item",{staticClass:"base-info-form-item",attrs:{label:"UID"}},[s("el-input",{attrs:{disabled:""},model:{value:e.baseInfo.UID,callback:function(t){e.$set(e.baseInfo,"UID",t)},expression:"baseInfo.UID"}})],1),e._v(" "),s("el-form-item",{staticClass:"base-info-form-item",attrs:{label:e.$t("center.baseInfo[1]")}},[s("el-input",{attrs:{disabled:""},model:{value:e.baseInfo.loginPwd,callback:function(t){e.$set(e.baseInfo,"loginPwd",t)},expression:"baseInfo.loginPwd"}}),e._v(" "),s("span",{staticClass:"btn",on:{click:e.resetPwd}},[e._v("\n                "+e._s(e.$t("center.baseInfo[2]"))+"\n            ")])],1),e._v(" "),s("el-form-item",{staticClass:"base-info-form-item",attrs:{label:e.$t("center.baseInfo[3]")}},[s("el-input",{attrs:{disabled:""},model:{value:e.baseInfo.moneyPwd,callback:function(t){e.$set(e.baseInfo,"moneyPwd",t)},expression:"baseInfo.moneyPwd"}}),e._v(" "),s("span",{staticClass:"btn",on:{click:e.resetMoneyPwd}},[e._v("\n                "+e._s(e.baseInfo.hasSetMoneyPwd?e.$t("center.baseInfo[2]"):e.$t("center.baseInfo[4]"))+"\n            ")])],1)],1),e._v(" "),s("p",{staticClass:"title"},[s("span"),e._v("\n        "+e._s(e.$t("center.baseInfo[5]"))+"\n    ")]),e._v(" "),s("el-form",{staticClass:"base-info-form",attrs:{model:e.safety}},[s("el-form-item",{staticClass:"base-info-form-item",attrs:{label:e.$t("center.baseInfo[9]")}},[s("el-input",{attrs:{disabled:""},model:{value:e.safety.email,callback:function(t){e.$set(e.safety,"email",t)},expression:"safety.email"}}),e._v(" "),e.safety.email==e.$t("center.baseInfo[10]")?s("span",{staticClass:"btn",on:{click:e.bindEmail}},[e._v("\n                "+e._s(e.$t("center.baseInfo[11]"))+"\n            ")]):s("span",{staticClass:"btn"},[e._v("\n              "+e._s(e.$t("center.baseInfo[12]"))+"\n            ")]),e._v(" "),s("i",{staticClass:"tips"},[e._v("\n                （"+e._s(e.$t("center.baseInfo[13]"))+"）\n            ")])],1),e._v(" "),s("el-form-item",{staticClass:"base-info-form-item",attrs:{label:e.$t("center.baseInfo[14]")}},[s("el-input",{attrs:{disabled:""},model:{value:e.safety.tel,callback:function(t){e.$set(e.safety,"tel",t)},expression:"safety.tel"}}),e._v(" "),e.safety.tel==e.$t("center.baseInfo[15]")?s("span",{staticClass:"btn",on:{click:e.bindTel}},[e._v("\n              "+e._s(e.$t("center.baseInfo[16]"))+"\n            ")]):s("span",{staticClass:"btn"},[e._v("\n              "+e._s(e.$t("center.baseInfo[17]"))+"\n            ")]),e._v(" "),s("i",{staticClass:"tips"},[e._v("\n              （"+e._s(e.$t("center.baseInfo[18]"))+"）\n            ")])],1),e._v(" "),s("el-form-item",{staticClass:"base-info-form-item",attrs:{label:e.$t("center.baseInfo[19]")}},[s("el-input",{attrs:{disabled:""},model:{value:e.safety.identityVerify,callback:function(t){e.$set(e.safety,"identityVerify",t)},expression:"safety.identityVerify"}}),e._v(" "),e.safety.ableGoIdentityVerify?s("span",{staticClass:"btn",on:{click:e.goIdentityVerify}},[e._v("\n                "+e._s(e.safety.identityVerifyText)+"\n            ")]):s("span",{staticClass:"btn"},[e._v("\n                "+e._s(e.safety.identityVerifyText)+"\n            ")]),e._v(" "),s("i",{staticClass:"tips"},[e._v("\n              （"+e._s(e.$t("center.baseInfo[20]"))+"）\n            ")])],1),e._v(" "),s("el-form-item",{staticClass:"base-info-form-item",attrs:{label:e.$t("center.baseInfo[21]")}},[s("el-input",{attrs:{disabled:""},model:{value:e.safety.gooleVerify,callback:function(t){e.$set(e.safety,"gooleVerify",t)},expression:"safety.gooleVerify"}}),e._v(" "),e.safety.isGooleVerify?e._e():s("span",{staticClass:"btn",on:{click:e.bindGoole}},[e._v(e._s(e.$t("center.baseInfo[22]")))]),e._v(" "),e.safety.isGooleVerify&&e.safety.isGooleOpen?s("span",{staticClass:"btn",on:{click:e.closeGoole}},[e._v("\n              "+e._s(e.$t("center.baseInfo[23]"))+"\n            ")]):e._e(),e._v(" "),e.safety.isGooleVerify&&!e.safety.isGooleOpen?s("span",{staticClass:"btn",on:{click:e.openGoole}},[e._v(e._s(e.$t("center.baseInfo[24]")))]):e._e(),e._v(" "),s("i",{staticClass:"tips"},[e._v("\n              （"+e._s(e.$t("center.baseInfo[25]"))+"）\n            ")])],1)],1),e._v(" "),s("p",{staticClass:"title"},[s("span"),e._v("\n        "+e._s(e.$t("center.baseInfo[26]"))+"\n    ")]),e._v(" "),s("el-table",{staticStyle:{"padding-bottom":"15px"},attrs:{data:e.loginHistoryList}},[s("el-table-column",{attrs:{prop:"time",label:e.$t("center.baseInfo[27]"),align:"left"}}),e._v(" "),s("el-table-column",{attrs:{prop:"ip",label:e.$t("center.baseInfo[28]"),align:"left"}}),e._v(" "),s("el-table-column",{attrs:{prop:"AgentInfo",label:e.$t("center.baseInfo[29]"),align:"left"}})],1),e._v(" "),s("el-dialog",{attrs:{title:e.dialog.title,visible:e.dialogVisible,"close-on-click-modal":!1,width:"420px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[s("el-form",{staticClass:"base-info-dialog"},[s("el-form-item",{attrs:{label:e.$t("center.baseInfo[30]")}},[s("el-input",{attrs:{placeholder:e.$t("center.baseInfo[31]")},model:{value:e.dialog.gooleCode,callback:function(t){e.$set(e.dialog,"gooleCode",t)},expression:"dialog.gooleCode"}})],1),e._v(" "),e.isShowTelCode?s("el-form-item",{staticClass:"tel-code",attrs:{label:e.telCodeText}},[s("el-input",{attrs:{placeholder:e.$t("center.baseInfo[32]")+e.telCodeText},model:{value:e.dialog.telCode,callback:function(t){e.$set(e.dialog,"telCode",t)},expression:"dialog.telCode"}}),e._v(" "),s("span",{directives:[{name:"loading",rawName:"v-loading",value:e.dialog.getCodeLoading,expression:"dialog.getCodeLoading"}],staticClass:"get-code",attrs:{"element-loading-spinner":"el-icon-loading"},on:{click:e.getCodeRequest}},[e._v("\n                    "+e._s(e.dialog.telCodeText)+"\n                ")])],1):e._e(),e._v(" "),s("div",{staticClass:"btn-wrap"},[s("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:e.verify}},[e._v("\n                  "+e._s(e.$t("center.baseInfo[33]"))+"\n                ")]),e._v(" "),s("el-button",{staticClass:"btn",attrs:{type:"primary",plain:""},on:{click:function(t){e.dialogVisible=!1}}},[e._v("\n                  "+e._s(e.$t("center.baseInfo[34]"))+"\n                ")])],1)],1)],1)],1)},staticRenderFns:[]};var f=s("VU/8")(l,r,!1,function(e){s("Ff0e")},null,null);t.default=f.exports},Ff0e:function(e,t){}});
//# sourceMappingURL=28.e81a0152ba52f8fab9b2.js.map