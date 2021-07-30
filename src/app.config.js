export default {
  pages: [
    'pages/order/list/index',
    'pages/order/detail/index',
    'pages/order/apply/index',
    'pages/center/index',
    'pages/finance/index/index',
    'pages/finance/record/index',
    'pages/finance/detail/index',
    'pages/statistics/index/index',
    'pages/statistics/revenue/index',
    'pages/statistics/goods/index',
    'pages/statistics/account/index',
    'pages/statistics/accountDetail/index',
    'pages/print/index/index',
    'pages/print/editor/index',
    'pages/print/batch/index',
    'pages/print/list/index',
    // 'pages/manager/index',
    'pages/member/index',
    // 'pages/message/index',
    'pages/login/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#47CFCA',
    navigationBarTitleText: '吃饭鸭',
    navigationBarTextStyle: 'white',
    backgroundColor: '#47cfca'

  },
  tabBar: {
    selectedColor: '#47CFCA',
    color: '#bfbfbf',
    list: [
      {
        text: '订单',
        pagePath: 'pages/order/list/index',
        iconPath: './assets/imgs/tar-order.png',
        selectedIconPath: './assets/imgs/tar-order-active.png'
      },
      {
        text: '我的',
        pagePath: 'pages/center/index',
        iconPath: './assets/imgs/tar-center.png',
        selectedIconPath: './assets/imgs/tar-center-active.png'
      }
    ]
  }
}
