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

  render() {
    const { menuList } = this.state

    return (
      <View className='index'>
        <View>
          <View className='plate'>
            <TimeSelector />
          </View>
          <View className='list'>
          <View className='list-item'>
            <View className='list-item__left'>
              <View className='list-item__left-title'>订单2011111111</View>
              <View className='list-item__left-date'>2021-05-17</View>
              <View className='list-item__left-desc'>2101515155</View>
            </View>
            <View className='list-item__right'>
              <View className='list-item__right-price'>￥1800</View>
              {/* <View className='list-item__right-status'>更多</View> */}
            </View>
          </View>
        </View>
        </View>
      </View>
    )
  }
}

export default Center
