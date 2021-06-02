import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View } from '@tarojs/components'
import TimeSelector from '@/components/timeSelector'

// import headerBg from '@/assets/imgs/header-bg.png'
// import exchangeIcon from '@/assets/imgs/center-exchange.png'
// import usIcon from '@/assets/imgs/center-us.png'

import './index.scss'

class Center extends Component {
  state = {
    menuList: []
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
        <View>
          <View className='plate-title'>今日实时数据</View>
          <View className='plate-info'>
            <View className='plate-info__item'>
              <View className='plate-info__item-title'>有效单量</View>
              <View className='plate-info__item-num'>0单</View>
            </View>
            <View className='plate-info__item'>
              <View className='plate-info__item-title'>有效营业额</View>
              <View className='plate-info__item-num'>0元</View>
            </View>
          </View>
        </View>

        <View>
          <View className='plate-title'>营收数据统计</View>
          <View className='plate'>
            <TimeSelector />
          </View>
          <View className='plate-option'>
            <View className='plate-option__title'>订单销售量</View>
            <View className='plate-option__num'>0单</View>
          </View>
          <View className='plate-option'>
            <View className='plate-option__title'>总营业额</View>
            <View className='plate-option__num'>0元</View>
          </View>
          <View className='plate-option'>
            <View className='plate-option__title'>商家收入</View>
            <View className='plate-option__num'>0元</View>
          </View>
          <View className='plate-option'>
            <View className='plate-option__title'>退款单量</View>
            <View className='plate-option__num'>0单</View>
          </View>
          <View className='plate-option'>
            <View className='plate-option__title'>有效单量</View>
            <View className='plate-option__num'>0单</View>
          </View>
          <View className='plate-option'>
            <View className='plate-option__title'>有效营业额</View>
            <View className='plate-option__num'>0元</View>
          </View>
        </View>
      </View>
    )
  }
}

export default Center
