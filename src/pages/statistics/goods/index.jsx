import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View } from '@tarojs/components'
import TimeSelector from '@/components/timeSelector'

// import headerBg from '@/assets/imgs/header-bg.png'
// import exchangeIcon from '@/assets/imgs/center-exchange.png'
// import usIcon from '@/assets/imgs/center-us.png'

import api from '@/api'
import './index.scss'

class Center extends Component {
  state = {
    goodsList: []
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const userTypeDesc = Taro.getStorageSync('userTypeDesc')

    const { brandId, userId } = Taro.getStorageSync('userInfo')

    let query = {
      // brandId
    }

    switch (userTypeDesc) {
      case 'shop': // 商户端
        query.brandId = brandId
        break
      case 'manager':
        query.uId = userId
        break
    }

    const {
      data: { items: goodsList }
    } = await api.goods.GET_GOODS_LIST(query)

    // let info
    // switch (userTypeDesc) {
    //   case 'shop': // 商户端
    //     // info = api.finance.GET_SHOP_BILL_ONCE
    //     break
    //   case 'manager':
    //     info = {
    //       todayData: data.todayData
    //     }
    //     break
    // }

    this.setState({ goodsList })
  }

  render() {
    const { goodsList } = this.state

    return (
      <View className='index'>
        <View>
          <View className='plate'>
            <TimeSelector />
          </View>
          {/* <View className='plate-option'>
            <View className='plate-option__title'>
              <View className='plate-option__title-name'>大份鸡米饭</View>
              <View className='plate-option__title-sale'>销量：10</View>
            </View>
            <View className='plate-option__num'>销售额：￥170</View>
          </View> */}
        </View>
      </View>
    )
  }
}

export default Center
