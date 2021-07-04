import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image } from '@tarojs/components'

import headerBg from '@/assets/imgs/header-bg.png'
import CaiwuIcon from '@/assets/imgs/center-caiwu.png'
import JinyingIcon from '@/assets/imgs/center-jinying.png'
import PrintIcon from '@/assets/imgs/center-print.png'
import OrderIcon from '@/assets/imgs/center-order.png'
import AreaIcon from '@/assets/imgs/center-area.png'
import MemberIcon from '@/assets/imgs/center-member.png'
import UsIcon from '@/assets/imgs/center-us.png'

import './index.scss'

class Center extends Component {
  state = {
    menuList: [
      {
        icon: CaiwuIcon,
        title: '财务结算',
        url: '/pages/manager/finance/index'
      },
      {
        icon: JinyingIcon,
        title: '经营数据',
        url: '/pages/manager/statistics/index'
      },
      {
        icon: PrintIcon,
        title: '打印设置'
      },
      {
        icon: OrderIcon,
        title: '订单审核'
      },
      {
        icon: AreaIcon,
        title: '负责区域'
      },
      {
        icon: MemberIcon,
        title: '团队人员'
      },
      {
        icon: UsIcon,
        title: '消息'
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
        <View className='header'>
          <Image src={headerBg} mode='widthFix' className='header-bg'></Image>
          <View className='header-container'>
            <View className='header-title'>我的</View>
            <View className='header-info'>
              <View>
                <View className='header-info__floor'>薛定谔的波波猫</View>
                <View className='header-info__school'>今天也要记得吃饭鸭</View>
              </View>
              <Image src={UsIcon} mode='aspectFill' className='header-info__avatar'></Image>
            </View>
          </View>
        </View>
        {/* <View className='content-container'>
          <View className='content-item'>
            <View className='content-item-info'>
              <View className='content-item-info-title'>积分</View>
              <View className='content-item-info-num'>999</View>
            </View>
            <Image src={integralIcon} mode='widthFix' className='content-item-icon'></Image>
          </View>
          <View className='content-item' onClick={this.onJumpToCoupon}>
            <View className='content-item-info'>
              <View className='content-item-info-title'>优惠券</View>
              <View className='content-item-info-num'>999</View>
            </View>
            <Image src={couponIcon} mode='widthFix' className='content-item-icon'></Image>
          </View>
        </View> */}
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
      </View>
    )
  }
}

export default Center
