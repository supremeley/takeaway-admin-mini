import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Button, Input } from '@tarojs/components'

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
        url: '/pages/finance/record/index'
      },
      {
        icon: JinYingIcon,
        title: '资金明细',
        url: '/pages/finance/detail/index'
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
        <View className='header'>
          <Image src={headerBg} mode='widthFix' className='header-bg'></Image>
          <View className='header-container'>
            <View className='header-info'>
              <View className='header-info__explain'>可提现金余额</View>
              <View className='header-info__text'>1078.1</View>
            </View>
          </View>
        </View>
        <View className='content'>
          <View className='content-explain'>
            <View>提现金额</View>
            {/* <View>萌哒哒-微信钱包</View> */}
          </View>
          {/* <View className='content-explain'>
            <View>提现账户</View>
            <View>萌哒哒-微信钱包</View>
          </View> */}
          <Input placeholder='请输入提现金额' type='number' className='content-inp' />
        </View>
        <View className='menu-container'>
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
        <Button className='page-btn'>确认提现</Button>
      </View>
    )
  }
}

export default Center
