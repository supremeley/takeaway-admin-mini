import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View } from '@tarojs/components'
import TimeSelector from '@/components/timeSelector'

// import headerBg from '@/assets/imgs/header-bg.png'
// import exchangeIcon from '@/assets/imgs/center-exchange.png'
// import usIcon from '@/assets/imgs/center-us.png'

import api from '@/api'
import './index.scss'

class StatistRevenue extends Component {
  state = {
    info: null,
    menuList: []
  }

  componentDidMount() {
    this.fetchData()
  }

  onJump = (url) => () => {
    Taro.navigateTo({ url })
  }

  fetchData = async () => {
    const userTypeDesc = Taro.getStorageSync('userTypeDesc')

    const { brandId, userId } = Taro.getStorageSync('userInfo')

    let resultApi,
      query = {}

    switch (userTypeDesc) {
      case 'shop': // 商户端
        resultApi = api.finance.GET_SHOP_BILL_ONCE

        break
      case 'manager':
        resultApi = api.finance.GET_USER_BILL
        query.uId = userId
        break
    }

    const { data } = await resultApi(query)

    let info
    switch (userTypeDesc) {
      case 'shop': // 商户端
        // info = api.finance.GET_SHOP_BILL_ONCE
        break
      case 'manager':
        info = {
          todayData: data.todayData
        }
        break
    }

    this.setState({ info })
  }

  render() {
    const { info, menuList } = this.state

    if (!info) {
      return null
    }

    const { todayData } = info

    return (
      <View className='index'>
        <View>
          <View className='plate-title'>今日实时数据</View>
          <View className='plate-info'>
            <View className='plate-info__item'>
              <View className='plate-info__item-title'>有效单量</View>
              <View className='plate-info__item-num'>{todayData.orderCnt}单</View>
            </View>
            <View className='plate-info__item'>
              <View className='plate-info__item-title'>有效营业额</View>
              <View className='plate-info__item-num'>{todayData.orderSettleAmt}元</View>
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

export default StatistRevenue
