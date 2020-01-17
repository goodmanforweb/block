import Axios from 'axios' // 引入axios
import qs from 'qs' // 引入axios数据处理
import Public from './public.js' // 加载公用js方法文件
Axios.defaults.timeout = 10000
// Axios.defaults.headers.post['Content-Type'] = '';   //配置请求头
// axios.defaults.baseURL = 'http://spsj.xn62x.cn';   //配置接口地址
// axios.defaults.baseURL = 'http://192.168.1.100';   //配置接口地址
// Axios.defaults.headers.common['token'] = token;
// Axios.defaults.headers.common['account'] = account;

// 添加一个响应拦截器
Axios.interceptors.request.use(
  config => {
    let account = sessionStorage.account
    let token = sessionStorage.token
    config.headers['token'] = token
    config.headers['account'] = account
    // 在发送请求之前做某件事
    // 判断是否登录
    // let cur_id = "cur_id",
    // sign = "sign";
    //  if (!cur_id||!sign) {
    //    localStorage.clear();
    //    window.location.href = "index.html";
    //  };

    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
      if (config.url.indexOf('checkGoogleCommand') !== -1) {
        config.data = config.data
      } else if (config.url.indexOf('ti_bi') !== -1) {
        config.data = config.data
      } else {
        config.data = config.data + '&account=' + account
      }
    }
    if (config.url == Axios.send_sms) {
      config.data = config.data + '&mcode=' + sessionStorage.mcode
    }

    if (config.method === 'get') {
      config.params.account = account
    }
    return config
  },
  error => {
    _.toast('错误的传参', 'fail')
    return Promise.reject(error)
  }
)

