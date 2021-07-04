import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Button } from '@tarojs/components'

import headerBg from '@/assets/imgs/header-bg.png'
import exchangeIcon from '@/assets/imgs/center-exchange.png'
import usIcon from '@/assets/imgs/center-us.png'

import './index.scss'

class Center extends Component {
  state = {
    menuList: [
      {
        icon: exchangeIcon,
        title: '提现记录'
      },
      {
        icon: usIcon,
        title: '资金明细'
      }
    ]
  }

  onJump = (url) => () => {
    Taro.navigateTo({ url })
  }

  render() {
    const { menuList } = this.state

    return (
      <View className='index'>
        <View className='plate'>
          <View className='plate-title'>今日实时数据</View>
          <View className='plate-info'>
            <View className='plate-info__item'>
              <View className='plate-info__item-title'>有效单量</View>
              <View className='plate-info__item-num'>0单</View>
            </View>
            <View className='plate-info__item'>
              <View className='plate-info__item-title'>有效单量</View>
              <View className='plate-info__item-num'>0单</View>
            </View>
          </View>
        </View>
        <View>
          <View className='plate-title'>营收数据统计</View>
          <View className='plate-option'>
            <View className='plate-option__title'>有效单量</View>
            <View className='plate-option__num'>0单</View>
          </View>
        </View>
      </View>
    )
  }
}

export default Center
