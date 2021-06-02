import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View } from '@tarojs/components'

import './index.scss'

class Center extends Component {
  state = {
    current: 0,
    navList: [
      {
        title: '待入账',
        status: '1'
      },
      {
        title: '已入账',
        status: '2'
      }
    ]
  }

  checkTab = (index) => () => {
    this.setState({ current: index })
  }

  onJump = (url) => () => {
    Taro.navigateTo({ url })
  }

  onJumpToCoupon = () => {
    Taro.navigateTo({ url: `/pages/coupon/list/index` })
  }

  render() {
    const { navList, current } = this.state

    return (
      <View className='index'>
        <View className='nav'>
          {navList &&
            navList.map((item, index) => {
              return (
                <View
                  key={index}
                  className={`nav-item ${current === index ? 'active-item' : ''}`}
                  onClick={this.checkTab(index)}
                >
                  {item.title}
                </View>
              )
            })}
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
    )
  }
}

export default Center