// 添加返回信息验证
Axios.interceptors.response.use(
  function (response) {
    if (response.data.status == '505' || response.data.status == '404') {
      if (!sessionStorage.account) {
        return false
      }
      sessionStorage.clear()
      alert(response.data.msg)
      window.location.href = '/#/login'
    }
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

let second = "http://www.bitpui.com";
let Mainwsurl = 'ws://www.bitpui.com:7272'
let Secondwsurl = 'ws://www.bitpui.com:7273'
let fivewsurl = 'ws://www.bitpui.com:7275'

// 接口地址

Axios.bases = `${second}/`
// Axios.getNewInfo = `${second}/sexp/stock/getNewInfo`;
Axios.send_sms = `${second}/Home/Qbw/send_sms` // 短信验证码  1注册 2 重置 3 安全验证 4 支付密码设置 5 提币 mobile ,type
Axios.send_mail = `${second}/Home/Mail/send_mail` // 邮箱验证码  1注册
Axios.register = `${second}/Home/Qbw/register` // 注册
Axios.user_login = `${second}/Home/Qbw/user_login` // 登录  mobile  opwd  verify
// Axios.code_login = `${second}/home/qbw/code_login`; //验证码登录
Axios.code_login = `${second}/Home/Qbw/code_login`
Axios.auth_code = `${second}/home/qbw/auth_code` // 图片验证码
Axios.reset_opwd = `${second}/home/qbw/reset_opwd` // 找回密码   mobile opwd	opwd1	code
Axios.link = `${second}/home/Qbw/link` // 推广海报  account
Axios.set_poit_pre = `${second}/Home/Order/set_poit_pre` // 设置止盈止损
Axios.helpCenter = `${second}/home/qbw/FAQ` // 帮助中心
Axios.articleList = `${second}/home/qbw/get_more` // 文章列表
Axios.articleDetails = `${second}/home/qbw/get_detail` // 文章详情
Axios.sellRequest = `${second}/home/qbw/u_msg` // 提交请求
Axios.searchData = `${second}/home/qbw/search` // 搜索
Axios.ziChan = `${second}/home/api/asset` // 资产
Axios.caiWu = `${second}/home/qbw/caiwu` // 财务记录
Axios.moneyDeal = `${second}/home/qbw/record` // 充币提币-type,cash/recharge,默认recharge
Axios.addrList = `${second}/home/qbw/AddrList` // 提币地址列表
Axios.deltAddre = `${second}/home/qbw/AddrManage` // 添加、删除提币地址
Axios.goPay = `${second}/home/order/bpay` // 账户充值
Axios.goBit = `${second}/Home/Order/ti_bi` // 账户提币
// Axios.weiTuo = `${second}/home/order/weituo`;  // 委托
Axios.zixunList = `${second}/home/qbw/zixun` // BFEX资讯列表
Axios.zixunDetails = `${second}/home/qbw/zixun_detail` // BFEX资讯详情
Axios.fbOrder = `${second}/home/qbw/getFbMx` // 法币交易->订单
Axios.get_lever = `${second}/home/api/get_lever` // 杠杆交易获取杠杆信息
Axios.getFbMx_pmma = `${second}/home/qbw/getFbMx_pmma` // 法币交易->购买
Axios.getFbMx_sell = `${second}/home/qbw/getFbMx_sell` // 法币交易->出售
// Axios.bbOrder = `${second}/index.php/Home/Trade/tranlist`;  // 币币交易->订单
Axios.dealCancel = `${second}/index.php/Home/Trade/cancel` // 币币交易->撤单
Axios.getPro = `${second}/home/Ajax/getpro` // 获取币种信息
Axios.agreeMent = `${second}/home/qbw/agree` // 获取协议信息(协议、条款、说明)
Axios.create_order = `${second}/home/Fbtrans/create_order` // 法币交易下单
Axios.orderDetail = `${second}/home/Fbtrans/orderDetail` // 法币订单买方详细
Axios.MyorderDetail = `${second}/home/qbw/MyorderDetail` // 法币订单卖方详细
Axios.setOrderStatus = `${second}/home/Fbtrans/setOrderStatus` // 标记已付款
Axios.post_allege = `${second}/home/Fbtrans/post_allege` // 提交申诉
Axios.re_order = `${second}/home/Fbtrans/re_order` // 法币取消订单

Axios.my_fee = `${second}/Home/Qbw/my_fee` // 我要惠率
Axios.add_order = `${second}/index.php/Home/Order/add_order` // 杠杆交易下单
Axios.cancellations = `${second}/index.php/Home/Order/cancellations` // 杠杆交易-订单-委托撤销
Axios.pingcang = `${second}/index.php/Home/Order/pingcang` // 杠杆交易-订单-手动平仓
Axios.chengjiao = `${second}/index.php/Home/Order/chengjiao` // 杠杆交易-订单-成交记录
Axios.sschengjiao = `${second}/Home/Order/total_chengjiao` // 合约交易实时成交
Axios.weituo = `${second}/index.php/Home/Order/weituo` // 杠杆交易-订单-委托记录
Axios.chicang = `${second}/index.php/Home/Order/chicang` // 杠杆交易-订单-持仓记录
Axios.publicData = `${second}/home/qbw/public_data` // footer邮箱地址
Axios.set_poit = `${second}/Home/Order/set_poit` // 设置止盈止损
Axios.transfer = `${second}/Home/Users/Transfer` // 站内转账
Axios.get_balance = `${second}/Home/Users/get_balance` // 查看余额
Axios.Record_Transfer = `${second}/Home/Users/Record_Transfer` // 转账流水
Axios.all_ping = `${second}/Home/Order/all_ping`
Axios.tongji = `${second}/Home/Order/tongji` // 订单信息统计
Axios.one_key_order = `${second}/Home/Fbtrans/one_key_order`

// Fbtrans
Axios.user_info = `${second}/Home/Qbw/user_info` // 个人中心接口
Axios.xiugai_pwd = `${second}/home/qbw/xiugai_pwd` // 修改登录密码 account	oldpwd	opwd	opwd1
Axios.binding_email = `${second}/home/qbw/binding_email` // 绑定邮箱
Axios.binding_mobile = `${second}/home/qbw/binding_mobile` // 设置手机号
Axios.reset_tpwd = `${second}/home/qbw/reset_tpwd` // 修改资金密码
Axios.user_aq = `${second}/home/qbw/user_aq` // 登录历史安全历史接口
Axios.user_sign = `${second}/Home/Sign/user_sign` // 签到

Axios.MainwsUrl = `${Mainwsurl}`
Axios.SecondwsUrl = `${Mainwsurl}/` // 创新区长链接
Axios.SecondSalewsUrl = `${Secondwsurl}/` // 创新区长链接
Axios.fivewsurl = `${fivewsurl}/` // 实时数据推送
Axios.getNewInfo = `${second}/home/Ajax/getpro` // 五大币API
Axios.crowd = `${second}/home/api/crowd` // 创新币种API
Axios.trading = `${second}/home/Fbtrans/trading` // 出售/购买广告
Axios.get_info = `${second}/home/qbw/get_info` // 币种信息
Axios.tranlist = `${second}/index.php/Home/Trade/tranlist` // 币币交易记录
Axios.bbtran = `${second}/index.php/Home/Trade/bbtran` // 币币交易
Axios.xinxi = `${second}/index.php/home/Trade/xinxi` // 获取个人币种资产
Axios.trans_wk = `${second}/home/qbw/trans_wk` // 交易即挖矿 说明
Axios.my_down = `${second}/Home/qbw/my_down` // 推广明细
Axios.idvalid = `${second}/Home/Qbw/set_renzheng`//身份认证
Axios.setAuth = `${second}/Home/Qbw/new_setAuth`
Axios.duihuan = `${second}/Home/Exchange/ext_note`
Axios.pay_list = `${second}/home/Fbtrans/pay_list` // 支付方式列表
Axios.pay_edit = `${second}/home/qbw/pay_edit` // 支付方式编辑页数据
Axios.pay_add = `${second}/home/qbw/pay_add` // 添加/编辑提交 支付方式
Axios.set_pay_status = `${second}/home/qbw/set_pay_status` // 改变支付方式状态
Axios.upload = `${second}/Home/Qbw/upload_pic` // 图片上传
Axios.set_sm = `${second}/home/qbw/set_sm` // 设置实名
Axios.set_img = `${second}/home/qbw/set_img` // 高级认证
Axios.add_shop = `${second}/home/Fbtrans/add_shop` // 成为商家
Axios.pmma = `${second}/home/Fbtrans/pmma` // 求购/出售 发单
Axios.pmmaList = `${second}/home/Fbtrans/pmmaLists` // 求购/售出 列表
Axios.pmmaRev = `${second}/home/Fbtrans/pmmaRev` // 求购/售出 撤单
Axios.cat_shopinfo = `${second}/home/Fbtrans/cat_shopinfo` // 查看商家信息
Axios.agree = `${second}/home/qbw/agree` // 用户协议
Axios.confirm = `${second}/home/Fbtrans/confirm` // 确认放行
Axios.del_shop = `${second}/Home/Fbtrans/del_shop` // 取消商家
Axios.bk_list = `${second}/home/Broker/bk_list` // 经纪人信息
Axios.bk_applay = `${second}/Home/Broker/bk_apply` // 经纪人申请
Axios.bk_info = `${second}/Home/Broker/bk_info` // 经纪人申请
Axios.get_price = `${second}/Home/Fbtrans/get_price` // 获得价格
Axios.re_asset = `${second}/Home/qbw/re_asset` // 个人流水
Axios.get_tb = `${second}/Home/api/get_tb` // 提币限制条件

// 基金接口
Axios.index = `${second}/home/Fund/index` // 头部数据
Axios.fundlist = `${second}/home/Fund/fundlist` // 主页及分红页面
Axios.bflist = `${second}/home/Fund/bflist` // 资金明细
Axios.mininglist = `${second}/home/Fund/mininglist` // 挖矿明细
Axios.transform = `${second}/home/Fund/transform` // 余额划转

Axios.thisCoinList = `${second}/home/exchange/thisCoinList` // 币种的兑换列表
Axios.coinList = `${second}/home/exchange/coinList` // 可兑换币种
Axios.exchange = `${second}/home/exchange/exchange` // 兑换
Axios.ex_list = `${second}/home/exchange/ex_list` // 兑换明细

// 底部信息接口
Axios.public_data = `${second}/home/qbw/public_data`
Axios.agree = `${second}/home/qbw/agree`
Axios.createGoogleCommand = `${second}/home/google/createGoogleCommand` // 开启谷歌身份验证
Axios.setGoogleMsg = `${second}/home/google/setGoogleMsg` // 谷歌身份验证短信验证码
Axios.checkGoogleCommand = `${second}/Home/google/checkGoogleCommand` // 绑定谷歌验证
Axios.backRemark = `${second}/home/Users/backRemark` // 审核原因
Axios.check_code = `${second}/home/api/check_code` // 验证码审核
Axios.set_google_state = `${second}/Home/Google/set_google_state` // 开启谷歌验证
Axios.check_google_code = `${second}/Home/google/check_google_code` // 登录谷歌验证码
Axios.get_agree = `${second}/home/qbw/agree` // 网站协议

// 首页轮播图
Axios.bannerfind = `${second}/Home/Sign/bannerfind` // 轮播图
// Axios.huoqugg = `${second}/Home/Sign/getjyzn`;  //获取公告
Axios.huoqugg = `${second}/Home/sign/huoqugg` // 获取公告
Axios.customer = `${second}/Home/Link/customer` // 我的客户
Axios.my_record = `${second}/Home/Link/record` // 推广明细
Axios.show_index = `${second}/Home/Link/show_index` // 推广首页

Axios.mytuiguang = `${second}/Home/forces/mytuiguang` // 我的推广
Axios.user_link = `${second}/Home/Users/link` // 推广二维码
// Axios.user_link = `${second}/home/qbw/link`; //推广二维码
Axios.yjmx = `${second}/Home/Forces/yjmx` // 推广 原力
Axios.yuanlimingxi = `${second}/home/Forces/yuanlimingxi` // 获取原力明细
// 获取咨询
Axios.getyjlists = `${second}/home/Qbw/fy_info` // 获取佣金明细
Axios.gethqzx = `${second}/Home/sign/getxitongzx`
Axios.getxtzx = `${second}/Home/Qbw/zixun`
Axios.getjyzn = `${second}/Home/Sign/getjyzn` // 交易指南
Axios.getlink = `${second}/Home/Version/get_link` // 获取下载链接

Axios.one_buy = `${second}/Home/fbtrans/one_buy` // 一键买币接口
Axios.one_sell = `${second}/Home/fbtrans/one_sell` // 一键卖币接口
Axios.do_sell = `${second}/Home/fbtrans/do_sell` // 一键卖币提交
Axios.sell_list = `${second}/Home/fbtrans/sell_list` // 一键卖币记录
Axios.goldEntry = `${second}/home/Pay/goldEntry` // 第三方

Axios.zixun_detail = `${second}/Home/Qbw/zixun_detail`
export default Axios

// Fbtrans
/*
 * 复制专用
 _this.$http.post(_this.$http.user_info, {}).then(function(response) {
				if(response.data.status == "200") {
				} else {
					_this.$public.msg(response.data.msg, 'warning', _this);
				}
			}).catch(function(error) {});
 *
 *
 *
 *
 * */
