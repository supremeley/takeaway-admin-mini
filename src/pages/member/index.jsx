import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image } from '@tarojs/components'
// import TimeSelector from '@/components/timeSelector'

// import headerBg from '@/assets/imgs/header-bg.png'
import exchangeIcon from '@/assets/imgs/center-exchange.png'
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
          <View className='plate-option'>
            <Image src={exchangeIcon} className='plate-option__avatar' />
            <View className='plate-option__title'>
              <View className='plate-option__title-name'>大份鸡米饭</View>
              {/* <View className='plate-option__title-sale'>销量：10</View> */}
            </View>
            <View className='plate-option__num'>销售额：￥170</View>
          </View>
        </View>
      </View>
    )
  }
}

export default Center
