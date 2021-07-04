import Taro from '@tarojs/taro'
import { Component } from 'react'
import { View } from '@tarojs/components'
import Default from '@/components/default'
import BottomText from '@/components/bottomText'

import api from '@/api'
import D from '@/common'
import withScrollPage from '@/hoc/scrollPage'

import './index.scss'

class FinanceRecord extends Component {
  state = {
    total: 0,
    recordList: [
      // {
      //   title: '提现记录',
      //   url: '/pages/manager/finance/record/index'
      // },
      // {
      //   title: '资金明细',
      //   url: '/pages/manager/finance/detail/index'
      // }
    ]
  }

  componentDidMount() {
    this.nextPage()
  }

  // 下拉加载
  onReachBottom = () => {
    const { pageParams } = this.state
    // debugger
    !pageParams.isLoading && pageParams.hasNext && this.nextPage()
  }

  fetch = async (params) => {
    const { total } = await this.getRecordList(params)

    return { total }
  }

  getRecordList = async (params) => {
    const { recordList } = this.state

    const userTypeDesc = Taro.getStorageSync('userTypeDesc')

    const { brandId, userId } = Taro.getStorageSync('userInfo')

    let resultApi,
      query = { ...params, mobile: '', endTime: '', startTime: '', status: 1 }

    switch (userTypeDesc) {
      case 'shop': // 商户端
        resultApi = api.finance.GET_SHOP_BILL_LIST
        query.brandId = brandId
        break
      case 'manager':
        resultApi = api.finance.GET_USER_BILL_LIST
        query.type = 1
        query.userId = userId
        break
    }

    Taro.showLoading({
      title: '加载中',
      icon: 'none'
    })

    const {
      data: { items = [], total }
    } = await resultApi(query)
    // console.log(data, count, 1000)
    // debugger
    let nList = items.map((item) => {
      // let num = 0
      // const goodsInfo = item.goodsList.map((goods) => {
      //   num += goods.number
      //   return goods.goodsName
      // })
      // // console.log(goodsInfo)
      // return {
      //   ...item,
      //   goodsInfo: goodsInfo.join('+'),
      //   goodsExplain: ` 等${num}件商品`
      // }
      return item
    })

    nList = [...recordList, ...nList]

    Taro.hideLoading()

    this.setState({ recordList: nList, total })

    return { total }
  }

  render() {
    const { pageParams, total, recordList } = this.state

    return (
      <View className='index'>
        {/* <View className='list-item'>
          <View className='list-item__left'>
            <View className='list-item__left-title'>微信钱包</View>
            <View className='list-item__left-date'>2021-05-17</View>
            <View className='list-item__left-desc'>等待后台审核</View>
          </View>
          <View className='list-item__right'>
            <View className='list-item__right-price'>￥1800</View>
            <View className='list-item__right-status'>等待打款</View>
          </View>
        </View> */}

        {total > 0 && !pageParams.isLoading && !pageParams.hasNext && <BottomText />}
        {!total && !pageParams.isLoading && !pageParams.hasNext && <Default />}
      </View>
    )
  }
}

export default withScrollPage(FinanceRecord)
