import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image } from '@tarojs/components'

// import headerBg from '@/assets/imgs/header-bg.png'
// import usIcon from '@/assets/imgs/center-us.png'
import statisticsIncome from '@/assets/imgs/statistics-income.png'
import statisticsGoods from '@/assets/imgs/statistics-goods.png'
import statisticsAccount from '@/assets/imgs/statistics-account.png'
import statisticsAccountDetail from '@/assets/imgs/statistics-account-detail.png'

import './index.scss'

class Center extends Component {
  state = {
    menuList: [
      {
        icon: statisticsIncome,
        title: '营收统计',
        url: '/pages/statistics/revenue/index'
      },
      {
        icon: statisticsGoods,
        title: '商品统计',
        url: '/pages/statistics/goods/index'
      },
      // {
      //   icon: statisticsAccount,
      //   title: '账目统计',
      //   url: '/pages/statistics/account/index'
      // },
      // {
      //   icon: statisticsAccountDetail,
      //   title: '账目明细',
      //   url: '/pages/statistics/accountDetail/index'
      // }
    ]
  }

  onJump = (url) => () => {
    Taro.navigateTo({ url })
  }

  onJumpToCoupon = () => {
    Taro.navigateTo({ url: `/pages/manager/coupon/list/index` })
  }

  render() {
    const { menuList } = this.state

    return (
      <View className='index'>
        {/* <View className='header'>
          <Image src={headerBg} mode='widthFix' className='header-bg'></Image>
          <View className='header-container'>
            <View className='header-info'>
              <View className='header-info__explain'>可提现金余额</View>
              <View className='header-info__text'>1078.1</View>
              <View className='header-info__explain'>待入库金额：￥228</View>
            </View>
          </View>
        </View> */}
        <View className='menu-container'>
          {/* <View className='menu-title'>订单统计</View> */}
          {menuList &&
            menuList.map((item) => {
              return (
                <View key={item.url} className='menu-item' onClick={this.onJump(item.url)}>
                  <Image src={item.icon} mode='widthFix' className='menu-item-icon'></Image>
                  <View className='menu-item-title'>{item.title}</View>
                  <View className='at-icon at-icon-chevron-right'></View>
                </View>
              )
            })}
        </View>
        {/* <Button className='page-btn'>提现申请</Button> */}
      </View>
    )
  }
}

export default Center
