import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Button } from '@tarojs/components'

import headerBg from '@/assets/imgs/header-bg.png'
import CaiwuIcon from '@/assets/imgs/center-caiwu.png'
import JinYingIcon from '@/assets/imgs/center-jinying.png'

import './index.scss'

class Center extends Component {
  state = {
    menuList: [
      {
        icon: CaiwuIcon,
        title: '提现记录',
        url: '/pages/manager/finance/record/index'
      },
      {
        icon: JinYingIcon,
        title: '资金明细',
        url: '/pages/manager/finance/detail/index'
      }
    ]
  }

  onJump = (url) => () => {
    Taro.navigateTo({ url })
  }

  onJumpToCoupon = () => {
    Taro.navigateTo({ url: `/pages/coupon/list/index` })
  }

  render() {
    const { menuList } = this.state

    return (
      <View className='index'>
        <View className='list-item'>
          <View className='list-item__left'>
            <View className='list-item__left-title'>微信钱包</View>
            <View className='list-item__left-date'>2021-05-17</View>
            <View className='list-item__left-desc'>等待后台审核</View>
          </View>
          <View className='list-item__right'>
            <View className='list-item__right-price'>￥1800</View>
            <View className='list-item__right-status'>等待打款</View>
          </View>
        </View>
      </View>
    )
  }
}

export default Center
