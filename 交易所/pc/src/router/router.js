import Main from '@/components/mian.vue'
import layout from '@/components/mycenter/layout.vue'
const mycenter = {
  // 忘记密码
  path: 'mycenter',
  name: 'mycenter-layout',
  redirect: '/mycenter/basicinfo',
  component: layout,
  children: [
    {
      path:'basicinfo',
      name: 'basicinfo',
      meta: {auth:true},
      component: () => import('@/components/mycenter/basicinfo/index.vue'),
    },
    {
      path:'basicinfo/fixloginpass',
      name: 'fixloginpass',
      meta: {auth:true},
      component: () => import('@/components/mycenter/basicinfo/fixloginpass.vue')

    },
    {
      path:'basicinfo/setassetpass',
      name: 'setassetpass',
      meta: {auth:true},
      component: () => import('@/components/mycenter/basicinfo/setassetpass.vue')

    },
    {
      path:'basicinfo/googlecheck',
      name: 'googlecheck',
      meta: {auth:true},
      component: () => import('@/components/mycenter/basicinfo/googlecheck.vue')
    },
    {
      path:'idvalid',
      name: 'idvalid',
      meta: {auth:true},
      component: () => import('@/components/mycenter/idvalid.vue')
    },
    {
      path:'myfriends',
      name: 'myfriends',
      meta: {auth:true},
      component: () => import('@/components/mycenter/myfriends.vue')
    },
    {
      path:'myinvite',
      name: 'myinvite',
      meta: {auth:true},
      component: () => import('@/components/mycenter/myinvite.vue')
    },
    {
      path:'mytuiguan',
      name: 'mytuiguan',
      meta: {auth:true},
      component: () => import('@/components/mycenter/mytuiguan.vue')
    },
    {
      path:'tbadress',
      name: 'tbadress',
      meta: {auth:true},
      component: () => import('@/components/mycenter/tbadress.vue')
    },
    {
      path:'assetdetail',
      name: 'assetdetail',
      meta: {auth:true},
      component: () => import('@/components/mycenter/assetdetail.vue')
    },
    {
      path:'assetinfo',
      name: 'assetinfo',
      meta: {auth:true},
      component: () => import('@/components/mycenter/assetinfo/index.vue')
    },
    {
      path:'tb',
      name: 'tb',
      meta: {auth:true},
      component: () => import('@/components/mycenter/assetinfo/tb.vue')
    },
    {
      path:'cb',
      name: 'cb',
      meta: {auth:true},
      component: () => import('@/components/mycenter/assetinfo/cb.vue')
    }
  ]
}
// 不作为Main组件的子页面展示的页面单独写，如下
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    mycenter,
    {
      path: 'home',
      name: 'home',
      component: () => import('@/components/home/home.vue')
    },
    {
      path: 'hyexchange',
      name: 'hyexchange',
      meta: {auth:true},
      component: () => import('@/components/exchange/index.vue')
    }, 
    {
      path: 'gqexchange',
      name: 'gqexchange',
      meta: {auth:true},
      component: () => import('@/components/exchange/gqexchange.vue')
    }, 
    {
      path: 'ggOrder',
      name: 'ggOrder',
      meta: {auth:true},
      component: () => import('@/components/order/ggOrder.vue')
    },
    {
      path: 'agreement',
      name: 'agreement',
      component: () => import('@/components/notice/agreement.vue')
    },
    {
      path: 'zixunList',
      name: 'zixunList',
      component: () => import('@/components/notice/zixunList.vue')
    }, 
    {
      path: 'zixunDetails',
      name: 'zixunDetails',
      component: () => import('@/components/notice/zixunDetails.vue')
    },
    {
      path: 'help',
      title: { i18n: 'help' },
      name: 'help',
      component: () => import('../components/notice/help.vue')
    },
    {
      //登录
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: () => import('@/components/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册'
      },
      component: () => import('@/components/register.vue')
    },
    {
        path: '/forgetpwd',
    name: 'forgetpwd',
    meta: {
      title: '忘记密码'
    },
    component: () => import('@/components/forget_pwd.vue')
    },
    {
      path: '/error',
      name: 'error',
      meta: {
        title: '浏览器版本低'
      },
      component: () => import('@/components/error.vue')
    
    }











    
    
    // // 币币交易
    // {
    //   path: 'bInformation',
    //   title: { i18n: 'bInformation' },
    //   name: 'bInformation',
    //   component: () =>
    //     import('@/components/exchange/transaction/bInformation.vue')
    // }, // 帮助中心

    // {
    //   path: 'apply',
    //   name: 'apply',
    //   component: () => import('@/components/advertisement/apply.vue')
    // }, // 发布广告
    // {
    //   path: 'buy',
    //   name: 'buy',
    //   component: () => import('@/components/advertisement/buy.vue')
    // }, // 发布广告  求购
    // {
    //   path: 'sell',
    //   name: 'sell',
    //   component: () => import('@/components/advertisement/sell.vue')
    // }, // 发布广告 出售
    // {
    //   path: 'animateDemo',
    //   name: 'aDemo',
    //   component: () => import('@/components/ademo.vue')
    // }, // 发布广告 出售
    // {
    //   path: 'oneKeyBuyCoins',
    //   name: 'oneKeyBuyCoins',
    //   component: () => import('@/components/MyAssets/oneKey.vue')
    // }, // 发布广告 出售
    // {
    //   path: 'oneKeySellCoins',
    //   name: 'oneKeySellCoins',
    //   component: () => import('@/components/MyAssets/oneKeySell.vue')
    // }, // 发布广告 出售
    // {
    //   path: 'aKeySell',
    //   name: 'aKeySell',
    //   component: () => import('@/components/MyAssets/aKeySell.vue')
    // }, // 发布广告 出售
    // {
    //   path: 'aKeyBuy',
    //   name: 'aKeyBuy',
    //   component: () => import('@/components/MyAssets/aKeyBuy.vue')
    // }, // 发布广告 出售

    // // { path: 'transfer', name: 'transfer', component: () => import('@/components/transfer/transfer.vue')},  //站内转账
    // {
    //   path: 'MyAssets',
    //   name: 'MyAssets',
    //   component: () => import('@/components/MyAssets/ziChan.vue')
    // }, // 我的资产
    // {
    //   path: 'tiBit',
    //   name: 'tiBit',
    //   component: () => import('@/components/MyAssets/children/tiBit.vue')
    // }, // 提币
    // {
    //   path: 'exchangeCoin',
    //   name: 'exchangeCoin',
    //   component: () => import('@/components/MyAssets/children/exchangeCoin.vue')
    // }, // 兑换
    // {
    //   path: 'chongBit',
    //   name: 'chongBit',
    //   component: () => import('@/components/MyAssets/children/chongBit.vue')
    // }, // 充币
    // {
    //   path: 'duihuan',
    //   name: 'duihuan',
    //   component: () => import('@/components/MyAssets/children/duihuan.vue')
    // }, // 兑换
    // {
    //   path: 'moneyRecord',
    //   name: 'moneyRecord',
    //   component: () => import('@/components/MyAssets/children/moneyRecord.vue')
    // }, // 提币
    // {
    //   path: 'security',
    //   name: 'security',
    //   component: () => import('@/components/accountSecurity/security.vue'),
    //   children: [
    //     {
    //       path: 'alipay',
    //       name: 'alipay',
    //       component: () => import('@/components/accountSecurity/pay/alipay.vue')
    //     }, // 修改支付宝支付方式
    //     {
    //       path: 'backcard',
    //       name: 'backcard',
    //       component: () =>
    //         import('@/components/accountSecurity/pay/back_card.vue')
    //     }, // 修改修改银行卡支付方式
    //     {
    //       path: 'wx',
    //       name: 'wx',
    //       component: () => import('@/components/accountSecurity/pay/wx.vue')
    //     }, // 修改微信支付方式
    //     {
    //       path: 'paypal',
    //       name: 'paypal',
    //       component: () => import('@/components/accountSecurity/pay/paypal.vue')
    //     } // 修改paypal支付方式
    //   ]
    // }, // 账号安全
    // {
    //   path: 'isapply',
    //   name: 'isapply',
    //   component: () => import('@/components/broker/isApply.vue')
    // }, // 经纪人

    // {
    //   path: 'changeemail',
    //   name: 'change_email',
    //   component: () =>
    //     import('@/components/accountSecurity/children/change_email.vue')
    // }, // 绑定邮箱
    // {
    //   path: 'changemobile',
    //   name: 'change_mobile',
    //   component: () =>
    //     import('@/components/accountSecurity/children/change_mobile.vue')
    // }, // 修改绑定手机号
    // {
    //   path: 'changeopwd',
    //   name: 'change_opwd',
    //   component: () =>
    //     import('@/components/accountSecurity/children/change_opwd.vue')
    // }, // 修改登录密码
    // {
    //   path: 'changetpwd',
    //   name: 'change_tpwd',
    //   component: () =>
    //     import('@/components/accountSecurity/children/change_tpwd.vue')
    // }, // 修改资金密码
    // {
    //   path: 'googleverify',
    //   name: 'google_verify',
    //   component: () =>
    //     import('@/components/accountSecurity/children/google_verify.vue')
    // }, // 修改资金密码
    // {
    //   path: 'transfer',
    //   name: 'transfer',
    //   component: () =>
    //     import('@/components/accountSecurity/children/transfer.vue')
    // }, // 站内转账

    // {
    //   path: 'authentication',
    //   name: 'authentication',
    //   component: () => import('@/components/authentication/children/senior.vue')
    // }, // 认证
    // {
    //   path: 'auth_error',
    //   name: 'auth_error',
    //   component: () =>
    //     import('@/components/authentication/children/auth_error.vue')
    // }, // 认证失败
    // {
    //   path: 'senior',
    //   name: 'senior',
    //   component: () => import('@/components/authentication/children/senior.vue')
    // }, // 重新认证
    // {
    //   path: 'realname',
    //   name: 'realname',
    //   component: () =>
    //     import('@/components/authentication/children/real_name.vue')
    // }, // 认证
    // {
    //   path: 'broker',
    //   name: 'broker',
    //   component: () => import('@/components/broker/isApply.vue')
    // }, // 经纪人申请
    // {
    //   path: 'fundmannagement',
    //   name: 'fundmannagement',
    //   component: () => import('@/components/fundmanagement/fund.vue')
    // }, // 基金管理
    // {
    //   path: 'Mentionmoneyaddress',
    //   name: 'Mentionmoneyaddress',
    //   component: () => import('@/components/Mentionmoneyaddress/moneyAddre.vue')
    // }, // 提币地址
    // {
    //   path: 'yuanli',
    //   name: 'yuanli',
    //   component: () => import('@/components/yuanli/yuanli.vue')
    // }, // 原力明细

    // {
    //   path: 'frenchcurrency',
    //   name: 'frenchcurrency',
    //   component: () => import('@/components/frenchcurrency/frenchcurrency.vue')
    // }, // 法币交易
    // {
    //   path: 'frenchdetails',
    //   name: 'frenchdetails',
    //   component: () => import('@/components/frenchcurrency/frenchDetails.vue')
    // }, // 法币交易
    // {
    //   path: 'frenchOrder',
    //   name: 'frenchOrder',
    //   component: () => import('@/components/frenchcurrency/frenchOrder.vue')
    // }, // 法币交易
    
    // {
    //   path: 'transaction',
    //   name: 'transaction',
    //   component: () => import('@/components/notice/transaction.vue')
    // }, // 交易分红
    // {
    //   path: 'notice',
    //   name: 'notice',
    //   component: () => import('@/components/notice/index.vue')
    // }, // 公告
    
    // {
    //   path: 'ggDetails',
    //   name: 'ggDetails',
    //   component: () => import('@/components/notice/ggDetails.vue')
    // }, // 公告  详情
    // {
    //   path: 'fbOrder',
    //   name: 'fbOrder',
    //   component: () => import('@/components/order/fbOrder.vue')
    // },
    

    // {
    //   path: 'promotion',
    //   name: 'promotion',
    //   component: () => import('@/components/order/extension.vue')
    // }, // 我的推广
    // {
    //   path: 'transactionmining',
    //   name: 'transactionmining',
    //   component: () => import('@/components/notice/transactionmining.vue')
    // }, // 交易及挖矿
     // 帮助中心
    // {
    //   path: 'applymerch',
    //   title: { i18n: 'applymerch' },
    //   name: 'applymerch',
    //   component: () => import('../components/notice/applymerch.vue')
    // }, // 申请做市商


    // {
    //   path: 'noticelist',
    //   title: { i18n: 'noticelist' },
    //   name: 'noticelist',
    //   component: () => import('../components/notice/noticelist.vue')
    // }, // 公告列表
    // {
    //   path: 'noticedata',
    //   title: { i18n: 'noticedata' },
    //   name: 'noticedata',
    //   component: () => import('../components/notice/noticedata.vue')
    // } // 公告详情
  ]
}
export const loginpage = {
  
}
// export const googlecheck = {
//   // 登录
//   path: '/googlecheck',
//   name: 'googlecheck',
//   meta: {
//     title: '谷歌验证'
//   },
//   component: () => import('@/components/google_check.vue')
// }
export const registerpage = {
  // 注册
  
}
export const forgetpwdpage = {
  // 忘记密码
  
}
// export const adminset = {
//   // 忘记密码
//   path: '/adminset',
//   name: 'adminset',
//   meta: {
//     title: '设置'
//   },
//   component: () => import('@/components/adminset.vue')
// }

export const errorpage = {
  // error
}
// export const page404 = {
//     path: '/error',
//     name: 'error',
//     meta: {
//         title: '浏览器版本过低'
//     },
//     component: () => import('@/components/error.vue')
// };

// export const page403 = {
//     path: '/403',
//     meta: {
//         title: '403-权限不足'
//     },
//     name: 'error-403',
//     component: () => import('@//views/error-page/403.vue')
// };

// export const page500 = {
//     path: '/500',
//     meta: {
//         title: '500-服务端错误'
//     },
//     name: 'error-500',
//     component: () => import('@/views/error-page/500.vue')
// };

// export const preview = {
//     path: '/preview',
//     name: 'preview',
//     component: () => import('@/views/form/article-publish/preview.vue')
// };
const routers = [
  otherRouter,
  // loginpage,
  // registerpage,
  // forgetpwdpage,
  // // googlecheck,
  // errorpage,
  // adminset // 前台设置
]

// 所有上面定义的路由都要写在下面的routers里
export default routers
