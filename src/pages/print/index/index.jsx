import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View, Image } from '@tarojs/components'

// import headerBg from '@/assets/imgs/header-bg.png'
// import usIcon from '@/assets/imgs/center-us.png'
import statisticsIncome from '@/assets/imgs/statistics-income.png'
import statisticsGoods from '@/assets/imgs/statistics-goods.png'
import PrintIcon from '@/assets/imgs/center-print.png'

import './index.scss'

class Center extends Component {
  state = {
    menuList: [
      {
        icon: PrintIcon,
        title: '打印机列表',
        url: '/pages/print/list/index'
      },
      {
        icon: statisticsGoods,
        title: '批量打印',
        url: '/pages/print/batch/index'
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
